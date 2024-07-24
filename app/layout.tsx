import { Toaster } from "@/components/ui/toaster";
import { defaultUrl } from "@/lib/utils";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
});

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "devLinks",
  description: "devLinks",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={instrumentSans.variable}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
