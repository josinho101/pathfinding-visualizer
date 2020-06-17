/**
 * Algorithm ref - https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
 */

import IPathFinder from "./ipathfinder";
import NodeHelper from "../../helper/nodehelper";
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

    const path: Node[] = NodeHelper.getNodesAsPath(destinationNode);

    return [visitedNodes, path];
  };

  private updateDistanceOfUnvisitedNeighbors(node: Node, grid: Node[][]) {
    const unvisitedNeighbours = NodeHelper.getUnvisitedNeighbors(node, grid);

    for (const neighbor of unvisitedNeighbours) {
      neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
    }
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
