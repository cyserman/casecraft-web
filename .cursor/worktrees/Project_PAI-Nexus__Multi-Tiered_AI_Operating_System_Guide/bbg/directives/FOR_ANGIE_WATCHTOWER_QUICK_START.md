# For Angie: Watchtower Quick Start Guide

**Read this first:** `directives/WATCHTOWER_SPECIFICATIONS.md` (full details)

---

## Quick Answers to Your Questions

### Objective
**Primary Goal:** Forensic analysis skill that processes raw data through a "Discovery Airlock" and stores structured events in an immutable "Forensic Spine" timeline.

**Questions to Answer:**
- What happened? (Event extraction)
- When did it happen? (Timestamp normalization)
- How reliable is it? (Source verification and confidence scoring)
- What are the key points? (Strategic anchor identification)

---

### Data Source (Input)

**Primary:** API Endpoint
- `POST http://localhost:8000/api/angie/bridge`
- Body: `{"content": "raw text", "source": "identifier", "timestamp_utc": "ISO datetime"}`
- The `watchtower_api.py` file already exists at `/home/cyserman/Angie/usr/projects/setup_hi_angie_i_messed_you/watchtower_api.py`

**Secondary:** File-Based
- Location: `~/.pai/SKILLS/Watchtower/data/raw/`
- Formats: CSV, JSON, text files
- Example: 630 messages CSV (when provided)

**Future:** External Sources
- Enforcer Droplet: `157.245.7.40` (SSH logs, system logs)
- Database: SQLite at `~/.pai/SKILLS/Watchtower/data/forensic.db`

---

### Core Logic (Processing)

**Step 1: Data Ingestion**
- Receive raw content via API or file read
- Extract metadata (source, timestamp, content type)
- Store raw data in `Discovery_Blocks` table

**Step 2: Event Extraction**
- Parse content for:
  - Timestamps (normalize to UTC)
  - Entities (people, places, events)
  - Actions (what happened)
  - Context (surrounding circumstances)

**Step 3: Reliability Scoring**
- Source verification
- Confidence level (High/Medium/Low)
- Cross-reference with existing events
- Flag anomalies

**Step 4: Forensic Spine Storage**
- Store in `Events` table:
  - id, timestamp, description, reliability, source, raw_content_id

**Step 5: Strategic Anchor Extraction**
- Identify key forensic/legal points
- Store in `Strategic_Anchors` table

---

### Deliverable (Output)

**Primary:** SQLite Database
- Location: `~/.pai/SKILLS/Watchtower/data/forensic.db`
- Tables: `Discovery_Blocks`, `Events`, `Strategic_Anchors`

**Secondary:**
- JSON Reports: `~/.pai/MEMORY/WORK/watchtower/reports/{timestamp}_forensic_report.json`
- Timeline Exports: `~/.pai/MEMORY/WORK/watchtower/timelines/` (CSV/JSON)
- API Response: Status and event IDs

---

### Technology & Constraints

**Required Libraries:**
- `sqlite3` (standard library)
- `datetime` (standard library)
- `re` (standard library)
- `json` (standard library)
- `pathlib` (standard library)
- `fastapi` (already in watchtower_api.py)

**Optional:**
- `pandas` - CSV processing
- `dateutil` - Advanced date parsing
- `nltk`/`spacy` - NLP for entity extraction

**Constraints:**
- No external API calls (process locally)
- Immutable events (once stored, don't change)
- UTC timestamps only
- Always track source

---

## Database Schema

```sql
-- Raw ingested data
CREATE TABLE IF NOT EXISTS Discovery_Blocks (
    id INTEGER PRIMARY KEY,
    raw_content TEXT,
    source TEXT,
    created_at TEXT,
    processed INTEGER DEFAULT 0
);

-- Structured timeline events
CREATE TABLE IF NOT EXISTS Events (
    id INTEGER PRIMARY KEY,
    timestamp TEXT,
    description TEXT,
    reliability TEXT,
    source TEXT,
    raw_content_id INTEGER,
    FOREIGN KEY(raw_content_id) REFERENCES Discovery_Blocks(id)
);

-- Key forensic points
CREATE TABLE IF NOT EXISTS Strategic_Anchors (
    id INTEGER PRIMARY KEY,
    key_point TEXT,
    description TEXT,
    related_event_ids TEXT  -- JSON array
);
```

---

## Implementation Order

**Phase 1 (MVP - Start Here):**
1. Create database file: `~/.pai/SKILLS/Watchtower/data/forensic.db`
2. Initialize tables (use schema above)
3. Modify `watchtower_api.py` `/ingest` endpoint to:
   - Store raw data in `Discovery_Blocks`
   - Extract basic events
   - Store in `Events` table
   - Return confirmation

**Phase 2 (Enhancement):**
- Advanced timestamp parsing
- Entity extraction
- Reliability scoring
- Strategic anchor identification

**Phase 3 (Reporting):**
- JSON report generation
- Timeline export
- Query interface

---

## Example API Call

```bash
POST http://localhost:8000/api/ingest
Headers: X-API-KEY: super-secret-key-change-me
Body:
{
  "source": "legal_case_001",
  "timestamp_utc": "2026-01-15T14:30:00Z",
  "content": "On January 15th, at 2:30 PM, John called..."
}
```

**Expected Response:**
```json
{
  "status": "success",
  "received_event_from": "legal_case_001",
  "event_id": 42,
  "stored_in": "forensic_spine"
}
```

---

## File Structure

```
~/.pai/SKILLS/Watchtower/
├── data/
│   ├── raw/              # Raw input files
│   └── forensic.db       # SQLite database
├── processor.py          # Event extraction logic
├── database.py           # Database operations
└── watchtower_api.py     # API endpoint (already exists)
```

---

## THEBOSS Instructions

**Angie, start with:**

1. **Read:** `directives/WATCHTOWER_SPECIFICATIONS.md` (full details)

2. **Create database:**
   ```python
   import sqlite3
   db_path = Path.home() / ".pai" / "SKILLS" / "Watchtower" / "data" / "forensic.db"
   # Initialize tables using schema above
   ```

3. **Connect API to database:**
   - Modify `watchtower_api.py` `/ingest` endpoint
   - Store raw data in `Discovery_Blocks`
   - Extract events and store in `Events`
   - Return event IDs

4. **Test:**
   - Send test data via API
   - Verify events stored correctly
   - Check timeline ordering

**Keep it simple for Phase 1 - get data in and stored correctly. We can enhance processing later.**

---

**THEBOSS: Full specifications ready. Start with Phase 1 MVP.**
