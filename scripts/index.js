const profileImage = document.querySelector('img');
const rotationMatrixCssVariable = '--rotation-matrix';

const appName = 'rcasto-dev';
const analyticsApiUrl = 'https://analytics-service-299521.ue.r.appspot.com/analytics';
const eventTypes = {
    pageView: 'page-view',
};

const eventGenerator = window.SimpleTrack.createEventGenerator({
    appName,
    analyticsApiUrl,
});

function generateRandomBit() {
    return Math.round(Math.random());
}

function generateRandomRotationMatrix() {
    return `${generateRandomBit()}, ${generateRandomBit()}, ${generateRandomBit()}`;
}

function generateNewRotationMatrix(currentRotationMatrix) {
    let newRotationMatrix = currentRotationMatrix;

    while (newRotationMatrix === currentRotationMatrix) {
        newRotationMatrix = generateRandomRotationMatrix();
    }

    return newRotationMatrix;;
}

function onAnimationIteration() {
    const currentRotationMatrix = getComputedStyle(profileImage)
        .getPropertyValue(rotationMatrixCssVariable);
    profileImage.style
        .setProperty(rotationMatrixCssVariable, generateNewRotationMatrix(currentRotationMatrix));
}

window.addEventListener('load', () => {
    const pageViewEventData = {
        url: window.location.href,
    };

    eventGenerator.track(eventTypes.pageView, pageViewEventData);
    profileImage.addEventListener('animationiteration', onAnimationIteration);
});