import { Reservation } from "./reservation.model";

export class Branch {
    BranchID: string;
    Address: string;
    Latitude: string;
    Longtitude: string;
    ServiceID: string;
    SourceForReservations: Reservation[];
    DestinationForReservations: Reservation[];
}