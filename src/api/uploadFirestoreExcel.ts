import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";
import { appFirebase } from "./firebaseConection";
import { ContactNotId, ResourceTechNotId } from "@/types";

export const uploadFirestore = async (jsonData: ContactNotId[] | ResourceTechNotId[], nameCollection: string): Promise<void> => {

    if (jsonData.length === 0) {
        throw new Error("No hay datos para subir.");
    }

    const db = getFirestore(appFirebase);
    const contactsCollection = collection(db, nameCollection);

    // Modificamos cada objeto para agregar el campo createAt
    const dataWithTimestamp = jsonData.map((data) => ({
        ...data,
        createAt: serverTimestamp(), // Agregar la fecha del cliente o usar serverTimestamp si lo prefieres
    }));

    // Subimos los datos con el campo createAt ya agregado
    for (const data of dataWithTimestamp) {
        console.log(data);  
        await addDoc(contactsCollection, data);
    }
};
