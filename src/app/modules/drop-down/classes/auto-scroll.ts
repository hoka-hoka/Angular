import { BehaviorSubject, Observable } from 'rxjs';
import ScrollDirection from '../enums/scroll-direction.enum';
import ScrollSetting from '../interfaces/scroll-setting.interface';
import ScrollSettings from '../interfaces/scroll-setting.interface';
import ViewportBoundaries from '../interfaces/viewport-boundaries.interface';

/**
 * Настройки скроллинга
 */
export default class AutoScroll {
  /**
   * Высота элемента выпадающего списка
   */
  public scrollStep?: number;

  /**
   * Субъект настроек скроллинга
   */
  private scrollSettingsSub: BehaviorSubject<ScrollSetting>;

  /**
   * Конструктор
   * @param init Объект инициализации
   */
  constructor(init: ScrollSetting) {
    this.scrollSettingsSub = new BehaviorSubject<ScrollSetting>({
      dropDownListElement: init.dropDownListElement,
      optionsLength: init.optionsLength,
      activeElementNumber: init.activeElementNumber,
    });
  }

  /**
   * Центрирование вьюпорта при инициализации списка с активным элементом
   */
  public setViewportBoundaries(): void {
    const { activeElementNumber, optionsLength } = this.scrollSettingsSub.value;
    const visibleElementsCount = this.calculateViewportOptionsLength();
    if (!visibleElementsCount) {
      return;
    }
    const half = Math.floor(visibleElementsCount / 2);
    let viewportBoundaries;
    if (activeElementNumber <= half) {
      viewportBoundaries = {
        start: 0,
        end: visibleElementsCount - 1,
      };
    } else if (activeElementNumber >= optionsLength - half) {
      viewportBoundaries = {
        start: optionsLength - visibleElementsCount,
        end: optionsLength - 1,
      };
    } else {
      viewportBoundaries = {
        start: activeElementNumber - half,
        end: activeElementNumber + half,
      };
    }
    this.updateScrollSettings({ viewportBoundaries });
  }

  /**
   * Обновить настройки скроллинга
   */
  public updateScrollSettings(settings: Partial<ScrollSettings>) {
    const { active: prevActive } = this.scrollSettingsSub.value;
    const { active, activeElementNumber } = settings;
    const scrollDirection = this.scrollDirection(activeElementNumber);

    setTimeout(() => {
      if (active && active !== prevActive) {
        this.scrollStep = this.scrollStep ?? this.calculateScrollStep();
        this.setViewportBoundaries();
      }

      let viewportBoundaries;
      const isCalculateParams = ![typeof activeElementNumber, typeof scrollDirection].includes('undefined');
      if (isCalculateParams) {
        viewportBoundaries = this.calculateViewportBoundariesByDirection(
          scrollDirection as number,
          activeElementNumber as number,
        );
      }
      const scrollOptions = {
        ...this.scrollSettingsSub.value,
        ...settings,
        ...(viewportBoundaries && { viewportBoundaries }),
      };
      this.scrollSettingsSub.next(scrollOptions);
    });
  }

  /**
   * Получить настройки скроллинга
   */
  public get scrollSetting(): Observable<ScrollSettings> {
    return this.scrollSettingsSub.asObservable();
  }

  /**
   * Содержится ли активный элемент в пределах границ вьюпорта ползунка прокрутки
   * @param viewportBoundaries Границы вьюпорта
   * @param activeElementNumber Номер активного элемента
   */
  public isInsideViewport(viewportBoundaries: ViewportBoundaries, activeElementNumber: number): boolean {
    if (activeElementNumber === -1) {
      return true;
    }
    const isLessTop = activeElementNumber >= viewportBoundaries?.start;
    const isMoreBottom = activeElementNumber <= viewportBoundaries?.end;

    return isLessTop && isMoreBottom;
  }

  /**
   * Рассчитать высоту элемента выпадающего списка
   */
  public calculateScrollStep(): number {
    const { dropDownListElement, optionsLength } = this.scrollSettingsSub.value;
    if (dropDownListElement.scrollHeight % optionsLength !== 0) {
      console.warn('Высота списка не кратна высоте опции. Число элементов выпадающего списка округлено');
    }

    return Math.trunc(dropDownListElement.scrollHeight / optionsLength);
  }

  /**
   * Получить границы вьюпорта ползунка прокрутки по направлению
   * @param direction Направление движения
   * @param activeElementNumber Номер активного элемента
   * @return Новые границы вьюпорта
   */
  private calculateViewportBoundariesByDirection(
    direction: ScrollDirection,
    activeElementNumber: number,
  ): ViewportBoundaries | undefined {
    const { viewportBoundaries } = this.scrollSettingsSub.value;
    if (!viewportBoundaries) {
      return;
    }
    const isInsideViewport = this.isInsideViewport(viewportBoundaries, activeElementNumber);
    if (isInsideViewport) {
      return;
    }
    const increase = 1;
    const step = direction === ScrollDirection.bottom ? increase : -increase;

    return {
      start: viewportBoundaries.start + step,
      end: viewportBoundaries.end + step,
    };
  }

  /**
   * Рассчитать число элементов вьюпорта
   * @return Число элементов вьюпорта
   */
  private calculateViewportOptionsLength(): number | undefined {
    if (!this.scrollStep) {
      return;
    }
    const { dropDownListElement } = this.scrollSettingsSub.value;
    const viewportHeight = dropDownListElement.offsetHeight;
    if (viewportHeight % this.scrollStep !== 0) {
      console.warn('Высота вьюпорта не кратна высоте опции. Число элементов вьюпорта округлено');
    }

    return Math.trunc(viewportHeight / this.scrollStep);
  }

  /**
   * Получить направление скроллинга
   * @param activeElementNumber Номер активного элемента
   * @return Направление скроллинга
   */
  private scrollDirection(activeElementNumber: number | undefined): ScrollDirection | undefined {
    const { activeElementNumber: oldActiveElementNumber } = this.scrollSettingsSub.value;
    let result;
    if (typeof activeElementNumber === undefined) {
      return result;
    }
    if ((activeElementNumber as number) - oldActiveElementNumber > 0) {
      result = ScrollDirection.bottom;
    }
    if ((activeElementNumber as number) - oldActiveElementNumber < 0) {
      result = ScrollDirection.top;
    }

    return result;
  }
}
