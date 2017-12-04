import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Utilities for services and forms
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

//Routes
import { APP_ROUTING } from "./app.routes";

//Services
import { PetsService } from './services/pets.service';
import { ServiceConfig } from './services/serviceConfig';
import { PagerService } from './services/pager.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { VetLocationComponent } from './components/vet-location/vet-location.component';
import { PetsComponent } from './components/pets/pets.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    VetLocationComponent,
    PetsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    APP_ROUTING
  ],
  providers: [
    PetsService,
    ServiceConfig,
    PagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
