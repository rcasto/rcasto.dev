import React from 'react';
import { IProject } from '../scripts/schemas';
import { Header } from './Header';
import { Projects } from './Projects';

interface IProps {
    projects: IProject[];
}

export function App({
    projects,
}: IProps) {
    return (
        <>
            <Header />
            <main className='app-main'>
                <p className='app-main-plug'>I like building tools, libraries, and more generally things that enable and just maybe, inspire people in some way. Cheeky, but hey, its possible</p>
                <Projects projects={projects} />
            </main>
        </>
    );
}