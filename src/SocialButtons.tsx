import React from "react";

interface ISocialButtonProps {
    logoUrl: string;
    profileUrl: string;
    altText: string;
}

function SocialButton({
    logoUrl,
    profileUrl,
    altText,
}: ISocialButtonProps) {
    return (
        <a href={profileUrl} className="social-buttons-button">
            <img className="social-buttons-button-image" src={logoUrl} alt={altText} />
        </a>
    );
}

export function SocialButtons() {
    return (
        <div className="social-buttons">
            <SocialButton
                profileUrl="https://github.com/rcasto"
                logoUrl="/images/github.png"
                altText="GitHub logo" />
            <SocialButton
                profileUrl="https://www.linkedin.com/in/rcasto"
                logoUrl="/images/linkedin.png"
                altText="LinkedIn logo" />
        </div>
    );
}