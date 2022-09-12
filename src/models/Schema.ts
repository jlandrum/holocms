export interface Schema {
  type: 'schema';
  name: string;
  id: string;
  items: SchemaType[];
}

export interface SchemaType {
  type: 'text' | 'array';
  name: string;  
  [key: string]: any;
}
