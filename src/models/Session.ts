import HoloDocument from "./HoloDocument";
import { Schema } from "./Schema";

export default interface Session {
  projectId: string;
  documents: HoloDocument[];
  schemas: Schema[];
  lastEvent: number;
}