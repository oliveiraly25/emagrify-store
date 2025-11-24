// src/app/admin/components/table.tsx
"use client";

interface TableProps {
  headers: string[];
  children: React.ReactNode;
}

export function Table({ headers, children }: TableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#555] dark:border-[#333] bg-[#555] dark:bg-[#1b1b1b] backdrop-blur shadow-[0_18px_40px_rgba(0,0,0,0.6)]">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-[#4d4d4d] dark:bg-[#252525]">
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-4 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-black/80 dark:text-slate-400"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#666] dark:divide-[#333]">
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
}
