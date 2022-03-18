import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ScrollOptions } from './auto-scroll-element.model';
import EntityName from 'app/shared/models/entity-name';
import KeyboardCodes from 'app/shared/models/keyboard-key-codes';

import { keydown } from 'app/shared/tests/events.spec';

import AutoScrollElementDirective from './auto-scroll-element.directive';

/**
 * Тестирование директивы управления полосой прокрутки на основе введения поддельного компонента
 */
@Component({
  selector: 'app-test',
  template: `
    <div
      class="drop-down"
      data-test-id="drop-down"
      [autoScrollElement]="scrollOptions"
      (keydown)="onKeyDownPanel($event)"
    >
      <div class="drop-down__options">
        <ng-container *ngFor="let option of options">
          <div
            class="drop-down__item"
            [ngClass]="{
              'drop-down__item_focused': option.id === curOption?.id
            }"
          >
            {{ option.name }}
          </div>
        </ng-container>
      </div>
    </div>
    <style>
      .drop-down__options {
        font-size: 12px;
        line-height: 12px;
        height: 60px;
        overflow-y: auto;
      }
      .drop-down__item_focused {
        color: #fff;
        background-color: #bababa;
      }
    </style>
  `,
})
class TestComponent {
  /**
   * Опции для ползунка прокрутки
   */
  public scrollOptions!: ScrollOptions;

  /**
   * Данные выпадающего списка
   */
  public options!: EntityName[];

  /**
   * Активная опция списка
   */
  public curOption!: EntityName;

  /**
   * Конструктор
   */
  constructor() {
    this.options = [
      { id: 0, name: 'option 0' },
      { id: 1, name: 'option 1' },
      { id: 2, name: 'option 2' },
      { id: 3, name: 'option 3' },
      { id: 4, name: 'option 4' },
      { id: 5, name: 'option 5' },
      { id: 6, name: 'option 6' },
      { id: 7, name: 'option 7' },
      { id: 8, name: 'option 8' },
    ];
    this.scrollOptions = {
      className: 'drop-down__options',
      activeElementNumber: -1,
      action: false,
    };
  }

  /**
   * Обработчик клавиш
   * @param event Объект события
   */
  public onKeyDownPanel(event: KeyboardEvent): void {
    event.stopPropagation();
    const keyCode = event.keyCode || event.charCode;
    switch (keyCode) {
      case KeyboardCodes.ArrowUP:
        this.changeOption(keyCode);
        break;
      case KeyboardCodes.ArrowDown:
        this.changeOption(keyCode);
        break;
      default:
        break;
    }
  }

  /**
   * Переключение активной опции клавишами
   * @param keyCode Код клавиши переключения опции
   */
  private changeOption(keyCode: number): void {
    const isArrowUp = keyCode === KeyboardCodes.ArrowUP;
    const step = isArrowUp ? -1 : 1;
    const start = isArrowUp ? 0 : this.options.length - 1;
    if (!this.options.length) {
      return;
    }
    if (this.curOption) {
      const isBoundaryOption = this.curOption.id === this.options[start].id;
      if (isBoundaryOption) {
        return;
      }
      this.curOption = this.options[this.curOption.id + step];
    } else {
      this.curOption = this.options[0];
    }

    this.scrollOptions = {
      ...this.scrollOptions,
      activeElementNumber: this.curOption.id,
    };
  }
}

describe('AutoScrollElementDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let fakeComponent: TestComponent;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [AutoScrollElementDirective, TestComponent],
      providers: [],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fakeComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const comp = fixture.componentInstance;
    expect(comp).toBeDefined();
  });

  // it('change scroll position', fakeAsync(() => {
  //   fakeComponent.scrollOptions = { ...fakeComponent.scrollOptions, action: true };
  //   const scrollingElement = fixture.debugElement.query(By.css(`.${fakeComponent.scrollOptions.className}`));
  //   const dataTestId = 'drop-down';
  //   const directions = 2;
  //   let scrollPositionMap = [0, 0, 0, 0, 0, 12, 24, 36, 48];
  //   let keyboardCode = KeyboardCodes.ArrowDown;

  //   for (let k = 0; k < directions; k++) {
  //     if (k) {
  //       keyboardCode = KeyboardCodes.ArrowUP;
  //       scrollPositionMap = scrollPositionMap.slice(1).map((item) => 48 - item);
  //     }
  //     for (let i = 0; i < scrollPositionMap.length; i++) {
  //       keydown(fixture, dataTestId, keyboardCode);
  //       fixture.detectChanges();
  //       tick(1);
  //       expect(scrollingElement.nativeElement.scrollTop).toBe(scrollPositionMap[i]);
  //     }
  //   }
  // }));

  // it('set scroll position', fakeAsync(() => {
  //   fakeComponent.scrollOptions = { ...fakeComponent.scrollOptions, action: true, activeElementNumber: 5 };
  //   fixture.detectChanges();
  //   tick(1);
  //   const scrollingElement = fixture.debugElement.query(By.css(`.${fakeComponent.scrollOptions.className}`));
  //   expect(scrollingElement.nativeElement.scrollTop).toBe(36);
  // }));
});
