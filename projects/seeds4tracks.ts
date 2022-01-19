import { IProject } from "../scripts/schemas";

export const seeds4tracks: IProject = {
    name: 'seeds4tracks',
    description: 'Input your favorite artists, output tracks you might like. Uses the Spotify API under the hood.',
    links: [{
        text: 'Website',
        href: 'https://seeds4tracks-288015.uc.r.appspot.com/'
    }, {
        text: 'GitHub',
        href: 'https://github.com/rcasto/seeds4tracks'
    }]
};