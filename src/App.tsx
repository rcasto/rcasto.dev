import React from 'react';
import { IProject } from '../scripts/schemas';
import { Header } from './Header';
import { Projects } from './Projects';
import { Blurb } from './Blurb';

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
                <Blurb />
                <Projects projects={projects} />
            </main>
        </>
    );
}