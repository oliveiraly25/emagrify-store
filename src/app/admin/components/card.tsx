"use client";

interface CardProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export function Card({ title, description, children, className }: CardProps) {
  return (
    <section
      className={`
        group relative overflow-hidden rounded-2xl 
        border 
        dark:border-[#333] 
        dark:bg-[#222] 
        bg-[#444] 
        border-[#555] 
        px-4 py-4 md:px-5 md:py-5
        shadow-[0_4px_20px_rgba(0,0,0,0.25)]
        transition-all duration-200
        hover:-translate-y-0.5
        hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)]
        ${className ?? ""}
      `}
    >
      {(title || description) && (
        <header className="mb-3 relative z-[1]">
          {title && (
            <h2 className="text-sm font-semibold dark:text-white text-black">
              {title}
            </h2>
          )}

          {description && (
            <p className="text-xs mt-1 dark:text-gray-300 text-black/70">
              {description}
            </p>
          )}
        </header>
      )}

      <div className="relative z-[1] text-sm dark:text-white text-black">
        {children}
      </div>
    </section>
  );
}
