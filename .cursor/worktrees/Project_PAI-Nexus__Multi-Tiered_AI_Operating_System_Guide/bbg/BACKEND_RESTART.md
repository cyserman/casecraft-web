# Backend Restart - Angie Server

**Date:** February 02, 2026  
**Status:** 🔄 Restarting Backend

---

## Issue

**User Report:** "backend is disconnected"

**Diagnosis:**
- No process running on port 5000
- Backend server (`run_ui.py`) was not running

---

## Action Taken

**Restarted Angie backend:**

```bash
pkill -f "run_ui.py"
cd ~/Angie
source venv/bin/activate
python3 run_ui.py > /tmp/angie_backend.log 2>&1 &
```

**Status:**
- ✅ Process started (PID: 57554)
- ✅ Using updated `run_ui.py` with environment loading fix
- ⏳ Starting up (can take 10-30 seconds)

---

## Verification

**Check if backend is running:**
```bash
curl http://localhost:5000
```

**Check process status:**
```bash
ps aux | grep run_ui.py
```

**Check logs:**
```bash
tail -f /tmp/angie_backend.log
```

---

## Expected Behavior

**Startup sequence:**
1. Load environment from `~/.pai/.env` (GEMINI_API_KEY)
2. Initialize Flask app
3. Load Agent Zero configuration
4. Start web server on port 5000
5. Ready to accept connections

**Startup time:** 10-30 seconds (depending on system load)

---

## Troubleshooting

**If backend doesn't start:**

1. **Check logs for errors:**
   ```bash
   tail -50 /tmp/angie_backend.log
   ```

2. **Check if port is already in use:**
   ```bash
   lsof -i :5000
   ```

3. **Check Python environment:**
   ```bash
   cd ~/Angie
   source venv/bin/activate
   python3 --version
   ```

4. **Verify environment loading:**
   ```bash
   python3 -c "from pathlib import Path; from dotenv import load_dotenv; import os; load_dotenv(Path.home() / '.pai' / '.env'); print('GEMINI_API_KEY:', '✅' if os.getenv('GEMINI_API_KEY') else '❌')"
   ```

---

## Current Configuration

**Environment Loading:**
- ✅ `run_ui.py` loads `~/.pai/.env` at startup
- ✅ `GEMINI_API_KEY` available for API calls

**Model Configuration:**
- ✅ Provider: `google` (direct Gemini API)
- ✅ Model: `gemini/gemini-2.5-pro`
- ✅ Embedding: `huggingface`

**Access:**
- URL: `http://localhost:5000`
- Logs: `/tmp/angie_backend.log`

---

## Next Steps

1. **Wait for startup** (10-30 seconds)
2. **Verify connection** - Open `http://localhost:5000` in browser
3. **Test API call** - Send a message and verify it uses Gemini
4. **Check for errors** - Monitor logs if issues persist

---

**THEBOSS: Backend restart initiated. Server should be available at http://localhost:5000 within 30 seconds.**
