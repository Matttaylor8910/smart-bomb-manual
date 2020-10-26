import {Component} from '@angular/core';
import {xor} from 'lodash';

interface WiresColumn {
  led: boolean;
  wires: string[];
  star: boolean;
}

@Component({
  selector: 'app-complicated-wires',
  templateUrl: './complicated-wires.component.html',
  styleUrls: ['./complicated-wires.component.scss'],
})
export class ComplicatedWiresComponent {
  // TODO: come from a settings service:
  // Move the buttons corresponding to these values to a new settings component
  parallel = false;
  serial = false;
  batteries = false;

  selectedColumn: number;
  columns: WiresColumn[] = [];

  constructor() {
    this.resetWires();
  }

  selectColumn(index: number) {
    this.selectedColumn = index;
  }

  selectNextColumn() {
    this.selectColumn((this.selectedColumn + 1) % 6);
  }

  toggleColor(color: string) {
    const column = this.columns[this.selectedColumn];
    column.wires = xor(column.wires, [color]);
  }

  /**
   * Determing if a given column should be cut based on its own properties as
   * well as some global ones about the bomb
   * @param column
   */
  shouldCut(column: WiresColumn): boolean {
    if (column.wires.length === 0) {
      return false;
    }

    if (column.wires.includes('red')) {
      if (column.wires.includes('blue')) {
        if (column.star) {
          if (column.led) {
            return false;
          } else {
            return this.parallel;
          }
        } else {
          if (column.led) {
            return this.serial;
          } else {
            return this.serial;
          }
        }
      } else {
        if (column.star) {
          if (column.led) {
            return this.batteries;
          } else {
            return true;
          }
        } else {
          if (column.led) {
            return this.batteries;
          } else {
            return this.serial;
          }
        }
      }
    } else {
      if (column.wires.includes('blue')) {
        if (column.star) {
          if (column.led) {
            return this.parallel;
          } else {
            return false;
          }
        } else {
          if (column.led) {
            return this.parallel;
          } else {
            return this.serial;
          }
        }
      } else {
        if (column.star) {
          if (column.led) {
            return this.batteries;
          } else {
            return true;
          }
        } else {
          if (column.led) {
            return false;
          } else {
            return true;
          }
        }
      }
    }
  }

  resetWires() {
    this.columns = [
      {led: false, wires: [], star: false},
      {led: false, wires: [], star: false},
      {led: false, wires: [], star: false},
      {led: false, wires: [], star: false},
      {led: false, wires: [], star: false},
      {led: false, wires: [], star: false},
    ];

    this.selectedColumn = 0;
  }
}
