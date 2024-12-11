import { Contact, ResourceTech } from "@/interface";
import { IDBPDatabase, openDB } from "idb";

const DB_NAME: string = "ConectaTechDB";
const DB_VERSION: number = 1;

export const initDB = async ():Promise<IDBPDatabase<Contact | ResourceTech>> => {
    return openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains("contacts")) {
                db.createObjectStore("contacts", { keyPath: "id" });
            }
            if (!db.objectStoreNames.contains("resources")) {
                db.createObjectStore("resources", { keyPath: "id" });
            }
        }
    });
}