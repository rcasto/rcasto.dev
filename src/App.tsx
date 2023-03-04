import React from 'react';
import { IProject } from '../scripts/schemas';
// import { Expandable } from './Expandable';
import { Footer } from './Footer';
import { Header } from './Header';
import { Projects } from './Projects';
// import { SocialButtons } from './SocialButtons';
// import { SourceLink } from './SourceLink';

interface IProps {
    projects: IProject[];
}

export function App({
    projects,
}: IProps) {
    return (
        <>
            {/* <header>
                <img
                    className='profile-image'
                    src="/images/me.jpg"
                    alt="Just a picture of me" />
                <SocialButtons />
            </header> */}
            <Header />
            <main className='app-main'>
                <p className='app-main-plug'>I like building tools, libraries, and more generally things that enable and just maybe, inspire people in some way</p>
                <Projects projects={projects} />
            </main>
            <Footer />
            {/* <aside>
                <SourceLink />
            </aside> */}
        </>
    );
}