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
import { UserService } from './services/user.service';
import { VeterinaryService } from './services/veterinary.service';
import { ServiceConfig } from './services/serviceConfig';
import { PagerService } from './services/pager.service';

//Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { VetLocationComponent } from './components/vet-location/vet-location.component';
import { PetsComponent } from './components/pets/pets.component';
import { MedHistoryComponent } from './components/med-history/med-history.component';
import { VeterinaryComponent } from './components/veterinary/veterinary.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    VetLocationComponent,
    PetsComponent,
    MedHistoryComponent,
    VeterinaryComponent
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
    UserService,
    VeterinaryService,
    ServiceConfig,
    PagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
