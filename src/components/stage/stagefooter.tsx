import React from "react";
import * as enums from "../../enums";

interface Props {
  selectedAlgorithm: enums.Algorithm;
}

const StageFooter: React.FunctionComponent<Props> = (props) => {
  const getDijkstraDescription = () => {
    return (
      <span>
        Dijkstra's algorithm can be used for finding <b>shortest path </b>
        between nodes in a graph. It can be used in <b>weighted</b> and
        <b> unweighted</b> graphs. Using <b> negatively weighted</b> edges
        wont't guarantees shortest path. Weighted nodes not implemented in this
        visualization example.
      </span>
    );
  };

  /**
   * return description
   * @param algorithm algorithm
   */
  const getDescription = (algorithm: enums.Algorithm) => {
    let description: JSX.Element = <React.Fragment />;
    switch (algorithm) {
      case enums.Algorithm.Dijkstra:
        description = getDijkstraDescription();
        break;
    }

    return description;
  };

  return (
    <div className="stage-footer">
      <span className="note">Note: </span>
      {getDescription(props.selectedAlgorithm)}
    </div>
  );
};

export default StageFooter;
