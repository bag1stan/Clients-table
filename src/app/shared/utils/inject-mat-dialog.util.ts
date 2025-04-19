import {inject, Injector, runInInjectionContext} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

/**
 *  @description
 *  MatDialog можно инжектить только в контексте компонента для установки связи
 *
 *  При пропадании компонента - диалоговое окно должно быть закрыто
 *
 *  @remarks
 *  Именно поэтому я могу не отписываться в компоненте от диалоговых окон
 *  потому что они открываются в одном контексте инжектора при использовании этой утилиты
 *  @param injector - Инжектор компонента использующего диалоговое окно
 *  @return MatDialog - Инструмент Angular Material Dialog управления диалогами
 */
export function injectMatDialog(injector: Injector): MatDialog {
  return runInInjectionContext(injector, () => inject(MatDialog))
}
