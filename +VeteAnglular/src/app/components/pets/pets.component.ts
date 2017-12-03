import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {
  pet:any;
  pets:any[] = [];

  constructor() { }

  ngOnInit() {
    this.pets = [{
      name: "Pupi",
      kind: "Perro",
      breed: "Golden Retriever",
      owner: {
        id: "idOwner",
        name: "Wilmer"
      },
      birthDate: "2014-10-02",
      acquisitionDate: "2014-10-02",
      photo: "/assets/img/perro.jpg",
      active: true
    },
    {
      name: "Fredy",
      kind: "Perro",
      breed: "Golden Retriever",
      owner: {
        id: "idOwner2",
        name: "Rolo"
      },
      birthDate: "2015-10-02",
      acquisitionDate: "2015-10-02",
      photo: "/assets/img/noimage.png",
      active: true
    }]
  }

  getPetDetails(id){
    console.log(id)
    this.pet = this.pets[id];
    console.log(this.pet);
  }

}
