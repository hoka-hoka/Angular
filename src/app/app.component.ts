import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export default class AppComponent {
  public options: any;

  constructor() {
    this.options = [
      {
        id: 0,
        name: 'test1'
      },
      {
        id: 1,
        name: 'test2',
        inactive: true
      },
      {
        id: 2,
        name: 'test3'
      }
    ];
  }
}
