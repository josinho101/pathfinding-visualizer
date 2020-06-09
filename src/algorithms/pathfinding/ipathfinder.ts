import Node from "../../components/grid/typings/node";

export default interface IPathFinder {
  find(startNode: Node, destinationNode: Node): Node[][];
}
