import React from "react";
import Grid from "../grid/grid";
import StageControls from "./stagecontrols";
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

  render() {
    return (
      <div className="stage">
        <StageControls />
        <NodeDescriptor />
        <Grid
          id="grid"
          rowCount={this.numberOfRows}
          columnCount={this.numberOfColumns}
        />
      </div>
    );
  }
}

export default Stage;
