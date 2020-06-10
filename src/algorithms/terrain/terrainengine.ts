import ITerrainGenerator from "./iterraingenerator";
import * as enums from "../../enums";
import RandomTerrain from "./randomterrain";
import Node from "../../components/grid/typings/node";

class TerrainEngine {
  // holds nodes
  private nodes: Node[][] = [];

  /**
   * constructor
   */
  constructor(nodes: Node[][]) {
    this.nodes = nodes;
  }

  /**
   * set terrain i grid
   * @param terrainType terrain type
   */
  public setTerrain(terrainType: enums.TerrainType) {
    let terrainGenerator: ITerrainGenerator;

    switch (terrainType) {
      case enums.TerrainType.RandomBricks:
        terrainGenerator = new RandomTerrain(this.nodes);
        break;
      default:
        throw new Error("Terrain not found :|");
    }

    let terrain = terrainGenerator.getTerrain();
    this.mapTerrainToNodes(this.nodes, terrain);
  }

  /**
   * map terrain to nodes
   * @param nodes nodes
   * @param terrain terrain
   */
  private mapTerrainToNodes(nodes: Node[][], terrain: number[][]) {
    for (let i = 0; i < nodes.length; i++) {
      let row = nodes[i];
      let terrainRow = terrain[i];
      for (let j = 0; j < terrainRow.length; j++) {
        let node = row[terrainRow[j]];
        if (!node.isStart && !node.isDestination) {
          row[terrainRow[j]].isBrick = true;
        }
      }
    }
  }
}

export default TerrainEngine;
