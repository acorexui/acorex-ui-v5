import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './home.page';

@NgModule({
    declarations: [HomePage],
    imports: [CommonModule],
    exports: [HomePage],
    providers: [],
})
export class HomePageModule { }