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
const gameOverScreen = document.getElementById('game-over');

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

// VOLUME ADJUSTING ELEMENTS BELOW
const musicVolume = document.getElementById('music-volume');
const musicVolumeRange = document.getElementById('music-volume-range');
musicVolume.innerHTML = musicVolumeRange.value;

const sfxVolume = document.getElementById('sfx-volume');
const sfxVolumeRange = document.getElementById('sfx-volume-range');
sfxVolume.innerHTML = sfxVolumeRange.value;

function newGameRender() {
    playerHealth.value = 100;
    playerMagic.value = 100;
    playerExp.value = 0;
    playerExpCount.innerHTML = playerExp.value;
    playerHealthCount.innerHTML = playerHealth.value;
    playerMagicCount.innerHTML = playerMagic.value;
    }

function startGameNoise() {
    currentSong = bossMusic;
    currentSong.play();
    newGameRender();
}

function gameOver() {
    // if (player.health <= 0) {
        currentSound = playerDeathSound;
        playerDeathSound.play();
        currentSong = endMusic;
        endMusic.play;
   // }
}

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
    currentSong.volume= musicVolumeRange.value / 100;
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
    currentSound.volume= sfxVolumeRange.value / 100;
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


// // BUILD THE BASICS BEFORE YOU BUILD THE BONUSES!!!

// "Dungeon Arena."
// a top down action-rpg survival arcade game.
// premise: you're an adventurer/explorer surviving waves of enemies in various environmentally themed levels.
//    BONUS : the level set repeats at a higher difficulty Mario bros style, 1-2, 3-1, etc. enemy quantity+ .

// Dungeon Arena function list
// Character selection - three simple classes to choose from at the initial startup screen. fighter, thief, mage
// Features a level up system that augments stats. HP, defense, attack, MP
// special move added per level. Unlock a 'new ability', which would be keydown hot-keyed to the system and conditional unlock as able. spacebar basic attack. Special level one 'Q' special level two 'E'. Special level three 'R'. Start with thief class because they're cooler and the jaunt dash sounds awesome.
// Lvl 0: Dash - unlock a jaunt dash
// STEP. 1: keyframe animation to move player in direction of last keydown/movement
//        2: Ensure hit box follows.
// lvl 5: back-stab - a high critical strike that has chance to kill on strike.
//         1: a damage x2 attack with random.Math on kill strike.
// lvl 10: Mug - get bonus score points on successful strike.
//         STEP: extra XP = math.random double bonus per enemy

// Lvl 0: Cleave - strong fighter area of effect attack conic in front. Can you get it right?
// lvl 5: IronSkin - Consume mana to block all attacks from doing damage.
// lvl 10: Drain - attacks heal player for same amount they hit enemy.
// Lvl 0: Restore - Mage heals with mana.
// lvl 5: Fireball - straight line fire blast no penetration.
// lvl 10: lightning bolt - straight line area of effect attack. Penetrates enemies/pixels

//All characters:
// Attack
// Defend
// CLOTHING ITEM OBJECTS THAT INCREASE YOUR LEVEL STATS --> Bonus level two.
// Special attacks consume mana
// Arrow key character icon movement -> critical to do with collision detection in tandem.
// Enemies continually pour in from random parts of the screen edge to attack/converge on the player.
// make player and enemies simple images trapped in boxes as icons.
// add 'bounce' hover effect to characters.
// Basic text boxes on event BONUS ! -> on critical strikes return a text box that says "'Take that!'"
// All objects contain ‘image’ constructor that has image file location.
// Start screen / Death screen. Final Score
// BONUS : audio work. On special, on attack hear slash, bite noise on collision damage for player and death moan for zero hp.  Song on throughout. Adjustable volume slider for music and SFX separately.
// Volume music slider!
// Game drop down menu that contains stuff -> PAUSE MID-GAME menu. add whatever down the line
// A saving system? Not yet, only in due time.
// Collision detection an absolute must.


// Skeleton monster boss
// Ferocious Bear boss
// The Captain of the Guard.
// Ogre / troll / Thug
// Dungeon rat / wild hound / woodsman
// Crypt robber / Assassin / City Guard
// Kill three things unleash a boss thing
// LEVEL SCREENS
// -dungeon; forest; city,

// 0. Make a base layout with volume sliders top right, hp/mana bars top left.
// 0.1 Player shape start center of space. --> how do we bind the avatar shape with the stats object for this?
// 0.2 Give it the ability to move on keydown WASD or arrow keys
// 0.3 make an 'enemy' block.
// 0.4 Build an on collision detection event - damage.
// 0.5 make the enemies continually chase after the player to touch and do damage.
// 0.6 build level up system to increase the players strength and defense. The point is to get a level up quick, so make it easy like a kill or two.
// 0.7 Point / score system. Enemies killed, levels survived, health lost. enemies multiplied by levels subtracted by health lost.
// 0.8 make a PAUSE GAME SCREEN for
// .9 layer on images for players / enemies to make simple hit box wrapped in pic.
// Over Nine Thousand. Make all characters, not just the one.

// 1. Build character class. HP / MP / STR / DEF / LEVEL
// 2. Build enemy class. HP / STR / DEF / LEVEL
// 3. Build subclasses for character type thief and enemy type dungeon rat
// 4. Build random stat generator for the enemies' creation. Add in a condition of every 3 normal enemies, throw in a hard enemy. Make each boss a level.
// 5. Build basic pixel-grid based attack for characters and enemies.
//     -Specify the space being affected, the on success effects. Enemies instead must on-collision conditional.
// 6. Build score system and display. Small Enemies killed * Big Enemies killed Level ?
// 7.
