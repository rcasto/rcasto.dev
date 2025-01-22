import React from "react";
import { IProject } from "../scripts/schemas";
// import { Blurb } from "./Blurb";
import { Profile } from "./Profile";
// import { Projects } from "./Projects";

interface IProps {
  projects: IProject[];
}

export function App({ projects }: IProps) {
  return (
    <>
      <main>
        <Profile />

        <div className="ball ball-r"></div>
        <div className="ball ball-g"></div>
        <div className="ball ball-b"></div>

        {/* <div className="scroll-to-projects">&#8595;</div> */}
      </main>
      {/* <section>
        <Projects projects={projects} />
      </section> */}
    </>
  );
}
