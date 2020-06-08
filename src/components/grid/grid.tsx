import React from "react";
import Node from "./typings/node";
import classNames from "classnames";
import * as enums from "../../enums";

interface Props {
  id: string;
  nodes: Node[][];
  onNodeDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
  onNodeDropEnd: (event: React.DragEvent<HTMLDivElement>) => void;
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
          { destination: node.isDestination }
        )}
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
    <div id={props.id} className="node-container">
      {generateGrid(props.nodes)}
    </div>
  );
};

export default Grid;
