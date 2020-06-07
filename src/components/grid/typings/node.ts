import * as enums from "../../../enums";

export default interface Node {
  row: number;
  column: number;
  type: enums.NodeType;
}
