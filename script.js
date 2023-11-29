// Major lingering bugs:
// SFX volume mute not working, not silencing sound.
// Set Timeouts not working correctly - powers not resetting after cooldown, gauge bars not updating as necessary
// cannot successfully add border collision detection without wonky things happening to playerBox
// Couldn't get up key to function, had to eliminate collision check and somehow paradoxically it works now. be wary of future issues.
// player box was clipping on down and right, had to make an offsetb y multiplying box 1.1 offset to keep within bounds.
// must edit game initialization to include enemy box creation within game space.
// MOVEMENT VARIABLES

const gameBorder = document.getElementById('action-space');
//child collision lines???
const playerBox = document.getElementById('player-box'); //charDiv
const gameBorderRect = gameBorder.getBoundingClientRect(); //collision lines
const playerBoxRect = playerBox.getBoundingClientRect();
// const scrollTop = document.documentElement.scrollTop;
// const scrollLeft = document.documentElement.scrollLet;
// const playerBoxTop = playerBoxRect.top + scrollTop;
// const enemyCollisionRects = [];
const enemyBox = document.getElementById('enemy-box');
const enemyBoxes = document.querySelectorAll('.enemy__box');
const enemyBoxRect = enemyBox.getBoundingClientRect();

let charLeftPosition = 0;
let charTopPosition = 0;

// MOVEMENT KEYS CHECK

document.addEventListener("keydown", handleKeys);
document.addEventListener("keyup", handleKeys);

// attack click listener on enemies.
enemyBoxes.forEach((enemyBox) => enemyBox.addEventListener("click", (e) => {
  e.target.remove();
  destroyEnemy();
}));
// {
  // enemyBox.addEventListener("click", (e) => {
    // e.target.remove();
    // console.log("destroy!");
    // playerOne.attack();
    // destroyEnemy();
//   })
// }

// MOVEMENT KEYS AND BOUNDARY CHECK FUNCTION

function handleKeys(e) {
  e.preventDefault();
  let keydown = e.code;

  if (keydown === "KeyD") {
    // console.log(wallCollision(0, 0, 10, 0));
    if (!wallCollision(0, 0, 10, 0)) {
      charLeftPosition += 10;
    }
    if (charLeftPosition + Math.ceil(playerBox.offsetWidth * 1.1) <= gameBorder.offsetWidth) {
      playerBox.style.left = charLeftPosition + "px";
    } else {
      charLeftPosition = gameBorder.offsetWidth - playerBox.offsetWidth;
    } if (enemyCollision(0, 0, 0, 0)) {
      takeDamage();
    }
  }

  if (keydown === "KeyA") {
    // console.log(wallCollision(0, -10, 0, 0));
    if (!wallCollision(0, -10, 0, 0)) {
      charLeftPosition -= 10;
    }
    if (charLeftPosition >= 0) {
      playerBox.style.left = charLeftPosition + "px";
    } else {
      charLeftPosition = 0;
    } if (enemyCollision(0, 0, 0, 0)) {
      takeDamage();
    }
  }

  if (keydown === "KeyS") {
    // console.log(wallCollision(0, 0, 0, 10));
    if (!wallCollision(0, 0, 0, 10)) {
      charTopPosition += 10;
    }
    if (charTopPosition + Math.ceil(playerBox.offsetHeight * 1.1) <= gameBorder.offsetHeight) {
      playerBox.style.top = charTopPosition + "px";
    } else {
      charTopPosition = gameBorder.offsetHeight - playerBox.offsetHeight;
    } if (enemyCollision(0, 0, 0, 0)) {
      takeDamage();
    }
  }

  if (keydown === "KeyW") {
    // note to self and devs : in debugging I'd fixed my 'up' key not working by eliminating the wallCollision check. I have no idea why it works now but this has enabled my wall collision, potentially based off pixel count vs collision boundary.
    // console.log(
    //   wallCollision(-10, 0, 0, 0));
    // if (!wallCollision(-10, 0, 0, 0)) {
    charTopPosition -= 10;
    // }
    if (charTopPosition >= 0) {
      playerBox.style.top = charTopPosition + "px";
    } else {
      charTopPosition = 0;
    } if (enemyCollision(0, 0, 0, 0)) {
      takeDamage();
    }
  }

  function wallCollision(top, left, right, bottom) {
    // don't need below constants because I've declared them in global space.
    // const playerBoxRect = playerBox.getBoundingClientRect();
    // const gameBorderRect = gameBorder.getBoundingClientRect();
    const scrollTop = document.documentElement.scrollTop;
    const scrollLeft = document.documentElement.scrollLeft;
    const playerBoxTop = playerBoxRect.top + scrollTop;
    const playerBoxLeft = playerBoxRect.left + scrollLeft;
    // const enemyCollisionRects = []; likely incorrect, must more closely examine. I'm under impression i only need gameborderRect for this.

    const overlapX =
      playerBoxLeft + left < gameBorderRect.right &&
      playerBoxLeft + playerBox.offsetWidth + right > gameBorderRect.left;
    const overlapY =
      playerBoxTop + top < gameBorderRect.bottom &&
      playerBoxTop + playerBox.offsetHeight + bottom > playerBoxRect.top;

    if (overlapX && overlapY) {
      return true;
    }
  }
  return false;
}

