/**
 * Enums for different nodes
 */
export enum NodeType {
  None = 0,
  Start = 1,
  Destination = 2,
  Path = 3,
  UnVisited = 4,
  Visited = 5,
  Brick = 6,
}

/**
 * enum for path finding algorithms
 */
export enum Algorithm {
  Dijkstra = 1,
}
