import ViewportBoundaries from './viewport-boundaries.interface';

/**
 * Настройки скроллинга
 */
export default interface ScrollSettings {
  /**
   * Класс выпадающей панели
   */
  className: string;

  /**
   * Номер активного элемента
   */
  activeElementNumber: number;

  /**
   * Границы просмотра
   */
  viewportBoundaries?: ViewportBoundaries;

  /**
   * Флаг раскрытости панели
   */
  active?: boolean;
}
