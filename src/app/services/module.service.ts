import {Injectable} from '@angular/core';

export enum Modules {
  COMPLICATED_WIRES = 'complictated-wires',
  PASSWORDS = 'passwords',
}

@Injectable({providedIn: 'root'})
export class ModuleService {
  loadedModules: string[] = [...Object.values(Modules)];

  constructor() {}

  addModule(module: string) {
    this.loadedModules.push(module);
  }

  removeModule(index: number) {
    this.loadedModules.splice(index, 1);
  }
}
