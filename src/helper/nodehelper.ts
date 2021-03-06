import * as enums from "../enums";
import * as constants from "../constants";
import UtilityHelper from "./utilityhelper";
import Node from "../components/grid/typings/node";
import DropdownOption from "../components/common/typings/dropdownoption";

class NodeHelper {
  /**
   * return sorting speed
   */
  public static getAnimationSpeed = (index: number) => {
    let speed = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    return speed[index - 1];
  };

  /**
   * return start and destination node poistion.
   */
  public static getDefaultNodePosition = () => {
    let startRow = UtilityHelper.getRamdonNumber(1, 19);
    let startColumn = UtilityHelper.getRamdonNumber(1, 11);
    let destinationRow = UtilityHelper.getRamdonNumber(1, 19);
    let destinationColumn = UtilityHelper.getRamdonNumber(40, 49);

    return [
      [startRow, startColumn],
      [destinationRow, destinationColumn],
    ];

    /*return [
      [9, 11],
      [9, 40],
    ];*/
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
      isBrick: false,
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
   * toggle brick class
   * @param element html element
   */
  public static toggleBrick(element: HTMLElement, grid: Node[][]) {
    if (
      element &&
      NodeHelper.isNode(element) &&
      !NodeHelper.isStartNode(element) &&
      !NodeHelper.isDestinationNode(element)
    ) {
      let position = NodeHelper.getNodePositionFromElemet(element);
      let node = grid[position[0]][position[1]];
      node.isBrick = !node.isBrick;
    }
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

    return [];
  }

  /**
   * get node from DOM
   * @param row row
   * @param column column
   */
  public static getNodeFromDOM(row: number, column: number) {
    return document.getElementById(`node-${row}-${column}`);
  }

  /**
   * get algorithm options for dropdown
   * @param selectedAlgorithm selected algorithm
   */
  public static getAlgorithmOptions(selectedAlgorithm: enums.Algorithm) {
    let options: DropdownOption[] = [];

    let dijkstra: DropdownOption = {
      id: enums.Algorithm.Dijkstra,
      value: NodeHelper.getAlgorithmName(enums.Algorithm.Dijkstra),
      isSelected: false,
    };

    let aStar: DropdownOption = {
      id: enums.Algorithm.AStar,
      value: NodeHelper.getAlgorithmName(enums.Algorithm.AStar),
      isSelected: false,
    };

    let bfs: DropdownOption = {
      id: enums.Algorithm.Bfs,
      value: NodeHelper.getAlgorithmName(enums.Algorithm.Bfs),
      isSelected: false,
    };

    let dfs: DropdownOption = {
      id: enums.Algorithm.Dfs,
      value: NodeHelper.getAlgorithmName(enums.Algorithm.Dfs),
      isSelected: false,
    };

    options.push(dijkstra);
    options.push(aStar);
    options.push(bfs);
    options.push(dfs);

    for (let option of options) {
      option.isSelected = option.id === selectedAlgorithm;
    }

    return options;
  }

  /**
   * get algorithm name
   * @param type algorithm type
   */
  public static getAlgorithmName(type: enums.Algorithm) {
    let name = "";

    switch (type) {
      case enums.Algorithm.Dijkstra:
        name = "Dijkstra's";
        break;
      case enums.Algorithm.AStar:
        name = "A* (A Star)";
        break;
      case enums.Algorithm.Bfs:
        name = "Breadth first search";
        break;
      case enums.Algorithm.Dfs:
        name = "Depth first search";
        break;
    }

    return name;
  }

  /**
   * return nodes in path order
   * @param destination destination node
   */
  public static getNodesAsPath(destination: Node) {
    const nodesInShortestPath: Node[] = [];
    let currentNode = destination;
    while (currentNode) {
      nodesInShortestPath.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }

    return nodesInShortestPath;
  }

  /**
   * return unvisited neighbors of the given node
   * @param node node
   * @param grid grid
   */
  public static getUnvisitedNeighbors(node: Node, grid: Node[][]) {
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
}

export default NodeHelper;
