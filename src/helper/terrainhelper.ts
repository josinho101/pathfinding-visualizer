import * as enums from "../enums";
import DropdownOption from "../components/common/typings/dropdownoption";
import Node from "../components/grid/typings/node";

class TerrainHelper {
  /**
   * get terrain dropdown options
   */
  public static getTerrainOption = (selectedTerrain: enums.TerrainType) => {
    let options: DropdownOption[] = [];

    let none: DropdownOption = {
      id: enums.TerrainType.None,
      value: TerrainHelper.getTerrainName(enums.TerrainType.None),
      isSelected: false,
    };

    let randomBricks: DropdownOption = {
      id: enums.TerrainType.RandomBricks,
      value: TerrainHelper.getTerrainName(enums.TerrainType.RandomBricks),
      isSelected: true,
    };

    let JTerrain: DropdownOption = {
      id: enums.TerrainType.JTerrain,
      value: TerrainHelper.getTerrainName(enums.TerrainType.JTerrain),
      isSelected: false,
    };

    options.push(none);
    options.push(randomBricks);
    options.push(JTerrain);

    for (let option of options) {
      option.isSelected = option.id === selectedTerrain;
    }

    return options;
  };

  /**
   * get terrain name based on type
   * @param type terrain type
   */
  public static getTerrainName(type: enums.TerrainType) {
    let name = "";

    switch (type) {
      case enums.TerrainType.None:
        name = "Blank Terrain";
        break;
      case enums.TerrainType.RandomBricks:
        name = "Random Bricks";
        break;
      case enums.TerrainType.JTerrain:
        name = "J Terrain";
        break;
    }

    return name;
  }

  /**
   * set all nodes as non brick
   * @param nodes nodes
   */
  public static removeAllBrickNode(nodes: Node[][]) {
    for (const row of nodes) {
      for (const column of row) {
        column.isBrick = false;
      }
    }
  }
}

export default TerrainHelper;
