import { ComponentFixture } from '@angular/core/testing';
import { findEl } from './tests.spec';

const click = <T>(fixture: ComponentFixture<T>, testId: string): void => {
  const element = findEl(fixture, testId);
  const event = makeClickEvent(element.nativeElement);
  element.triggerEventHandler('click', event);
  fixture.detectChanges();
};

const keydown = <T>(
  fixture: ComponentFixture<T>,
  testId: string,
  keyCode: number
): void => {
  const element = findEl(fixture, testId);
  if (element) {
    const event = makeKeyEvent(element.nativeElement, keyCode);
    element.triggerEventHandler('keydown', event);
    fixture.detectChanges();
  }
};

const makeClickEvent = (target: EventTarget): Partial<MouseEvent> => {
  return {
    target,
    currentTarget: target,
    type: 'click',
    bubbles: true,
    cancelable: true,
    button: 0,
    preventDefault(): void {},
    stopPropagation(): void {},
    stopImmediatePropagation(): void {},
  };
};

const makeKeyEvent = (
  target: EventTarget,
  keyCode: number
): Partial<KeyboardEvent> => {
  return {
    target,
    currentTarget: target,
    type: 'click',
    bubbles: true,
    cancelable: true,
    keyCode: keyCode,
    preventDefault(): void {},
    stopPropagation(): void {},
    stopImmediatePropagation(): void {},
  };
};

export { click, keydown };
