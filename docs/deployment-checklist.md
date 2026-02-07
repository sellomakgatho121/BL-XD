# Blacklight Web Designs: Vercel Deployment Checklist

## 📧 Email System Configuration

### ✅ Resend Integration Status
- **API Key**: Configured (`RESEND_API_KEY`)
- **From Email**: Set to `onboarding@resend.dev` (testing domain)
- **Admin Email**: Set to `sellomakgatho121@gmail.com`
- **Error Handling**: Proper API response codes (400, 401, 403, 429, 500)
- **Rate Limiting**: Handled by Resend automatically
- **Fallback**: Local file logging if email fails

### 🔧 Required Environment Variables for Vercel

Add these to your Vercel Environment Variables:

```bash
# Production Environment Variables
NODE_ENV=production
RESEND_API_KEY=re_HY9VftLz_8e3j2HD8nx3GZYrPhBafbX3m
ADMIN_EMAIL=sellomakgatho121@gmail.com
FROM_EMAIL=onboarding@resend.dev  # Testing domain (temporary)

# For Production (after domain verification):
# FROM_EMAIL=noreply@blacklightwebdesigns.com
```

### 🚀 Quick Vercel Setup

**Immediate Deployment Steps:**

1. **Go to Vercel Dashboard**: [vercel.com/dashboard](https://vercel.com/dashboard)
2. **Select your BL-XD project**
3. **Add Environment Variables**:
   - `NODE_ENV=production`
   - `RESEND_API_KEY=re_HY9VftLz_8e3j2HD8nx3GZYrPhBafbX3m`
   - `ADMIN_EMAIL=sellomakgatho121@gmail.com`
   - `FROM_EMAIL=onboarding@resend.dev`
4. **Deploy**: Click **Redeploy** or push new commit
5. **Test**: Visit your deployed site and test newsletter form

**After Deployment:**
- ✅ Admin emails will work immediately
- ✅ Subscriber emails will work (sent to your email for testing)
- 🔄 Later: Verify domain to send to actual users

### 📋 Pre-Deployment Checklist

- [x] **Resend API Key**: Valid and configured
- [x] **Email Templates**: Preserved Blacklight terminal styling
- [x] **Error Handling**: Proper HTTP status codes
- [x] **Rate Limiting**: Resend handles automatically
- [x] **Testing**: Both admin and subscriber emails work
- [ ] **Domain Verification**: Optional for production (use `blacklightwebdesigns.com`)

### 🚀 Production Setup (Optional)

For production deployment with custom domain:

1. **Verify Domain**:
   - Go to [resend.com/domains](https://resend.com/domains)
   - Add `blacklightwebdesigns.com`
   - Follow DNS verification steps

2. **Update FROM_EMAIL**:
   ```bash
   FROM_EMAIL=noreply@blacklightwebdesigns.com
   ```

3. **Redeploy** after domain verification

### 📊 API Response Codes

The API follows Resend documentation:

- **200**: Success - emails sent
- **400**: Bad Request - invalid email format
- **401**: Unauthorized - missing/invalid API key
- **403**: Forbidden - domain not verified (for production domains)
- **429**: Too Many Requests - rate limit exceeded
- **500**: Internal Server Error - service unavailable

### 🧪 Testing Commands

**Local Testing:**
```bash
curl -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

**Production Testing:**
```bash
curl -X POST https://your-domain.vercel.app/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

### 📧 Email Templates

Both emails maintain Blacklight's terminal aesthetic:

**Admin Email:**
- Subject: "🚀 New Blacklight Lead Subscribed"
- Style: Monospace font, Onyx background, Signal Lime text
- Content: Lead details with timestamp and capture status

**Subscriber Email:**
- Subject: "You're on the Blacklight Notification List!"
- Style: Monospace font, Onyx background, Signal Lime text
- Content: Welcome message with activation theme

### 🔍 Monitoring

Check Vercel Function Logs for:
- Email delivery status
- API error responses
- Rate limiting (429 responses)
- Configuration issues

### ✅ Current Status

- **Development**: ✅ Fully functional
- **API Integration**: ✅ Resend SDK properly configured
- **Error Handling**: ✅ Comprehensive error coverage
- **Email Templates**: ✅ Blacklight branding preserved
- **Ready for Vercel**: ✅ All environment variables set

---

*This checklist ensures your email system works flawlessly on Vercel with proper Resend API integration.*
