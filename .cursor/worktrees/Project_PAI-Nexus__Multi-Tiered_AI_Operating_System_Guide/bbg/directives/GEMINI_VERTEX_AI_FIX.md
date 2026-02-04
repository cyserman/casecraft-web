# Gemini Vertex AI Error Fix

**Date:** February 03, 2026  
**Error:** `Vertex_ai_betaException - API key not valid`

---

## Problem

**Error Message:**
```
litellm.AuthenticationError: Vertex_ai_betaException - API key not valid
```

**Root Cause:**
- LiteLLM is routing `gemini/gemini-2.5-pro` to Vertex AI instead of direct Gemini API
- Vertex AI requires GCP service account credentials, not API key
- We have `GEMINI_API_KEY` (for direct API), not Vertex AI credentials

---

## LiteLLM Model Name Formats

**Direct Gemini API (What We Want):**
- Format: `gemini/gemini-2.0-flash` or `gemini/gemini-1.5-pro`
- Uses: `GEMINI_API_KEY`
- Endpoint: `generativelanguage.googleapis.com`

**Vertex AI (What We're Getting):**
- Format: `vertex_ai/gemini-2.5-pro` or `gemini-2.5-pro` (no prefix)
- Uses: GCP service account credentials
- Endpoint: Vertex AI REST API

**The Issue:**
- `gemini-2.5-pro` might only be available via Vertex AI
- Direct API might use different model names like `gemini-2.0-flash` or `gemini-1.5-pro`

---

## Solution

**Option 1: Use Available Direct API Model**
- Change model name to one available via direct API:
  - `gemini/gemini-2.0-flash` ✅ (confirmed available)
  - `gemini/gemini-1.5-pro` ✅ (likely available)
  - `gemini/gemini-1.5-flash` ✅ (likely available)

**Option 2: Force Direct API in LiteLLM**
- Add explicit API base or configuration
- Ensure LiteLLM uses direct API endpoint

**Option 3: Verify Model Availability**
- Check which models are available via direct API
- Use only those models

---

## Fix Steps

1. **Check available models:**
   ```python
   import requests
   url = f"https://generativelanguage.googleapis.com/v1beta/models?key={GEMINI_API_KEY}"
   response = requests.get(url)
   # List available models
   ```

2. **Update model name:**
   - Change from `gemini/gemini-2.5-pro` 
   - To: `gemini/gemini-2.0-flash` (or available model)

3. **Verify LiteLLM routing:**
   - Ensure `litellm_provider: gemini` uses direct API
   - Not Vertex AI

---

## THEBOSS Assessment

**Status:** ⚠️ Model name issue

**Problem:** `gemini-2.5-pro` may only be available via Vertex AI

**Solution:** Use model available via direct API (e.g., `gemini-2.0-flash`)

**Action:** Check available models and update configuration.

---

**THEBOSS: Checking available Gemini models and fixing model name.**
