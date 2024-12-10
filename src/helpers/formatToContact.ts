import { ContactNotId } from "@/types";

// Función de mapeo flexible
export const formatToContact = (arrayObjects: any): ContactNotId[] => {
    return arrayObjects.map((obj: any) => {
        // Mapeo dinámico basado en las propiedades del objeto
        return {
            fullName: obj["NOMBRE"], // Valor predeterminado vacío si no existe
            position: obj["CARGO"],
            contactsNumber: [String(obj["NUMERO_COORPO"]), String(obj["NUMERO_PERSONAL"])],
            vehicle: {
                type: obj["VEHICULO"],
                plate: obj["PLACA"],
            },
            bossName: obj["JEFE_DIRECTO"],
        };
    });
};
