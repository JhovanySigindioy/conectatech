import React, { useMemo } from "react";
import { getResources } from "@/api";
import { CardResourceTech, InputBrowser } from "@/components";
import { useInputBrowser, useFetchingData } from "@/customHooks";
import { filterBySearchTerm, selectedPhrase } from "@/helpers";
import { ResourceTech } from "@/interface";

export const ResourceTechPage: React.FC = () => {
    const { inputBrowserValue, handleOnChange } = useInputBrowser();
    const { isLoading, error, data } = useFetchingData(getResources);

    const filteredResources: ResourceTech[] = useMemo(() => {
        if (!data) return [];
        return filterBySearchTerm(inputBrowserValue, data, [
            (resource) => resource.title,
            (resource) => resource.detail,
        ]);

    }, [inputBrowserValue, data]);

    const phraseSelected: string = useMemo(() => { return selectedPhrase() }, []);

    return (
        <div className="md:w-[900px] mx-auto my-6 fadeIn">
            <h2 className="text-center text-xl md:text-2xl font-semibold bg-gradient-to-r from-sky-500 to-indigo-700 bg-clip-text text-transparent">
                {phraseSelected}
            </h2>

            <InputBrowser id={"searchResourch"} placeholder={"Buscar solución"} value={inputBrowserValue} onChange={handleOnChange} />
            <div className="flex flex-col items-center px-2">
                {
                    isLoading ? (<h1>Cargando...</h1>)
                        : error ? (<h1>Error: {error}</h1>)
                            : filteredResources.map((resource) => (
                                <CardResourceTech key={resource.id} data={resource} />
                            ))
                }
            </div>
        </div>
    );
};
