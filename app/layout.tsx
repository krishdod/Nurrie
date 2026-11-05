import type { Metadata } from "next";
import { PRODUCT } from "@/lib/product";
import { SITE_ORIGIN } from "@/lib/site";
import "./globals.css";
import "./immersive.css";
import "./campaign.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: "NURRIE — The colour-changing foundation stick",
  description:
    "Starts white. Becomes you. Meet the NURRIE colour-changing foundation stick with a built-in brush, in pearl ivory and rose gold. Join the launch list.",
  openGraph: {
    title: "NURRIE — The colour-changing foundation stick",
    description:
      "White foundation that adapts to your skin tone as you blend. Be here for the first chapter.",
    type: "website",
    images: [
      {
        url: PRODUCT.social,
        width: 1536,
        height: 1024,
        alt: "NURRIE white colour-changing foundation and built-in brush in ivory and rose gold",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/gambarino.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
