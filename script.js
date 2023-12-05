// Major lingering bugs:
// NOTE : Music and SFX are OFF due to annoyance. turn them on for final program.
// Gauge progress bars not increasing / decreasing based on player stats. must examine further.
// SFX volume mute not working, not silencing sound.
// 1. Must successfully enable enemy-player collision on enemies generated on level up
// 3. Must successfully enable border collision with player damage on enemy blocks
// 4. Must successfully reverse direction of enemy blocks upon border collision
// BONUS 1: Must successfully enable enemy on enemy collision prevention. Reverse direction effect.
// BONUS 2: For some reason the code is breaking when I attempt to migrate my audio materials from script.js to audio.js. Cannot figure out why.
// BONUS 3: Teleport is doing funky things and not normal. May need to cut for final draft.
// BONUS 4: Make enemy bosses kill player on collision.
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

// ENEMY COLLISION DETECTION BELOW. Currently must refactor for my script. THIS IS READY TO UPDATE . // potentially save this for a boss of some kind? Spawn unique enemy with ID-based stuff

// function enemyCollision(top, left, right, bottom, enemyBox) {
//   const playerBoxRect = playerBox.getBoundingClientRect()
//   const enemyBoxRect = enemyBox.getBoundingClientRect()
//   const scrollTop = document.documentElement.scrollLeft
//   const scrollLeft = document.documentElement.scrollTop
//   const playerBoxTop = playerBoxRect.top + scrollTop
//   const playerBoxLeft = playerBoxRect.left + scrollLeft
//   const enemyBoxTop = enemyBoxRect.top + scrollTop
//   const enemyBoxLeft = enemyBoxRect.left + scrollLeft

//   const overlapEnemyX = playerBoxLeft + left < enemyBoxRect.right && playerBoxLeft + playerBox.offsetWidth + right > enemyBoxLeft
//   const overlapEnemyY = playerBoxTop + top < enemyBoxRect.bottom && playerBoxTop + playerBox.offsetHeight + bottom > enemyBoxTop
//   return overlapEnemyX && overlapEnemyY
// }

// id based collision experimental check
// function boxCollision(x,y, top, left, right, bottom) {
//   const playerBoxRect = playerBox.getBoundingClientRect()
//   const potentialBox = document.getElementById(x,y)
//   const potentialBoxRect = potentialBox.getBoundingClientRect()
//   const scrollTop = document.documentElement.scrollLeft
//   const scrollLeft = document.documentElement.scrollTop
//   const playerBoxTop = playerBoxRect.top + scrollTop
//   const playerBoxLeft = playerBoxRect.left + scrollLeft
//   const potentialBoxTop = potentialBoxRect.top + scrollTop
//   const potentialBoxLeft = potentialBoxRect.left + scrollLeft

//   const overlapEnemyX = playerBoxLeft + left < potentialBoxRect.right && playerBoxLeft + playerBox.offsetWidth + right > potentialBoxLeft
//   const overlapEnemyY = playerBoxTop + top < potentialBoxRect.bottom && playerBoxTop + playerBox.offsetHeight + bottom > potentialBoxTop
//   return overlapEnemyX && overlapEnemyY
// }

//add on to handle keys ARTHUR MEETING DRAFT WORK

function findCollision(x, y) {
  let collision = false
// would we need to return a range? does it have to be exact within a single pixel? The boxes are 10 by 10, would this cause an issue if it's only slightly clipping the corner?
  const currentEnemy = enemies.find((enemy) => {
    return enemy.x === x && enemy.y === y
    })
    if(enemies.includes(currentEnemy)) {
      collision = true
      // how to target the specific enemy box??
      //below : must re-place into a collision damage function.
      currentEnemy.remove()
      enemies.splice(enemies.indexOf(currentEnemy), 1)
      takeDamage()
    } collision = true
  }


//below: scratch code for potential generated enemy collision fix
// document.addEventListener('keydown', (e) => {
// e.preventDefault()
// let keydown = e.code
// if (keydown === 'KeyD' || keydown === 'KeyA' || keydown === 'KeyS' || keydown === 'KeyW') {
//   if (boxCollision(playerBox.style.left, playerBox.style.top, 0, 0, 0, 0)) {
//     console.log("COLLISION!")
//       e.target.remove() // will this successfully delete the enemy box?? So far we're focusing on the enemies array but how do we kill the actual box???
//       takeDamage()
//     }
//   }
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
  }

  // currently not working must re-examine
  function enemyBossCollision() {
    const playerBoxRect = playerBox.getBoundingClientRect()
    if (enemyBosses.length > 0) {
      enemyBosses.forEach((enemyBoss) => {
        const enemyBossRect = enemyBoss.getBoundingClientRect()
        const scrollTop = document.documentElement.scrollLeft
        const scrollLeft = document.documentElement.scrollTop
        const playerBoxTop = playerBoxRect.top + scrollTop
        const playerBoxLeft = playerBoxRect.left + scrollLeft
        const enemyBossTop = enemyBossRect.top + scrollTop
        const enemyBossLeft = enemyBossRect.left + scrollLeft

        const overlapEnemyX = playerBoxLeft < enemyBossRect.right && playerBoxLeft + playerBox.offsetWidth > enemyBossLeft
        const overlapEnemyY = playerBossTop < enemyBossRect.bottom && playerBoxTop + playerBox.offsetHeight > enemyBossTop
        return overlapEnemyX && overlapEnemyY
      })
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
  enemies.splice(0, enemies.length)
  enemyBoxes = document.querySelectorAll('.enemy__box')
  const boxArray = [...enemyBoxes]
  boxArray.forEach((enemyBox) => enemyBox.remove())
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
  gaugeBarRender()
})

