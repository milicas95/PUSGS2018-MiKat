import { Reservation } from "./reservation.model";
import { Service } from "src/app/Models/service.model";

export class Branch {
    Id: number;
    Address: string;
    Latitude: number;
    Longitude: number;
    Service: Service;
    Logo:string;
}