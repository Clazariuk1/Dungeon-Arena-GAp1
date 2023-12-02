// Major lingering bugs:
// Cannot successfully apply border collision to post-initialization rendered enemies. Missing something.
// Gauge progress bars not increasing / decreasing based on player stats. must examine further.
// SFX volume mute not working, not silencing sound.
// must edit game initialization to include enemy box creation within game space.
// 1. Must successfully enable enemy collision on enemies generated on level up
// 2. Must successfully enable enemy movement in random directions.
// 3. Must successfully enable border collision with player damage on enemy blocks
// 4. Must successfully reverse direction of enemy blocks upon border collision
// 5. BONUS. Must successfully enable enemy on enemy collision prevention. Reverse direction effect.
// BONUS: Must begin working on the 'extra feature' powers
// BONUS 2: For some reason the code is breaking when I attempt to migrate my audio materials from script.js to audio.js. Cannot figure out why.
// BONUS 3: Important bonus to prioritize. Make a flashing effect for playerBox to change color on damage, use set timeout/ set interval to make temporary change.



// ElEMENTS.

// PLAYER AND GAME SPACE CONSTANTS. (may need to move enemy constants)
const gameScreen = document.getElementById('game')
const gameBorder = document.getElementById('action-space')
const gameBorderRect = gameBorder.getBoundingClientRect()

// HP / MP / XP Bar Elements. 'Gauge Bars.'
const playerHealth = document.getElementById('hp-bar')
const playerMagic = document.getElementById('mp-bar')
const playerExp = document.getElementById('xp-bar')
const playerHealthCount = document.getElementById('health-bar')
const playerMagicCount = document.getElementById('magic-bar')
const playerExpCount = document.getElementById('exp-bar')
const pauseBtn = document.getElementById('pause-button')

// CACHE ELEMENTS
const playerBox = document.getElementById('player-box')
const playerBoxRect = playerBox.getBoundingClientRect()
const enemyBox = document.getElementById('enemy-box')
const enemyBoxes = document.querySelectorAll('.enemy__box')
const enemyBoxRect = enemyBox.getBoundingClientRect()
const startBtn = document.getElementById('start-button')
const restartBtn = document.getElementById('restart-button')
const resumeBtn = document.getElementById('pause-menu-button')
const instBtn = document.getElementById('instructions-button')
const instBox = document.getElementById('instructions-box')
const pauseMenu = document.getElementById('pause-menu')
const gameOverScreen = document.getElementById('game-over-screen')
const currentScore = document.getElementById('current-score')
const finalScore = document.getElementById('final-score')
const playerLevel = document.getElementById('player-level')

// STATE Variables
let playerScore
let charLeftPosition
let charTopPosition
let currentSong
let currentSound

// EVENT LISTENERS

// ATTACK CLICK LISTENER ON ENEMIES.
// NOTE : This must be removed during final drafting. This affects global space and incorrectly, as it does not add this factor for enemies newly rendered while in global space.
enemyBoxes.forEach((enemyBox) => enemyBox.addEventListener('click', (e) => {
  e.target.remove()
  destroyEnemy()
}))

// BUTTON EVENT LISTENERS
instBtn.addEventListener('mouseover', hoverButtonNoise)
instBtn.addEventListener('click', instructions)
startBtn.addEventListener('mouseover', hoverButtonNoise)
startBtn.addEventListener('click', newGameRender)
startBtn.addEventListener('click', pauseGame)
restartBtn.addEventListener('click', restartNewGame)
pauseBtn.addEventListener('click', pauseGame)
resumeBtn.addEventListener('click', pauseGame)


// FUNCTION LIST!!!!!!!!

// MOVEMENT KEYS AND BOUNDARY CHECK FUNCTIONS

// ENEMY COLLISION DETECTION BELOW. Currently must refactor for my script. THIS IS READY TO UPDATE .
function enemyCollision(top, left, right, bottom) {
  const playerBoxRect = playerBox.getBoundingClientRect()
  const enemyBoxRect = enemyBox.getBoundingClientRect()
  const scrollTop = document.documentElement.scrollLeft
  const scrollLeft = document.documentElement.scrollTop
  const playerBoxTop = playerBoxRect.top + scrollTop
  const playerBoxLeft = playerBoxRect.left + scrollLeft
  const enemyBoxTop = enemyBoxRect.top + scrollTop
  const enemyBoxLeft = enemyBoxRect.left + scrollLeft

  const overlapEnemyX = playerBoxLeft + left < enemyBoxRect.right && playerBoxLeft + playerBox.offsetWidth + right > enemyBoxLeft
  const overlapEnemyY = playerBoxTop + top < enemyBoxRect.bottom && playerBoxTop + playerBox.offsetHeight + bottom > enemyBoxTop
  return overlapEnemyX && overlapEnemyY
}

