import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { EntitiesComponent } from './entities/entities.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCheckboxModule, MatIconModule, MatDatepickerModule,
  MatInputModule, MatDialogModule, MatListModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';

import { MatPaginatorIntlSpa } from './shared/material-table/i18n/matPaginatorIntlSpa';
import { MatPaginatorIntl } from '@angular/material';

import {HttpModule} from '@angular/http';

import { SharedModule } from './shared/shared.module';

import { EntitiesService } from "./services/entities.service";
import { EntityComponent } from './entity/entity.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemComponent } from './item/item.component';

import { DragulaModule } from 'ng2-dragula';

@NgModule({
  declarations: [
    AppComponent,
    EntitiesComponent,
    ToolbarComponent,
    EntityComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule, MatCheckboxModule, MatIconModule, MatDatepickerModule, MatInputModule, MatDialogModule, MatListModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
    SharedModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DragulaModule.forRoot()
  ],
  providers: [ EntitiesService ],
  bootstrap: [AppComponent],
  entryComponents: [ ItemComponent ],
  exports: [ItemComponent]
})
export class AppModule { }
