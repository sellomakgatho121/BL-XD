# 🚀 Deployment Guide

## High-Quality Hosting Options

### **Recommended: Vercel** ⭐
**Best for:** Next.js applications (made by Next.js creators)

**Why Vercel:**
- Zero-configuration deployment
- Automatic optimizations (image, font, code splitting)
- Global Edge Network (fast worldwide)
- Built-in CI/CD with Git integration
- Free tier: Generous limits for personal projects
- Preview deployments for every PR
- Analytics and monitoring included

**Deployment Steps:**

#### Option 1: Git Integration (Recommended)
1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "Add New Project"
4. Import your repository
5. Vercel auto-detects Next.js configuration
6. Click "Deploy" (no configuration needed!)
7. Your site is live in ~2 minutes

#### Option 2: Vercel CLI
```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

**Environment Variables:**
- Set in Vercel Dashboard → Project Settings → Environment Variables
- Or use `.env.local` for local development (already in .gitignore)

**Password Protection (Private Deployment):**
This project includes built-in password protection. Two methods available:

**Method 1: Vercel Built-in (Easiest)**
1. Go to Project Settings → Password Protection
2. Enable password protection
3. Set your password
4. All visitors will be prompted for password

**Method 2: Middleware-Based (More Control)**
1. Set environment variables in Vercel Dashboard:
   - `NEXT_PUBLIC_PASSWORD_PROTECTED=true`
   - `SITE_PASSWORD=your-secure-password`
2. Custom authentication page at `/auth`
3. Password stored in cookie (24-hour session)

---

### **Alternative: Railway** 🚂
**Best for:** Full-stack apps needing databases

**Why Railway:**
- Simple deployment
- Built-in PostgreSQL/MySQL
- $5/month starter plan
- Good for apps with backend APIs

**Deployment:**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up
```

---

### **Alternative: Netlify** 🌐
**Best for:** Static sites and JAMstack

**Why Netlify:**
- Great free tier
- Form handling built-in
- Edge functions
- Good documentation

**Deployment:**
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

---

## Pre-Deployment Checklist

### ✅ Code Quality
- [ ] Run `npm run build` successfully
- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] ESLint passing (`npm run lint`)
- [ ] Test locally (`npm run dev`)

### ✅ Security
- [ ] No hardcoded secrets or API keys
- [ ] Environment variables documented
- [ ] Dependencies audited (`npm audit`)

### ✅ Performance
- [ ] Images optimized
- [ ] No console.log statements in production code
- [ ] Bundle size acceptable

### ✅ Configuration
- [ ] `vercel.json` configured (if using Vercel)
- [ ] `next.config.ts` optimized
- [ ] Custom domain configured (if applicable)

---

## Environment Variables

Create a `.env.local` file for local development (already in .gitignore):

```bash
# Password Protection (for private deployments)
NEXT_PUBLIC_PASSWORD_PROTECTED=false  # Set to 'true' to enable
SITE_PASSWORD=blacklight2026  # Change this to a secure password!

# Example (add your actual variables)
# NEXT_PUBLIC_API_URL=https://api.example.com
# DATABASE_URL=postgresql://...
```

**Important:** Set these same variables in your hosting platform's dashboard.

---

## 🔒 Private Deployment / Password Protection

### Enable Password Protection

**Option 1: Vercel Built-in Protection (Recommended)**
- Go to Vercel Dashboard → Project Settings → Password Protection
- Enable and set password
- Works immediately, no code changes needed

**Option 2: Middleware-Based Protection**
1. Set environment variables:
   ```bash
   NEXT_PUBLIC_PASSWORD_PROTECTED=true
   SITE_PASSWORD=your-secure-password-here
   ```
2. Deploy - visitors will see `/auth` page
3. Password is stored in cookie (24-hour session)

### How It Works
- **Middleware** (`src/middleware.ts`) checks for password cookie
- **Auth Page** (`/auth`) provides password entry form
- **API Route** (`/api/auth`) validates password
- **Cookie** stores access for 24 hours

### Security Notes
- Change default password in production
- Use strong passwords (12+ characters)
- Consider Vercel's built-in protection for simpler setup
- Password is server-side only (not exposed to client)

### Disable Password Protection
Set `NEXT_PUBLIC_PASSWORD_PROTECTED=false` or remove the environment variable.

---

## Post-Deployment

### Health Check
After deployment, verify:
1. ✅ Site loads correctly
2. ✅ All routes work
3. ✅ Images load properly
4. ✅ Forms submit (if applicable)
5. ✅ No console errors

### Monitoring
- **Vercel:** Built-in analytics dashboard
- **Railway:** Logs available in dashboard
- **Netlify:** Analytics in dashboard

---

## Custom Domain Setup

### Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Follow DNS configuration instructions
4. SSL certificate auto-provisioned

### Railway
1. Go to Settings → Networking
2. Add custom domain
3. Configure DNS records
4. SSL auto-provisioned

---

## Rollback Strategy

### Vercel
- Go to Deployments → Select previous deployment → "Promote to Production"

### Railway
- Go to Deployments → Select previous version → "Redeploy"

---

## Troubleshooting

### Build Fails
1. Check build logs in dashboard
2. Run `npm run build` locally to reproduce
3. Check for TypeScript/ESLint errors
4. Verify all dependencies are in `package.json`

### Environment Variables Not Working
1. Ensure variables are set in hosting dashboard
2. Restart deployment after adding variables
3. Check variable names match exactly (case-sensitive)

### Images Not Loading
1. Verify image paths are correct
2. Check Next.js Image component usage
3. Ensure images are in `public/` folder or external URLs

---

## Quick Deploy Commands

```bash
# Build locally to test
npm run build

# Start production server locally
npm start

# Deploy to Vercel (production)
vercel --prod

# Deploy to Railway
railway up

# Deploy to Netlify
netlify deploy --prod
```

---

## Support

- **Vercel Docs:** https://vercel.com/docs
- **Railway Docs:** https://docs.railway.app
- **Netlify Docs:** https://docs.netlify.com
