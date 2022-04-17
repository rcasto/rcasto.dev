import React from 'react';
import { IProject } from '../scripts/schemas';
import { Project } from './Project';

interface IProps {
    projects: IProject[];
}

export function Projects({
    projects,
}: IProps) {
    return (
        <div id='projects'>
            {projects.map(project => (
                <Project key={project.name} project={project} />
            ))}
        </div>
    );
}