
// // RELOCATE BELOW TO AUDIO.JS!!!!

// // SOUND ELEMENTS BELOW
// const muteMusicBtn = document.getElementById('mute-music');
// const muteSFXBtn = document.getElementById('mute-sfx');
// const bossMusic = document.getElementById('boss-battle-music');
// const hoverButtonSound = document.getElementById('button-hover');
// const buttonBlipSound = document.getElementById('button-blip');
// const bossKillSound = document.getElementById('boss-kill');
// const buttonHoverSound = document.getElementById('button-hover');
// const criticalHitSound = document.getElementById('critical-hit');
// const dashSound = document.getElementById('dash-small');
// const endMusic = document.getElementById('end-music');
// const enemyDeathSound = document.getElementById('enemy-kill');
// const hardSlashSound = document.getElementById('hard-slash');
// const healSound = document.getElementById('heal');
// const levelUpSound = document.getElementById('level-up-blast');
// const newSkillSound = document.getElementById('new-skill-sound');
// const playerDeathSound = document.getElementById('player-death');
// const playerHitSound = document.getElementById('player-hit');

// // VOLUME ADJUSTING ELEMENTS BELOW
// const musicVolume = document.getElementById('music-volume');
// const musicVolumeRange = document.getElementById('music-volume-range');
// musicVolume.innerHTML = musicVolumeRange.value;

// const sfxVolume = document.getElementById('sfx-volume');
// const sfxVolumeRange = document.getElementById('sfx-volume-range');
// sfxVolume.innerHTML = sfxVolumeRange.value;


// // MUSIC MUTE AND ADJUST FUNCTIONS

// function muteMusic() {
//   if (currentSong.paused) {
//     currentSong.play();
//     muteMusicBtn.innerHTML = 'mute';
//   } else {
//     currentSong.pause();
//     muteMusicBtn.innerHTML = 'unmute';
//   }
// }

// muteMusicBtn.addEventListener("click", muteMusic);

// function adjustMusicVolume() {
//   currentSong.volume = musicVolumeRange.value / 100;
//   musicVolume.innerHTML = this.value;
// }

// musicVolumeRange.addEventListener("change", adjustMusicVolume);

// // SFX MUTE AND ADJUST FUNCTIONS
// // NOTE : Mute button on SFX currently buggy.

// function muteSFX() {
//   if (sfxVolumeRange.value != 0) {
//     sfxVolumeRange.value = 0;
//     sfxVolume.value = 0;
//     sfxVolume.innerHTML = 0;
//     muteSFXBtn.innerHTML = 'unmute';
//   }
//   else {
//     sfxVolumeRange.value = 50;
//     sfxVolume.value = 50;
//     sfxVolume.innerHTML = 50;
//     muteSFXBtn.innerHTML = 'mute';
//   }
// }

// muteSFXBtn.addEventListener("click", muteSFX);

// function adjustSFXVolume() {
//   currentSound.volume = sfxVolumeRange.value / 100;
//   sfxVolume.innerHTML = this.value;
// }

// sfxVolumeRange.addEventListener("change", adjustSFXVolume);

// function initializeSound() {
//   currentSound = newSkillSound;
//   currentSound.play();
// }

// function hoverButtonNoise() {
//   currentSound = hoverButtonSound;
//   currentSound.play();
// }
