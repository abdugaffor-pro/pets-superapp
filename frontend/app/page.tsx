"use client";

import Link from "next/link";
import { Store, Stethoscope, Scissors, Dumbbell, Home as HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useActivePet } from "@/lib/pet-context";
import { countdownBadge, daysUntil } from "@/lib/format";

const QUICK_ITEMS = [
  { label: "Товары", href: "/marketplace", icon: Store },
  { label: "Ветеринария", href: "/services?cat=vet", icon: Stethoscope },
  { label: "Груминг", href: "/services?cat=groom", icon: Scissors },
  { label: "Тренировки", href: "/services?cat=train", icon: Dumbbell },
  { label: "Передержка", href: "/services?cat=board", icon: HomeIcon },
];

export default function HomePage() {
  const { activePet } = useActivePet();
  const nearestVaccine = [...activePet.vaccines].sort((a, b) => daysUntil(a.next) - daysUntil(b.next))[0];
  const badge = countdownBadge(nearestVaccine.next);

  return (
    <div>
      <section className="grid grid-cols-1 items-center gap-6 py-6 sm:py-11 lg:grid-cols-[1.15fr_1fr] lg:gap-11">
        <div>
          <span className="mb-3.5 inline-flex items-center rounded-full bg-orange-100 px-3.5 py-1.5 text-[11.5px] font-bold uppercase tracking-wide text-orange-600">
            One app. Their whole world.
          </span>
          <h1 className="mb-4 text-[28px] font-bold leading-tight tracking-tight sm:text-[46px]">
            Всё для вашего питомца — <span className="font-serif italic font-medium text-orange-600">в одном месте</span>
          </h1>
          <p className="mb-6 max-w-[480px] text-[13.5px] leading-relaxed text-ink-soft sm:text-[15px]">
            Товары, ветеринары, груминг, тренировки и сообщество владельцев — экосистема Lucky Paul объединяет всё
            вокруг профиля вашего питомца.
          </p>
          <div className="mb-5 flex flex-wrap gap-2.5">
            <Link href="/marketplace">
              <Button>Перейти в маркетплейс →</Button>
            </Link>
            <Link href="/services">
              <Button variant="outline">Записаться на услугу</Button>
            </Link>
          </div>
          <div className="text-xs font-semibold text-ink-faint">4.9 ★ рейтинг сообщества · Курируется в ОАЭ</div>
        </div>

        <Link
          href="/pet"
          className="relative block overflow-hidden rounded-[28px] border border-line bg-panel shadow-lg2"
        >
          <span
            className={`absolute right-4 top-4 z-10 rounded-full px-2.5 py-1 text-[10.5px] font-extrabold ${
              badge.cls === "ok" ? "bg-success-bg text-success" : badge.cls === "warn" ? "bg-warn-bg text-warn" : "bg-danger-bg text-danger"
            }`}
          >
            💉 {badge.label}
          </span>
          <div className="flex h-[170px] items-center justify-center bg-gradient-to-br from-orange-100 to-orange-50 text-6xl sm:h-[230px] sm:text-[100px]">
            {activePet.avatar}
          </div>
          <div className="p-5 sm:p-6">
            <div className="mb-1.5 text-[10.5px] font-extrabold uppercase tracking-wide text-ink-faint">
              Ваш питомец
            </div>
            <div className="mb-1 flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold sm:text-[23px]">{activePet.name}</h3>
              <span className="rounded-full bg-orange-100 px-3.5 py-1.5 text-xs font-bold text-orange-700">
                Смотреть профиль
              </span>
            </div>
            <div className="mb-4 text-[12.5px] italic text-ink-soft">
              {activePet.breed} · {activePet.age}
            </div>
            <div className="flex justify-between border-t border-line pt-4">
              <Stat value={activePet.ordersTotal} label="заказов" />
              <Stat value={activePet.bookings.length} label="предстоящих" />
              <Stat value={`${activePet.healthPct}%`} label="здоров" />
            </div>
          </div>
        </Link>
      </section>

      <section className="mb-10 flex flex-wrap items-center gap-3.5 rounded-[22px] bg-ink px-4 py-4 sm:gap-6 sm:px-6">
        <span className="font-serif text-sm text-white sm:text-base">Что нужно вашему питомцу сегодня?</span>
        <div className="flex flex-1 flex-wrap gap-2">
          {QUICK_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 py-2 pl-2 pr-3.5 text-[12px] font-semibold text-white transition-colors hover:border-orange-500 hover:bg-orange-500"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                  <Icon size={13} />
                </span>
                {item.label}
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-1 text-lg font-bold sm:text-xl">Как устроена платформа</h2>
        <p className="mb-6 max-w-2xl text-[13px] leading-relaxed text-ink-soft">
          Marketplace (товары), Services (специалисты) и Community (общение) — три контура вокруг единого профиля
          питомца со здоровьем, документами и историей.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <InfoCard title="Marketplace" text="Свой бренд Lucky Paul + партнёрские бренды: ошейники, поводки, GPS, корм." />
          <InfoCard title="Services" text="Ветеринария, груминг, тренировки, передержка, выгул — с рейтингом и записью в клик." dark />
          <InfoCard title="Community" text="Лента постов владельцев питомцев с тегами и комментариями." />
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="text-center">
      <b className="block font-serif text-[17px] font-bold sm:text-[19px]">{value}</b>
      <span className="text-[10.5px] font-semibold text-ink-faint">{label}</span>
    </div>
  );
}

function InfoCard({ title, text, dark }: { title: string; text: string; dark?: boolean }) {
  return (
    <div
      className={`rounded-lg2 p-5 shadow-sm2 ${
        dark ? "bg-ink text-white" : "border border-line bg-panel"
      }`}
    >
      <h4 className={`mb-1.5 font-serif text-[15px] font-bold ${dark ? "text-white" : ""}`}>{title}</h4>
      <p className={`text-[12.5px] leading-relaxed ${dark ? "text-white/75" : "text-ink-soft"}`}>{text}</p>
    </div>
  );
}
