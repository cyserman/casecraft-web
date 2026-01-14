#!/usr/bin/env bash
# -------------------------------------------------
# run_agents_node.sh – cross‑platform watcher using chokidar-cli
# -------------------------------------------------
# This script works on Linux, macOS, and Windows (via WSL or Git Bash).
# It requires the global npm package `chokidar-cli`:
#   npm install -g chokidar-cli
#
# Edit the COMMAND_* variables to point at the actual work each agent should perform.

BASE="/home/cyserman/Projects/casecraft-premium (1)"
AGENT1_FILE="${BASE}/todo_agent_1.md"
AGENT2_FILE="${BASE}/todo_agent_2.md"

# -----------------------------------------------------------------
# Define the command each agent should run when its task file changes.
# -----------------------------------------------------------------
# Example: start the Vite dev server for the UI side
COMMAND_AGENT1="npm --prefix \"${BASE}/client\" run dev"
# Example: start the backend API server
COMMAND_AGENT2="npm --prefix \"${BASE}/server\" run dev"

# Run chokidar for each file in the background.
# The -c flag runs the supplied command whenever a change is detected.
chokidar "$AGENT1_FILE" -c "$COMMAND_AGENT1" &
chokidar "$AGENT2_FILE" -c "$COMMAND_AGENT2" &

# Keep the script alive while background jobs run.
wait
