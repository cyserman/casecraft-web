# 🎯 HELPER INSTRUCTIONS: Phase 1 Completion

**From:** THEBOSS  
**Date:** February 02, 2026  
**Status:** URGENT - Complete Phase 1

---

## Current Status

**✅ Already Done:**
- Agent Zero cloned to `~/Angie/`
- PAI directory structure created (`~/.pai/`)
- `gateway.py` created in `~/.pai/Tools/`
- `personality.json` created
- `.env` template created
- SKILLS directory empty (clean slate)

**⚠️ NEEDS TO BE DONE:**

---

## Helper 1: Python Environment & Dependencies

**YOUR JOB:** Set up Python environment and install all dependencies

### Step 1: Create Virtual Environment
```bash
cd ~/Angie
python3 -m venv venv
source venv/bin/activate
```

### Step 2: Install Agent Zero Dependencies
```bash
pip install -r requirements.txt
```

### Step 3: Install Gateway Dependency
```bash
pip install python-dotenv
```

### Step 4: Verify Installation
```bash
python3 -c "import dotenv; print('✅ python-dotenv installed')"
cd ~/Angie && python3 -c "import agent; print('✅ Agent Zero imports work')" 2>&1 | head -1
```

### Step 5: Report to THEBOSS
Say: "Helper 1: Python environment setup complete" or report any errors

---

## Helper 2: Configuration & Verification

**YOUR JOB:** Verify configuration and prepare for launch

### Step 1: Check .env File
```bash
cat ~/.pai/.env | grep -E "^GEMINI|^OLLAMA" || echo "⚠️ Keys need to be added"
```

**IMPORTANT:** If keys are not set, tell the user:
> "Please add your GEMINI_API_KEY to ~/.pai/.env. Edit the file: `nano ~/.pai/.env`"
> 
> **DO NOT paste API keys in chat. User must edit the file directly.**

### Step 2: Create settings.json
```bash
test -f ~/.pai/settings.json || echo '{}' > ~/.pai/settings.json
```

### Step 3: Verify Clean Slate
```bash
ls -la ~/.pai/SKILLS/
# Should show only .gitkeep
```

### Step 4: Test Gateway (after Helper 1 completes)
```bash
python3 ~/.pai/Tools/gateway.py 2>&1 | head -10
```

### Step 5: Verify run_ui.py
```bash
test -f ~/Angie/run_ui.py && echo "✅ run_ui.py ready" || echo "⚠️ run_ui.py missing"
```

### Step 6: Report to THEBOSS
Say: "Helper 2: Configuration verified" or report any issues

---

## Critical Rules

1. **DO NOT paste API keys in chat** - User must edit `~/.pai/.env` directly
2. **Use virtual environment** - Don't use `--break-system-packages`
3. **Verify clean slate** - SKILLS directory must remain empty
4. **Report when done** - Tell THEBOSS your status

---

## Success Criteria

**Phase 1 is complete when:**
- [ ] Python dependencies installed (in venv)
- [ ] `python-dotenv` installed
- [ ] `.env` file has GEMINI_API_KEY (user adds it)
- [ ] `gateway.py` runs without errors
- [ ] `~/Angie/run_ui.py` can be launched
- [ ] SKILLS directory is empty
- [ ] No project-specific code anywhere

---

## After Completion

1. Both helpers report completion
2. THEBOSS will review
3. If approved → proceed to launch test
4. If rejected → fix issues and resubmit

---

**THEBOSS OUT: Get to work. Report back when done.**

**Reference:** `directives/PAI-Nexus_Architect_Prompt.md` for full workflow
