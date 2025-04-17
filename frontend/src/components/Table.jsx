import React from "react";

const Table = ({ columns, data, loading, error, onDelete, onChangeStatus }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-2 border border-gray-300">
                {col.label}
              </th>
            ))}
            {(onDelete || onChangeStatus) && (
              <th className="px-4 py-2 border border-gray-300">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data?.map((row, index) => (
            <tr key={row.resourceId || index} className="hover:bg-gray-100">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2 border border-gray-300">
                  {col.render
                    ? col.render(row[col.key], row, index)
                    : row[col.key]}
                </td>
              ))}
              {(onDelete || onChangeStatus) && (
                <td className="px-4 py-2 border border-gray-300 flex gap-2">
                  {onChangeStatus && (
                    <button
                      onClick={() => {
                        onChangeStatus(row.resourceId, row.status);
                      }}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:opacity-80 hover:-translate-y-1 transition-all duration-300"
                    >
                      Change Status
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => {
                        onDelete(row.resourceId);
                      }}
                      className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer hover:opacity-80 hover:-translate-y-1 transition-all duration-300"
                    >
                      Delete
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;