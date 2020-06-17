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
import NodeHelper from "../../helper/nodehelper";
import Node from "../../components/grid/typings/node";

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

          let neighbours = NodeHelper.getUnvisitedNeighbors(
            current,
            this.nodes
          );
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

    const path: Node[] = NodeHelper.getNodesAsPath(destinationNode);

    return [visitedNodes, path];
  }
}

export default Dfs;
