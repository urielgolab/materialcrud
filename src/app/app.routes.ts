import { Routes } from '@angular/router';
import { EntitiesComponent } from "./entities/entities.component";
import { EntityComponent } from "./entity/entity.component";

export const ROUTES: Routes = [
    { path: '',  redirectTo: 'entities', pathMatch: 'full'  },
    { path: 'entities', component: EntitiesComponent },
    { path: 'entity/:id', component: EntityComponent },
    { path: 'entity', component: EntityComponent }
];
