import ITerrainGenerator from "./iterraingenerator";
import Node from "../../components/grid/typings/node";
import UtilityHelper from "../../helper/utilityhelper";

class RandomTerrain implements ITerrainGenerator {
  // holds nodes
  private nodes: Node[][] = [];

  /**
   * constructor
   */
  constructor(nodes: Node[][]) {
    this.nodes = nodes;
  }

  /**
   * get terrain
   */
  getTerrain(): number[][] {
    let terrain: number[][] = [];

    for (let row of this.nodes) {
      terrain.push(UtilityHelper.generateRandomArray(10, 0, row.length - 1));
    }

    return terrain;
  }
}

export default RandomTerrain;