// ENEMY COLLISION DETECTION BELOW. Currently must refactor for my script. THIS IS READY TO UPDATE .
function enemyCollision(top, left, right, bottom) {
  const playerBoxRect = playerBox.getBoundingClientRect();
  const enemyBoxRect = enemyBox.getBoundingClientRect();
  const scrollTop = document.documentElement.scrollLeft;
  const scrollLeft = document.documentElement.scrollTop;
  const playerBoxTop = playerBoxRect.top + scrollTop;
  const playerBoxLeft = playerBoxRect.left + scrollLeft;
  const enemyBoxTop = enemyBoxRect.top + scrollTop;
  const enemyBoxLeft = enemyBoxRect.left + scrollLeft;

  const overlapEnemyX =
    playerBoxLeft + left < enemyBoxRect.right &&
    playerBoxLeft + playerBox.offsetWidth + right > enemyBoxLeft;
  const overlapEnemyY =
    playerBoxTop + top < enemyBoxRect.bottom &&
    playerBoxTop + playerBox.offsetHeight + bottom > enemyBoxTop;
  return overlapEnemyX && overlapEnemyY;
}

function takeDamage() {
  console.log('damage!');
  playerOne.hpCurrent -= 10;
  // enemies.shift(); must continue experimenting with how to effectively add / remove enemies while removing boxes as well
  enemyBox.remove();
  enemyDeathSound.play();
  gaugeBarRender();
}


// KEY COMMITMENTS FOR PLAYER ACTIONS ..
document.addEventListener('keydown', function(event) {
  if (event.key === 'e') {
    playerOne.heal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === ' ') {
    playerOne.evade();
  }
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'q') {
    playerOne.slipStream();
  }
});


// Button Variables
const startBtn = document.getElementById('start-button');
const restartBtn = document.getElementById('restart-button');
const pauseBtn = document.getElementById('pause-button');
const pauseMenuBtn = document.getElementById('pause-menu-button');
const instBtn = document.getElementById('instructions-button');
const muteMusicBtn = document.getElementById('mute-music');
const muteSFXBtn = document.getElementById('mute-sfx');

//Element Variables
const instBox = document.getElementById('instructions-box')
const pauseMenu = document.getElementById('pause-menu');
const gameScreen = document.getElementById('game');
const gameOverScreen = document.getElementById('game-over-screen');
const currentScore = document.getElementById('current-score');

// Character Variables
// const playerBox = document.getElementById('player-box');

// SOUND ELEMENTS BELOW
const bossMusic = document.getElementById('boss-battle-music');
const hoverButtonSound = document.getElementById('button-hover');
const buttonBlipSound = document.getElementById('button-blip');
const bossKillSound = document.getElementById('boss-kill');
const buttonHoverSound = document.getElementById('button-hover');
const criticalHitSound = document.getElementById('critical-hit');
const dashSound = document.getElementById('dash-small');
const endMusic = document.getElementById('end-music');
const enemyDeathSound = document.getElementById('enemy-kill');
const hardSlashSound = document.getElementById('hard-slash');
const healSound = document.getElementById('heal');
const levelUpSound = document.getElementById('level-up-blast');
const newSkillSound = document.getElementById('new-skill-sound');
const playerDeathSound = document.getElementById('player-death');
const playerHitSound = document.getElementById('player-hit');
let currentSong;
let currentSound;

// HP / MP / XP Bar Elements Below
const playerHealth = document.getElementById('hp-bar');
const playerMagic = document.getElementById('mp-bar');
const playerExp = document.getElementById('xp-bar');
const playerHealthCount = document.getElementById('health-bar');
const playerMagicCount = document.getElementById('magic-bar');
const playerExpCount = document.getElementById('exp-bar');
const gaugeBG = document.getElementById('player-status');

// VOLUME ADJUSTING ELEMENTS BELOW
const musicVolume = document.getElementById('music-volume');
const musicVolumeRange = document.getElementById('music-volume-range');
musicVolume.innerHTML = musicVolumeRange.value;

