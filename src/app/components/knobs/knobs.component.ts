import {Component} from '@angular/core';

const KNOB_ANSWERS = {
  [[false, false, true, true, true, true].toString()]: 'Up',
  [[true, false, true, false, true, true].toString()]: 'Up',
  [[false, true, true, true, true, true].toString()]: 'Down',
  [[true, false, true, false, true, false].toString()]: 'Down',
  [[false, false, false, true, false, false].toString()]: 'Left',
  [[false, false, false, false, false, false].toString()]: 'Left',
  [[true, false, true, true, true, true].toString()]: 'Right',
};

@Component({
  selector: 'app-knobs',
  templateUrl: './knobs.component.html',
  styleUrls: ['./knobs.component.scss'],
})
export class KnobsComponent {
  knobs = [false, false, false, false, false, false];

  get answer(): string {
    return KNOB_ANSWERS[this.knobs.toString()] || 'Unknown';
  }

  constructor() {}
}
