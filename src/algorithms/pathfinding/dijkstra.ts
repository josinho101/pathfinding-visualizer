/**
 * Algorithm ref - https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
 */

import IPathFinder from "./ipathfinder";
import Node from "../../components/grid/typings/node";

class Dijkstra implements IPathFinder {
  // holds nodes
  private nodes: Node[][];

  /**
   * constructor
   */
  constructor(nodes: Node[][]) {
    this.nodes = nodes;
  }

  /**
   * find shortest path
   */
  public find = (startNode: Node, destinationNode: Node) => {
    let visitedNodes: Node[] = [];
    let unvisitedNodes: Node[] = [];

    // distance to start node is 0
    startNode.distance = 0;
    // get all nodes
    unvisitedNodes = this.flatten2DNodeArray(this.nodes);

    while (!!unvisitedNodes.length) {
      // sort the nodes by distance
      this.sortNodeByDistance(unvisitedNodes);

      // get node with shortest distance
      let adjacentNode = unvisitedNodes.shift();

      if (adjacentNode) {
        // if node is a brick then no need to do check
        if (adjacentNode.isBrick) {
          continue;
        }

        // if distance is inifinity, then it means path finding is blocked
        if (adjacentNode.distance === Infinity) {
          break;
        }

        // set node as visited adn push to visited node array
        adjacentNode.isVisited = true;
        visitedNodes.push(adjacentNode);

        // we had reached the destination, stop searching
        if (adjacentNode === destinationNode) {
          break;
        }

        this.updateDistanceOfUnvisitedNeighbors(adjacentNode, this.nodes);
      }
    }

    const nodesInShortestPath: Node[] = [];
    let currentNode = destinationNode;
    while (currentNode) {
      nodesInShortestPath.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }

    return [visitedNodes, nodesInShortestPath];
  };

  private updateDistanceOfUnvisitedNeighbors(node: Node, grid: Node[][]) {
    const unvisitedNeighbours = this.getUnvisitedNeighbors(node, grid);

    for (const neighbor of unvisitedNeighbours) {
      neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
    }
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

  /**
   * return nodes in sorted order based on distance
   * @param nodes nodes
   */
  private sortNodeByDistance(nodes: Node[]) {
    nodes.sort((a: Node, b: Node) => a.distance - b.distance);
  }

  /**
   * flatten 2D grid to array of nodes
   * @param grid grid
   */
  private flatten2DNodeArray(grid: Node[][]) {
    let nodes: Node[] = [];

    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }

    return nodes;
  }
}

export default Dijkstra;
