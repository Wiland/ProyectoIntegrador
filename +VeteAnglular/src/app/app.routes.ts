import { RouterModule, Routes } from '@angular/router';
import { VetLocationComponent } from './components/vet-location/vet-location.component';
import { PetsComponent } from './components/pets/pets.component';
import { VeterinaryComponent } from './components/veterinary/veterinary.component';
import { MedHistoryComponent } from './components/med-history/med-history.component';

const APP_ROUTES: Routes = [
  { path: 'vet-location', component: VetLocationComponent },
  { path: 'pets', component: PetsComponent },
  { path: 'med-history', component: MedHistoryComponent },
  { path: 'vets', component: VeterinaryComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'med-history' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
