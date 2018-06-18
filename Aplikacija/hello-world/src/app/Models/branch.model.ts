import { Reservation } from "./reservation.model";
import { Service } from "src/app/Models/service.model";

export class Branch {
    BranchID: string;
    Address: string;
    Latitude: string;
    Longtitude: string;
    Service: Service;
    SourceForReservations: Reservation[];
    DestinationForReservations: Reservation[];
}