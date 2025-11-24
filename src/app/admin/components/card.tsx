// src/app/admin/components/card.tsx
"use client";

interface CardProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export function Card({ title, description, children, className }: CardProps) {
  return (
    <section
      className={
        "group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-xl px-4 py-4 md:px-5 md:py-5 shadow-[0_18px_40px_rgba(15,23,42,0.85)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(16,185,129,0.25)] hover:border-emerald-500/60 " +
        (className ?? "")
      }
    >
      {/* glow discreto atrás */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute -top-20 -right-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-16 -left-8 h-32 w-32 rounded-full bg-sky-500/5 blur-3xl" />
      </div>

      {(title || description) && (
        <header className="mb-3 relative z-[1]">
          {title && (
            <h2 className="text-sm font-semibold text-slate-50">{title}</h2>
          )}
          {description && (
            <p className="text-xs text-slate-400 mt-1">{description}</p>
          )}
        </header>
      )}

      <div className="relative z-[1] text-slate-50 text-sm">{children}</div>
    </section>
  );
}
