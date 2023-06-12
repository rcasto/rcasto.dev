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
                <div className='app-main-plug'>
                    <p>Welcome to my little slice of the internet!</p>
                    <p>
                        I'm a dev who likes the web and building tools that aim to enable or make things easier for folks.
                        This site primarily serves as medium to collect links to my projects and socials. Take a look around and let me know what you think!
                    </p>
                </div>
                <Projects projects={projects} />
            </main>
        </>
    );
}