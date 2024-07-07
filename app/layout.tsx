import "./globals.css";
import Menu from "@/components/ux/menu";
import { cn } from "@/lib/utils";
import { Cairo as FontDisplay } from "next/font/google";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const fontDisplay = FontDisplay({
  weight:["400"],
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "00",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          fontDisplay.className,
          "bg-stone-950 *:text-white flex justify-center w-full"
        )}
      >
        <main className="flex justify-center p-3 max-w-5xl max-lg:block w-full">
          <section
            className={`basis-1/7 max-lg:fixed max-lg:bottom-0 z-50 max-lg:w-full max-lg:justify-center max-lg:flex max-lg:items-center`}
          >
            <Menu />
          </section>
          <section className={`w-2/3 pl-1 flex justify-center max-lg:w-full`}>
            <div className={`max-lg:w-3/4 w-full`}>{children}</div>
          </section>
        </main>
      </body>
    </html>
  );
}
