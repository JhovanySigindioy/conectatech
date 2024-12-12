
import { initDB } from "./initDB";

export const saveDataToIndexedDB = async <T>(storeName: string, data: T[] ): Promise<void> => {
    try {
        const db = await initDB();
        const transaction =  db.transaction(storeName, "readwrite");
        data.forEach((item) => transaction.store.put(item));
        await transaction.done;
    } catch (error) {
       
        throw error;
    }
}