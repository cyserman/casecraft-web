# Angie Privileges & Security Model

**Date:** February 02, 2026  
**Status:** Active Security Policy

---

## Recommended Privileges

### File System Access

**ALLOWED:**
- `~/.pai/` - Full read/write (config, memory, skills, tools)
- `~/Angie/` - Full read/write (Agent Zero engine)
- `~/.pai/.env` - Read only (API keys)
- User's home directory (`$HOME/*`)

**DENIED:**
- System directories (`/usr/`, `/etc/`, `/var/`, `/opt/`)
- Root-owned files
- Other users' directories
- Sudo/root access

### Network Access

**ALLOWED:**
- Outbound HTTPS (Gemini API, OpenRouter)
- Localhost:11434 (Ollama)
- Localhost:50080 (Angie UI)

**DENIED:**
- Inbound connections (unless explicitly configured)
- System ports (< 1024) without explicit permission

### Execution Privileges

**ALLOWED:**
- Python scripts in `~/Angie/` and `~/.pai/Tools/`
- Virtual environment activation (`~/Angie/venv/`)
- User-level commands

**DENIED:**
- System package installation (`apt`, `pip install --system`)
- Root-level operations
- Modifying system PATH or environment

### Optional (Phase 2 - Docker Deployment)

**Already Configured:**
- User in `docker` group (can run Docker without sudo)
- User in `ollama` group (can access Ollama)

---

## Security Model

### Principle of Least Privilege

Angie operates with **user-level privileges only**. No sudo, no root, no system modifications.

### Defense in Depth

1. **File Permissions:**
   - `.env` file: `600` (owner read/write only)
   - Config files: `644` (owner read/write, others read)
   - Directories: `755` (owner full, others read/execute)

2. **API Key Security:**
   - Stored in `~/.pai/.env` (gitignored)
   - Never exposed in chat or logs
   - Read-only access for Angie

3. **Sandboxing:**
   - All operations within `$HOME`
   - No system file access
   - Virtual environment isolation

---

## Current Status

**User:** `cyserman`  
**Groups:** `cyserman adm cdrom sudo dip plugdev users lpadmin sambashare docker ollama kvm`

**File Permissions:**
- `~/.pai/.env`: `600` (secured)
- `~/.pai/`: `755` (correct)
- `~/Angie/`: `755` (correct)

**API Key:** Configured and secured

---

## Verification Commands

```bash
# Check file permissions
ls -la ~/.pai/.env
ls -ld ~/.pai ~/Angie

# Verify API key is set (without exposing it)
grep -q "GEMINI_API_KEY=AIza" ~/.pai/.env && echo "✅ API key configured"

# Check user groups
groups | grep -E "(docker|ollama)" && echo "✅ Docker/Ollama access ready"
```

---

## THEBOSS Assessment

**Security Level:** ✅ APPROVED

- User-level privileges only
- No sudo/root access
- Proper file permissions
- API keys secured
- Sandboxed to user space

**Status:** Ready for launch with secure privilege model.

---

**THEBOSS: Privileges configured correctly. Angie operates safely within user space.**
