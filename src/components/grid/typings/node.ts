import * as enums from "../../../enums";
type Nullable<T> = T | null;

export default interface Node {
  row: number;
  column: number;
  isStart: boolean;
  isDestination: boolean;
  isVisited: boolean;
  isBrick: boolean;
  distance: number;
  previousNode: any;
}
