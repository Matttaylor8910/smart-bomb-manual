import {Component} from '@angular/core';
import {Column, COLUMN_PAIRS} from './mazes-helpers';



@Component({
  selector: 'app-mazes',
  templateUrl: './mazes.component.html',
  styleUrls: ['./mazes.component.scss'],
})
export class MazesComponent {
  firstGreenCircle?: Column;
  secondGreenCircle?: Column;

  constructor() {}

  isGreenCircleButtonClicked(row: number, idx: Column): boolean {
    if (row === 0) {
      return this.firstGreenCircle === idx;
    } else {
      return this.secondGreenCircle === idx;
    }
  }

  isGreenCircleButtonDisabled(row: number, idx: Column): boolean {
    if (row === 0 && this.secondGreenCircle === undefined ||
        row === 1 && this.firstGreenCircle === undefined) {
      // If the other row is undefined, then don't disable anything in this row
      return false;
    } else {
      // Otherwise, consult our possible values map
      if (row === 0) {
        // We are checking for first row, so use the second row's value in our
        // map
        return !COLUMN_PAIRS[this.secondGreenCircle].has(idx);
      } else {
        // We are checking for second row, so use the first row's value in our
        // map
        return !COLUMN_PAIRS[this.firstGreenCircle].has(idx);
      }
    }
  }

  handleGreenCircleClick(row: number, idx: Column) {
    if (row === 0) {
      this.firstGreenCircle = idx;
    } else {
      this.secondGreenCircle = idx;
    }
  }
}
