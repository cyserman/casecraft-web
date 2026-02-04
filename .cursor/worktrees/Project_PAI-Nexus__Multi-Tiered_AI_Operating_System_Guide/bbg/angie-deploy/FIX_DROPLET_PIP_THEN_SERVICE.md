# Fix droplet: scipy build failure, then install service

When **pip install -r requirements.txt** on the droplet fails with a **scipy Cython/nogil** error (or "Assignment of Python object not allowed without gil"), the venv is incomplete and Angie won't start. Fix the venv by forcing scipy to use a pre-built wheel, then install the service.

**Run from your Dell.** Copy-paste each block in order.

---

## 1. Fix the venv on the droplet (scipy from wheel, then rest of requirements)

```bash
ssh root@157.245.7.40 'cd /root/Angie && ./venv/bin/pip install --upgrade pip -q && ./venv/bin/pip install "scipy>=1.11" --only-binary=scipy -q && ./venv/bin/pip install -r requirements.txt -q'
```

If that still fails, try:

```bash
ssh root@157.245.7.40 'cd /root/Angie && ./venv/bin/pip install --upgrade pip -q && ./venv/bin/pip install "scipy>=1.11,<1.14" -q && ./venv/bin/pip install -r requirements.txt -q'
```

Wait for it to finish. If you see "Successfully installed ..." at the end, go to step 2.

---

## 2. Install the systemd service (from your Dell)

```bash
cd ~/.cursor/worktrees/Project_PAI-Nexus__Multi-Tiered_AI_Operating_System_Guide/bbg/angie-deploy

scp -o StrictHostKeyChecking=accept-new angie.service root@157.245.7.40:/tmp/angie.service
ssh root@157.245.7.40 'sudo cp /tmp/angie.service /etc/systemd/system/ && sudo systemctl daemon-reload && sudo systemctl enable angie && sudo systemctl start angie'
```

---

## 3. Fix API key and settings (if you had Vertex/refused before)

```bash
scp -o StrictHostKeyChecking=accept-new ~/.pai/.env root@157.245.7.40:/root/.pai/.env
ssh root@157.245.7.40 'chmod 600 /root/.pai/.env'

scp ~/Angie/tmp/settings.json root@157.245.7.40:/root/Angie/tmp/settings.json

ssh root@157.245.7.40 'sudo systemctl restart angie && sleep 4 && sudo systemctl status angie --no-pager'
```

---

## 4. Verify

```bash
ssh root@157.245.7.40 'tail -40 /root/Angie/angie.log'
curl -s -o /dev/null -w "%{http_code}" http://157.245.7.40:5000
```

You want **200**. Then open **http://157.245.7.40:5000** in a browser. If the service is **failed**, see **FIX_VERTEX_API_KEY.md**.
