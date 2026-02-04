# Execution agent script (stable Moltbot alternative)

**Who uses this:** The execution agent (Cursor / AI that can run commands). Run each section in order. Replace any placeholders (e.g. `IMAGE_NAME`, `PORT`) with the values from Manus’s response or the chosen solution.

**Target:** Enforcer Droplet 157.245.7.40, root SSH. Goal: one working chat UI in the browser with minimal steps.

---

## Pre-check (run from your machine, not on droplet)

- [ ] You have SSH access: `ssh root@157.245.7.40` (or user provides password/key).

---

## Section 1: Ensure Docker on the droplet

Run on the droplet (via SSH from your machine):

```bash
ssh root@157.245.7.40 'which docker || (apt-get update -qq && apt-get install -y -qq docker.io && systemctl enable docker && systemctl start docker)'
```

Verify Docker runs:

```bash
ssh root@157.245.7.40 'docker run --rm hello-world'
```

---

## Section 2: Run the chosen app (Docker)

**Replace the image and port below** with the image and port from Manus’s recommendation (e.g. Open WebUI, Moltbot, or other). Example placeholder:

```bash
# PLACEHOLDER: Replace IMAGE_NAME and PORT with actual values from Manus.
# Example: IMAGE_NAME=ghcr.io/open-webui/open-webui:main, PORT=8080
ssh root@157.245.7.40 'docker run -d --name chat-ui --restart unless-stopped -p 8080:8080 -e OPENAI_API_KEY=YOUR_OPENAI_API_KEY -v open-webui:/app/backend/data --pull always IMAGE_NAME'
```

If Manus gives an exact `docker run` or `docker compose` command, use that instead and run it via SSH.

---

## Section 3: Open firewall port

Replace `PORT` with the port the app uses (e.g. 8080):

```bash
ssh root@157.245.7.40 'ufw allow PORT/tcp 2>/dev/null; ufw --force enable 2>/dev/null; ufw status | head -15'
```

---

## Section 4: Verify

Replace `PORT` with the same port:

```bash
curl -s -o /dev/null -w "%{http_code}" http://157.245.7.40:PORT
```

Report to the user: **If you see 200**, open **http://157.245.7.40:PORT** in a browser (Dell, then Chromebook). If you see 000 or connection refused, report that and check `ssh root@157.245.7.40 'docker ps -a'` and container logs.

---

## Section 5: (Optional) Persist API key or config

If the app needs an API key and you used a placeholder, tell the user: “Add your API key in the app’s Settings (or env) as instructed by the solution.” Do not store the real key in this script.

---

**After Manus responds:** Replace Section 2 (and Section 3/4 ports) with the exact commands Manus provides. Then the execution agent runs Sections 1 → 2 → 3 → 4 in order.

---

## Fallback: Open WebUI (if Manus hasn’t responded yet)

If you want something working **now** without waiting for Manus, the execution agent can run this instead of Section 2. Open WebUI is a stable, Docker-based chat UI that works with OpenAI-compatible APIs (and many others).

**Section 2 – Fallback (Open WebUI on port 8080):**

```bash
ssh root@157.245.7.40 'docker run -d --name open-webui --restart unless-stopped -p 8080:8080 -v open-webui-data:/app/backend/data --pull always ghcr.io/open-webui/open-webui:main'
```

Then run Section 3 with `PORT=8080` and Section 4 with port 8080. User opens http://157.245.7.40:8080 and adds their API key in the app Settings after first load.
