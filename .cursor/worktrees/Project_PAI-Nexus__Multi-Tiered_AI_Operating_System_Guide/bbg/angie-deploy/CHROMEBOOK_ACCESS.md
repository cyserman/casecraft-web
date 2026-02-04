# Accessing Angie from Your Chromebook

Once Angie is deployed on the Enforcer Droplet (157.245.7.40), you can use it from **any device with web access**, including your Chromebook.

---

## Option 1: Direct URL (simplest)

**From your Chromebook (or phone, or any browser):**

1. Open Chrome and go to:
   ```text
   http://157.245.7.40:5000
   ```
2. Use Angie as usual in the browser.

**Requirements:**

- You have internet access.
- Port 5000 is open on the droplet (see deployment runbook).

**Note:** This uses HTTP, not HTTPS. For home/personal use over the internet it’s fine; for HTTPS see Option 2.

---

## Option 2: HTTPS with Cloudflare Tunnel (recommended for HTTPS)

If you want a **stable HTTPS URL** that works from your Chromebook (or anywhere) without opening port 5000 on the droplet:

1. **Create a free Cloudflare account** (if you don’t have one): https://dash.cloudflare.com/sign-up  
2. **On the Enforcer Droplet**, install and run Cloudflare Tunnel (one-time setup):

   ```bash
   # On droplet (SSH in first)
   curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
   sudo dpkg -i cloudflared.deb
   # Quick tunnel (gives a random URL that works over HTTPS)
   cloudflared tunnel --url http://127.0.0.1:5000
   ```

3. **Use the URL** that `cloudflared` prints (e.g. `https://xxxx-xx-xx.trycloudflare.com`) in your Chromebook browser. That URL will work from anywhere with web access.

**Optional (stable URL):** You can later create a “named” tunnel in the Cloudflare dashboard and point a subdomain (e.g. `angie.yourdomain.com`) to the droplet so you always use the same HTTPS link from your Chromebook.

---

## Option 3: Discord (already configured)

If Angie is connected to Discord (Kilo API), you can talk to her from the Discord app on your Chromebook (or phone) without opening any URL. Same account, same bot.

---

## Summary

| Method              | From Chromebook        | HTTPS | Setup                    |
|---------------------|------------------------|-------|---------------------------|
| Direct URL          | `http://157.245.7.40:5000` | No    | Open port 5000 on droplet |
| Cloudflare Tunnel   | URL from `cloudflared` | Yes   | Install `cloudflared` on droplet |
| Discord             | Discord app / web     | Yes   | Already configured        |

**Bottom line:** With web access, you can always use Angie from your Chromebook: either via **http://157.245.7.40:5000** (direct) or via the **Cloudflare Tunnel HTTPS URL** (or Discord).
