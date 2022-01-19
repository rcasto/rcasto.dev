export interface IProjectLink {
    text: string;
    href: string;
}

export interface IProject {
    name: string;
    description: string;
    links: IProjectLink[];
}