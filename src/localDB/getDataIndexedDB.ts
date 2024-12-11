import { Contact, ResourceTech } from "@/interface";
import { initDB } from "./initDB"

export const getDataIndexedDB = async (storeName: string): Promise<Contact[] | ResourceTech[]> => {
    try {
        const db = await initDB();
        const data = await db.getAll(storeName);
        return data;
    } catch (error) {
        console.error("Error al obtener los datos de la base de datos local:", error);
        throw error;
    }
}