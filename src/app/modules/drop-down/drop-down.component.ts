import { Component, Input, ViewChild, OnInit, ElementRef, ChangeDetectorRef } from '@angular/core';

import AutoFocusOutDirective from './directives/auto-focus-out.directive';
import KeyboardCodes from 'app/shared/models/keyboard-key-codes';
import showOptions from './animations/show-options';
import ScrollSettings from './interfaces/scroll-settings.interface';
import DropDownOption from './interfaces/drop-down-options.interface';
import DropDownService from './services/drop-down.service';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss'],
  animations: [showOptions],
})
export default class DropDownComponent implements OnInit {
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
        this.updateScrollSettings({ active: false });
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
  @Input() filter?: boolean;

  /**
   * Текст фильтрации
   */
  @Input() filterValue!: string;

  /**
   * Выпадающий список
   */
  @ViewChild('dropDown') public dropDown!: ElementRef<HTMLElement>;

  /**
   * Данные выпадающего списка с опорой рендеринга (key)
   */
  public dropDownOptions: DropDownOption[] = [];

  /**
   * Копия данных выпадающего списка
   */
  public backupData: DropDownOption[] = [];

  /**
   * Активная опция
   */
  public curOption?: DropDownOption;

  /**
   * Идентификатор текстовой метки
   */
  public idFor?: string = 'idFor';

  /**
   * Опции для ползунка прокрутки
   */
  public scrollSettings!: ScrollSettings;

  /**
   * Сеттер установки активной опции
   */
  @Input() private set currentOption(option: DropDownOption) {
    const defaultElementNumber = -1;
    const scrollOptions = {
      activeElementNumber: option?.key ?? defaultElementNumber,
    };
    this.curOption = option;
    this.updateScrollSettings(scrollOptions);
  }

  /**
   * Конструктор
   * @param cdRef Сервис обновления
   * @param dropDownService Сервис выпадающего списка
   */
  constructor(private cdRef: ChangeDetectorRef, public dropDownService: DropDownService) {}

  public ngOnInit(): void {
    const defaultElementNumber = -1;
    const scrollOptions = {
      className: 'drop-down__options',
      activeElementNumber: this.curOption?.key || defaultElementNumber,
      active: this.active,
    };
    this.updateScrollSettings(scrollOptions);
    this.backupData = this.dropDownOptions;
  }

  /**
   * Фильтрация элементов выпадающего списка
   * @param filterText: string
   */
  public callTest(filterText: string) {
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
   * @param event Объект события
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
      this.dropDown.nativeElement.focus();
    }
    this.updateScrollSettings({ active: this.active });
  }

  /**
   * Событие переключения активной опции кликом
   * @param event Событие клика выбора опции
   * @param option Опция
   */
  public onClickOption(event: MouseEvent, option: DropDownOption): void {
    this.currentOption = option;
    this.toggleActive();
  }

  /**
   * Опора рендеринга
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
    const step = isArrowUp ? -1 : 1;
    const start = isArrowUp ? 0 : this.dropDownOptions.length - 1;
    const isBoundaryOption = this.curOption?.key === this.dropDownOptions[start].key;
    if (isBoundaryOption) {
      return;
    }
    const newOptionIndex = this.curOption ? (this.curOption as any).key + step : 0;
    this.currentOption = this.dropDownOptions[newOptionIndex];
  }

  /**
   * Обновить ключи рендеринга
   * @param options Данные выпадающего списка
   */
  private updateKeys(options: DropDownOption[]): DropDownOption[] {
    return options.map((opt, index) => ({ ...opt, key: index }));
  }

  /**
   * Обновить настройки скроллинга
   */
  private updateScrollSettings(scrollSettings: Partial<ScrollSettings>): void {
    this.dropDownService.updateScrollSettings(scrollSettings);
  }
}
