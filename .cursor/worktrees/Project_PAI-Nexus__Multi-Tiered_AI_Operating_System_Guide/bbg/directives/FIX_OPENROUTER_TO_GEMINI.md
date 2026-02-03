# Fix: Switch from OpenRouter to Direct Gemini

**Issue:** Agent Zero is configured to use OpenRouter for Google models, but we have `GEMINI_API_KEY` and no `OPENROUTER_API_KEY`.

**Solution:** Change model names from `openrouter/google/gemini-*` to `gemini/gemini-*` to use direct Google API.

---

## The Problem

**Current Configuration:**
- Model name: `openrouter/google/gemini-2.5-pro`
- Provider: `openrouter`
- **Result:** LiteLLM tries to route through OpenRouter → Requires `OPENROUTER_API_KEY` → 401 Unauthorized

**Why This Happens:**
Even if `GEMINI_API_KEY` is loaded, if the model string starts with `openrouter/...`, LiteLLM ignores the Google key and routes to OpenRouter. OpenRouter then checks for its key, doesn't find it, and throws 401.

---

## The Fix

**Change Model Names:**
- `openrouter/google/gemini-2.5-pro` → `gemini/gemini-2.5-pro`
- `openrouter/google/gemini-2.0-flash` → `gemini/gemini-2.0-flash`

**Change Provider:**
- `chat_model_provider: "openrouter"` → `chat_model_provider: "google"`

**Ensure Embedding:**
- `embed_model_provider: "huggingface"` (already correct)

---

## Implementation

### Option 1: Use Fix Script (Recommended)

```bash
cd ~/Angie
source venv/bin/activate
python3 /path/to/fix_gemini_models.py
```

### Option 2: Update via Agent Zero UI

1. Open `http://localhost:5000`
2. Go to Settings
3. Find "Chat Model" section
4. Change:
   - Provider: `openrouter` → `google`
   - Model: `openrouter/google/gemini-2.5-pro` → `gemini/gemini-2.5-pro`
5. Find "Embedding Model" section
6. Ensure Provider is `huggingface`
7. Save settings

### Option 3: Direct Settings File Edit

**Location:** `~/Angie/tmp/settings.json`

**Changes:**
```json
{
  "chat_model_provider": "google",  // Changed from "openrouter"
  "chat_model_name": "gemini/gemini-2.5-pro",  // Changed from "openrouter/google/gemini-2.5-pro"
  "embed_model_provider": "huggingface",  // Ensure this
  "embed_model_name": "sentence-transformers/all-MiniLM-L6-v2"
}
```

**Note:** Settings file may not exist if using defaults. Use Option 1 or 2.

---

## Verification

After making changes:

```python
import sys
sys.path.insert(0, '~/Angie')
from python.helpers.settings import get_settings

s = get_settings()
print(f"Chat Provider: {s['chat_model_provider']}")  # Should be "google"
print(f"Chat Model: {s['chat_model_name']}")  # Should start with "gemini/"
print(f"Embed Provider: {s['embed_model_provider']}")  # Should be "huggingface"
```

**Expected Output:**
```
Chat Provider: google
Chat Model: gemini/gemini-2.5-pro
Embed Provider: huggingface
```

---

## Why This Works

**LiteLLM Model Name Format:**
- `provider/model-name` → Routes to that provider
- `gemini/gemini-2.5-pro` → Uses `GEMINI_API_KEY` directly
- `openrouter/google/gemini-2.5-pro` → Routes through OpenRouter (needs `OPENROUTER_API_KEY`)

**By changing the prefix:**
- LiteLLM sees `gemini/` prefix
- Uses `google` provider configuration from `model_providers.yaml`
- Reads `GEMINI_API_KEY` from environment
- Makes direct API calls to Google

---

## If You Want OpenRouter Later

If you add `OPENROUTER_API_KEY` later and want to use OpenRouter:

```bash
echo "OPENROUTER_API_KEY=sk-or-v1-your-key-here" >> ~/.pai/.env
```

Then change settings back:
- Provider: `openrouter`
- Model: `openrouter/google/gemini-2.5-pro`

But for now, **use direct Gemini** to get Angie running immediately.

---

**THEBOSS: This fix switches from OpenRouter routing to direct Gemini API, using the GEMINI_API_KEY we already have configured.**
