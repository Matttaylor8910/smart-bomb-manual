import {Component} from '@angular/core';

import {Column, COLUMN_PAIRS, Coordinate, Direction, Maze, MAZES, Row, solveMaze} from './mazes-helpers';

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
  Phase = Phase;

  firstGreenCircle?: Column;
  secondGreenCircle?: Column;
  whiteLight?: Coordinate;
  redTriangle?: Coordinate;

  maze?: Maze;
  phase: Phase;
  solution: Direction[] = [];

  constructor() {
    this.setNextPhase();
  }

  // Move to a service as soon as another module wants to make use of this
  get darkMode(): boolean {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  get advice(): string {
    switch (this.phase) {
      case Phase.SET_CIRCLES:
        return 'Select the columns of the green circles';
      case Phase.SET_WHITE_LIGHT:
        return 'Select the cell on the maze that contains the white light';
      case Phase.SET_RED_TRIANGLE:
        return 'Select the cell on the maze that contains the red triangle';
      case Phase.SHOW_ANSWER:
        return this.solution.join(', ');
      default:
        return 'The devs messed up, file a bug';
    }
  }

  get selectable(): boolean {
    return [Phase.SET_WHITE_LIGHT, Phase.SET_RED_TRIANGLE].includes(this.phase);
  }

  get rows(): Row[] {
    return this.maze ? this.maze.rows : MAZES.EMPTY.rows;
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
    } else {
      this.secondGreenCircle = idx;
    }

    this.setMaze();
    this.setNextPhase();
  }

  handleCellClick(row: number, col: number) {
    if (this.phase === Phase.SET_WHITE_LIGHT) {
      this.whiteLight = {row, col};
    } else if (this.phase === Phase.SET_RED_TRIANGLE) {
      this.redTriangle = {row, col};
    }
    this.setNextPhase();
  }

  hasGreenCircle(row: number, col: number): boolean {
    if (this.maze) {
      return !!this.maze.circles.find(circle => {
        return circle.row === row && circle.col === col;
      });
    }

    return false;
  }

  hasWhiteLight(row: number, col: number): boolean {
    return this.whiteLight && this.whiteLight.row === row &&
        this.whiteLight.col === col;
  }

  hasRedTriangle(row: number, col: number): boolean {
    return this.redTriangle && this.redTriangle.row === row &&
        this.redTriangle.col === col;
  }

  setPhase(phase: Phase) {
    if (phase === Phase.SET_CIRCLES) {
      delete this.firstGreenCircle;
      delete this.secondGreenCircle;
      delete this.maze;
    } else if (phase === Phase.SET_WHITE_LIGHT) {
      delete this.whiteLight;
    } else if (phase === Phase.SET_RED_TRIANGLE) {
      delete this.redTriangle;
    }
    this.phase = phase;
  }

  private setMaze() {
    this.maze = MAZES[`${this.firstGreenCircle},${this.secondGreenCircle}`];
  }

  private setNextPhase() {
    if ([this.firstGreenCircle, this.secondGreenCircle].includes(undefined)) {
      this.phase = Phase.SET_CIRCLES;
    } else if (!this.whiteLight) {
      this.phase = Phase.SET_WHITE_LIGHT;
    } else if (!this.redTriangle) {
      this.phase = Phase.SET_RED_TRIANGLE;
    } else {
      this.solution = solveMaze(this.maze, this.whiteLight, this.redTriangle);
      this.phase = Phase.SHOW_ANSWER;
    }
  }
}
