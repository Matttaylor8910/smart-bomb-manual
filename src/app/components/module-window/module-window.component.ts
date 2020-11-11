import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModuleName, ModuleRequirement, MODULES} from 'src/app/services/module.service';

const MODULE_REQUIREMENT_ICONS: {[key: string]: string} = {
  [ModuleRequirement.BATTERIES]: 'battery-full',
  [ModuleRequirement.CAR_INDICATOR]: 'sunny-outline',
  [ModuleRequirement.FRK_INDICATOR]: 'sunny-outline',
  [ModuleRequirement.PARALLEL]: 'apps-outline',
  [ModuleRequirement.SERIAL_EVEN]: 'barcode-outline',
  [ModuleRequirement.SERIAL_VOWEL]: 'barcode-outline',
  [ModuleRequirement.STRIKES]: 'skull-outline'
};

interface RequirementIcon {
  name: string;
  info: string;
}

@Component({
  selector: 'app-module-window',
  templateUrl: './module-window.component.html',
  styleUrls: ['./module-window.component.scss'],
})
export class ModuleWindowComponent implements OnInit {
  @Input() module: ModuleName;
  @Output() reloaded = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  ModuleName = ModuleName;
  requirementIcons: RequirementIcon[] = [];

  constructor() {}

  ngOnInit() {
    this.requirementIcons = this.getRequirementIcons();
  }

  getRequirementIcons(): RequirementIcon[] {
    const map = {};
    for (let requirement of MODULES[this.module].requirements) {
      const name = MODULE_REQUIREMENT_ICONS[requirement];
      let info = requirement as string;
      if (map[name]) {
        info = `${map[name].info} and ${info}`;
      }
      map[name] = {name, info};
    }
    return Object.values(map);
  }
}
