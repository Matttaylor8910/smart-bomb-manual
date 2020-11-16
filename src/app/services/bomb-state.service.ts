import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';
import {ModuleService} from './module.service';
import {UtilService} from './util.service';

@Injectable({providedIn: 'root'})
export class BombStateService {
  carIndicator: boolean;
  batteries?: number;
  frkIndicator: boolean;
  parallel: boolean;
  serialEven: boolean;
  serialVowel: boolean;
  strikes?: number;

  constructor(
      private readonly moduleService: ModuleService,
      private readonly utilService: UtilService,
  ) {
    this.resetBomb(false);
  }

  resetBomb(showToast: boolean = true) {
    this.carIndicator = false;
    this.batteries = undefined;
    this.frkIndicator = false;
    this.parallel = false;
    this.serialEven = false;
    this.serialVowel = false;
    this.strikes = undefined;

    this.reloadAllModules();

    if (showToast) {
      this.utilService.showToast('Reset the bomb');
    }
  }

  private reloadAllModules() {
    for (let i = 0; i < this.moduleService.loadedModules.length; i++) {
      this.moduleService.reloadModule(i);
    }
  }
}
