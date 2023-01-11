import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXLOVComponent } from './data-lov.component';
import { FormsModule } from '@angular/forms';
import { AXDataLovPopupComponent } from './data-lov-popup/data-lov-popup.component';
import { AXDataGridModule } from '../data-grid/datagrid.module';
import { AXDataSourceModule, AXButtonModule, AXToolbarModule, AXSearchBoxModule, AXSelectBoxModule } from '@acorex/components';


@NgModule({
    declarations: [AXLOVComponent, AXDataLovPopupComponent],
    imports: [CommonModule, FormsModule, AXDataGridModule, AXDataSourceModule, AXButtonModule, AXToolbarModule, AXSelectBoxModule, AXSearchBoxModule],
    exports: [AXLOVComponent, AXDataLovPopupComponent],
    providers: []
})
export class AXLOVModule { }