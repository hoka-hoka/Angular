import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export default class AppComponent {
  public options: any;

  constructor() {
    this.options = [
      {
        id: 0,
        value: 'test1',
      },
      {
        id: 1,
        value: 'test2',
        inactive: true,
      },
      {
        id: 2,
        value: 'test3',
      },
    ];
  }
}
