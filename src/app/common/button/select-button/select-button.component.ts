import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

import Option from './model/option';

@Component({
  selector: 'app-select-button',
  templateUrl: './select-button.component.html',
  styleUrls: ['./select-button.component.scss'],
})
export default class SelectButtonComponent implements OnInit {
  /**
   * Список опций
   */
  @Input() public options: Option[] = [];

  /**
   * Событие обновления
   */
  @Output() updateEvent = new EventEmitter<Option>();

  /**
   * Флаг активного состояния
   */
  public isActive: boolean = false;

  ngOnInit(): void {
    this.setActiveOptionAsDefault();
  }

  /**
   * Нажатие кнопки
   * @param value
   */
  public onClickButton(item: Option): void {
    this.changeActiveOption(item);
    this.updateEvent.emit(item);
  }

  /**
   * Смена активной опции
   * @param activeOption Активная опция
   */
  private changeActiveOption(activeOption: Option): void {
    this.options = this.options.map((option) => {
      option.inactive = option.id === activeOption.id;

      return option;
    });
  }

  /**
   * Установить активную опцию по умолчанию
   */
  private setActiveOptionAsDefault(): void {
    if (!this.options) {
      return;
    }
    const inactiveOption = this.options.find((option) => option.inactive);
    if (!inactiveOption && this.options[0]) {
      this.options[0].inactive = true;
    }
  }
}
