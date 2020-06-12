import Dijkstra from "./dijkstra";
import * as enums from "../../enums";
import IPathFinder from "./ipathfinder";
import NodeHelper from "../../helper/nodehelper";
import PathFindingOptions from "./pathfindingoptions";
import Node from "../../components/grid/typings/node";
import UtilityHelper from "../../helper/utilityhelper";

class PathFindingEngine {
  // holds nodes
  private nodes: Node[][];

  // path finding options
  private options: PathFindingOptions;

  constructor(nodes: Node[][], options: PathFindingOptions) {
    this.nodes = nodes;
    this.options = options;
  }

  /**
   * find shortest path
   * @param startNode start node
   * @param destinationNode destination node1
   * @param algorithm selected algorithm
   */
  public find = async (
    startNode: Node,
    destinationNode: Node,
    algorithm: enums.Algorithm
  ) => {
    let pathFinder: IPathFinder;

    switch (algorithm) {
      case enums.Algorithm.Dijkstra:
        pathFinder = new Dijkstra(this.nodes);
        break;
    }

    const [visitedNodes, nodesInShortestPath] = pathFinder.find(
      startNode,
      destinationNode
    );

    await this.animate(visitedNodes, nodesInShortestPath);
  };

  private animate = async (
    visitedNodes: Node[],
    nodesInShortestPath: Node[]
  ) => {
    for (let i = 0; i < visitedNodes.length; i++) {
      if (i === visitedNodes.length - 1) {
        for (let j = 0; j < nodesInShortestPath.length; j++) {
          const node = nodesInShortestPath[j];
          if (!this.isStartOrDestination(node)) {
            let nodeElement = NodeHelper.getNodeFromDOM(node.row, node.column);
            nodeElement?.classList.remove("visited");
            nodeElement?.classList.add("path");

            await UtilityHelper.sleep(this.options.getAnimationSpeed());
          }
        }
      }

      const node = visitedNodes[i];
      if (!this.isStartOrDestination(node)) {
        let nodeElement = NodeHelper.getNodeFromDOM(node.row, node.column);
        nodeElement?.classList.add("visited");
      }

      await UtilityHelper.sleep(this.options.getAnimationSpeed());
    }
  };

  /**
   * return true if node is start or destination
   * @param node node
   */
  private isStartOrDestination(node: Node) {
    return node.isStart || node.isDestination;
  }
}

export default PathFindingEngine;
