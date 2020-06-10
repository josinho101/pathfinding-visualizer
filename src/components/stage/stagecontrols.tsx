import React from "react";
import * as enums from "../../enums";
import Dropdown from "../common/dropdown";
import DropdownOption from "../common/typings/dropdownoption";
import TerrainHelper from "../../helper/terrainhelper";
import NodeHelper from "../../helper/nodehelper";

interface Props {
  onVisualizeClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onAlgorithmSelected: (option: DropdownOption) => void;
  onTerrainOptionSelected: (option: DropdownOption) => void;
  selectedTerrain: enums.TerrainType;
  selectedAlgorithm: enums.Algorithm;
}

const StageControls: React.FunctionComponent<Props> = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <span className="navbar-brand title">Shortest path algorithm</span>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <Dropdown
            id="algorithm-dropdown"
            onOptionSelected={props.onAlgorithmSelected}
            options={NodeHelper.getAlgorithmOptions(props.selectedAlgorithm)}
          />
          <Dropdown
            id="terrain-dropdown"
            onOptionSelected={props.onTerrainOptionSelected}
            classname="terrain-selected-item"
            options={TerrainHelper.getTerrainOption(props.selectedTerrain)}
          />
          <li className="nav-item">
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button
              className="btn btn-success"
              onClick={props.onVisualizeClick}
            >
              Visualize
            </button>
          </li>
          <li className="nav-item dropdown">
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button className="btn btn-warning">Reset board</button>
          </li>
          <li className="range">
            <p>Visualizing speed</p>
            <input type="range" />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default StageControls;
