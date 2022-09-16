export const SchemaTypes  = [
  'text', 
  'group',
  'array', 
  'subschema',
  'document'
] as const;

export interface Schema {
  type: 'schema';
  name: string;
  id: string;
  items: SchemaType[];
}

export interface SchemaType {
  type: keyof typeof SchemaTypes;
  name: string;  
  [key: string]: any;
}
