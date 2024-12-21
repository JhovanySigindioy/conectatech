import { appFirebase } from "./firebaseConection";
import { collection, getDocs, getFirestore } from "firebase/firestore";

// Función genérica para obtener datos de Firestore con un tipo específico
export const getDataFromFirestore = async <T>(storeName: string): Promise<T[]> => {
    const db = getFirestore(appFirebase);
    try {
        const res = await getDocs(collection(db, storeName));
        if (res.docs) {
            const data: T[] = res.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data(),//Etamos desestructurando cada documento(en este contexto es un objeto)
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

