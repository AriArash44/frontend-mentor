import type { AppProps } from 'next/app';
import { Outfit } from 'next/font/google';
import '../styles/globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-outfit',
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${outfit.variable} antialiased`}>
      <Component {...pageProps} />
    </div>
  );
}
