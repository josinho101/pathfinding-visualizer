import * as enums from "../enums";
import * as constants from "../constants";
import UtilityHelper from "./utilityhelper";
import Node from "../components/grid/typings/node";

class NodeHelper {
  /**
   * return start and destination node poistion.
   */
  public static getDefaultNodePosition = () => {
    /*let startRow = UtilityHelper.getRamdonNumber(1, 19);
    let startColumn = UtilityHelper.getRamdonNumber(1, 11);
    let destinationRow = UtilityHelper.getRamdonNumber(1, 19);
    let destinationColumn = UtilityHelper.getRamdonNumber(40, 49);

    return [
      [startRow, startColumn],
      [destinationRow, destinationColumn],
    ];*/

    return [
      [9, 11],
      [9, 40],
    ];
  };

  /**
   * create a node
   */
  public static createNode = (
    row: number,
    column: number,
    defaultNodePosition: number[][]
  ) => {
    const startRow = defaultNodePosition[0][0];
    const startColumn = defaultNodePosition[0][1];
    const destinationRow = defaultNodePosition[1][0];
    const destinationColumn = defaultNodePosition[1][1];

    let node: Node = {
      row: row,
      column: column,
      distance: Infinity,
      previousNode: undefined,
      isVisited: false,
      isStart: row === startRow && column === startColumn,
      isDestination: row === destinationRow && column === destinationColumn,
    };

    return node;
  };

  /**
   * Initialize nodes
   */
  public static initNodes = (
    numberOfRows: number,
    numberOfColumns: number,
    defaultNodePosition: number[][]
  ) => {
    let nodes: Node[][] = [];

    for (let row = 0; row < numberOfRows; row++) {
      let newRow: Node[] = [];

      for (let column = 0; column < numberOfColumns; column++) {
        let node = NodeHelper.createNode(row, column, defaultNodePosition);
        newRow.push(node);
      }

      nodes.push(newRow);
    }

    return nodes;
  };

  /**
   * return true if element has destination class
   * @param element element
   */
  public static isDestinationNode(element: Element) {
    return element.classList.contains(constants.NodeClass.destination);
  }

  /**
   * return true if element has start class
   * @param element element
   */
  public static isStartNode(element: Element) {
    return element.classList.contains(constants.NodeClass.start);
  }

  /**
   * return true if element has node class
   * @param element element
   */
  public static isNode(element: Element) {
    return element.classList.contains(constants.NodeClass.node);
  }

  /**
   * return node type of element
   * @param element  element
   */
  public static getNodeType(element: Element) {
    let type = enums.NodeType.None;

    if (element) {
      let classList = element.classList;

      if (classList.contains(constants.NodeClass.start)) {
        type = enums.NodeType.Start;
      } else if (classList.contains(constants.NodeClass.destination)) {
        type = enums.NodeType.Destination;
      }
    }

    return type;
  }

  /**
   * return css class for a node
   * @param nodeType node type
   */
  public static getNodeClass(nodeType: enums.NodeType) {
    let className = "";

    switch (nodeType) {
      case enums.NodeType.Start:
        className = constants.NodeClass.start;
        break;
      case enums.NodeType.Destination:
        className = constants.NodeClass.destination;
        break;
    }

    return className;
  }

  /**
   * get node position from element id
   * @param element element
   */
  public static getNodePositionFromElemet(element: Element) {
    if (element) {
      let id = element.id;
      let idParts = id.split("-");
      return [parseInt(idParts[1]), parseInt(idParts[2])];
    }
  }
}

export default NodeHelper;
