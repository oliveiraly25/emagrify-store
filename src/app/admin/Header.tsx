// src/app/admin/components/Header.tsx
"use client";

import { Bell, User } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-800/70 bg-slate-950/85 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-50">{title}</h1>
          {subtitle && (
            <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Botão de notificações */}
          <button className="relative p-2 rounded-full border border-slate-700/80 hover:border-emerald-500/60 hover:bg-slate-900 transition-all">
            <Bell className="w-4 h-4 text-slate-300" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </button>

          {/* Avatar / info da usuária */}
          <div className="flex items-center gap-2">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-medium text-slate-100">
                Admin Emagrify
              </p>
              <p className="text-[11px] text-slate-400">
                Esposa do Klaytison 💍
              </p>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-400 flex items-center justify-center shadow-md shadow-emerald-500/40">
              <User className="w-4 h-4 text-slate-950" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
