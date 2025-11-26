"use client";

import { cn } from "@/lib/utils";

interface AdminCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
}

export function Card({ title, description, className, children }: AdminCardProps) {
  return (
    <div
      className={cn(
        "bg-white border border-[#E5E5E5] rounded-xl p-5 flex flex-col gap-3",
        className
      )}
    >
      {(title || description) && (
        <header>
          {title && (
            <h2 className="text-base font-semibold text-[#111]">{title}</h2>
          )}
          {description && (
            <p className="text-sm text-gray-500 leading-snug mt-1">
              {description}
            </p>
          )}
        </header>
      )}

      <div className="mt-1">{children}</div>
    </div>
  );
}
