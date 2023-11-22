import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark, neobrutalism } from "@clerk/themes";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SaintStream",
  description: "SaintStream is a movie streaming platform.",
  icons: {
    icon: "/icons/Logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        //@ts-ignore
        baseTheme: [dark],
        variables: { colorPrimary: "#085f08" },
      }}>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
