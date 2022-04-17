import React from 'react';
import { IProject } from '../scripts/schemas';
import { Projects } from './Projects';
import { SocialButtons } from './SocialButtons';

interface IProps {
    projects: IProject[];
}

export function App({
    projects,
}: IProps) {
    return (
        <>
            <header>
                <img className='profile-image' src="/images/me.jpg" alt="Just a picture of me" />
                <SocialButtons />
            </header>
            <main>
                <Projects projects={projects} />
            </main>
        </>
    );
}