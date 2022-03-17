import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import ButtonType from '../default-button/model/buttonType.enum';

@Component({
  selector: 'app-boolean-button',
  templateUrl: './boolean-button.component.html',
  styleUrls: ['./boolean-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BooleanButtonComponent {
  /**
   * Тип кнопки
   */
  @Input() public buttonType: string = ButtonType.default;

  /**
   * Текст отключенной кнопки
   */
  @Input() public disableText: string = '';

  /**
   * Текст включенной кнопки
   */
  @Input() public activeText: string = '';

  /**
   * Активна ли кнопка
   */
  @Input() public action: boolean = false;

  /**
   * Событие обновления
   */
  @Output() updateEvent = new EventEmitter<boolean>();

  /**
   * Текст кнопки
   */
  public btnText: string = '';

  /**
   * Нажатие кнопки
   * @param value
   */
  // TODO: тип
  public onClick(value: any): void {
    this.action = !this.action;
    this.btnText = this.action ? this.activeText : this.disableText;
    this.updateEvent.emit(value);
  }
}
