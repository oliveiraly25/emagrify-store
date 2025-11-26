"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { HOME_BANNERS } from "@/lib/constants";
import Link from "next/link";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function HeroBanner() {
  return (
    <div className="relative w-full h-[220px] sm:h-[280px] lg:h-[340px] rounded-3xl overflow-hidden bg-[#050607] border border-white/5 shadow-[0_18px_60px_rgba(0,0,0,0.85)]">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletActiveClass:
            "swiper-pagination-bullet-active !bg-[#325436] !opacity-100",
        }}
        navigation
        loop
        className="h-full"
      >
        {HOME_BANNERS.map((banner) => (
          <SwiperSlide key={banner.id}>
            <Link
              href={banner.link}
              className="relative block w-full h-full group"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${banner.image})` }}
              >
                {/* Overlay Dark + Verde Elegante */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/75 to-[#325436]/40" />
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center">
                <div className="container mx-auto px-4 sm:px-8">
                  <div className="max-w-xl space-y-3">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-emerald-200/80">
                      Emagrify Store
                    </p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-1 drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
                      {banner.title}
                    </h2>
                    <p className="text-sm sm:text-base text-white/90 mb-4 sm:mb-6 drop-shadow-[0_8px_24px_rgba(0,0,0,0.85)]">
                      {banner.subtitle}
                    </p>
                    <button
                      className="
                        inline-flex items-center justify-center
                        px-6 sm:px-8 py-3 sm:py-3.5
                        rounded-full
                        bg-[#325436]
                        text-white text-sm font-semibold
                        shadow-[0_14px_40px_rgba(0,0,0,0.9)]
                        transition-transform transition-shadow duration-200
                        group-hover:-translate-y-[1px] group-hover:shadow-[0_18px_55px_rgba(0,0,0,0.95)]
                      "
                    >
                      {banner.cta}
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Styles for Swiper */}
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #f9fafb !important;
          background: rgba(0, 0, 0, 0.7);
          width: 40px !important;
          height: 40px !important;
          border-radius: 9999px;
          backdrop-filter: blur(6px);
          border: 1px solid rgba(250, 250, 250, 0.08);
          transition: background 0.2s ease, transform 0.2s ease;
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: rgba(0, 0, 0, 0.9);
          transform: translateY(-1px);
        }

        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 18px !important;
        }

        .swiper-pagination-bullet {
          background: rgba(248, 250, 252, 0.6) !important;
          opacity: 0.5;
        }

        .swiper-pagination-bullet-active {
          opacity: 1 !important;
        }

        @media (max-width: 640px) {
          .swiper-button-next,
          .swiper-button-prev {
            width: 32px !important;
            height: 32px !important;
          }

          .swiper-button-next:after,
          .swiper-button-prev:after {
            font-size: 14px !important;
          }
        }
      `}</style>
    </div>
  );
}
