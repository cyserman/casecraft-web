# Commit Message

```
fix: Angie backend configuration, memory restoration, and code execution

Major fixes and improvements:

1. Fixed OpenRouter to Direct Gemini API Configuration
   - Changed chat_model_provider from "openrouter" to "google"
   - Updated chat_model_name to "gemini/gemini-2.5-pro"
   - Created fix script and documentation

2. Fixed Environment Loading (key=None Error)
   - Added explicit .env loading to run_ui.py
   - Now loads ~/.pai/.env on startup
   - Resolves 400 Bad Request with key=None

3. Restored Angie's Memory
   - Copied 9 knowledge files to ~/Angie/knowledge/custom/
   - Includes agent0_profile.md, operator_profile.md, legalforge_context.md
   - Ready for memory verification test

4. Fixed Code Execution Tool Error
   - Changed shell_interface from "ssh" to "local"
   - Uses local Python TTY for native installation
   - Requires Angie restart to apply

5. Created 630 Message Ingest Guide
   - Comprehensive guide for Discovery Airlock processing
   - Documents directory structure and workflow
   - Awaiting user to provide CSV file location

Files:
- New: fix_gemini_models.py, multiple documentation files
- Modified: ~/Angie/run_ui.py (env loading), ~/Angie/tmp/settings.json
- Restored: ~/Angie/knowledge/custom/*.md (9 files)

Status: All critical fixes applied. Ready for Angie restart and testing.
```
