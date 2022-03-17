import { ComponentFixture, TestBed } from '@angular/core/testing';

import { findEl } from 'shared/tests/tests.spec';
import { click } from 'shared/tests/events.spec';
import BooleanButtonComponent from './boolean-button.component';

describe('SelectBooleanButtonComponent', () => {
  let fixture: ComponentFixture<BooleanButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BooleanButtonComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(BooleanButtonComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    const { componentInstance } = fixture;
    expect(componentInstance).toBeTruthy();
  });

  it('adding action modifier', () => {
    const buttonDE = findEl(fixture, 'check-action');
    click(fixture, 'check-action');
    const buttonDEisActive = buttonDE.classes['button_active'];
    expect(buttonDEisActive).toBe(true);
  });

  it('action', () => {
    const { action: actionFirst } = fixture.componentInstance;
    click(fixture, 'check-action');
    const { action: actionSecond } = fixture.componentInstance;
    expect(actionFirst).toBe(!actionSecond);
  });

  it('btnText', () => {
    fixture.componentInstance.disableText = 'off';
    fixture.componentInstance.activeText = 'on';
    click(fixture, 'check-action');
    const { btnText: enabledBtnText } = fixture.componentInstance;
    click(fixture, 'check-action');
    const { btnText: disabledBtnText } = fixture.componentInstance;
    expect(enabledBtnText === 'off' && disabledBtnText === 'on').toBeTruthy();
  });
});
