# Clerk Webhook Setup Guide

## Environment Variables

Add these to your `.env` file:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Clerk Webhook
CLERK_WEBHOOK_SECRET=your_webhook_secret
```

## Setting up the Webhook in Clerk Dashboard

1. **Go to Clerk Dashboard**: https://dashboard.clerk.com/
2. **Select your application**
3. **Navigate to Webhooks** in the sidebar
4. **Click "Add Endpoint"**
5. **Configure the webhook**:
   - **Endpoint URL**: `https://your-domain.com/api/webhooks/clerk`
   - **Events to send**: Select these events:
     - `user.created`
     - `user.updated`
     - `user.deleted`
6. **Copy the webhook secret** and add it to your `.env` file as `CLERK_WEBHOOK_SECRET`

## What the Webhook Does

- **User Created**: Automatically creates a new user in your database with 0 credits
- **User Updated**: Updates user information in your database
- **User Deleted**: Removes the user from your database

## Testing the Webhook

1. Start your development server: `npm run dev`
2. Use a tool like ngrok to expose your local server: `ngrok http 3000`
3. Update the webhook URL in Clerk dashboard with the ngrok URL
4. Create a test user in Clerk to trigger the webhook

## Database Schema

The webhook will create users with this structure:

- `userId`: Clerk user ID
- `name`: User's full name
- `email`: User's email address
- `phoneNumber`: User's phone number (optional)
- `tiktokUsername`: TikTok username (optional, can be updated later)
- `credit`: Starting credit balance (default: 0)
- `createdAt`: Timestamp when user was created
- `updatedAt`: Timestamp when user was last updated