document.addEventListener('keydown', function(event) {
  if (event.key === 'q') {
    playerOne.annihilate()
  }
  gaugeBarRender()
})

function gameOver() {
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
  // currentSong.pause()
  // currentSound = playerDeathSound
  // playerDeathSound.play()
  // endMusic.play()
  playerBox.classList.add('player__box')
  gameOverScreen.classList.toggle('activate')
  updateScore()
  gaugeBarRender()
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

// UPDATE ENEMY MOVEMENT BELOW
// It's almost there! Just need to successfully get enemy wall collision updated. Mute this when necessary
// function updateEnemies() {
//   if (enemies.length > 0) {
//     const gameBorder = document.getElementById('action-space')
//     enemyBoxes = document.querySelectorAll('.enemy__box')
//     enemyBoxes.forEach((enemyBox) => {
//       const gameBorderWidth = gameBorder.clientWidth
//       const gameBorderHeight = gameBorder.clientHeight

//       const enemyWidth = enemyBox.offsetWidth
//       const enemyHeight = enemyBox.offsetHeight

//       const maxX = gameBorderWidth - enemyWidth
//       const maxY = gameBorderHeight - enemyHeight

//       const randomAngle = Math.random() * 2 * Math.PI

//       const deltaX = Math.cos(randomAngle)
//       const deltaY = Math.sin(randomAngle)

//       let newX = Math.random() * maxX
//       let newY = Math.random() * maxY
//       // the border detection is not currently working. examine.
//       // if(newX < 0) {
//       //   newX = 0
//       // } else if (newX > maxX) {
//       //   newX = maxX
//       // }
//       // if (newY < 0) {
//       //   newY = 0
//       // } else if (newY > maxY) {
//       //   newY = maxY
//       // }

//       if(newX < 0 || newX > maxX) {
//         enemyBox.remove()
//         playerOne.hpCurrent -= 1
//       }
//       if (newY < 0 || newY > maxY) {
//         enemyBox.remove()
//         playerOne.hpCurrent -= 1
//       }
//       enemyBox.style.left = newX + 'px'
//       enemyBox.style.top = newY + 'px'

//       enemyBox.style.transition = 'all 5s linear'
//       enemyBox.style.transform = `translate(${deltaX * newX}px, ${deltaY * newY}px)`
//     })
//   }
// }

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
      const speed = 5
      const deltaX = speed * Math.cos(angle)
      const deltaY = speed * Math.sin(angle)

      const newX = Math.max(0, Math.min(bossX + deltaX, gameBorder.clientWidth - 50))
      const newY = Math.max(0, Math.min(bossY + deltaY, gameBorder.clientHeight - 50))

      enemyBoss.style.left = newX + 'px'
      enemyBoss.style.top = newY + 'px'
    })
  }
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

  enemyBosses.push(enemyBoss)
  gameBorder.appendChild(enemyBoss)

  enemyBoss.addEventListener('click', (e) => {
    e.preventDefault()
    enemyBossHP--
    if (enemyBossHP === 0) {
      e.target.remove()
      destroyEnemyBoss()
    }
  })
  setInterval(updateBoss, 250)
  setInterval(bossCollisionCheck, 250)
  // if (playerOne.freezeTime()) {
  //   clearInterval(updateBoss)
  //   clearInterval(updateEnemies)
    // const restartEnemyTime = setInterval(updateEnemies, 5000)
    // setTimeout(restartEnemyTime, 5000)
  // }
}

function bossCollisionCheck() {
  const collision = enemyBossCollision()
  if(collision) {
    playerOne.hpCurrent = 0
    gameOver()
  }
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

    enemyBox.setAttribute('id', `${enemyBox.style.left},${enemyBox.style.top}`)
    const enemy = { name: `${playerOne.level}${i}`, x: `${enemyBox.style.left}`, y: `${enemyBox.style.top}` }
    enemies.push(enemy)

    gameBorder.appendChild(enemyBox)
    enemyBox.addEventListener('click', (e) => {
      e.target.remove()
      destroyEnemy()
    })
  }
  enemyBoxes = document.querySelectorAll('.enemy__box')
  // setInterval(updateEnemies, 5000)
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
  console.log('damage!')
  playerOne.hpCurrent -= 10
  // WILL THIS BE A POTENTIAL FIX TO KILL THE ENEMY BOXES?!?!?!?! IT IS!!!!!!!! Now we just have to ensure the enemies array is taken care of, collision occurs, and the collision accounts for the FULL BODY OF THE OBJECTS. Must remember to add a continuously updating ID to the object. We must AGAIN call the set attribute element on the box for each instance of its moving so that the id will be updated and correctly affected.
  const enemyBox = document.getElementById(`${playerBox.style.left},${playerBox.style.top}`)
  enemyBox.remove()
  enemyDeathSound.play()
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
      playerBox.style.backgroundColor = 'red'
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
  }
// pro tip: double click desired location to teleport
  teleport() {
    const playerBoxRect = playerBox.getBoundingClientRect()
    playerBox.style.left = `${playerBoxRect.left}`
    playerBox.style.top = `${playerBoxRect.top}`
    this.mpCurrent -= 50
  }
//pro tip: r key to freeze time
  freezeTime() {
    this.mpCurrent -= 75
    // clearInterval(updateBoss)
    // clearInterval(updateEnemies)
    // setTimeout(updateBoss, 5000)
    // setTimeout(updateEnemies, 5000)
    gaugeBarRender()
  }

  levelUp() {
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
    if (this.level % 5 === 0) {
      generateEnemyBoss()
    }
  }
}
const playerOne = new Player('Hero', 100, 100, 100, 100, 0, 1)

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
