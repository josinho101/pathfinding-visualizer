import Node from "../../components/grid/typings/node";
import * as enums from "../../enums";
import Dijkstra from "./dijkstra";

class PathFindingEngine {
  // holds nodes
  private nodes: Node[][];

  constructor(nodes: Node[][]) {
    this.nodes = nodes;
  }

  /**
   * find shortest path
   * @param startNode start node
   * @param destinationNode destination node1
   * @param algorithm selected algorithm
   */
  public find(
    startNode: Node,
    destinationNode: Node,
    algorithm: enums.Algorithm
  ) {
    let pathFinder;

    switch (algorithm) {
      case enums.Algorithm.Dijkstra:
        pathFinder = new Dijkstra(this.nodes);
        break;
    }

    pathFinder.find(startNode, destinationNode);
  }
}

export default PathFindingEngine;
