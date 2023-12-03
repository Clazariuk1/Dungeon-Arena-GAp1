// Major lingering bugs:
// NOTE : Music and SFX are OFF due to annoyance. turn them on for final program.
// Gauge progress bars not increasing / decreasing based on player stats. must examine further.
// SFX volume mute not working, not silencing sound.
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
const enemies = []

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
// const enemyBox = document.getElementById('enemy-box')
// const enemyBoxes = document.querySelectorAll('.enemy__box')
// const enemyBoxRect = enemyBox.getBoundingClientRect()
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
let enemyBoxes
let currentSong
let currentSound

// EVENT LISTENERS

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

// add on to handle keys

// function findCollision(x, y) {
//   // would we need to return a range? does it have to be exact within a single pixel? The boxes are 10 by 10, would this cause an issue if it's only slightly clipping the corner?
//  if (enemies.includes())
// const currentEnemy = enemies.find((enemy) => {
//     return enemy.x === x && enemy.y === y
//   })
//   return currentEnemy
// }
// findCollision

// enemies.splice(enemies.indexOf(currentEnemy), 1)
// takeDamage()
// must find a way to eliminate the selected box.

// ENEMY COLLISION DETECTION BELOW. Currently must refactor for my script. THIS IS READY TO UPDATE .
function enemyCollision(top, left, right, bottom, enemyBox) {
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

//below: scratch codee for potential generated enemy collision fix
// document.addEventListener('keydown', () => {
// e.preventDefault()
// let keydown = e.code
// if (keydown === 'KeyD' || keydown === 'KeyA' || keydown === 'KeyS' || keydown === 'KeyW') {
//   if (findCollision(playerBox.style.left, playerBox.style.top)) {
//     takeDamage()
//   }
// }
// })

function handleKeys(e) {
  e.preventDefault()
  let keydown = e.code

  if (keydown === 'KeyD') {
    if (!wallCollision(0, 0, 10, 0)) {
      charLeftPosition += 10
      playerOne.XP += 10
      levelCheck()
      gaugeBarRender()
    }
    if (charLeftPosition + Math.ceil(playerBox.offsetWidth * 1.1) <= gameBorder.offsetWidth) {
      playerBox.style.left = charLeftPosition + 'px'
    }
    else {
      charLeftPosition = gameBorder.offsetWidth - playerBox.offsetWidth
    }
    if (enemyCollision(0, 0, 0, 0, enemyBox)) {
      takeDamage()
    }
  }

  if (keydown === 'KeyA') {
    if (!wallCollision(0, -10, 0, 0)) {
      charLeftPosition -= 10
      playerOne.XP += 10
      levelCheck()
      gaugeBarRender()
    }
    if (charLeftPosition >= 0) {
      playerBox.style.left = charLeftPosition + 'px'
    }
    else {
      charLeftPosition = 0
    }
    if (enemyCollision(0, 0, 0, 0, enemyBox)) {
      takeDamage()
    }
  }

  if (keydown === 'KeyS') {
    if (!wallCollision(0, 0, 0, 10)) {
      charTopPosition += 10
      playerOne.XP += 10
      levelCheck()
      gaugeBarRender()
    }
    if (charTopPosition + Math.ceil(playerBox.offsetHeight * 1.1) <= gameBorder.offsetHeight) {
      playerBox.style.top = charTopPosition + 'px'
    }
    else {
      charTopPosition = gameBorder.offsetHeight - playerBox.offsetHeight
    }
    if (enemyCollision(0, 0, 0, 0, enemyBox)) {
      takeDamage()
    }
  }

  if (keydown === 'KeyW') {
    charTopPosition -= 10
    playerOne.XP += 10
    levelCheck()
    gaugeBarRender()
    if (charTopPosition >= 0) {
      playerBox.style.top = charTopPosition + 'px'
    }
    else {
      charTopPosition = 0
    }
    if (enemyCollision(0, 0, 0, 0, enemyBox)) {
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
  enemies.splice(0, enemies.length) // remove all elements in existing array for game restart. Lingering issue: must delete all boxes to start fresh.
  enemyBoxes = document.querySelectorAll('.enemy__box')
  const boxArray = [...enemyBoxes]
  boxArray.forEach((enemyBox) => enemyBox.remove());
  // enemyBoxes.forEach(gameBorder.removeChild('.enemy__box'))
  // while (gameBorder.hasChildNodes())
  // gameBorder.innerHTML = '' // eliminates all existing enemy boxes to start game fresh.
  charLeftPosition = 0
  charTopPosition = 0
  generateEnemies(2)
  // currentSong = bossMusic
  // currentSong.play()
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
  enemies.splice(0, enemies.length) // remove all elements in existing array for game restart. Lingering issue: must delete all boxes to start fresh.
  enemyBoxes = document.querySelectorAll('.enemy__box')
  const boxArray = [...enemyBoxes]
  boxArray.forEach((enemyBox) => enemyBox.remove());
  playerBox.style.left = 0 + 'px'
  playerBox.style.top = 0 + 'px'
  // MUST ADD MUSIC BACK IN ON FINAL DRAFT
  // currentSong.pause()
  // currentSound = playerDeathSound
  // playerDeathSound.play()
  // endMusic.play()
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

function generateEnemies(num) {
  const gameBorder = document.getElementById('action-space')
  for (let i = 1; i <= num; i++) {
    const enemyBox = document.createElement('div')
    enemyBox.classList.add('enemy__box')

    const maxX = gameBorder.clientWidth - 50
    const maxY = gameBorder.clientHeight - 50
    enemyBox.style.left = Math.floor(Math.random() * (maxX - enemyBox.offsetWidth)) + 'px'
    enemyBox.style.top = Math.floor(Math.random() * (maxY - enemyBox.offsetHeight)) + 'px'
    const enemy = {name: `${playerOne.level}${i}`, x: `${enemyBox.style.left}`, y: `${enemyBox.style.top}`}

    enemies.push(enemy)
    gameBorder.appendChild(enemyBox)
    // setInterval(randomEnemyDirection, 200)
    enemyBox.addEventListener('click', (e) => {
      e.target.remove()
      destroyEnemy()
    })


    // function randomEnemyDirection() {
    //   const gameBorderWidth = gameBorder.clientWidth
    //   const gameBorderHeight = gameBorder.clientHeight

    //   const maxX = gameBorderWidth - enemyBox.clientWidth
    //   const maxY = gameBorderHeight - enemyBox.clientHeight

    //   const directions = [
    //     {x: 0, y: -enemyBox.clientWidth},
    //     {x: 0, y: enemyBox.clientWidth},
    //     {x: -enemyBox.clientWidth, y: 0},
    //     {x: enemyBox.clientWidth, y: 0}
    //   ]

    //   const trajectory = Math.floor(Math.random() * directions.length)

    //   let positionX = parseInt(enemyBox.style.left) || 0
    //   let positionY = parseInt(enemyBox.style.top) || 0

    //     enemyBox.style.left = positionX + 'px'
    //     enemyBox.style.top = positionY + 'px'

    //   }
    }
    enemyBoxes = document.querySelectorAll('.enemy__box') // update enemyBoxes node list for current enemy boxes list each generation. MUST UPDATE REMOVAL AS WELL. Examine take damage function.
  }


function takeBorderDamage() {
  console.log('BORDER damage!')
  playerOne.hpCurrent -= 2
  playerHitSound.play()
  if (playerOne.hpCurrent <= 0) {
    playerOne.hpCurrent = 0
    gameOver()
  }
  gaugeBarRender()
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
function levelCheck() {
  if (playerOne.XP >= 100) {
    playerOne.levelUp()
  }
  else return
}

// Base destroy enemy function for any successful kill.
function destroyEnemy() {
  // enemies.shift() must be replaces with an enemies.splice that specifically targets the selected enemy.
  enemies.shift()
  enemyBoxes = document.querySelectorAll('.enemy__box') // remove selected enemy box from node list. THIS MUST BE POLISHED.
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
  constructor(name, hpMax, hpCurrent) {
    this.name = name
    this.hpMax = hpMax
    this.hpCurrent = hpCurrent
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
const playerOne = new Player('Hero', 100, 100, 100, 100, 0, 1)

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
const playerHitSound = document.getElementById('player-get-hit')

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

// gameScreen.addEventListener('click', initializeSound)

function initializeSound() {
  currentSound = newSkillSound
  currentSound.play()
}

function hoverButtonNoise() {
  currentSound = hoverButtonSound
  currentSound.play()
}
