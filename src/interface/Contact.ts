import { Vehicle } from "./Vehicle";

export interface Contact {
    id: string;
    fullName: string;
    position: string;
    contactsNumber: string[];
    vehicle: Vehicle;
    bossName: string;
}