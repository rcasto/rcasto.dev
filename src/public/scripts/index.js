import 'social-contact';
import '../styles/style.css';

const profileImage = document.querySelector('img');
const rotationMatrixCssVariable = '--rotation-matrix';

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

profileImage.addEventListener('animationiteration', onAnimationIteration);