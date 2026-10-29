import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { AuthProvider } from "@/components/providers/AuthProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: {
    default: "AD&İS AI",
    template: "%s · AD&İS AI",
  },
  description:
    "Yapay zeka destekli otomatik ders intibakı ve transkript analizi. Yatay geçiş, dikey geçiş ve çift anadal başvuruları için ön değerlendirme.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-slate-50 font-sans text-slate-900">
        <AuthProvider>
          <Header />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
