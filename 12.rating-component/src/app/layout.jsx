import "../styles/globals.css";
import Head from "next/head";
import { globalMetadata } from "../utils/metadata";

export const metadata = globalMetadata;

export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <Head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="icon" type="image/svg+xml" href="/images/favicon-32x32.png" />
        </Head>
        <body
          className="flex min-h-screen justify-center items-center"
        >
          {children}
        </body>
      </html>
    );
}
