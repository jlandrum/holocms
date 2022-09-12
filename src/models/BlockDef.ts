import { Schema } from "./Schema";

export default interface BlockDef {
  type: string;
  schema: Schema;
  content?: any;
}