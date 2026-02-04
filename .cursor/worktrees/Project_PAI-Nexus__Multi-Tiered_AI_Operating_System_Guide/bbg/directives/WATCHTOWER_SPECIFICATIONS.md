# Watchtower Forensic Skill - Specifications

**Date:** February 03, 2026  
**For:** Angie (Agent Zero)  
**Skill Location:** `~/.pai/SKILLS/Watchtower/`

---

## Objective

**Primary Goal:** 
Create a forensic analysis skill that processes raw data through a "Discovery Airlock" pattern, extracting structured events and storing them in an immutable "Forensic Spine" timeline.

**Specific Questions to Answer:**
1. **What happened?** - Extract chronological events from raw data
2. **When did it happen?** - Timestamp extraction and normalization
3. **What's the reliability?** - Source verification and confidence scoring
4. **What are the key anchors?** - Strategic points for legal/forensic analysis

**Threat Detection:**
- Pattern anomalies in communication/data
- Timeline inconsistencies
- Source reliability issues
- Key event identification

---

## Data Source (Input)

### Primary Input: API Endpoint
- **Location:** `http://localhost:8000/api/angie/bridge` (Discovery Airlock)
- **Format:** POST requests with raw content
- **Structure:**
  ```json
  {
    "content": "raw text/data",
    "source": "identifier",
    "timestamp_utc": "ISO datetime"
  }
  ```

### Secondary Input: File-Based
- **Location:** `~/.pai/SKILLS/Watchtower/data/raw/`
- **Formats:** CSV, JSON, text files, logs
- **Example:** The 630 messages CSV (when provided)

### External Sources (Future):
- **Enforcer Droplet:** `157.245.7.40` (SSH logs, system logs)
- **Database:** SQLite database at `~/.pai/SKILLS/Watchtower/data/forensic.db`

---

## Core Logic (Processing)

### Step 1: Data Ingestion (Discovery Airlock)
- Receive raw content via API or file read
- Extract metadata (source, timestamp, content type)
- Validate and sanitize input
- Store raw data in `Discovery_Blocks` table

### Step 2: Event Extraction
- Parse content for structured events:
  - **Timestamps:** Extract and normalize to UTC
  - **Entities:** People, places, events mentioned
  - **Actions:** What happened (verbs, activities)
  - **Context:** Surrounding circumstances

### Step 3: Reliability Scoring
- **Source verification:** Where did this come from?
- **Confidence level:** High/Medium/Low
- **Cross-reference:** Compare with existing events
- **Anomaly detection:** Flag inconsistencies

### Step 4: Forensic Spine Storage
- Store events in `Events` table:
  - `id` - Unique identifier
  - `timestamp` - Normalized UTC datetime
  - `description` - Structured event description
  - `reliability` - Confidence score (High/Medium/Low)
  - `source` - Original data source
  - `raw_content_id` - Link to Discovery_Blocks

### Step 5: Strategic Anchor Extraction
- Identify key points for legal/forensic analysis
- Store in `Strategic_Anchors` table:
  - `key_point` - Brief identifier
  - `description` - Detailed explanation
  - `related_events` - Linked event IDs

---

## Deliverable (Output)

### Primary Output: Forensic Spine Database
- **Location:** `~/.pai/SKILLS/Watchtower/data/forensic.db`
- **Tables:**
  - `Discovery_Blocks` - Raw ingested data
  - `Events` - Structured timeline events
  - `Strategic_Anchors` - Key forensic points

### Secondary Outputs:
1. **JSON Reports:**
   - Location: `~/.pai/MEMORY/WORK/watchtower/reports/`
   - Format: `{timestamp}_forensic_report.json`
   - Contains: Events, anchors, reliability scores

2. **Timeline Visualization:**
   - Location: `~/.pai/MEMORY/WORK/watchtower/timelines/`
   - Format: CSV or JSON timeline export
   - Use case: Legal documentation, analysis

3. **API Response:**
   - Return status and event count
   - Confirm ingestion success
   - Provide event IDs for reference

---

## Technology & Constraints

### Preferred Python Libraries:
- **`sqlite3`** - Database storage (standard library)
- **`datetime`** - Timestamp parsing and normalization
- **`re`** - Pattern matching for event extraction
- **`json`** - Data serialization
- **`pathlib`** - File path handling
- **`fastapi`** - API endpoint (already created: `watchtower_api.py`)

