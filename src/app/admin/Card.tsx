// src/app/admin/components/Card.tsx
"use client";

interface CardProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export function Card({ title, description, children }: CardProps) {
  return (
    <section className="bg-slate-900/70 border border-slate-800/80 rounded-2xl px-4 py-4 md:px-5 md:py-5 shadow-[0_18px_40px_rgba(15,23,42,0.85)]">
      {(title || description) && (
        <header className="mb-3">
          {title && (
            <h2 className="text-sm font-semibold text-slate-50">{title}</h2>
          )}
          {description && (
            <p className="text-xs text-slate-400 mt-1">{description}</p>
          )}
        </header>
      )}
      <div>{children}</div>
    </section>
  );
}
