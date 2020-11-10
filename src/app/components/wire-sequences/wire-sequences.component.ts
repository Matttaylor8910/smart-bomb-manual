import {Component} from '@angular/core';

enum Wire {
  RED = 'RED',
  BLUE = 'BLUE',
  BLACK = 'BLACK',
}

interface WireAdvice {
  wire: Wire;
  advice: string;
}

const WIRE_MAP = {
  [Wire.RED]: {
    1: 'C',
    2: 'B',
    3: 'A',
    4: 'A or C',
    5: 'B',
    6: 'A or C',
    7: 'A, B or C',
    8: 'A or B',
    9: 'B',
  },
  [Wire.BLUE]: {
    1: 'B',
    2: 'A or C',
    3: 'B',
    4: 'A',
    5: 'B',
    6: 'B or C',
    7: 'C',
    8: 'A or C',
    9: 'A',
  },
  [Wire.BLACK]: {
    1: 'A, B or C',
    2: 'A or C',
    3: 'B',
    4: 'A or C',
    5: 'B',
    6: 'B or C',
    7: 'A or B',
    8: 'C',
    9: 'C',
  }
}

const MAX_WIRES = 9;

@Component({
  selector: 'app-wire-sequences',
  templateUrl: './wire-sequences.component.html',
  styleUrls: ['./wire-sequences.component.scss'],
})
export class WireSequencesComponent {
  Wire = Wire;
  wires: WireAdvice[] = [];

  private wireCount = {[Wire.RED]: 0, [Wire.BLUE]: 0, [Wire.BLACK]: 0};

  constructor() {}

  get redDisabled(): boolean {
    return this.wireCount[Wire.RED] >= MAX_WIRES;
  }

  get blueDisabled(): boolean {
    return this.wireCount[Wire.BLUE] >= MAX_WIRES;
  }

  get blackDisabled(): boolean {
    return this.wireCount[Wire.BLACK] >= MAX_WIRES;
  }

  addWire(wire: Wire) {
    this.wireCount[wire]++;
    this.wires.unshift({wire, advice: this.getAdvice(wire)});
  }

  removeLastWire() {
    if (this.wires.length) {
      const removed = this.wires.splice(0, 1)[0];
      this.wireCount[removed.wire]--;
    }
  }

  private getAdvice(wire: Wire): string {
    const count = this.wireCount[wire];
    return WIRE_MAP[wire][count];
  }
}
