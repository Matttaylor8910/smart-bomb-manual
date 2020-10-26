import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class BombStateService {
  parallel = false;
  serial = false;
  batteries = false;

  constructor() {}
}
