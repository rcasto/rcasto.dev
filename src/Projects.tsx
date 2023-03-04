import React from 'react';
import { IProject } from '../scripts/schemas';
import { Expandable } from './Expandable';
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
                <Expandable key={project.name} title={project.name}>
                    <Project project={project} />
                </Expandable>
            ))}
        </div>
    );
}