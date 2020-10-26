import {Injectable} from '@angular/core';

export enum Modules {
  COMPLICATED_WIRES = 'Complictated Wires',
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
  loadedModules: string[] = [
    Modules.COMPLICATED_WIRES,
    Modules.PASSWORDS,
  ];

  constructor() {}

  addModule(module: string) {
    this.loadedModules.push(module);
  }

  removeModule(index: number) {
    this.loadedModules.splice(index, 1);
  }
}
