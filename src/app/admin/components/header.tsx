// src/app/admin/components/header.tsx
"use client";

import { Bell, User } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header
      className="
        sticky top-0 z-10 
        border-b 
        bg-[#444]/90 text-black
        dark:bg-[#222]/90 dark:text-white
        border-[#666] dark:border-[#333]
        backdrop-blur
      "
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">{title}</h1>
          {subtitle && (
            <p className="text-xs opacity-70 mt-1">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Botão de notificações */}
          <button
            className="
              relative p-2 rounded-full 
              border border-[#666] dark:border-[#333]
              hover:border-emerald-500/60 
              hover:bg-black/10 dark:hover:bg-white/10
              transition-all
            "
          >
            <Bell className="w-4 h-4 text-black dark:text-slate-300" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </button>

          {/* Avatar / info da usuária */}
          <div className="flex items-center gap-2">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-medium">Admin Emagrify</p>
              <p className="text-[11px] opacity-70">Esposa do Klaytison 💍</p>
            </div>

            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-400 flex items-center justify-center shadow-md shadow-emerald-500/40">
              <User className="w-4 h-4 text-black dark:text-slate-950" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
