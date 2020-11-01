import {Injectable} from '@angular/core';

export enum Modules {
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

@Injectable({providedIn: 'root'})
export class ModuleService {
  loadedModules = this.loadModules();

  constructor() {}

  addModule(module: string) {
    this.loadedModules.splice(0, 0, module);
    this.saveModules();
  }

  removeModule(index: number) {
    this.loadedModules.splice(index, 1);
    this.saveModules();
  }

  private saveModules() {
    localStorage.setItem('loadedModules', JSON.stringify(this.loadedModules));
  }

  private loadModules(): string[] {
    return JSON.parse(localStorage.getItem('loadedModules')) || [];
  }
}
