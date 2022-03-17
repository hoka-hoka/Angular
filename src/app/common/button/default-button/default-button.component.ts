import { Component, EventEmitter, Input, Output } from '@angular/core';

import ButtonType from './model/buttonType.enum';

@Component({
  selector: 'app-default-button',
  templateUrl: './default-button.component.html',
  styleUrls: ['./default-button.component.scss'],
})
export default class DefaultButtonComponent {
  /**
   * Тип кнопки
   */
  @Input() public buttonType: string = ButtonType.default;

  /**
   * Текст кнопки
   */
  @Input() public labelText: string = '';

  /**
   * Событие обновления
   */
  @Output() updateEvent = new EventEmitter<boolean>();

  /**
   * Нажатие кнопки
   * @param value
   */
  // TODO: тип
  public onClickButton(value: any): void {
    this.updateEvent.emit(value);
  }
}
