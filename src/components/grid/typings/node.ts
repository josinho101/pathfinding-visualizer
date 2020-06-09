import * as enums from "../../../enums";
type Nullable<T> = T | null;

export default interface Node {
  row: number;
  column: number;
  isStart: boolean;
  isDestination: boolean;
  isVisited: boolean;
  distance: number;
  previousNode: any;
}
