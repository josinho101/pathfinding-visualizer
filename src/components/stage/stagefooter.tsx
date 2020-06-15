import React from "react";
import * as enums from "../../enums";

interface Props {
  selectedAlgorithm: enums.Algorithm;
}

const StageFooter: React.FunctionComponent<Props> = (props) => {
  return (
    <div className="stage-footer">
      <span className="note">Note:- </span>
      <span>Algorithm description goes here</span>
    </div>
  );
};

export default StageFooter;
