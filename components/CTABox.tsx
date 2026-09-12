import Link from "next/link";

type Props = {
  title: string;
  description: string;
  buttonText: string;
  href: string;
  variant?: "primary" | "soft";
};

export default function CTABox({ title, description, buttonText, href, variant = "primary" }: Props) {
  const bg = variant === "primary"
    ? "bg-gradient-to-br from-brand to-brand-dark text-white"
    : "bg-emerald-50 border border-emerald-200 text-emerald-950";
  const btn = variant === "primary"
    ? "bg-white text-brand hover:bg-slate-100"
    : "bg-emerald-600 text-white hover:bg-emerald-700";
  return (
    <div className={`not-prose my-8 rounded-xl p-6 md:p-7 ${bg}`}>
      <h3 className="text-xl md:text-2xl font-bold mb-2">{title}</h3>
      <p className={`mb-4 ${variant === "primary" ? "opacity-90" : "text-emerald-800"}`}>{description}</p>
      <Link href={href} className={`inline-block font-semibold px-5 py-3 rounded-lg ${btn}`}>
        {buttonText} →
      </Link>
    </div>
  );
}
