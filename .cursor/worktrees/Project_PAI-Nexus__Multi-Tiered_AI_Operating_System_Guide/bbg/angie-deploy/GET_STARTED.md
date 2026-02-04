# Get started: Angie on the droplet + this repo

Two parts: (1) get Angie running on the droplet from your Dell, (2) push this folder to a new GitHub repo and use it with Copilot.

---

## Part 1: Get Angie up on the droplet (run from your Dell)

If you see **"Unit angie.service could not be found"** or **connection refused**, do this first.

### Step A – Install the systemd service


### Step B – Fix API key / Vertex (if service fails or still refused)

```bash
scp -o StrictHostKeyChecking=accept-new ~/.pai/.env root@157.245.7.40:/root/.pai/.env
ssh root@157.245.7.40 'chmod 600 /root/.pai/.env'

scp ~/Angie/tmp/settings.json root@157.245.7.40:/root/Angie/tmp/settings.json

ssh root@157.245.7.40 'sudo systemctl restart angie && sleep 4 && sudo systemctl status angie --no-pager'
```

### Step C – Verify

```bash
ssh root@157.245.7.40 'tail -30 /root/Angie/angie.log'
curl -s -o /dev/null -w "%{http_code}" http://157.245.7.40:5000
```

You want **200**. Then open http://157.245.7.40:5000 in a browser (Dell, then Chromebook).

If anything fails, see **FIX_VERTEX_API_KEY.md** and **TROUBLESHOOT_REFUSED.md**.

---

## Part 2: New GitHub repo (angie-deploy) and Copilot

So Copilot only sees deployment context (no Casecraft/LegalForge):

1. **Create a new repo on GitHub** named `angie-deploy` (empty, no README).
2. **Push this folder** as the first commit:

   ```bash
   cd /path/to/angie-deploy
   git init
   git add .
   git commit -m "Angie deploy: Enforcer droplet runbooks and scripts"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/angie-deploy.git
   git push -u origin main
   ```

   Replace `YOUR_USERNAME` with your GitHub username.

3. **Open the new repo with Copilot** and use the prompt in **PROMPT_FOR_COPILOT.md** to have it work through getting Angie up and running (or hardening, if already up).

---

**Root access:** You don’t need to give anyone else root. You run the `ssh root@157.245.7.40` and `scp` commands from your Dell; you already have access. No extra root handoff required.
