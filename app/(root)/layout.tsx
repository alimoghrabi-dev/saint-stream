import Footer from "@/components/shared/Footer";
import "../globals.css";
import Navbar from "@/components/shared/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="bg-black bg-opacity-[0.95]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
