import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ConfOps25 - Certificate Generator",
  description:
    "Generate and send PDF certificates for ConfOps LATAM 2025 and Workshop participants",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
