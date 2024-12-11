
import { Contact } from "@/interface";
import { appFirebase } from "./firebaseConection";
import { collection, getFirestore, getDocs } from "firebase/firestore";

export const getContacts = async (): Promise<Contact[]> => {
    const db = getFirestore(appFirebase);
    try {
        const res = await getDocs(collection(db, "contacts"));

        if (res.docs) {
            const data: Contact[] = res.docs.map(doc => ({
                id: doc.id,
                fullName: doc.data().fullName as string,
                position: doc.data().position as string,
                contactsNumber: doc.data().contactsNumber as string[],
                vehicle: {
                    type: doc.data().vehicle.type as string,
                    plate: doc.data().vehicle.plate as string,
                },
                bossName: doc.data().bossName as string,
            }));
            return data;
        }
        return [];
    } catch (error) {
        console.error(error);
        throw error
    }
}