function handleKeys(e) {
  e.preventDefault()
  let keydown = e.code

  if (keydown === 'KeyD') {
    // console.log(wallCollision(0, 0, 10, 0))
    if (!wallCollision(0, 0, 10, 0)) {
      charLeftPosition += 10
      playerOne.XP += 1
      levelCheck()
      gaugeBarRender()
    }
    if (charLeftPosition + Math.ceil(playerBox.offsetWidth * 1.1) <= gameBorder.offsetWidth) {
      playerBox.style.left = charLeftPosition + 'px'
    }
    else {
      charLeftPosition = gameBorder.offsetWidth - playerBox.offsetWidth
    }
    if (enemyCollision(0, 0, 0, 0)) {
      takeDamage()
    }
  }

  if (keydown === 'KeyA') {
    // console.log(wallCollision(0, -10, 0, 0))
    if (!wallCollision(0, -10, 0, 0)) {
      charLeftPosition -= 10
      playerOne.XP += 1
      levelCheck()
      gaugeBarRender()
    }
    if (charLeftPosition >= 0) {
      playerBox.style.left = charLeftPosition + 'px'
    }
    else {
      charLeftPosition = 0
    }
    if (enemyCollision(0, 0, 0, 0)) {
      takeDamage()
    }
  }

  if (keydown === 'KeyS') {
    // console.log(wallCollision(0, 0, 0, 10))
    if (!wallCollision(0, 0, 0, 10)) {
      charTopPosition += 10
      playerOne.XP += 1
      levelCheck()
      gaugeBarRender()
    }
    if (charTopPosition + Math.ceil(playerBox.offsetHeight * 1.1) <= gameBorder.offsetHeight) {
      playerBox.style.top = charTopPosition + 'px'
    }
    else {
      charTopPosition = gameBorder.offsetHeight - playerBox.offsetHeight
    }
    if (enemyCollision(0, 0, 0, 0)) {
      takeDamage()
    }
  }

  if (keydown === 'KeyW') {
    // note to self and devs : in debugging I'd fixed my 'up' key not working by eliminating the wallCollision check. I have no idea why it works now but this has enabled my wall collision, potentially based off pixel count vs collision boundary.
    // console.log(
    //   wallCollision(-10, 0, 0, 0))
    // if (!wallCollision(-10, 0, 0, 0)) {
    charTopPosition -= 10
    playerOne.XP += 1
    levelCheck()
    gaugeBarRender()
    // }
    if (charTopPosition >= 0) {
      playerBox.style.top = charTopPosition + 'px'
    }
    else {
      charTopPosition = 0
    }
    if (enemyCollision(0, 0, 0, 0)) {
      takeDamage()
    }
  }

  function wallCollision(top, left, right, bottom) {
    const scrollTop = document.documentElement.scrollTop
    const scrollLeft = document.documentElement.scrollLeft
    const playerBoxTop = playerBoxRect.top + scrollTop
    const playerBoxLeft = playerBoxRect.left + scrollLeft

    const overlapX = playerBoxLeft + left < gameBorderRect.right && playerBoxLeft + playerBox.offsetWidth + right > gameBorderRect.left
    const overlapY = playerBoxTop + top < gameBorderRect.bottom && playerBoxTop + playerBox.offsetHeight + bottom > playerBoxRect.top

    if (overlapX && overlapY) {
      return true
    }
  }
  return false
}

function newGameRender() {
  charLeftPosition = 0
  charTopPosition = 0

  currentSong = bossMusic
  currentSong.play()
  playerScore = 0
  playerOne.hpCurrent = 100
  playerOne.hpMax = 100
  playerOne.mpCurrent = 100
  playerOne.mpMax = 100
  playerOne.movementSpeed = 20
  playerOne.XP = 1
  playerOne.level = 1
  playerBox.classList.remove('player__box')
  document.addEventListener('keydown', handleKeys)
  document.addEventListener('keyup', handleKeys)
  document.addEventListener('keydown', function(event) {
    if (event.key === 'e') {
      playerOne.heal()
      // Below: Bonus skill. Not correctly done, difficult concept to approach.
      // document.addEventListener('keydown', (e) => {
      //   if (e.key === ' ') {
      //     playerOne.evade()
      //   }
      // })

      // Below: Bonus skill. Not correctly done, difficult concept to approach.
      // document.addEventListener('keydown', function(event) {
      //   if (event.key === 'q') {
      //     playerOne.slipStream()
      //   }
      // })
    }
  })
  return gaugeBarRender()
}

