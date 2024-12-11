import { initDB } from "./initDB"

export const getDataFromIndexedDB = async <T>(storeName: string): Promise<T[]> => {
    try {
        const db = await initDB();
        const data = await db.getAll(storeName);
        console.log("los datos estan siendo obtenidos desde INDEX DB");
        return data;
    } catch (error) {
        console.error("Error al obtener los datos de la base de datos local:", error);
        throw error;
    }
}