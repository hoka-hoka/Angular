import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// import { IconSpriteModule } from 'ng-svg-icon-sprite';

import AutoFocusOutDirective from './directives/auto-focus-out.directive';
import AutoScrollElementDirective from './directives/auto-scroll-element/auto-scroll-element.directive';
import DropDownComponent from './drop-down.component';
import FilterComponent from '../filter/filter.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AutoFocusOutDirective, AutoScrollElementDirective, DropDownComponent, FilterComponent],
  imports: [
    // IconSpriteModule.forRoot({ path: 'assets/sprites/sprite.svg' }),
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
  ],
  exports: [DropDownComponent],
})
export default class DropDownModule {}
