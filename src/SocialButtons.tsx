import React from "react";

interface ISocialButtonProps {
    logoUrl: string;
    profileUrl: string;
    altText: string;
}

const socialProfiles: ISocialButtonProps[] = [
    {
        profileUrl: 'https://github.com/rcasto',
        logoUrl: '/images/github.png',
        altText: 'GitHub logo, link to my GitHub profile',
    },
    {
        profileUrl: 'https://www.linkedin.com/in/rcasto',
        logoUrl: '/images/linkedin.png',
        altText: 'LinkedIn logo, link to my LinkedIn profile',
    },
];

function SocialButton({
    logoUrl,
    profileUrl,
    altText,
}: ISocialButtonProps) {
    return (
        <a href={profileUrl} target="_blank" className="social-buttons-button">
            <img className="social-buttons-button-image" src={logoUrl} alt={altText} />
        </a>
    );
}

export function SocialButtons() {
    return (
        <div className="social-buttons">
            {socialProfiles.map(socialProfile => (
                <SocialButton
                    key={socialProfile.profileUrl}
                    {...socialProfile} />
            ))}
        </div>
    );
}