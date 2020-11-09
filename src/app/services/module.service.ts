import {ApplicationRef, Injectable} from '@angular/core';
import {BombStateService} from './bomb-state.service';

export enum ModuleName {
  COMPLICATED_WIRES = 'Complicated Wires',
  KEYPADS = 'Keypads',
  KNOBS = 'Knobs',
  MAZES = 'Mazes',
  MEMORY = 'Memory',
  MORSE_CODE = 'Morse Code',
  PASSWORDS = 'Passwords',
  SIMON_SAYS = 'Simon Says',
  THE_BUTTON = 'The Button',
  WHOS_ON_FIRST = 'Who\'s on First',
  WIRE_SEQUENCES = 'Wire Sequences',
  WIRES = 'Wires',
}

interface Module {
  name: ModuleName;
  // Bomb state fields that this module relies on
  requirements: (keyof BombStateService)[];
}

export const MODULES: {[key in ModuleName]: Module} = {
  [ModuleName.COMPLICATED_WIRES]: {
    name: ModuleName.COMPLICATED_WIRES,
    requirements: ['batteries', 'parallel', 'serialEven'],
  },
  [ModuleName.KEYPADS]: {
    name: ModuleName.KEYPADS,
    requirements: [],
  },
  [ModuleName.KNOBS]: {
    name: ModuleName.KNOBS,
    requirements: [],
  },
  [ModuleName.MAZES]: {
    name: ModuleName.MAZES,
    requirements: [],
  },
  [ModuleName.MEMORY]: {
    name: ModuleName.MEMORY,
    requirements: [],
  },
  [ModuleName.MORSE_CODE]: {
    name: ModuleName.MORSE_CODE,
    requirements: [],
  },
  [ModuleName.PASSWORDS]: {
    name: ModuleName.PASSWORDS,
    requirements: [],
  },
  [ModuleName.SIMON_SAYS]: {
    name: ModuleName.SIMON_SAYS,
    requirements: ['serialVowel', 'strikes'],
  },
  [ModuleName.THE_BUTTON]: {
    name: ModuleName.THE_BUTTON,
    requirements: ['carIndicator', 'frkIndicator'],
  },
  [ModuleName.WHOS_ON_FIRST]: {
    name: ModuleName.WHOS_ON_FIRST,
    requirements: [],
  },
  [ModuleName.WIRE_SEQUENCES]: {
    name: ModuleName.WIRE_SEQUENCES,
    requirements: [],
  },
  [ModuleName.WIRES]: {
    name: ModuleName.WIRES,
    requirements: ['serialEven'],
  },
};

@Injectable({providedIn: 'root'})
export class ModuleService {
  loadedModules = this.loadModules();

  constructor(private readonly appRef: ApplicationRef) {}

  addModule(module: ModuleName, index: number = 0) {
    this.loadedModules.splice(index, 0, MODULES[module]);
    this.saveModules();
  }

  reloadModule(index: number) {
    // A bit hacky, but if we remove the module, then force the application to
    // tick (causing change detection), then re-add the module, it will load a
    // fresh instance of the component without any visual oddities.
    const module = this.loadedModules[index];
    this.removeModule(index);
    this.appRef.tick();
    this.addModule(module.name, index);
  }

  removeModule(index: number) {
    this.loadedModules.splice(index, 1);
    this.saveModules();
  }

  private saveModules() {
    const moduleNames = this.loadedModules.map(module => module.name);
    localStorage.setItem('loadedModules', JSON.stringify(moduleNames));
  }

  private loadModules(): Module[] {
    const moduleNames: ModuleName[] =
        JSON.parse(localStorage.getItem('loadedModules')) || [];
    return moduleNames.map(moduleName => MODULES[moduleName]);
  }
}
