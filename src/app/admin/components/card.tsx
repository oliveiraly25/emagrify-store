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
        `
        group relative overflow-hidden rounded-2xl
        border border-[#555] dark:border-[#333]
        bg-[#555] dark:bg-[#1b1b1b]
        backdrop-blur
        px-4 py-4 md:px-5 md:py-5
        shadow-[0_18px_40px_rgba(0,0,0,0.6)]
        transition-all duration-200
        hover:-translate-y-0.5
        hover:shadow-[0_24px_60px_rgba(16,185,129,0.25)]
        hover:border-emerald-500/70
        ` + (className ?? "")
      }
    >
      {/* glow discreto atrás */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute -top-20 -right-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-16 -left-8 h-32 w-32 rounded-full bg-emerald-400/5 blur-3xl" />
      </div>

      {(title || description) && (
        <header className="mb-3 relative z-[1]">
          {title && (
            <h2 className="text-sm font-semibold text-black dark:text-white">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-xs text-black/70 dark:text-slate-400 mt-1">
              {description}
            </p>
          )}
        </header>
      )}

      <div className="relative z-[1] text-sm text-black dark:text-slate-50">
        {children}
      </div>
    </section>
  );
}
