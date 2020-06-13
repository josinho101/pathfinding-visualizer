import ITerrainGenerator from "./iterraingenerator";
import Node from "../../components/grid/typings/node";
import UtilityHelper from "../../helper/utilityhelper";

class RecursiveDivision implements ITerrainGenerator {
  // holds nodes
  private nodes: Node[][] = [];

  /**
   * constructor
   */
  constructor(nodes: Node[][]) {
    this.nodes = nodes;
  }

  /**
   * Divide grid
   * @param terrain terrain
   * @param rowStart row start
   * @param rowEnd row end
   * @param colStart column start
   * @param colEnd column end
   */
  private divide(
    terrain: number[][],
    rowStart: number,
    rowEnd: number,
    colStart: number,
    colEnd: number
  ) {
    if (colEnd - colStart <= 0 || rowEnd - rowStart <= 0) {
      return;
    }

    let width = colEnd - colStart + 1;
    let height = rowEnd - rowStart + 1;

    if (width <= height) {
      // horizontal cut
      let row = UtilityHelper.getRamdonNumber(rowStart, rowEnd);

      for (let i = colStart; i <= colEnd; i++) {
        // make a opening at column start
        if (i === colStart) {
          continue;
        }

        terrain[row].push(i);
      }

      this.divide(terrain, rowStart, row - 2, colStart, colEnd);
      this.divide(terrain, row + 2, rowEnd, colStart, colEnd);
    } else {
      // vertical cut
      let col = UtilityHelper.getRamdonNumber(colStart, colEnd);
      let row = UtilityHelper.getRamdonNumber(rowStart, rowEnd);

      for (let i = rowStart; i <= rowEnd; i++) {
        // make a opening at row start
        if (i === row) {
          continue;
        }

        terrain[i].push(col);
      }

      this.divide(terrain, rowStart, rowEnd, colStart, col - 2);
      this.divide(terrain, rowStart, rowEnd, col + 2, colEnd);
    }
  }

  /**
   * get terrain
   */
  public getTerrain(): number[][] {
    let terrain: number[][] = [];
    let rowStart = 0;
    let rowEnd = this.nodes.length - 1;
    let colStart = 0;
    let colEnd = this.nodes[0].length - 1;

    this.nodes.forEach(() => {
      terrain.push([]);
    });

    this.divide(terrain, rowStart, rowEnd, colStart, colEnd);

    return terrain;
  }
}

export default RecursiveDivision;
