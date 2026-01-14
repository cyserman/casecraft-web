#!/usr/bin/env bash
# -------------------------------------------------
# delegate_todo.sh – split todo.md into two agents
# -------------------------------------------------

BASE="/home/cyserman/Projects/casecraft-premium (1)"
TODO="${BASE}/todo.md"
AGENT1="${BASE}/todo_agent_1.md"
AGENT2="${BASE}/todo_agent_2.md"

# 1️⃣ Load the file
if [[ ! -f "$TODO" ]]; then
  echo "❌ Todo file not found at $TODO"
  exit 1
fi
TOTAL_LINES=$(wc -l < "$TODO")
HALF=$(( (TOTAL_LINES + 1) / 2 ))

# 2️⃣ Detect headings (optional)
HEADINGS=$(grep -n '^## ' "$TODO" | cut -d: -f1)
if [[ -n "$HEADINGS" ]]; then
  # Use the first heading after the first half as split point
  SPLIT=$(echo "$HEADINGS" | awk -v half=$HALF '$1 > half {print $1; exit}')
else
  SPLIT=$HALF
fi

# 3️⃣ Create the two files
head -n $((SPLIT-1)) "$TODO" > "$AGENT1"
# tail from SPLIT line to end
tail -n +$SPLIT "$TODO" > "$AGENT2"

echo "✅ Created:"
echo "   • $AGENT1 (first $((SPLIT-1)) lines)"
echo "   • $AGENT2 (remaining $((TOTAL_LINES-SPLIT+1)) lines)"

# 4️⃣ Summarise responsibilities
cat <<EOF

🧑‍💻 **Agent 1** – UI/UX, styling, component creation
🧑‍💻 **Agent 2** – Backend logic, data handling, integration

You can now start two separate sessions (or two separate AI agents) and point each at its respective file.
EOF
