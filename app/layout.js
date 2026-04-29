import './globals.css';

export const metadata = {
  title: 'Analog Angriff — DIY Guitar Pedal Kits India',
  description: 'Premium DIY guitar pedal kits engineered for the Indian musician. Build your sound from the circuit up.',
  keywords: 'guitar pedal kit, DIY pedal India, tube screamer kit, overdrive kit, fuzz kit, analog pedal, PCB kit India',
  openGraph: {
    title: 'Analog Angriff — Build Your Sound From The Circuit Up',
    description: 'Premium DIY guitar pedal kits shipped across India.',
    url: 'https://analogangriff.com',
    siteName: 'Analog Angriff',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
