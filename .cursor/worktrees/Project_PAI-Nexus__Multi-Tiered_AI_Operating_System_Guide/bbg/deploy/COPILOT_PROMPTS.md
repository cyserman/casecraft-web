# Copilot prompts (use after connecting with Angie’s credentials)

**Repo state:** Deployment bulletproofing is on `main` (deploy/ folder). Use these as starting points and add details as needed.

---

## 1. Harden / secure the running state

Use when Angie on the droplet is **running** and you want to tighten security or reliability:

```
Repo: casecraft-web (main). Angie runs on Enforcer Droplet 157.245.7.40 at http://157.245.7.40:5000.

Context: Deployment is in `deploy/` (deploy-to-droplet.sh, angie.service, RUNBOOK.md, BULLETPROOF_DEPLOYMENT_PLAN.md). The app is up and I want to harden/secure the running state.

Please:
- Review BULLETPROOF_DEPLOYMENT_PLAN.md and suggest or implement any remaining items (HTTPS, resource limits, auth, etc.).
- Prefer changes under `deploy/` and on-droplet steps documented in RUNBOOK.md.
- Do not break the current working deployment.
```

---

## 2. Inoperational state – get it working again

Use when Angie on the droplet is **down or broken**:

```
Repo: casecraft-web (main). Angie is deployed to Enforcer Droplet 157.245.7.40 but is currently not working / not reachable.

Context: Deployment is in `deploy/`. See RUNBOOK.md and TROUBLESHOOT_REFUSED.md for diagnostics.

Please:
- Use the diagnostic steps in deploy/TROUBLESHOOT_REFUSED.md (service status, port 5000, firewall, angie.log).
- Suggest or implement fixes (service restart, .env, model settings, pip/venv, firewall, binding to 0.0.0.0).
- Document any new one-time or recurring steps in RUNBOOK.md.
```

---

Add error messages, log excerpts, or “refused to connect” / 5xx details when you paste these to Copilot.
