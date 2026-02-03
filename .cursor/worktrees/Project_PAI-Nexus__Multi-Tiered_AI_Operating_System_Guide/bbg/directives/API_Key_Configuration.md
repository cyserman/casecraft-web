# API Key Configuration Directive

## Purpose
This directive ensures proper setup and verification of API keys for PAI-Nexus, particularly focusing on Gemini API key configuration which has been a recurring issue.

## Critical Fixes (GPT 5.1 Recommendations)

### Fix 1: Explicit Pathing for load_dotenv()

**Problem:** Naked `load_dotenv()` calls can fail if the working directory is wrong.

**Solution:** Use explicit path resolution with `Path`:

```python
import os
from pathlib import Path
from dotenv import load_dotenv

# Explicit pathing (GPT 5.1 recommendation)
env_path = Path.home() / '.pai' / '.env'
load_dotenv(dotenv_path=env_path)

# Debug output to verify loading
gemini_key = os.getenv('GEMINI_API_KEY')
if gemini_key:
    print(f"DEBUG: GEMINI_API_KEY loaded: {gemini_key[:8]}...")
else:
    print("DEBUG: WARNING - GEMINI_API_KEY not found")
```

**Status:** ✅ Implemented in `~/.pai/Tools/gateway.py`

### Fix 2: OpenRouter "Cookie" Mystery

**Problem:** OpenRouter returns "cookie credentials" errors even when key is valid.

**Root Cause:** Missing `Referer` header makes OpenRouter think it's a browser request gone wrong.

**Solution:** Always include headers:

**For Direct Requests:**
```python
headers = {
    "Authorization": f"Bearer {openrouter_key}",
    "HTTP-Referer": "https://pai-nexus.local",  # REQUIRED
    "X-Title": "PAI-Nexus"  # REQUIRED
}
```

**For LiteLLM Calls:**
```python
from litellm import acompletion

response = await acompletion(
    model="openrouter/meta-llama/llama-3-8b-instruct",
    messages=[...],
    api_key=os.getenv("OPENROUTER_API_KEY"),
    extra_headers={  # CRITICAL - Pass these headers
        "HTTP-Referer": "https://pai-nexus.local",
        "X-Title": "PAI-Nexus"
    }
)
```

**Status:** ✅ Documented in `model_providers.yaml` (Agent Zero config)

---

## Gemini API Key Setup

### Step 1: Get Your API Key

1. Go to: https://aistudio.google.com/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key (starts with `AIza...`)

### Step 2: Configure in PAI-Nexus

**Location:** `~/.pai/.env`

**Format:**
```bash
GEMINI_API_KEY=AIza...your_actual_key_here...
OLLAMA_BASE_URL=http://localhost:11434
OPENROUTER_API_KEY=sk-or-v1-...your_key...  # Optional
```

**Important:**
- No spaces around the `=` sign
- No quotes around the value (unless your shell requires it)
- No trailing spaces
- The key should start with `AIza` (Gemini) or `sk-or-v1-` (OpenRouter)

### Step 3: Verify Configuration

**Check if key is set:**
```bash
# Check .env file exists
test -f ~/.pai/.env && echo "✅ .env exists" || echo "❌ .env missing"

# Check key is present (without showing the actual key)
grep -q "GEMINI_API_KEY=" ~/.pai/.env && echo "✅ GEMINI_API_KEY found" || echo "❌ GEMINI_API_KEY missing"

# Verify key format (should start with AIza)
grep "GEMINI_API_KEY=" ~/.pai/.env | grep -q "AIza" && echo "✅ Key format looks correct" || echo "⚠️ Key format may be incorrect"
```

**Test with gateway.py:**
```bash
cd ~/.pai/Tools
python3 gateway.py
# Should show: DEBUG: GEMINI_API_KEY loaded: AIzaSyB1...
```

---

## Common Issues and Fixes

### Issue 1: Key Not Found

**Symptom:** `GEMINI_API_KEY not found` or `API_KEY not found`

**Causes:**
- `.env` file doesn't exist
- Key name mismatch (`API_KEY` vs `GEMINI_API_KEY`)
- Environment variables not loaded
- Wrong path to `.env` file

