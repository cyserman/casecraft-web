# User follow-along script: get to a usable phase

Use this **yourself** while the execution agent (Cursor) runs the technical steps. Do the steps in order. You can copy-paste the “Say to the agent” lines into the chat.

---

## Step 0: Get the research and scripts from Manus

1. Open **MANUS_RESEARCH_AND_SCRIPT_PROMPT.md** in this folder.
2. Copy the whole “Copy from here (prompt for Manus)” section (the prompt for Manus).
3. Send that prompt to **Manus** (with your credentials / copilot connect or whatever you use for Manus).
4. When Manus responds, you should get:
   - A short list of 1–3 recommended options (e.g. Open WebUI, Moltbot, or another).
   - **EXECUTION_AGENT_SCRIPT** (steps for Cursor to run).
   - **USER_FOLLOW_ALONG_SCRIPT** (or use this file and Manus’s version to update it).

5. **Paste Manus’s EXECUTION_AGENT_SCRIPT** into **EXECUTION_AGENT_SCRIPT.md** in this folder (replace or merge with the placeholder). If Manus gave a different structure, create a new file or replace the content so the execution agent has one clear list of steps.

---

## Step 1: Install Docker on the droplet (execution agent)

**You say to the agent (Cursor):**

> Run Section 1 of deploy/EXECUTION_AGENT_SCRIPT.md: ensure Docker is installed and running on 157.245.7.40. Run the SSH commands from your side and tell me the result (success or any error).

**You do:** Wait for the agent to confirm. If there’s an error, share it with the agent and ask how to fix it.

---

## Step 2: Start the chosen app (execution agent)

**You say to the agent:**

> Run Section 2 of deploy/EXECUTION_AGENT_SCRIPT.md: run the Docker container (or install command) for the app we chose. Use the exact image/port from Manus’s script. If an API key is needed, use placeholder YOUR_OPENAI_API_KEY (or the placeholder Manus used); I’ll add my real key in the app UI after it’s up.

**You do:** Wait for confirmation. If the agent says “replace IMAGE_NAME with X”, the agent should do that and run the command.

---

## Step 3: Open firewall and verify (execution agent)

**You say to the agent:**

> Run Section 3 and Section 4 of deploy/EXECUTION_AGENT_SCRIPT.md: open the firewall for the app’s port and run the verify curl. Tell me the curl result and the URL I should open (e.g. http://157.245.7.40:8080).

**You do:** Note the URL the agent gives you.

---

## Step 4: You verify in the browser

1. On your **Dell**, open the URL (e.g. http://157.245.7.40:8080) in Chrome.
2. If the UI loads (login or chat screen), you’re at a **usable phase**. Try a quick chat if the app needs an API key and you’ve added it in Settings.
3. On your **Chromebook**, open the same URL. If it loads there too, you’re done with “something working in the cloud.”

---

## Step 5: Add your API key (if needed)

If the app has a Settings or “API key” page, add your real key there. Do not paste your key in the chat; do it in the app’s UI.

---

## Optional: Run fallback without waiting for Manus

If you want to try **immediately** without Manus’s response, say to the agent:

> Run the Fallback (Open WebUI) in deploy/EXECUTION_AGENT_SCRIPT.md: Section 1, then the Fallback Section 2 (Open WebUI on 8080), then Section 3 and 4 with port 8080. Give me the URL to open.

Then do Step 4 above (open http://157.245.7.40:8080 in the browser). You can add your API key in Open WebUI’s Settings after the first load.

---

## If something fails

- **Agent says “connection refused” or curl 000:** Ask the agent to run `ssh root@157.245.7.40 'docker ps -a'` and the container logs (e.g. `docker logs chat-ui`) and to fix or suggest a fix.
- **Manus didn’t give a full script:** Use the placeholder **EXECUTION_AGENT_SCRIPT.md** in this folder and ask the execution agent to run it with a well-known image (e.g. Open WebUI) and the port 8080; the agent can fill in the exact `docker run` from public docs.

---

## After you’re at a usable phase

- You can add Angie/Agent Zero later on the same server (different port) using the existing deploy docs.
- Keep **MANUS_RESEARCH_AND_SCRIPT_PROMPT.md** and these scripts for future “deploy another app” or “reset and redo” runs.
