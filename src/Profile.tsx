import React from "react";

export function Profile() {
  return (
    <div className="profile-container">
      <div className="profile-image-container">
        <img
          className="profile-image"
          src="/images/me-min.jpg"
          alt="Just a picture of me"
        />
      </div>
      <ul>
        <li>
          <a href="https://github.com/rcasto" target="_blank">
            {/* GitHub */}
            <img src="/images/github.svg" alt="GitHub profile link" />
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/rcasto" target="_blank">
            {/* LinkedIn */}
            <img src="/images/linkedin.png" alt="LinkedIn profile link" />
          </a>
        </li>
        <li>
          <a href="mailto:me@rcasto.dev" target="_blank">
            {/* Contact */}
            <img src="/images/envelope.svg" alt="Contact via email" />
          </a>
        </li>
      </ul>
    </div>
  );
}
