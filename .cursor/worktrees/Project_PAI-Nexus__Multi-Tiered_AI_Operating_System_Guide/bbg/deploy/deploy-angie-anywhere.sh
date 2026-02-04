#!/usr/bin/env bash
# Deploy Angie to Enforcer Droplet - run from ANY directory.
# Copy this whole file, save as deploy-angie-anywhere.sh, chmod +x, run.
# You will be prompted for root password for 157.245.7.40 when needed.

set -e
DROPLET="${1:-root@157.245.7.40}"
SERVICE_NAME="angie"
SSH_OPTS="-o StrictHostKeyChecking=accept-new -o ConnectTimeout=15"
SCP_OPTS="$SSH_OPTS"
RSYNC_SSH="ssh $SSH_OPTS"

# --- Find Angie (works from any directory) ---
if [ -n "$ANGIE_SOURCE" ] && [ -f "$ANGIE_SOURCE/run_ui.py" ]; then
  ANGIE_SOURCE="$ANGIE_SOURCE"
elif [ -f "$HOME/Angie/run_ui.py" ]; then
  ANGIE_SOURCE="$HOME/Angie"
elif [ -f "/home/cyserman/Angie/run_ui.py" ]; then
  ANGIE_SOURCE="/home/cyserman/Angie"
else
  echo "ERROR: Could not find Angie (run_ui.py). Set ANGIE_SOURCE= and run again."
  exit 1
fi

# --- Find .env ---
ENV_FILE="$HOME/.pai/.env"
if [ ! -f "$ENV_FILE" ]; then
  echo "ERROR: $ENV_FILE not found. Create it with GEMINI_API_KEY etc."
  exit 1
fi

echo "=============================================="
echo "  Angie → Enforcer Droplet"
echo "  Target: $DROPLET"
echo "  Angie:  $ANGIE_SOURCE"
echo "=============================================="
echo ""
echo "  You may be prompted for the root password."
echo ""

# [1/7]
echo "[1/7] Ensuring ~/.pai and .env on droplet..."
ssh $SSH_OPTS "$DROPLET" "mkdir -p /root/.pai"
if ! ssh $SSH_OPTS "$DROPLET" "test -f /root/.pai/.env"; then
  scp $SCP_OPTS "$ENV_FILE" "$DROPLET:/root/.pai/.env"
  ssh $SSH_OPTS "$DROPLET" "chmod 600 /root/.pai/.env"
else
  echo "  .env already on droplet (skipping)"
fi

# [2/7]
echo ""
echo "[2/7] Syncing Angie to droplet..."
rsync -avz -e "$RSYNC_SSH" --exclude 'venv' --exclude '__pycache__' --exclude '.git' --exclude 'angie.log' \
  "$ANGIE_SOURCE/" "$DROPLET:/root/Angie/" 2>/dev/null || {
  echo "  Using scp..."
  ssh $SSH_OPTS "$DROPLET" "mkdir -p /root/Angie"
  scp $SCP_OPTS -r "$ANGIE_SOURCE"/* "$DROPLET:/root/Angie/"
}

# [3/7]
echo ""
echo "[3/7] Python venv and dependencies..."
ssh $SSH_OPTS "$DROPLET" "cd /root/Angie && ( test -d venv || python3 -m venv venv ) && ./venv/bin/pip install -r requirements.txt -q"

# [4/7]
echo ""
echo "[4/7] Settings..."
ssh $SSH_OPTS "$DROPLET" "mkdir -p /root/Angie/tmp"
[ -f "$ANGIE_SOURCE/tmp/settings.json" ] && scp $SCP_OPTS "$ANGIE_SOURCE/tmp/settings.json" "$DROPLET:/root/Angie/tmp/settings.json" 2>/dev/null || true

# [5/7] systemd unit (embedded, no separate file needed)
echo ""
echo "[5/7] Installing systemd service..."
TMP_SVC="$(mktemp)"
trap "rm -f $TMP_SVC" EXIT
cat > "$TMP_SVC" << 'SVC'
[Unit]
Description=Angie PAI-Nexus AI Assistant
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/root/Angie
EnvironmentFile=-/root/.pai/.env
Environment=PATH=/root/Angie/venv/bin:/usr/local/bin:/usr/bin:/bin
ExecStart=/root/Angie/venv/bin/python3 run_ui.py
Restart=always
RestartSec=10
StandardOutput=append:/root/Angie/angie.log
StandardError=append:/root/Angie/angie.log

[Install]
WantedBy=multi-user.target
SVC
scp $SCP_OPTS "$TMP_SVC" "$DROPLET:/tmp/angie.service"
ssh $SSH_OPTS "$DROPLET" "sudo cp /tmp/angie.service /etc/systemd/system/ && sudo systemctl daemon-reload"

# [6/7]
echo ""
echo "[6/7] Enabling and starting Angie..."
ssh $SSH_OPTS "$DROPLET" "sudo systemctl enable $SERVICE_NAME && sudo systemctl restart $SERVICE_NAME && sleep 3 && sudo systemctl status $SERVICE_NAME --no-pager"

# [7/7]
echo ""
echo "[7/7] Opening port 5000..."
ssh $SSH_OPTS "$DROPLET" "sudo ufw allow 5000/tcp 2>/dev/null; sudo ufw --force enable 2>/dev/null; sudo ufw status | head -20"

echo ""
echo "=============================================="
echo "  Done. From Chromebook open:"
echo "    http://157.245.7.40:5000"
echo "=============================================="
