import React from "react";
import Grid from "../grid/grid";
import * as enums from "../../enums";
import Node from "../grid/typings/node";
import settings from "../../appsettings";
import StageControls from "./stagecontrols";
import NodeHelper from "../../helper/nodehelper";
import NodeDescriptor from "../grid/nodedescriptor";
import TerrainHelper from "../../helper/terrainhelper";
import DropdownOption from "../common/typings/dropdownoption";
import TerrainEngine from "../../algorithms/terrain/terrainengine";
import PathFindingEngine from "../../algorithms/pathfinding/pathfindingengine";
import PathFindingOptions from "../../algorithms/pathfinding/pathfindingoptions";

interface State {
  renderedOn: number;
  renderNodes: boolean;
}

interface Props {}

class Stage extends React.Component<Props, State> {
  // number of rows in grid
  private numberOfRows = 20;

  // number of columns in a row
  private numberOfColumns = 50;

  // holds currently dragged node type
  private draggedNodeType = enums.NodeType.None;

  // holds nodes
  private nodes: Node[][] = [];

  // selected path finding algorithm
  private selectedAlgorithm = enums.Algorithm.Dijkstra;

  // holds node position.
  private nodePositions: number[][] = [];

  // selected terrain
  private selectedTerrain = enums.TerrainType.None;

  // holds boolean flag for pan started or not
  private isPanStarted = false;

  // holds flag if path fining is in progress or not
  private isPathFindingInProgress = false;

  // hold defult animation speed
  private animationSpeed: number = settings.animationSpeed.default;

  /**
   * constructor for stage component
   */
  constructor(props: Props, state: State) {
    super(props, state);
    this.state = {
      renderedOn: 0,
      renderNodes: true,
    };
    this.resetStage(false);
  }

  render() {
    return (
      <div className="stage">
        <StageControls
          onSpeedChange={this.onSpeedChange}
          onResetStage={this.onResetStage}
          onVisualizeClick={this.onVisualizeClick}
          onTerrainOptionSelected={this.onTerrainOptionSelected}
          selectedTerrain={this.selectedTerrain}
          onAlgorithmSelected={this.onAlgorithmOptionSelected}
          selectedAlgorithm={this.selectedAlgorithm}
          isPathFindingInProgress={this.isPathFindingInProgress}
        />
        <NodeDescriptor />
        {this.state.renderNodes ? (
          <Grid
            id="grid"
            nodes={this.nodes}
            onNodeDropEnd={this.onNodeDropEnd}
            onNodeDragStart={this.onNodeDragStart}
            onNodeMouseEnter={this.onNodeMouseEnter}
            onGridContainerMouseUp={this.onGridContainerMouseUp}
            onGridContainerMouseDown={this.onGridContainerMouseDown}
            isPathFindingInProgress={this.isPathFindingInProgress}
          />
        ) : null}
      </div>
    );
  }

  /**
   * set animation speed
   * @param index index of speed
   */
  private setAnimationSpeed = (index = 0) => {
    this.animationSpeed = NodeHelper.getAnimationSpeed(
      index === 0 ? settings.animationSpeed.default : index
    );
  };

  /**
   * get animation speed
   */
  private getAnimationSpeed = () => {
    return this.animationSpeed;
  };

  /**
   * on animation speed change
   * @param event event
   */
  private onSpeedChange = (event: React.ChangeEvent<HTMLElement>) => {
    let target: any = event.target;
    let weight = parseInt(target.value);
    this.setAnimationSpeed(weight);
  };

