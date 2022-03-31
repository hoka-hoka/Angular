import ScrollDirection from '../enums/scroll-direction.enum';
import ViewportBoundaries from './viewport-boundaries.interface';

/**
 * Настройки скроллинга
 */
export default interface ScrollSetting {
  /**
   * Элемент выпадающего списка
   */
  dropDownListElement: HTMLElement;

  /**
   * Число элементов списка
   */
  optionsLength: number;

  /**
   * Номер активного элемента
   */
  activeElementNumber: number;

  /**
   * Границы просмотра
   */
  viewportBoundaries?: ViewportBoundaries;

  /**
   * Флаг открытости панели
   */
  active?: boolean;
}
