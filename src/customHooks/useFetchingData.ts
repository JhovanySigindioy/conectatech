
import { saveDataToIndexedDB } from "@/localDB";
import { Contact } from "lucide-react";
import { useEffect, useState } from "react";

export const useFetchingData = <T>(getDataFirestore: () => Promise<T>) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<T | null>(null); //tipo de datos que va  a manejrar
    let dataAsync = null;
    useEffect(() => {
        const fetchResources = async () => {
            setIsLoading(true);
            setError(null); // Resetear el error antes de hacer una nueva consulta
            try {
                dataAsync = null
                if (!dataAsync) {
                    dataAsync = await getDataFirestore();
                    // saveDataToIndexedDB();
                }
                setData(dataAsync);
            } catch (e) {
                setError(
                    e instanceof Error ? e.message : e as string
                ); // Convertir el error a un mensaje legible
            } finally {
                setIsLoading(false);
            }
        };

        fetchResources();
    }, []);

    return {
        isLoading,
        error,
        data,
    }
};
