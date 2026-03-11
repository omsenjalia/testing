import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Globe | Forg",
  description: "A globe of founders and builders shipping in public on Forg.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
