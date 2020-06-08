import React from "react";
import Grid from "../grid/grid";
import * as enums from "../../enums";
import StageControls from "./stagecontrols";
import NodeHelper from "../../helper/nodehelper";
import NodeDescriptor from "../grid/nodedescriptor";

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

  render() {
    return (
      <div className="stage">
        <StageControls />
        <NodeDescriptor />
        <Grid
          id="grid"
          rowCount={this.numberOfRows}
          columnCount={this.numberOfColumns}
          onDragStart={this.onDragStart}
          onNodeDropEnd={this.onNodeDropEnd}
        />
      </div>
    );
  }

  /**
   * triggered when a node is dragged
   */
  private onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
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
    }

    this.draggedNodeType = enums.NodeType.None;
  };
}

export default Stage;
