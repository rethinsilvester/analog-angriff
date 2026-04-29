# Analog Angriff — DIY Guitar Pedal Kits

A minimal Next.js storefront for selling guitar pedal kits in India, with UPI QR checkout.

## Deploy to Vercel

1. Push this folder to a new GitHub repo
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repo → Vercel auto-detects Next.js → Click **Deploy**
4. Add your custom domain `analogangriff.com` in Project Settings → Domains

## Customize

- **UPI QR**: Replace the placeholder in the checkout section of `app/page.js` with your actual QR image (place it in `/public/upi-qr.png`)
- **WhatsApp number**: Search for `91XXXXXXXXXX` in `app/page.js` and replace with your number
- **Products**: Edit the `PRODUCTS` array at the top of `app/page.js`
- **Product images**: Replace emoji placeholders with real images in `/public/`

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)
