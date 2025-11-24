// src/app/admin/components/table.tsx
"use client";

interface TableProps {
  headers: string[];
  children: React.ReactNode;
}

export function Table({ headers, children }: TableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/70">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-slate-900/80">
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-4 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">{children}</tbody>
        </table>
      </div>
    </div>
  );
}
