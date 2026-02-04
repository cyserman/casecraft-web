# Prompt for Copilot: get Angie up and running

Use this when you open **this repo** (angie-deploy) with Copilot. Copy and paste, then add any error output or log snippets you have.

---

```
This repo (angie-deploy) is only for Angie on the Enforcer Droplet 157.245.7.40. No other projects.

Goal: Get Angie up and running at http://157.245.7.40:5000 so I can use it from my Dell and Chromebook.

Context:
- The droplet may not have the systemd service installed yet ("Unit angie.service could not be found").
- There have been Vertex_ai_betaException / "API key not valid" errors causing crashes and connection refused.

Please work through the docs in this repo in this order:
1. INSTALL_SERVICE_ONLY.md — install angie.service on the droplet (user runs the scp/ssh commands from their Dell).
2. If the service fails or connection is still refused: FIX_VERTEX_API_KEY.md — re-copy .env, set model to gemini/gemini-2.5-flash, restart.
3. RUNBOOK.md and TROUBLESHOOT_REFUSED.md for any further diagnostics.

Keep all changes and new steps in this repo. Do not mix in other projects (Casecraft, LegalForge, etc.).
```

---

Add below the prompt: any `systemctl status`, `tail -50 angie.log`, or browser error (e.g. ERR_CONNECTION_REFUSED) so Copilot can target the fix.
