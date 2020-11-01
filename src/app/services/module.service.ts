import {ApplicationRef, Injectable} from '@angular/core';

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

  constructor(private readonly appRef: ApplicationRef) {}

  addModule(module: string, index: number = 0) {
    this.loadedModules.splice(index, 0, module);
    this.saveModules();
  }

  reloadModule(index: number) {
    // A bit hacky, but if we remove the module, then force the application to
    // tick (causing change detection), then re-add the module, it will load a
    // fresh instance of the component without any visual oddities.
    const module = this.loadedModules[index];
    this.removeModule(index);
    this.appRef.tick();
    this.addModule(module, index);
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
