import * as enums from "../enums";
import * as constants from "../constants";

class NodeHelper {
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
}

export default NodeHelper;
