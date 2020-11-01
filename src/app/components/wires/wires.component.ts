import {Component} from '@angular/core';
import {BombStateService} from 'src/app/services/bomb-state.service';

enum Wire {
  RED = 'RED',
  BLUE = 'BLUE',
  WHITE = 'WHITE',
  BLACK = 'BLACK',
  YELLOW = 'YELLOW'
}

@Component({
  selector: 'app-wires',
  templateUrl: './wires.component.html',
  styleUrls: ['./wires.component.scss'],
})
export class WiresComponent {
  Wire = Wire;
  wires: string[] = [];
  cutIndex?: number;
  advice?: string;

  constructor(
      private readonly bombStateService: BombStateService,
  ) {}

  addWire(wire: Wire) {
    this.wires.push(wire);
    this.setAdvice();
  }

  removeLastWire() {
    if (this.wires.length) {
      this.wires.splice(this.wires.length - 1, 1);
      this.setAdvice();
    }
  }

  setAdvice() {
    if (this.wires.length < 3) {
      delete this.cutIndex;
      delete this.advice;
      return;
    }

    this.cutIndex = this.getIndexToCut();
    const wireToCut = this.getWireToCut(this.cutIndex);
    this.advice = `Cut the ${wireToCut} wire`;
  }

  /**
   * Get wire index to cut, remember arrays are 0 indexed
   */
  getIndexToCut(): number {
    const lastIndex = this.wires.length - 1;
    const lastWire = this.wires[lastIndex];
    const wireMap = {};

    for (const wire of this.wires) {
      wireMap[wire] = (wireMap[wire] || 0) + 1;
    }

    // 3 WIRES
    if (this.wires.length === 3) {
      // If there are no red wires, cut the second wire.
      if (!wireMap[Wire.RED]) {
        return 1;  // second index
      }
      // Otherwise, if the last wire is white, cut the last wire.
      else if (lastWire === Wire.WHITE) {
        return lastIndex;
      }
      // Otherwise, if there is more than one blue wire, cut the last blue wire.
      else if (wireMap[Wire.BLUE] > 1) {
        let lastBlueWire = 0;
        for (let i = 0; i < this.wires.length; i++) {
          if (this.wires[i] === Wire.BLUE) {
            lastBlueWire = i;
          }
        }
        return lastBlueWire;
      }
      // Otherwise, cut the last wire.
      else {
        return lastIndex;
      }
    }

    // 4 WIRES
    else if (this.wires.length === 4) {
      // If there is more than one red wire and the last digit of the serial
      // number is odd, cut the last red wire.
      if (wireMap[Wire.RED] > 1 && !this.bombStateService.serialEven) {
        return lastIndex;
      }
      // Otherwise, if the last wire is yellow and there are no red wires, cut
      // the first wire.
      else if (lastWire === Wire.YELLOW && !wireMap[Wire.RED]) {
        return 0;
      }
      // Otherwise, if there is exactly one blue wire, cut the
      // first wire.
      else if (wireMap[Wire.BLUE] === 1) {
        return 0
      }
      // Otherwise, if there is more than one yellow wire, cut the
      // last wire.
      else if (wireMap[Wire.YELLOW] > 1) {
        return lastIndex;
      }
      // Otherwise, cut the second wire.
      else {
        return 1;  // second index
      }
    }

    // 5 WIRES
    else if (this.wires.length === 5) {
      // If the last wire is black and the last digit of the serial number is
      // odd, cut the fourth wire.
      if (lastWire === Wire.BLACK && !this.bombStateService.serialEven) {
        return 3;  // fourth index
      }
      // Otherwise, if there is exactly one red wire and there is more than one
      // yellow wire, cut the first wire.
      else if (wireMap[Wire.RED] === 1 && wireMap[Wire.YELLOW] > 1) {
        return 0;
      }
      // Otherwise, if there are no black wires, cut the second wire.
      else if (!wireMap[Wire.BLACK]) {
        return 1;  // second index
      }
      // Otherwise, cut the first wire.
      else {
        return 0;
      }
    }

    // 6 WIRES
    else if (this.wires.length === 6) {
      // If there are no yellow wires and the last digit of the serial number is
      // odd, cut the third wire.
      if (!wireMap[Wire.YELLOW] && !this.bombStateService.serialEven) {
        return 2;  // third index
      }
      // Otherwise, if there is exactly one yellow wire and there is more than
      // one white wire, cut the fourth wire.
      else if (wireMap[Wire.YELLOW] === 1 && wireMap[Wire.WHITE] > 1) {
        return 3;  // fourth index
      }
      // Otherwise, if there are no red wires, cut the last wire.
      else if (!wireMap[Wire.RED]) {
        return lastIndex;
      }
      // Otherwise, cut the fourth wire.
      else {
        return 3;  // fourth index
      }
    }
  }

  /**
   * Return a nice string representation of which wire to cut
   */
  getWireToCut(index): string {
    if (index === this.wires.length - 1) {
      return 'last';
    }
    switch (index) {
      case 0:
        return 'first';
      case 1:
        return 'second';
      case 2:
        return 'third';
      case 3:
        return 'fourth';
      case 4:
        return 'fifth';
      default:
        return 'whatever you want, the devs fucked up, guess a'
    }
  }
}
