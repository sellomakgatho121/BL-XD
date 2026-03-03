# 🔒 Private Deployment Guide

## Quick Start

### Enable Password Protection

**Method 1: Vercel Dashboard (Easiest)**
1. Deploy to Vercel
2. Go to **Project Settings → Password Protection**
3. Enable and set password
4. Done! Site is now password-protected

**Method 2: Environment Variables (More Control)**
1. In Vercel Dashboard → **Settings → Environment Variables**, add:
   ```
   NEXT_PUBLIC_PASSWORD_PROTECTED=true
   SITE_PASSWORD=your-secure-password-here
   ```
2. Redeploy
3. Visitors will see custom `/auth` page

---

## How It Works

### Architecture
- **Middleware** (`src/middleware.ts`) intercepts all requests
- Checks for `site_access` cookie
- Redirects to `/auth` if no valid cookie
- **Auth Page** (`/auth`) provides password entry form
- **API Route** (`/api/auth`) validates password server-side
- Sets cookie on successful authentication

### Security Features
- ✅ Password never exposed to client
- ✅ Server-side validation only
- ✅ Cookie-based session (24-hour expiry)
- ✅ Secure cookie settings (SameSite=Lax)
- ✅ Customizable password per environment

---

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_PASSWORD_PROTECTED` | Enable/disable protection | `false` |
| `SITE_PASSWORD` | Password for access | `blacklight2026` |

### Local Development

Create `.env.local`:
```bash
NEXT_PUBLIC_PASSWORD_PROTECTED=true
SITE_PASSWORD=dev-password-123
```

### Production (Vercel)

1. Go to **Project Settings → Environment Variables**
2. Add both variables
3. Set `SITE_PASSWORD` to a strong password
4. Redeploy

---

## Customization

### Change Password Page Design
Edit `src/app/auth/page.tsx` to match your brand.

### Change Session Duration
In `src/app/auth/page.tsx`, modify cookie max-age:
```typescript
document.cookie = `site_access=${password}; path=/; max-age=86400; SameSite=Lax`;
// Change 86400 (24 hours) to desired seconds
```

### Add Multiple Passwords
Modify `src/app/api/auth/route.ts` to check against multiple passwords:
```typescript
const allowedPasswords = [
  process.env.SITE_PASSWORD,
  process.env.SITE_PASSWORD_ALT,
].filter(Boolean);

if (allowedPasswords.includes(password)) {
  return NextResponse.json({ success: true });
}
```

---

## Testing

### Test Locally
```bash
# Enable protection
echo "NEXT_PUBLIC_PASSWORD_PROTECTED=true" >> .env.local
echo "SITE_PASSWORD=test123" >> .env.local

# Start dev server
npm run dev

# Visit http://localhost:3000
# Should redirect to /auth
```

### Test in Production
1. Deploy with password protection enabled
2. Visit production URL
3. Should see `/auth` page
4. Enter password
5. Should redirect to home page

---

## Troubleshooting

### Password Page Not Showing
- Check `NEXT_PUBLIC_PASSWORD_PROTECTED` is set to `true`
- Verify middleware is running (check Vercel logs)
- Clear browser cookies and try again

### Password Not Working
- Verify `SITE_PASSWORD` environment variable is set correctly
- Check for typos in password
- Ensure environment variables are set in production environment

### Can't Access After Password Entry
- Check browser console for errors
- Verify cookie is being set (check DevTools → Application → Cookies)
- Try clearing cookies and re-entering password

### Middleware Not Running
- Ensure `src/middleware.ts` exists
- Check Next.js version (requires 12.2+)
- Verify matcher pattern in middleware config

---

## Security Best Practices

1. **Use Strong Passwords**
   - Minimum 12 characters
   - Mix of letters, numbers, symbols
   - Don't use default password in production

2. **Rotate Passwords Regularly**
   - Change `SITE_PASSWORD` periodically
   - Update in environment variables
   - Redeploy

3. **Consider Additional Security**
   - IP allowlisting (Vercel Pro feature)
   - Rate limiting on `/api/auth`
   - Add CAPTCHA for brute force protection

4. **Monitor Access**
   - Check Vercel Analytics for unusual traffic
   - Review access logs
   - Set up alerts for failed auth attempts

---

## Disable Password Protection

### Temporarily
Set `NEXT_PUBLIC_PASSWORD_PROTECTED=false` in environment variables.

### Permanently
Remove the environment variable or set it to `false`, then redeploy.

---

## Alternative: Vercel Built-in Protection

Vercel offers built-in password protection that's simpler to use:

1. **Project Settings → Password Protection**
2. Enable and set password
3. No code changes needed

**Pros:**
- Zero configuration
- Works immediately
- No middleware overhead

**Cons:**
- Less customization
- Generic password page
- Can't customize session duration

**Recommendation:** Use Vercel's built-in for simplicity, or middleware-based for customization.
