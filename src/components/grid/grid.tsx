import React from "react";
import Node from "./typings/node";
import classNames from "classnames";

interface Props {
  id: string;
  nodes: Node[][];
  isPathFindingInProgress: boolean;
  onNodeDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onNodeDropEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  onNodeMouseEnter: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onGridContainerMouseDown: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  onGridContainerMouseUp: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
}

const Grid: React.FunctionComponent<Props> = (props) => {
  const getColumn = (node: Node) => {
    let identifier = `node-${node.row}-${node.column}`;
    return (
      <div
        id={identifier}
        key={identifier}
        draggable={node.isStart || node.isDestination}
        className={classNames(
          "node",
          { start: node.isStart },
          { destination: node.isDestination },
          { brick: node.isBrick }
        )}
        onMouseEnter={props.onNodeMouseEnter}
        onDragStart={props.onNodeDragStart}
        onDragEnd={props.onNodeDropEnd}
        onDragOver={(e) => {
          e.preventDefault();
        }}
      ></div>
    );
  };

  /**
   * return row of grid
   */
  const getRow = (id: string, nodes: JSX.Element[]) => {
    return (
      <div id={id} key={id} className="row">
        {[nodes]}
      </div>
    );
  };

  /**
   * generate grid
   */
  const generateGrid = (nodes: Node[][]) => {
    let rows: JSX.Element[] = [];

    for (let row = 0; row < nodes.length; row++) {
      let nodesArray = nodes[row];
      let columns: JSX.Element[] = [];

      for (let column = 0; column < nodesArray.length; column++) {
        columns.push(getColumn(nodesArray[column]));
      }

      let rowId = `row-${row}`;
      let jsxRow = getRow(rowId, columns);

      rows.push(jsxRow);
    }

    return rows;
  };

  return (
    <div
      id={props.id}
      className={classNames("node-container", {
        "block-mouse-events": props.isPathFindingInProgress,
      })}
      onMouseDown={props.onGridContainerMouseDown}
      onMouseUp={props.onGridContainerMouseUp}
    >
      {generateGrid(props.nodes)}
    </div>
  );
};

export default Grid;
