import { NgModule, APP_INITIALIZER, ChangeDetectorRef} from '@angular/core';

import {
    MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatTableModule,
    MatSortModule, MatPaginatorModule, MatCardModule, MatToolbarModule, MatSidenavModule,
    MatTabsModule, MatIconModule, MatButtonModule, MatSelectModule, MatSlideToggleModule, 
    MatProgressSpinnerModule, MatPaginatorIntl, MatCheckboxModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialTableComponent } from './material-table/material-table.component';
import { Http } from '@angular/http';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        MatAutocompleteModule,
        MatPaginatorModule,
        MatCardModule,
        MatSidenavModule,
        MatToolbarModule,
        MatSidenavModule,
        MatTabsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatTableModule,
        MatButtonModule,
        MatSortModule,
        MatPaginatorModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
        MatSortModule
    ],
    exports: [
        MaterialTableComponent,
        MatAutocompleteModule,
        MatPaginatorModule,
        MatCardModule,
        MatSidenavModule,
        MatToolbarModule,
        MatSidenavModule,
        MatTabsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatTableModule,
        MatButtonModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatCheckboxModule
    ],
    declarations: [
        MaterialTableComponent
    ],
    providers: [
        MatPaginatorIntl
    ],
})
export class SharedModule { }
