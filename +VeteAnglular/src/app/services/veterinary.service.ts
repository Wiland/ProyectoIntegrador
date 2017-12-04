import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ServiceConfig } from "../services/serviceConfig";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class VeterinaryService {
  private veterinaryArray:any[] = [];
  private veterinary:any[] = [];
  private result:any;

  constructor( private http:Http, private _serviceConfig:ServiceConfig ) {
    this.veterinaryArray = [{
        id: 1,
        name: "Huellitas",
        email: "huellitas@gmail.com",
        address: "Cra 50 Nº 23-10",
        schedule: {
          id: 1,
          schedule: [{
            day: 1,
            openingTime: "08:00:00",
            closingTime: "19:00:00"
          },
          {
            day: 2,
            openingTime: "08:00:00",
            closingTime: "19:00:00"
          },
          {
            day: 3,
            openingTime: "08:00:00",
            closingTime: "19:00:00"
          },
          {
            day: 4,
            openingTime: "08:00:00",
            closingTime: "19:00:00"
          },
          {
            day: 5,
            openingTime: "08:00:00",
            closingTime: "19:00:00"
          }]
        },
        geographicLocation: "Wilmer",
        active: true
      },
      {
        id: 2,
        name: "MiVete",
        email: "mivete@gmail.com",
        address: "Cra 30 Nº 14-10",
        schedule: {
          id: 1,
          schedule: [{
            day: 1,
            openingTime: "08:00:00",
            closingTime: "19:00:00"
          },
          {
            day: 2,
            openingTime: "08:00:00",
            closingTime: "19:00:00"
          },
          {
            day: 3,
            openingTime: "08:00:00",
            closingTime: "19:00:00"
          },
          {
            day: 4,
            openingTime: "08:00:00",
            closingTime: "19:00:00"
          },
          {
            day: 5,
            openingTime: "08:00:00",
            closingTime: "19:00:00"
          }]
        },
        geographicLocation: "",
        active: true
    }];
  }

  getEmptyVeterinary(){
    return {
      id: 0,
      name: "",
      email: "",
      address: "",
      schedule: { },
      geographicLocation: "",
      active: true
    }
  }

  getAllVeterinary(){
    let url = `${ this._serviceConfig.BASE_SERVICE_URL }/veterinary`;
    let headers = new Headers();

    headers.append("Accept", "application/json" );

    return this.http.get( url, { headers } )
      .map( res => {
        this.veterinary = res.json();
        return this.veterinary;
      })
      .catch( error => {
        return this.veterinaryArray;
      });
  }

  getVeterinaryDetails(id){
    return this.veterinary[id];
  }

  saveVeterinary(veterinary){
    let url = `${ this._serviceConfig.BASE_SERVICE_URL }/veterinary`;
    let headers = new Headers();

    headers.append("Accept", "application/json" );

    return this.http.post( url, veterinary, { headers: headers } )
      .map( res => {
        this.result = res.json();
        return this.result;
      })
      .catch( (error:any) => {
        veterinary.id = this.veterinaryArray.length + 1;
        this.veterinaryArray.push(veterinary);
        this.result = { message: "Creado exitosamente" };
        return error;
      });
  }

  editVeterinary(veterinary){
    let url = `${ this._serviceConfig.BASE_SERVICE_URL }/veterinary/${ veterinary.id }`;
    let headers = new Headers();

    headers.append("Accept", "application/json" );

    return this.http.put( url, veterinary, { headers: headers } )
      .map( res => {
        this.result = res.json();
        return this.result;
      })
      .catch( error => {
        for (var i = 0; i < this.veterinary.length; i++) {
          if (this.veterinary[i].id === veterinary.id) {
            this.veterinary[i] = veterinary;
            break;
          }
        }
        this.result = { message: "Actualizado exitosamente" };
        return this.result;
      });
  }

  deleteVeterinary(id){
    let url = `${ this._serviceConfig.BASE_SERVICE_URL }/veterinary/${ id }`;
    let headers = new Headers();

    headers.append("Accept", "application/json" );

    return this.http.delete( url, { headers } )
      .map( res => {
        this.result = res.json();
        return this.result;
      })
      .catch( error => {
        for (var i = 0; i < this.veterinary.length; i++) {
          if (this.veterinary[i].id === id) {
            this.veterinary.splice(i,1);
            break;
          }
        }
        this.result = { message: "Eliminado exitosamente" };
        return this.result;
      });
  }
}
