import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CredVault | Secure Academic & Degree Certificate Verification System",
  description: "CredVault offers a smart, secure, and scalable platform for instant verification of academic degrees and certificates. Using AI, OCR, and blockchain technology, we combat fraud, preserve academic integrity, and build trust for institutions and employers.",
  keywords: [
    "CredVault",
    "fake degree detection",
    "certificate verification",
    "academic credential authentication",
    "digital certificates",
    "OCR verification",
    "blockchain for education",
    "fake certificate recognition",
    "document verification",
    "academic integrity",
    "higher education security",
    "Jharkhand education",
  ],
  authors: [{ name: "CredVault" }],
  metadataBase: new URL("https://www.credvault.com"), // IMPORTANT: Replace with your actual domain

  // ============== Open Graph / Facebook Meta Tags ==============
  openGraph: {
    type: "website",
    url: "/",
    title: "CredVault | Secure Academic & Degree Certificate Verification System",
    description: "A smart, scalable platform using AI and blockchain to detect fake degrees and authenticate academic credentials, ensuring trust and integrity for institutions and employers.",
    images: [
      {
        url: "/og-image.png", // Place this image in your `public` folder
        width: 1200,
        height: 630,
        alt: "CredVault Logo and Promotional Banner",
      },
    ],
    siteName: "CredVault",
  },

  // ============== Twitter Card Meta Tags ==============
  twitter: {
    card: "summary_large_image",
    title: "CredVault | Secure Academic & Degree Certificate Verification System",
    description: "A smart, scalable platform using AI and blockchain to detect fake degrees and authenticate academic credentials, ensuring trust and integrity.",
    images: ["/twitter-image.png"], // Place this image in your `public` folder
  },
  
  // ============== Favicon and Theme ==============
  icons: {
    icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: '/apple-touch-icon.png', // 180x180 png in `public` folder
  },
  themeColor: '#FFFFFF', // Light theme color for browser UI
  other: {
    'msapplication-TileColor': '#0A74DA', // Color for Windows tiles
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
