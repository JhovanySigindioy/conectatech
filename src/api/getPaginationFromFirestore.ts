import { appFirebase } from "./firebaseConection";
import { collection, getDocs, getFirestore, query, orderBy, limit, startAfter, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

// Función para obtener datos de Firestore con paginación
export const getPaginationFromFirestore = async <T>(
    storeName: string,
    lastVisibleDoc?: T
): Promise<{ data: T[]; lastVisible: QueryDocumentSnapshot<DocumentData> | null }> => {
    const db = getFirestore(appFirebase);

    try {
        // Crear la consulta de Firestore
        let dataQuery = query(
            collection(db, storeName), // Nombre de la colección
            orderBy("createAt"), // Ordenar por el campo `createAt` (o el campo que elijas)
            limit(5) // Limitar la cantidad de documentos a 5
        );

        // Si tenemos el último documento de la página anterior, usamos `startAfter` para paginar
        if (lastVisibleDoc) {
            dataQuery = query(dataQuery, startAfter(lastVisibleDoc)); // Comenzar después del último documento
        }

        const res = await getDocs(dataQuery);

        // Verificar si se obtuvieron documentos
        const data: T[] = res.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        } as T));

        // Obtener el último documento de esta consulta
        const lastVisible = res.docs.length > 0 ? res.docs[res.docs.length - 1] : null;

        return { data, lastVisible }; // Retornar los datos y el último documento
    } catch (error) {
        console.error("Error al obtener los datos de Firestore:", error);
        throw error;
    }
};
