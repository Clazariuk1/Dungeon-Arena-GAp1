Link to Wireframe:

![Dungeon Arena Concept Wireframe] (https://drive.google.com/file/d/1XSu-kqlXQVTMx1pfhtnu0-OYTg5EFzDZ/view?usp=sharing)


Licensed Sounds collected from Freesound.org :

-Boss Battle Loop #3, by Sirkoto51 on October 15th 2018.
https://freesound.org/people/Sirkoto51/sounds/443128/

-Button lustra ctlux bowl(3layer, filter)2.wav, by newlocknew on May 8, 2020.
https://freesound.org/people/newlocknew/sounds/517373/

-8 Bit Game Theme.wav, by Mrthenoronha on April 28, 2020.
https://freesound.org/people/Mrthenoronha/sounds/515615/


initial concept:

What if it was an action game with RPG elements - you move a player box around screen and avoid enemy boxes always trying to damage on collision with the player box. Player box can attack with a given pixel range ahead of them or around them or other pattern while enemy box is damage on collision only. You’d face small enemies and Big enemies classes with different skins across a couple different levels (if time permits) . The primary game mechanic is avoiding on collision damage while making strike damage. different character classes can play with conic or straight line or one point attacks, heal or XP boost features, get stronger as you level and level often to play up the ‘level up’ trope.

As it fleshes out : you move a box that is bound within the borders of a container.
1: ENABLE BOX MOVEMENT
2: ENABLE BORDER COLLISION DETECTION / BOUNCE-OFF WALL
3: ENABLE enemy box / player Box collision detection
4: delete enemy box, subtract 1 playerBox health after collision detection
5: propagate enemy boxes at random throughout container space. All must gravitate toward player . OR, if this is too difficult, all must move at random directions. Points lost and block deleted for border walls or player box hit.
6: Enemies destroyed with click-based attack or kill all active boxes.
