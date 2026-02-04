# Prompt for Manus: Research stable Moltbot alternatives and produce implementation scripts

**Give the text below to Manus** (with your credentials / copilot connect). Manus will research and return (1) recommended stable Moltbot alternatives and (2) concrete scripts for the execution agent and for you.

---

## Copy from here (prompt for Manus)

I need to get a working AI assistant in the cloud as simply as possible. I’ve been trying to deploy Agent Zero / Angie for over a week and keep hitting Python dependency and config issues. I want to try a more stable path first.

**My setup**
- **Server:** DigitalOcean Droplet (Ubuntu, root SSH), IP: 157.245.7.40 (Enforcer Droplet).
- **Goal:** Something usable in the browser (from my Dell and Chromebook) as soon as possible. Prefer “one-command” or Docker-style deploys over manual Python venv + systemd.
- **Later:** I may add Angie/Agent Zero on the same server once the simpler stack is working.

**What I want from you**

1. **Research**  
   Find **stable, well-documented alternatives to Moltbot** (or Moltbot itself if it’s the simplest) that:
   - Can be deployed on a single Ubuntu VPS (Droplet).
   - Prefer: Docker image, official install script, or very clear step-by-step that a non-expert can follow.
   - Are actively maintained and known to work (e.g. Open WebUI, Ollama + a simple UI, Moltbot, or other “run one container/script and get a chat UI” options).
   - Don’t require building heavy Python stacks from source (no scipy/Cython-type build failures).

2. **Produce two deliverables**

   **Deliverable A – Execution agent script**  
   A single markdown document (or clear section) titled **EXECUTION_AGENT_SCRIPT** that another agent (Cursor / “execution agent”) can follow step-by-step. It must:
   - Assume the agent has: SSH root access to 157.245.7.40, ability to run terminal commands, and access to this project’s `deploy/` folder.
   - List steps in order: e.g. “1. SSH to droplet and install Docker if missing. 2. Run the following docker run … 3. Open firewall port X. 4. Verify with curl …”
   - Use concrete commands (no “install Docker” without the exact apt/script). The execution agent will run these as the user’s proxy.
   - Include a one-line or short “verify” command (e.g. `curl -s -o /dev/null -w "%{http_code}" http://157.245.7.40:PORT`) and what the user should open in the browser (e.g. http://157.245.7.40:8080).
   - Be as simple as possible: minimal steps, minimal choices. Prefer one recommended path (e.g. one Docker image or one install method).

   **Deliverable B – User follow-along script**  
   A short **USER_FOLLOW_ALONG_SCRIPT** that I (the human) can follow while the execution agent does the work. For example:
   - Step 1: “Send this research prompt to Manus.”
   - Step 2: “Paste Manus’s EXECUTION_AGENT_SCRIPT into the project (or give it to Cursor).”
   - Step 3: “Tell the execution agent: Run section 1 of the script (install Docker).”
   - Step 4: “After agent confirms, tell it: Run section 2 (run container / start service).”
   - Step 5: “Verify: open http://157.245.7.40:PORT in browser and confirm the UI loads.”
   - Include 1–2 sentence “what to say to the agent” for each step so I can copy-paste.

3. **Constraints**
   - Target “easiest path to a usable chat UI on my droplet,” not maximum features. I can add Angie or other tools later.
   - Assume I have an API key for at least one LLM (e.g. OpenAI, Anthropic, or Google) if the solution needs one; the script can say “set env var API_KEY” or “create .env with …” and I’ll fill it.
   - Do not include my real API keys or passwords in the script; use placeholders like `YOUR_OPENAI_API_KEY` or `YOUR_ANTHROPIC_API_KEY`.

Please respond with:
- A short list of 1–3 recommended options (with one clear “recommended” choice and why).
- The full **EXECUTION_AGENT_SCRIPT** (so I can paste it into the project for the execution agent).
- The full **USER_FOLLOW_ALONG_SCRIPT** (so I can follow along step-by-step).

---

## After Manus responds

1. Create or update **EXECUTION_AGENT_SCRIPT.md** in this project’s `deploy/` folder with the content Manus provides for the execution agent.
2. Create or update **USER_FOLLOW_ALONG_SCRIPT.md** with the content Manus provides for you.
3. Follow **USER_FOLLOW_ALONG_SCRIPT.md** yourself and tell the execution agent (Cursor) to run each section of **EXECUTION_AGENT_SCRIPT.md** in order.
