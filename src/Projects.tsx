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
        <ul id='projects'>
            {projects.map(project => (
                <li key={project.name}>
                    <Expandable title={project.name}>
                        <Project project={project} />
                    </Expandable>
                </li>
            ))}
        </ul>
    );
}