# What’s in place and how to use it

Quick reference for what’s running on the Enforcer Droplet and how to reach it from anywhere.

---

## What’s running

| Service      | URL                         | Status   |
|-------------|-----------------------------|----------|
| **Open WebUI** | http://157.245.7.40:8080   | **Running** (Docker on droplet) |
| **Angie**      | http://157.245.7.40:5000   | Not running (see angie-deploy/GET_STARTED.md to fix) |

---

## How to use it (home network and remotely)

The app runs on a **public VPS** (DigitalOcean droplet). You use the **same URL** from anywhere.

- **From your home network (Dell, etc.):**  
  Open in a browser: **http://157.245.7.40:8080**
- **From elsewhere (Chromebook, travel, etc.):**  
  Open the same: **http://157.245.7.40:8080**

No port forwarding or VPN needed. As long as you have internet, that URL works.

### First-time setup for Open WebUI

1. Open **http://157.245.7.40:8080** in any browser.
2. Create the **first (admin) account** when prompted.
3. Add your API key: click your **profile/avatar** (top right) → **Settings** → look for **Connections** or **Admin Settings → Connections**. Add keys for the providers you use (OpenAI, Anthropic, Google, etc.). Save.

After that, you can chat from any device that can reach that URL.

---

## API keys and “Not secure” (HTTP vs HTTPS)

- **Where the app runs:** Open WebUI is on your **droplet** (remote server), not on your laptop. So the interface is “remote” — you’re talking to the server over the internet.
- **Why the browser says “Not secure”:** The site is served over **HTTP**, not **HTTPS**. Traffic between your browser and the droplet (including when you enter or use API keys) is **not encrypted**. So in theory someone on the same network or in the path could see it. The browser is correctly warning you.
- **Where keys are stored:** Open WebUI stores the keys in its own data on the droplet (in the Docker volume). They are not “public on the internet,” but they do live on that server and were sent once over HTTP when you added them.

**Practical options:**

1. **Accept the risk for low-stakes use:** If you only use this from home and don’t reuse these keys for critical stuff, many people run this way. Still not recommended for sensitive keys.
2. **Use HTTPS:** Put a reverse proxy (e.g. Caddy or Nginx) with **Let’s Encrypt** in front of Open WebUI so the URL becomes `https://...`. Then the connection is encrypted and the browser will show “secure.” (Requires a domain name pointing at the droplet.)
3. **Keep it local only:** Run Open WebUI on your Dell (e.g. Docker on localhost) and use **http://localhost:8080**. Then traffic never leaves your machine and the keys aren’t sent over the internet — but you can’t use it from your Chromebook remotely.

---

## Updating Open WebUI (e.g. to v0.7.2+)

From your machine (Dell), run:

```bash
ssh root@157.245.7.40 'docker pull ghcr.io/open-webui/open-webui:main && docker stop open-webui && docker rm open-webui && docker run -d --name open-webui --restart unless-stopped -p 8080:8080 -v open-webui-data:/app/backend/data ghcr.io/open-webui/open-webui:main'
```

Your data (chats, settings, API key) stays in the `open-webui-data` volume. Then open http://157.245.7.40:8080 again.

---

## If 8080 doesn’t load

- Check the container:  
  `ssh root@157.245.7.40 'docker ps -a'`
- See **angie-deploy/EXECUTION_AGENT_SCRIPT.md** (fallback: run Open WebUI again on 8080) or **START_HERE.md** (Option 1).

---

## Bringing up Angie later

Angie (Agent Zero) would be at **http://157.245.7.40:5000** once the service is fixed. Steps:

- **angie-deploy/GET_STARTED.md** — Part 1 (get Angie up on the droplet)
- **angie-deploy/FIX_DROPLET_PIP_THEN_SERVICE.md** — if pip/service install fails
