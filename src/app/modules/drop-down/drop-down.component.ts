import { Component, Input, ViewChild, OnInit, AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';

import AutoFocusOutDirective from './directives/auto-focus-out.directive';
import KeyboardCodes from 'app/shared/models/keyboard-key-codes';
import openClosePanel from './animations/open-close-panel';
import DropDownOption from './interfaces/drop-down-options.interface';
import AutoScroll from './classes/auto-scroll';
import { AnimationEvent } from '@angular/animations';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss'],
  animations: [openClosePanel],
})
export default class DropDownComponent implements OnInit, AfterViewInit {
  /**
   * Проверка наличия фокуса в пределах хост-узла
   */
  @ViewChild(AutoFocusOutDirective)
  set autoFocusOut(directive: AutoFocusOutDirective) {
    if (!directive) {
      return;
    }
    directive.containsElement.subscribe((isContain: boolean) => {
      if (!isContain) {
        this.active = false;
        this.autoScroll?.updateScrollSettings({ active: false });
      }
    });
  }

  /**
   * Текст заполнитель для поля поиска
   */
  @Input() public placeHolder: string = '';

  /**
   * Данные выпадающего списка
   */
  @Input() public set options(values: DropDownOption[]) {
    this.dropDownOptions = this.updateKeys(values);
  }

  /**
   * Флаг активного состояния
   */
  @Input() public active: boolean = false;

  /**
   * Флаг добавления поля фильтрации
   */
  @Input() filter: boolean = false;

  /**
   * Текст фильтрации
   */
  @Input() filterValue!: string;

  /**
   * Элемента выпадающего списка
   */
  @ViewChild('dropDown') public dropDownRef!: ElementRef<HTMLElement>;

  /**
   * Элемент опций выпадающего списка
   */
  @ViewChild('dropDownList') public dropDownListRef!: ElementRef<HTMLElement>;

  /**
   * Данные выпадающего списка с опорой рендеринга (key)
   */
  public dropDownOptions: DropDownOption[] = [];

  /**
   * Копия данных выпадающего списка
   */
  public backupData: DropDownOption[] = [];

  /**
   * Идентификатор текстовой метки
   */
  public idFor: string = 'idFor';

  /**
   * Активная опция
   */
  public curOption?: DropDownOption;

  /**
   * Интерфейс скроллинга
   */
  public autoScroll?: AutoScroll;

  /**
   * Сеттер установки активной опции
   */
  @Input() private set currentOption(option: DropDownOption) {
    const defaultElementNumber = -1;
    const scrollOptions = {
      activeElementNumber: option?.key ?? defaultElementNumber,
    };
    this.curOption = option;
    if (this.autoScroll) {
      this.autoScroll.updateScrollSettings(scrollOptions);
    }
  }

  /**
   * Конструктор
   * @param cdRef Сервис обновления
   */
  constructor(private cdRef: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.backupData = this.dropDownOptions;
  }

  public ngAfterViewInit(): void {
    const defaultElementNumber = -1;
    const defaultScrollSettings = {
      dropDownListElement: this.dropDownListRef.nativeElement,
      optionsLength: this.dropDownOptions.length,
      activeElementNumber: this.curOption?.key || defaultElementNumber,
    };
    this.autoScroll = new AutoScroll(defaultScrollSettings);
    this.cdRef.detectChanges();
  }

  /**
   * Фильтрация элементов выпадающего списка
   * @param filterText: Текст фильтрации
   */
  public callTest(filterText: string): void {
    const regexp = new RegExp(filterText.trim() || '\\d+', 'ig');
    const newData = this.backupData.filter((option) => ~option.value.search(regexp));
    this.options = filterText ? newData : this.backupData;
    this.filterValue = filterText;
    this.cdRef.detectChanges();
  }

  /**
   * Обработчик клавиш
   * @param event Объект события
   */
  public onKeyDownPanel(event: KeyboardEvent): void {
    // TODO: Убрать deprecated
    const keyCode = event.keyCode || event.charCode;
    switch (keyCode) {
      case KeyboardCodes.ArrowUP:
        this.changeOption(keyCode);
        break;
      case KeyboardCodes.ArrowDown:
        this.changeOption(keyCode);
        break;
      case KeyboardCodes.Escape:
        this.toggleActive(false);
        break;
      case KeyboardCodes.Space:
        if (!this.filter && this.active) {
          this.toggleActive();
        }
        break;
      case KeyboardCodes.Enter:
        this.toggleActive();
        break;
      default:
        break;
    }
  }

  /**
   * Обработчик клика
   */
  public onClickPanel(): void {
    this.toggleActive();
  }

  /**
   * Показать | скрыть панель
   */
  private toggleActive(active?: boolean): void {
    this.active = active ?? !this.active;
    if (!this.active) {
      this.dropDownRef.nativeElement.focus();
    }
    this.autoScroll?.updateScrollSettings({ active: this.active });
  }

  /**
   * Событие переключения активной опции кликом
   * @param option Опция выпадающего списка
   */
  public onClickOption(option: DropDownOption): void {
    this.currentOption = option;
    this.toggleActive();
  }

  /**
   * Опора рендеринга
   * @param _ Номер опции
   * @param option Опция
   * @return Значения для опоры рендеринга
   */
  public trackOptionId(_: number, option: DropDownOption): number {
    return option.key as number;
  }

  /**
   * Переключение активной опции клавишами
   * @param keyCode Код клавиши переключения опции
   */
  private changeOption(keyCode: number): void {
    const isArrowUp = keyCode === KeyboardCodes.ArrowUP;
    const start = isArrowUp ? 0 : this.dropDownOptions.length - 1;
    const isBoundaryOption = this.curOption?.key === this.dropDownOptions[start].key;
    if (isBoundaryOption) {
      return;
    }
    const newOptionIndex = this.newOptionIndex(keyCode);
    this.currentOption = this.dropDownOptions[newOptionIndex];
  }

  /**
   * Получить новый индекс опции по коду клавиши
   * @param keyCode Код клавиши переключения опции
   */
  private newOptionIndex(keyCode: number): number {
    const isArrowUp = keyCode === KeyboardCodes.ArrowUP;
    const defaultElementNumber = -1;
    const step = isArrowUp ? -1 : 1;
    let newOptionIndex = this.curOption ? (this.curOption as any).key + step : defaultElementNumber;
    if (!isArrowUp && !this.curOption) {
      newOptionIndex = 0;
    }

    return newOptionIndex;
  }

  /**
   * Обновить ключи рендеринга
   * @param options Данные выпадающего списка
   * @return Обновлённые ключи рендеринга опций
   */
  private updateKeys(options: DropDownOption[]): DropDownOption[] {
    return options.map((opt, index) => ({ ...opt, key: index }));
  }
}
