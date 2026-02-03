# Environment Loading Fix Applied

**Date:** February 02, 2026  
**Status:** ✅ Fixed `key=None` Error

---

## Problem

**Error:** `Bad Request (400)` with `key=None`

**Root Cause:**
- ✅ Provider switch worked - now hitting Google's API directly
- ❌ API key not loading - `run_ui.py` wasn't loading `~/.pai/.env`
- Angie defaults to looking for `.env` in `~/Angie/` (local), not `~/.pai/.env` (global)

---

## Solution Applied

**Added environment loading to `run_ui.py`:**

```python
from pathlib import Path
from dotenv import load_dotenv
load_dotenv(Path.home() / ".pai" / ".env")
```

**Location:** Top of `/home/cyserman/Angie/run_ui.py` (before any other imports)

**Result:** `GEMINI_API_KEY` now loads from `~/.pai/.env` on startup

---

## Why This Was Needed

**Environment File Locations:**
- **Global PAI config:** `~/.pai/.env` (where `GEMINI_API_KEY` is stored)
- **Angie local:** `~/Angie/.env` (doesn't exist, Angie looks here by default)

**The Gap:**
- `run_ui.py` didn't know to load from `~/.pai/.env`
- It looked in local directory, found nothing
- Sent `key=None` to Google API → 400 Bad Request

**The Fix:**
- Explicitly load `~/.pai/.env` at startup
- Now `GEMINI_API_KEY` is available before any API calls

---

## Verification

**Check if fix was applied:**
```bash
head -5 ~/Angie/run_ui.py
```

**Expected output:**
```python
from pathlib import Path
from dotenv import load_dotenv
load_dotenv(Path.home() / ".pai" / ".env")

# ... rest of file
```

**Test key loading:**
```python
import sys
from pathlib import Path
from dotenv import load_dotenv
import os

env_path = Path.home() / ".pai" / ".env"
load_dotenv(env_path)
key = os.getenv('GEMINI_API_KEY')
print(f"Key loaded: {key[:8] if key else 'None'}...")
```

---

## Restart Required

**After applying fix, restart Angie:**
```bash
pkill -f "run_ui.py"
cd ~/Angie
source venv/bin/activate
python3 run_ui.py
```

**Expected Result:**
- No more `key=None` errors
- API calls succeed with `GEMINI_API_KEY`
- 400 Bad Request → 200 OK

---

## Files Modified

1. **`~/Angie/run_ui.py`** - Added environment loading at top
   - Lines 1-3: Load `~/.pai/.env` before any other code

---

## Permanent Solution

This fix ensures:
- ✅ `GEMINI_API_KEY` loads from `~/.pai/.env` every time
- ✅ No need to manually export environment variables
- ✅ Works even if Angie is restarted or container is recreated
- ✅ Consistent with PAI-Nexus architecture (global `.env` in `~/.pai/`)

---

## THEBOSS Assessment

**Status:** ✅ Environment Loading Fixed

- Added explicit `.env` loading to `run_ui.py`
- Points to global PAI config (`~/.pai/.env`)
- Resolves `key=None` → 400 Bad Request error
- Ready to test with actual API calls

**Action:** Restart Angie and verify API calls succeed.

---

**THEBOSS: Environment loading fixed. Angie now loads GEMINI_API_KEY from ~/.pai/.env on startup.**
