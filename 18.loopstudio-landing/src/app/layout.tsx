import type { Metadata } from "next";
import { Alata, Josefin_Sans } from "next/font/google";
import "../../styles/globals.min.css";

const alata = Alata({
  variable: "--font-alata",
  subsets: ["latin"],
  weight: "400",
});

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
  weight: "300",
});

export const metadata: Metadata = {
    title: "18.loopstudio-landing-page | frontend-mentor",
    description: "18th task from frontend-mentor, developed using next.js framework",
    authors: [{name: "Arash Asghari"}],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${alata.variable} ${josefinSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
