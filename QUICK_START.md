# Quick Reference: Gmail Setup & Configuration

## Step 1: Enable 2-Factor Authentication

Go to https://myaccount.google.com → Security → Enable 2-Step Verification

## Step 2: Generate Gmail App Password

1. Visit: https://myaccount.google.com/apppasswords
2. Select **Mail** and **Windows Computer**
3. Copy the 16-character password

## Step 3: Add to `.env` file

```bash
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
RECIPIENT_EMAILS=recipient1@example.com,recipient2@example.com
```

## Step 4: Install & Restart

```bash
npm install
npm run develop
```

## Step 5: Test

Create a new project in Strapi Admin → Check recipient emails for notification

## Expected Behavior

### On Project Creation:
```
1. Create project in Strapi Admin → 
2. Publish project →
3. Fetch recipient emails →
4. Send via Gmail (Nodemailer) →
5. Logs: "Project notification email sent to X recipients"
```

### Hourly Cron:
```
Every hour at :00
  ↓
Check for recently created projects
  ↓
Send notifications via Gmail
  ↓
Log activity
```

## Verify Setup

### Check Logs:
```bash
npm run develop
# Look for: "Project notification email sent to X recipients"
```

### Check Gmail Sent Folder:
- Log into `GMAIL_USER` account
- Check "Sent" folder
- You should see emails sent to recipients

## Email Configuration

**From:** The email address in `GMAIL_USER`
**To:** Addresses in `RECIPIENT_EMAILS` (comma-separated)
**Subject:** "New Project Added: [Project Name]"
**Body:** HTML formatted with project details

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Invalid login credentials" | Verify credentials, regenerate App Password |
| No emails sent | Check RECIPIENT_EMAILS env var, verify addresses |
| Connection refused | Check internet, verify Gmail SMTP accessible |
| 2FA not enabled | Required for App Passwords - enable at myaccount.google.com |

## Cron Schedule Reference

```
0 * * * *     → Every hour
0 0 * * *     → Daily at midnight
0 */6 * * *   → Every 6 hours
*/30 * * * *  → Every 30 minutes
0 9 * * MON   → Every Monday at 9 AM
```

## Files Modified

- ✅ `src/api/project/services/zoho-email.js` - Gmail Nodemailer service
- ✅ `config/server.js` - Gmail configuration
- ✅ `package.json` - Added nodemailer dependency
- ✅ `src/index.js` - Cron job setup (already done)

## Quick Checklist

- [ ] 2-Factor Authentication enabled on Gmail
- [ ] App Password generated and copied
- [ ] `.env` file updated with GMAIL_USER, GMAIL_APP_PASSWORD, RECIPIENT_EMAILS
- [ ] Dependencies installed: `npm install`
- [ ] Strapi restarted: `npm run develop`
- [ ] Test: Create a project and verify email received

## Need More Help?

- See `GMAIL_SETUP_GUIDE.md` for detailed Gmail setup
- See `IMPLEMENTATION_GUIDE.md` for complete setup overview
- See Strapi logs: `npm run develop`

## Environment Variables Explained

**GMAIL_USER**
- Your Gmail address (sender)
- Example: `project-notifications@gmail.com`
- Must have 2FA enabled

**GMAIL_APP_PASSWORD**
- 16-character password from Google
- Generated at myaccount.google.com/apppasswords
- Looks like: `xxxx xxxx xxxx xxxx`

**RECIPIENT_EMAILS**
- Comma-separated list of recipient addresses
- Example: `ishika@wealth-clinic.com,team@wealth-clinic.com`
- These are who receives the project notifications

