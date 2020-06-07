import React from "react";

interface Props {
  id: string;
  rowCount: number;
  columnCount: number;
}

const Grid: React.FunctionComponent<Props> = (props) => {
  /**
   * return array of nodes for a row
   */
  const getNodes = (rowIndex: number, count: number) => {
    let nodes: JSX.Element[] = [];

    for (let i = 1; i <= count; i++) {
      let identifier = `node-${rowIndex}-${i}`;
      nodes.push(<div id={identifier} key={identifier} className="node"></div>);
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
