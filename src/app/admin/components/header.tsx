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
        bg-white/90 text-gray-900
        border-b border-[#E5E5E5]
        backdrop-blur-xl
      "
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">

        {/* TÍTULO + SUBTÍTULO */}
        <div>
          <h1 className="text-xl font-semibold text-[#1F1F1F]">{title}</h1>

          {subtitle && (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>

        {/* NOTIFICAÇÕES + AVATAR */}
        <div className="flex items-center gap-4">

          {/* Botão de notificações */}
          <button
            className="
              relative p-2 rounded-full
              border border-[#DADADA]
              bg-white
              hover:bg-[#F5F7F4]
              hover:border-[#406945]/40
              transition-all
              shadow-sm hover:shadow
            "
          >
            <Bell className="w-4 h-4 text-gray-700" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </button>

          {/* Avatar */}
          <div className="flex items-center gap-2">

            {/* Infos */}
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-gray-800">Admin Emagrify</p>
              <p className="text-[11px] text-gray-500">Esposa do Klaytison 💍</p>
            </div>

            {/* Avatar círculo */}
            <div
              className="
                w-10 h-10 rounded-full
                bg-gradient-to-br from-[#406945] to-[#8CC59B]
                flex items-center justify-center
                shadow-md shadow-emerald-300/40
              "
            >
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}
