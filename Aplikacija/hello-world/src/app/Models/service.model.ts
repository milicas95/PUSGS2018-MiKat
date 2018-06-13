import { Vehicle } from '../Models/vehicle.model';
import { Branch } from '../Models/branch.model';

export class Service
{
    id:number;
    name:string;
    logo:string;
    email:string;
    description:string;
    activated:boolean;
    vehicles:Vehicle[];
    branches:Branch[];
}