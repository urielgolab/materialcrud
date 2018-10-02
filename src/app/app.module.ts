import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { CentrosComponent } from './centros/centros.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatIconModule, MatDatepickerModule, MatInputModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';

import { MatPaginatorIntlSpa } from './shared/material-table/i18n/matPaginatorIntlSpa';
import { MatPaginatorIntl } from '@angular/material';

import {HttpModule} from '@angular/http';

import { SharedModule } from './shared/shared.module';
import { LoaderService } from './shared/loader/loader.service';
import { LoaderModule } from './shared/loader/loader.module';


import { CentrosService } from "./services/centros.service";
import { CentroComponent } from './centro/centro.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CentrosComponent,
    ToolbarComponent,
    CentroComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule, MatCheckboxModule, MatIconModule, MatDatepickerModule, MatInputModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
    LoaderModule.forRoot(),
    SharedModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [ CentrosService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