const sfxVolume = document.getElementById('sfx-volume');
const sfxVolumeRange = document.getElementById('sfx-volume-range');
sfxVolume.innerHTML = sfxVolumeRange.value;

function newGameRender() {
  playerOne.hpCurrent = 100;
  playerOne.hpMax = 100;
  playerOne.mpCurrent = 100;
  playerOne.mpMax = 100;
  playerOne.movementSpeed = 20;
  playerOne.XP = 1;
  playerOne.level = 1;
  return gaugeBarRender();
}

function startGameNoise() {
  currentSong = bossMusic;
  currentSong.play();
  newGameRender();
}

function gameOver() {
  // must add score tally render and create death checks on every player health loss

  // if (playerOne.health <= 0) {
  currentSound = playerDeathSound;
  playerDeathSound.play();
  endMusic.play();
  currentSong = endMusic;
  gameOverScreen.classList.toggle('activate');
}
//      else return;
// }

// Enemy Collision Detection Variables and Functions
// let enemyBox = document.getElementById('enemy-box');




// --------------------- END TRASH COLLISION DETECTION SEGMENT ---------------------------

// musicVolumeRange.oninput = function () {
//     musicVolume.innerHTML = this.value;
// }

// allow music to be muted and volume adjustable!
muteMusicBtn.addEventListener("click", muteMusic);

function muteMusic() {
  if (currentSong.paused) {
    currentSong.play();
    muteMusicBtn.innerHTML = 'mute';
  } else {
    currentSong.pause();
    muteMusicBtn.innerHTML = 'unmute';
  }
}

musicVolumeRange.addEventListener("change", adjustMusicVolume);

function adjustMusicVolume() {
  currentSong.volume = musicVolumeRange.value / 100;
  musicVolume.innerHTML = this.value;
}

// allow sfx to be muted and volume adjustable!
// NOTE : Mute button on SFX currently buggy.
muteSFXBtn.addEventListener("click", muteSFX);
function muteSFX() {
  if (sfxVolumeRange.value != 0) {
    sfxVolumeRange.value = 0;
    sfxVolume.value = 0;
    sfxVolume.innerHTML = 0;
    muteSFXBtn.innerHTML = 'unmute';
  }
  else {
    sfxVolumeRange.value = 50;
    sfxVolume.value = 50;
    sfxVolume.innerHTML = 50;
    muteSFXBtn.innerHTML = 'mute';
  }
}

muteSFXBtn.addEventListener("click", muteSFX);
sfxVolumeRange.addEventListener("change", adjustSFXVolume);

function adjustSFXVolume() {
  currentSound.volume = sfxVolumeRange.value / 100;
  sfxVolume.innerHTML = this.value;
}

gameScreen.addEventListener("click", initializeSound);

function initializeSound() {
  currentSound = newSkillSound;
  currentSound.play();
}

function hoverButtonNoise() {
  currentSound = hoverButtonSound;
  currentSound.play();
}



instBtn.addEventListener("mouseover", hoverButtonNoise);
instBtn.addEventListener("click", instructions);
startBtn.addEventListener("mouseover", hoverButtonNoise);
startBtn.addEventListener("click", startGameNoise);
startBtn.addEventListener("click", pauseGame);
restartBtn.addEventListener("click", restartNewGame);
pauseBtn.addEventListener("click", pauseGame);
pauseMenuBtn.addEventListener("click", pauseGame);

// function pauseMenuFly() {
//     if (pauseMenu.classList.includes('menuFly')) {
//         pauseMenu.classList.remove('menuFly');
//         pauseMenu.classList.add('menuCall')
//     } else {
//     pauseMenu.classList.add('menuFly');
//     // additional element to unblur game and unpause elements --> HARD MODE
// }

function restartNewGame() {
  gameOverScreen.classList.toggle('activate');
}

function pauseGame() {
  pauseMenu.classList.toggle('active');
  pauseMenu.classList.replace('.menuFly', '.menuDrop');
  gameScreen.blur();
}

// // function unpauseGame() {
// //     pauseMenu.classList.toggle('active');
//     // if (pauseMenu.style.display != "none") {
//     //     pauseMenu.style.display= "none";
//     // } else return;
//     // gameScreen.focus();
// }

function instructions() {
  instBox.classList.toggle('activated');
}

// CHARACTER Classes

class Character {
  constructor(name, hpMax, hpCurrent, movementSpeed) {
    this.name = name;
    this.hpMax = hpMax;
    this.hpCurrent = hpCurrent;
    this.movementSpeed = movementSpeed;
  }
}

