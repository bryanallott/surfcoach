import { EntryModel } from "./EntryModel";
import { RaceModel } from "./RaceModel";

export interface ResultModel {
  id: number;
  race: RaceModel;
  entry: EntryModel;
  started: number;
  stopped: number;
  action: string;
}
