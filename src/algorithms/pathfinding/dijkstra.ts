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
    console.log(startNode);
    console.log(destinationNode);
  };
}

export default Dijkstra;
