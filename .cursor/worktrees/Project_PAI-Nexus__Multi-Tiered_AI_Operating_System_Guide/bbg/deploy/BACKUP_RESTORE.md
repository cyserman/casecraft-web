# Angie Droplet Backup and Restore

**Droplet:** 157.245.7.40  
**Paths to back up:** `/root/Angie/tmp` (settings, chats, scheduler), optionally `memory/`, `uploads/`.

---

## Backup (pull from droplet to your Dell)

From your **local machine** (Dell), run:

```bash
# Create a timestamped backup folder
BACKUP_DIR=~/angie-droplet-backups/$(date +%Y%m%d_%H%M)
mkdir -p "$BACKUP_DIR"

# Pull critical data from droplet (you may be prompted for root password)
rsync -avz -e "ssh -o StrictHostKeyChecking=accept-new" \
  root@157.245.7.40:/root/Angie/tmp/ \
  "$BACKUP_DIR/tmp/"

# Optional: backup memory and uploads
rsync -avz -e "ssh -o StrictHostKeyChecking=accept-new" \
  root@157.245.7.40:/root/Angie/memory/ \
  "$BACKUP_DIR/memory/" 2>/dev/null || true
rsync -avz -e "ssh -o StrictHostKeyChecking=accept-new" \
  root@157.245.7.40:/root/Angie/tmp/uploads/ \
  "$BACKUP_DIR/uploads/" 2>/dev/null || true

echo "Backup saved to $BACKUP_DIR"
```

---

## Restore (push from your Dell to droplet)

Only do this if you need to restore after a redeploy or data loss.

```bash
# Pick the backup folder to restore (e.g. ~/angie-droplet-backups/20260205_1200)
BACKUP_DIR=~/angie-droplet-backups/YYYYMMDD_HHMM   # set this

# Restore tmp (settings, chats)
rsync -avz -e "ssh -o StrictHostKeyChecking=accept-new" \
  "$BACKUP_DIR/tmp/" \
  root@157.245.7.40:/root/Angie/tmp/

# Restart Angie so it picks up restored state
ssh root@157.245.7.40 'sudo systemctl restart angie'
```

---

## Quick reference

| Action   | Command (from Dell) |
|----------|----------------------|
| Backup   | See "Backup" block above; backup dir is `~/angie-droplet-backups/<timestamp>/` |
| Restore  | Set `BACKUP_DIR`, run rsync to `/root/Angie/tmp/`, then `systemctl restart angie` |

See **RUNBOOK.md** for service and log commands.
