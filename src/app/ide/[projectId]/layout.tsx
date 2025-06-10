import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "../../globals.css";
import { Navbar } from "@/components/Navbar";
// import { Footer } from "@/components/footer";
import { AuthGuard } from "@/components/auth/AuthGuard";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
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
        <AuthGuard>
          <Navbar />
          <main>{children}</main>
          {/* <Footer /> */}
        </AuthGuard>
      </body>
    </html>
  );
}