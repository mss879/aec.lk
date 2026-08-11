import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Preloader } from "@/components/layout/preloader";
import { SiteChrome } from "@/components/layout/site-chrome";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Australian Education Centre (AEC)",
  description: "Your Complete Journey to Australian & New Zealand Education. From Visa to Career Success - We're With You Every Step.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteChrome>
            <Preloader />
            <Header />
          </SiteChrome>
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <SiteChrome>
            <Footer />
          </SiteChrome>
        </ThemeProvider>
      </body>
    </html>
  );
}
