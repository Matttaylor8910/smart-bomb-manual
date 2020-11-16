import {ApplicationRef, Injectable} from '@angular/core';
import {BombStateService} from './bomb-state.service';
import {UtilService} from './util.service';

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

// Will be shown in the tooltip with a message like:
// Need to know ______
//
// e.g. Need to know if there is a parallel port
export enum ModuleRequirement {
  BATTERIES = 'the number of batteries',
  CAR_INDICATOR = 'if there is a CAR indicator',
  FRK_INDICATOR = 'if there is an FRK indicator',
  PARALLEL = 'if there is a parallel port',
  SERIAL_EVEN = 'if the last number of serial number is even',
  SERIAL_VOWEL = 'if the serial number has a vowel',
  STRIKES = 'the number of strikes',
}

interface Module {
  name: ModuleName;
  // Bomb state fields that this module relies on
  requirements: ModuleRequirement[];
}

export const MODULES: {[key in ModuleName]: Module} = {
  [ModuleName.COMPLICATED_WIRES]: {
    name: ModuleName.COMPLICATED_WIRES,
    requirements: [
      ModuleRequirement.BATTERIES, ModuleRequirement.PARALLEL,
      ModuleRequirement.SERIAL_EVEN
    ],
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
    requirements: [ModuleRequirement.SERIAL_VOWEL, ModuleRequirement.STRIKES],
  },
  [ModuleName.THE_BUTTON]: {
    name: ModuleName.THE_BUTTON,
    requirements:
        [ModuleRequirement.CAR_INDICATOR, ModuleRequirement.FRK_INDICATOR],
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
    requirements: [ModuleRequirement.SERIAL_EVEN],
  },
};

@Injectable({providedIn: 'root'})
export class ModuleService {
  loadedModules: Module[] = this.loadModules();

  constructor(
      private readonly appRef: ApplicationRef,
      private readonly utilService: UtilService,
  ) {}

  addModule(module: ModuleName, index: number = 0) {
    this.loadedModules.splice(index, 0, {...MODULES[module]});
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

  closeAllModules() {
    this.loadedModules = [];
    this.utilService.showToast('Closed all modules');
  }

  private saveModules() {
    const moduleNames = this.loadedModules.map(module => module.name);
    localStorage.setItem('loadedModules', JSON.stringify(moduleNames));
  }

  private loadModules(): Module[] {
    const moduleNames: ModuleName[] =
        JSON.parse(localStorage.getItem('loadedModules')) || [];
    // Convert module names to real module objects and filter out anything we
    // don't understand
    return moduleNames.map(moduleName => MODULES[moduleName]).filter(m => m);
  }
}
