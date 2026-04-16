import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

import CartDrawer from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: "Mehfil The Cafe | Where Coffee Meets Conversations",
  description: "Jalgaon's Favorite Hangout Spot. Premium coffee, delicious food, and chill vibes. Visit Mehfil The Cafe today.",
  keywords: ["cafe in Jalgaon", "best coffee Jalgaon", "hangout place Jalgaon", "Mehfil The Cafe", "premium cafe Jalgaon"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-brand-base text-foreground selection:bg-brand-gold/30">
        {children}
        <CartDrawer />
      </body>
    </html>
  );
}
