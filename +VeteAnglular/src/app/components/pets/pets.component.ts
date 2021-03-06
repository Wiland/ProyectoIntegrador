import { Component, OnInit } from '@angular/core';
import { PetsService } from '../../services/pets.service';
import { UserService } from '../../services/user.service';
import { PagerService } from '../../services/pager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {
  private pet:any;
  private pets:any[] = [];
  private pagedPets:any[] = [];
  private errorMsg:string = "";
  private successMsg:string = "";
  private pager:any = {};
  private loading:boolean = false;
  private create:boolean = false;

  constructor( private _petsService:PetsService, private _router:Router, private _pagerService:PagerService,
               private _userService:UserService ) { }

  ngOnInit() {
    this.getAllPetsForUser();
  }

  getAllPetsForUser(){
    this.loading = true;
    this._petsService.getAllPetsForUser(this._userService.getCurrentUser().id)
    .subscribe( data => {
      this.pets.push(data);
      this.loading = false;
      console.log(this.pets);
      this.setPage(1);
    },
    error => {
      this.loading = false;
      this.manageError(error);
    });
  }

  petDetails(id){
    if (id === -1) {
      this.create = true;
      this.pet = this._petsService.getEmptyPet();
    } else {
      this.create = false;
      this.pet = this._petsService.getPetDetails(id);
    }
  }

  createPet(){
    this.pet.owner.id = this._userService.getCurrentUser().id;
    this.pet.owner.name = this._userService.getCurrentUser().name;

    this._petsService.savePet(this.pet).subscribe(
      data => {
        console.log(data);
        this.successMsg = "Datos grabados correctamente";
        this.errorMsg = "";
        this.getAllPetsForUser();
        document.getElementById("closeModal").click();
        this.pet = {};
      },
      error => {
        console.log(error);
        this.manageError(error);
      });
  }

  updatePet(){
    this._petsService.editPet(this.pet).subscribe(
      data => {
        this.successMsg = "Datos grabados correctamente";
        this.errorMsg = "";
        this.getAllPetsForUser();
        this.pet = {};
      },
      error => {
        this.manageError(error);
      });
  }

  deletePet(){
    this._petsService.deletePet(this.pet.id).subscribe(
      data => {
        this.successMsg = "Datos grabados correctamente";
        this.errorMsg = "";
        this.getAllPetsForUser();
        this.pet = {};
      },
      error => {
        this.manageError(error);
      });
  }

  setPage(page:number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this._pagerService.getPager(this.pets.length, page);

    // get current page of items
    this.pagedPets = this.pets.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  manageError(error){
    this.errorMsg = "Error";
    this.successMsg = "";
  }

}
