# Clone Care Assistant

Clone Care Assistant is a mobile-first React + TypeScript single-page app for deterministic clone watering and dome-care recommendations using editable rule tables.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

This repo includes a `vercel.json` config so Vercel uses the correct Vite build/output settings.

1. Push this repository to GitHub.
2. In Vercel, import the repository.
3. Confirm the project root is the repository root.
4. Deploy.

If you hit a 404 after deploy:
- Verify the deployment completed successfully (not just project creation).
- Confirm branch with these files is deployed.
- Confirm `outputDirectory` is `dist`.
- Redeploy the latest commit from the Vercel dashboard.
