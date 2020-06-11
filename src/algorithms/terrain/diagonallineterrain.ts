import ITerrainGenerator from "./iterraingenerator";
import Node from "../../components/grid/typings/node";

class DiagonalLineTerrain implements ITerrainGenerator {
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
  public getTerrain(): number[][] {
    let terrain: number[][] = [];
    let row = 1;
    let column = 1;

    for (let i = 0; i < 18; i++) {
      if (i > row) {
        terrain.push([
          row + i,
          column + i,
          row + i + 10,
          column + i + 10,
          row + i + 20,
          column + i + 20,
          row + i + 30,
          column + i + 30,
        ]);
      } else {
        terrain.push([]);
      }
    }

    return terrain;
  }
}

export default DiagonalLineTerrain;
