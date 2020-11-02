import {Component} from '@angular/core';
import {BombStateService} from 'src/app/services/bomb-state.service';

enum Color {
  RED = 'RED',
  WHITE = 'WHITE',
  BLUE = 'BLUE',
  YELLOW = 'YELLOW',
}

enum Text {
  ABORT = 'ABORT',
  DETONATE = 'DETONATE',
  HOLD = 'HOLD',
  PRESS = 'PRESS',
}

@Component({
  selector: 'app-the-button',
  templateUrl: './the-button.component.html',
  styleUrls: ['./the-button.component.scss'],
})
export class TheButtonComponent {
  Color = Color;
  Text = Text;

  color = Color.WHITE;
  text?: Text;

  constructor(
      private readonly bombStateService: BombStateService,
  ) {}

  get options(): string[] {
    return Object.values(Text);
  }

  setColor(color: Color) {
    this.color = color;
  }

  setText(text: Text) {
    this.text = text;
  }

  get shouldHold(): boolean {
    const {color, text} = this;
    const {batteries, carIndicator, frkIndicator} = this.bombStateService;

    if (!color || !text) {
      return false;
    }
    // If the button is blue and the button says "Abort", hold the button and
    // refer to "Releasing a Held Button".
    if (color === Color.BLUE && text === Text.ABORT) {
      return true;
    }
    // If there is more than 1 battery on the bomb and the button says
    // "Detonate", press and immediately release the button.
    else if (batteries > 1 && text === Text.DETONATE) {
      return false;
    }
    // If the button is white and there is a lit indicator with label CAR, hold
    // the button and refer to "Releasing a Held Button".
    else if (this.color === Color.WHITE && carIndicator) {
      return true;
    }
    // If there are more than 2 batteries on the bomb and there is a lit
    // indicator with label FRK, press and immediately release the button.
    else if (batteries > 2 && frkIndicator) {
      return false;
    }
    // If the button is yellow, hold the button and refer to "Releasing a Held
    // Button".
    else if (color === Color.YELLOW) {
      return true;
    }
    // If the button is red and the button says "Hold", press and immediately
    // release the button.
    else if (color === Color.RED && text === Text.HOLD) {
      return false;
    }
    // If none of the above apply, hold the button and refer to "Releasing a
    // Held Button".
    return true;
  }
}
