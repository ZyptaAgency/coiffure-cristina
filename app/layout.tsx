import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Christina Coiffure — Salon de coiffure à Neuchâtel",
  description:
    "L'art de sublimer votre beauté naturelle. Salon de coiffure à Neuchâtel, Suisse. Coupe, coloration, mèches, brushing et soins.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