function gameOver() {
  currentSong.pause()
  currentSound = playerDeathSound
  playerDeathSound.play()
  endMusic.play()
  playerBox.classList.add('player__box')
  gameOverScreen.classList.toggle('activate')
  updateScore()
}

function restartNewGame() {
  gameOverScreen.classList.toggle('activate')
  newGameRender()
}

function pauseGame() {
  pauseMenu.classList.toggle('active')
}

function instructions() {
  instBox.classList.toggle('activated')
}

// below: generate enemies and place randomly throughout game space. Draft. not working. may need relocation.
function generateEnemies(num) {
  const gameBorder = document.getElementById('action-space')
  for (let i = 1; i <= num; i++) {
    const enemyBox = document.createElement('div')
    enemyBox.className = 'enemy__box'
    enemyBox.setAttribute('id', 'enemy-box')
    const maxX = gameBorder.clientWidth
    const maxY = gameBorder.clientHeight
    const randomX = Math.floor(Math.random() * (maxX - 10))
    const randomY = Math.floor(Math.random() * (maxY - 10))
    enemyBox.style.left = randomX + 'px'
    enemyBox.style.top = randomY + 'px'
    gameBorder.appendChild(enemyBox)

    enemyBox.addEventListener('click', (e) => {
      e.target.remove()
      destroyEnemy()
    })
  }
  // const enemyBoxes = document.querySelectorAll('.enemy__box')
  // enemyBoxes.forEach((enemyBox) => {

  // })
}

function takeDamage() {
  console.log('damage!')
  playerOne.hpCurrent -= 10
  enemyBox.remove()
  enemyDeathSound.play()
  if (playerOne.hpCurrent <= 0) {
    playerOne.hpCurrent = 0
    gameOver()
  }
  gaugeBarRender()
}

// level up checker on instance of XP gain. incorporate for successful enemy kills and movement. Think of the step() render from tutorial exercise.
function levelCheck() {
  if (playerOne.XP >= 100) {
    playerOne.levelUp()
  }
  else return
}

// Base destroy enemy function for any successful kill.
function destroyEnemy() {
  enemies.shift()
  playerOne.mpCurrent += 20
  playerOne.XP += 60
  playerScore += 20
  levelCheck()
  updateScore()
  gaugeBarRender()
}

// create a stock gauge bar render to streamline the update process for interactive character bars
function gaugeBarRender() {
  playerHealth.value = playerOne.hpCurrent
  playerMagic.value = playerOne.mpCurrent
  playerExp.value = playerOne.XP
  playerExpCount.innerHTML = playerOne.XP
  playerHealthCount.innerHTML = playerOne.hpCurrent
  playerMagicCount.innerHTML = playerOne.mpCurrent
  return
}

function updateScore() {
  currentScore.innerHTML = `Current Score: ${playerScore}`
  finalScore.innerHTML = `Final Score: ${playerScore}`
  playerLevel.innerHTML = `Final Player Level: ${playerOne.level}`

}

// CHARACTER Classes. Movement speed currently irrelevant. Would like to examine later for additional potential powers.

class Character {
  constructor(name, hpMax, hpCurrent, movementSpeed) {
    this.name = name
    this.hpMax = hpMax
    this.hpCurrent = hpCurrent
    this.movementSpeed = movementSpeed
  }
}

class Player extends Character {
  constructor(name, hpMax, hpCurrent, mpMax, mpCurrent, movementSpeed, XP, level) {
    super(name, hpMax, hpCurrent, movementSpeed)
    this.name = name
    this.hpMax = hpMax
    this.hpCurrent = hpCurrent
    this.mpMax = mpMax
    this.mpCurrent = mpCurrent
    this.movementSpeed = movementSpeed
    this.XP = XP
    this.level = level
  }
  //pro tip: e key for heal
  heal() {
    if (this.hpCurrent === this.hpMax || this.mpCurrent < 30) {
      return
    }
    else if (this.hpCurrent + 30 > this.hpMax) {
      this.hpCurrent = this.hpMax
      this.mpCurrent -= 30
    }
    else {
      this.hpCurrent += 30
      this.mpCurrent -= 30
    }
    gaugeBarRender()
  }

  //spacebar for evade. TBD.
  // evade() {
  //   alert(`current speed is ${playerOne.movementSpeed}`)
  //   this.movementSpeed += 20
  //   this.mpCurrent -= 20
  //   return speedDash, gaugeBarRender()
  // }

