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
        overflow-hidden rounded-xl
        border border-[#E5E5E5]
        bg-white
        shadow-sm
      "
    >
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          
          {/* HEADER */}
          <thead>
            <tr className="bg-[#F4F4F4]">
              {headers.map((header) => (
                <th
                  key={header}
                  className="
                    px-4 py-3 text-left
                    text-[11px] font-semibold uppercase tracking-wide
                    text-gray-600
                  "
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          {/* BODY */}
          <tbody
            className="
              divide-y divide-[#E5E5E5]
              text-gray-700
              bg-white
            "
          >
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
}
