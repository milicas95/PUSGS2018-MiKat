import { Data } from "@angular/router/src/config";
import { Reservation } from "src/app/Models/reservation.model";

export class User
{
    Name:string;
    LastName:string;
    Email:string;
    Password:string;
    Birthday:Data;
    Rents:Reservation[];
    Photo:string;
    Confirmation:string;
}