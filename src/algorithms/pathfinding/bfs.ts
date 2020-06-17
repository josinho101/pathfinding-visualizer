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
import NodeHelper from "../../helper/nodehelper";
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
    let visitedNodes = [];

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

        let unvisitedNodes = NodeHelper.getUnvisitedNeighbors(
          current,
          this.nodes
        );
        for (let nieghbour of unvisitedNodes) {
          nieghbour.isVisited = true;
          nieghbour.previousNode = current;
          queue.push(nieghbour);
          visitedNodes.push(nieghbour);
        }
      }
    }

    const path: Node[] = NodeHelper.getNodesAsPath(destinationNode);

    return [visitedNodes, path];
  }
}

export default Bfs;
