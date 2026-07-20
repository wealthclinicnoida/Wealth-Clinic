# Gmail Nodemailer Setup Guide

## Step 1: Enable 2-Factor Authentication (Required)

1. Go to your Google Account: https://myaccount.google.com
2. Click **Security** in the left menu
3. Enable **2-Step Verification** if not already enabled

## Step 2: Create Gmail App Password

1. Go to: https://myaccount.google.com/apppasswords
2. Select **Mail** and **Windows Computer** (or your device)
3. Google will generate a 16-character password
4. Copy this password (you'll need it for `.env`)

## Step 3: Add Environment Variables

Add the following to your `.env` file:

```
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
RECIPIENT_EMAILS=recipient1@example.com,recipient2@example.com,recipient3@example.com
```

**Important Notes:**
- `GMAIL_USER`: Your Gmail address (e.g., your-company@gmail.com)
- `GMAIL_APP_PASSWORD`: The 16-character password generated in Step 2 (copy with spaces)
- `RECIPIENT_EMAILS`: Comma-separated list of email addresses to notify

## Step 4: Install Dependencies

Run this command in your project directory:

```bash
npm install
```

This will install `nodemailer` package (already added to package.json)

## Step 5: Restart Strapi

```bash
npm run develop
```

## Step 6: Test the Implementation

### Method 1: Create Project in Admin Panel
1. Go to Strapi Admin: http://localhost:1337/admin
2. Navigate to Projects collection
3. Create a new project
4. Publish it
5. Check the recipient emails for notification

### Method 2: API Test (Optional)
Create a POST request to:
```
POST http://localhost:1337/api/projects
```

With body:
```json
{
  "data": {
    "Project_Name": "Test Project",
    "RegNo": "REG123",
    "Min_Price": 1000000,
    "Max_Price": 2000000,
    "Address": "Test Address"
  }
}
```

## Verify Everything Works

### Check Strapi Logs
```
npm run develop
```

You should see in logs:
```
Project notification email sent to X recipients
```

### Check Gmail Sent Folder
1. Log into the Gmail account you configured
2. Go to Sent folder
3. You should see emails sent to your recipients

## Troubleshooting

### Issue: "Invalid login credentials"
**Solution:**
- Verify `GMAIL_USER` and `GMAIL_APP_PASSWORD` are correct
- Go to https://myaccount.google.com/apppasswords and regenerate the password
- Ensure 2-Factor Authentication is enabled

### Issue: "Less secure app access"
**Solution:**
- App passwords only work with 2FA enabled
- Check Google Account security settings
- App passwords are specific to Gmail, not regular passwords

### Issue: No emails being sent
**Solution:**
- Check if `RECIPIENT_EMAILS` environment variable is set
- Verify email addresses are valid
- Check Strapi logs for errors
- Ensure recipient emails don't have typos

### Issue: "ECONNREFUSED" or connection errors
**Solution:**
- Check internet connection
- Verify Gmail SMTP settings are accessible (port 587)
- Check if firewall is blocking outbound connections

## Email Customization

Edit [src/api/project/services/zoho-email.js](../src/api/project/services/zoho-email.js) to customize the email template:

```javascript
const emailBody = `
  <h2>Custom Title</h2>
  <p><strong>Custom Field:</strong> ${project.attributes.fieldName}</p>
`;
```

## Advanced Configuration

### Using Hardcoded Recipients in Code

Edit `config/server.js`:

```javascript
email: {
  gmail: {
    user: env("GMAIL_USER"),
    appPassword: env("GMAIL_APP_PASSWORD"),
  },
  recipientList: [
    { email: 'manager@company.com', name: 'Project Manager' },
    { email: 'team@company.com', name: 'Team Lead' },
  ],
},
```

### Change Cron Schedule

Edit `src/index.js` bootstrap section:

```javascript
options: {
  rule: '0 * * * *', // Change this
  // Cron schedule examples:
  // '0 0 * * *' - Daily at midnight
  // '0 */6 * * *' - Every 6 hours
  // '0 9 * * MON' - Every Monday at 9 AM
  // '*/30 * * * *' - Every 30 minutes
}
```

## FAQ

**Q: Can I use regular Gmail password instead of App Password?**
A: No. Google requires App Password for third-party apps. Regular passwords won't work.

**Q: Is my Gmail password stored securely?**
A: No, it's in `.env` file. Keep `.env` in `.gitignore` and never commit it.

**Q: Can I use corporate Gmail (Google Workspace)?**
A: Yes, the same process applies. Just ensure 2FA is enabled on the account.

**Q: How many emails can I send?**
A: Gmail allows ~500 emails per day for free accounts. Business accounts have higher limits.

**Q: What if SMTP fails temporarily?**
A: The cron job will retry on the next hour. Errors are logged but don't stop project creation.

## Security Best Practices

1. ✅ Never commit `.env` file
2. ✅ Use environment variables for sensitive data
3. ✅ Rotate App Passwords periodically
4. ✅ Use dedicated Gmail account for sending (not personal)
5. ✅ Add `.env` to `.gitignore`

## Related Files

- Service: [src/api/project/services/zoho-email.js](../src/api/project/services/zoho-email.js)
- Config: [config/server.js](../config/server.js)
- Bootstrap: [src/index.js](../src/index.js)
- Quick Start: [QUICK_START.md](./QUICK_START.md)
