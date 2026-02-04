# Fix: Vertex_ai_betaException / "API key not valid" + Connection Refused

When you see **ERR_CONNECTION_REFUSED** and in logs **`litellm.AuthenticationError: Vertex_ai_betaException`** or **"API key not valid"** for `generativelanguage.googleapis.com`, Angie is crashing because the LLM call fails (wrong auth or wrong model route). Fix the key and model config on the droplet, then restart.

---

## 1. Fix API key and model config on the droplet

Run these from your **Dell** (one block at a time if you prefer).

**A. Re-copy your local .env to the droplet** (so `GEMINI_API_KEY` is set and valid for the **Gemini API**, not Vertex):

```bash
scp -o StrictHostKeyChecking=accept-new ~/.pai/.env root@157.245.7.40:/root/.pai/.env
ssh root@157.245.7.40 'chmod 600 /root/.pai/.env'
```

**B. Point models to Gemini API (not Vertex)**  
LiteLLM uses the **Gemini API** (with your API key) only when the model name has the `gemini/` prefix. On the droplet, set or patch settings so chat and util use that:

```bash
ssh root@157.245.7.40 'mkdir -p /root/Angie/tmp'
```

Then either copy your **local** `tmp/settings.json` (if it already has `gemini/gemini-2.5-flash`) to the droplet:

```bash
scp ~/Angie/tmp/settings.json root@157.245.7.40:/root/Angie/tmp/settings.json
```

Or, if you don’t have a good local file, set the key fields on the droplet with a small Python one-liner (run over SSH):

```bash
ssh root@157.245.7.40 'cd /root/Angie && ./venv/bin/python3 -c "
import json, os
p = \"/root/Angie/tmp/settings.json\"
os.makedirs(os.path.dirname(p), exist_ok=True)
s = {}
if os.path.isfile(p):
    with open(p) as f: s = json.load(f)
s[\"chat_model_name\"] = \"gemini/gemini-2.5-flash\"
s[\"chat_model_provider\"] = \"google\"
s[\"util_model_name\"] = \"gemini/gemini-2.5-flash\"
s[\"util_model_provider\"] = \"google\"
with open(p, \"w\") as f: json.dump(s, f, indent=2)
print(\"Updated settings.json\")
"'
```

**C. Restart Angie:**

```bash
ssh root@157.245.7.40 'sudo systemctl restart angie && sleep 4 && sudo systemctl status angie --no-pager'
```

**D. Check the log (should see no Vertex / API key errors):**

```bash
ssh root@157.245.7.40 'tail -30 /root/Angie/angie.log'
```

**E. Test from your machine:**

```bash
curl -s -o /dev/null -w "%{http_code}" http://157.245.7.40:5000
```

You want **200**. Then try in the browser and on the Chromebook.

---

## 2. Where the key must come from

- **Gemini API (what we want):** API key from [Google AI Studio](https://aistudio.google.com/apikey). Used when the model is `gemini/gemini-2.5-flash` (or similar with `gemini/` prefix).  
- **Vertex AI:** Uses a service account / ADC, not the same key. If the model name doesn’t have the `gemini/` prefix, LiteLLM can route to Vertex and then you get `Vertex_ai_betaException` and "API key not valid".

So: keep `GEMINI_API_KEY` in `~/.pai/.env` (and on the droplet in `/root/.pai/.env`) and use **model names with the `gemini/` prefix** in settings.

---

## 3. If it still fails

- Confirm the key is valid: from the Dell, `curl "https://generativelanguage.googleapis.com/v1beta/models?key=YOUR_KEY"` (replace YOUR_KEY) should return JSON, not 400/403.
- On the droplet, ensure no other env or config overrides the model to a Vertex-style name.
- See **RUNBOOK.md** (API key errors) and **TROUBLESHOOT_REFUSED.md** for more checks.
