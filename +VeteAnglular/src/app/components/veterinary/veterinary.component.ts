import { Component, OnInit } from '@angular/core';
import { VeterinaryService } from '../../services/veterinary.service';
import { UserService } from '../../services/user.service';
import { PagerService } from '../../services/pager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-veterinary',
  templateUrl: './veterinary.component.html',
  styleUrls: ['./veterinary.component.css']
})
export class VeterinaryComponent implements OnInit {
  private veterinary:any;
  private veterinaryList:any[] = [];
  private pagedVeterinary:any[] = [];
  private errorMsg:string = "";
  private successMsg:string = "";
  private pager:any = {};
  private loading:boolean = false;
  private create:boolean = false;

  constructor( private _veterinaryListService:VeterinaryService, private _router:Router, private _pagerService:PagerService,
               private _userService:UserService ) { }

  ngOnInit() {
    this.getAllVeterinary();
  }

  getAllVeterinary(){
    this.loading = true;
    this._veterinaryListService.getAllVeterinary()
    .subscribe( data => {
      this.veterinaryList.push(data);
      this.loading = false;
      console.log(this.veterinaryList);
      this.setPage(1);
    },
    error => {
      this.loading = false;
      this.manageError(error);
    });
  }

  veterinaryListDetails(id){
    if (id === -1) {
      this.create = true;
      this.veterinary = this._veterinaryListService.getEmptyVeterinary();
    } else {
      this.create = false;
      this.veterinary = this._veterinaryListService.getVeterinaryDetails(id);
    }
  }

  createVeterinary(){
    this._veterinaryListService.saveVeterinary(this.veterinaryList).subscribe(
      data => {
        console.log(data);
        this.successMsg = "Datos grabados correctamente";
        this.errorMsg = "";
        this.getAllVeterinary();
        document.getElementById("closeModal").click();
        this.veterinary = {};
      },
      error => {
        console.log(error);
        this.manageError(error);
      });
  }

  updateVeterinary(){
    this._veterinaryListService.editVeterinary(this.veterinaryList).subscribe(
      data => {
        this.successMsg = "Datos grabados correctamente";
        this.errorMsg = "";
        this.getAllVeterinary();
        this.veterinary = {};
      },
      error => {
        this.manageError(error);
      });
  }

  deleteVeterinary(){
    this._veterinaryListService.deleteVeterinary(this.veterinary.id).subscribe(
      data => {
        this.successMsg = "Datos grabados correctamente";
        this.errorMsg = "";
        this.getAllVeterinary();
        this.veterinary = {};
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
    this.pager = this._pagerService.getPager(this.veterinaryList.length, page);

    // get current page of items
    this.pagedVeterinary = this.veterinaryList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  manageError(error){
    this.errorMsg = "Error";
    this.successMsg = "";
  }
}
