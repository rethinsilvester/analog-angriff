import './globals.css';

export const metadata = {
  title: 'Analog Angriff — DIY Guitar Pedal Kits India',
  description: 'Premium DIY guitar pedal kits shipped across India. Every component, every resistor, clear build docs. Just add solder.',
  keywords: 'guitar pedal kit, DIY pedal India, tube screamer kit, overdrive kit, fuzz kit, analog pedal',
  openGraph: {
    title: 'Analog Angriff — Build Your Own Tone',
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
