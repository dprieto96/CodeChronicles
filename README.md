Facultad de Informatica´![](README/Aspose.Words.d00c839d-a0ca-404c-9d85-918fd57013ac.001.png)

![](Aspose.Words.d00c839d-a0ca-404c-9d85-918fd57013ac.002.png)

Memoria DVI![](Aspose.Words.d00c839d-a0ca-404c-9d85-918fd57013ac.003.png)

Authors: Samuel Santos Hern´an, Tyson Mendes y Daniel Prieto Remacha

April 15, 2023

Tabla de contenidos

[0 Introduction](#_page2_x59.53_y84.19) 1 [1 Game Concept](#_page3_x119.06_y84.19) 2

1. [About ](#_page3_x119.06_y187.26). . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 2
1. [Main Features .](#_page4_x59.53_y180.80) . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3
1. [Common features .](#_page4_x59.53_y218.31) . . . . . . . . . . . . . . . . . . . . . . . . . . . 3
1. [Vertical levels ](#_page4_x59.53_y317.96). . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3
1. [Horizontal levels ](#_page4_x59.53_y487.30). . . . . . . . . . . . . . . . . . . . . . . . . . . . 3
3. [Current issues to deal with ](#_page5_x119.06_y84.19). . . . . . . . . . . . . . . . . . . . . . . . . . 4
4. [Visuals ](#_page5_x119.06_y273.75). . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4
4. [Music and Sound effects ](#_page6_x59.53_y424.29). . . . . . . . . . . . . . . . . . . . . . . . . . . . 5

[2 Game Mechanics](#_page7_x119.06_y84.19) 6
 
1. [Game flow ](#_page7_x119.06_y186.80). . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 6
1. [Planet-to-Planet (PtP) . .](#_page7_x119.06_y355.01) . . . . . . . . . . . . . . . . . . . . . . . . . . . 6
1. [Overworld Levels (OwL) .](#_page8_x59.53_y84.19) . . . . . . . . . . . . . . . . . . . . . . . . . . . 7

[3 Progress so far](#_page9_x119.06_y84.19) 8



<a name="_page2_x59.53_y84.19"></a>0 Introduction

The goal of this project relies on specifying and implementing a videogame for the Web-based Videogames Development subject. For that sake, it shall be iterated in three cumulative stages or milestones, which will increasingly add more features and functionality to the project.

1<a name="_page3_x119.06_y84.19"></a> Game Concept

1. About
- <a name="_page3_x119.06_y187.26"></a>Title: Lunar Legends: A Journey Beyond
- Genre: Sci-Fi, Scares
- Style: Platformer-RPG
- Graphic Style: Pixelart
- Platform: Web
- Targeted public: +7

Lunar Legends: A journey Beyond is 3rd person experience videogame for web browsers. The goal of the game relies on getting the main character, called Alonso Quijano, from Earth to Neptuno, retrieving a space probe, the “Voyager 3”, and getting back. The main problem is that our protagonist is not an actual astronaut. This game is based on

the popular book called “Don Quijote de la Mancha”, wrote by Miguel de Cervantes in 1605. The main character will have the same personality as Don Quijote. He has read a lot of books about space travels, so his dream is to go on a journey. Although, he will be progressively losing his mind in the middle of it.

The game would contain two main types of levels: one of which would consist on a vertical-ascending platform system, for going from a planet to the next one; and the other one, also a platformer but in this case with lateral scroll and Zelda-styled puzzles, for when being in the planets. On the other hand, there would be spacelogs around the Overworld levels that on one hand gives the player a hint towards what to do next, and on the other one, either a power-up/reward or some negative effect.

The main goal consists on making the player experience intense and emotional feelings. The game achieves this objective by immersing the player in a world where they must not only overcome physical objects, but also face the mental deterioration of the protagonist. The atmosphere will be created by the narrative and the soundtrack working together to keep the player engaged to the game, but not only restricted to these, since throughout the game, the player would eventually experience a few jumpscares justified by the

2. Main Features

aforementioned mental deterioration.

To sum up, the game will create a range of emotions in the player, including frustration, satisfaction, excitement and engagement. The balance of these feelings will make the overall experience memorable for the player.

2. Main<a name="_page4_x59.53_y180.80"></a> Features
1. Common<a name="_page4_x59.53_y218.31"></a> features
- Difficulty: Increasingly difficult as levels are cleared
- OST: Pending to be discussed
2. Vertical<a name="_page4_x59.53_y317.96"></a> levels
- Perspective: Cenital with vertical, ascending scrolling
- Enemies: Asteroids
- Player: Spaceship
- Available movement: 4 directions
- Abilities: Shooting bullets
3. Horizontal<a name="_page4_x59.53_y487.30"></a> levels
- Perspective: Lateral with horizontal scrolling
- Asteroids: Enemies
- Spaceship: Player
- Available movement: left and right
- Abilities: jumping, pick up and down objects, activating mechanisms (like a switch or lever).

Note: During debug, the dev can skip levels by pressing the Carriage Return key.

1 Game Concept

3. Current<a name="_page5_x119.06_y84.19"></a> issues to deal with
- Collisions both in vertical and horizontal levels are giving problems, since the player does not seem to collide properly with the different objects.
- The screen size, as well as the size and available space for all the elements on screen is still something to be adjusted by testing and looking for the best configuration.
- Although the main goal for the horizontal levels is that of creating complex puzzles to solve or tricky maps, we currently do not know how much time we will end up having, thus we will priorize having a couple of basic yet functional horizontal levels rather than a complex one that may not even be fully functional.
4. Visuals

<a name="_page5_x119.06_y273.75"></a>Since we want a pixelart style, it was our desire that our protagonist had a funny sprite with toon proportions, as well as a big head that stands out. This will contrast with the space environment, giving a mix of fun but intrigue, let alone the jumpscares we would like to add. The references we took inspiration from are mainly Metroid and SpaceX suits, the former one for the body shape, and the latter one for the overall design.

On the other hand, apart from the excuse of “He can’t breathe other planets’ air”, the idea of having the helmet on helps us simplifying the sprite, since making a expressive human face, and let alone in pixelart, can become very tough.

![](Aspose.Words.d00c839d-a0ca-404c-9d85-918fd57013ac.004.jpeg) ![](Aspose.Words.d00c839d-a0ca-404c-9d85-918fd57013ac.005.png)

Figure 1.1: Sketch concept for Alonso Quijano and final version

5. Music and Sound effects

![](Aspose.Words.d00c839d-a0ca-404c-9d85-918fd57013ac.006.png) ![](Aspose.Words.d00c839d-a0ca-404c-9d85-918fd57013ac.007.png)

Figure 1.2: Reference for the spaceship and final version

What regards the spaceship, on the other hand, it was much easier to design, since we just had to look for cool spaceships around the internet and recreate them in pixelart. Above is the result.

<a name="_page6_x59.53_y424.29"></a>1.5 Music and Sound effects

We expect to create the music ourselves, although depending on how well the progress is or not, we may decide to just choose OST from libraries. Regarding the sound effects, we will add sounds only to the horizontal levels (for jumping, walking, etc), since there is no sound in space.

<a name="_page7_x119.06_y84.19"></a>2 Game Mechanics

1. Game<a name="_page7_x119.06_y186.80"></a> flow

The game will play an intro cutscene in which the player will be briefly presented the

lore of the game, as well as the game controls, obviously. After this, the levels will automatically start. Beating a level will automatically conduct the player to the next one. But as soon they will discover, once you finish the last level (there will be few levels in total precisely because of this), you will start the first one again. But this does not mean that the player has beaten the game. Not at all. They will need to find the actual way to beat it, by means of hints that will be appearing throughout the levels.

2. Planet-to-Planet<a name="_page7_x119.06_y355.01"></a> (PtP)

In these levels, the player will have to reach the next planet with the help of their spaceship. But a bunch of asteroids will be blocking his path, so they will have to dodge them or shoot at them in order to survive. There will be no gravity, hence forces applied to the ship will make it move until another force in the opposite way is applied. The player will also have a limited amount of fuel and bullets, thus a limited amount of moves. If the fuel gets down to zero the player will lose all control over the ship and it will keep with the current trajectory either collides with an obstacle or reaches the planet. On the other hand, the player will have to manage their bullets wisely.

Movement and abilities (WASD configuration):

- Right
- Left
- Accelerate/Up
- Decelerate/Down
- Shoot bullets ( Space key).
3. Overworld Levels (OwL)

2\.3<a name="_page8_x59.53_y84.19"></a> Overworld Levels (OwL)

In these levels, there would be small differences with a Super Mario level, but for the setting, the gravity, the enemies and the puzzles. The player will have to reach the right side of the screen in order to proceed to the next level, and for these they will not only need to jump between platforms but also interact with objects, activate mechanisms or even solving some logic puzzles.

Movement and abilities:

- Right
- Left
- Jump
- Crowl
- Pick up objects / activate mechanisms

<a name="_page9_x119.06_y84.19"></a>3 Progress so far

Here we can see several screenshots of the different levels (still in progress):

![](Aspose.Words.d00c839d-a0ca-404c-9d85-918fd57013ac.008.jpeg) ![](Aspose.Words.d00c839d-a0ca-404c-9d85-918fd57013ac.009.jpeg)

![](Aspose.Words.d00c839d-a0ca-404c-9d85-918fd57013ac.010.jpeg)

Figure 3.1: Vertical levels

![](Aspose.Words.d00c839d-a0ca-404c-9d85-918fd57013ac.011.jpeg) ![](Aspose.Words.d00c839d-a0ca-404c-9d85-918fd57013ac.012.jpeg)

Figure 3.2: Horizontal levels
9
