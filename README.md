# ABB KYC Supplier Collaboration

A mobile-first supplier collaboration frontend for ABB KYC workflows, built with React and Vite.

## Features

- Supplier home dashboard
- Order tracking and milestone status
- Proof and document upload flow
- Exception management
- Delay reporting modal
- Notifications and profile management
- Mobile-first layout optimized for phone-browser usage

## Local development

Prerequisites:
- Node.js 20+
- npm

Install dependencies:

```bash
npm install
```

Run the app locally:

```bash
npm run dev -- --host 0.0.0.0
```

Build for production:

```bash
npm run build
```

## Deploy to Vercel

1. Push this repository to GitHub.
2. In Vercel, import the GitHub repository.
3. Select the default Vite settings.
4. Vercel will detect the app and deploy it automatically.

For a production build, Vercel will run:

```bash
npm run build
```

## GitHub setup

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repository-url>
git push -u origin main
```

## Notes

This project is configured as a Vite frontend and does not require an API key for local demo usage.
