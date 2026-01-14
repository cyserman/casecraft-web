---
description: Split huge TODO into two agents
---

## Overview
The current `todo.md` contains a large list of tasks. To accelerate progress we will split the list into two logical groups and assign each group to a dedicated agent. This workflow automates the split and provides clear hand‑off instructions.

## Steps
1. **Read the TODO file**
   - Open `/home/cyserman/Projects/casecraft-premium (1)/todo.md` and capture its contents.
2. **Identify natural halves**
   - If the file already contains section headings (e.g., `## Front‑end`, `## Back‑end`), use those as the split points.
   - Otherwise, split the list roughly in half by line count.
3. **Create two new task files**
   - `/home/cyserman/Projects/casecraft-premium (1)/todo_agent_1.md` – first half of tasks.
   - `/home/cyserman/Projects/casecraft-premium (1)/todo_agent_2.md` – second half of tasks.
4. **Assign agents**
   - **Agent 1** – Focus on UI/UX, styling, component creation.
   - **Agent 2** – Focus on backend logic, data handling, integration.
5. **Notify the user**
   - Provide a summary of the split and the responsibilities of each agent.

## Agent Instructions
- **Agent 1** should read `todo_agent_1.md`, prioritize tasks, and start implementation.
- **Agent 2** should read `todo_agent_2.md`, prioritize tasks, and start implementation.

## Completion
Once both agents have completed their assigned tasks, merge the results back into the main `todo.md` and close the workflow.
