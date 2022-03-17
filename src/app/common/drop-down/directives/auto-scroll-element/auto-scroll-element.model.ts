/**
 * Границы вьюпорта
 */
interface ViewportBoundaries {
  start: number;
  end: number;
}

/**
 * Передаваемые опции
 */
interface ScrollOptions {
  className: string;
  activeElementNumber: number;
  viewportBoundaries?: ViewportBoundaries;
  action?: boolean;
}

/**
 * Направление сдвига ползунка прокрутки
 */
enum ScrollDirection {
  top,
  bottom
}

export { ViewportBoundaries, ScrollOptions, ScrollDirection };
