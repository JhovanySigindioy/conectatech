import { collection, getFirestore, getDocs } from "firebase/firestore";
import { appFirebase } from "./firebaseConection";
import { ResourceTech } from "@/interface";
import { TypesResourceTech } from "@/types";

export const getResources = async (): Promise<ResourceTech[]> => {
    const db = getFirestore(appFirebase);
    try {
        const res = await getDocs(collection(db, "resources"));

        if (res.docs) {
            return res.docs.map(doc => ({
                id: doc.id,
                typeResource: (doc.data().typeResource === "video" ? "video" : "doc") as TypesResourceTech,
                urlResource: doc.data().urlResource as string,
                title: doc.data().title as string,
                detail: doc.data().detail as string,
            }));
        }
        return [];
    } catch (error) {
        console.error("Error al obetener datos desde firestore:", error);
        throw error;
    }
};