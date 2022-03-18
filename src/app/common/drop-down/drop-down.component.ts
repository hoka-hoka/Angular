import { Component, Input, ViewChild, OnInit, ElementRef, ChangeDetectorRef } from '@angular/core';

import AutoFocusOutDirective from 'app/common/drop-down/directives/auto-focus-out.directive';
import { ScrollOptions } from 'app/common/drop-down/directives/auto-scroll-element/auto-scroll-element.model';
import KeyboardCodes from 'app/shared/models/keyboard-key-codes';
import EntityName from 'app/shared/models/entity-name';
import Option from 'app/common/drop-down/interfaces/option';
import showOptions from './animations/show-options';

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
        this.action = false;
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
  @Input() public set options(values: EntityName[]) {
    this.data = this.updateKeys(values);
  }

  /**
   * Сеттер установка активной опции
   */
  @Input() public set currentOption(option: EntityName | undefined) {
    const defaultElementNumber = -1;
    const foundOption = this.findOptionById(option?.id);
    if (foundOption) {
      this.curOption = foundOption;
    }
    this.scrollOptions = {
      ...this.scrollOptions,
      activeElementNumber: foundOption?.key ?? defaultElementNumber,
    };
  }

  /**
   * Флаг активного состояния
   */
  @Input() public action!: boolean;

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
  public data: Option[] = [];

  /**
   * Копия данных выпадающего списка
   */
  public backupData: Option[] = [];

  /**
   * Активная опция
   */
  public curOption?: Option;

  /**
   * Идентификатор текстовой метки
   */
  public idFor?: string = 'idFor';

  /**
   * Опции для ползунка прокрутки
   */
  public scrollOptions!: ScrollOptions;

  /**
   *
   * @param cdRef
   */
  constructor(private cdRef: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.scrollOptions = {
      ...this.scrollOptions,
      className: 'drop-down__options',
      action: this.action,
    };
    this.backupData = this.data;
  }

  /**
   * Фильтрация элементов выпадающего списка
   * @param filterText: string
   */
  public callTest(filterText: string) {
    const regexp = new RegExp(filterText.trim() || '\\d+', 'ig');
    const newData = this.backupData.filter((option) => ~option.name.search(regexp));
    this.options = filterText ? newData : this.backupData;
    this.filterValue = filterText;
    this.cdRef.detectChanges();
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
      case KeyboardCodes.Space:
        this.toggleAction(true);
        break;
      case KeyboardCodes.Escape:
        this.toggleAction(false);
        break;
      case KeyboardCodes.Enter:
        this.toggleAction();
        break;
      default:
        break;
    }
  }

  /**
   * Обработчик клика
   * @param event Объект события
   */
  public onClickPanel(event: MouseEvent): void {
    event.stopPropagation();
    this.toggleAction();
  }

  /**
   * Показать | скрыть панель
   */
  public toggleAction(action?: boolean): void {
    this.action = action ?? !this.action;
    console.log(this.action);

    if (!this.action) {
      this.dropDown.nativeElement.focus();
    }
    this.scrollOptions = { ...this.scrollOptions, action: this.action };
  }

  /**
   * Переключение активной опции кликом
   * @param event Событие клика выбора опции
   * @param option Опция
   */
  public onSelectOption(event: MouseEvent, option: Option): void {
    event.stopPropagation();
    this.currentOption = option;
    this.toggleAction();
  }

  /**
   * Опора рендеринга
   */
  public trackOptionId(_: number, option: Option): number {
    return option.key;
  }

  /**
   * Переключение активной опции клавишами
   * @param keyCode Код клавиши переключения опции
   */
  private changeOption(keyCode: number): void {
    const isArrowUp = keyCode === KeyboardCodes.ArrowUP;
    const step = isArrowUp ? -1 : 1;
    const start = isArrowUp ? 0 : this.data.length - 1;
    if (!this.data.length) {
      return;
    }
    if (this.curOption) {
      const isBoundaryOption = this.curOption.key === this.data[start].key;
      if (isBoundaryOption) {
        return;
      }
      this.currentOption = this.data[this.curOption.key + step];
    } else {
      this.currentOption = this.data[0];
    }
  }

  /**
   * Найти опцию по id
   * @param id Идентификатор опции
   */
  private findOptionById(id: number | undefined): Option | undefined {
    return this.data?.find((opt) => opt.id === id);
  }

  /**
   * Обновить ключи рендеринга
   * @param options Данные выпадающего списка
   */
  private updateKeys(options: EntityName[]): Option[] {
    return options.map((opt, index) => ({ ...opt, key: index }));
  }
}
