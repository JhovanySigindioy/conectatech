import React, { useRef, useState } from "react";
import { CustomTable } from "@/components";
import { useUploadFirestore } from "@/customHooks";
import { formatToContact } from "@/helpers";
import { formatToResource } from "@/helpers/formatToResource";

export const ExcelUploadFirestorePage: React.FC = () => {
    const [selectedCollection, setSelectedCollection] = useState<"Contactos de empleados" | "Recursos apoyo técnico">("Contactos de empleados");
    const inputRef = useRef<HTMLInputElement>(null);

    const resetInput = (): void => {
        if (inputRef.current) {
            inputRef.current.value = ""; // Resetea el valor del input
        }
    };

    // Mapa que asocia la colección con la función de formato
    const formatFunctions = {
        "Contactos de empleados": formatToContact,
        "Recursos apoyo técnico": formatToResource,
    };

    const { jsonData, handleResetJsonData, handleFileUpload, handleUploadFirestore } = useUploadFirestore(
        (() => {
            switch (selectedCollection) {
                case "Contactos de empleados":
                    return "contacts";
                case "Recursos apoyo técnico":
                    return "resources";
                default:
                    return "contacts";
            }
        })(),
        formatFunctions[selectedCollection] // Selecciona la función de formato dinámica
    );

    const collections = ["Contactos de empleados", "Recursos apoyo técnico"];

    return (
        <div className="flex flex-col items-center  px-2 py-8 w-full">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Cargar Datos desde Excel</h1>
            <p className="text-gray-600 mb-4 text-center">
                Sube un archivo Excel con la información para previsualizar los datos <strong>antes de enviarlos.</strong>
            </p >
            <div className="flex justify-center items-center mb-6 gap-4 text-sm md:text-base">
                <p className="text-gray-600">¿Qué información deseas subir?</p>
                <select
                    value={selectedCollection}
                    onChange={(e) => {
                        setSelectedCollection(e.target.value as "Contactos de empleados" | "Recursos apoyo técnico");
                        handleResetJsonData(); // Limpia la tabla al cambiar la colección
                        resetInput(); // Resetea el input del archivo
                    }}
                    className="w-full text-gray-700 sm:w-auto border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-200"
                >
                    {collections.map((collection) => (
                        <option key={collection} value={collection}>
                            {collection}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-sm">
                <input
                    ref={inputRef}
                    type="file"
                    accept=".xlsx, .xls"
                    id="file-input"
                    onChange={
                        (e) => handleFileUpload(e, resetInput)
                    } 
                    className="hidden"
                />
                <label
                    htmlFor="file-input"
                    className="w-full sm:w-auto bg-sky-400 text-white font-medium py-2 px-4 rounded-lg shadow hover:bg-sky-600 transition cursor-pointer text-center"
                >
                    Seleccionar archivo Excel
                </label>
                <button
                    onClick={handleUploadFirestore}
                    className="w-full sm:w-auto bg-green-500 text-white font-medium py-2 px-4 rounded-lg shadow hover:bg-green-600 transition text-center"
                >
                    Subir
                </button>
            </div>
            {jsonData.length > 0 && (
                <div className="mt-8 w-full">
                    <CustomTable jsonData={jsonData} />
                </div>
            )}
        </div>
    );
};
