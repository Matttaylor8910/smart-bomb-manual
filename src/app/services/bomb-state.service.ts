import {Injectable} from '@angular/core';
import {ModuleService} from './module.service';

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
  ) {
    this.resetBomb();
  }

  resetBomb() {
    this.carIndicator = false;
    this.batteries = undefined;
    this.frkIndicator = false;
    this.parallel = false;
    this.serialEven = false;
    this.serialVowel = false;
    this.strikes = undefined;

    this.reloadAllModules();
  }

  private reloadAllModules() {
    for (let i = 0; i < this.moduleService.loadedModules.length; i++) {
      this.moduleService.reloadModule(i);
    }
  }
}
