import { Data } from "@angular/router/src/config";
import { Reservation } from "src/app/Models/reservation.model";

export class User
{
    Id:number;
    Name:string;
    LastName:string;
    FullName:string;
    Email:string;
    Password:string;
    Birthday:Data;
    Rents:Reservation[];
    PersonalDocument:string;
    Confirmation:string;
    Role:boolean;
}