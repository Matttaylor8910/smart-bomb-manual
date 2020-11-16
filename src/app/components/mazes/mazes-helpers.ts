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
type Maze = [Row, Row, Row, Row, Row, Row];

// There are nine possible mazes
// Each maze is stored as an array of arrays:
// - The OUTER array represents the rows, from top to bottom
// - Each INNER array represents the cells in that row, from left to right
const ALPHA: Maze = [
  [],
  [],
  [],
  [],
  [],
  [],
];
const BRAVO: Maze = [
  [],
  [],
  [],
  [],
  [],
  [],
];
const CHARLIE: Maze = [
  [],
  [],
  [],
  [],
  [],
  [],
];
const DELTA: Maze = [
  [],
  [],
  [],
  [],
  [],
  [],
];
const ECHO: Maze = [
  [],
  [],
  [],
  [],
  [],
  [],
];
const FOXTROT: Maze = [
  [],
  [],
  [],
  [],
  [],
  [],
];
const GOLF: Maze = [
  [],
  [],
  [],
  [],
  [],
  [],
];
const HOTEL: Maze = [
  [],
  [],
  [],
  [],
  [],
  [],
];
const INDIA: Maze = [
  [],
  [],
  [],
  [],
  [],
  [],
];

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
