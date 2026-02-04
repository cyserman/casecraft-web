# Master map: what is what (software vs agents vs case)

**Use this so software, agents, and the case stay separate. Everyone (you, Cursor, Manus, other agents) should check this before assuming what “the repo” or “the project” is.**

Last updated: 2026-02 (you can add the date when you edit).

---

## The three buckets (do not mix unless the task says so)

| Bucket | What it is | Where it lives (as of now) |
|--------|------------|----------------------------|
| **Software** | The app: CaseCraft (formerly LegalForge) — case management UI, backend, codebase | See “Software” section below |
| **Agents** | Angie, Manus, OLA, PAI-Nexus, Watchtower, deployment, runbooks | See “Agents” section below |
| **Case** | Your actual legal case: evidence, Montgomery County matter, client data, backups | See “Case” section below |

---

## Software (the app)

| Name | What it is | Where | Still a thing? |
|-----|------------|--------|----------------|
| **casecraft-web** (GitHub repo) | Git remote: `https://github.com/cyserman/casecraft-web.git`. Likely the main **code** repo for the web app. | Your Cursor worktree (bbg) is tied to this repo. | **Yes** — origin for this worktree. |
| **casecraft-premium** | App code (client/server) — may live inside the casecraft-web repo or as a subfolder. | In project layout: `bbg/Projects/casecraft-premium (1)/` (if that path exists in your worktree). | **Unclear** — confirm if this folder exists in your bbg worktree. |
| **legalforge_-montgomery-county-divorce-manager** | A **project folder** (not necessarily a git repo): LegalForge/CaseCraft for the Montgomery County case. Contains whitepaper, launch script, CaseCraft description. | `~/Projects/legalforge_-montgomery-county-divorce-manager/` | **Yes** — it’s a thing; local project for that deployment/case. |
| **Casecraft_2.0** | Another **project folder**: CaseCraft v2.0, launch scripts, agent instructions. | `~/Projects/Casecraft_2.0/` | **Yes** — confirm if this is current or legacy. |
| **grifflaw** (GitHub repo) | Git remote: `https://github.com/cyserman/grifflaw.git`. Different product (Griffith Law site?). | Referenced as “grifflaw” remote; workspace on Desktop/incoming. | **Yes** — separate from CaseCraft; don’t mix. |

So: **casecraft-web** = main code repo for the app. **legalforge_montgomery_county** = still a thing (local project / deployment for that case). **Casecraft_2.0** = also a thing; you may want to mark it “current” or “legacy” once you decide.

---

## Agents (Angie, Manus, OLA, deploy, PAI-Nexus)

| Name | What it is | Where |
|-----|------------|--------|
| **bbg** (this worktree) | Cursor worktree mixing deploy docs, PAI-Nexus, Angie runbooks, and (currently) references to CaseCraft. | `.../worktrees/Project_PAI-Nexus__Multi-Tiered_AI_Operating_System_Guide/bbg` |
| **angie-deploy** | Deployment-only content: droplet scripts, Open WebUI, Angie service. Meant to stay **separate** from CaseCraft so Copilot/agents don’t drift. | Folder: `bbg/angie-deploy/`. Intended to be its own GitHub repo (e.g. `angie-deploy`) — not yet pushed? |
| **Open WebUI** | Chat UI on droplet (157.245.7.40:8080). | Running on server; docs in bbg (WHAT_IS_IN_PLACE, etc.). |
| **Angie (Agent Zero)** | Local/droplet agent. | Not running on droplet currently; runbooks in angie-deploy. |
| **Manus** | Your other AI assistant; you use him to spare Cursor from drift. | N/A (external). |
| **PAI-Nexus / OLA / Watchtower** | Documented in directives, architecture. | `bbg/directives/`, BRIEF_FOR_MANUS, etc. |

Rule: **Agent/deploy work** = bbg + angie-deploy (and eventually the separate “context” repo from BRIEF_FOR_MANUS). **Do not** assume the “current repo” for agent work is the same as the CaseCraft code repo.

---

## Case (evidence, Montgomery County, client data)

| What | Where |
|------|--------|
| LegalForge/CaseCraft **case data** (backups, vault) | In app data (IndexedDB, local); backups in e.g. `~/Downloads/LegalForge_Backup_Montgomery_County,_PA_*.json`. |
| **Evidence** (your “actual evidence”) | Should live in the **separate repo** Manus will create (per BRIEF_FOR_MANUS_SEPARATE_REPO.md) — not in the code repo. For now: keep evidence out of casecraft-web and out of bbg code paths. |
| **legalforge_context.md** | Referenced in Angie knowledge, session summaries. Describes LegalForge/CaseCraft for the agent. | `~/Angie/knowledge/...`, `bbg/...` — be careful not to paste real case details into shared repos. |

Rule: **Case = evidence + client matter.** Never treat the **software repo** (casecraft-web) or **agent repo** (angie-deploy / future context repo) as the single source of truth for the case; keep case data in its own place (app vault, backups, future “evidence” repo).

---

## What “current repo” means (so we stop mixing)

- **When you’re in Cursor and working on the app (UI, backend, CaseCraft features):**  
  **Current repo = casecraft-web.** Branch/worktree = whatever you have open (e.g. bbg).

- **When you’re working on deploy, Angie, Open WebUI, or runbooks:**  
  **Current context = bbg + angie-deploy.** The “repo” might still be casecraft-web if angie-deploy hasn’t been pushed to its own repo yet; the **intent** is deploy-only content in its own repo so context doesn’t mix.

- **When you’re working on the case (evidence, strategy, status of the matter):**  
  **Current context = the case.** That should be the separate context repo (once Manus creates it) or your local backups/vault — **not** the software repo.

- **LegalForge Montgomery County:**  
  **Yes, still a thing.** It’s the project folder and deployment for that case (`~/Projects/legalforge_-montgomery-county-divorce-manager/`). It’s **case + software instance**, not the generic “casecraft-web” codebase.

---

## One-line cheat sheet

- **Software** → casecraft-web (code), legalforge_montgomery_county (that instance), Casecraft_2.0 (folder).
- **Agents** → bbg, angie-deploy, Open WebUI, Angie, Manus; keep deploy/context separate from app code.
- **Case** → evidence + case data; keep out of app repo; use separate repo when Manus creates it.

If an agent or human says “the repo” or “the project,” ask: **software, agents, or case?** Then check this map.