**Fix:**
```python
# Use explicit pathing (see Fix 1 above)
from pathlib import Path
env_path = Path.home() / '.pai' / '.env'
load_dotenv(dotenv_path=env_path)

# Verify
key = os.getenv('GEMINI_API_KEY')
print(f"Key loaded: {key[:8] if key else 'NOT FOUND'}...")
```

### Issue 2: Invalid API Key

**Symptom:** `401 Unauthorized` or `Invalid API key`

**Causes:**
- Key copied incorrectly (extra spaces, missing characters)
- Key revoked or expired
- Wrong key type (need API key, not OAuth token)

**Fix:**
1. Verify key at https://aistudio.google.com/apikey
2. Check key hasn't been revoked
3. Regenerate if needed
4. Update `~/.pai/.env` with new key
5. Restart Angie/service

### Issue 3: OpenRouter Cookie Error

**Symptom:** "cookie credentials" error even with valid key

**Cause:** Missing `Referer` header

**Fix:**
- Add `HTTP-Referer` and `X-Title` headers (see Fix 2 above)
- For LiteLLM: Pass `extra_headers` in `acompletion()` call
- For direct requests: Include headers in request

---

## Verification Checklist

Before declaring API keys configured:

- [ ] `.env` file exists at `~/.pai/.env`
- [ ] File has correct permissions (600)
- [ ] `GEMINI_API_KEY` is set (not `API_KEY` or other names)
- [ ] Key starts with `AIza` (Gemini) or `sk-or-v1-` (OpenRouter)
- [ ] No spaces around `=` sign
- [ ] Key is not in `.gitignore` exclusion (should be ignored)
- [ ] Code uses explicit pathing: `Path.home() / '.pai' / '.env'`
- [ ] Debug output shows key loaded successfully
- [ ] OpenRouter requests include `HTTP-Referer` header (if using)

---

## Security Best Practices

1. **Never commit `.env` to git**
   ```bash
   grep -q "^\.env$" .gitignore || echo ".env" >> .gitignore
   ```

2. **Use proper file permissions**
   ```bash
   chmod 600 ~/.pai/.env  # Read/write for owner only
   ```

3. **Never paste keys in chat/terminal**
   - Use file editing: `nano ~/.pai/.env`
   - Reference the file, don't show contents

4. **Use explicit pathing**
   - Always use `Path.home() / '.pai' / '.env'`
   - Never use naked `load_dotenv()`

5. **Debug output**
   - Always verify keys load with debug output
   - Mask keys in output (show first 8 chars only)

---

## Integration with PAI-Nexus

### For Agent Zero / Angie

**Location:** `~/.pai/.env`

**Required variables:**
```bash
GEMINI_API_KEY=AIza...your_key...
OLLAMA_BASE_URL=http://localhost:11434
OPENROUTER_API_KEY=sk-or-v1-...your_key...  # Optional
```

**How Angie loads it:**
- Gateway.py uses explicit pathing: `Path.home() / '.pai' / '.env'`
- Debug output confirms key loading
- OpenRouter headers configured in `model_providers.yaml`

---

## Troubleshooting Commands

```bash
# Check if .env exists
ls -la ~/.pai/.env

# View .env (masking the key)
cat ~/.pai/.env | sed 's/\(GEMINI_API_KEY=\)\(.*\)/\1***MASKED***/'

# Test gateway with debug output
cd ~/.pai/Tools && python3 gateway.py

# Verify key format
grep GEMINI_API_KEY ~/.pai/.env | grep -q "^GEMINI_API_KEY=AIza" && echo "✅ Format OK" || echo "❌ Format issue"

# Test explicit pathing in Python
python3 -c "
from pathlib import Path
from dotenv import load_dotenv
import os
env_path = Path.home() / '.pai' / '.env'
load_dotenv(dotenv_path=env_path)
key = os.getenv('GEMINI_API_KEY')
print('Key found' if key else 'Key NOT found')
print(f'Key preview: {key[:8] if key else \"N/A\"}...')
"
```

---

## Notes

- **Standardize:** Always use `GEMINI_API_KEY` as the variable name
- **Explicit Pathing:** Always use `Path.home() / '.pai' / '.env'` (GPT 5.1 recommendation)
- **Debug Output:** Always verify keys load with debug output
- **OpenRouter Headers:** Always include `HTTP-Referer` and `X-Title` headers
- **Security:** Never expose keys in logs, chat, or git

---

**Reference:** `API_Key_Configuration_FIXES.md` for detailed implementation
