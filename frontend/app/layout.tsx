import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { PetProvider } from "@/lib/pet-context";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { CartDrawer } from "@/components/layout/CartDrawer";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });

export const metadata: Metadata = {
  title: "Lucky Paul — экосистема для питомцев",
  description: "Маркетплейс, профиль питомца, услуги и сообщество — всё в одном приложении.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} ${fraunces.variable} bg-orange-50 font-sans text-ink antialiased`}>
        <CartProvider>
          <PetProvider>
            <TopBar />
            <main className="mx-auto max-w-6xl px-4 pb-24 pt-6 sm:px-7 sm:pb-16 sm:pt-8">{children}</main>
            <BottomNav />
            <CartDrawer />
          </PetProvider>
        </CartProvider>
      </body>
    </html>
  );
}
