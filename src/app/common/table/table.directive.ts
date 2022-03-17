import { Directive, TemplateRef, Input } from '@angular/core';
@Directive({
  selector: '[template]',
})
export class TableDirective {
  @Input('template') public template?: string;

  @Input('title') public title?: string;

  constructor(public templateRef: TemplateRef<any>) {}
}
