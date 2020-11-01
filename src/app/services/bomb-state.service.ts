import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class BombStateService {
  batteries?: number;
  strikes?: number;
  parallel = false;
  serialVowel = false;
  serialEven = false;

  constructor() {}
}
