// Audio file set for Javascript.

const startBtn = document.getElementById('start-button');
const bossMusic = document.getElementById('boss-battle-music');
const hoverButtonSound = document.getElementById('button-hover');
const buttonBlipSound = document.getElementById('button-blip');
const instructions = document.getElementById('instructions');

// below: audio function to craft

function hoverButtonNoise() {
    hoverButtonSound.play();
}

function startGameNoise() {
    bossMusic.play();
}


instructions.addEventListener("mouseover", hoverButtonNoise);
instructions.addEventListener("click", startGameNoise);
startBtn.addEventListener("click", startGameNoise);
startBtn.addEventListener("mouseover", hoverButtonNoise);


// function initializeSound() {
//     window.onload = function() {
//         bossMusic.play();
//         alert("JS is working!");
//     }
// }
