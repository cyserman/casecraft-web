# Have Manus create the dump-bucket repo: yes, and how

**Short answer:** Yes, have Manus create the separate "dump bucket" repo now. It gives you one place for context, evidence, and status so Cursor and agents don't mix them with code, and it sets you up for the "Dump files" branch later (reference-only attachment to spare context/RAM).

---

## Why do it now

- **One place for "not code":** Chat threads, evidence refs, status checklist, and reference docs live in one repo. Cursor stays on casecraft-web (or bbg) for code; when you need status or context, you open or paste from this repo only.
- **MASTER_MAP stays accurate:** The "Case" bucket and agent-context get a real home. You can point MASTER_MAP at this repo and say "case + context live here."
- **Dump branch later:** When OLA and other agents are in place, you add a branch (e.g. `dump-files` or `reference`) for large reference files. Agents attach from that branch when needed instead of loading everything into context. No need to build that branch today—just create the repo and structure now.

---

## Recommendations

### 1. Repo name

Pick one and stick with it so MASTER_MAP and agents can refer to it consistently:

- **`pai-nexus-context`** — Clear that it's context/status for PAI-Nexus, not the app code.
- **`pai-nexus-dump`** — Emphasizes "dump bucket"; good if you want the name to signal "reference only, attach on demand."
- **`pai-nexus-status`** — Emphasizes CURRENT_STATUS and checklists.

**Recommendation:** **`pai-nexus-context`** — broad enough for chat threads, evidence refs, status, and future dump branch; avoids implying the repo is only "dump" or only "status."

### 2. Structure (what Manus should create)

```
README.md                 # What this repo is; link to casecraft-web, bbg, MASTER_MAP
CURRENT_STATUS.md         # Single living checklist: done / next / blockers (you or Manus update)
ARCHITECTURE.md           # Short summary or pointer to "documented architecture" (spare context)
chat-threads/             # Exported or key chat threads (by topic or date)
evidence/                 # References, links, or sanitized evidence (no raw sensitive data in git unless you choose)
reference/                # Runbooks, prompts, one-pagers agents can pull from
dump/                     # Placeholder; later: branch dump-files or reference holds large refs for attach-on-demand
.gitignore                # e.g. *.json if you don't want to commit backups; optional .env or secrets
```

- **Main branch (e.g. `main`):** CURRENT_STATUS, ARCHITECTURE, chat-threads, evidence, reference, and the empty `dump/` placeholder. Lightweight; agents read from here for "what's the state" and "where's the context."
- **Later branch (e.g. `dump-files` or `reference`):** Optional second branch where you put larger files (long transcripts, big reference docs). Agents attach from that branch when a task needs it; main stays small so context window and RAM are spared.

### 3. What to put in README (for Manus to add)

- One sentence: "Context, evidence, and status for PAI-Nexus; not app code. Code lives in casecraft-web."
- Link to MASTER_MAP (or paste its path: `bbg/MASTER_MAP.md` in the other worktree) so anyone opening this repo knows the three buckets.
- Line: "CURRENT_STATUS.md is the single source of truth for 'what's done / next / blockers.'"
- Line: "The `dump/` folder and (later) the dump-files branch are for reference-only attachment by agents; do not load entire dump into context."

### 4. .gitignore

- Consider ignoring `*.json` if you might drop backup files in evidence/ and don't want them committed.
- Do not commit real API keys or unredacted client data; if in doubt, keep evidence as references/links only.

### 5. Who updates what

- **You or Manus:** CURRENT_STATUS.md (at least weekly or when something big changes).
- **You:** evidence/ and chat-threads/ (you decide what to export or reference).
- **Manus or you:** reference/ (runbooks, prompts that agents should use).
- **Later:** dump-files branch populated when you're ready for attach-on-demand large refs.

---

## Prompt to give Manus (copy-paste)

You can send Manus the following, plus the full BRIEF_FOR_MANUS_SEPARATE_REPO.md and MASTER_MAP.md (or links/paths) so he has the full picture.

---

**Prompt for Manus:**

Create the "dump bucket" repo as described in BRIEF_FOR_MANUS_SEPARATE_REPO.md and below. Use MASTER_MAP.md (in bbg) so you don't mix software, agents, and case.

**Repo name:** `pai-nexus-context` (or your recommendation if you prefer another).

**Create on GitHub (under cyserman):** Empty repo, no README. Then clone it locally and add:

1. **README.md** — State: "Context, evidence, and status for PAI-Nexus; not app code. Code lives in casecraft-web. See MASTER_MAP (bbg) for the three buckets (software / agents / case). CURRENT_STATUS.md is the single source of truth for done / next / blockers. The dump/ folder and (later) dump-files branch are for reference-only attachment by agents."

2. **CURRENT_STATUS.md** — Template with sections: Done | Next | Blockers. Add one line each so the file is usable from day one.

3. **ARCHITECTURE.md** — One short paragraph or a link to where the documented architecture lives (e.g. in this thread or bbg).

4. **Folders:** `chat-threads/`, `evidence/`, `reference/`, `dump/` (each with a `.gitkeep` or a short README so the folder exists).

5. **.gitignore** — At least ignore `*.json` if we might put backups in evidence; no secrets.

6. **Initial commit and push** to `main`.

Do not add code from casecraft-web or bbg. This repo is context/evidence/status only. When done, tell me the repo URL and one sentence on how to use it with MASTER_MAP and STAY_ON_TRACK.

---

## After Manus creates it

1. **Update MASTER_MAP.md** (in bbg): Under "Case" or "Agents," add a row that the context/evidence/status repo is **pai-nexus-context** at `https://github.com/cyserman/pai-nexus-context` (or the URL Manus gives you).
2. **STAY_ON_TRACK:** When you or an agent need "current status," open or paste from this repo's CURRENT_STATUS.md only.
3. **Dump branch later:** When OLA and other agents are in place, create branch `dump-files`, add large reference files there, and document in the repo README that agents should attach from that branch when needed instead of loading everything into context.

---

## Summary

| Do this | Why |
|---------|-----|
| Have Manus create the repo now | One place for context/evidence/status; Cursor and agents stop mixing with code. |
| Use repo name `pai-nexus-context` | Clear, fits all uses (status, threads, evidence, future dump). |
| Structure: README, CURRENT_STATUS, ARCHITECTURE, chat-threads/, evidence/, reference/, dump/ | Matches BRIEF_FOR_MANUS; ready for dump branch later. |
| Give Manus the prompt above + BRIEF + MASTER_MAP | He has everything to create and document the repo. |
| Update MASTER_MAP with the new repo URL | So everyone knows where "case + context" lives. |
