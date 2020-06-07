import React from "react";
var classNames = require("classnames");

const NodeDescriptor: React.FunctionComponent = () => {
  const getDescripor = (id: string, text: string, classNames: string) => {
    return (
      <div id={id} className="descriptor">
        <div className={classNames} />
        &nbsp;
        <span>{text}</span>
      </div>
    );
  };
  return (
    <div className="grid-descriptor">
      {getDescripor("startNode", "Start Node", classNames("node", "start"))}
      {getDescripor(
        "destinationNode",
        "Destination Node",
        classNames("node", "destination")
      )}
      {getDescripor("pathNode", "Path Node", classNames("node", "path"))}
      {getDescripor("unvisitedNode", "Unvisited Node", classNames("node"))}
      {getDescripor(
        "visitedNode",
        "Visited Node",
        classNames("node", "visited")
      )}
      {getDescripor("brickNode", "Brick Node", classNames("node", "brick"))}
    </div>
  );
};

export default NodeDescriptor;