### Optional Libraries:
- **`pandas`** - Data analysis (if CSV processing needed)
- **`dateutil`** - Advanced date parsing
- **`nltk`** or **`spacy`** - NLP for entity extraction (if needed)

### Constraints:
- **No external API calls** - Process locally
- **Immutable events** - Once stored, events don't change
- **UTC timestamps** - All times normalized to UTC
- **Source tracking** - Always record where data came from

---

## Architecture Pattern

### Discovery Airlock Pattern:
```
Raw Data → Ingestion → Validation → Storage
                ↓
         Event Extraction
                ↓
         Reliability Scoring
                ↓
         Forensic Spine Storage
                ↓
         Strategic Anchor Extraction
```

### Database Schema:

**Discovery_Blocks:**
```sql
CREATE TABLE IF NOT EXISTS Discovery_Blocks (
    id INTEGER PRIMARY KEY,
    raw_content TEXT,
    source TEXT,
    created_at TEXT,
    processed INTEGER DEFAULT 0
)
```

**Events:**
```sql
CREATE TABLE IF NOT EXISTS Events (
    id INTEGER PRIMARY KEY,
    timestamp TEXT,
    description TEXT,
    reliability TEXT,
    source TEXT,
    raw_content_id INTEGER,
    FOREIGN KEY(raw_content_id) REFERENCES Discovery_Blocks(id)
)
```

**Strategic_Anchors:**
```sql
CREATE TABLE IF NOT EXISTS Strategic_Anchors (
    id INTEGER PRIMARY KEY,
    key_point TEXT,
    description TEXT,
    related_event_ids TEXT  -- JSON array of event IDs
)
```

---

## Implementation Phases

### Phase 1: Basic Ingestion (MVP)
- ✅ API endpoint created (`watchtower_api.py`)
- ⏳ Database initialization
- ⏳ Basic event extraction
- ⏳ Storage to Forensic Spine

### Phase 2: Enhanced Processing
- ⏳ Advanced timestamp parsing
- ⏳ Entity extraction
- ⏳ Reliability scoring
- ⏳ Strategic anchor identification

### Phase 3: Reporting & Analysis
- ⏳ JSON report generation
- ⏳ Timeline export
- ⏳ Query interface
- ⏳ Visualization tools

---

## Example Workflow

1. **Receive Data:**
   ```
   POST /ingest
   {
     "source": "legal_case_001",
     "timestamp_utc": "2026-01-15T14:30:00Z",
     "content": "On January 15th, at 2:30 PM, John called..."
   }
   ```

2. **Process:**
   - Extract timestamp: `2026-01-15T14:30:00Z`
   - Extract event: "John called"
   - Score reliability: "High" (from structured source)
   - Store in Events table

3. **Output:**
   - Event ID: 42
   - Stored in Forensic Spine
   - Available for timeline queries

---

## Integration Points

### With PAI-Nexus:
- **Gateway:** Uses `~/.pai/Tools/gateway.py` for LLM processing (if needed)
- **Memory:** Stores reports in `~/.pai/MEMORY/WORK/watchtower/`
- **Skills:** Lives in `~/.pai/SKILLS/Watchtower/`

### With LegalForge (Future):
- **Discovery Airlock:** Receives data from LegalForge backend
- **Forensic Spine:** Provides timeline data to LegalForge
- **Strategic Anchors:** Feeds into LegalForge analysis

---

## THEBOSS Instructions for Angie

**Angie, here's what to build:**

1. **Start with the database:**
   - Create `forensic.db` in `~/.pai/SKILLS/Watchtower/data/`
   - Initialize the three tables (Discovery_Blocks, Events, Strategic_Anchors)

2. **Connect the API:**
   - The `watchtower_api.py` file already exists
   - Modify `/ingest` endpoint to:
     - Store raw data in Discovery_Blocks
     - Extract events and store in Events
     - Return confirmation with event IDs

3. **Build the processor:**
   - Create `processor.py` with event extraction logic
   - Parse timestamps, extract entities, score reliability
   - Store results in Forensic Spine

4. **Test with sample data:**
   - Create a test ingestion
   - Verify events are stored correctly
   - Check timeline ordering

**Remember:**
- Keep it simple for Phase 1 (MVP)
- Focus on getting data in and stored correctly
- We can enhance processing later
- Follow the "Immutable Spine" principle - events don't change once stored

---

**THEBOSS: Specifications provided. Angie can now architect and implement Watchtower forensic logic.**
