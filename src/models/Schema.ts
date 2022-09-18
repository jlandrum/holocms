export const SchemaTypes  = [
  'text', 
  'group',
  'array', 
  'boolean',
  'select',
  'subschema',
  'document',
  'any'
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
  key: string;
  [key: string]: any;
}
