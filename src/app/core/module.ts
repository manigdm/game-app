import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header';
import { LoadingComponent } from './loading/loading';

@NgModule({
    declarations: [
        HeaderComponent,
        LoadingComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        HeaderComponent,
        LoadingComponent
    ]
})

export class CoreModule { }