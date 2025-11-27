"use client";

import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="
        w-full mt-20 
        bg-[#050506] text-gray-200
        border-t border-white/10
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* COLUNA 1 - LOGO E DESCRIÇÃO */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold tracking-[0.12em] uppercase">
            Emagrify Store
          </h2>

          <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
            Uma curadoria de produtos pensada para quem busca praticidade,
            estilo e bem-estar em um único lugar.
          </p>
          
          <h2 className="text-xl font-semibold tracking-[0.12em] uppercase">
            Por que escolher a Emagrify Store?
          </h2>

                    <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
            Comunicação clara sobre prazos, políticas e suporte em todas as
                etapas da compra. Layout leve, navegação simples e foco total em uma jornada de
                compra confortável.
          </p>
          

          {/* Redes sociais */}
          <div className="flex mt-4 gap-4 text-lg text-gray-500">
            <i className="fab fa-facebook hover:text-gray-100 cursor-pointer transition-colors" />
            <i className="fab fa-instagram hover:text-gray-100 cursor-pointer transition-colors" />
            <i className="fab fa-twitter hover:text-gray-100 cursor-pointer transition-colors" />
            <i className="fab fa-youtube hover:text-gray-100 cursor-pointer transition-colors" />
          </div>
        </div>

        {/* COLUNA 2 - LINKS RÁPIDOS */}
        <div>
          <h3 className="font-semibold text-sm uppercase tracking-[0.16em] text-gray-300 mb-3">
            Links Rápidos
          </h3>
          <ul className="text-gray-500 space-y-2 text-sm">
            <li className="hover:text-gray-100 cursor-pointer transition-colors">
              Sobre Nós
            </li>
            <li className="hover:text-gray-100 cursor-pointer transition-colors">
              Como Comprar
            </li>
            <li className="hover:text-gray-100 cursor-pointer transition-colors">
              Rastrear Pedido
            </li>
            <li className="hover:text-gray-100 cursor-pointer transition-colors">
              Trocas e Devoluções
            </li>
            <li className="hover:text-gray-100 cursor-pointer transition-colors">
              Perguntas Frequentes
            </li>
          </ul>
        </div>

        {/* COLUNA 3 - ATENDIMENTO */}
        <div>
          <h3 className="font-semibold text-sm uppercase tracking-[0.16em] text-gray-300 mb-3">
            Atendimento
          </h3>
          <ul className="text-gray-500 space-y-2 text-sm">
            <li className="hover:text-gray-100 cursor-pointer transition-colors">
              Central de Ajuda
            </li>
            <li className="hover:text-gray-100 cursor-pointer transition-colors">
              Fale Conosco
            </li>
            <li className="hover:text-gray-100 cursor-pointer transition-colors">
              Política de Privacidade
            </li>
            <li className="hover:text-gray-100 cursor-pointer transition-colors">
              Termos de Uso
            </li>
            <li className="hover:text-gray-100 cursor-pointer transition-colors">
              Programa de Pontos
            </li>
          </ul>
        </div>

        {/* COLUNA 4 - CONTATO */}
        <div>
          <h3 className="font-semibold text-sm uppercase tracking-[0.16em] text-gray-300 mb-3">
            Contato
          </h3>

          <div className="flex items-center gap-3 text-sm text-gray-500 py-1">
            <Mail className="w-4 h-4 text-gray-400" />
            <span>contato@emagrifystore.com</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-500 py-1">
            <Phone className="w-4 h-4 text-gray-400" />
            <span>(99) 99999-9999</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-500 py-1">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span>São Paulo, SP – Brasil</span>
          </div>
        </div>
      </div>

      {/* LINHA INFERIOR */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-gray-500 text-xs tracking-wide">
          © {new Date().getFullYear()} Emagrify Store — Todos os direitos
          reservados.
        </div>
      </div>
    </footer>
  );
}
