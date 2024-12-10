import React from "react";

export interface CustomTableProps {
    jsonData: any[];
}

export const CustomTable: React.FC<CustomTableProps> = ({ jsonData }) => {
    return (
        <div className="overflow-auto rounded-lg shadow-lg border border-gray-200">
            <table className="min-w-full bg-white divide-y divide-gray-200 text-sm text-left">
                <thead className="bg-sky-700">
                    <tr>
                        {/* Renderizamos las cabeceras dinámicamente desde las claves del primer objeto */}
                        {Object.keys(jsonData[0]).map((key) => (
                            <th
                                key={key}
                                className="px-4 py-2 font-bold text-white uppercase"
                            >
                                {key}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {/* Mapeamos las filas y las celdas con los datos formateados */}
                    {jsonData.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className={`hover:bg-sky-200 ${rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                        >
                            {Object.keys(row).map((key) => (
                                <td key={key} className="px-4 py-2 text-gray-700 ">
                                    {row[key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
