import { NgModule } from '@angular/core';

import AutoFocusDirective from './directives/auto-focus.directive';

@NgModule({
  declarations: [AutoFocusDirective],
  exports: [AutoFocusDirective],
})
export default class SharedModule {}
