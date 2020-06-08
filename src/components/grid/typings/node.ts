import * as enums from "../../../enums";

export default interface Node {
  row: number;
  column: number;
  isStart: boolean;
  isDestination: boolean;
  isVisited: boolean;
  distance: number;
  previousNode: Node | undefined;
}
