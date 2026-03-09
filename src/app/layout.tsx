import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Builder Globe | BuildInProcess",
  description: "A globe of builders building in process",
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
