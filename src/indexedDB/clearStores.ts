import { getDataFromFirestore } from "@/api";
import { openDB } from "idb";

import Swal from "sweetalert2";
import { saveDataToIndexedDB } from "./saveDataToIndexedDB";
import { Contact, ResourceTech } from "@/interface";

const DB_NAME = "ConectaTechDB";

export const clearStores = async (storesToClear: string[]): Promise<string> => {

    try {
        Swal.fire({
            title: "Actualizando base de datos",
            text: "Por favor espere...",
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        // Abrir la base de datos
        const db = await openDB(DB_NAME);

        // Vaciar los stores
        for (const storeName of storesToClear) {
            if (db.objectStoreNames.contains(storeName)) {
                const tx = db.transaction(storeName, "readwrite");
                const store = tx.objectStore(storeName);
                await store.clear(); // Vacía el contenido del store
                await tx.done;
            }
        }
        const contacts: Contact[] = await getDataFromFirestore("contacts");
        const resources: ResourceTech[] = await getDataFromFirestore("resources");

        await saveDataToIndexedDB("contacts", contacts);
        await saveDataToIndexedDB("resources", resources);

        Swal.fire({
            title: "Base de datos actilzada",
            text: "La base de datos se actualizo correctamente.",
            icon: "success",
        });
        return "ok"
    } catch (error) {
        console.error("Error al actualizar la base de datos:", error);
        Swal.fire({
            title: "Error al actualizar la base de datos",
            text: "Por favor, vuelve a intentarlo más tarde.",
            icon: "error",
        });
        return "fail"
    }
};
