# "Refused to Connect" from Chromebook

If your Chromebook shows **refused to connect** at `http://157.245.7.40:5000`, run these checks **on the droplet** (from your Dell, in a terminal).

---

## 1. One-shot diagnostic (copy-paste this whole block)

SSH in and run:

```bash
ssh root@157.245.7.40 '
echo "=== Service status ==="
sudo systemctl status angie --no-pager
echo ""
echo "=== Listening on port 5000? ==="
ss -tlnp | grep 5000 || true
echo ""
echo "=== Firewall (5000 allowed?) ==="
sudo ufw status | head -15
echo ""
echo "=== Last 40 lines of Angie log ==="
tail -40 /root/Angie/angie.log 2>/dev/null || echo "(no log yet)"
'
```

- **Service inactive/failed** → Angie may be crashing (e.g. API key or model error). Check the log output above.
- **Nothing listening on 5000** → Either the service isn’t running or the app is binding only to `127.0.0.1` (see fix below).
- **5000 not in firewall** → Open it: `ssh root@157.245.7.40 'sudo ufw allow 5000/tcp && sudo ufw --force enable'`.

---

## 2. Fix: Make Angie listen on all interfaces

Angie’s UI often binds to **localhost only** (`127.0.0.1`), so the Chromebook can’t reach it. The deploy service file is already set to use `HOST=0.0.0.0` so the app listens on all interfaces.

**Re-deploy so the updated service file is used:**

1. From your **Dell** (in the deploy folder):
   ```bash
   cd ~/.cursor/worktrees/Project_PAI-Nexus__Multi-Tiered_AI_Operating_System_Guide/bbg/deploy
   ./deploy-to-droplet.sh
   ```
   This copies the updated `angie.service` (with `HOST=0.0.0.0`) and restarts Angie.

2. If Angie’s `run_ui.py` **does not** read `HOST` or `FLASK_RUN_HOST`, you need to change the app to bind to `0.0.0.0`. On the droplet, run:
   ```bash
   ssh root@157.245.7.40 'grep -n "run\|host\|127\|5000" /root/Angie/run_ui.py | head -20'
   ```
   Then in `run_ui.py` (locally and re-deploy, or once on the droplet), ensure the run call uses something like:
   - `app.run(host="0.0.0.0", port=5000)`  
   or  
   - `host=os.environ.get("HOST", "0.0.0.0")` so the env var we set is used.

3. Restart after any change:
   ```bash
   ssh root@157.245.7.40 'sudo systemctl restart angie && sleep 3 && sudo systemctl status angie --no-pager'
   ```

---

## 3. Test from your Dell

```bash
curl -s -o /dev/null -w "%{http_code}" http://157.245.7.40:5000
```

You want `200`. If you get `000` or connection refused, the app still isn’t listening on the public IP (re-check step 2).

---

## 4. Then try from the Chromebook

Open in Chrome:

**http://157.245.7.40:5000**

If your network blocks non-HTTPS or custom ports, use the Cloudflare Tunnel option in `CHROMEBOOK_ACCESS.md`.
