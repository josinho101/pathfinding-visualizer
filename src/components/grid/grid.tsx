import React from "react";
import Node from "./typings/node";
import classNames from "classnames";
import * as enums from "../../enums";

interface Props {
  id: string;
  rowCount: number;
  columnCount: number;
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
  onNodeDropEnd: (event: React.DragEvent<HTMLDivElement>) => void;
}

const Grid: React.FunctionComponent<Props> = (props) => {
  // start node in grid
  const startNode: Node = {
    row: 10,
    column: 11,
    type: enums.NodeType.Start,
  };

  // destination node in grid
  const destinationNode: Node = {
    row: 10,
    column: 40,
    type: enums.NodeType.Destination,
  };

  // return true if node is start node
  const isStartNode = (row: number, column: number) => {
    return row === startNode.row && column === startNode.column;
  };

  // return true if node is destination node
  const isDestinationNode = (row: number, column: number) => {
    return row === destinationNode.row && column === destinationNode.column;
  };

  /**
   * return array of nodes for a row
   */
  const getNodes = (row: number, count: number) => {
    let nodes: JSX.Element[] = [];

    for (let i = 1; i <= count; i++) {
      let identifier = `node-${row}-${i}`;
      let isStart = isStartNode(row, i);
      let isDestination = isDestinationNode(row, i);

      nodes.push(
        <div
          id={identifier}
          key={identifier}
          draggable={isStart || isDestination}
          className={classNames(
            "node",
            { start: isStart },
            { destination: isDestination }
          )}
          onDragStart={props.onDragStart}
          onDragEnd={props.onNodeDropEnd}
          onDragOver={(e) => {
            e.preventDefault();
          }}
        ></div>
      );
    }

    return nodes;
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
  const generateGrid = (numberOfRows: number, numberOfNodes: number) => {
    let rows: JSX.Element[] = [];

    for (let i = 1; i <= numberOfRows; i++) {
      let nodes = getNodes(i, numberOfNodes);
      let rowId = `row-${i}`;
      let row = getRow(rowId, nodes);
      rows.push(row);
    }

    return rows;
  };

  return (
    <div id={props.id} className="node-container">
      {generateGrid(props.rowCount, props.columnCount)}
    </div>
  );
};

export default Grid;
