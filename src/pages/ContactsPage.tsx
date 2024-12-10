import { getContacts } from "@/api";
import { CardContact, InputBrowser } from "@/components";
import { useFetchingData, useInputBrowser } from "@/customHooks";
import { filterBySearchTerm } from "@/helpers";
import { Contact } from "@/interface";
import React, { useMemo } from "react";

export const ContactsPage: React.FC = () => {
    const { inputBrowserValue, handleOnChange } = useInputBrowser();
    const { isLoading, error, data } = useFetchingData(getContacts);

    const filteredContacts: Contact[] = useMemo(() => {
        if (!data) return [];
        return filterBySearchTerm(inputBrowserValue, data, [
            (contact) => contact.fullName,
            (contact) => contact.vehicle.plate,
        ]);

    }, [inputBrowserValue, data]);

    return (
        <div className="fadeIn">
            <InputBrowser id={"search"} placeholder={"Buscar placa ó nombre"} value={inputBrowserValue} onChange={handleOnChange} />
            <div className="flex flex-col justify-center items-center w-full">
                {isLoading && <h1>Carganado...</h1>}

                {error && <h1>Error: {error}</h1>}

                {inputBrowserValue === "" && <img src="/tecnico.svg" alt="Imagen de técnico" />}

                {inputBrowserValue !== "" && filteredContacts.length === 0 && (
                    <div>
                        <h1 className="text-xl text-gray-600 mt-10">No se encontraron resultados...</h1>
                    </div>
                )}

                {inputBrowserValue !== "" && filteredContacts.length > 0 && (
                    filteredContacts.map((contact, index) => (
                        <CardContact key={index} dataContact={contact} />
                    ))
                )}
            </div>
        </div>
    );
};
