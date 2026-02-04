# Bulletproof Angie Deployment Plan (Prompt-Ready Spec)

**Purpose:** Use this document as a **prompt or specification** to share with an implementer (human or AI). It lists all considerations and details to make the Angie cloud deployment on the Enforcer Droplet (157.245.7.40) reliable, maintainable, and secure.

**Target:** Angie (Agent Zero) running on a DigitalOcean Droplet, accessible from a Chromebook at `http://157.245.7.40:5000`.

---

## How to Use This as a Prompt

Copy the sections below (or the full file) and provide them to your implementer with instructions like:

- *"Implement the following bulletproofing plan for the Angie deployment. Prefer changes under `bbg/deploy/` and on-droplet commands that can be run by the existing `deploy-to-droplet.sh` script where possible. Document any manual steps in the runbook."*

**Using Copilot (copilot connect):** You can connect with Angie’s credentials and paste this handoff prompt to assist implementation:

```
Context: We're bulletproofing the Angie deployment on the Enforcer Droplet (157.245.7.40).
Use Angie's credentials (copilot connect) to assist.

Current state:
- deploy-to-droplet.sh has step [3/8] installing system deps (pkg-config, cmake, libopenblas-dev, liblapack-dev) so pip/scipy installs succeed.
- BULLETPROOF_DEPLOYMENT_PLAN.md lists all considerations (logrotate, health check, backup, optional HTTPS, etc.).

Please help implement the remaining items from that plan (logrotate for angie.log, optional cron watchdog, backup/restore docs, RUNBOOK.md updates). Prefer changes under bbg/deploy/ and commands runnable by the deploy script or documented for one-time run on the droplet.
```

---

## 1. System Build Dependencies (Pip / SciPy)

**Consideration:** `pip install -r requirements.txt` on the droplet can fail if system libraries are missing (e.g. scipy needs pkg-config, cmake, OpenBLAS).

**Required implementation:**
- Before `pip install` on the droplet, ensure these packages are installed (Debian/Ubuntu):
  - `pkg-config`
  - `cmake`
  - `libopenblas-dev`
  - `liblapack-dev`
- The deploy script should run (idempotently):  
  `apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y pkg-config cmake libopenblas-dev liblapack-dev`
- Optional: document in the runbook that a fresh droplet may need these; consider a small `scripts/install-droplet-deps.sh` that can be scp’d and run once.

**Status:** Deploy script already updated with step [3/8] for these deps.

---

## 2. Service Reliability (systemd)

**Consideration:** Angie should survive crashes and reboots.

**Required implementation:**
- `Restart=always` and `RestartSec=10` in the systemd unit (already present).
- Optional: add `StartLimitIntervalSec=300` and `StartLimitBurst=5` to avoid restart loops; optionally send a simple notification or log a clear message when restarts exceed the burst.
- Document in runbook: how to check restart count (`systemctl show angie -p NRestarts`) and how to inspect failure reason (`journalctl -u angie -b -1 --no-pager` after a reboot).

---

## 3. Log Management (Rotation and Size)

**Consideration:** `angie.log` and journal logs can grow unbounded and fill the disk.

**Required implementation:**
- **File log rotation:** Add a logrotate config on the droplet for `/root/Angie/angie.log`:
  - Rotate when size exceeds e.g. 50M or daily.
  - Keep 5 rotations, compress old ones.
  - Example path: `/etc/logrotate.d/angie` (created by deploy script or documented for manual creation).
- **Journal:** Optionally limit journal size for the angie service or globally (`journalctl --disk-usage`; configure in `/etc/systemd/journald.conf` or document recommended limits).
- Deploy script: either create `/etc/logrotate.d/angie` via SSH or add a one-liner in the runbook for the user to run once on the droplet.

**Example logrotate config (to be placed in `/etc/logrotate.d/angie`):**
```
/root/Angie/angie.log {
    daily
    rotate 5
    compress
    missingok
    notifempty
    copytruncate
}
```

---

## 4. Secrets and Environment

**Consideration:** API keys and secrets must not be committed or logged.

**Required implementation:**
- `.env` remains in `/root/.pai/.env` and is not overwritten by deploy if it already exists (already in deploy script).
- Ensure no script logs the contents of `.env` or `settings.json` secrets; if any debug dump is added, redact API keys and secrets.
- Optional: document that rotating `GEMINI_API_KEY` only requires updating `/root/.pai/.env` on the droplet and restarting the service (`systemctl restart angie`).
- Optional: add a single “sanity check” that does not print secrets (e.g. `test -f /root/.pai/.env && test -s /root/.pai/.env`) in deploy or runbook.

---

## 5. Firewall and Network

**Consideration:** Only necessary ports should be open; Angie UI is on 5000.

**Required implementation:**
- UFW: allow SSH (22), allow 5000/tcp for Angie; default deny incoming otherwise. Deploy script already runs `ufw allow 5000/tcp` and `ufw --force enable`.
- Document in runbook: if the user ever changes the Angie port, update both the app config and `ufw allow <port>/tcp`.
- Optional: if HTTPS is introduced (e.g. nginx + Let’s Encrypt or Cloudflare Tunnel), document the additional ports (80, 443) and any proxy config.

