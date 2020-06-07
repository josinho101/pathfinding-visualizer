import React from "react";
import classNames from "classnames";
import * as constants from "../../constants";

const NodeDescriptor: React.FunctionComponent = () => {
  /**
   * get node descriptor
   * @param id id of descriptor
   * @param text text to display
   * @param classNames classnames to add
   */
  const getDescripor = (id: string, text: string, classNames: string) => {
    return (
      <div id={id} className="descriptor">
        <div className={classNames} />
        &nbsp;
        <span>{text}</span>
      </div>
    );
  };

  const cssClass = constants.NodeClass;

  return (
    <div className="grid-descriptor">
      {getDescripor(
        "startNode",
        "Start Node",
        classNames(cssClass.node, cssClass.start)
      )}
      {getDescripor(
        "destinationNode",
        "Destination Node",
        classNames(cssClass.node, cssClass.destination)
      )}
      {getDescripor(
        "pathNode",
        "Path Node",
        classNames(cssClass.node, cssClass.path)
      )}
      {getDescripor(
        "unvisitedNode",
        "Unvisited Node",
        classNames(cssClass.node)
      )}
      {getDescripor(
        "visitedNode",
        "Visited Node",
        classNames(cssClass.node, cssClass.visited)
      )}
      {getDescripor(
        "brickNode",
        "Brick Node",
        classNames(cssClass.node, cssClass.brick)
      )}
    </div>
  );
};

export default NodeDescriptor;