class Player extends Character {
  constructor(name, hpMax, hpCurrent, mpMax, mpCurrent, movementSpeed, XP, level) {
    super(name, hpMax, hpCurrent, movementSpeed);
    this.name = name;
    this.hpMax = hpMax;
    this.hpCurrent = hpCurrent;
    this.mpMax = mpMax;
    this.mpCurrent = mpCurrent;
    this.movementSpeed = movementSpeed;
    this.XP = XP;
    this.level = level;
  }
  //e key for heal
  heal() {
    if (this.hpCurrent === this.hpMax || this.mpCurrent < 30) {
      return;
    } else if (this.hpCurrent + 30 > this.hpMax) {
      this.hpCurrent = this.hpMax;
      this.mpCurrent -= 30;
    } else {
      this.hpCurrent += 30;
      this.mpCurrent -= 30;
    }
    gaugeBarRender();
  }

  //spacebar for evade
  evade() {
    alert(`current speed is ${playerOne.movementSpeed}`);
    this.movementSpeed += 20;
    this.mpCurrent -= 20;
    return speedDash, gaugeBarRender();
  }

  //q key for slipstream
  //expend full MP bar to become translucent and prevent damage
  slipStream() {
    if (this.mpCurrent === this.mpMax) {
      alert('skill is working!');
      this.mpCurrent = 0;
      return gaugeBarRender(), cooldown;
    } else return;
  }


  levelUp() {
    if (this.XP >= 100) {
      this.XP = 0;
      this.level++;
      this.hpMax += 10;
      this.hpCurrent = this.hpMax;
      this.mpMax += 10;
      this.mpCurrent = this.mpMax;
      this.movementSpeed += 5;
      if (this.level % 3 === 0) {
        return levelBossWave, levelWave, gaugeBarRender();
      } else return levelWave, gaugeBarRender();
    }
    // must code a means by which player movement and enemy kill determines level up.
  }
}
class Enemy extends Character {
  constructor(name, hpMax, hpCurrent, movementSpeed) {
    super(name, hpMax, hpCurrent, movementSpeed);
  }
  advance() {
    // this is where you need to code the enemy constantly advancing toward character.
    // add conditional knock-back if they are not destroyed on advance.
    // add destroy on collision if enemy health higher than basic

  }
}
// CHARACTER OBJECTS
const playerOne = new Player('Hero', 100, 100, 100, 100, 20, 0, 1);

// build enemy array. Spawn new wave of them based off of current player level after time delay

 const enemies = [];

// function generateEnemies(num) {
//   for (let i = 1; i <= num; i++) {
//     const enemyPlayer = new Enemy(`Enemy ${i}`, 1, 1, 10);
//     enemies.push(enemyPlayer);
//   }
//   enemies.forEach('enemyPlayer') {
//     const enemyBox = document.createElement('div');
//     enemyBox.setAttribute('id', enemy-box);
//     enemyBox.className = "enemy__box";
//     gameBorder.appendChild(enemyBox);
//   }
//   return enemies;
// }

// function generateBossEnemies(num) {
//   for (let i = 1; i <= num; i++) {
//     const enemyBoss = new Enemy(`Boss ${i}`, 3, 3, 5);
//     enemies.push(enemyBoss);
//   }
//   return enemies;
// }

// create a 5s cooldown condition on special abilities
function revert() {
  playerOne.movementSpeed -= 20;
}
function recharge() {
  playerOne.mpCurrent === playerOne.mpMax;
  return gaugeBarRender();
}


// level up checker on instance of XP gain. incorporate for successful enemy kills and movement. Think of the step() render from tutorial exercise.
function levelCheck() {
  if (this.XP >= 100) {
    levelUp();
  } else return;
}

// Base destroy enemy function for any successful kill.
function destroyEnemy() {
  enemies.shift();
  playerOne.mp += 20;
  playerOne.XP += 60;
  levelCheck();
  gaugeBarRender();
}

// create a stock gauge bar render to streamline the update process for interactive character bars
function gaugeBarRender() {
  playerHealth.value = playerOne.hpCurrent;
  playerMagic.value = playerOne.mpCurrent;
  playerExp.value = playerOne.XP;
  playerExpCount.innerHTML = playerOne.XP;
  playerHealthCount.innerHTML = playerHealth.value;
  playerMagicCount.innerHTML = playerMagic.value;
  return;
}

// set Time Out Variables
// const levelBossWave = setTimeout(generateBossEnemies((this.level / 3)), 3000);
// const levelWave = setTimeout(generateEnemies(this.level), 5000);
const speedDash = setTimeout(revert, 5000);
const cooldown = setTimeout(recharge, 5000);
