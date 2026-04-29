# Analog Angriff v2 — DIY Guitar Pedal Kits

Dark navy industrial design matching the 10Web aesthetic. Zero monthly cost.

## Quick Deploy to Vercel

1. Create a new repo at github.com/new → name it `analog-angriff`
2. Push this code:
   ```bash
   git init && git add . && git commit -m "v2 launch"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/analog-angriff.git
   git push -u origin main
   ```
3. Go to vercel.com/new → Import the repo → Deploy
4. Add domain: Project Settings → Domains → `analogangriff.com`

## Customize

- **UPI QR**: Replace placeholder in checkout with your QR image (put in `/public/upi-qr.png`)
- **WhatsApp**: Search `91XXXXXXXXXX` → replace with your number
- **Products**: Edit `PRODUCTS` array in `app/page.js`
- **Product images**: Replace `PedalGraphic` components with `<img>` tags pointing to `/public/` images

## Local Dev

```bash
npm install
npm run dev
```

Open http://localhost:3000
