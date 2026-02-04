# Deploy Angie — one command (run from any directory)

Run **only** the command below. You may be prompted for the root password for the droplet.

---

## Single command (copy this line only)

```bash
bash ~/deploy-angie-anywhere.sh
```

The script is in your home directory (`~/deploy-angie-anywhere.sh`), so this works from any directory and you don’t need to remember the worktree path.

---

## If the script is missing

If you get “No such file or directory”, the script was not in your home dir. Create it with (copy the **whole** block, paste, Enter):

```bash
cp /home/cyserman/.cursor/worktrees/Project_PAI-Nexus__Multi-Tiered_AI_Operating_System_Guide/bbg/deploy/deploy-angie-anywhere.sh ~/ && chmod +x ~/deploy-angie-anywhere.sh
```

Note: the worktree name has **two underscores**: `Nexus__Multi` (not `NexusMulti`).
