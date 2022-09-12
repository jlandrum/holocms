import ProjectConfig from "./ProjectConfig";

export default interface MongoDbProjectConfig extends ProjectConfig {
  type: 'mongodb';
  collection?: string;
  url?: string;
  port?: string;  
  username?: string;
}