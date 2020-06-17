/**
 * Algorithm ref - https://en.wikipedia.org/wiki/A*_search_algorithm
 */

import IPathFinder from "./ipathfinder";
import Node from "../../components/grid/typings/node";

interface AStarNode {
  row: number;
  column: number;
  isVisited: boolean;
  isBrick: boolean;
  previousNode: any;
  gScore: number;
  fScore: number;
}

class AStar implements IPathFinder {
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
    return [];
  }

  /**
   * return heuristic distance
   * @param node1 node1
   * @param node2 node2
   */
  private getHeuristicValue(node1: AStarNode, node2: AStarNode) {
    let heuristicValue = 0;
    let rowDiff = Math.abs(node1.row - node2.row);
    let colDiff = Math.abs(node1.column - node2.column);
    heuristicValue = rowDiff + colDiff;

    return heuristicValue;
  }

  /**
   * flatten node to Astar node
   * @param grid grid
   */
  private mapNodeToAStarNode(grid: Node[][]) {
    let nodes: AStarNode[] = [];

    for (const row of grid) {
      for (const node of row) {
        let aStarNode: AStarNode = {
          row: node.row,
          column: node.column,
          isBrick: node.isBrick,
          fScore: Infinity,
          gScore: Infinity,
          isVisited: false,
          previousNode: undefined,
        };

        nodes.push(aStarNode);
      }
    }

    return nodes;
  }
}

export default AStar;
