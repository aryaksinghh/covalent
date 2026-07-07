import type { Metadata } from "next";
import { Poppins, Source_Code_Pro } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins"
});

const sourcecode = Source_Code_Pro({
  weight: ["200", "300", "400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sourcecode"
});

export const metadata: Metadata = {
  title: "Covalent - AI revision app",
  description: "AI revision app for developers based on feynman learning methods",

  openGraph: {
    title: "Covalent - AI revision app",
    description: "AI revision app for developers based on feynman learning methods",

    images: ["/banner.png"],
  },

  twitter: {
    card: "summary_large_image",
    images: ["/banner.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${sourcecode.variable}`}>
      <body className={" min-h-full flex flex-col"}>
        {children}
      </body>
    </html>
  );
}