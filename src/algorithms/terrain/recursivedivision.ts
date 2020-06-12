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
   * toggle direction
   * @param direction direction
   */
  private toggleDirection(direction: Direction) {
    return 1 - direction;
  }

  /**
   * Divide grid
   * @param terrain terrain
   * @param rowStart row start
   * @param rowEnd row end
   * @param colStart column start
   * @param colEnd column end
   * @param direction direct of division
   */
  private divide(
    terrain: number[][],
    rowStart: number,
    rowEnd: number,
    colStart: number,
    colEnd: number,
    direction: Direction
  ) {
    if (colEnd - colStart <= 3 || rowEnd - rowStart <= 3) {
      return;
    }

    let newDirection = this.toggleDirection(direction);
    if (direction === Direction.Vertical) {
      let mid = UtilityHelper.getRamdonNumber(colStart + 1, colEnd - 1);

      for (let i = rowStart; i < rowEnd; i++) {
        let row = terrain[i];
        if (i === rowStart + 1) {
          continue;
        }

        if (row.length > 0) {
          row[row.length] = mid;
        } else {
          row.push(mid);
        }
      }

      this.divide(terrain, rowStart, rowEnd, colStart, mid - 1, newDirection);
      this.divide(terrain, rowStart, rowEnd, mid + 1, colEnd, newDirection);
    } else {
      let index = UtilityHelper.getRamdonNumber(rowStart + 1, rowEnd - 1);

      let row = terrain[index];
      for (let i = colStart; i <= colEnd; i++) {
        if (i === colStart + 1) {
          continue;
        }

        if (row.length > 0) {
          row[row.length] = i;
        } else {
          row.push(i);
        }
      }

      this.divide(terrain, rowStart, index - 1, colStart, colEnd, newDirection);
      this.divide(terrain, index + 1, rowEnd, colStart, colEnd, newDirection);
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

    this.divide(
      terrain,
      rowStart,
      rowEnd,
      colStart,
      colEnd,
      Direction.Vertical
    );

    return terrain;
  }
}

enum Direction {
  Vertical,
  Horizontal,
}

export default RecursiveDivision;
