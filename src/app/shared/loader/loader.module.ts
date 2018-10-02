import { NgModule,  ModuleWithProviders } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader.component';
import { LoaderService } from './loader.service';

@NgModule({
    imports: [CommonModule],
    exports: [LoaderComponent],
    declarations: [LoaderComponent],
})
export class LoaderModule { 
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: LoaderModule,
            providers: [LoaderService]
        }
    }
}
