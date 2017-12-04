import { Component, OnInit } from '@angular/core';
import { PetsService } from '../../services/pets.service';
import { UserService } from '../../services/user.service';
import { PagerService } from '../../services/pager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-med-history',
  templateUrl: './med-history.component.html',
  styleUrls: ['./med-history.component.css']
})
export class MedHistoryComponent implements OnInit {

  private pet:any;
  private pets:any[] = [];
  private errorMsg:string = "";
  private successMsg:string = "";
  private treatments:any[] = [];
  private pagedTreatments:any[] = [];
  private loading:boolean = false;
  private treatment:any;
  private pager:any = {};

  constructor( private _petsService:PetsService, private _router:Router, private _pagerService:PagerService,
               private _userService:UserService ) { }

  ngOnInit() {
    this.getAllPetsForUser();
  }

  getAllPetsForUser(){
    this._petsService.getAllPetsForUser(this._userService.getCurrentUser().id)
    .subscribe( data => {
      this.pets.push(data);
    },
    error => {
      console.log(error.json());
      this.manageError(error);
    });
  }

  treatmentDetail(index){
    this.treatment = this.treatments[index];
  }

  getPetDetails(id){
    console.log(id);
    this.pet = this._petsService.getPetDetails(id);
    this.getPetTreatments();
  }

  getPetTreatments(){
    this.loading = true;
    this.treatments = [];

    this._petsService.getPetTreatments(this.pet.id)
    .subscribe( data => {
      this.loading = false;
      this.treatments.push(data);
      this.setPage(1);
    },
    error => {
      this.loading = false;
      // this.manageError(error);
    });
  }

  setPage(page:number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this._pagerService.getPager(this.treatments.length, page);

    // get current page of items
    this.pagedTreatments = this.treatments.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  manageError(error){
    this.errorMsg = "Error";
    this.successMsg = "";
  }
}
