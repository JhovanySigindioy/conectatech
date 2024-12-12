import React, { useState } from "react";
import Swal from "sweetalert2";
import { inputFileUpload } from "@/helpers"; // Asumo que esta función existe y devuelve los datos del Excel
import { uploadFirestore } from "@/api";

const validationSchemas: Record<string, string[]> = {
    contacts: ["NOMBRE", "CARGO", "NUMERO_COORPO", "NUMERO_PERSONAL", "VEHICULO", "PLACA", "JEFE_DIRECTO"], // Campos requeridos para 'Contactos de empleados'
    resources: ["TIPO_RECURSO", "TITULO", "DESCRIPCION", "URL_RECURSO"], // Campos requeridos para 'Recursos apoyo técnico'
};

export const useUploadFirestore = <T,>(
    collection: string,
    fnFormatData: (data: T[]) => any[]
) => {
    const [jsonData, setJsonData] = useState<any[]>([]);
    const [formattedData, setFormattedData] = useState<any[]>([]);

    const handleResetJsonData = ():void => {
        setJsonData([]);
    }

    const handleFileUpload = async (
        e: React.ChangeEvent<HTMLInputElement>,
        resetInput: () => void
    ) => {
        
        const file = e.target.files?.[0];
        if (file) {
            try {
                const parsedData = await inputFileUpload(file);
                const requiredFields = validationSchemas[collection];
                const isValid = parsedData.every((item: Record<string, any>) =>
                    requiredFields.every((field) => field in item)
                );

                if (!isValid) {
                    Swal.fire({
                        icon: "error",
                        title: "Error de Validación",
                        text: `El archivo no cumple con los campos requeridos`,
                    });
                    resetInput(); // Resetea el input
                    return;
                }

                setJsonData(parsedData);
                const newFormattedData = fnFormatData(parsedData);
                setFormattedData(newFormattedData);
                resetInput();
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Hubo un problema al procesar el archivo.",
                });
                resetInput(); // Resetea el input
            }
        }
    };

    const handleUploadFirestore = async () => {
        try {
            if (jsonData.length === 0) {
                Swal.fire({
                    icon: "warning",
                    title: "Vacío",
                    text: "Por favor carga un archivo antes de subir.",
                });
                return;
            }

            Swal.fire({
                title: "Subiendo información",
                text: "Por favor espera mientras sube la información al servidor.",
                allowOutsideClick: false,
                allowEscapeKey: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            await uploadFirestore(formattedData, collection);

            Swal.fire({
                icon: "success",
                title: "Éxito",
                text: "Los contactos se subieron correctamente.",
                didOpen: () => {
                    const confirmButton = Swal.getConfirmButton();
                    confirmButton!.style.backgroundColor = "#38bdf8";
                }
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Ocurrió un error al subir los datos.",
            });
        }
    };

    return {
        handleFileUpload,
        handleUploadFirestore,
        handleResetJsonData,
        jsonData,
        formattedData,
    };
};
