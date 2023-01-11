import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AXButtonModule, AXTextBoxModule } from 'projects/acorex/components/src/public-api';
import { FormsModule } from '@angular/forms';
import { NoteWidgetComponent } from './note.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                component: NoteWidgetComponent,
                path: ''
            }
        ]),
        AXButtonModule,
        AXTextBoxModule,
        FormsModule
    ],
    exports: [RouterModule],
    declarations: [NoteWidgetComponent],
    providers: []
})
export class NoteWidgetModule {}

