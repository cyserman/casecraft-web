# API Key Configuration: Critical Fixes

**From:** GPT 5.1 Recommendations  
**Date:** February 02, 2026  
**Status:** Critical Pathing and OpenRouter Fixes

---

## Fix 1: Explicit Pathing for load_dotenv()

### Problem
Naked `load_dotenv()` calls can fail if the working directory is wrong or the `.env` file path isn't explicit.

### Solution: Use Explicit Path Resolution

**Instead of:**
```python
from dotenv import load_dotenv
load_dotenv()  # ❌ May not find .env file
```

**Use:**
```python
import os
from pathlib import Path
from dotenv import load_dotenv

# Explicit path resolution
env_path = Path(__file__).resolve().parent / '.env'
load_dotenv(dotenv_path=env_path)

# Debug output (mask key)
api_key = os.getenv('GEMINI_API_KEY')
if api_key:
    print(f"DEBUG: Key loaded: {api_key[:8]}...")
else:
    print("DEBUG: Key NOT loaded")
```

**For PAI-Nexus gateway.py (IMPLEMENTED):**
```python
import os
from pathlib import Path
from dotenv import load_dotenv

# Explicit pathing for .env file (GPT 5.1 recommendation)
env_path = Path.home() / '.pai' / '.env'
load_dotenv(dotenv_path=env_path)

# Debug: Verify key loading
gemini_key = os.getenv('GEMINI_API_KEY')
openrouter_key = os.getenv('OPENROUTER_API_KEY')
if gemini_key:
    print(f"DEBUG: GEMINI_API_KEY loaded: {gemini_key[:8]}...")
else:
    print("DEBUG: WARNING - GEMINI_API_KEY not found")
if openrouter_key:
    print(f"DEBUG: OPENROUTER_API_KEY loaded: {openrouter_key[:8]}...")
else:
    print("DEBUG: INFO - OPENROUTER_API_KEY not set (optional)")
```

**Status:** ✅ Updated in `~/.pai/Tools/gateway.py`

---

## Fix 2: OpenRouter "Cookie" Mystery

### Problem
OpenRouter sometimes returns "cookie credentials" errors even when:
- API key is valid
- Balance is sufficient
- Key is loading correctly

### Root Cause
OpenRouter's Cloudflare/auth layer flags requests missing the `Referer` header. Without it, OpenRouter thinks it's a browser request gone wrong rather than an API call.

### Solution: Add Referer Header

**For Direct Requests (gateway.py):**
```python
def _call_openrouter(self, prompt: str, context: str) -> str:
    """Call OpenRouter API (multi-model access)."""
    if not self.openrouter_key:
        return "❌ OpenRouter API Key Missing"
    
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {self.openrouter_key}",
        "HTTP-Referer": "https://pai-nexus.local",  # ✅ REQUIRED
        "X-Title": "PAI-Nexus"  # ✅ REQUIRED
    }
    # ... rest of request
```

**For LiteLLM Calls (Agent Zero):**
When using LiteLLM's `acompletion()` with OpenRouter, ensure `extra_headers` are passed:

```python
from litellm import acompletion

response = await acompletion(
    model="openrouter/meta-llama/llama-3-8b-instruct",
    messages=[...],
    api_key=os.getenv("OPENROUTER_API_KEY"),
    extra_headers={  # ✅ CRITICAL - Pass these headers
        "HTTP-Referer": "https://pai-nexus.local",
        "X-Title": "PAI-Nexus"
    }
)
```

**In model_providers.yaml:**
```yaml
openrouter:
  name: OpenRouter
  litellm_provider: openrouter
  kwargs:
    extra_headers:  # ✅ Already configured, but verify
      "HTTP-Referer": "https://pai-nexus.local"
      "X-Title": "PAI-Nexus"
```

---

## Verification Commands

### Test Explicit Pathing
```python
import os
from pathlib import Path
from dotenv import load_dotenv

env_path = Path.home() / '.pai' / '.env'
print(f"DEBUG: Loading from: {env_path}")
print(f"DEBUG: File exists: {env_path.exists()}")

load_dotenv(dotenv_path=env_path)

key = os.getenv('GEMINI_API_KEY')
print(f"DEBUG: Key loaded: {key[:8] if key else 'NOT FOUND'}...")
```

### Test OpenRouter Key
```bash
# Verify key is set
grep -q "OPENROUTER_API_KEY=" ~/.pai/.env && echo "✅ Key found" || echo "❌ Key missing"

# Test with curl (includes Referer header)
curl -X POST https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer $(grep OPENROUTER_API_KEY ~/.pai/.env | cut -d'=' -f2)" \
  -H "HTTP-Referer: https://pai-nexus.local" \
  -H "X-Title: PAI-Nexus" \
  -H "Content-Type: application/json" \
  -d '{"model":"meta-llama/llama-3-8b-instruct","messages":[{"role":"user","content":"test"}]}'
```

---

## Implementation Checklist

- [x] Update `gateway.py` to use explicit pathing ✅ DONE
- [x] Add debug output for key loading ✅ DONE
- [x] Verify OpenRouter headers in `model_providers.yaml` ✅ CONFIGURED
- [ ] Ensure LiteLLM calls pass `extra_headers` (Agent Zero uses model_providers.yaml)
- [x] Test key loading with explicit path ✅ VERIFIED
- [ ] Test OpenRouter with Referer header (when OpenRouter key is added)

---

## Files to Update

1. **`~/.pai/Tools/gateway.py`** - Add explicit pathing
2. **`~/Angie/models.py`** (if using LiteLLM) - Ensure extra_headers passed
3. **`model_providers.yaml`** - Verify OpenRouter headers configured

---

**THEBOSS: These fixes address the pathing mystery and OpenRouter cookie errors. Implement immediately.**
