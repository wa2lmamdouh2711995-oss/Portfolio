import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MouseGlow from "@/components/MouseGlow";
// We'll use a standard system font stack instead of next/font to bypass environment installation issues
const fontVariable = "--font-inter";



export const metadata: Metadata = {
  title: "Wael Mamdouh — Portfolio",

  icons: {
    icon: "/icon.png",
  },

  description:
    "Portfolio of Wael Mamdouh, a creative graphic designer.",

  keywords: [
    "graphic designer",
    "portfolio",
    "branding",
    "design",
    "Wael Mamdouh",
  ],

  openGraph: {
    title: "Wael Mamdouh — Graphic Designer",
    description:
      "Portfolio of Wael Mamdouh, a creative graphic designer.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontVariable} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <MouseGlow />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
