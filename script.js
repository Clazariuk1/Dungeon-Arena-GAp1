// Major lingering bugs:
// NOTE : Music and SFX are OFF due to annoyance. turn them on for final program.
// 1. Enable enemy block movement - player collision
// 2. Enemy Boss kill on player contact.
// 3. Must successfully enable border collision with player damage on enemy blocks
// 4. Must successfully reverse direction of enemy blocks upon border collision
// BONUS 1: Must successfully enable enemy on enemy collision prevention. Reverse direction effect.
// BONUS 2: For some reason the code is breaking when I attempt to migrate my audio materials from script.js to audio.js. Cannot figure out why.
// BONUS 3: Teleport is doing funky things and not normal. May need to cut for final draft.
// BONUS 5: Freeze Time isn't stopping enemy movement. need to examine
// BONUS 6: Annihilate needs to effect bosses without killing them somehow.
// BONUS 7: Bombs must destroy enemies / damage player and bosses on detonation
// SUPER IMPORTANT . when enemy movement is figured out, not only must we add in data to update the enemies array coordinates, but we must also include an update on the enemy box id.


// ElEMENTS.

// PLAYER AND GAME SPACE CONSTANTS. (may need to move enemy constants)
const gameScreen = document.getElementById('game')
const gameBorder = document.getElementById('action-space')
const gameBorderRect = gameBorder.getBoundingClientRect()
const enemies = []
const enemyBosses = []

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
let enemyBossHP

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

// ENEMY COLLISION DETECTION BELOW.
// (()=> {
//   if (EnemyBoss.style.left <= playerBox.style.left + 20 && enemyBoss.style.top >= playerBox.style.top - 20) {
//     playerOne.hpCurrent = 0
//     gameOver()
//   }
// })
// function findBossCollision(x, y) {
//   const currentBoss = enemyBosses
// }
// function findBombCollision(x, y) {}
function bossCollision(x, y) {
  const bossX = parseInt(x.replace('p', '').replace('x', ''))
  const bossY = parseInt(y.replace('p', '').replace('x', ''))
  const playerX = parseInt(playerBox.style.left.replace('p', '').replace('x', ''))
  const playerY = parseInt(playerBox.style.top.replace('p', '').replace('x', ''))
  if (bossX <= playerX + 5 && bossY >= playerY - 5) {
    return true
  } else {
    return false
  }
}

function findCollision(x, y) {
  const currentEnemy = enemies.find((enemy) => {
    const playerX = parseInt(x.replace('p', '').replace('x', ''))
    const playerY = parseInt(y.replace('p', '').replace('x', ''))
    const enemyX = parseInt(enemy.x.replace('p', '').replace('x', ''))
    const enemyY = parseInt(enemy.y.replace('p', '').replace('x', ''))
    if (playerX <= enemyX + 15 && playerY >= enemyY - 15) {
      return true
    } else {
      return false
    }
  })
  if (currentEnemy) {
  currentEnemy.element.remove()
  enemies.splice(enemies.indexOf(currentEnemy), 1)
  takeDamage()
  }
}

