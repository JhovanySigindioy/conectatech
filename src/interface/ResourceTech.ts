import { TypesResourceTech } from "@/types";
import { Timestamp } from "firebase/firestore";

export interface ResourceTech {
    id: number | string;
    typeResource: TypesResourceTech;
    urlResource: string;
    title: string;
    detail: string;
    createAt: Timestamp;
}