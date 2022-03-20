import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';

import ScrollSettings from '../interfaces/scroll-settings.interface';

/**
 * Сервис выпадающего списка
 */
@Injectable({ providedIn: 'root' })
export default class DropDownService {
  /**
   * Настройки скроллинга
   */
  private scrollSettingsSub: Subject<ScrollSettings> = new Subject<ScrollSettings>();

  /**
   * Получить настройки скроллинга
   */
  // public get scrollSetting(): Observable<ScrollSettings> {
  //   return this.scrollSettingsSub.asObservable();
  // }

  /**
   * Обновить настройки скроллинга
   */
  public updateScrollSettings(settings: Partial<ScrollSettings>) {
    this.scrollSettingsSub.subscribe((previousSettings) => {
      const scrollOptions = { ...previousSettings, ...settings };
      this.scrollSettingsSub.next(scrollOptions);
    });
  }
}
