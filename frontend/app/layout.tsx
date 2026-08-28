import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { PetProvider } from "@/lib/pet-context";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { CartDrawer } from "@/components/layout/CartDrawer";

export const metadata: Metadata = {
  title: "Lucky Paul — экосистема для питомцев",
  description: "Маркетплейс, профиль питомца, услуги и сообщество — всё в одном приложении.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        {/*
          Шрифты подключены обычным <link>, а не next/font/google, чтобы сборка
          (`next build`) не требовала сетевого доступа к fonts.googleapis.com —
          шрифт грузится в браузере пользователя, как и в prototype/lucky-paul.html.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Fraunces:opsz,wght@9..144,500;9..144,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-orange-50 font-sans text-ink antialiased">
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
