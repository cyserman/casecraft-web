# Brief for Manus: Create a Separate Repo (Context / Evidence / Status Split)

**Purpose:** Keep chat threads, actual evidence, status checklists, and “other stuff” in a **separate repo** from the software-engineering codebase. That avoids context drift and hallucinations in Cursor (and in agents). Later, add a **“Dump files” (or similar) branch** so OLA and other agents can attach reference only when needed, sparing context window and RAM per the documented architecture.

**Give this entire document to Manus** so he can create the repo, set the structure, and know how it fits with the rest.

---

## 1. Current repo (where things are now)

**Definitive list of what is what (software vs agents vs case):** See **MASTER_MAP.md** in this folder. Use it so no one mixes software, agents, and the case.

- **Primary remote for this worktree:** **casecraft-web** — `https://github.com/cyserman/casecraft-web.git`
- **Other remote:** **grifflaw** — `https://github.com/cyserman/grifflaw.git`
- **Your Cursor worktree:**  
  `.../worktrees/Project_PAI-Nexus__Multi-Tiered_AI_Operating_System_Guide/bbg`  
  This worktree currently mixes:
  - Casecraft / LegalForge / casecraft-premium (code)
  - PAI-Nexus / Angie / deployment (bbg, angie-deploy, START_HERE, WHAT_IS_IN_PLACE, etc.)
  - Chat/session notes and status docs

So the **current repo** you’re in for Cursor is **casecraft-web** (with this worktree). That’s the “software engineering” side. We want a **second repo** for the rest.

---

## 2. New separate repo (what Manus should create)

**Suggested name:** e.g. **`pai-nexus-context`** or **`pai-nexus-evidence`** or **`pai-nexus-status`** (you or Manus can pick one).

**Purpose:**

- **Chat threads / conversations:** Exports, summaries, or key threads you want to keep and reference without putting them in the code repo.
- **Actual evidence:** References, links, or (if you choose) sanitized copies of evidence — separate from code so agents don’t mix evidence with implementation.
- **Current status checklist(s):** Living checklists (e.g. “what’s done, what’s next, blockers”) so any agent (Manus, OLA, Cursor) can read “current status” without loading the whole codebase.
- **Other stuff:** Misc notes, architecture summaries, runbooks, prompts that are **reference** for agents, not source code.

**What stays in casecraft-web (no change):**

- Application code (Casecraft / LegalForge / client / server).
- Code-related config, scripts, and tooling.
- Anything that is “software engineering state” only.

So: **code and build/deploy logic → casecraft-web**. **Context, evidence, checklists, reference docs → new repo.**

---

## 3. Suggested structure for the new repo

Manus can create something like:

```
README.md                    # What this repo is; link to casecraft-web and architecture
CURRENT_STATUS.md            # Single checklist: done / next / blockers (update regularly)
ARCHITECTURE.md              # Short pointer to “documented architecture” (or paste summary)
chat-threads/                # Exported or key chat threads (e.g. by topic or date)
evidence/                    # References or files for “actual evidence” (no code)
reference/                  # Other reference: runbooks, prompts, one-pagers
dump/                       # (Optional) Placeholder for later “Dump files” branch content
```

- **CURRENT_STATUS.md** = the one place agents look for “what’s the state right now.”
- **chat-threads/** = so chat context lives here, not in the code repo.
- **evidence/** = keeps evidence separate from software state.
- **reference/** = shared runbooks/prompts so Cursor and Manus don’t hallucinate different procedures.
- **dump/** = reserved for the future “attach as reference only” use (see below).

---

## 4. Later: “Dump files” (or similar) branch — spare context and RAM

Per the **documented architecture** in this thread:

- Once **OLA and other agents** are in place and the **software is working**, add a branch (e.g. **`dump-files`** or **`reference-attach`**).
- That branch holds **reference-only** content: large or dense docs that agents should **attach when needed** instead of loading into the main context every time.
- Workflow: agent (or user) **attaches** a file or folder from that branch when a task needs it; otherwise the main context stays small. That spares **context window** and **RAM** and keeps engineering chats focused.

Manus should:

- Create the branch when you’re ready (e.g. after OLA + agents are in place).
- Keep that branch clearly documented as “reference only, attach on demand” in the repo README and in ARCHITECTURE.md.

No need to implement the “attach” mechanics in this brief; the repo just holds the content and the rule.

---

## 5. How to share this with Manus and keep Cursor focused

- **You:** Copy this file (or its path) to Manus. Say: *“Create the separate repo and structure as in BRIEF_FOR_MANUS_SEPARATE_REPO.md. Current code repo is casecraft-web; keep that for software only. Put context, evidence, checklists, and reference in the new repo. Later we’ll add the Dump files branch per the architecture.”*
- **Manus:** Creates the new repo (e.g. on GitHub under your account), adds the structure above, and optionally adds a first CURRENT_STATUS.md and ARCHITECTURE.md.
- **You:** When you work in **Cursor**, keep the Cursor workspace pointed at **casecraft-web** (or the bbg worktree) for **code only**. For status and evidence, you (or Manus) update the **new repo** and, when needed, paste or attach only what’s needed (e.g. CURRENT_STATUS.md or a single thread) into Cursor. That way Cursor stays off the evidence/thread dump and drift is reduced.
- **Cross-links:** In the new repo’s README, link to casecraft-web and to “documented architecture in this thread.” In casecraft-web (or bbg) you can add one short README or START_HERE line: “Current status and evidence live in [new-repo URL].”

---

## 6. One-line summary for Manus

**“Create a new repo (e.g. pai-nexus-context) for chat threads, evidence, current status checklist, and reference docs—separate from casecraft-web. Use the structure in section 3. Later add a ‘Dump files’ branch for reference-only attachment to spare context/RAM per the architecture. I’ll use you for this so Cursor stays focused on code.”**

---

**Where this file lives (for you):**  
`bbg/BRIEF_FOR_MANUS_SEPARATE_REPO.md` in your Cursor worktree. Copy to Desktop or paste into Manus so he has the full brief.
