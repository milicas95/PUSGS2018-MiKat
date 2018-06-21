import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {

  constructor() { }

  public static isAdmin():boolean
  {
      return localStorage.role == "Admin";
  }

  public static isManager():boolean
  {
      return localStorage.role == "Manager";
  }

  public static isAppUser():boolean
  {
      return localStorage.role == "AppUser";
  }

  public static isntLoggedOn():boolean
  {
      return localStorage.role == "null";
  }
}
