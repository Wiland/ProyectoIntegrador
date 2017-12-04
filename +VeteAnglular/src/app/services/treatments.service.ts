import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ServiceConfig } from "../services/serviceConfig";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TreatmentsService {
  treatments:any[] = [];
  result:any;

  constructor( private http:Http, private _serviceConfig:ServiceConfig ) {
    this.treatments = [{
      id: 1,
      accessCode: "JDHHH1",
      dateTime: "2017-09-11 15:00:00",
      name: "Baño",
      description: "Baño",
      active: true
    },
    {
      id: 2,
      accessCode: "JDHHH2",
      dateTime: "2017-10-11 15:00:00",
      name: "Baño",
      description: "Baño",
      active: true
    },
    {
      id: 3,
      accessCode: "JDHHH3",
      dateTime: "2017-11-11 15:00:00",
      name: "Baño",
      description: "Baño",
      active: true
    },
    {
      id: 4,
      accessCode: "JDHHD1",
      dateTime: "2017-01-12 15:00:00",
      name: "Baño",
      description: "Baño",
      active: true
    }
  ];
  }

  getAllTreatments(){
    let url = `${ this._serviceConfig.BASE_SERVICE_URL }/treatments`;
    let headers = new Headers();

    headers.append("Accept", "application/json" );

    return this.http.get( url, { headers } )
      .map( res => {
        this.treatments = res.json();
        return this.treatments;
      })
      .catch( error => {
        console.log(this.treatments);
        return this.treatments;
      });
  }

  getTreatmentDetails(id){
    return this.treatments[id];
  }

  saveTreatment(treatment){
    let url = `${ this._serviceConfig.BASE_SERVICE_URL }/treatments`;
    let headers = new Headers();

    headers.append("Accept", "application/json" );

    return this.http.post( url, treatment, { headers: headers } )
      .map( res => {
        this.result = res.json();
        return this.result;
      })
      .catch( error => {
        this.treatments.push(treatment);
        this.result = { message: "Creado exitosamente" };
        return this.result;
      });
  }

  editTreatment(treatment){
    let url = `${ this._serviceConfig.BASE_SERVICE_URL }/game/${ treatment.id }`;
    let headers = new Headers();

    headers.append("Accept", "application/json" );

    return this.http.put( url, treatment, { headers: headers } )
      .map( res => {
        this.result = res.json();
        return this.result;
      })
      .catch( error => {
        for (var i = 0; i < this.treatments.length; i++) {
          if (this.treatments[i].id === treatment.id) {
            this.treatments[i] = treatment;
            break;
          }
        }
        this.result = { message: "Actualizado exitosamente" };
        return this.result;
      });
  }

  deleteTreatment(id){
    let url = `${ this._serviceConfig.BASE_SERVICE_URL }/treatments/${ id }`;
    let headers = new Headers();

    headers.append("Accept", "application/json" );

    return this.http.delete( url, { headers } )
      .map( res => {
        this.result = res.json();
        return this.result;
      })
      .catch( error => {
        for (var i = 0; i < this.treatments.length; i++) {
          if (this.treatments[i].id === id) {
            this.treatments.splice(i,1);
            break;
          }
        }
        this.result = { message: "Eliminado exitosamente" };
        return this.result;
      });
  }

}
