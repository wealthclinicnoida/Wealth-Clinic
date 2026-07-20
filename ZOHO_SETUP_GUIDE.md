# Zoho Configuration Guide

## Environment Variables

Add the following environment variables to your `.env` file:

```
# Zoho OAuth Configuration
ZOHO_CLIENT_ID=your_client_id_here
ZOHO_CLIENT_SECRET=your_client_secret_here
ZOHO_REFRESH_TOKEN=your_refresh_token_here
ZOHO_ACCOUNT_ID=your_account_id_here
```

## How to Get Zoho Credentials

### 1. Register OAuth App in Zoho
- Go to https://accounts.zoho.com/developerconsole
- Create a new Self Client or Server-based Application
- Get your `Client ID` and `Client Secret`

### 2. Get Refresh Token
- Use the OAuth flow to get authorization code
- Exchange the authorization code for a refresh token

Example:
```bash
curl -X POST "https://accounts.zoho.com/oauth/v2/token" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET" \
  -d "code=YOUR_AUTH_CODE" \
  -d "grant_type=authorization_code"
```

### 3. Get Account ID
- Log in to Zoho Mail
- Account ID can be found in API documentation or account settings

## Configuration

Update your `config/server.js` to include Zoho configuration:

```javascript
module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS"),
  },
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
  zoho: {
    clientId: env("ZOHO_CLIENT_ID"),
    clientSecret: env("ZOHO_CLIENT_SECRET"),
    refreshToken: env("ZOHO_REFRESH_TOKEN"),
    accountId: env("ZOHO_ACCOUNT_ID"),
  },
});
```

## How It Works

1. **On Project Creation**: When a new project is created via API, the system automatically:
   - Fetches all email addresses from Zoho CRM Contacts
   - Sends a formatted email notification to each recipient

2. **Cron Job**: Every hour, the system:
   - Checks for recently created projects
   - Sends notifications for any new projects
   - Logs all activities

## Email Template

The notification email includes:
- Project Name
- Registration Number
- Price Range (Min/Max)
- Address
- Total Floors
- Possession Date
- Project Description

## Testing

To test the implementation:

1. Create a new project via Strapi Admin Panel
2. Check Zoho Mail for the notification email
3. Check Strapi logs for execution details: `strapi log`

## Troubleshooting

- **No emails sent**: Check if Zoho credentials are correct
- **OAuth errors**: Verify refresh token is still valid
- **Cron not running**: Check if Strapi is running in production mode
- **Missing fields**: Ensure Zoho CRM has Email field populated for contacts

## API Endpoints Used

- Zoho OAuth: `https://accounts.zoho.com/oauth/v2/token`
- Zoho CRM: `https://www.zohoapis.com/crm/v2/Contacts`
- Zoho Mail: `https://mail.zoho.com/api/accounts/{account_id}/messages`
