import { String } from "lodash";
import { i } from "./lang/I18N";

export const plurality = (item: number, singular: string, plural: string) => 
item === 1 ? i(singular, item) : i(plural, item);