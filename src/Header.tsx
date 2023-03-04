import React from 'react';
// import { SocialButtons } from './SocialButtons';

export function Header() {
    return (
        <header className='app-header'>
            <div className='app-header-left'>
            <img
                    className='profile-image'
                    src="/images/me.jpg"
                    alt="Just a picture of me" />
            </div>
            <div className='app-header-right'>
                <a href="https://github.com/rcasto" target="_blank">
                    GitHub
                </a>
                <a href="https://www.linkedin.com/in/rcasto" target="_blank">
                    LinkedIn
                </a>
                <a href="mailto:me@rcasto.dev" target="_blank">
                    Contact
                </a>
            </div>
        </header>
    )
}