---

## 6. Health Check and Verification

**Consideration:** Quick way to verify that Angie is up and responding after deploy or reboot.

**Required implementation:**
- **Post-deploy check:** Deploy script already suggests:  
  `curl -s -o /dev/null -w "%{http_code}" http://157.245.7.40:5000`  
  Expect 200. Document this in the runbook as the canonical “is Angie up?” check.
- **Optional cron watchdog on droplet:** A cron job (e.g. every 5 minutes) that:
  - Runs `curl -sf -o /dev/null http://127.0.0.1:5000/` (or a dedicated health route if one exists).
  - On failure (non-200 or connection refused), runs `systemctl restart angie` and optionally logs or notifies.
- **Optional health endpoint:** If the Angie app supports a simple `/health` or `/api/health` that returns 200 without heavy logic, document it and use it in the watchdog.

---

## 7. Backup of Chats and Critical Data

**Consideration:** Chats and settings on the droplet should be backed up so they can be restored after a redeploy or disaster.

**Required implementation:**
- Identify paths to back up on the droplet, e.g.:
  - `/root/Angie/tmp/` (e.g. settings, chats metadata)
  - `/root/Angie/tmp/chats/` (if that’s where chat data lives)
  - Any other dirs the app uses for persistent state (e.g. memory, uploads).
- Document in runbook:
  - **Backup:** e.g. `rsync` or `scp` from droplet to a local folder (or a one-line `rsync` command from the user’s machine pulling from the droplet).
  - **Restore:** how to copy those directories back to the droplet and restart Angie.
- Optional: add a small script or runbook section “Backup droplet data” that runs a single rsync from the user’s Dell to pull `/root/Angie/tmp` (and optionally other dirs) to a local timestamped folder.

---

## 8. HTTPS and Reverse Proxy (Optional)

**Consideration:** HTTP on port 5000 is unencrypted; for production or sensitive use, HTTPS is recommended.

**Required implementation (if implementing HTTPS):**
- Option A — **Cloudflare Tunnel:** Already referenced in CHROMEBOOK_ACCESS.md; no direct exposure of 5000 to the internet. Document steps to run a tunnel from the droplet (e.g. cloudflared) and point a hostname to the tunnel.
- Option B — **Nginx + Let’s Encrypt on droplet:** Install nginx and certbot on the droplet; configure nginx as reverse proxy to `127.0.0.1:5000`; obtain a certificate for a domain that points to 157.245.7.40; open ports 80 and 443; document in runbook. Ensure Angie still binds to 127.0.0.1 when behind nginx (or keep 0.0.0.0 and rely on firewall).
- Document which option is “canonical” for the project and any tradeoffs (e.g. Cloudflare vs direct HTTPS).

---

## 9. Resource Limits (Optional)

**Consideration:** Prevent the Angie process from consuming all CPU or memory on the droplet.

**Required implementation (optional):**
- In the systemd unit, consider adding:
  - `MemoryMax=1G` (or another limit appropriate for the droplet size)
  - `CPUQuota=80%` (optional)
- Document in runbook that these can be adjusted if the droplet size or workload changes.

---

## 10. Post-Reboot and Startup Order

**Consideration:** Angie should start after the network is up.

**Required implementation:**
- systemd unit already has `After=network.target`. Optional: use `After=network-online.target` and `WantedBy=multi-user.target` if you need “network is really up” (requires `network-online.target` to be enabled). Document if you change this.

---

## 11. Single Place for “What’s Deployed”

**Consideration:** One clear list of what the deploy script does and what must be done manually.

**Required implementation:**
- Runbook (RUNBOOK.md) should list:
  - All deploy script steps (e.g. 1–8: .env, sync, system deps, venv, settings, systemd, start, firewall).
  - Manual one-time steps (e.g. logrotate config, optional cron watchdog, optional nginx/HTTPS).
  - How to verify (curl 200), how to view logs, how to restart, how to backup/restore.
- Keep BULLETPROOF_DEPLOYMENT_PLAN.md as the **spec/prompt**; keep RUNBOOK.md as the **operator’s checklist and commands**.

---

## 12. Summary Checklist for Implementer

- [ ] System build deps (pkg-config, cmake, OpenBLAS) installed before pip (done in deploy script).
- [ ] systemd: Restart=always; optional StartLimit* and resource limits.
- [ ] Logrotate for `/root/Angie/angie.log` (and optionally journal limits).
- [ ] No logging of secrets; optional .env sanity check.
- [ ] Firewall: SSH + 5000 (and 80/443 if HTTPS added); documented in runbook.
- [ ] Post-deploy verification (curl 200) documented; optional cron watchdog.
- [ ] Backup/restore of `/root/Angie/tmp` (and other state) documented or scripted.
- [ ] Optional: HTTPS via Cloudflare Tunnel or nginx + certbot; documented.
- [ ] RUNBOOK.md updated with all manual steps and canonical commands.

---

**End of plan.** Use this document as the source of requirements when implementing or reviewing the bulletproof deployment.
