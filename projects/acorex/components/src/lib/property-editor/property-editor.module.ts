import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AXCheckBoxPropertyEditorComponent } from './editors/check-editor/check-editor';
import { AXCheckPropertyEditorModule } from './editors/check-editor/check.module';
import { AXColorPropertyEditorComponent } from './editors/color-editor/color.editor';
import { AXColorPropertyEditorModule } from './editors/color-editor/color.module';
import { ColumnPropertyEditorComponent } from './editors/column-editor/column.editor';
import { AXColumnPropertyEditorModule } from './editors/column-editor/column.module';
import { AXConditionalColorPropertyEditorComponent } from './editors/conditional-color-editor/conditional-color.editor';
import { AXConditionalColorPropertyEditorModule } from './editors/conditional-color-editor/conditional-color.module';
import { AXDatePropertyEditorComponent } from './editors/date-editor/date.editor';
import { AXDatePropertyEditorModule } from './editors/date-editor/date.module';
import { AXNumberBoxPropertyEditorComponent } from './editors/number-editor/number.editor';
import { AXNumberBoxPropertyEditorModule } from './editors/number-editor/number.module';
import { AXRangePropertyEditorComponent } from './editors/range-editor/range.editor';
import { AXRangePropertyEditorModule } from './editors/range-editor/range.module';
import { AXSearchBarSelectBoxEditorComponent } from './editors/searchbar-selectbox-editor/searchbar-selectbox-editor';
import { AXSelectBoxPropertyEditorComponent } from './editors/selectbox-editor/selectbox.editor';
import { AXSelectBoxPropertyEditorModule } from './editors/selectbox-editor/selectbox.module';
import { AXSelectionListPropertyEditorComponent } from './editors/selection-editor/selection-editor';
import { AXSelectionPropertyEditorModule } from './editors/selection-editor/selection.module';
import { AXSwitchPropertyEditorComponent } from './editors/switch-editor/number.editor';
import { AXSwitchPropertyEditorModule } from './editors/switch-editor/number.module';
import { AXTextPropertyEditorComponent } from './editors/text-editor/text.editor';
import { AXTextPropertyEditorModule } from './editors/text-editor/text.module';
import { AXTextareaPropertyEditorComponent } from './editors/textarea-editor/textarea.editor';
import { AXTextareaPropertyEditorModule } from './editors/textarea-editor/textarea.module';
import { AXTimePropertyEditorComponent } from './editors/time-editor/time.editor';
import { AXTimePropertyEditorModule } from './editors/time-editor/time.module';
import { AXPropertyEditorRendererDirective } from './property-editor-renderer.directive';

const WDIGET_MODULES = [
  AXNumberBoxPropertyEditorModule,
  AXTextPropertyEditorModule,
  AXSelectBoxPropertyEditorModule,
  AXRangePropertyEditorModule,
  AXColorPropertyEditorModule,
  AXConditionalColorPropertyEditorModule,
  AXColumnPropertyEditorModule,
  AXSwitchPropertyEditorModule,
  AXDatePropertyEditorModule,
  AXTimePropertyEditorModule,
  AXTimePropertyEditorModule,
  AXTextareaPropertyEditorModule,
  AXCheckPropertyEditorModule,
  AXSelectionPropertyEditorModule
];

@NgModule({
  imports: [
    WDIGET_MODULES,
    RouterModule.forChild([
      {
        path: 'ax/editors/selection',
        component: AXSelectionListPropertyEditorComponent
      },
      {
        component: AXCheckBoxPropertyEditorComponent,
        path: 'ax/editors/check'
      },
      {
        component: AXTextPropertyEditorComponent,
        path: 'ax/editors/text'
      },
      {
        component: AXTextareaPropertyEditorComponent,
        path: 'ax/editors/textarea'
      },
      {
        component: AXSelectBoxPropertyEditorComponent,
        path: 'ax/editors/select'
      },
      {
        component: AXSearchBarSelectBoxEditorComponent,
        path: 'ax/editors/selectBox'
      },
      {
        component: AXNumberBoxPropertyEditorComponent,
        path: 'ax/editors/number'
      },
      {
        component: AXRangePropertyEditorComponent,
        path: 'ax/editors/range'
      },
      {
        component: AXConditionalColorPropertyEditorComponent,
        path: 'ax/editors/conditional-color'
      },
      {
        component: AXColorPropertyEditorComponent,
        path: 'ax/editors/color'
      },
      {
        component: AXSwitchPropertyEditorComponent,
        path: 'ax/editors/switch'
      },
      {
        component: ColumnPropertyEditorComponent,
        path: 'ax/editors/column'
      },
      {
        component: AXDatePropertyEditorComponent,
        path: 'ax/editors/date'
      },
      {
        component: AXTimePropertyEditorComponent,
        path: 'ax/editors/time'
      }
    ])
  ],
  exports: [AXPropertyEditorRendererDirective],
  declarations: [AXPropertyEditorRendererDirective],
  providers: []
})
export class AXProppertyEditorModule {}
