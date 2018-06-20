import { Data } from "@angular/router/src/config";
import { Branch } from "src/app/Models/branch.model";
import { User } from "src/app/Models/user.model";
import { Vehicle } from "src/app/Models/vehicle.model";

export class Reservation {
    Id: number;
    Start: Data;
    End: Data;
    Used: boolean;
    User: User;
    BeginBranch: string;
    EndBranch: string;
    Vehicle: Vehicle;
}