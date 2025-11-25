// src/app/admin/components/table.tsx
"use client";

interface TableProps {
  headers: string[];
  children: React.ReactNode;
}

export function Table({ headers, children }: TableProps) {
  return (
    <div
      className="
        overflow-hidden rounded-2xl
        border border-[#666] dark:border-[#333]
        bg-[#444] dark:bg-[#222]
        backdrop-blur-md
        shadow-[0_18px_40px_rgba(0,0,0,0.35)]
      "
    >
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-[#3d3d3d] dark:bg-[#1a1a1a]">
              {headers.map((header) => (
                <th
                  key={header}
                  className="
                    px-4 py-3 text-left
                    text-[11px] font-semibold uppercase tracking-wide
                    text-black dark:text-slate-300
                  "
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody
            className="
              divide-y divide-[#555] dark:divide-[#333]
              text-black dark:text-slate-200
              bg-[#444] dark:bg-[#222]
            "
          >
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
}
