import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TableComponent } from './table.component';
import { TableDirective } from './table.directive';

@NgModule({
  declarations: [TableComponent, TableDirective],
  imports: [BrowserModule],
  providers: [],
  exports: [TableComponent, TableDirective]
})
export class TableModule {}
