# Start here — get something working with minimal effort

You’re burnt out. This is the one place to look. Two options; pick one.

---

## Option 1: Get a chat UI running in a few minutes (no Manus, no research)

**Do this:** In Cursor chat, say exactly this to the AI:

```
Run the Fallback in deploy/EXECUTION_AGENT_SCRIPT.md: Section 1 (Docker on droplet), then the Fallback Section 2 (Open WebUI on 8080), then Section 3 and 4 with port 8080. Tell me the URL to open.
```

Then open the URL it gives you (e.g. http://157.245.7.40:8080) in your browser. Add your API key in the app’s Settings. Done.

---

## Option 2: Have Manus research alternatives, then follow scripts

1. Open the **Manus prompt** (see “Where the files are” below).
2. Copy the prompt from that file and send it to Manus.
3. When Manus replies, open **USER_FOLLOW_ALONG_SCRIPT.md** and do what it says.

---

## Where the files are (use Cursor Quick Open)

Press **Ctrl+P** (or Cmd+P on Mac), then type the filename. Open the one you need:

| What you need | Type this in Ctrl+P |
|---------------|----------------------|
| This file | `START_HERE` |
| Manus research prompt | `MANUS_RESEARCH` |
| Your follow-along steps | `USER_FOLLOW` |
| Commands for the AI to run | `EXECUTION_AGENT` |
| Get Angie running (later) | `GET_STARTED` |

Full paths (if Quick Open doesn’t find them):

- `bbg/START_HERE.md`  ← you are here
- `bbg/deploy/MANUS_RESEARCH_AND_SCRIPT_PROMPT.md`
- `bbg/deploy/USER_FOLLOW_ALONG_SCRIPT.md`
- `bbg/deploy/EXECUTION_AGENT_SCRIPT.md`
- `bbg/GET_STARTED.md`

---

## Easiest path right now

Use **Option 1**. Say the block in quotes to the AI and open the URL it gives you. Leave the rest for later.
