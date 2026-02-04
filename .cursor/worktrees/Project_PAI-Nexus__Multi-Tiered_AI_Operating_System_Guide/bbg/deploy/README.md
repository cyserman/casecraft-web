# Angie cloud deployment (Enforcer Droplet)

Deploy Angie to **157.245.7.40** so it runs 24/7 and you can use it from your **Chromebook** (or any browser) when you have web access.

## Quick start

From your **Dell** (with SSH to the droplet):

```bash
cd deploy
chmod +x deploy-to-droplet.sh
./deploy-to-droplet.sh
```

You may be **prompted for the root password** for the droplet when SSH connects; that’s expected if you’re not using key-based auth.

Then on your **Chromebook**, open in Chrome:

**http://157.245.7.40:5000**

## What’s in this folder

| File | Purpose |
|------|--------|
| `deploy-to-droplet.sh` | One script to sync Angie, install service, open port 5000 |
| `angie.service` | systemd unit so Angie starts on boot and restarts on failure |
| `RUNBOOK.md` | Step-by-step deployment and troubleshooting |
| `CHROMEBOOK_ACCESS.md` | How to use Angie from Chromebook (direct URL + optional HTTPS) |
| `README.md` | This file |

## Chromebook access

- **Direct (HTTP):** Open **http://157.245.7.40:5000** in Chrome. Works from any network where the droplet is reachable.
- **HTTPS:** See `CHROMEBOOK_ACCESS.md` for Cloudflare Tunnel (optional).
- **Discord:** Use your existing Discord bot if it’s pointed at this instance.

## Requirements

- SSH to `root@157.245.7.40` (or your user)
- Angie on your Dell at `~/Angie` (or set `ANGIE_SOURCE`)
- `~/.pai/.env` with `GEMINI_API_KEY` (and any other keys) — copied to the droplet on first deploy

## After deployment

- **Logs:** `ssh root@157.245.7.40 'sudo journalctl -u angie -f'`
- **Restart:** `ssh root@157.245.7.40 'sudo systemctl restart angie'`
- **Re-deploy:** Run `./deploy-to-droplet.sh` again after code or config changes.
