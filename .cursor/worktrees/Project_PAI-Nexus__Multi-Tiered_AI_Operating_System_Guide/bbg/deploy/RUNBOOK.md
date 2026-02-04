# Angie Cloud Deployment Runbook

**Enforcer Droplet:** 157.245.7.40  
**Goal:** Run Angie in the cloud, access from Chromebook (or any browser) when you have web access.

---

## Prerequisites

- SSH access to the droplet: `ssh root@157.245.7.40` (or your key/user).
- Angie installed locally (e.g. `~/Angie`) with working `venv` and `requirements.txt`.
- Your API keys in `~/.pai/.env` (GEMINI_API_KEY, etc.) — these will be copied to the droplet.

---

## One-time deployment (from your Dell)

1. **Open a terminal** on your local machine (Dell).

2. **Go to the deploy folder** (where the script lives):
   ```bash
   cd /path/to/bbg/deploy
   ```
   Or from this repo:
   ```bash
   cd ~/.cursor/worktrees/Project_PAI-Nexus__Multi-Tiered_AI_Operating_System_Guide/bbg/deploy
   ```

3. **Set Angie source** (if Angie is not in `~/Angie`):
   ```bash
   export ANGIE_SOURCE=$HOME/Angie
   ```

4. **Run the deploy script:**
   ```bash
   chmod +x deploy-to-droplet.sh
   ./deploy-to-droplet.sh
   ```
   Or with a custom SSH target:
   ```bash
   ./deploy-to-droplet.sh root@157.245.7.40
   ```

5. **Open port 5000 on the droplet** (so you can reach Angie from the internet):
   ```bash
   ssh root@157.245.7.40 'sudo ufw allow 5000/tcp && sudo ufw --force enable && sudo ufw status'
   ```

6. **Verify from your machine:**
   ```bash
   curl -s -o /dev/null -w "%{http_code}" http://157.245.7.40:5000
   ```
   You should see `200`.

---

## Access from your Chromebook

- **Direct (HTTP):** In Chrome, open:
  ```text
  http://157.245.7.40:5000
  ```
- **HTTPS (optional):** See `CHROMEBOOK_ACCESS.md` for Cloudflare Tunnel setup.
- **Discord:** Use your existing Discord bot if configured.

---

## Useful commands (on droplet)

SSH in first: `ssh root@157.245.7.40`

| Task | Command |
|------|--------|
| View logs | `sudo journalctl -u angie -f` |
| Restart Angie | `sudo systemctl restart angie` |
| Status | `sudo systemctl status angie` |
| Stop | `sudo systemctl stop angie` |
| Start | `sudo systemctl start angie` |

---

## If something goes wrong

1. **Angie not responding**
   - `ssh root@157.245.7.40 'sudo systemctl status angie'`
   - `ssh root@157.245.7.40 'tail -100 /root/Angie/angie.log'`

2. **Chromebook: "Refused to connect"** — Re-run `./deploy-to-droplet.sh` (service now sets `HOST=0.0.0.0`). If still failing, see **TROUBLESHOOT_REFUSED.md**.

3. **Can’t connect from Chromebook** (general)
   - Confirm port 5000 is open: `ssh root@157.245.7.40 'sudo ufw status'`
   - From Chromebook, try: `http://157.245.7.40:5000`
   - If you’re on a restricted network (school/work), try Discord or Cloudflare Tunnel (HTTPS) instead.

4. **API key errors**
   - On droplet: `cat /root/.pai/.env` (ensure GEMINI_API_KEY is set).
   - Re-copy from Dell: `scp ~/.pai/.env root@157.245.7.40:/root/.pai/.env`

5. **Re-deploy after code/settings changes** (after editing service or code)
   - Run `./deploy-to-droplet.sh` again from the deploy folder.
   - Then: `ssh root@157.245.7.40 'sudo systemctl restart angie'`

---

## Backup and restore

- **Backup** (pull chats/settings from droplet to your Dell): see **BACKUP_RESTORE.md** for rsync commands to `~/angie-droplet-backups/<timestamp>/`.
- **Restore:** copy a backup back to `/root/Angie/tmp/` on the droplet, then `sudo systemctl restart angie`. Details in **BACKUP_RESTORE.md**.

---

## Optional: health-check watchdog (cron on droplet)

To auto-restart Angie if the UI stops responding, on the droplet run once:

```bash
(crontab -l 2>/dev/null; echo '*/5 * * * * curl -sf -o /dev/null http://127.0.0.1:5000/ || systemctl restart angie') | crontab -
```

To remove the watchdog later: `crontab -e` and delete the line containing `127.0.0.1:5000`.

---

## Using Copilot (copilot connect)

You can use **Copilot with Angie’s credentials** (copilot connect) to help implement or troubleshoot deployment tasks. For implementing the full bulletproofing plan, see **BULLETPROOF_DEPLOYMENT_PLAN.md** — it includes a handoff prompt you can paste into Copilot after connecting.

---

## Summary

- **Deploy once:** Run `deploy-to-droplet.sh` from `bbg/deploy`, then open port 5000.
- **Chromebook:** Open `http://157.245.7.40:5000` in Chrome when you have web access.
- **Optional HTTPS:** Use Cloudflare Tunnel (see `CHROMEBOOK_ACCESS.md`).
