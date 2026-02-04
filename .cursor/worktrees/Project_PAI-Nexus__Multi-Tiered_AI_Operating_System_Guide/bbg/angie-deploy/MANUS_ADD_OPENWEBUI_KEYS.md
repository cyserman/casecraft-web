# Script for Manus: Add API keys to Open WebUI in the browser

User has allowed you to open and click. Use browser automation to add their API keys to Open WebUI so they don’t have to do it manually.

**Target:** http://157.245.7.40:8080  
**User will provide:** API key(s) in a secure way (e.g. in your chat, not in Cursor). They said you have their keys.

**User instructions for you (Manus):**
- The user is using Open WebUI **in the browser**, not in a separate app. Everything happens at the URL above.
- **Keep all API keys hidden.** Do not repeat keys in your replies, include them in logs, show them in screenshots or summaries, or paste them anywhere visible. Use them only in the password/API key fields in the Open WebUI settings and then treat them as confidential.

---

## Steps for you (Manus) to perform

1. **Open**  
   Navigate to **http://157.245.7.40:8080**

2. **Log in** (if the page shows login)  
   User will have given you admin credentials or will be already logged in. If you see a login form, fill it and submit.

3. **Go to Settings**  
   - Click the **user profile/avatar** (top right).  
   - Click **Settings** (or **Admin Panel** → **Settings** if you see that).

4. **Open Connections**  
   - In the left sidebar, click **Connections** (under General or at the top of the settings list).

5. **Add OpenAI key**  
   - Click **“Manage OpenAI API Connections”**.  
   - In the panel that opens, find the field for the **API key** (e.g. “API Key” or “Default key”).  
   - Paste the user’s **OpenAI API key** (they’ve given it to you).  
   - Leave base URL as `https://api.openai.com/v1` unless they use a different endpoint.  
   - Save (button in the panel or **Save** at bottom of page).

6. **Add other keys if needed**  
   - If they use **Google (Gemini)** or **Anthropic**, look in the same **Connections** sidebar for those sections and repeat: open the manager, paste the key they gave you, save.  
   - If there’s only “Direct Connections,” add a new connection with the provider’s API URL and the key they provided.

7. **Confirm**  
   - Click the main **Save** at the bottom of the Settings page if you haven’t already.  
   - Optionally open a new chat, pick a model that uses the key you added, and send one short message to confirm it works.

---

## Summary for user

Give this file (or its steps) to Manus and say: *“Add my API keys to Open WebUI using the browser. Here’s the script: [paste MANUS_ADD_OPENWEBUI_KEYS.md or link]. I’ve allowed you to open and click. Use the keys you have for me. I'm using it in the browser, not in an app. Keep all keys hidden—don't show or repeat them anywhere.”*

Manus will open http://157.245.7.40:8080, go to Settings → Connections, and paste each key only into the key fields, without exposing them in replies or logs.
