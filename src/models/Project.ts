import ProjectConfig from "./ProjectConfig";

export default interface Project {
  name: string;
  id: string;
  config: ProjectConfig;
  lastUpdate: number;
}