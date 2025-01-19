import React from "react";
import { IProject } from "../scripts/schemas";
// import { Blurb } from "./Blurb";
import { Profile } from "./Profile";

interface IProps {
  projects: IProject[];
}

export function App({ projects }: IProps) {
  return (
    <>
      <main>
        <Profile />
        {/* <Blurb /> */}
      </main>
    </>
  );
}
