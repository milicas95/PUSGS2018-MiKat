import { Service } from "./service.model";

export class Vehicle {
    Id: number;
    Model: string;
    Manufactor: string;
    Year: string;
    Photo: string;
    Description: string;
    Unavailable: boolean;
    Service: Service;
    ServiceID: string;
    PricePerHour:string;
}