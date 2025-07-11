import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/footer";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { ToastProvider } from "@/components/ui/toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-spacegrotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NestFT.dev - Build Real Experience. Get Hired.",
  description:
    "Collaborate on real projects, get AI-graded, and grow your tech career.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en\" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased flex flex-col min-h-screen">
        <ToastProvider>
          <AuthGuard>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </AuthGuard>
        </ToastProvider>
      </body>
    </html>
  );
}
