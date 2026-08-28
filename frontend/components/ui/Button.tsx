import { ButtonHTMLAttributes } from "react";

type Variant = "dark" | "outline";

export function Button({
  variant = "dark",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  const base =
    "rounded-full px-6 py-3.5 text-[13.5px] font-bold transition-colors";
  const styles: Record<Variant, string> = {
    dark: "bg-ink text-white hover:bg-orange-600",
    outline: "border-[1.5px] border-line-strong bg-white text-ink hover:border-orange-500 hover:text-orange-600",
  };
  return <button className={`${base} ${styles[variant]} ${className}`} {...props} />;
}
