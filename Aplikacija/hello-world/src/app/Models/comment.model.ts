import { Service } from "src/app/Models/service.model";
import { User } from "src/app/Models/user.model";

export class Comment
{
    Id:number;
    Description:string;
    Grade:number;
    Service:Service;
    User:User;
}