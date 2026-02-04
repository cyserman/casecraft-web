#!/usr/bin/env bash
# Deploy Angie to Enforcer Droplet (157.245.7.40)
# Run from your local machine (Dell). Requires SSH access to droplet.
# Usage: ./deploy-to-droplet.sh [ssh_user@157.245.7.40]
# You will be prompted for the root password if key-based auth is not set up.

set -e
DROPLET="${1:-root@157.245.7.40}"
# If Angie is elsewhere, set ANGIE_SOURCE before running:
#   export ANGIE_SOURCE=/home/cyserman/Angie
ANGIE_SOURCE="${ANGIE_SOURCE:-$HOME/Angie}"
SERVICE_NAME="angie"

# Allow password prompt; accept host key on first connect
SSH_OPTS="-o StrictHostKeyChecking=accept-new -o ConnectTimeout=15"
SCP_OPTS="$SSH_OPTS"
RSYNC_SSH="ssh $SSH_OPTS"

echo "=============================================="
echo "  Angie deployment to Enforcer Droplet"
echo "  Target: $DROPLET"
echo "  Source: $ANGIE_SOURCE"
echo "=============================================="
echo ""
echo "  You may be prompted for the root password for the droplet."
echo ""

# 1. Create .pai and .env on droplet if missing
echo "[1/9] Ensuring ~/.pai and .env on droplet..."
ssh $SSH_OPTS "$DROPLET" "mkdir -p /root/.pai"
if ! ssh $SSH_OPTS "$DROPLET" "test -f /root/.pai/.env"; then
  echo "  Creating /root/.pai/.env from your local ~/.pai/.env"
  scp $SCP_OPTS "$HOME/.pai/.env" "$DROPLET:/root/.pai/.env"
  ssh $SSH_OPTS "$DROPLET" "chmod 600 /root/.pai/.env"
else
  echo "  .env already exists on droplet (not overwriting)"
fi

# 2. Sync Angie directory (rsync or scp)
echo ""
echo "[2/9] Syncing Angie to droplet..."
rsync -avz -e "$RSYNC_SSH" --exclude 'venv' --exclude '__pycache__' --exclude '.git' --exclude 'angie.log' \
  "$ANGIE_SOURCE/" "$DROPLET:/root/Angie/" 2>/dev/null || {
  echo "  rsync not available or failed, using scp (slower)..."
  ssh $SSH_OPTS "$DROPLET" "mkdir -p /root/Angie"
  scp $SCP_OPTS -r "$ANGIE_SOURCE"/* "$DROPLET:/root/Angie/"
}

# 3. Install system build deps on droplet (for scipy etc.; idempotent)
echo ""
echo "[3/9] Ensuring system build dependencies on droplet (pkg-config, cmake, OpenBLAS)..."
ssh $SSH_OPTS "$DROPLET" "export DEBIAN_FRONTEND=noninteractive; apt-get update -qq && apt-get install -y -qq pkg-config cmake libopenblas-dev liblapack-dev 2>/dev/null || true"

# 4. Install Python venv and deps on droplet
echo ""
echo "[4/9] Ensuring Python venv and dependencies on droplet..."
ssh $SSH_OPTS "$DROPLET" "cd /root/Angie && ( test -d venv || python3 -m venv venv ) && ./venv/bin/pip install -r requirements.txt -q"

# 5. Copy fixed settings (util_model_name with gemini/ prefix)
echo ""
echo "[5/8] Ensuring model settings (gemini/gemini-2.5-flash)..."
ssh $SSH_OPTS "$DROPLET" "mkdir -p /root/Angie/tmp"
if [ -f "$ANGIE_SOURCE/tmp/settings.json" ]; then
  scp $SCP_OPTS "$ANGIE_SOURCE/tmp/settings.json" "$DROPLET:/root/Angie/tmp/settings.json" 2>/dev/null || true
fi

# 6. Install systemd service
echo ""
echo "[6/9] Installing systemd service..."
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
scp $SCP_OPTS "$SCRIPT_DIR/angie.service" "$DROPLET:/tmp/angie.service"
ssh $SSH_OPTS "$DROPLET" "sudo cp /tmp/angie.service /etc/systemd/system/ && sudo systemctl daemon-reload"

# 7. Enable and start Angie
echo ""
echo "[7/9] Enabling and starting Angie..."
ssh $SSH_OPTS "$DROPLET" "sudo systemctl enable $SERVICE_NAME && sudo systemctl restart $SERVICE_NAME && sleep 3 && sudo systemctl status $SERVICE_NAME --no-pager"

# 8. Install logrotate for angie.log (prevent disk fill)
echo ""
echo "[8/9] Installing logrotate for angie.log..."
scp $SCP_OPTS "$SCRIPT_DIR/logrotate.angie" "$DROPLET:/tmp/angie-logrotate" 2>/dev/null || true
ssh $SSH_OPTS "$DROPLET" "sudo cp /tmp/angie-logrotate /etc/logrotate.d/angie 2>/dev/null; sudo chmod 644 /etc/logrotate.d/angie 2>/dev/null" || true

# 9. Open port 5000 so Chromebook/browser can connect
echo ""
echo "[9/9] Opening firewall port 5000 for web access..."
ssh $SSH_OPTS "$DROPLET" "sudo ufw allow 5000/tcp 2>/dev/null; sudo ufw --force enable 2>/dev/null; sudo ufw status | head -20"

echo ""
echo "=============================================="
echo "  Deployment complete"
echo "=============================================="
echo ""
echo "  From your Chromebook (or any device with web access), open:"
echo "    http://157.245.7.40:5000"
echo ""
echo "  Useful commands:"
echo "    ssh $DROPLET 'sudo journalctl -u angie -f'   # logs"
echo "    ssh $DROPLET 'sudo systemctl restart angie' # restart"
echo ""
echo "  See deploy/CHROMEBOOK_ACCESS.md for HTTPS (Cloudflare Tunnel) option."
echo ""
