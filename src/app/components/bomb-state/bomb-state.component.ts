import {Component} from '@angular/core';
import {BombStateService} from 'src/app/services/bomb-state.service';

@Component({
  selector: 'app-bomb-state',
  templateUrl: './bomb-state.component.html',
  styleUrls: ['./bomb-state.component.scss'],
})
export class BombStateComponent {
  constructor(
      public readonly bombStateService: BombStateService,
  ) {}
}
