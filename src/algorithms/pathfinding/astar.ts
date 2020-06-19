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
    let visitedAStarNodes: AStarNode[] = [];
    let openSet: AStarNode[] = [];

    let grid = this.mapNodeToAStarNode(this.nodes);
    const [start, goal] = this.getStartAndDestination(grid);

    // set g and f values of start node
    start.gScore = 0;
    start.fScore = this.getHeuristicValue(start, goal);

    // initially push start node which is the know node
    openSet.push(start);

    while (openSet.length > 0) {
      // sort openset based on fScore and
      // set current element as node having lowest fScore
      this.sortNodeByFScore(openSet);
      let current = openSet.shift();

      if (current) {
        current.isVisited = true;
        // if current and goal nodes are same, we reached destination
        if (current === goal) {
          break;
        }

        if (current.isBrick) {
          continue;
        }

        let neighbors = this.getNeighbors(current, grid);

        for (const neighbor of neighbors) {
          // find tentative gScore. node distance is taken as 1
          let tentative_gScore = current.gScore + 1;
          if (tentative_gScore < neighbor.gScore) {
            // find heuristic distance between neighbour and destination node
            let heuristicValue = this.getHeuristicValue(neighbor, goal);
            neighbor.previousNode = current;
            neighbor.gScore = tentative_gScore;
            neighbor.fScore = neighbor.gScore + heuristicValue;

            // check if neighbour is already added to open set collection
            let index = openSet.indexOf(neighbor);
            if (index === -1) {
              openSet.push(neighbor);
              visitedAStarNodes.push(neighbor);
            }
          }
        }
      }
    }

    // arrange nodes in path order
    let aStarPath = this.getNodesAsPath(goal);
    // get visited nodes
    let visitedNodes = this.mapAstarNodeToNode(
      visitedAStarNodes.filter((i) => i.isVisited)
    );
    let path = this.mapAstarNodeToNode(aStarPath);

    return [visitedNodes, path];
  }

  /**
   * return nodes in path order
   * @param destination destination node
   */
  private getNodesAsPath(destination: AStarNode) {
    const nodesInShortestPath: AStarNode[] = [];
    let currentNode = destination;
    while (currentNode) {
      nodesInShortestPath.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }

    return nodesInShortestPath;
  }

  /**
   * map AStarNode to Node
   * @param visitedNodes visited nodes
   */
  private mapAstarNodeToNode = (visitedNodes: AStarNode[]) => {
    let nodes: Node[] = [];
    for (let astarNode of visitedNodes) {
      let node: Node = {
        row: astarNode.row,
        column: astarNode.column,
        distance: Infinity,
        isBrick: false,
        isDestination: astarNode.isDestination,
        isStart: astarNode.isStart,
        isVisited: true,
        previousNode: astarNode.previousNode,
      };

      nodes.push(node);
    }

    return nodes;
  };

  /**
   * return neighbors of the given node
   * @param node node
   * @param grid grid
   */
  private getNeighbors(node: AStarNode, grid: AStarNode[][]) {
    const neighbors: AStarNode[] = [];
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
    return neighbors;
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

  /**
   * find start and destination node from grid
   * @param grid grid
   */
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

  /**
   * init empty node
   */
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
