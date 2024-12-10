import { ResourceTechNotId } from "@/types";

// Función de mapeo flexible
export const formatToResource = (arrayObjects: any): ResourceTechNotId[] => {
    return arrayObjects.map((obj: any) => {
        // Mapeo dinámico basado en las propiedades del objeto
        return {
            typeResource: obj["TIPO_RECURSO"],
            title: obj["TITULO"],
            detail: obj["DESCRIPCION"],
            urlResource: obj["URL_RECURSO"],
        };
    });
};
