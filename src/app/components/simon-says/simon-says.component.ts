import {Component} from '@angular/core';
import {BombStateService} from 'src/app/services/bomb-state.service';

enum Button {
  RED = 'RED',
  BLUE = 'BLUE',
  YELLOW = 'YELLOW',
  GREEN = 'GREEN',
}

@Component({
  selector: 'app-simon-says',
  templateUrl: './simon-says.component.html',
  styleUrls: ['./simon-says.component.scss'],
})
export class SimonSaysComponent {
  Button = Button;
  input: Button[] = [];
  output: Button[] = [];

  constructor(
      private readonly bombStateService: BombStateService,
  ) {}

  pressButton(button: Button) {
    this.input.push(button);
    this.output.push(this.getOutput(button));
  }

  removeLastButton() {
    if (this.input.length) {
      const index = this.input.length - 1;
      this.input.splice(index, 1);
      this.output.splice(index, 1);
    }
  }

  getOutput(button: Button): Button {
    const {strikes, serialVowel} = this.bombStateService;

    // 0 STRIKES (or unset)
    if (!strikes) {
      switch (button) {
        case Button.RED:
          return Button.BLUE;
        case Button.BLUE:
          return serialVowel ? Button.RED : Button.YELLOW;
        case Button.GREEN:
          return serialVowel ? Button.YELLOW : Button.GREEN;
        default:
          return serialVowel ? Button.GREEN : Button.RED;
      }
    }

    // 1 STRIKE
    else if (strikes === 1) {
      switch (button) {
        case Button.RED:
          return serialVowel ? Button.YELLOW : Button.RED;
        case Button.BLUE:
          return serialVowel ? Button.GREEN : Button.BLUE;
        case Button.GREEN:
          return serialVowel ? Button.BLUE : Button.YELLOW;
        default:
          return serialVowel ? Button.RED : Button.GREEN;
      }
    }

    // 2 STRIKES
    else if (strikes === 2) {
      switch (button) {
        case Button.RED:
          return serialVowel ? Button.GREEN : Button.YELLOW;
        case Button.BLUE:
          return serialVowel ? Button.RED : Button.GREEN;
        case Button.GREEN:
          return serialVowel ? Button.YELLOW : Button.BLUE;
        default:
          return serialVowel ? Button.BLUE : Button.RED;
      }
    }
  }
}
