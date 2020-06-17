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

  const getBfsDescription = () => {
    return (
      <span>
        Breadth-first search (BFS) is a traversing algorithm where traversing
        starts from a selected node (<b>starting node</b>) and traverse the
        graph <b>layerwise</b> thus exploring the neighbour nodes. BFS won't
        work on <b>weighted</b> graps. It <b>guarantees shortest path</b> on
        unweighted graphs.
      </span>
    );
  };

  const getDfsDescription = () => {
    return (
      <span>
        Depth-first search (DFS) is an algorithm for traversing tree or graph
        data structures. The algorithm starts at the <b>root node</b> and
        explores as far as possible along each branch before backtracking. DFS
        won't work on <b>weighted</b> graps, and <b>won't guarantees </b>
        shortest path.
      </span>
    );
  };

  const getAStarDescription = () => {
    return (
      <span>
        A* ('A-star') is a graph traversal and path search algorithm, which is
        often used in many fields of computer science due to its completeness,
        optimality, and optimal efficiency. A* achieves better performance by
        using <b>heuristics</b> to guide its search. A-star work on both
        <b> weighted</b> and <b>unweighted</b> graps. This algorithm guarantees{" "}
        <b>shortest path</b>.
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
      case enums.Algorithm.Bfs:
        description = getBfsDescription();
        break;
      case enums.Algorithm.Dfs:
        description = getDfsDescription();
        break;
      case enums.Algorithm.AStar:
        description = getAStarDescription();
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
