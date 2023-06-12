import React from 'react';
import { IProject } from '../scripts/schemas';
import { Project } from './Project';
import { Card } from './Card';

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
                    <Card header={project.name}>
                        <Project project={project} />
                    </Card>
                </li>
            ))}
        </ul>
    );
}