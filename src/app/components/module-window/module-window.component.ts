import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BombStateService} from 'src/app/services/bomb-state.service';
import {ModuleName, MODULES} from 'src/app/services/module.service';

const MODULE_REQUIREMENT_ICONS: {[key in keyof BombStateService]: string} = {
  batteries: 'battery-full',
  carIndicator: 'sunny-outline',
  frkIndicator: 'sunny-outline',
  parallel: 'apps-outline',
  serialEven: 'barcode-outline',
  serialVowel: 'barcode-outline',
  strikes: 'skull-outline'
};

@Component({
  selector: 'app-module-window',
  templateUrl: './module-window.component.html',
  styleUrls: ['./module-window.component.scss'],
})
export class ModuleWindowComponent {
  @Input() module: ModuleName;
  @Output() reloaded = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  ModuleName = ModuleName;

  get requirementIcons(): string[] {
    const set = new Set<string>();
    for (const requirement of MODULES[this.module].requirements) {
      set.add(MODULE_REQUIREMENT_ICONS[requirement]);
    }
    return Array.from(set);
  }

  constructor() {}
}
