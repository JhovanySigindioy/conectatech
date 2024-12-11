import { Contact, ResourceTech } from "@/interface";
import { initDB } from "./initDB";
import { IDBPDatabase } from "idb";

export const saveDataToIndexedDB = async (storeName: string, data: Contact[] | ResourceTech[]): Promise<void> => {
    try {
        const db: IDBPDatabase<Contact | ResourceTech> = await initDB();
        const transaction = db.transaction(storeName, "readwrite");
        data.forEach((item) => transaction.store.put(item));
        await transaction.done;
    } catch (error) {
        console.error("Error al guardar información en la base de datos, local", error);
        throw error;
    }
}