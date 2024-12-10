import { addDoc, collection, getFirestore } from "firebase/firestore";
import { appFirebase } from "./firebaseConection";
import { ContactNotId, ResourceTechNotId } from "@/types";

export const uploadFirestore = async (jsonData: ContactNotId[] | ResourceTechNotId[], nameCollection: string): Promise<void> => {

    console.log(jsonData,"_____",nameCollection);

    if (jsonData.length === 0) {
        throw new Error("No hay datos para subir.");
    }

    const db = getFirestore(appFirebase);
    const contactsCollection = collection(db, nameCollection);

    for (const data of jsonData) {
        await addDoc(contactsCollection, data);
    }
};