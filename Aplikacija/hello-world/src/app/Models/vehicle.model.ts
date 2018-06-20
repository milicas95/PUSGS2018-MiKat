import { Service } from "./service.model";

export class Vehicle {
    Id: string;
    Model: string;
    Manufactor: string;
    Year: string;
    Photo: string;
    Description: string;
    Available: boolean;
    Service: Service;
    ServiceID: string;
}