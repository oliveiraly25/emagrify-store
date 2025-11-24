// src/app/admin/components/button.tsx
"use client";

interface DeluxeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export function DeluxeButton({ children, className, ...props }: DeluxeButtonProps) {
  return (
    <button
      {...props}
      className={`
        inline-flex items-center justify-center
        px-4 py-2 rounded-xl font-medium text-sm

        /* Cores do botão (verde padrão) */
        bg-gradient-to-r from-emerald-600 to-emerald-400
        text-slate-950

        /* Efeitos */
        shadow-[0_0_20px_rgba(16,185,129,0.35)]
        hover:shadow-[0_0_30px_rgba(16,185,129,0.55)]
        hover:brightness-110

        /* Estado desabilitado */
        disabled:opacity-50 disabled:cursor-not-allowed

        /* Animação */
        transition-all duration-200

        ${className ?? ""}
      `}
    >
      {children}
    </button>
  );
}
