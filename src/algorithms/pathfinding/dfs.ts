/**
 * Algorithm ref : https://en.wikipedia.org/wiki/Depth-first_search
 *
 * procedure DFS_iterative(G, v) is
 *  let S be a stack
 *   S.push(v)
 *   while S is not empty do
 *       v = S.pop()
 *       if v is not labeled as discovered then
 *           label v as discovered
 *           for all edges from v to w in G.adjacentEdges(v) do
 *               S.push(w)
 */

import IPathFinder from "./ipathfinder";
import Node from "../../components/grid/typings/node";
import { stat } from "fs";

class Dfs implements IPathFinder {
  // holds nodes
  private nodes: Node[][];

  /**
   * constructor
   */
  constructor(nodes: Node[][]) {
    this.nodes = nodes;
  }

  /**
   * find path
   * @param startNode start node
   * @param destinationNode destination node
   */
  public find(startNode: Node, destinationNode: Node): Node[][] {
    let stack = [];
    let visitedNodes = [];

    stack.push(startNode);

    while (stack.length > 0) {
      let current = stack.pop();

      if (current) {
        if (current.isBrick) {
          continue;
        }

        if (!current.isVisited) {
          visitedNodes.push(current);
          current.isVisited = true;

          let neighbours = this.getUnvisitedNeighbors(current, this.nodes);
          for (const neighbour of neighbours) {
            neighbour.previousNode = current;
            stack.push(neighbour);
          }
        }

        if (current === destinationNode) {
          break;
        }
      }
    }

    const nodesInShortestPath: Node[] = [];
    let currentNode = destinationNode;
    while (currentNode) {
      nodesInShortestPath.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }

    return [visitedNodes, nodesInShortestPath];
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

export default Dfs;
