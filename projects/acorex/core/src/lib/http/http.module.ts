import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AXHttpService } from './http.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [HttpClientModule],
  providers: [
    AXHttpService
  ]
})
export class AXHttpModule {
  static forRoot(): ModuleWithProviders<AXHttpModule> {
    return {
      ngModule: AXHttpModule,
      providers: [AXHttpService]
    };
  }
}