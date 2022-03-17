import { Directive, ElementRef, HostListener } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[autoFocusOut]',
})
export default class AutoFocusOutDirective {
  /**
   * Находится ли фокус в пределах хоста
   */
  public containsElement: Subject<boolean>;

  constructor(private host: ElementRef<HTMLInputElement>) {
    this.containsElement = new Subject();
  }

  @HostListener('focusout', ['$event'])
  onBlur(event: FocusEvent) {
    event.stopPropagation();
    const host = this.host.nativeElement;
    setTimeout(() => {
      this.containsElement.next(host.contains(document.activeElement));
    });
  }
}
