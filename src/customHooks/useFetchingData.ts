import { getDataFromFirestore } from "@/api";
import { checkData } from "@/api/checkData";
import { getDataFromIndexedDB, saveDataToIndexedDB } from "@/indexedDB";
import { useEffect, useState } from "react";

export const useFetchingData = <T>(nameCollection: string) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<T[] | null>(null);

    useEffect(() => {
        const fetchResources = async () => {
            if (isLoading) return; // Evita llamadas concurrentes
            setIsLoading(true);
            setError(null);
            try {
                checkData();
                // Primero intenta obtener los datos desde IndexedDB
                let dataAsync = await getDataFromIndexedDB<T>(nameCollection);

                if (!dataAsync || dataAsync.length === 0) {
                    // Si no hay datos locales, obtén desde Firestore
                    dataAsync = await getDataFromFirestore<T>(nameCollection);
                    // Guarda los datos en IndexedDB
                    await saveDataToIndexedDB<T>(nameCollection, dataAsync);
                }

                setData(dataAsync);
            } catch (e) {
                setError(e instanceof Error ? e.message : String(e));
            } finally {
                setIsLoading(false);
            }
        };

        fetchResources();
    }, [nameCollection]); // Incluye nameCollection como dependencia para evitar problemas si cambia

    return { isLoading, error, data };
};
