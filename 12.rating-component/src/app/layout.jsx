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
          <link rel="icon" type="image/png" href="/images/favicon-32x32.png" />
        </Head>
        <body
          className="flex min-h-screen justify-center items-center"
        >
          <header>
            <h1 className="sr-only hidden">rating app component</h1>
          </header>
          <main className="rounded-2xl bg-gradiant p-7 w-[345px] sm:w-[375px]">
            {children}
          </main>
        </body>
      </html>
    );
}
