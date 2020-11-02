import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class BombStateService {
  carIndicator = false;
  batteries?: number;
  frkIndicator = false;
  parallel = false;
  serialEven = false;
  serialVowel = false;
  strikes?: number;

  constructor() {}
}
