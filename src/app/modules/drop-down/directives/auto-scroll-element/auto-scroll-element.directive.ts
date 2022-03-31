import { Directive, ElementRef, Input, Renderer2, AfterViewInit, SimpleChanges } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import AutoScroll from '../../classes/auto-scroll';
import ScrollDirection from '../../enums/scroll-direction.enum';
import ScrollSettings from '../../interfaces/scroll-setting.interface';
import ViewportBoundaries from '../../interfaces/viewport-boundaries.interface';

/**
 * Директива управления полосой прокрутки
 */
@UntilDestroy()
@Directive({
  selector: '[appAutoScrollElement]',
})
export default class appAutoScrollElementDirective implements AfterViewInit {
  /**
   * Привязка опций ползунка прокрутки
   */
  @Input() public set appAutoScrollElement(autoScroll: AutoScroll | undefined) {
    if (autoScroll) {
      this.autoScroll = autoScroll;
    }
  }

  /**
   * Опции ползунка прокрутки
   */
  private autoScroll!: AutoScroll;

  /**
   * Настройки скроллинга
   */
  private scrollSettings!: ScrollSettings;

  /**
   * Конструктор
   * @param render Приспособление для работы с DOM
   */
  constructor(private render: Renderer2) {}

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.autoScroll.scrollSetting.pipe(untilDestroyed(this)).subscribe((scrollSettings) => {
        if (!scrollSettings.active) {
          return;
        }
        this.scrollSettings = scrollSettings;
        this.setNewScrollPosition();
      });
    });
  }

  /**
   * Установить новую позицию ползунка прокрутки
   */
  private setNewScrollPosition(): void {
    const { viewportBoundaries, dropDownListElement } = this.scrollSettings;
    const { scrollStep } = this.autoScroll;
    if (!dropDownListElement || !viewportBoundaries || !scrollStep) {
      return;
    }
    const scrollTop = viewportBoundaries?.start * scrollStep;
    this.render.setProperty(dropDownListElement, 'scrollTop', String(scrollTop));
  }
}
