import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export default class FilterComponent implements OnInit, AfterViewInit {
  /**
   * Текст поиска
   */
  @Input() public filterValue: string = '';

  /**
   * Текст заполнитель
   */
  @Input() public filterPlaceholder: string = '';

  /**
   * Фокус по умолчанию
   */
  @Input() public focused: boolean = true;

  /**
   * Коллбэк
   */
  @Output() public callback: EventEmitter<string> = new EventEmitter();

  ngOnInit() {}

  ngAfterViewInit() {
    if (this.filterValue) {
      this.onChangeFilterValue(this.filterValue);
    }
  }

  /**
   * Изменение текста поиска
   */
  // TODO: тип
  public onChangeFilterValue(value: any): void {
    this.callback.emit(value);
  }
}
