# Stay on track: how to check everything and avoid drift

You said it’s getting harder to monitor than pen and paper and Post-its. This is a minimal plan: one place to look, one way to check, one rule for agents.

---

## 1. One place to look first

**Before starting a session (or handing work to an agent):**

1. Open **MASTER_MAP.md** (this repo: `bbg/MASTER_MAP.md`).
2. Read the **three buckets**: Software | Agents | Case.
3. Decide: *“This session is about ________.”* (Only one bucket unless the task explicitly combines them.)

That’s your “source of truth” for *what is what*. No need to remember everything — just open the map and pick the bucket.

---

## 2. One way to check for drift

**Quick check (once a week or when things feel mixed up):**

| Check | What to do |
|-------|------------|
| **Repos** | List your GitHub repos and local project folders. Match them to MASTER_MAP: software vs agents vs case. Add or fix the map if something’s wrong or new. |
| **Current repo** | In Cursor: run `git remote -v` in the folder you’re in. Is it casecraft-web? grifflaw? Something else? Update MASTER_MAP if the “current repo” row is wrong. |
| **LegalForge Montgomery County** | Confirm the folder still exists: `~/Projects/legalforge_-montgomery-county-divorce-manager/`. If you renamed or moved it, update MASTER_MAP. |
| **What’s in this worktree?** | Look at the root of `bbg`: do you see CaseCraft code, deploy scripts, and case docs all mixed? If yes, the map already says “don’t mix”; use the map to tell the agent which bucket they’re in. |

You don’t have to fix everything at once. Just: **open the map → confirm or correct one or two rows → done.** That’s the “check.”

---

## 3. One rule for you and every agent (Cursor, Manus, OLA, etc.)

**Rule:** *“Before answering or changing anything, check MASTER_MAP. Software, agents, and case are three separate buckets. Do not mix them unless the user’s task explicitly says to combine them.”*

**How to share this with agents:**

- **Cursor:** At the start of a session, say: *“Read bbg/MASTER_MAP.md and bbg/STAY_ON_TRACK.md. This session is about [software | agents | case]. Don’t mix the other buckets.”*
- **Manus:** Paste or link MASTER_MAP.md and STAY_ON_TRACK.md. Say: *“Use these to stay on track. When I ask for something, confirm which bucket (software / agents / case) and don’t mix.”*

That way everyone has the same rule and the same place to look.

---

## 4. If it’s still too much

- **Reduce to one thing per session.** Example: “Today we only touch agents (deploy/Angie). We do not touch CaseCraft code or case evidence.”
- **Put the map and this file somewhere obvious.** e.g. Desktop: “MASTER_MAP.md” and “STAY_ON_TRACK.md” so you don’t have to dig into the worktree. Open them first; then go into Cursor or Manus.
- **Use the separate repo (when Manus creates it).** Move evidence and status into the new repo. Then: **software** = casecraft-web, **agents** = bbg/angie-deploy, **case** = the new repo. Three places, three buckets, no mixing.

---

## 5. Summary

| Goal | Action |
|------|--------|
| Know what’s what | Open **MASTER_MAP.md**; use the three buckets (software / agents / case). |
| Check for drift | Weekly or when confused: repos vs map, “current repo,” LegalForge folder, what’s in bbg. |
| Keep agents from mixing | Tell them: read the map and STAY_ON_TRACK; one bucket per task unless you say otherwise. |
| LegalForge Montgomery County | Yes, still a thing — it’s in the map under Software (that instance) and Case (that matter). |

You can treat MASTER_MAP + this file as your “post-it wall”: one place to look, one way to check, one rule for everyone.
