import {Component} from '@angular/core';

import {Column, COLUMN_PAIRS, Coordinate, Maze, MAZES} from './mazes-helpers';

enum Phase {
  SET_CIRCLES = 'SET_CIRCLES',
  SET_WHITE_LIGHT = 'SET_WHITE_LIGHT',
  SET_RED_TRIANGLE = 'SET_RED_TRIANGLE',
  SHOW_ANSWER = 'SHOW_ANSWER',
}

@Component({
  selector: 'app-mazes',
  templateUrl: './mazes.component.html',
  styleUrls: ['./mazes.component.scss'],
})
export class MazesComponent {
  firstGreenCircle?: Column;
  secondGreenCircle?: Column;
  whiteLight: Coordinate;
  redTriangle: Coordinate;

  maze: Maze;
  phase: Phase = Phase.SET_CIRCLES;

  constructor() {}

  get advice(): string {
    switch (this.phase) {
      case Phase.SET_CIRCLES:
        return 'Select the columns of the green circles';
      case Phase.SET_WHITE_LIGHT:
        return 'Select the cell on the maze that contains the white light';
      case Phase.SET_RED_TRIANGLE:
        return 'Select the cell on the maze that contains the red triangle';
      case Phase.SHOW_ANSWER:
        return 'BRIK SEND HELP PLS';
      default:
        'The devs messed up, file a bug'
    }
  }

  isGreenCircleButtonClicked(row: number, idx: Column): boolean {
    if (row === 0) {
      return this.firstGreenCircle === idx;
    } else {
      return this.secondGreenCircle === idx;
    }
  }

  isGreenCircleButtonDisabled(row: number, idx: Column): boolean {
    if (row === 0) {
      // The first row is never disabled
      return false;
    } else if (row === 1 && this.firstGreenCircle === undefined) {
      // If the first row is undefined, then disable the entire second row
      return true;
    } else {
      // Otherwise, consult our possible values map
      // We are checking for second row, so use the first row's value in our
      // map
      return !COLUMN_PAIRS[this.firstGreenCircle].has(idx);
    }
  }

  handleGreenCircleClick(row: number, idx: Column) {
    if (row === 0) {
      this.firstGreenCircle = idx;
      // Whenever the first row changes, clear the second row
      this.secondGreenCircle = undefined;
      this.phase = Phase.SET_CIRCLES;
    } else {
      this.secondGreenCircle = idx;
      this.phase = Phase.SET_WHITE_LIGHT;
    }

    this.setMaze();
  }

  handleCellClick(row: number, col: number) {
    if (this.phase === Phase.SET_WHITE_LIGHT) {
      this.whiteLight = {row, col};
      this.phase = Phase.SET_RED_TRIANGLE;
    } else if (this.phase === Phase.SET_RED_TRIANGLE) {
      this.redTriangle = {row, col};
      this.phase = Phase.SHOW_ANSWER;
    }
  }

  hasCircle(row: number, col: number): boolean {
    if (this.maze) {
      return !!this.maze.circles.find(circle => {
        return circle.row === row && circle.col === col;
      });
    }

    return false;
  }

  private setMaze() {
    this.maze = MAZES[`${this.firstGreenCircle},${this.secondGreenCircle}`];
  }
}
