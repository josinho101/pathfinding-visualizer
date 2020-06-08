import React from "react";
import Grid from "../grid/grid";
import * as enums from "../../enums";
import Node from "../grid/typings/node";
import StageControls from "./stagecontrols";
import NodeHelper from "../../helper/nodehelper";
import NodeDescriptor from "../grid/nodedescriptor";
import PathFindingEngine from "../../algorithms/pathfinding/pathfindingengine";

interface State {
  renderedOn: number;
}

interface Props {}

class Stage extends React.Component<Props, State> {
  // number of rows in grid
  private numberOfRows = 20;

  // number of columns in a row
  private numberOfColumns = 50;

  // holds currently dragged node type
  private draggedNodeType = enums.NodeType.None;

  // holds nodes
  private nodes: Node[][];

  // selected path finding algorithm
  private selectedAlgorithm = enums.Algorithm.Dijkstra;

  // holds node position.
  private nodePositions: number[][];

  /**
   * constructor for stage component
   */
  constructor(props: Props, state: State) {
    super(props, state);

    // initialize nodes for grid
    this.nodePositions = NodeHelper.getDefaultNodePosition();
    this.nodes = NodeHelper.initNodes(
      this.numberOfRows,
      this.numberOfColumns,
      this.nodePositions
    );
  }

  render() {
    return (
      <div className="stage">
        <StageControls onVisualizeClick={this.onVisualizeClick} />
        <NodeDescriptor />
        <Grid
          id="grid"
          nodes={this.nodes}
          onNodeDragStart={this.onNodeDragStart}
          onNodeDropEnd={this.onNodeDropEnd}
        />
      </div>
    );
  }

  /**
   * triggered when visualize button is clicked
   */
  private onVisualizeClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const startRow = this.nodePositions[0][0];
    const startColumn = this.nodePositions[0][1];
    const destinationRow = this.nodePositions[1][0];
    const destinationColumn = this.nodePositions[1][1];

    let startNode = this.nodes[startRow][startColumn];
    let destinationNode = this.nodes[destinationRow][destinationColumn];
    let pathfindingEngine = new PathFindingEngine(this.nodes);
    pathfindingEngine.find(startNode, destinationNode, this.selectedAlgorithm);
  };

  /**
   * triggered when a node is dragged
   */
  private onNodeDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    let target: any = e.target;
    if (
      NodeHelper.isNode(target) &&
      (NodeHelper.isStartNode(target) || NodeHelper.isDestinationNode(target))
    ) {
      let nodeType = NodeHelper.getNodeType(target);
      this.draggedNodeType = nodeType;

      let cssClass = NodeHelper.getNodeClass(nodeType);
      target.classList.remove(cssClass);
      target.setAttribute("draggable", "false");
    }
  };

  /**
   * triggered when node drop
   */
  private onNodeDropEnd = (e: React.DragEvent<HTMLDivElement>) => {
    let element: any = e.target;
    let x = e.clientX;
    let y = e.clientY;
    let currentElement = document.elementFromPoint(x, y);
    let cssClass = NodeHelper.getNodeClass(this.draggedNodeType);
    if (cssClass !== "") {
      if (
        currentElement &&
        NodeHelper.isNode(currentElement) &&
        !NodeHelper.isStartNode(currentElement) &&
        !NodeHelper.isDestinationNode(currentElement)
      ) {
        element = currentElement;
      }
      element.classList.add(cssClass);
      element.setAttribute("draggable", "true");

      let newPosition = NodeHelper.getNodePositionFromElemet(element);
      if (newPosition) {
        if (this.draggedNodeType === enums.NodeType.Start) {
          this.nodePositions[0] = newPosition;
        } else if (this.draggedNodeType === enums.NodeType.Destination) {
          this.nodePositions[1] = newPosition;
        }
      }
    }

    this.draggedNodeType = enums.NodeType.None;
  };
}

export default Stage;
