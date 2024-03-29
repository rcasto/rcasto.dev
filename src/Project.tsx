import React from 'react';
import { IProject } from '../scripts/schemas';

interface IProps {
    project: IProject;
}

export function Project({
    project,
}: IProps) {
    return (
        <article className='project'>
            <div className='project-description'>
                {project.description}
            </div>
            <div className='project-links'>
                {project.links.map(link => (
                    <a
                        key={link.href}
                        href={link.href}
                        target='_blank'
                    >
                        {link.text}
                    </a>
                ))}
            </div>
        </article>
    );
}