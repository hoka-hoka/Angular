import { Directive, ElementRef, Input } from '@angular/core';

/**
 * Директива установки фокуса
 */
@Directive({
  selector: '[appAutoFocus]',
})
export default class AutoFocusDirective {
  /**
   * Флаг фокус
   */
  @Input() public set appAutoFocus(isFocused: boolean) {
    if (isFocused) {
      setTimeout(() => {
        this.host.nativeElement.focus();
      });
    }
  }

  /**
   * Конструктор
   * @param host Фокусируемый элемент
   */
  constructor(private host: ElementRef<HTMLElement>) {}
}
