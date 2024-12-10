import * as XLSX from "xlsx";

export const inputFileUpload = async(file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const data = new Uint8Array(event.target?.result as ArrayBuffer);
                    const workbook = XLSX.read(data, { type: "array" });
                    const sheetName = workbook.SheetNames[0];
                    const sheet = workbook.Sheets[sheetName];
                    const parsedData: any[] = XLSX.utils.sheet_to_json(sheet);
                    resolve(parsedData); // Devuelve los datos procesados
                } catch (error) {
                    reject("Error al procesar el archivo: " + error);
                }
            };
            reader.onerror = () => reject("Error al leer el archivo");
            reader.readAsArrayBuffer(file);
        } else {
            reject("No se proporcionó un archivo");
        }
    });
};
