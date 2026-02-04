# Deploy Angie Now (run on your Dell)

Deployment **did not run** from the automated environment (SSH to the droplet isn’t available there). Run it **once on your Dell** where you can reach the droplet.

**Root access:** The script uses `root@157.245.7.40`. You will be **prompted for the root password** when SSH needs it (first connection, or if you don’t use key-based auth). The script accepts the host key on first connect so you only type the password when asked.

---

## One-time setup (if you haven’t already)

1. **Accept the droplet host key** (only needed first time):
   ```bash
   ssh -o StrictHostKeyChecking=accept-new root@157.245.7.40 exit
   ```

2. **Confirm you can log in:**
   ```bash
   ssh root@157.245.7.40 "echo OK"
   ```
   You should see `OK`.

---

## Deploy (paste and run on your Dell)

```bash
cd /home/cyserman/.cursor/worktrees/Project_PAI-Nexus__Multi-Tiered_AI_Operating_System_Guide/bbg/deploy && \
export ANGIE_SOURCE=/home/cyserman/Angie && \
chmod +x deploy-to-droplet.sh && \
./deploy-to-droplet.sh
```

If your Angie folder is elsewhere, set it first:
```bash
export ANGIE_SOURCE=/home/cyserman/Angie   # or your actual path
```

---

## When it’s ready

- Script finishes without errors.
- At the end it prints: **From your Chromebook open: http://157.245.7.40:5000**
- On your **Chromebook**, open Chrome and go to: **http://157.245.7.40:5000**

---

## If something fails

- **“Host key verification failed”** → Run the “One-time setup” step above.
- **“Permission denied (publickey)”** → Use the same SSH key/user you normally use for the droplet (e.g. root or your user).
- **Port 5000 not reachable** → Script opens it automatically; if still blocked, run:
  ```bash
  ssh root@157.245.7.40 'sudo ufw allow 5000/tcp && sudo ufw --force enable'
  ```

---

**Status:** Deployment package is ready. Run the commands above on your Dell to make Angie live on the droplet; then use **http://157.245.7.40:5000** from your Chromebook.