  /**
   * mouse up event for grid container
   */
  private onGridContainerMouseUp = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    this.isPanStarted = false;
  };

  /**
   * mouse down event for grid container
   */
  private onGridContainerMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    let target: any = e.target;
    this.isPanStarted = true;
    NodeHelper.toggleBrick(target, this.nodes);
    this.setState({ renderedOn: Date.now() });
  };

  /**
   * on mouse enter of node
   */
  private onNodeMouseEnter = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (this.isPanStarted) {
      let target: any = e.target;
      NodeHelper.toggleBrick(target, this.nodes);
      this.setState({ renderedOn: Date.now() });
    }
  };

  /**
   * triggered when algorithm option is selected
   */
  private onAlgorithmOptionSelected = (option: DropdownOption) => {
    if (this.selectedAlgorithm !== option.id) {
      this.selectedAlgorithm = option.id;
      this.setState({ renderedOn: Date.now() });
    }
  };

  /**
   * triggered when terrain option is selected
   */
  private onTerrainOptionSelected = (option: DropdownOption) => {
    if (this.selectedTerrain !== option.id) {
      this.selectedTerrain = option.id;
      TerrainHelper.removeAllBrickNode(this.nodes);

      if (this.selectedTerrain !== enums.TerrainType.None) {
        const terrainEngine = new TerrainEngine(this.nodes);
        terrainEngine.setTerrain(this.selectedTerrain);
      }

      this.setState({ renderNodes: true });
    }
  };

  /**
   * triggered when visualize button is clicked
   */
  private onResetStage = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    this.resetStage();
  };

  /**
   * triggered when visualize button is clicked
   */
  private onVisualizeClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    this.isPathFindingInProgress = true;
    this.setState({ renderedOn: Date.now() });

    const startRow = this.nodePositions[0][0];
    const startColumn = this.nodePositions[0][1];
    const destinationRow = this.nodePositions[1][0];
    const destinationColumn = this.nodePositions[1][1];

    let startNode = this.nodes[startRow][startColumn];
    startNode.isStart = true;

    let destinationNode = this.nodes[destinationRow][destinationColumn];
    destinationNode.isDestination = true;

    let options: PathFindingOptions = {
      getAnimationSpeed: this.getAnimationSpeed,
    };

    let pathfindingEngine = new PathFindingEngine(this.nodes, options);
    await pathfindingEngine.find(
      startNode,
      destinationNode,
      this.selectedAlgorithm
    );

    this.isPathFindingInProgress = false;
    this.setState({ renderedOn: Date.now() });
  };

  /**
   * triggered when a node is dragged
   */
  private onNodeDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    let target: any = e.target;
    if (
      NodeHelper.isNode(target) &&
      (NodeHelper.isStartNode(target) || NodeHelper.isDestinationNode(target))
    ) {
      let nodeType = NodeHelper.getNodeType(target);
      this.draggedNodeType = nodeType;

      let cssClass = NodeHelper.getNodeClass(nodeType);
      target.classList.remove(cssClass);
      target.setAttribute("draggable", "false");
    }
  };

  /**
   * triggered when node drop
   */
  private onNodeDropEnd = (e: React.DragEvent<HTMLDivElement>) => {
    let element: any = e.target;
    let x = e.clientX;
    let y = e.clientY;
    let currentElement = document.elementFromPoint(x, y);
    let cssClass = NodeHelper.getNodeClass(this.draggedNodeType);
    if (cssClass !== "") {
      if (
        currentElement &&
        NodeHelper.isNode(currentElement) &&
        !NodeHelper.isStartNode(currentElement) &&
        !NodeHelper.isDestinationNode(currentElement)
      ) {
        element = currentElement;
      }
      element.classList.add(cssClass);
      element.setAttribute("draggable", "true");

      let newPosition = NodeHelper.getNodePositionFromElemet(element);
      if (newPosition) {
        if (this.draggedNodeType === enums.NodeType.Start) {
          this.nodePositions[0] = newPosition;
        } else if (this.draggedNodeType === enums.NodeType.Destination) {
          this.nodePositions[1] = newPosition;
        }
      }
    }

    this.draggedNodeType = enums.NodeType.None;
    this.isPanStarted = false;
  };

  /**
   * reset stage
   */
  private resetStage = (doRerenderNodes: boolean = true) => {
    this.selectedTerrain = enums.TerrainType.None;
    this.nodePositions = NodeHelper.getDefaultNodePosition();
    this.nodes = NodeHelper.initNodes(
      this.numberOfRows,
      this.numberOfColumns,
      this.nodePositions
    );

    if (doRerenderNodes) {
      this.setState({ renderNodes: false }, () => {
        setTimeout(() => {
          this.setState({ renderNodes: true });
        }, 0);
      });
    }
  };
}

export default Stage;
