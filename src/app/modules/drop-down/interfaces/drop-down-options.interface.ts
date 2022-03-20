/**
 * Опция выпадающего списка
 */
export default interface DropDownOption {
  /**
   * Идентификатор
   */
  id: number;

  /**
   * Значение
   */
  value: string;

  /**
   * Опора рендеринга
   */
  key?: number;
}
