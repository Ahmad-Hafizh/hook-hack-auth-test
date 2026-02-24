# Password Protection for Landing Pages

The `/lp` and `/lpcopy` routes are now password protected.

## Setup

Add the following environment variables to your `.env.local` file (or Vercel environment variables):

```env
LP_PASSWORD=your-password-for-lp-route
LPCOPY_PASSWORD=your-password-for-lpcopy-route
```

## How it works

1. When a user visits `/lp` or `/lpcopy`, they'll see a password prompt
2. After entering the correct password, a cookie is set (valid for 1 hour)
3. The user can access the page without re-entering the password for 1 hour
4. Each route has its own separate password

## Default Passwords

If environment variables are not set, default passwords are used:

- `/lp`: `default-password-123`
- `/lpcopy`: `default-password-456`

**⚠️ Important:** Change these defaults in production by setting the environment variables!

## Security Notes

- Passwords are stored in environment variables (server-side only)
- Cookies are httpOnly and secure in production
- Cookies expire after 1 hour
- Each route has independent password protection
