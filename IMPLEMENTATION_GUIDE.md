# Implementation Steps for Project Email Notifications

## Files Created/Modified

### 1. **Created: `src/api/project/services/zoho-email.js`**
   - Service to handle Zoho API integration
   - Methods:
     - `getZohoAccessToken()` - Gets OAuth token from Zoho
     - `getEmailListFromZoho()` - Fetches contacts/emails from Zoho CRM
     - `sendProjectNotificationEmail()` - Sends formatted email to recipients
     - `onProjectCreated()` - Main method called when project is created

### 2. **Updated: `src/api/project/services/project.js`**
   - Added lifecycle hook to `create()` method
   - Automatically triggers email when new project is created
   - Error handling to prevent email failures from blocking project creation

### 3. **Updated: `src/index.js`**
   - Added bootstrap cron job setup
   - Runs every hour to check for recently created projects
   - Sends notifications for any new unpublished projects
   - Provides error logging

### 4. **Updated: `config/server.js`**
   - Added Zoho configuration section
   - References environment variables

## Setup Instructions

### Step 1: Add Environment Variables
Add to your `.env` file:

```
ZOHO_CLIENT_ID=your_zoho_client_id
ZOHO_CLIENT_SECRET=your_zoho_client_secret
ZOHO_REFRESH_TOKEN=your_refresh_token
ZOHO_ACCOUNT_ID=your_account_id
```

### Step 2: Update Zoho CRM
Ensure your Zoho CRM has:
- Email field populated for contacts
- Contacts created with valid email addresses

### Step 3: Restart Strapi
```bash
npm run develop
# or
npm start
```

### Step 4: Test
1. Create a new project in Strapi admin panel
2. The email should be sent automatically
3. Check Strapi logs for confirmation

## How It Works

### Scenario 1: Immediate Notification
When you create a project via API or Admin:
1. Project is created in database
2. `project.js` service's `create()` method triggers
3. `zoho-email` service is called
4. Email list fetched from Zoho CRM
5. Formatted email sent to all contacts

### Scenario 2: Hourly Cron Check
Every hour:
1. Bootstrap cron job runs
2. Fetches recently created projects
3. Sends notifications for each project
4. This acts as a backup notification system

## Customization

### Change Cron Schedule
Edit `src/index.js` and modify the rule:

```javascript
options: {
  rule: '0 * * * *', // Every hour
  // Examples:
  // '0 0 * * *' - Daily at midnight
  // '0 */6 * * *' - Every 6 hours
  // '0 9 * * MON' - Every Monday at 9 AM
}
```

### Customize Email Template
Edit `src/api/project/services/zoho-email.js`, method `sendProjectNotificationEmail()`:

```javascript
const emailBody = `
  // Modify HTML here
  <p>${project.attributes.customField}</p>
`;
```

### Add Custom Filters
In `src/index.js`, cron task, modify the find query:

```javascript
const projects = await strapi.service('api::project.project').find({
  filters: {
    publishedAt: { $null: false },
    // Add more filters:
    // Project_Name: { $contains: 'keyword' },
    // Min_Price: { $gte: 1000000 },
  },
  sort: 'createdAt:desc',
  limit: 10,
});
```

## Troubleshooting

### Issue: "Failed to get Zoho access token"
- ✅ Verify ZOHO_CLIENT_ID and ZOHO_CLIENT_SECRET are correct
- ✅ Check if ZOHO_REFRESH_TOKEN is still valid
- ✅ Regenerate refresh token if expired

### Issue: No emails being sent
- ✅ Check if Zoho CRM has contacts with Email field
- ✅ Verify Zoho Mail is enabled in your account
- ✅ Check Strapi logs for specific error messages

### Issue: Cron not running
- ✅ Ensure Strapi is running in production or dev mode
- ✅ Check `NODE_ENV` is not 'test'
- ✅ Verify Strapi logs show cron registration

### Issue: Project creation is slow
- ✅ Email sending shouldn't block creation (try/catch in place)
- ✅ Check Zoho API response times
- ✅ Consider moving to async job queue for large recipient lists

## Optional: Advanced Setup

### Use Job Queue for Better Performance
If you have many recipients, consider using a job queue:

```bash
npm install bull redis
```

Then modify `zoho-email.js` to queue jobs instead of sending immediately.

### Add Email Templates
Create a separate template file:

```javascript
// src/api/project/services/email-templates.js
module.exports = {
  projectNotification: (project) => ({
    subject: `New Project: ${project.attributes.Project_Name}`,
    html: `...HTML template...`,
  }),
};
```

### Add Database Logging
Track sent emails by creating an "EmailLog" collection type and logging each send attempt.

## Monitoring

### View Logs
```bash
# In Strapi admin or terminal
npm run develop
# Logs will show:
# "Running project notification cron job..."
# "Project notification email sent to X recipients"
```

### Check Email Delivery
- Go to Zoho Mail sent folder
- Verify recipients received emails
- Check Strapi admin for project creation timestamp

## Security Notes

- Never commit `.env` file with real credentials
- Rotate Zoho refresh token periodically
- Use environment-specific credentials
- Consider encrypting sensitive data in database

## Support

For issues:
1. Check Strapi logs: `npm run develop`
2. Verify Zoho API status: https://status.zoho.com
3. Test Zoho credentials manually
4. Review Zoho API documentation: https://www.zoho.com/developer/api/
