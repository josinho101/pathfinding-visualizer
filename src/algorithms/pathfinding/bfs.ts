/**
 * Algorithm ref - https://en.wikipedia.org/wiki/Breadth-first_search
 *
 * 1  procedure BFS(G, root) is
 * 2      let Q be a queue
 * 3      label root as discovered
 * 4      Q.enqueue(root)
 * 5      while Q is not empty do
 * 6          v := Q.dequeue()
 * 7          if v is the goal then
 * 8              return v
 * 9          for all edges from v to w in G.adjacentEdges(v) do
 * 10             if w is not labeled as discovered then
 * 11                 label w as discovered
 * 12                 w.parent := v
 * 13                 Q.enqueue(w)
 */

import IPathFinder from "./ipathfinder";
import Node from "../../components/grid/typings/node";

class Bfs implements IPathFinder {
  // holds nodes
  private nodes: Node[][];

  /**
   * constructor
   */
  constructor(nodes: Node[][]) {
    this.nodes = nodes;
  }

  /**
   * find path to destination
   * @param startNode start node
   * @param destinationNode destination node
   */
  find(startNode: Node, destinationNode: Node): Node[][] {
    let queue = [];
    let visitedNode = [];

    startNode.isVisited = true;
    queue.push(startNode);

    while (queue.length > 0) {
      let current = queue.shift();

      if (current) {
        if (current.isBrick) {
          continue;
        }

        if (current === destinationNode) {
          break;
        }

        let unvisitedNodes = this.getUnvisitedNeighbors(current, this.nodes);
        for (let nieghbour of unvisitedNodes) {
          nieghbour.isVisited = true;
          nieghbour.previousNode = current;
          queue.push(nieghbour);
          visitedNode.push(nieghbour);
        }
      }
    }

    const nodesInShortestPath: Node[] = [];
    let currentNode = destinationNode;
    while (currentNode) {
      nodesInShortestPath.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }

    return [visitedNode, nodesInShortestPath];
  }

  private getUnvisitedNeighbors(node: Node, grid: Node[][]) {
    const neighbors: Node[] = [];
    const { row, column } = node;

    if (row > 0) {
      neighbors.push(grid[row - 1][column]);
    }
    if (row < grid.length - 1) {
      neighbors.push(grid[row + 1][column]);
    }
    if (column > 0) {
      neighbors.push(grid[row][column - 1]);
    }
    if (column < grid[0].length - 1) {
      neighbors.push(grid[row][column + 1]);
    }
    return neighbors.filter((neighbor) => !neighbor.isVisited);
  }
}

export default Bfs;
