import { RouterModule, Routes } from '@angular/router';
import { VetLocationComponent } from './components/vet-location/vet-location.component';
import { PetsComponent } from './components/pets/pets.component';

const APP_ROUTES: Routes = [
  { path: 'vet-location', component: VetLocationComponent },
  { path: 'pets', component: PetsComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'vet-location' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
