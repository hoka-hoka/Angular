import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';

import AppComponent from './app.component';

import SharedModule from './shared/shared.module';
import AppRoutingModule from './app-routing.module';

import ButtonModule from './common/button/button.module';
import DropDownModule from './modules/drop-down/drop-down.module';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    DropDownModule,
    ButtonModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
  ],
})
export class AppModule {}
