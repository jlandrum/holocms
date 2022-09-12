import { useState } from 'react';
import NewProject from '../../dialogs/NewProject';
import Button from "../units/Button";
import Dialog from "../units/Dialog";
import Text from "../units/Text";
import { FaProjectDiagram } from 'react-icons/fa';
import { BiPlus } from 'react-icons/bi';
import ToolPanel from '../units/ToolPanel';
import { useAppManager, useProject, useProjectList } from '../units/ApplicationManager';
import Project from '../../models/Project';

interface ProjectsPanelProps {
  collapsed?: boolean;
}

const ProjectsPanel = ({collapsed}: ProjectsPanelProps) => {
  const [showNewProject, setShowNewProject] = useState(false);
  const projects = useProjectList();
  const appManager = useAppManager();
  const activeProject = useProject();

  const [size, setSize] = useState(200);

  const loadProject = (project: Project) => {    
    appManager.setActiveProject(project);
  }

  return (
    <>
      <Dialog show={showNewProject} onClosed={() => setShowNewProject(false)}>
        {() => <NewProject />}
      </Dialog>
      <ToolPanel size={size} onSizeChanged={setSize} draggableArea>
        {
          projects.length === 0 ? (
            <div className='flex w-full h-auto flex-grow justify-center'>
              <Button type="outline" onClick={() => setShowNewProject(true)}>Add Platform</Button>
            </div>
          ) : ( 
            <div className='flex flex-grow flex-col justify-items-stretch w-full scroll-m-0'>
              <Text customStyle className='text-tiny px-4 py-1 text-neutral-500 dark:text-neutral-500 font-bold'>Sites</Text>
              { projects.map(project => (
                <Button type='listItemLarge' 
                        className='flex'
                        selected={activeProject?.id === project.id}
                        key={project.id}
                        onClick={() => {
                          loadProject(project);
                        }}>
                          <FaProjectDiagram className='mr-2 self-center flex-shrink-0' />
                          <Text customStyle className='truncate'>{project.name}</Text>
                </Button>
                ))}
              <div className='flex-grow block' />
              <div className='p-2'>
                <Button type='icon' 
                        className='justify-center flex'
                        onClick={() => setShowNewProject(true)}>
                  <BiPlus size="16" className='flex-shrink-0 m-1 dark:text-white' />
                </Button>
              </div>  
            </div>
          )
        }
      </ToolPanel>
    </>
  )
}

export default ProjectsPanel;