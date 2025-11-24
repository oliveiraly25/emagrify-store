"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full mt-20 bg-[#0B0F14] dark:bg-[#0B0F14] text-gray-300 border-t border-gray-700 pt-14 pb-10">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* COLUNA 1 */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
              E
            </div>
            <h3 className="text-xl font-semibold text-white">Emagrify Store</h3>
          </div>

          <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
            Sua loja online de confiança com os melhores produtos e preços imbatíveis.
          </p>

          {/* Ícones SOCIAIS */}
          <div className="flex gap-4 mt-4 text-gray-400">
            <i className="fab fa-facebook cursor-pointer hover:text-white"></i>
            <i className="fab fa-instagram cursor-pointer hover:text-white"></i>
            <i className="fab fa-twitter cursor-pointer hover:text-white"></i>
            <i className="fab fa-youtube cursor-pointer hover:text-white"></i>
          </div>
        </div>

        {/* COLUNA 2 */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Links Rápidos</h3>

          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:text-white">Sobre Nós</Link></li>
            <li><Link href="#" className="hover:text-white">Como Comprar</Link></li>
            <li><Link href="#" className="hover:text-white">Rastrear Pedido</Link></li>
            <li><Link href="#" className="hover:text-white">Trocas e Devoluções</Link></li>
            <li><Link href="#" className="hover:text-white">Perguntas Frequentes</Link></li>
          </ul>
        </div>

        {/* COLUNA 3 */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Atendimento</h3>

          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:text-white">Central de Ajuda</Link></li>
            <li><Link href="#" className="hover:text-white">Fale Conosco</Link></li>
            <li><Link href="#" className="hover:text-white">Política de Privacidade</Link></li>
            <li><Link href="#" className="hover:text-white">Termos de Uso</Link></li>
            <li><Link href="#" className="hover:text-white">Programa de Pontos</Link></li>
          </ul>
        </div>

        {/* COLUNA 4 */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contato</h3>

          <ul className="space-y-4 text-sm">

            <li className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-purple-400" />
              <span>
                contato@emagrifystore.com
              </span>
            </li>

            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-purple-400" />
              <span>
                (11) 99999-9999
              </span>
            </li>

            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-purple-400" />
              <span>
                São Paulo, SP - Brasil
              </span>
            </li>

          </ul>

        </div>
      </div>

      <div className="text-center text-gray-500 text-xs mt-10">
        © {new Date().getFullYear()} Emagrify Store — Todos os direitos reservados.
      </div>
    </footer>
  );
}
