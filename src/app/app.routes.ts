import { Routes } from '@angular/router';
import { CentrosComponent } from "./centros/centros.component";
import { CentroComponent } from "./centro/centro.component";

export const ROUTES: Routes = [
    { path: '',  redirectTo: 'centros', pathMatch: 'full'  },
    { path: 'centros', component: CentrosComponent },
    { path: 'centro/:id', component: CentroComponent },
    { path: 'centro', component: CentroComponent }
];
