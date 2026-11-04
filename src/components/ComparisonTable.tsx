interface Props {
  columns: string[]
  rows: string[][]
}

export function ComparisonTable({ columns, rows }: Props) {
  return (
    <div className="scroll-slim overflow-x-auto rounded-lg border border-slate-800">
      <table className="w-full min-w-[64rem] border-collapse text-left text-sm">
        <thead>
          <tr className="bg-slate-900">
            {columns.map((column, i) => (
              <th
                key={`${column}-${i}`}
                scope="col"
                className={`border-b border-slate-800 px-3 py-2.5 font-semibold text-slate-200 ${
                  i < 2 ? 'sticky left-0 z-10 bg-slate-900' : ''
                }`}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} className={r % 2 === 1 ? 'bg-slate-900/40' : ''}>
              {row.map((cell, c) => (
                <td
                  key={c}
                  className={`border-b border-slate-800/70 px-3 py-2 align-top text-slate-300 ${
                    c < 2 ? 'sticky left-0 z-0 bg-slate-950' : ''
                  } ${c === 0 ? 'text-slate-500 tabular-nums' : ''} ${
                    c === 1 ? 'font-medium text-slate-200' : ''
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
