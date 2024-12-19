import React, { useMemo } from "react";
import { CardResourceTech, InputBrowser } from "@/components";
import { useInputBrowser, useFetchingData } from "@/customHooks";
import { filterBySearchTerm, selectedPhrase } from "@/helpers";
import { ResourceTech } from "@/interface";
import { Spinner } from "@/components/Spinner";

export const ResourceTechPage: React.FC = () => {
    const { debouncedValue, inputBrowserValue, handleOnChange } = useInputBrowser();
    const { isLoading, error, data } = useFetchingData<ResourceTech>("resources");

    const filteredResources: ResourceTech[] = useMemo(() => {
        if (!data) return [];
        return filterBySearchTerm(debouncedValue, data, [
            (resource) => resource.title,
            (resource) => resource.detail,
        ]);

    }, [debouncedValue, data]);

    const phraseSelected: string = useMemo(() => { return selectedPhrase() }, []);

    return (
        <div className="md:w-[900px] mx-auto my-6 fadeIn">
            <h2 className="text-center text-xl md:text-2xl font-semibold bg-gradient-to-r from-sky-500 to-indigo-700 bg-clip-text text-transparent">
                {phraseSelected}
            </h2>
            <InputBrowser id={"searchResourch"} placeholder={"Buscar solución"} value={inputBrowserValue} onChange={handleOnChange} />
            <div className="flex flex-col items-center px-2">
                {isLoading && <Spinner />}

                {error && <h1>Error: {error}</h1>}

                {debouncedValue !== "" && filteredResources.length === 0 && (
                    <div>
                        <h1 className="text-xl text-red-600 mt-10 font-semibold fadeIn">No se encontraron resultados...</h1>
                    </div>
                )}

                {
                    filteredResources.map((resource) => (
                        <CardResourceTech key={resource.id} data={resource} />
                    ))
                }
            </div>
        </div>
    );
};
