import { TypesResourceTech } from "@/types";

export interface ResourceTech {
    id: number | string;
    typeResource: TypesResourceTech;
    urlResource: string;
    title: string;
    detail: string;
}