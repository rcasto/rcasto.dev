import React from 'react';

export function Header() {
    return (
        <header className='app-header'>
            <div className='app-header-left'>
                <img
                        className='profile-image'
                        src="/images/me.png"
                        alt="Just a picture of me" />
                <h1>rcasto.dev</h1>
            </div>
            <nav className='app-header-right'>
                <a href="https://github.com/rcasto" target="_blank">
                    {/* GitHub */}
                    <img src="/images/github.svg" alt="GitHub profile link" />
                </a>
                <a href="https://www.linkedin.com/in/rcasto" target="_blank">
                    {/* LinkedIn */}
                    <img src="/images/linkedin.png" alt="LinkedIn profile link" />
                </a>
                <a href="mailto:me@rcasto.dev" target="_blank">
                    {/* Contact */}
                    <img src="/images/envelope.svg" alt="Contact via email" />
                </a>
            </nav>
        </header>
    )
}