function handleKeys(e) {
  e.preventDefault()
  let keydown = e.code

  if (keydown === 'KeyD') {
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
    findCollision(`${playerBox.style.left}`, `${playerBox.style.top}`)
  }

  if (keydown === 'KeyA') {
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
    findCollision(`${playerBox.style.left}`, `${playerBox.style.top}`)
  }

  if (keydown === 'KeyS') {
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
    findCollision(`${playerBox.style.left}`, `${playerBox.style.top}`)
  }

  if (keydown === 'KeyW') {
    charTopPosition -= 10
    playerOne.XP += 1
    levelCheck()
    gaugeBarRender()
    if (charTopPosition >= 0) {
      playerBox.style.top = charTopPosition + 'px'
    }
    else {
      charTopPosition = 0
    }
    findCollision(`${playerBox.style.left}`, `${playerBox.style.top}`)
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
  if (currentSong) {
    currentSong.pause()
  }
  gameBorder.style.display = 'block'
  enemies.splice(0, enemies.length)
  enemyBoxes = document.querySelectorAll('.enemy__box')
  const boxArray = [...enemyBoxes]
  boxArray.forEach((enemyBox) => enemyBox.remove())
  charLeftPosition = 0
  charTopPosition = 0
  generateEnemies(1)
  currentSong = bossMusic
  currentSong.play()
  playerScore = 0
  playerOne.hpCurrent = 100
  playerOne.hpMax = 100
  playerOne.mpCurrent = 100
  playerOne.mpMax = 100
  playerOne.XP = 1
  playerOne.level = 1
  playerBox.classList.remove('player__box')
  document.addEventListener('keydown', handleKeys)
  document.addEventListener('keyup', handleKeys)

  document.addEventListener('keydown', function(event) {
    if (event.key === 'e') {
      playerOne.heal()
    }
  })
  gaugeBarRender()
}

document.addEventListener('dblclick', (event) => {
  if (playerOne.mpCurrent >= 50) {
    console.log(`${event.clientX}`, `${event.clientY}`)
    // charLeftPosition = `${event.clientX}`
    // charTopPosition = `${event.clientY}`
    // playerBox.style.left = charLeftPosition + 'px'
    // playerBox.style.top = charTopPosition + 'px'
    playerOne.teleport()
    gaugeBarRender()
  }
})

document.addEventListener('keydown', function(event) {
  if (event.key === 'r') {
    if (playerOne.mpCurrent >= 75) {
      playerOne.freezeTime()
    }
  }
})

document.addEventListener('keydown', function(event) {
  if (event.key === 'b') {
    playerOne.bombTrail()
  }
})

document.addEventListener('keydown', function(event) {
  if (event.key === 'q') {
    playerOne.annihilate()
  }
  gaugeBarRender()
})

function gameOver() {
  gameBorder.style.display = 'none'
  enemies.splice(0, enemies.length)
  enemyBosses.splice(0, enemyBosses.length)
  enemyBoxes = document.querySelectorAll('.enemy__box')
  const boxArray = [...enemyBoxes]
  boxArray.forEach((enemyBox) => enemyBox.remove())
  bossEnemies = document.querySelectorAll('.enemy__boss')
  const bossArray = [...bossEnemies]
  bossArray.forEach((bossEnemy) => bossEnemy.remove())
  playerBox.style.left = 0 + 'px'
  playerBox.style.top = 0 + 'px'
  // MUST ADD MUSIC BACK IN ON FINAL DRAFT
  currentSong.pause()
  currentSound = playerDeathSound
  playerDeathSound.play()
  currentSong = endMusic
  currentSong.play()
  playerBox.classList.add('player__box')
  gameOverScreen.classList.toggle('activate')
  updateScore()
  gaugeBarRender()
}

function restartNewGame() {
  gameBorder.style.display = 'block'
  gameOverScreen.classList.toggle('activate')
  currentSong.pause()
  newGameRender()
}

function pauseGame() {
  pauseMenu.classList.toggle('active')
}

function instructions() {
  instBox.classList.toggle('activated')
}

// UPDATE ENEMY MOVEMENT BELOW
// It's almost there! Just need to successfully get enemy wall collision updated. Mute this when necessary
function updateEnemies() {
  if (enemies.length > 0) {
    const gameBorder = document.getElementById('action-space')
    enemyBoxes = document.querySelectorAll('.enemy__box')
    enemyBoxes.forEach((enemyBox) => {
      const gameBorderWidth = gameBorder.clientWidth
      const gameBorderHeight = gameBorder.clientHeight

      const enemyWidth = enemyBox.offsetWidth
      const enemyHeight = enemyBox.offsetHeight

      const maxX = gameBorderWidth - enemyWidth
      const maxY = gameBorderHeight - enemyHeight

      const randomAngle = Math.random() * 2 * Math.PI

      const deltaX = Math.cos(randomAngle)
      const deltaY = Math.sin(randomAngle)

      let newX = Math.random() * maxX
      let newY = Math.random() * maxY

      // the border detection is not currently working. examine.
      // if(newX < 0) {
      //   newX = 0
      // } else if (newX > maxX) {
      //   newX = maxX
      // }
      // if (newY < 0) {
      //   newY = 0
      // } else if (newY > maxY) {
      //   newY = maxY
      // }

      if(newX < 0 || newX > maxX) {
        enemyBox.remove()
        playerOne.hpCurrent -= 1
      }
      if (newY < 0 || newY > maxY) {
        enemyBox.remove()
        playerOne.hpCurrent -= 1
      }
      enemyBox.style.left = newX + 'px'
      enemyBox.style.top = newY + 'px'
      // enemyBox.getAttribute('id').setAttribute('id', `${enemyBox.style.left}`,`${enemyBox.style.top}`)

      enemyBox.style.transition = 'all 5s linear'
      enemyBox.style.transform = `translate(${deltaX * newX}px, ${deltaY * newY}px)`
    })
  }
}

// ENABLE BOSS ADVANCE ON PLAYER POSITION BELOW
function updateBoss() {
  if (enemyBosses.length > 0) {
    const gameBorder = document.getElementById('action-space')
    const playerX = parseInt(playerBox.style.left)
    const playerY = parseInt(playerBox.style.top)
    enemyBosses.forEach((enemyBoss) => {
      const bossX = parseInt(enemyBoss.style.left)
      const bossY = parseInt(enemyBoss.style.top)

      const angle = Math.atan2(playerY - bossY, playerX - bossX)
      const speed = `${playerOne.level}`
      const deltaX = speed * Math.cos(angle)
      const deltaY = speed * Math.sin(angle)

      const newX = Math.max(0, Math.min(bossX + deltaX, gameBorder.clientWidth - 50))
      const newY = Math.max(0, Math.min(bossY + deltaY, gameBorder.clientHeight - 50))

      enemyBoss.style.left = newX + 'px'
      enemyBoss.style.top = newY + 'px'
    })
  }
  enemyBosses.forEach((enemyBoss) => {
    if (bossCollision(`${enemyBoss.style.left}`, `${enemyBoss.style.top}`)) {
      playerOne.hpCurrent -= 0
      gameOver()
    }
  })
}

function generateEnemyBoss() {
  const enemyBoss = document.createElement('div')
  enemyBoss.classList.add('enemy__boss')
  const maxX = gameBorder.clientWidth - 50
  const maxY = gameBorder.clientHeight - 50
  enemyBoss.style.left = Math.floor(Math.random() * (maxX - enemyBoss.offsetWidth)) + 'px'
  enemyBoss.style.top = Math.floor(Math.random() * (maxY - enemyBoss.offsetHeight)) + 'px'
  enemyBoss.setAttribute('id', `boss${playerOne.level / 5}`)
  let enemyBossHP = 10
  // const boss = {element: enemyBoss, name: `boss${playerOne.level / 5}`}
  gameBorder.appendChild(enemyBoss)
  enemyBosses.push(enemyBoss)

  enemyBoss.addEventListener('click', (e) => {
    e.preventDefault()
    enemyBossHP--
    if (enemyBossHP === 0) {
      e.target.remove()
      destroyEnemyBoss()
    }
  })
  setInterval(updateBoss, 250)
  // setInterval(bossCollisionCheck, 250)
  // if (playerOne.freezeTime()) {
  //   clearInterval(updateBoss)
  //   clearInterval(updateEnemies)
    // const restartEnemyTime = setInterval(updateEnemies, 5000)
    // setTimeout(restartEnemyTime, 5000)
  // }
}

// function bossCollisionCheck() {
//   const collision = enemyBossCollision()
//   if(collision) {
//     playerOne.hpCurrent = 0
//     gameOver()
//   }
// }

function generateEnemies(num) {
  const gameBorder = document.getElementById('action-space')
  for (let i = 1; i <= num; i++) {
    const enemyBox = document.createElement('div')
    enemyBox.classList.add('enemy__box')
    const maxX = gameBorder.clientWidth - 50
    const maxY = gameBorder.clientHeight - 50
    enemyBox.style.left = Math.floor(Math.random() * (maxX - enemyBox.offsetWidth)) + 'px'
    enemyBox.style.top = Math.floor(Math.random() * (maxY - enemyBox.offsetHeight)) + 'px'

    enemyBox.setAttribute('id', `${enemyBox.style.left},${enemyBox.style.top}`)
    const enemy = {element: enemyBox, name: `${playerOne.level}${i}`, x: `${enemyBox.style.left}`, y: `${enemyBox.style.top}` }
    enemies.push(enemy)

    gameBorder.appendChild(enemyBox)
    enemyBox.addEventListener('click', (e) => {
      e.target.remove()
      destroyEnemy()
    })
  }
  enemyBoxes = document.querySelectorAll('.enemy__box')
  setInterval(updateEnemies, 5000)
}

// Below: Cut if the enemy box movement can't be figured out.
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
  playerOne.hpCurrent -= 10
  enemyDeathSound.play()
  playerBox.style.backgroundColor = 'red'
  if (playerOne.hpCurrent <= 0) {
    playerOne.hpCurrent = 0
    gameOver()
  }
  gaugeBarRender()

  let timeLimit = 1
  let timer = setInterval(() => {
    timeLimit--
    if (timeLimit <= 0) {
      clearInterval(timer)
      playerBox.style.backgroundColor = 'black'
    }
  }, 250)
  return true
}

