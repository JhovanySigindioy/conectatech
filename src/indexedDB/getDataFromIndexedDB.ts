import { initDB } from "./initDB"

export const getDataFromIndexedDB = async <T>(storeName: string): Promise<T[]> => {
    try {
        const db = await initDB();
        const data = await db.getAll(storeName);
        return data;
    } catch (error) {
        throw error;
    }
}