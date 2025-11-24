"use client";

import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="
        w-full mt-20 
        bg-[#0C1A12] text-white 
        dark:bg-[#0a0a0a] dark:text-gray-200
        border-t border-green-900/30 dark:border-gray-800
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* COLUNA 1 - LOGO E DESCRIÇÃO */}
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span
              className="
                text-3xl font-bold 
                bg-gradient-to-r from-purple-500 to-pink-500 
                w-10 h-10 rounded-full 
                flex items-center justify-center text-white
              "
            >
              E
            </span>
            Emagrify Store
          </h2>

          <p className="mt-3 text-sm text-gray-300 dark:text-gray-400 max-w-xs">
            Sua loja online de confiança com os melhores produtos e preços
            imbatíveis.
          </p>

          {/* Redes sociais */}
          <div className="flex mt-4 gap-4 text-xl text-gray-400 dark:text-gray-500">
            <i className="fab fa-facebook hover:text-white cursor-pointer"></i>
            <i className="fab fa-instagram hover:text-white cursor-pointer"></i>
            <i className="fab fa-twitter hover:text-white cursor-pointer"></i>
            <i className="fab fa-youtube hover:text-white cursor-pointer"></i>
          </div>
        </div>

        {/* COLUNA 2 - LINKS RÁPIDOS */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Links Rápidos</h3>
          <ul className="text-gray-400 dark:text-gray-500 space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Sobre Nós</li>
            <li className="hover:text-white cursor-pointer">Como Comprar</li>
            <li className="hover:text-white cursor-pointer">Rastrear Pedido</li>
            <li className="hover:text-white cursor-pointer">Trocas e Devoluções</li>
            <li className="hover:text-white cursor-pointer">Perguntas Frequentes</li>
          </ul>
        </div>

        {/* COLUNA 3 - ATENDIMENTO */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Atendimento</h3>
          <ul className="text-gray-400 dark:text-gray-500 space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Central de Ajuda</li>
            <li className="hover:text-white cursor-pointer">Fale Conosco</li>
            <li className="hover:text-white cursor-pointer">Política de Privacidade</li>
            <li className="hover:text-white cursor-pointer">Termos de Uso</li>
            <li className="hover:text-white cursor-pointer">Programa de Pontos</li>
          </ul>
        </div>

        {/* COLUNA 4 - CONTATO */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Contato</h3>

          <div className="flex items-center gap-3 text-sm text-gray-400 dark:text-gray-500 py-1">
            <Mail className="w-4 h-4" />
            contato@emagrifystore.com
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-400 dark:text-gray-500 py-1">
            <Phone className="w-4 h-4" />
            (11) 99999-9999
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-400 dark:text-gray-500 py-1">
            <MapPin className="w-4 h-4" />
            São Paulo, SP – Brasil
          </div>
        </div>

      </div>

      {/* COPY */}
      <div className="py-4 text-center text-gray-500 text-sm border-t border-green-900/20 dark:border-gray-800">
        © {new Date().getFullYear()} Emagrify Store — Todos os direitos reservados.
      </div>
    </footer>
  );
}
