type Column<T> = {
    header: string;
    accessor: keyof T;
  };
  
  type TableProps<T> = {
    columns: Column<T>[];
    data: T[];
    renderActions?: (row: T) => React.ReactNode;
  };
  
  const Table = <T extends object>({ columns, data, renderActions }: TableProps<T>) => {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.accessor)}
                  className="px-6 py-3 text-left font-medium text-gray-700"
                >
                  {col.header}
                </th>
              ))}
              {renderActions && (
                <th className="px-6 py-3 text-left font-medium text-gray-700">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="border-b">
                {columns.map((col) => {
                  const cellValue = row[col.accessor];
                  return (
                    <td key={String(col.accessor)} className="px-6 py-3">
                      {typeof cellValue === "string" || typeof cellValue === "number"
                        ? cellValue
                        : JSON.stringify(cellValue)}
                    </td>
                  );
                })}
                {renderActions && <td className="px-6 py-3">{renderActions(row)}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default Table;
  