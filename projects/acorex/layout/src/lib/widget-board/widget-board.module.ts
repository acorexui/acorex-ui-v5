import { NgModule } from '@angular/core';
import { AXWidgetBoardComponent } from './widget-board.component';
import { CommonModule } from '@angular/common';
import { AXWidgetHostComponent } from './widget-host.component';
import {
    AXSearchBoxModule,
    AXLoadingModule,
    AXProppertyEditorModule,
    AXPageModule, AXLabelModule,
    AXToolbarModule,
    AXTabStripModule,
    AXMenuModule,
    AXFormGroupModule,
    AXTextAreaModule, AXTextBoxModule, AXFieldsetModule, AXCheckBoxModule, AXValidationModule
} from '@acorex/components';
import { RouterModule } from '@angular/router';
import { AXWidgetConfigComponent } from './widget-config.component';
import { AXTranslator, AXTranslatorModule } from '@acorex/core';
import { AXWidgetSizePropertyEditorComponent } from './editors/widget-size-editor/widget-size.editor';
import { AXWidgetSizePropertyEditorModule } from './editors/widget-size-editor/widget-size.module';
import { AXWidgetSaveComponent } from './widget-save.component';

@NgModule({
    imports: [
        CommonModule,
        AXSearchBoxModule,
        AXLoadingModule,
        RouterModule,
        AXProppertyEditorModule,
        AXPageModule,
        AXToolbarModule,
        AXTranslatorModule,
        AXLabelModule,
        AXTextAreaModule,
        AXFieldsetModule,
        AXTextBoxModule,
        AXFormGroupModule,
        AXTabStripModule,
        AXCheckBoxModule,
        AXMenuModule,
        AXTranslatorModule,
        AXValidationModule,
        RouterModule.forChild([
            {
                component: AXWidgetSizePropertyEditorComponent,
                path: 'ax/editors/widget-size'
            },
        ])
    ],
    exports: [AXWidgetBoardComponent, AXProppertyEditorModule],
    declarations: [AXWidgetBoardComponent, AXWidgetHostComponent, AXWidgetConfigComponent, AXWidgetSaveComponent],
    providers: []
})
export class AXWidgetBoardModule {
    /**
     *
     */
    constructor() {
        AXTranslator.load('en', {
            'widget-board': {
                'configurable-props': 'Configurable Properties',
                configure: 'Configure Widget'
            }
        });
        AXTranslator.load('fa', {
            'widget-board': {
                'configurable-props': 'ویژگی های قابل تنظیم',
                configure: 'پیکر بندی ابزارک'
            }
        });

    }

}