  //q key for slipstream. TBD.
  //expend full MP bar to become translucent and prevent damage
  // slipStream() {
  //   if (this.mpCurrent === this.mpMax) {
  //     alert('skill is working!')
  //     this.mpCurrent = 0
  //     return gaugeBarRender(), cooldown
  //   } else return
  // }

  levelUp() {
    // Must make sure gauge bars correctly update player stats. currently having issues.
    this.XP = 0
    this.level++
    this.hpMax += 10
    this.hpCurrent = this.hpMax
    this.mpMax += 10
    this.mpCurrent = this.mpMax
    this.movementSpeed += 5
    playerScore += 50
    updateScore()
    gaugeBarRender()
    generateEnemies(`${playerOne.level}`)
    // if (this.level % 3 === 0) {
    //       return levelBossWave, levelWave, gaugeBarRender()
    //     } else return levelWave, gaugeBarRender()

    //   // must code a means by which player movement and enemy kill determines level up.
  }
}
const playerOne = new Player('Hero', 100, 100, 100, 100, 20, 0, 1)

// NOTE : Enemy class currently useless. Must either cut or find way to make relevant.
class Enemy extends Character {
  constructor(name, hpMax, hpCurrent, movementSpeed) {
    super(name, hpMax, hpCurrent, movementSpeed)
  }
  advance() {
    // this is where you need to code the enemy constantly advancing toward character.
    // add conditional knock-back if they are not destroyed on advance.

  }
}
// CHARACTER OBJECTS

// build enemy array. Spawn new wave of them based off of current player level after time delay
const enemies = []

// RELOCATE BELOW TO AUDIO.JS!!!!

// SOUND ELEMENTS BELOW
const muteMusicBtn = document.getElementById('mute-music')
const muteSFXBtn = document.getElementById('mute-sfx')

const bossMusic = document.getElementById('boss-battle-music')
const hoverButtonSound = document.getElementById('button-hover')
const buttonBlipSound = document.getElementById('button-blip')
const bossKillSound = document.getElementById('boss-kill')
const buttonHoverSound = document.getElementById('button-hover')
const criticalHitSound = document.getElementById('critical-hit')
const dashSound = document.getElementById('dash-small')
const endMusic = document.getElementById('end-music')
const enemyDeathSound = document.getElementById('enemy-kill')
const hardSlashSound = document.getElementById('hard-slash')
const healSound = document.getElementById('heal')
const levelUpSound = document.getElementById('level-up-blast')
const newSkillSound = document.getElementById('new-skill-sound')
const playerDeathSound = document.getElementById('player-death')
const playerHitSound = document.getElementById('player-hit')

// VOLUME ADJUSTING ELEMENTS BELOW
const musicVolume = document.getElementById('music-volume')
const musicVolumeRange = document.getElementById('music-volume-range')
musicVolume.innerHTML = musicVolumeRange.value

const sfxVolume = document.getElementById('sfx-volume')
const sfxVolumeRange = document.getElementById('sfx-volume-range')
sfxVolume.innerHTML = sfxVolumeRange.value


// MUSIC MUTE AND ADJUST FUNCTIONS

function muteMusic() {
  if (currentSong.paused) {
    currentSong.play()
    muteMusicBtn.innerHTML = 'mute'
  }
  else {
    currentSong.pause()
    muteMusicBtn.innerHTML = 'unmute'
  }
}

muteMusicBtn.addEventListener('click', muteMusic)

function adjustMusicVolume() {
  currentSong.volume = musicVolumeRange.value / 100
  musicVolume.innerHTML = this.value
}

musicVolumeRange.addEventListener('change', adjustMusicVolume)

// SFX MUTE AND ADJUST FUNCTIONS
// NOTE : Mute button on SFX currently buggy.

function muteSFX() {
  if (sfxVolumeRange.value !== 0) {
    sfxVolumeRange.value = 0
    sfxVolume.value = 0
    sfxVolume.innerHTML = 0
    muteSFXBtn.innerHTML = 'unmute'
  }
  else {
    sfxVolumeRange.value = 50
    sfxVolume.value = 50
    sfxVolume.innerHTML = 50
    muteSFXBtn.innerHTML = 'mute'
  }
}

muteSFXBtn.addEventListener('click', muteSFX)

function adjustSFXVolume() {
  currentSound.volume = sfxVolumeRange.value / 100
  sfxVolume.innerHTML = this.value
}

sfxVolumeRange.addEventListener('change', adjustSFXVolume)

gameScreen.addEventListener('click', initializeSound)

function initializeSound() {
  currentSound = newSkillSound
  currentSound.play()
}

function hoverButtonNoise() {
  currentSound = hoverButtonSound
  currentSound.play()
}
