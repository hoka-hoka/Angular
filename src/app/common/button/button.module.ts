import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import BooleanButtonComponent from './boolean-button/boolean-button.component';
import DefaultButtonComponent from './default-button/default-button.component';
import SelectButtonComponent from './select-button/select-button.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BooleanButtonComponent, DefaultButtonComponent, SelectButtonComponent],
  exports: [BooleanButtonComponent, DefaultButtonComponent, SelectButtonComponent]
})
export default class ButtonModule {}
