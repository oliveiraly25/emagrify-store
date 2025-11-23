"use client";

import { useEffect, useState, FormEvent } from "react";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Star,
  MessageCircle,
  Settings,
  Shield,
  KeyRound,
  Activity,
} from "lucide-react";
import supabase from "@/lib/supabaseClient";


type Section =
  | "dashboard"
  | "users"
  | "products"
  | "orders"
  | "points"
  | "timeline"
  | "support"
  | "settings";

type StoreUser = {
  id: string;
  name: string;
  email: string;
  points: number;
};

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  active: boolean;
};

type Order = {
  id: string;
  total: number;
  status: string;
  created_at: string;
};

type TimelinePost = {
  id: string;
  title: string;
  content: string | null;
  created_at: string;
};

type Ticket = {
  id: string;
  user_email: string;
  subject: string;
  status: string;
  created_at: string;
};

export default function AdminPage() {
  const [section, setSection] = useState<Section>("dashboard");

  const [users, setUsers] = useState<StoreUser[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [timeline, setTimeline] = useState<TimelinePost[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  // Form states
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");

  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductStock, setNewProductStock] = useState("");

  const [pointsUserEmail, setPointsUserEmail] = useState("");
  const [pointsAmount, setPointsAmount] = useState("");

  const [timelineTitle, setTimelineTitle] = useState("");
  const [timelineContent, setTimelineContent] = useState("");

  const [supportEmail, setSupportEmail] = useState("");
  const [supportSubject, setSupportSubject] = useState("");
  const [supportMessage, setSupportMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Carrega dados básicos ao entrar em cada seção
  useEffect(() => {
    setFeedback(null);
    if (section === "users") loadUsers();
    if (section === "products") loadProducts();
    if (section === "orders") loadOrders();
    if (section === "timeline") loadTimeline();
    if (section === "support") loadTickets();
  }, [section]);

  async function loadUsers() {
    const { data, error } = await supabase
      .from("store_users")
      .select("id, name, email, points")
      .order("created_at", { ascending: false });

    if (!error && data) setUsers(data as any);
  }

  async function loadProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setProducts(data as any);
  }

  async function loadOrders() {
    const { data, error } = await supabase
      .from("orders")
      .select("id, total, status, created_at")
      .order("created_at", { ascending: false });

    if (!error && data) setOrders(data as any);
  }

  async function loadTimeline() {
    const { data, error } = await supabase
      .from("admin_timeline")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setTimeline(data as any);
  }

  async function loadTickets() {
    const { data, error } = await supabase
      .from("support_tickets")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setTickets(data as any);
  }

  // Criar usuário
  async function handleCreateUser(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    const { error } = await supabase.from("store_users").insert({
      name: newUserName,
      email: newUserEmail,
    });

    if (error) setFeedback("Erro ao criar usuário.");
    else {
      setFeedback("Usuário criado com sucesso!");
      setNewUserName("");
      setNewUserEmail("");
      loadUsers();
    }

    setLoading(false);
  }

  // Criar produto
  async function handleCreateProduct(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    const priceNumber = Number(newProductPrice.replace(",", "."));
    const stockNumber = Number(newProductStock || "0");

    const { error } = await supabase.from("products").insert({
      name: newProductName,
      price: priceNumber,
      stock: stockNumber,
    });

    if (error) setFeedback("Erro ao criar produto.");
    else {
      setFeedback("Produto criado com sucesso!");
      setNewProductName("");
      setNewProductPrice("");
      setNewProductStock("");
      loadProducts();
    }

    setLoading(false);
  }

  // Adicionar pontos para um usuário pelo email
  async function handleAddPoints(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    const pts = Number(pointsAmount);

    // encontrar usuário
    const { data: usersFound, error: userError } = await supabase
      .from("store_users")
      .select("id, points")
      .eq("email", pointsUserEmail)
      .maybeSingle();

    if (userError || !usersFound) {
      setFeedback("Usuário não encontrado.");
      setLoading(false);
      return;
    }

    const userId = (usersFound as any).id;
    const currentPoints = (usersFound as any).points || 0;

    // registrar transação
    await supabase.from("points_transactions").insert({
      user_id: userId,
      points: pts,
      reason: "Ajuste manual pelo admin",
    });

    // atualizar total de pontos
    await supabase
      .from("store_users")
      .update({ points: currentPoints + pts })
      .eq("id", userId);

    setFeedback("Pontos adicionados com sucesso!");
    setPointsAmount("");
    setPointsUserEmail("");
    setLoading(false);
    loadUsers();
  }

  // Criar post na timeline
  async function handleCreateTimeline(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    const { error } = await supabase.from("admin_timeline").insert({
      title: timelineTitle,
      content: timelineContent,
    });

    if (error) setFeedback("Erro ao postar na timeline.");
    else {
      setFeedback("Post adicionado na timeline!");
      setTimelineTitle("");
      setTimelineContent("");
      loadTimeline();
    }
    setLoading(false);
  }

  // Criar ticket de suporte
  async function handleCreateTicket(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    const { error } = await supabase.from("support_tickets").insert({
      user_email: supportEmail,
      subject: supportSubject,
      message: supportMessage,
    });

    if (error) setFeedback("Erro ao criar ticket de suporte.");
    else {
      setFeedback("Ticket de suporte criado!");
      setSupportEmail("");
      setSupportSubject("");
      setSupportMessage("");
      loadTickets();
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)] flex items-center justify-center">
            <span className="font-bold text-white">E</span>
          </div>
          <span className="font-semibold">Emagrify Store</span>
        </div>

        <nav className="flex-1 py-4">
          <SidebarItem
            label="Dashboard"
            icon={<LayoutDashboard className="w-4 h-4" />}
            active={section === "dashboard"}
            onClick={() => setSection("dashboard")}
          />
          <SidebarItem
            label="Usuários"
            icon={<Users className="w-4 h-4" />}
            active={section === "users"}
            onClick={() => setSection("users")}
          />
          <SidebarItem
            label="Produtos"
            icon={<Package className="w-4 h-4" />}
            active={section === "products"}
            onClick={() => setSection("products")}
          />
          <SidebarItem
            label="Pedidos"
            icon={<ShoppingCart className="w-4 h-4" />}
            active={section === "orders"}
            onClick={() => setSection("orders")}
          />
          <SidebarItem
            label="Pontos"
            icon={<Star className="w-4 h-4" />}
            active={section === "points"}
            onClick={() => setSection("points")}
          />
          <SidebarItem
            label="Timeline"
            icon={<Activity className="w-4 h-4" />}
            active={section === "timeline"}
            onClick={() => setSection("timeline")}
          />
          <SidebarItem
            label="Suporte"
            icon={<MessageCircle className="w-4 h-4" />}
            active={section === "support"}
            onClick={() => setSection("support")}
          />
          <SidebarItem
            label="Configurações"
            icon={<Settings className="w-4 h-4" />}
            active={section === "settings"}
            onClick={() => setSection("settings")}
          />
          <SidebarItem
            label="Segurança"
            icon={<Shield className="w-4 h-4" />}
            active={false}
            onClick={() => alert("Seção Segurança ainda será detalhada.")}
          />
          <SidebarItem
            label="Permissões"
            icon={<KeyRound className="w-4 h-4" />}
            active={false}
            onClick={() => alert("Seção Permissões ainda será detalhada.")}
          />
        </nav>

        <div className="px-6 py-4 border-t border-slate-800 text-xs text-slate-400">
          Painel Admin Emagrify Store
        </div>
      </aside>

      {/* Conteúdo */}
      <main className="flex-1 bg-slate-950 text-slate-50">
        <div className="max-w-5xl mx-auto py-10 px-6">
          {feedback && (
            <div className="mb-4 rounded-lg bg-slate-800 border border-slate-700 px-4 py-2 text-sm">
              {feedback}
            </div>
          )}

          {section === "dashboard" && (
            <section>
              <h1 className="text-3xl font-semibold mb-2">Dashboard</h1>
              <p className="text-slate-300 mb-6">
                Bem-vinda ao painel administrativo da Emagrify Store.
              </p>
              <p className="text-slate-400 text-sm">
                Use o menu à esquerda para gerenciar usuários, produtos, pedidos, pontos, suporte e muito mais.
              </p>
            </section>
          )}

          {section === "users" && (
            <section>
              <h1 className="text-2xl font-semibold mb-4">Usuários</h1>

              <form
                onSubmit={handleCreateUser}
                className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800"
              >
                <input
                  type="text"
                  placeholder="Nome"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm"
                  required
                />
                <button
                  disabled={loading}
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-sm font-medium"
                >
                  {loading ? "Salvando..." : "Adicionar usuário"}
                </button>
              </form>

              <div className="space-y-2">
                {users.map((u) => (
                  <div
                    key={u.id}
                    className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm"
                  >
                    <div>
                      <p className="font-medium">{u.name}</p>
                      <p className="text-slate-400">{u.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400">Pontos</p>
                      <p className="font-semibold">{u.points}</p>
                    </div>
                  </div>
                ))}
                {users.length === 0 && (
                  <p className="text-sm text-slate-400">
                    Nenhum usuário cadastrado ainda.
                  </p>
                )}
              </div>
            </section>
          )}

          {section === "products" && (
            <section>
              <h1 className="text-2xl font-semibold mb-4">Produtos</h1>

              <form
                onSubmit={handleCreateProduct}
                className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800"
              >
                <input
                  type="text"
                  placeholder="Nome do produto"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm"
                  required
                />
                <input
                  type="text"
                  placeholder="Preço (ex: 99.90)"
                  value={newProductPrice}
                  onChange={(e) => setNewProductPrice(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm"
                  required
                />
                <input
                  type="number"
                  placeholder="Estoque"
                  value={newProductStock}
                  onChange={(e) => setNewProductStock(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm"
                />
                <button
                  disabled={loading}
                  className="md:col-span-3 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-sm font-medium"
                >
                  {loading ? "Salvando..." : "Adicionar produto"}
                </button>
              </form>

              <div className="space-y-2">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm"
                  >
                    <div>
                      <p className="font-medium">{p.name}</p>
                      <p className="text-slate-400">
                        R$ {Number(p.price).toFixed(2)} • Estoque: {p.stock}
                      </p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-slate-800 text-slate-300">
                      {p.active ? "Ativo" : "Inativo"}
                    </span>
                  </div>
                ))}
                {products.length === 0 && (
                  <p className="text-sm text-slate-400">
                    Nenhum produto cadastrado ainda.
                  </p>
                )}
              </div>
            </section>
          )}

          {section === "orders" && (
            <section>
              <h1 className="text-2xl font-semibold mb-4">Pedidos</h1>
              <p className="text-sm text-slate-400 mb-4">
                Aqui aparecem pedidos registrados na tabela <code>orders</code>.
              </p>
              <div className="space-y-2">
                {orders.map((o) => (
                  <div
                    key={o.id}
                    className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm"
                  >
                    <div>
                      <p className="font-medium">Pedido #{o.id.slice(0, 8)}</p>
                      <p className="text-slate-400">
                        Total: R$ {Number(o.total).toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right text-xs text-slate-400">
                      <p>Status: {o.status}</p>
                      <p>{new Date(o.created_at).toLocaleString("pt-BR")}</p>
                    </div>
                  </div>
                ))}
                {orders.length === 0 && (
                  <p className="text-sm text-slate-400">
                    Nenhum pedido registrado ainda.
                  </p>
                )}
              </div>
            </section>
          )}

          {section === "points" && (
            <section>
              <h1 className="text-2xl font-semibold mb-4">Sistema de pontos</h1>

              <form
                onSubmit={handleAddPoints}
                className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800"
              >
                <input
                  type="email"
                  placeholder="Email do usuário"
                  value={pointsUserEmail}
                  onChange={(e) => setPointsUserEmail(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm"
                  required
                />
                <input
                  type="number"
                  placeholder="Quantidade de pontos"
                  value={pointsAmount}
                  onChange={(e) => setPointsAmount(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm"
                  required
                />
                <button
                  disabled={loading}
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-sm font-medium"
                >
                  {loading ? "Salvando..." : "Adicionar pontos"}
                </button>
              </form>

              <p className="text-sm text-slate-400">
                Os pontos são somados no cadastro do usuário e a movimentação é registrada em{" "}
                <code>points_transactions</code>.
              </p>
            </section>
          )}

          {section === "timeline" && (
            <section>
              <h1 className="text-2xl font-semibold mb-4">Timeline do admin</h1>

              <form
                onSubmit={handleCreateTimeline}
                className="mb-6 space-y-3 bg-slate-900 p-4 rounded-xl border border-slate-800"
              >
                <input
                  type="text"
                  placeholder="Título do post"
                  value={timelineTitle}
                  onChange={(e) => setTimelineTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm"
                  required
                />
                <textarea
                  placeholder="Conteúdo"
                  value={timelineContent}
                  onChange={(e) => setTimelineContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm min-h-[80px]"
                />
                <button
                  disabled={loading}
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-sm font-medium"
                >
                  {loading ? "Salvando..." : "Publicar na timeline"}
                </button>
              </form>

              <div className="space-y-3">
                {timeline.map((t) => (
                  <div
                    key={t.id}
                    className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-sm"
                  >
                    <p className="font-medium">{t.title}</p>
                    {t.content && (
                      <p className="text-slate-300 mt-1">{t.content}</p>
                    )}
                    <p className="text-[11px] text-slate-500 mt-1">
                      {new Date(t.created_at).toLocaleString("pt-BR")}
                    </p>
                  </div>
                ))}
                {timeline.length === 0 && (
                  <p className="text-sm text-slate-400">
                    Nenhuma postagem ainda.
                  </p>
                )}
              </div>
            </section>
          )}

          {section === "support" && (
            <section>
              <h1 className="text-2xl font-semibold mb-4">Suporte</h1>

              <form
                onSubmit={handleCreateTicket}
                className="mb-6 space-y-3 bg-slate-900 p-4 rounded-xl border border-slate-800"
              >
                <input
                  type="email"
                  placeholder="Email do cliente"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm"
                  required
                />
                <input
                  type="text"
                  placeholder="Assunto"
                  value={supportSubject}
                  onChange={(e) => setSupportSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm"
                  required
                />
                <textarea
                  placeholder="Mensagem"
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm min-h-[80px]"
                />
                <button
                  disabled={loading}
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-sm font-medium"
                >
                  {loading ? "Salvando..." : "Criar ticket"}
                </button>
              </form>

              <div className="space-y-2">
                {tickets.map((t) => (
                  <div
                    key={t.id}
                    className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm"
                  >
                    <p className="font-medium">
                      {t.subject}{" "}
                      <span className="text-xs text-slate-400">
                        ({t.user_email})
                      </span>
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Status: {t.status} •{" "}
                      {new Date(t.created_at).toLocaleString("pt-BR")}
                    </p>
                  </div>
                ))}
                {tickets.length === 0 && (
                  <p className="text-sm text-slate-400">
                    Nenhum ticket de suporte ainda.
                  </p>
                )}
              </div>
            </section>
          )}

          {section === "settings" && (
            <section>
              <h1 className="text-2xl font-semibold mb-4">Configurações</h1>
              <p className="text-sm text-slate-400">
                Aqui futuramente você pode gerenciar nome da loja, cores, regras de pontos,
                mensagens padrão etc. As configurações são salvas em{" "}
                <code>store_settings</code>.
              </p>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

function SidebarItem({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2 px-6 py-2 text-sm text-left transition-colors ${
        active
          ? "bg-emerald-500 text-slate-900 font-medium"
          : "text-slate-300 hover:bg-slate-800"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
