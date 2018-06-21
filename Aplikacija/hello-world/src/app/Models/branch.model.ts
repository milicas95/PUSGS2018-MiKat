import { Reservation } from "./reservation.model";
import { Service } from "src/app/Models/service.model";

export class Branch {
    Id: number;
    Address: string;
    Latitude: string;
    Longtitude: string;
    Service: Service;
    Logo:string;
}