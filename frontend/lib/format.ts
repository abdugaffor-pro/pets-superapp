export function formatAed(n: number): string {
  return `${Math.round(n).toLocaleString("ru-RU")} AED`;
}

function parseRuDate(str: string): Date {
  const [d, m, y] = str.split(".").map(Number);
  return new Date(y, m - 1, d);
}

export function daysUntil(dateStr: string): number {
  const target = parseRuDate(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export interface CountdownBadge {
  cls: "ok" | "warn" | "danger";
  label: string;
}

export function countdownBadge(dateStr: string): CountdownBadge {
  const diff = daysUntil(dateStr);
  if (diff < 0) return { cls: "danger", label: `Просрочена на ${Math.abs(diff)} дн.` };
  if (diff === 0) return { cls: "warn", label: "Сегодня" };
  if (diff <= 21) return { cls: "warn", label: `Через ${diff} дн.` };
  return { cls: "ok", label: `Через ${diff} дн.` };
}
