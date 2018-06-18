import { Vehicle } from '../Models/vehicle.model';
import { Branch } from '../Models/branch.model';

export class Service
{
    Id:number;
    Name:string;
    Logo:string;
    Email:string;
    Description:string;
    Activated:boolean;
    Vehicles:Vehicle[];
    Branches:Branch[];
    // dodati listu komentara
}