function levelCheck() {
  if (playerOne.XP >= 100) {
    playerOne.levelUp()
  }
  else return
}

//Base destroy enemyBoss function for successfull boss kill
function destroyEnemyBoss() {
  currentSound = bossKillSound
  currentSound.play()
  //need a better method than shift to specifically target the boss intended for kill
  enemyBosses.shift()
  playerOne.XP += 100
  playerScore += 250
  levelCheck()
  updateScore()
  gaugeBarRender()
}

// Base destroy enemy function for any successful kill.
function destroyEnemy() {
  // enemies.shift() must be replaces with an enemies.splice that specifically targets the selected enemy.
  enemies.shift()
  enemyBoxes = document.querySelectorAll('.enemy__box')
  playerOne.mpCurrent += 20
  playerOne.XP += 10
  playerScore += 20
  levelCheck()
  updateScore()
  gaugeBarRender()
}

// original gaugeBarRender() for backup.
// function gaugeBarRender() {
//   playerHealth.value = playerOne.hpCurrent
//   playerMagic.value = playerOne.mpCurrent
//   playerExp.value = playerOne.XP
//   playerExpCount.innerHTML = playerOne.XP
//   playerHealthCount.innerHTML = playerOne.hpCurrent
//   playerMagicCount.innerHTML = playerOne.mpCurrent
//   return
// }
// get attribute set attribute and has attribute.
// create a stock gauge bar render to streamline the update process for interactive character bars
function gaugeBarRender() {
  playerHealth.setAttribute('max', playerOne.hpMax)
  playerHealth.setAttribute('value', playerOne.hpCurrent)
  playerMagic.setAttribute('max', playerOne.mpMax)
  playerMagic.setAttribute('value', playerOne.mpCurrent)
  playerExp.setAttribute('value', playerOne.XP)
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

// CHARACTER Classes. Movement speed currently irrelevant. Would like to examine later for additional potential powers, like freeze enemy movement and hasten player movement.

class Character {
  constructor(name, hpMax, hpCurrent) {
    this.name = name
    this.hpMax = hpMax
    this.hpCurrent = hpCurrent
  }
}

class Player extends Character {
  constructor(name, hpMax, hpCurrent, mpMax, mpCurrent, XP, level) {
    super(name, hpMax, hpCurrent)
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
    currentSound = healSound
    currentSound.play()
    gaugeBarRender()
  }
//pro tip: b key for bomb
  bombTrail() {
    if (this.mpCurrent >= 30) {
      this.mpCurrent -= 30
      gaugeBarRender()
      const bomb = document.createElement('div')
      bomb.classList.add('bomb')
      bomb.setAttribute('id', `${playerBox.style.left},${playerBox.style.top}`)
      bomb.style.left = `${playerBox.style.left}`
      bomb.style.top = `${playerBox.style.top}`
      gameBorder.appendChild(bomb)

      let timeLimit = 3
      let timer = setInterval(() => {
        timeLimit--
        if (timeLimit <= 0) {
          clearInterval(timer)
          // Add additional measure for collision explosion power effects on enemy and player.
          bomb.remove()
        }
      }, 1000)
      return true
    }
    currentSound = bombSound
    currentSound.play()
  }
// pro tip: q key for annihilate
  annihilate() {
    if (this.mpCurrent === this.mpMax) {
      this.mpCurrent -= this.mpMax
      gameBorder.style.backgroundColor = 'blue'
      gaugeBarRender()
      const enemyNodes = document.querySelectorAll('.enemy__box')
      const boxArray = [...enemyNodes]
      const bombNodes = document.querySelectorAll('.bomb')
      const bombArray = [...bombNodes]
      boxArray.forEach((enemyBox) => enemyBox.remove())
      bombArray.forEach((bomb) => bomb.remove())

      let timeLimit = 1
      let timer = setInterval(() => {
        timeLimit--
        if (timeLimit <= 0) {
          clearInterval(timer)
          gameBorder.style.backgroundColor = 'antiqueWhite'
        }
      }, 500)
      return true
    }
    currentSound = annihilationSound
    currentSound.play()
  }
// pro tip: double click desired location to teleport
  teleport() {
    const playerBoxRect = playerBox.getBoundingClientRect()
    playerBox.style.left = `${playerBoxRect.left}`
    playerBox.style.top = `${playerBoxRect.top}`
    this.mpCurrent -= 50
    currentSound = dashSound
    currentSound.play()
  }
//pro tip: r key to freeze time
  freezeTime() {
    this.mpCurrent -= 75
    // clearInterval(updateBoss)
    // clearInterval(updateEnemies)
    // setTimeout(updateBoss, 5000)
    // setTimeout(updateEnemies, 5000)
    currentSound = hoverButtonSound
    currentSound.play()
    gaugeBarRender()
  }

  levelUp() {
    this.XP -= 100
    this.level++
    this.hpMax += 10
    this.hpCurrent = this.hpMax
    this.mpMax += 10
    this.mpCurrent = this.mpMax
    playerScore += 50
    currentSound = levelUpSound
    currentSound.play()
    updateScore()
    gaugeBarRender()
    generateEnemies(2)
    if (this.level % 5 === 0) {
      generateEnemyBoss()
    }
    if(playerOne.level >= 25) {
      gameOver()
    }
  }
}
const playerOne = new Player('Hero', 100, 100, 100, 100, 0, 1)

// SOUND ELEMENTS BELOW
const muteMusicBtn = document.getElementById('mute-music')
const muteSFXBtn = document.getElementById('mute-sfx')

const bossMusic = document.getElementById('boss-battle-music')
const hoverButtonSound = document.getElementById('button-hover')
const bombSound = document.getElementById('button-blip')
const bossKillSound = document.getElementById('boss-kill')
const buttonHoverSound = document.getElementById('button-hover')
const criticalHitSound = document.getElementById('critical-hit')
const dashSound = document.getElementById('dash-small')
const endMusic = document.getElementById('end-music')
const enemyDeathSound = document.getElementById('enemy-kill')
const hardSlashSound = document.getElementById('hard-slash')
const healSound = document.getElementById('heal')
const annihilationSound = document.getElementById('level-up-blast')
const levelUpSound = document.getElementById('level-up-chime')
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

// MUSIC MUTE AND ADJUST VOLUME FUNCTIONS
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

// SFX MUTE AND ADJUST VOLUME FUNCTIONS
function muteSFX() {
  if (sfxVolumeRange.value !== 0) {
    sfxVolumeRange.value = 0
    sfxVolume.value = 0
    sfxVolume.innerHTML = 0
    muteSFXBtn.innerHTML = 'unmute'
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
