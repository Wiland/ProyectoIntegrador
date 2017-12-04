import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ServiceConfig } from "../services/serviceConfig";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PetsService {
  private petsArray:any[] = [];
  private pets:any[] = [];
  private result:any;
  private treatments:any[] = [];
  private treatmentsArray:any[] = [];

  constructor( private http:Http, private _serviceConfig:ServiceConfig ) {
    this.petsArray = [{
      id: 1,
      name: "Pupi",
      kind: "Perro",
      breed: "Golden Retriever",
      owner: {
        id: 1,
        name: "Wilmer"
      },
      birthDate: "2014-10-02",
      acquisitionDate: "2014-10-02",
      photo: "/assets/img/perro.jpg",
      active: true
    },
    {
      id: 2,
      name: "Fredy",
      kind: "Perro",
      breed: "Golden Retriever",
      owner: {
        id: 1,
        name: "Wilmer"
      },
      birthDate: "2015-10-02",
      acquisitionDate: "2015-10-02",
      photo: "/assets/img/noimage.png",
      active: true
    },
    {
      id: 3,
      name: "Wanda",
      kind: "Perro",
      breed: "Pomerania",
      owner: {
        id: 2,
        name: "Juan Camilo Giraldo"
      },
      birthDate: "2017-10-15",
      acquisitionDate: "2017-10-15",
      photo: "/assets/img/wanda.jpg",
      active: true
    }];

    this.treatmentsArray = [
      {
        id: 1,
        accessCode: {
          id: "JDHHH1",
          vetId: 1,
          vetName: "Veterinaria 1",
          petId: 1
        },
        dateTime: "2017-09-11 15:00:00",
        name: "Intravenosa",
        symptom: "Deshidatación",
        description: "Se aplicó intravenosa para aumentar la cantidad de fluído en el cuerpo de Pupi",
        active: true
      },
      {
        id: 2,
        accessCode: {
          id: "JDHHH2",
          vetId: 2,
          vetName: "Veterinaria 2",
          petId: 1
        },
        dateTime: "2017-10-11 15:00:00",
        name: "Aplicación de cremas cutáneas",
        symptom: "Dermatitis",
        description: "Se le aplicó crema especial para la enfermedad en la piel",
        active: true
      },
      {
        id: 3,
        accessCode: {
          id: "JDHHH3",
          vetId: 1,
          vetName: "Veterinaria 1",
          petId: 1
        },
        dateTime: "2017-11-11 15:00:00",
        name: "Antibióticos",
        symptom: "Infección Urinaria (Pendinitis)",
        description: "Se le administraton antibióticos a Pupi para combatir las bacterias",
        active: true
      },
      {
        id: 4,
        accessCode: {
          id: "JDHHD1",
          vetId: 1,
          vetName: "Veterinaria 1",
          petId: 2
        },
        dateTime: "2017-01-12 15:00:00",
        name: "Castración",
        symptom: "Ninguno",
        description: "Se realizó procedimiento para evitar la reproducción de Fredy y la producción de hormonas",
        active: true
      }
    ];
  }

  getEmptyPet(){
    return {
      id: 0,
      name: "",
      kind: "",
      breed: "",
      owner: {
        id: 0,
        name: ""
      },
      birthDate: "",
      acquisitionDate: "",
      photo: "/assets/img/noimage.png",
      active: false
    }
  }

  getAllPets(){
    let url = `${ this._serviceConfig.BASE_SERVICE_URL }/pets`;
    let headers = new Headers();

    headers.append("Accept", "application/json" );

    return this.http.get( url, { headers } )
      .map( res => {
        this.pets = res.json();
        return this.pets;
      })
      .catch( error => {
        return this.petsArray;
      });
  }

  getAllPetsForUser(userId){
    this.pets = [];
    let url = `${ this._serviceConfig.BASE_SERVICE_URL }/users/${ userId }/pets`;
    let headers = new Headers();

    headers.append("Accept", "application/json" );

    return this.http.get( url, { headers } )
      .map( res => {
        this.pets = res.json();
        return this.pets;
      })
      .catch( error => {
        for (var i = 0; i < this.petsArray.length; i++) {
          if (this.petsArray[i].owner.id === userId) {
            this.pets.push(this.petsArray[i]);
          }
        }
        if (this.pets.length == 0) {
          console.log(error);
          return error;
        }
        return this.pets;
      });
  }

  getPetTreatments(petId:number){
    this.treatments = [];
    let url = `${ this._serviceConfig.BASE_SERVICE_URL }/pets/${ petId }/treatments`;
    let headers = new Headers();

    headers.append("Accept", "application/json" );

    return this.http.get( url, { headers } )
      .map( res => {
        this.treatments = res.json();
        return this.treatments;
      })
      .catch( error => {
        for (var i = 0; i < this.treatmentsArray.length; i++) {
          if (this.treatmentsArray[i].accessCode.petId === petId) {
            this.treatments.push(this.treatmentsArray[i]);
          }
        }
        if (this.treatments.length == 0) {
          console.log(error);
          return error;
        }
        return this.treatments;
      });
  }

  getPetDetails(id){
    return this.pets[id];
  }

  savePet(pet){
    let url = `${ this._serviceConfig.BASE_SERVICE_URL }/pets`;
    let headers = new Headers();

    headers.append("Accept", "application/json" );

    return this.http.post( url, pet, { headers: headers } )
      .map( res => {
        this.result = res.json();
        return this.result;
      })
      .catch( (error:any) => {
        pet.id = this.petsArray.length + 1;
        this.petsArray.push(pet);
        this.result = { message: "Creado exitosamente" };
        return error;
      });
  }

  editPet(pet){
    let url = `${ this._serviceConfig.BASE_SERVICE_URL }/pets/${ pet.id }`;
    let headers = new Headers();

    headers.append("Accept", "application/json" );

    return this.http.put( url, pet, { headers: headers } )
      .map( res => {
        this.result = res.json();
        return this.result;
      })
      .catch( error => {
        for (var i = 0; i < this.pets.length; i++) {
          if (this.pets[i].id === pet.id) {
            this.pets[i] = pet;
            break;
          }
        }
        this.result = { message: "Actualizado exitosamente" };
        return this.result;
      });
  }

  deletePet(id){
    let url = `${ this._serviceConfig.BASE_SERVICE_URL }/pets/${ id }`;
    let headers = new Headers();

    headers.append("Accept", "application/json" );

    return this.http.delete( url, { headers } )
      .map( res => {
        this.result = res.json();
        return this.result;
      })
      .catch( error => {
        for (var i = 0; i < this.pets.length; i++) {
          if (this.pets[i].id === id) {
            this.pets.splice(i,1);
            break;
          }
        }
        this.result = { message: "Eliminado exitosamente" };
        return this.result;
      });
  }

}
