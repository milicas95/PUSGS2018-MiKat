import { Service } from "./service.model";

export class Vehicle {
    Id: string;
    Model: string;
    Manufacturer: string;
    Year: string;
    Photo: string;
    Description: string;
    Available: string;
    Service: Service;
    ServiceID: string;
}