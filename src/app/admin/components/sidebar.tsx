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
    <aside className="w-64 bg-slate-950/95 backdrop-blur-xl border-r border-slate-800/70 flex flex-col">
      {/* Logo / topo */}
      <div className="px-6 py-5 border-b border-slate-800/70 flex items-center gap-3">
        <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-400 flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.65)]">
          <span className="font-bold text-slate-950 text-lg">E</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-slate-50">
            Emagrify Store
          </span>
          <span className="text-[11px] text-slate-400">
            Painel administrativo
          </span>
        </div>
      </div>

      {/* Itens de navegação */}
      <nav className="flex-1 py-4 space-y-1">
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
        <SidebarItem
          label="Segurança"
          icon={<Shield className="w-4 h-4" />}
          disabled
        />
        <SidebarItem
          label="Permissões"
          icon={<KeyRound className="w-4 h-4" />}
          disabled
        />
      </nav>

      <div className="px-6 py-4 border-t border-slate-800/70 text-[11px] text-slate-500">
        Logada como <span className="font-medium">Admin</span>
      </div>
    </aside>
  );
}

interface SidebarItemProps {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

function SidebarItem({
  label,
  icon,
  active,
  onClick,
  disabled,
}: SidebarItemProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`group relative w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-all ${
        active
          ? "text-emerald-300"
          : "text-slate-300 hover:text-slate-50"
      } ${disabled ? "opacity-40 cursor
