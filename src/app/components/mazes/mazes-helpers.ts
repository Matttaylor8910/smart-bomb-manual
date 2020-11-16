export type Column = 0|1|2|3|4|5;

// key: column of one green cirlce
// value: possible columns of the other green circle
// these coordinates are zero-indexed, from left to right
export const COLUMN_PAIRS: {[key in Column]: Set<Column>} = {
  0: new Set([0, 5]),
  1: new Set([1, 4]),
  2: new Set([0, 3, 4]),
  3: new Set([2, 4, 5]),
  4: new Set([1, 2, 3]),
  5: new Set([0, 3]),
};

// Any given maze cell knows which directions have walls (including the edges of
// the maze) True means there IS a wall in that direction
interface MazeCell {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
}

// Quick way to make a MazeCell type with partial data
function MazeCell(mc: Partial<MazeCell>): MazeCell {
  return {
    top: false,
    right: false,
    bottom: false,
    left: false,
    ...mc,
  };
}

// Helper constants to make typing in the mazes and reading them less painful
// One wall
const T = MazeCell({top: true});
const R = MazeCell({right: true});
const B = MazeCell({bottom: true});
const L = MazeCell({left: true});
// Two walls
const TR = MazeCell({top: true, right: true});
const TB = MazeCell({top: true, bottom: true});
const TL = MazeCell({top: true, left: true});
const RB = MazeCell({right: true, bottom: true});
const RL = MazeCell({right: true, left: true});
const BL = MazeCell({bottom: true, left: true});
// Three walls
const TRB = MazeCell({top: true, right: true, bottom: true});
const TRL = MazeCell({top: true, right: true, left: true});
const TBL = MazeCell({top: true, bottom: true, left: true});
const RBL = MazeCell({right: true, bottom: true, left: true});

type Row = [MazeCell, MazeCell, MazeCell, MazeCell, MazeCell, MazeCell];
interface Coordinate {
  row: number;
  col: number;
}
export interface Maze {
  circles: Coordinate[];
  rows: [Row, Row, Row, Row, Row, Row];
}

// There are nine possible mazes
// Each maze is stored as an array of arrays:
// - The OUTER array represents the rows, from top to bottom
// - Each INNER array represents the cells in that row, from left to right
const ALPHA: Maze = {
  circles: [
    {row: 1, col: 0},
    {row: 2, col: 5},
  ],
  rows: [
    [TL, T, TR, TL, T, TR],
    [RL, TL, RB, BL, TB, TR],
    [RL, BL, TR, TL, TB, R],
    [TL, TBL, B, RB, TB, R],
    [L, TB, TR, TL, TRB, RL],
    [BL, TRB, BL, RB, TBL, RB],
  ]
};
const BRAVO: Maze = {
  circles: [
    {row: 1, col: 4},
    {row: 3, col: 1},
  ],
  rows: [
    [TBL, T, TRB, TL, T, TRB],
    [TL, RB, TL, RB, BL, TR],
    [RL, TL, RB, TL, TB, R],
    [L, RB, TL, RB, TRL, RL],
    [RL, TRL, RL, TL, RB, RL],
    [RBL, BL, RB, BL, TB, RB],
  ]
};
const CHARLIE: Maze = {
  circles: [
    {row: 3, col: 3},
    {row: 3, col: 5},
  ],
  rows: [
    [TL, TB, TR, TRL, TL, TR],
    [TBL, TRL, RL, BL, RB, RL],
    [TL, R, RL, TL, TR, RL],
    [RL, RL, RL, RL, RL, RL],
    [RL, BL, RB, RL, RL, RL],
    [BL, TB, TB, RB, BL, RB],
  ]
};
const DELTA: Maze = {
  circles: [
    {row: 0, col: 0},
    {row: 3, col: 0},
  ],
  rows: [
    [TL, TR, TBL, TB, TB, TR],
    [RL, RL, TL, TB, TB, R],
    [RL, BL, RB, TL, TRB, RL],
    [RL, TBL, TB, B, TB, R],
    [L, TB, TB, TB, TR, RL],
    [BL, TB, TRB, TBL, RB, RBL],
  ]
};
const ECHO: Maze = {
  circles: [
    {row: 2, col: 4},
    {row: 5, col: 3},
  ],
  rows: [
    [TBL, TB, TB, TB, T, TR],
    [TL, TB, TB, T, RB, RBL],
    [L, TR, TBL, RB, TL, TR],
    [RL, BL, TB, TR, TBL, RL],
    [RL, TL, TB, B, TRB, RL],
    [RBL, BL, TB, TB, TB, RB],
  ]
};
const FOXTROT: Maze = {
  circles: [
    {row: 0, col: 4},
    {row: 4, col: 2},
  ],
  rows: [
    [TRL, TL, TR, TBL, T, TR],
    [RL, RL, RL, TR, TB, RL],
    [L, RB, RBL, RL, TL, RB],
    [BL, TR, TL, R, RL, TRL],
    [TL, RB, RBL, RL, BL, R],
    [BL, TB, TB, RB, TBL, RB],
  ]
};
const GOLF: Maze = {
  circles: [
    {row: 0, col: 1},
    {row: 5, col: 1},
  ],
  rows: [
    [TL, TB, TB, TR, RL, TR],
    [RL, TL, TRB, BL, RB, RL],
    [RL, BL, TL, TRB, TL, RB],
    [TL, TR, L, TB, RB, TRL],
    [RL, RBL, BL, TB, TR, RL],
    [BL, TB, TB, TB, B, RB],
  ]
};
const HOTEL: Maze = {
  circles: [
    {row: 0, col: 3},
    {row: 3, col: 2},
  ],
  rows: [
    [TRL, TL, TB, TR, TL, TR],
    [L, B, TRB, BL, RB, RL],
    [RL, TL, TB, TB, TR, RL],
    [RL, BL, TR, TBL, B, RB],
    [RL, TRL, BL, TB, TB, TRB],
    [BL, B, TB, TB, TB, TRB],
  ]
};
const INDIA: Maze = {
  circles: [
    {row: 1, col: 2},
    {row: 4, col: 0},
  ],
  rows: [
    [TRL, T, TB, TB, T, TR],
    [RL, RL, TL, TRB, RL, RL],
    [L, B, RB, TL, RB, RL],
    [RL, TRL, T, RB, TBL, R],
    [RL, RL, RL, TL, TR, RBL],
    [BL, RB, BL, RB, BL, RB],
  ]
};

// key: column pair for a given maze (the toString() of Column[])
// value: the maze
export const MAZES: {[key: string]: Maze} = {
  '0,5': ALPHA,
  '5,0': ALPHA,
  '1,4': BRAVO,
  '4,1': BRAVO,
  '3,5': CHARLIE,
  '5,3': CHARLIE,
  '0,0': DELTA,
  '3,4': ECHO,
  '4,3': ECHO,
  '2,4': FOXTROT,
  '4,2': FOXTROT,
  '1,1': GOLF,
  '2,3': HOTEL,
  '3,2': HOTEL,
  '0,2': INDIA,
  '2,0': INDIA,
};
