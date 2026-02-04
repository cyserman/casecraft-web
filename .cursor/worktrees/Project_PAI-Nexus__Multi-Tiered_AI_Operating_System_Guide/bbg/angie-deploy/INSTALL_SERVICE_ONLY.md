# Install angie.service only (when "Unit angie.service could not be found")

If the full deploy didn't complete but `/root/Angie` and venv exist on the droplet, install the systemd unit and start Angie from your **Dell**:

```bash
cd ~/.cursor/worktrees/Project_PAI-Nexus__Multi-Tiered_AI_Operating_System_Guide/bbg/deploy

# Copy service file to droplet and install
scp -o StrictHostKeyChecking=accept-new angie.service root@157.245.7.40:/tmp/angie.service
ssh root@157.245.7.40 'sudo cp /tmp/angie.service /etc/systemd/system/ && sudo systemctl daemon-reload && sudo systemctl enable angie && sudo systemctl start angie'

# Check
ssh root@157.245.7.40 'sudo systemctl status angie --no-pager'
curl -s -o /dev/null -w "%{http_code}" http://157.245.7.40:5000
```

If `status` shows active and curl returns 200, open http://157.245.7.40:5000 in a browser. If the service fails, check `ssh root@157.245.7.40 'tail -50 /root/Angie/angie.log'` (e.g. Vertex/API key — see FIX_VERTEX_API_KEY.md).
