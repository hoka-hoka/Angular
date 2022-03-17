import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import {
  ScrollOptions,
  ViewportBoundaries,
  ScrollDirection,
} from './auto-scroll-element.model';

/**
 * Директива управления полосой прокрутки
 */
@Directive({
  selector: '[autoScrollElement]',
})
export default class AutoScrollElementDirective
  implements AfterViewInit, OnChanges
{
  /**
   * Привязка опций ползунка прокрутки
   */
  @Input() public set autoScrollElement(options: ScrollOptions) {
    this.options = { ...this.options, ...options };
  }

  /**
   * Опции ползунка прокрутки
   */
  public options!: ScrollOptions;

  /**
   * Идентификатор предыдущего активного элемента
   */
  private prevActiveElementNumber!: number;

  /**
   * DOM-элемент ползунка прокрутки
   */
  private scrollElement!: HTMLElement;

  /**
   * Число видимых опций
   */
  private visibleElementsCount!: number;

  /**
   * Шаг ползунка прокрутки
   */
  private scrollStep!: number;

  /**
   * Конструктор
   * @param host Приспособление над хост узлом элемента
   * @param render Приспособление для работы с DOM
   */
  constructor(private host: ElementRef, private render: Renderer2) {}

  public ngAfterViewInit(): void {
    this.scrollElement = this.getScrollElement();
    if (!this.scrollElement) {
      return;
    }
    this.scrollStep = this.calculateScrollStep();
    this.visibleElementsCount = this.calculateVisibleElementsCount();

    if (this.options.action) {
      this.prevActiveElementNumber = this.options.activeElementNumber;
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const { previousValue, currentValue } = changes['autoScrollElement'];
    if (!this.options.action) {
      return;
    }

    setTimeout(() => {
      const isActive = !previousValue?.action && currentValue.action;
      if (isActive) {
        this.setViewportBoundaries();
      }
      this.switchingDirectionScroll();
    });
  }

  /**
   * Переключение движения ползунка прокрутки в зависимости от направления
   * @param keyCode Ключ клавиши перехода
   */
  private switchingDirectionScroll(): void {
    const { activeElementNumber } = this.options;
    const start = 0;
    const end = this.scrollElement?.childElementCount - 1;
    const isOutsideBoundaries =
      activeElementNumber < start || activeElementNumber > end;

    if (isOutsideBoundaries) {
      this.prevActiveElementNumber = activeElementNumber;

      return;
    }
    const scrollDirection =
      this.prevActiveElementNumber < activeElementNumber
        ? ScrollDirection.bottom
        : ScrollDirection.top;
    this.setNewScrollPosition(scrollDirection);
    this.prevActiveElementNumber = activeElementNumber;
  }

  /**
   * Получить DOM-элемент ползунка прокрутки
   */
  private getScrollElement(): HTMLElement {
    const { nativeElement } = this.host;

    return nativeElement.querySelector(`.${this.options.className}`);
  }

  /**
   * Вычислить шаг ползунка прокрутки
   * @return number
   */
  private calculateScrollStep(): number {
    const childCount = this.scrollElement.childElementCount;

    return Math.trunc(this.scrollElement.scrollHeight / childCount);
  }

  /**
   * Вычислить число видимых элементов прокрутки с учётом 0-го элемента
   */
  private calculateVisibleElementsCount(): number {
    const result = Math.ceil(this.scrollElement.offsetHeight / this.scrollStep);

    return result;
  }

  /**
   * Содержится ли активный элемент в пределах границ вьюпорта ползунка прокрутки
   * @param viewportBoundaries Границы вьюпорта
   */
  private isOutsideViewport(viewportBoundaries: ViewportBoundaries): boolean {
    const { activeElementNumber } = this.options;
    const isOutsideTop = activeElementNumber < viewportBoundaries?.start;
    const isOutsideBottom = activeElementNumber > viewportBoundaries?.end;

    return isOutsideTop || isOutsideBottom;
  }

  /**
   * Обновить границы вьюпорта ползунка прокрутки
   * @param direction Направление движения
   * @param prevViewportBoundaries Предыдущие границы вьюпорта
   */
  private updateViewportBoundaries(direction: ScrollDirection): void {
    const { viewportBoundaries } = this.options;
    if (!viewportBoundaries) {
      return;
    }

    const isOutsideViewport = this.isOutsideViewport(viewportBoundaries);
    const increase = isOutsideViewport ? 1 : 0;
    const step = direction === ScrollDirection.bottom ? increase : -increase;

    this.options.viewportBoundaries = {
      start: viewportBoundaries.start + step,
      end: viewportBoundaries.end + step,
    };
  }

  /**
   * Центрирование вьюпорта при инициализации списка с активным элементом
   * @return ViewportBoundaries
   */
  private setViewportBoundaries(): void {
    const { activeElementNumber } = this.options;
    const visibleElementsCount = this.visibleElementsCount - 1;
    const elementsCount = this.scrollElement?.childElementCount - 1;
    const half = Math.floor(visibleElementsCount / 2);

    let boundaries;
    if (activeElementNumber <= half) {
      boundaries = {
        start: 0,
        end: visibleElementsCount,
      };
    } else if (activeElementNumber >= elementsCount - half) {
      boundaries = {
        start: elementsCount - visibleElementsCount,
        end: elementsCount,
      };
    } else {
      boundaries = {
        start: activeElementNumber - half,
        end: activeElementNumber + half,
      };
    }

    this.options.viewportBoundaries = boundaries;
  }

  /**
   * Установить новую позицию ползунка прокрутки
   * @param direction Направление прокрутки
   */
  private setNewScrollPosition(direction: ScrollDirection): void {
    const scrollElement = this.getScrollElement();
    if (!scrollElement) {
      return;
    }

    this.updateViewportBoundaries(direction);
    const scrollTop =
      this.options.viewportBoundaries?.start || 1 * this.scrollStep;
    this.render.setProperty(scrollElement, 'scrollTop', String(scrollTop));
  }
}
