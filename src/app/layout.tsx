import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const serifFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});
const sansFont = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HCS | Interactive",
  description: "HCS Simulation | HCS Interactive | HCS Custom",
  robots: "noindex,nofollow",
};
export const viewport: Viewport = {
  width: 1280,
  initialScale: 1,
  userScalable: false,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${serifFont.variable} ${sansFont.variable}`}>
      <body className="bg-ink font-sans text-black overflow-hidden select-none antialiased">
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#1A2620",
              border: "1px solid rgba(76,175,120,.3)",
              color: "#F4FAF6",
            },
          }}
        />
      </body>
    </html>
  );
}
