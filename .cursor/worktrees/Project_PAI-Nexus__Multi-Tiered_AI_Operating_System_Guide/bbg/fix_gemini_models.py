#!/usr/bin/env python3
"""
Fix Agent Zero Model Configuration

Changes OpenRouter Google models to direct Gemini API.
This allows using GEMINI_API_KEY instead of requiring OPENROUTER_API_KEY.
"""

import sys
import os
sys.path.insert(0, os.path.expanduser('~/Angie'))

from python.helpers.settings import get_settings, set_settings_delta

def fix_model_settings():
    """Update settings to use direct Gemini instead of OpenRouter."""
    
    current = get_settings()
    
    print("=== CURRENT SETTINGS ===")
    print(f"Chat Provider: {current.get('chat_model_provider')}")
    print(f"Chat Model: {current.get('chat_model_name')}")
    print(f"Embed Provider: {current.get('embed_model_provider')}")
    print(f"Embed Model: {current.get('embed_model_name')}")
    print()
    
    updates = {}
    changes_made = False
    
    # Fix chat model if using OpenRouter Google OR if provider is openrouter
    chat_name = current.get('chat_model_name', '')
    chat_provider = current.get('chat_model_provider', '')
    
    # If provider is openrouter, switch to google
    if chat_provider == 'openrouter':
        if 'openrouter/google' in chat_name:
            # Extract model name (e.g., "gemini-2.5-pro" from "openrouter/google/gemini-2.5-pro")
            model_part = chat_name.replace('openrouter/google/', '')
            new_name = f"gemini/{model_part}"
        elif chat_name.startswith('openai/'):
            # Default to gemini-2.5-pro if currently using OpenAI via OpenRouter
            new_name = "gemini/gemini-2.5-pro"
        else:
            # Use gemini-2.5-pro as default
            new_name = "gemini/gemini-2.5-pro"
        
        updates['chat_model_name'] = new_name
        updates['chat_model_provider'] = 'google'
        print(f"✅ Updating chat model:")
        print(f"   Provider: {chat_provider} → google")
        print(f"   Model: {chat_name} → {new_name}")
        changes_made = True
    elif chat_name.startswith('gemini/'):
        print(f"✅ Chat model already uses direct Gemini: {chat_name}")
    else:
        print(f"ℹ️ Chat model: {chat_name} (provider: {chat_provider})")
        # Still update to use Gemini if not already
        if chat_provider != 'google':
            updates['chat_model_provider'] = 'google'
            updates['chat_model_name'] = 'gemini/gemini-2.5-pro'
            print(f"✅ Updating to use Gemini:")
            print(f"   Provider: {chat_provider} → google")
            print(f"   Model: {chat_name} → gemini/gemini-2.5-pro")
            changes_made = True
    
    # Ensure embedding uses HuggingFace
    embed_provider = current.get('embed_model_provider', '')
    if embed_provider != 'huggingface':
        updates['embed_model_provider'] = 'huggingface'
        updates['embed_model_name'] = 'sentence-transformers/all-MiniLM-L6-v2'
        print(f"✅ Updating embed provider: {embed_provider} → huggingface")
        changes_made = True
    else:
        print(f"✅ Embed model already uses HuggingFace: {current.get('embed_model_name')}")
    
    if changes_made:
        print()
        print("=== APPLYING CHANGES ===")
        set_settings_delta(updates, apply=False)  # Don't apply immediately (Angie is running)
        print("✅ Settings updated successfully!")
        print()
        print("=== VERIFICATION ===")
        updated = get_settings()
        print(f"Chat Provider: {updated.get('chat_model_provider')}")
        print(f"Chat Model: {updated.get('chat_model_name')}")
        print(f"Embed Provider: {updated.get('embed_model_provider')}")
        print(f"Embed Model: {updated.get('embed_model_name')}")
    else:
        print()
        print("✅ No changes needed - settings are already correct!")
    
    return changes_made

if __name__ == '__main__':
    try:
        fix_model_settings()
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
