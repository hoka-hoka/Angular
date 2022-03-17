import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

const findEl = <T>(
  fixture: ComponentFixture<T>,
  testId: string
): DebugElement => {
  return fixture.debugElement.query(By.css(`[data-test-id="${testId}"]`));
};

const setFieldElementValue = <T extends { value: string }>(
  element: T,
  value: string
): void => {
  element.value = value;
};

export { findEl, setFieldElementValue };
