import React, { useMemo } from "react";
import { CardContact, InputBrowser, Spinner } from "@/components";
import { useFetchingData, useInputBrowser } from "@/customHooks";
import { filterBySearchTerm } from "@/helpers";
import { Contact } from "@/interface";

export const ContactsPage: React.FC = () => {
    const { debouncedValue, inputBrowserValue, handleOnChange } = useInputBrowser();
    const { isLoading, error, data } = useFetchingData<Contact>("contacts");

    const filteredContacts: Contact[] = useMemo(() => {
        if (!data) return [];
        return filterBySearchTerm(debouncedValue, data, [
            (contact) => contact.fullName,
            (contact) => contact.vehicle.plate,
        ]);
    }, [debouncedValue, data]); 

    return (
        <div className="fadeIn">
            <InputBrowser id={"search"} placeholder={"Buscar placa ó nombre"} value={inputBrowserValue} onChange={handleOnChange} />
            <div className="flex flex-col justify-center items-center w-full px-2">
                {isLoading && <Spinner />}

                {error && <h1>Error: {error}</h1>}

                {debouncedValue === "" && !isLoading && <img src="/tecnico.svg" alt="Imagen de técnico" className="fadeIn" />}

                {debouncedValue !== "" && filteredContacts.length === 0 && (
                    <div>
                        <h1 className="text-xl text-red-600 mt-10 font-semibold fadeIn">No se encontraron resultados...</h1>
                    </div>
                )}

                {debouncedValue !== "" && filteredContacts.length > 0 && (
                    filteredContacts.map((contact, index) => (
                        <CardContact key={index} dataContact={contact} />
                    ))
                )}
            </div>
        </div>
    );
};
