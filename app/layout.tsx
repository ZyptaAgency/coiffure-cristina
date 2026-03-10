import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cristina Coiffure — Salon de coiffure à Neuchâtel",
  description:
    "L'art de sublimer votre beauté naturelle. Salon de coiffure à Neuchâtel, Suisse. Coupe, coloration, mèches, brushing et soins.",
  icons: {
    icon: "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#D4C5B2" opacity="0.7"/><circle cx="50" cy="50" r="38" fill="#9DB8A5"/><text x="50" y="58" text-anchor="middle" font-family="serif" font-size="32" font-style="italic" font-weight="300" fill="white">Cd</text></svg>'),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link href="https://fonts.cdnfonts.com/css/ethnocentric" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
