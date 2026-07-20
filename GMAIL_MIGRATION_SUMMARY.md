# Gmail Nodemailer Migration Summary

## What Changed

### Switched From:
- **Zoho API** (OAuth, CRM integration, Zoho Mail API)
- Complex credential management
- Multiple API endpoints

### Switched To:
- **Gmail with Nodemailer** (Simple SMTP)
- Single email account
- Easy to set up and maintain

## Updated Files

### 1. **src/api/project/services/zoho-email.js**
**Changes:**
- Removed Zoho OAuth token generation
- Removed Zoho CRM API calls
- Added Nodemailer SMTP configuration
- Simplified email recipient management
- Uses environment variable for recipient list

**Key Functions:**
```javascript
// Initialize Gmail transporter
initializeTransporter()

// Get email list (from env or config)
getEmailListFromZoho()

// Send via Gmail SMTP
sendProjectNotificationEmail(project, recipients)

// Main hook on project creation
onProjectCreated(project)
```

### 2. **config/server.js**
**Changes:**
- Removed `zoho` configuration
- Added `email.gmail` configuration
- Added `email.recipientList` configuration

**New Config:**
```javascript
email: {
  gmail: {
    user: env("GMAIL_USER"),
    appPassword: env("GMAIL_APP_PASSWORD"),
  },
  recipientList: [], // Optional: add hardcoded recipients
}
```

### 3. **package.json**
**Changes:**
- Added `nodemailer: ^6.9.7` dependency

**Install Command:**
```bash
npm install
```

### 4. **.env File**
**New Variables:**
```
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
RECIPIENT_EMAILS=recipient1@example.com,recipient2@example.com
```

## Setup Instructions

### Step 1: Enable 2FA on Gmail Account
```
Visit: https://myaccount.google.com → Security → 2-Step Verification
```

### Step 2: Generate App Password
```
Visit: https://myaccount.google.com/apppasswords
Select: Mail + Windows Computer (or your OS)
Copy: 16-character password
```

### Step 3: Update .env
```bash
# Copy the app password (with spaces)
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx

# Add recipient emails (comma-separated)
RECIPIENT_EMAILS=ishika@wealth-clinic.com,team@wealth-clinic.com
```

### Step 4: Install Dependencies
```bash
npm install
```

### Step 5: Restart Strapi
```bash
npm run develop
```

### Step 6: Test
Create a new project in Strapi Admin → Check recipient emails

## How It Works Now

### Immediate Notification (On Project Creation)
```
1. User creates project in Strapi Admin
2. Project is saved to database
3. Service hook triggers: onProjectCreated()
4. Fetches recipient list from env/config
5. Initializes Gmail SMTP connection
6. Sends formatted HTML email to all recipients
7. Logs: "Project notification email sent to X recipients"
```

### Hourly Cron Backup
```
Every hour (on the hour):
  ↓
Bootstrap cron job runs
  ↓
Fetches recently created projects
  ↓
For each project: sends email via Gmail
  ↓
Logs activity
```

## Configuration Options

### Option 1: Use Environment Variable (Recommended)
```bash
# .env
RECIPIENT_EMAILS=recipient1@example.com,recipient2@example.com
```

### Option 2: Hardcode in Config
```javascript
// config/server.js
email: {
  gmail: {
    user: env("GMAIL_USER"),
    appPassword: env("GMAIL_APP_PASSWORD"),
  },
  recipientList: [
    { email: 'ishika@wealth-clinic.com', name: 'Ishika' },
    { email: 'team@wealth-clinic.com', name: 'Team' },
  ],
},
```

### Option 3: Database-Driven (Future Enhancement)
Create a Settings collection type and query recipients dynamically.

## Email Template

### Default Email Format
```html
Subject: New Project Added: [Project Name]

Body:
  Project Name: [Name]
  Registration No: [RegNo]
  Min Price: [Min_Price]
  Max Price: [Max_Price]
  Address: [Address]
  Total Floors: [Total_Floors]
  Possession Date: [Possession_Month_Year]
  Description: [Description]
```

### Customize Template
Edit `src/api/project/services/zoho-email.js` function `sendProjectNotificationEmail()`:

```javascript
const emailBody = `
  <h2>Custom Title</h2>
  <p><strong>Field:</strong> ${project.attributes.fieldName}</p>
`;
```

## Advantages Over Zoho

| Feature | Zoho | Gmail Nodemailer |
|---------|------|------------------|
| Setup Complexity | High (OAuth, APIs) | Low (2FA + App Password) |
| Dependencies | Axios + OAuth2 | Just Nodemailer |
| Learning Curve | Steep | Gentle |
| Configuration | Multiple endpoints | Single SMTP |
| Cost | Free tier limited | Free (Gmail account) |
| Reliability | Good | Excellent |
| Email delivery | Good | Excellent |

## Troubleshooting

### Error: "Invalid login credentials"
```
✅ Check GMAIL_USER is correct
✅ Check GMAIL_APP_PASSWORD is correct (16 chars, with spaces)
✅ Verify 2FA is enabled
✅ Regenerate App Password if needed
```

### Error: "No recipients configured"
```
✅ Add RECIPIENT_EMAILS to .env
✅ Use format: email1@example.com,email2@example.com
✅ No spaces after commas
```

### Error: "ECONNREFUSED"
```
✅ Check internet connection
✅ Gmail SMTP might be blocked by firewall
✅ Try from different network
✅ Check Gmail security settings
```

### Emails not sending silently
```
✅ Check Strapi logs for errors: npm run develop
✅ Verify recipients list has valid emails
✅ Check Gmail "Sent" folder in GMAIL_USER account
✅ Add error handling to see what's wrong
```

## Performance Improvements

### Nodemailer vs Zoho API
- **Faster:** Direct SMTP (no OAuth token generation needed)
- **Simpler:** No CRM integration complexity
- **Lighter:** Fewer dependencies, smaller bundle
- **Reliable:** Battle-tested Nodemailer library

## Security Considerations

✅ **Don't Commit .env:** Add to .gitignore
✅ **App Passwords:** Unique to this app, can revoke anytime
✅ **2FA Required:** Google enforces this for app passwords
✅ **Rotate Credentials:** Periodically regenerate app password
✅ **Dedicated Account:** Use company Gmail, not personal

## Next Steps (Optional Enhancements)

### 1. Add Email Templates
Create `src/api/project/services/email-templates.js`

### 2. Email Tracking
Create EmailLog collection type to track sent emails

### 3. HTML Email Builder
Create email templates in Strapi with CKEditor

### 4. Batch Sending
Use Queue system (Bull) for large recipient lists

### 5. Webhook Integration
Send notifications to Slack/Teams as alternative

## Migration Checklist

- [ ] Read `GMAIL_SETUP_GUIDE.md`
- [ ] Enable 2FA on Gmail account
- [ ] Generate App Password
- [ ] Update `.env` with Gmail credentials
- [ ] Update `.env` with recipient emails
- [ ] Run `npm install`
- [ ] Restart Strapi: `npm run develop`
- [ ] Test: Create a project
- [ ] Verify: Check recipient email
- [ ] Monitor: Check Strapi logs

## Useful Links

- Gmail App Passwords: https://myaccount.google.com/apppasswords
- Nodemailer Documentation: https://nodemailer.com
- Gmail Security: https://myaccount.google.com/security
- Cron Schedule Help: https://crontab.guru

## Support

For issues:
1. Check Strapi logs: `npm run develop`
2. Verify Gmail credentials at: https://myaccount.google.com
3. Check recipient email format
4. Review `GMAIL_SETUP_GUIDE.md`
