import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  private currentUser:any = {};

  constructor() {
    this.currentUser = {
      id: 1,
      name: "Wilmer"
    }
  }

  getCurrentUser(){
    return this.currentUser;
  }

}
