# MongoDB Connection String Builder

## Your Base Connection String (from Atlas):
```
mongodb+srv://<db_username>:<db_password>@cluster0.god3gyl.mongodb.net/?appName=Cluster0
```

## Replace the Following:

1. `<db_username>` → Your username (e.g., `admin`)
2. `<db_password>` → Your actual password
3. Add `/mern_coding_challenge` before the `?`
4. Add `retryWrites=true&w=majority&` after the `?`

## Example (DON'T USE THIS - CREATE YOUR OWN):

**If your username is `admin` and password is `mySecret123`:**

```
mongodb+srv://admin:mySecret123@cluster0.god3gyl.mongodb.net/mern_coding_challenge?retryWrites=true&w=majority&appName=Cluster0
```

## Your Actual Connection String Template:

Fill in YOUR values:

```
mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.god3gyl.mongodb.net/mern_coding_challenge?retryWrites=true&w=majority&appName=Cluster0
```

Replace:
- `YOUR_USERNAME` with your database username
- `YOUR_PASSWORD` with your database password

## Special Characters in Password?

If your password contains special characters, encode them:
- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- `%` → `%25`
- `^` → `%5E`
- `&` → `%26`
- `*` → `%2A`

Example: Password `Pass@123#` becomes `Pass%40123%23`

---

## Next Steps:

1. Get your username and password from Database Access
2. Build your connection string using the template above
3. Save it somewhere secure
4. Test it locally (I'll help you)
5. Use it in Render deployment

**Write down or copy your final connection string and let me know when you're ready to test it!**
