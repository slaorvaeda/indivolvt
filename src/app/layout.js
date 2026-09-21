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

export const metadata = {
  title: "Indivolt Appliances | Official Store for Zigma Home Appliances",
  description: "Welcome to Indivolt Appliances, the official home of Zigma premium silent BLDC fans, smart water heaters, room heaters, irons, kettles, and kitchen solutions.",
  metadataBase: new URL("https://indivoltappliances.com"),
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
