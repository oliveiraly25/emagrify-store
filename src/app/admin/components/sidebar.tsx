// src/app/admin/components/sidebar.tsx
"use client";

import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Star,
  MessageCircle,
  Settings,
  Activity,
  Shield,
  KeyRound,
} from "lucide-react";

type Section =
  | "dashboard"
  | "users"
  | "products"
  | "orders"
  | "points"
  | "timeline"
  | "support"
  | "settings";

interface SidebarProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-[#E5E5E5] flex flex-col text-black">
      {/* LOGO */}
      <div className="px-6 py-6 border-b border-[#E5E5E5] flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#406945] flex items-center justify-center shadow-md">
          <span className="font-bold text-white text-lg">E</span>
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-semibold">Emagrify Store</span>
          <span className="text-[11px] text-gray-500">Painel administrativo</span>
        </div>
      </div>

      {/* NAVEGAÇÃO */}
      <nav className="flex-1 py-4">
        <SidebarItem
          label="Dashboard"
          icon={<LayoutDashboard className="w-4 h-4" />}
          active={activeSection === "dashboard"}
          onClick={() => onSectionChange("dashboard")}
        />
        <SidebarItem
          label="Usuários"
          icon={<Users className="w-4 h-4" />}
          active={activeSection === "users"}
          onClick={() => onSectionChange("users")}
        />
        <SidebarItem
          label="Produtos"
          icon={<Package className="w-4 h-4" />}
          active={activeSection === "products"}
          onClick={() => onSectionChange("products")}
        />
        <SidebarItem
          label="Pedidos"
          icon={<ShoppingCart className="w-4 h-4" />}
          active={activeSection === "orders"}
          onClick={() => onSectionChange("orders")}
        />
        <SidebarItem
          label="Pontos"
          icon={<Star className="w-4 h-4" />}
          active={activeSection === "points"}
          onClick={() => onSectionChange("points")}
        />
        <SidebarItem
          label="Timeline"
          icon={<Activity className="w-4 h-4" />}
          active={activeSection === "timeline"}
          onClick={() => onSectionChange("timeline")}
        />
        <SidebarItem
          label="Suporte"
          icon={<MessageCircle className="w-4 h-4" />}
          active={activeSection === "support"}
          onClick={() => onSectionChange("support")}
        />
        <SidebarItem
          label="Configurações"
          icon={<Settings className="w-4 h-4" />}
          active={activeSection === "settings"}
          onClick={() => onSectionChange("settings")}
        />

        <SidebarItem label="Segurança" icon={<Shield className="w-4 h-4" />} disabled />
        <SidebarItem label="Permissões" icon={<KeyRound className="w-4 h-4" />} disabled />
      </nav>

      {/* FOOTER */}
      <div className="px-6 py-4 border-t border-[#E5E5E5] text-[12px] text-gray-500">
        Logada como <span className="font-medium text-black">Admin</span>
      </div>
    </aside>
  );
}

/* ================================
   ITEM DO SIDEBAR
=================================*/

interface SidebarItemProps {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

function SidebarItem({ label, icon, active, onClick, disabled }: SidebarItemProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-5 py-2.5 text-sm transition-all rounded-lg
        ${disabled ? "opacity-40 cursor-not-allowed" : ""}
        ${
          active
            ? "text-[#406945] font-medium bg-[#E9F3EC]"
            : "text-gray-700 hover:bg-gray-100"
        }
      `}
    >
      <span
        className={active ? "text-[#406945]" : "text-gray-600 group-hover:text-black"}
      >
        {icon}
      </span>

      <span>{label}</span>
    </button>
  );
}
