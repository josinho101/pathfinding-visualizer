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

/**
 * enum for different terrains
 */
export enum TerrainType {
  None = 0,
  RandomBricks = 1,
  DiagonalLines = 2,
}
