import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { keydown } from 'app/shared/tests/events.spec';

import KeyboardCodes from 'app/shared/models/keyboard-key-codes';

import DropDownComponent from './drop-down.component';
import AutoScrollElementDirective from './directives/auto-scroll-element/auto-scroll-element.directive';
import { findEl } from 'app/shared/tests/tests.spec';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DropDownComponent', () => {
  let fixture: ComponentFixture<DropDownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, BrowserAnimationsModule],
      declarations: [DropDownComponent, AutoScrollElementDirective],
    }).compileComponents();
    fixture = TestBed.createComponent(DropDownComponent);
    fixture.detectChanges();
  });

  it('open the dropDown', () => {
    const dropElement = findEl<DropDownComponent>(fixture, 'test');
    const keyboardCodes = [KeyboardCodes.Enter, KeyboardCodes.Space];
    keyboardCodes.forEach((keyCode) => {
      keydown<DropDownComponent>(fixture, 'test', keyCode);
      expect(dropElement.nativeElement.classList).toContain('drop-down_active');
      keydown<DropDownComponent>(fixture, 'test', KeyboardCodes.Enter);
    });
  });

  it('close the dropDown', () => {
    const dropElement = findEl<DropDownComponent>(fixture, 'test');
    const keyboardCodes = [KeyboardCodes.Enter, KeyboardCodes.Escape];
    keydown<DropDownComponent>(fixture, 'test', KeyboardCodes.Enter);
    keyboardCodes.forEach((keyCode) => {
      keydown<DropDownComponent>(fixture, 'test', keyCode);
      expect(dropElement.nativeElement.classList).not.toContain('drop-down_active');
      keydown<DropDownComponent>(fixture, 'test', KeyboardCodes.Enter);
    });
  });
});
