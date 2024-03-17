Game Title: Dungeon Arena. alt: "Momentum"



Link to Wireframe:



![Dungeon Arena Concept Wireframe] (https://drive.google.com/file/d/1XSu-kqlXQVTMx1pfhtnu0-OYTg5EFzDZ/view?usp=sharing)



Screenshots:

![Game Menu](images/Game_Menu_Momentun.png)

![Boss Fight] (images/Momentum_Boss_Shot.png)

![Game Over Screen] (images/Momentum_Game_Over_Shot.png)

![Game Screen] (images/Momentum_Game_Shot.png)

Technologies used: HTML, CSS, JS, Adobe Audition, Freesound.org



Getting Started:



Link to game:![Dungeon Arena Live Link] (https://clazariuk1.github.io/Dungeon-Arena-GAp1/)



Summary:



An arcade-style survival game in which you survive endless waves of enemies using click-based attacks and various powers. Intended as an exploration in collision detection and how to challenge the player through multitasking and hand-eye coordination.



initial concept:



What if it was an action game with RPG elements - you move a player box around screen and avoid enemy boxes always trying to damage on collision with the player box. Player box can attack with click-based methods while enemy box is collision damage only. You’d face small, generic enemies, and Boss enemies across a couple different levels. The primary game mechanic is avoiding on collision damage while clicking enemies to death. Enemies spawn on level up and even the act of moving causes you to gain XP and level, necessitating strategy in how you intend to maintain your gameplay momentum.



Initial pseudocode:



As it fleshes out: you move a box that is bound within the borders of a container.

1: ENABLE BOX MOVEMENT

2: ENABLE BORDER COLLISION DETECTION / BOUNCE-OFF WALL

3: ENABLE enemy box / player Box collision detection

4: delete enemy box, subtract playerBox health after collision detection

5: propagate enemy boxes at random throughout container space. All must move i random directions. Player health lost for enemy contact on border walls for border walls or player box hit.

6: Enemies destroyed with click-based attack or kill all active boxes powers.





Base game instructions:
    You're an adventurer trapped in a nightmarish dungeon from which there is no escape. Survive the continuous onslaught of enemies. Be warned! Colliding with enemies will damage you, and enemies colliding with the border walls will also damage you! Maintain momentum to recover your HP and MP. Survive 25 waves of foes and, with luck, you'll see the light of day again.

-Move using the WASD keys.

-Click on enemy boxes to attack.

-Heal yourself with the 'e' key. Costs 20 MP, heals 30HP

-Lay a bomb in your wake with the 'b' key that destroys enemy bosses for massive bonus points! Costs 30MP.

-Annihilate all enemies with the 'q' key, for those moments when survival is more important than earning top score. Costs 75 MP.

-Freeze Time with the 'r' key and stop enemies in their tracks. Costs 75 MP. "COMING SOON."

-Teleport to your starting position with the 't' key, but don't box yourself into a corner! Costs 50 MP.

Next Steps:

-Deploy additional player powers and abilities, such as 'dash' speed boost and Freeze Time.

-Deploy additional enemy types, with different/new powers, movement speeds, and health quantities.

-Revise enemy generation and movement models for less buggy interactions. Base new model off of .getBoundingClientRect() system, rather than current ‘x,y’ method, which has instilled bugs in program. Must eliminate random generation and make pre-selected generation to allow more effective enemy creation/control.

-Deploy additional levels with alternate music and backgrounds.

-Deploy difficulty choice selection which will affect player/enemy box sizes and movement speeds.

-Sleep.



Licensed Sounds collected from Freesound.org :



-Boss Battle Loop #3, by Sirkoto51 on October 15th 2018.

https://freesound.org/people/Sirkoto51/sounds/443128/



-Button lustra ctlux bowl(3layer, filter)2.wav, by newlocknew on May 8, 2020.

https://freesound.org/people/newlocknew/sounds/517373/



-8 Bit Game Theme.wav, by Mrthenoronha on April 28, 2020.

https://freesound.org/people/Mrthenoronha/sounds/515615/
