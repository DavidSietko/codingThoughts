# codingThoughts

A website for saving and organizing your LeetCode-style solutions — write-ups, code, and notes, all in one place instead of scattered across local files.

**Live site:** [codingthoughts.net](https://codingthoughts.net)

## Features

- **Save and organize solutions** — name, number, and describe each problem however you like
- **Dashboard** to browse and edit all your saved answers in one place
- **Account management** — update your email, username, or password at any time
- **Password reset via email** — never get locked out of your account
- **In-browser code editor** (Monaco) for writing and reviewing solutions

## Tech Stack

Next.js, TypeScript, Prisma, PostgreSQL, JWT auth (`jose`), bcrypt, Resend (email), Chart.js, Monaco Editor

## Getting Started

```bash
cd codingthoughts
npm install
npm run dev
```

You'll need a PostgreSQL database URL and Resend API key set as environment variables (see `prisma/schema.prisma` for the expected database config).

## Screenshots

**Dashboard**

![Dashboard](https://github.com/user-attachments/assets/f12b33b6-1d2d-429a-a8fd-693ebeac89f1)

**Home page**

![Home page](https://github.com/user-attachments/assets/2f0aee9a-dbe2-4081-aebc-1fb512c63a0f)

## Usage

1. Create an account and log in.
2. Start saving your LeetCode-style answers — name, number, and describe each one however you like.
3. Forgot your password? Request a reset link via email right from the login page.
