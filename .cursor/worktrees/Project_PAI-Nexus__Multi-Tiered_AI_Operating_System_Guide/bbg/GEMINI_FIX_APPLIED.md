# Gemini Model Configuration Fix Applied

**Date:** February 02, 2026  
**Status:** ✅ Configuration Updated

---

## Problem

Agent Zero was configured to use OpenRouter for Google models:
- `chat_model_provider: "openrouter"`
- `chat_model_name: "openrouter/google/gemini-2.5-pro"` (or similar)

**Result:** LiteLLM tried to route through OpenRouter → Required `OPENROUTER_API_KEY` → 401 Unauthorized error

---

## Solution Applied

**Changed Settings:**
- `chat_model_provider: "openrouter"` → `"google"`
- `chat_model_name: "openrouter/google/gemini-*"` → `"gemini/gemini-*"`

**Result:** LiteLLM now uses `GEMINI_API_KEY` directly via Google API

---

## Current Configuration

**Chat Model:**
- Provider: `google` ✅
- Model: `gemini/gemini-2.5-pro` ✅
- Uses: `GEMINI_API_KEY` (configured in `~/.pai/.env`)

**Embedding Model:**
- Provider: `huggingface` ✅
- Model: `sentence-transformers/all-MiniLM-L6-v2` ✅
- Runs locally (no API key needed)

---

## Why This Works

**LiteLLM Model Routing:**
- `gemini/gemini-2.5-pro` → Uses `google` provider → Reads `GEMINI_API_KEY` → Direct Google API calls ✅
- `openrouter/google/gemini-2.5-pro` → Uses `openrouter` provider → Requires `OPENROUTER_API_KEY` → Routes through OpenRouter ❌

**By changing the prefix:**
- LiteLLM sees `gemini/` prefix
- Routes to `google` provider (from `model_providers.yaml`)
- Uses `GEMINI_API_KEY` from environment
- Makes direct API calls to Google

---

## Files Modified

1. **`~/Angie/tmp/settings.json`** - Agent Zero user settings
   - Updated `chat_model_provider` and `chat_model_name`

2. **`fix_gemini_models.py`** - Fix script created
   - Can be run again if settings change

3. **`directives/FIX_OPENROUTER_TO_GEMINI.md`** - Documentation
   - Explains the issue and solution

---

## Verification

**Check settings:**
```python
import sys
sys.path.insert(0, '~/Angie')
from python.helpers.settings import get_settings

s = get_settings()
print(f"Chat Provider: {s['chat_model_provider']}")  # Should be "google"
print(f"Chat Model: {s['chat_model_name']}")  # Should start with "gemini/"
```

**Expected:**
```
Chat Provider: google
Chat Model: gemini/gemini-2.5-pro
```

---

## Next Steps

1. **Restart Angie** (if running) to apply new settings:
   ```bash
   pkill -f "run_ui.py"
   cd ~/Angie && source venv/bin/activate && python3 run_ui.py
   ```

2. **Test Gemini API** - Send a message and verify it uses Gemini

3. **Verify No OpenRouter Errors** - Should no longer see 401 Unauthorized

---

## If You Want OpenRouter Later

If you add `OPENROUTER_API_KEY` later:

1. Add key to `~/.pai/.env`:
   ```bash
   echo "OPENROUTER_API_KEY=sk-or-v1-your-key-here" >> ~/.pai/.env
   ```

2. Update settings via UI or script:
   - Provider: `openrouter`
   - Model: `openrouter/google/gemini-2.5-pro`

**But for now:** Direct Gemini is configured and ready to use.

---

## THEBOSS Assessment

**Status:** ✅ Configuration Fixed

- Switched from OpenRouter routing to direct Gemini API
- Using `GEMINI_API_KEY` we already have configured
- Embedding correctly set to HuggingFace
- Ready to test

**Action:** Restart Angie to apply new settings.

---

**THEBOSS: Configuration updated. Agent Zero now uses direct Gemini API instead of OpenRouter routing.**
