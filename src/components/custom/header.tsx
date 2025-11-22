{menuOpen && (
  <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-[#222] dark:text-white shadow-xl rounded-2xl p-4 border border-gray-200 dark:border-gray-700">
    
{/* SAUDAÇÃO PERSONALIZADA */}
<div className="mb-4">
  <p className="text-lg font-bold">
    Olá, {profile?.first_name}
  </p>
  <p className="text-sm text-gray-600 dark:text-gray-300">
    Navegue e gerencie conforme desejar.
  </p>
</div>

    {/* Meus Pedidos */}
    <Link
      href="/pedidos"
      className="flex items-center justify-between py-3 border-b border-gray-300 dark:border-gray-700 hover:text-#63783D"
    >
      <span>Meus pedidos</span>
      <ShoppingCart className="w-5 h-5" />
    </Link>

    {/* Dados Pessoais */}
    <Link
      href="/profile"
      className="flex items-center justify-between py-3 border-b border-gray-300 dark:border-gray-700 hover:text-#63783D"
    >
      <span>Dados pessoais</span>
      <User className="w-5 h-5" />
    </Link>

    {/* Notificações */}
    <Link
      href="/notificacoes"
      className="flex items-center justify-between py-3 border-b border-gray-300 dark:border-gray-700 hover:text-#63783D"
    >
      <span>Notificações</span>
      <Bell className="w-5 h-5" />
    </Link>

    {/* Meus Pontos */}
    <Link
      href="/pontos"
      className="flex items-center justify-between py-3 border-b border-gray-300 dark:border-gray-700 hover:text-#63783D"
    >
      <span>Meus pontos</span>
      <span className="font-bold text-black dark:text-white">
        {profile?.points ?? 0}
      </span>
    </Link>

    {/* 🌟 Painel Admin — somente para administrador */}
    {profile?.role === "admin" && (
      <Link
        href="/admin"
        className="flex items-center justify-between py-3 border-b border-gray-300 dark:border-gray-700 hover:text-green text-black dark:text-white"
      >
        <span>Painel Admin</span>
        <span className="font-bold text-black">★</span>
      </Link>
    )}

    {/* Sair */}
    <button
      onClick={handleLogout}
      className="mt-4 w-full py-3 bg-black dark:bg-black text-white rounded-xl font-semibold hover:opacity-80 transition"
    >
      Sair
    </button>
  </div>
)}
