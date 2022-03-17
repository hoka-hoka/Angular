import { Component, QueryList, ContentChildren } from '@angular/core';

import { TableDirective } from './table.directive';

@Component({
  selector: 'app-table',
  templateUrl: 'table.component.html',
  styleUrls: ['table.component.scss']
})
export class TableComponent {
  @ContentChildren(TableDirective) details?: QueryList<TableDirective>;

  dataItem = {
    name: 'test name'
  };
}
