import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";

const manrope = Manrope({
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Car Rental Service",
  description:
    "Reliable car rental service. Choose from a wide range of cars for daily use, trips, or business needs.",
  keywords: [
    "car rental",
    "rent a car",
    "vehicle rental",
    "auto rental",
    "car hire",
  ],

  openGraph: {
    title: "Car Rental Service",
    description:
      "Rent a car easily and quickly. Comfortable vehicles for any occasion.",
    url: "", // TODO: add site URL later
    siteName: "Car Rental",
    type: "website",
    images: [
      {
        url: "", // TODO: add OG image later
        width: 1200,
        height: 630,
        alt: "Car rental service preview",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${inter.variable}`}>
        <TanStackProvider>
          <Header />
          {children}
        </TanStackProvider>
      </body>
    </html>
  );
}
