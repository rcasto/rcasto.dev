import 'social-contact';

const audioElems = document.querySelectorAll('audio');
const profileImg = document.querySelector('img');

let playingAudioElem = null;

profileImg.addEventListener('mouseenter', () => {
    const randomAudioIndex = Math.floor(Math.random() * audioElems.length);

    playingAudioElem = audioElems[randomAudioIndex];
    playingAudioElem.play();
});

profileImg.addEventListener('mouseleave', () => {
    if (!playingAudioElem) {
        return;
    }

    playingAudioElem.pause();
    playingAudioElem.currentTime = 0;
});