import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[autoFocus]',
})
export default class AutoFocusDirective implements AfterViewInit {
  constructor(private host: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    this.host.nativeElement.focus();
  }
}
