import { IProject } from '../scripts/schemas';

import { cupandpen } from './cupandpen';
import { adaptiveHtml } from './adaptive-html';
import { simplequad } from './simplequad';
import { OneFitBus } from './OneFitBus';
import { covid19 } from './covid19-report';
import { seeds4tracks } from './seeds4tracks';
import { ablab } from './ablab';
import { edits } from './edits';
import { imagePixelator } from './image-pixelator';
import { peerPass } from './peer-pass';

export const projects: IProject[] = [
    adaptiveHtml,
    simplequad,
    covid19,
    ablab,
    edits,
    OneFitBus,
    peerPass,
    cupandpen,
    seeds4tracks,
    imagePixelator,
];