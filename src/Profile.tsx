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
          <a
            href="https://github.com/rcasto"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
          >
            <img src="/images/github.svg" aria-hidden="true" alt="" />
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/rcasto"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
          >
            <img src="/images/linkedin.png" aria-hidden="true" alt="" />
          </a>
        </li>
        <li>
          <a
            href="mailto:me@rcasto.dev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact via email"
          >
            <img src="/images/envelope.svg" aria-hidden="true" alt="" />
          </a>
        </li>
      </ul>
    </div>
  );
}
