import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export default class AppComponent {
  public options: any = [];

  constructor() {
    for (let i = 0; i < 10; i++) {
      this.options.push({
        id: i,
        value: 'test' + i,
      });
    }
  }
}
