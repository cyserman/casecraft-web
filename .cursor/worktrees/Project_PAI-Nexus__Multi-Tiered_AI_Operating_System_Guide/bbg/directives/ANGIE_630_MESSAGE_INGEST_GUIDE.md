# Angie: 630 Message Ingest Guide

**Date:** February 02, 2026  
**For:** Angie (Agent Zero)  
**Subject:** Locating and Processing the 630 Messages Through Discovery Airlock

---

## Current Status

**Good news:** The PAI-Nexus infrastructure is set up and running.  
**Action needed:** The 630 messages need to be located and placed in the correct directory structure.

---

## Where the 630 Messages Should Be Located

Based on the PAI-Nexus architecture and LegalForge project structure, the messages should be placed in one of these locations:

### Option 1: LegalForge Project Structure (Recommended)

```
~/.pai/SKILLS/CaseCraft/
├── data/
│   └── raw_messages.csv          # <-- 630 messages go here
├── backend/
│   ├── api_server.py             # Discovery Airlock endpoint
│   └── legalforge.db             # Database for processed data
└── strategy.md                   # Strategic Anchors
```

### Option 2: PAI Skills Structure (Alternative)

```
~/.pai/SKILLS/_PROSE/
└── data/
    └── raw_messages.csv          # <-- 630 messages go here
```

**Note:** The `_PROSE` skill would be a general text processing skill, while `CaseCraft` is the LegalForge-specific project.

---

## Current Directory Status

**PAI Root:** `~/.pai/` ✅ Exists
- `SKILLS/` directory exists but is empty (only `.gitkeep`)
- `Tools/` directory exists (contains `gateway.py`)
- `MEMORY/` directory exists (WORK and LEARNING subdirectories)

**LegalForge Project:** Not yet set up
- Need to create `~/.pai/SKILLS/CaseCraft/` structure
- Need to place `api_server.py` in the backend folder
- Need to create `data/` folder for the 630 messages

---

## How to Process Messages Through Discovery Airlock

### Step 1: Set Up LegalForge Project Structure

```bash
# Create the LegalForge project directory
mkdir -p ~/.pai/SKILLS/CaseCraft/{data,backend}

# Place the 630 messages CSV file
# (User needs to provide the file location)
# cp /path/to/630_messages.csv ~/.pai/SKILLS/CaseCraft/data/raw_messages.csv
```

### Step 2: Set Up Discovery Airlock Backend

The Discovery Airlock is the `/api/angie/bridge` endpoint in `api_server.py`. This needs to be:

1. **Located:** Currently `api_server.py` exists in the workspace root
2. **Moved to:** `~/.pai/SKILLS/CaseCraft/backend/api_server.py`
3. **Database:** Creates `legalforge.db` in the backend folder

**API Endpoint:**
```python
POST /api/angie/bridge
Body: {"content": "message text"}
```

This endpoint:
- Receives raw content from Angie
- Stores it in `Discovery_Blocks` table
- Marks it for processing
- Returns confirmation

### Step 3: Process Messages Through Intelligence Bridge

**Intelligence Bridge Flow:**
1. **Angie** reads messages from `~/.pai/SKILLS/CaseCraft/data/raw_messages.csv`
2. **Gateway** routes processing (Ollama for bulk, Gemini for strategy)
3. **Discovery Airlock** receives processed chunks via `/api/angie/bridge`
4. **Forensic Spine** stores structured data in `legalforge.db`
5. **Strategic Anchors** extracted and stored in `Strategic_Anchors` table

---

## What Angie Needs to Know

### 1. Message File Location

**Question:** "Where can I find those messages?"

**Answer:** The 630 messages need to be provided by the user. They should be:
- A CSV file with message data
- Placed in `~/.pai/SKILLS/CaseCraft/data/raw_messages.csv`
- Or in `~/.pai/SKILLS/_PROSE/data/raw_messages.csv` (if using general skill)

**Current Status:** File not found in expected locations. User needs to:
1. Locate the original 630-message file
2. Place it in the appropriate directory
3. Confirm the file path

### 2. Discovery Airlock Setup

**Current Status:**
- `api_server.py` exists but needs to be moved to project folder
- Database tables defined: `Discovery_Blocks`, `Strategic_Anchors`, `Events`
- Backend server needs to be started separately from Angie

**Action Required:**
- Move `api_server.py` to `~/.pai/SKILLS/CaseCraft/backend/`
- Start the FastAPI server (runs on separate port, e.g., 8000)
- Angie connects to it via HTTP POST to `/api/angie/bridge`

### 3. Processing Workflow

**Recommended Approach (from pasted_content.txt):**

1. **First Pass (Ollama - Free/Local):**
   - Read all 630 messages
   - Look for keywords: "Ford", "Christmas", "Motel 6", "Late"
   - Tag messages for Discovery Airlock
   - Save credits for strategic work

2. **Second Pass (Gemini - Strategic):**
   - Process tagged messages through Intelligence Bridge
   - Extract Strategic Anchors
   - Store in Forensic Spine database
   - Generate timeline and narrative

---

## Next Steps for Angie

1. **Ask the user:**
   - "Where is the 630-message CSV file located?"
   - "Should I set up the LegalForge project structure now?"
   - "Do you want me to create the Discovery Airlock backend?"

2. **Once file is located:**
   - Verify file format (CSV expected)
   - Check file size and structure
   - Propose processing plan (Ollama first pass, then Gemini)

3. **Set up processing:**
   - Create project directory structure
   - Move `api_server.py` to correct location
   - Start backend server
   - Begin message ingestion

---

## Architecture Reference

**Discovery Airlock:**
- Purpose: Secure entry point for raw data ingestion
- Location: `~/.pai/SKILLS/CaseCraft/backend/api_server.py`
- Endpoint: `POST /api/angie/bridge`
- Storage: `Discovery_Blocks` table in `legalforge.db`

**Forensic Spine:**
- Purpose: Immutable event timeline
- Storage: `Events` table in `legalforge.db`
- Fields: `id`, `timestamp`, `description`, `reliability`

**Strategic Anchors:**
- Purpose: Key legal points and narrative elements
- Storage: `Strategic_Anchors` table in `legalforge.db`
- Fields: `id`, `key_point`, `description`

**Intelligence Bridge:**
- Purpose: Connection between Angie and LegalForge backend
- Implementation: HTTP client in Angie → POST to `/api/angie/bridge`
- Gateway: Routes to Ollama (bulk) or Gemini (strategy)

---

## THEBOSS Summary

**Status:** ⏳ Awaiting 630-message file location

**What's Ready:**
- ✅ PAI-Nexus infrastructure
- ✅ Gateway (Ollama/Gemini routing)
- ✅ Directory structure (`~/.pai/SKILLS/`)

**What's Needed:**
- ⏳ 630-message CSV file location
- ⏳ LegalForge project structure setup
- ⏳ Discovery Airlock backend deployment
- ⏳ Message processing workflow

**Action:** Angie should ask the user for the 630-message file location and confirm the processing approach.

---

**THEBOSS: Angie needs the user to provide the 630-message file location before processing can begin.**
