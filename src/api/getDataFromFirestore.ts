import { appFirebase } from "./firebaseConection";
import { collection, getDocs, getFirestore } from "firebase/firestore";

// Función genérica para obtener datos de Firestore con un tipo específico
export const getDataFromFirestore = async <T>(storeName: string): Promise<T[]> => {
    console.log("los datos estan siendo obtenidos desde FIRESTORE");
    const db = getFirestore(appFirebase);
    try {
        const res = await getDocs(collection(db, storeName));
        if (res.docs) {
            const data: T[] = res.docs.map(doc => {
                const docData = doc.data();
                return {
                    id: doc.id,
                    ...docData,
                } as T; // Aquí, 'docData' se tipa según el tipo genérico T
            });
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error al obtener los datos de Firestore:", error);
        throw error;
    }
};
