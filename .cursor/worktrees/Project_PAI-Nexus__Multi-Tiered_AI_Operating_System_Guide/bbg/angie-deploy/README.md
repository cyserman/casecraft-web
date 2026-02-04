# Angie deploy (Enforcer Droplet)

**This repo is only for running Angie on the Enforcer Droplet (157.245.7.40).** No Casecraft, LegalForge, or other projects — deployment and runbooks only. Keeps context clean for you and Copilot.

## Quick start

1. **Get Angie up on the droplet:** See **GET_STARTED.md** (install service, fix API key if needed, verify).
2. **Full deploy from your Dell:** `./deploy-to-droplet.sh` (see RUNBOOK.md).
3. **Chromebook:** Open **http://157.245.7.40:5000**

## What’s here

| File | Purpose |
|------|--------|
| **GET_STARTED.md** | First-time: install service on droplet, new-repo push, prompt for Copilot |
| **RUNBOOK.md** | Deployment and troubleshooting steps |
| **INSTALL_SERVICE_ONLY.md** | Install angie.service when "Unit not found" |
| **FIX_VERTEX_API_KEY.md** | Fix Vertex/API key crash and connection refused |
| **deploy-to-droplet.sh** | Full deploy: sync Angie, deps, service, firewall |
| **angie.service** | systemd unit for Angie |
| **COPILOT_PROMPTS.md** | Prompts for Copilot (harden, inoperational, service not found) |
| **PROMPT_FOR_COPILOT.md** | Single prompt: get Angie up and running |
| **FOR_LATER.md** | Set aside: organize repos (maybe Angie later) |

## Requirements

- SSH to `root@157.245.7.40`
- Angie on your machine at `~/Angie` (or set `ANGIE_SOURCE`)
- `~/.pai/.env` with `GEMINI_API_KEY` (copied to droplet on first deploy)
