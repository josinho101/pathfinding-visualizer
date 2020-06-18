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
  isStart: boolean;
  isDestination: boolean;
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
    let openSet: AStarNode[] = [];
    let cameFrom: AStarNode[] = [];

    let grid = this.mapNodeToAStarNode(this.nodes);
    let nodes = this.flatten2DArray(grid);
    const [start, goal] = this.getStartAndDestination(grid);

    // set g and f values of start node
    start.gScore = 0;
    start.fScore = this.getHeuristicValue(start, goal);

    // initially push start node which is the know node
    openSet.push(start);

    while (openSet.length > 0) {
      // sort openset based on fScore and set
      // current element as node having lowest fScore
      this.sortNodeByFScore(openSet);
      let current = openSet.shift();

      if (current) {
        // if current and goal nodes are same, we reached destination
        if (current === goal) {
          break;
        }
      }
    }

    return [];
  }

  /**
   * return nodes in sorted order based on fScore
   * @param nodes nodes
   */
  private sortNodeByFScore(nodes: AStarNode[]) {
    nodes.sort((a: AStarNode, b: AStarNode) => a.fScore - b.fScore);
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

  private getStartAndDestination(grid: AStarNode[][]) {
    let start = this.getEmptyAStartNode();
    let goal = this.getEmptyAStartNode();

    for (let row of grid) {
      for (let node of row) {
        if (node.isStart) {
          start = node;
        }
        if (node.isDestination) {
          goal = node;
        }
      }
    }

    return [start, goal];
  }

  private getEmptyAStartNode() {
    let node: AStarNode = {
      row: 0,
      column: 0,
      isBrick: false,
      isStart: false,
      isDestination: false,
      fScore: Infinity,
      gScore: Infinity,
      isVisited: false,
      previousNode: undefined,
    };

    return node;
  }

  /**
   * flatten node to Astar node
   * @param grid grid
   */
  private flatten2DArray(grid: AStarNode[][]) {
    let nodes: AStarNode[] = [];

    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }

    return nodes;
  }

  /**
   * flatten node to Astar node
   * @param grid grid
   */
  private mapNodeToAStarNode(grid: Node[][]) {
    let nodes: AStarNode[][] = [];

    for (const row of grid) {
      let rowItems: AStarNode[] = [];

      for (const node of row) {
        let aStarNode: AStarNode = {
          row: node.row,
          column: node.column,
          isBrick: node.isBrick,
          isStart: node.isStart,
          isDestination: node.isDestination,
          fScore: Infinity,
          gScore: Infinity,
          isVisited: false,
          previousNode: undefined,
        };

        rowItems.push(aStarNode);
      }

      nodes.push(rowItems);
    }

    return nodes;
  }
}

export default AStar;
