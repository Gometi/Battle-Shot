# Project Overview

## Project Schedule

This schedule will be used to keep track of your progress throughout the week and align with our expectations.  

|  Day | Deliverable | 
|---|---| 
|Day 1: Tue| Wireframes and Priority Matrix|
|Day 2: Wed| Project Approval /  Pseudocode / actual code|
|Day 3: Thur| Basic Clickable Model |
|Day 4: Fri| Working Prototype |
|Day 5: Sat| Final Working Project |
|Day 6: Sun| Bugs / Stylying / PostMVP |
|Day 7: Mon| Project Presentations |


## Project Description

Use this section to describe your final project and perhaps any links to relevant sites that help 
convey the concept and\or functionality.

- My game called Battle Shot is a shooting game against an Ai opponent or opponents using Battleships

## Wireframes

Include images of your wireframes. 

- Landing page:  https://wireframe.cc/SsaHue
- Game page:   https://wireframe.cc/h3jheU

## Priority Matrix

Include a full list of features that have been prioritized based on the `Time and Importance` Matix.  

## Game Components

- A Welcome screen with a form that collects the user's name
- The game screen where the battle occurs
- The game screen will have a start and a restart button
- The User will control the ship's movement using the arrow keys and shoot using the spacebar
- The Ai ships will be able to shoot at the user's ship and also move around the screen
- The game screen will show the damage the User's ship has taken by displaying the ship's damage
  condition like 'good', 'critical' etc
- There will be a visual notification when any of the ships take damage
- The game screen will be have a timer that records how long it takes to complete the game
- There will be a game over screen that displays the User's name and the time it took to complete the
  game. And if the user won or lost.

### Landing Page
What will a player see when they start your game?

- The title of the game
- A form to collect the player's name
- A start button to start the game

### Game Initialization
What will a player see when the game is started? 

- The player will see a BattleShip on the screen, a help button to show the controls and a button to start the    game 

### Playing The Game
What will be the flow of the game, what will the user be expeted to do and what will the user expect from the gam

- The User will be fighting against other ships by shooting at them while also avoiding the shots from the         other ships. The user will have to destroy the other ships before his own ship is destroyed

### Winning The Game
What does it look like when the game ends, what determines winning or losing?

- The game ends when all the Ai ships are destroyed (You Win), or when the user's ship is destroyed (You Lose) 

### Game Reset
How will the user restart the game once it has been completed.

- There will be a restart button

## MVP 

Include the full list of features that will be part of your MVP 
- getting the ships to move using the arrow keys
- getting the ships to shoot bullets
- collision detection between the ships and the bullets
- if the bullets hit a ship, execute a function that gives a visual notification that a ship has been hit
- if an Ai ship is hit, it should disappear from the screen

## POST MVP

Include the full list of features that you are considering for POST MVP

- creating a class that defines a battleship object
- call a function that creates battleships using a class
- adding a damage indicator for the user's ship
- making the user's ship take more than one hit before it can be destroyed (and the Ai ships)
- there should be a condition that the user wins when all the Ai ships are destroyed, and the user loses
  when his ship is destroyed
- there should be a game over screen when the user wins or loses
- there should be a timer at the top that records the time it takes to complete the game
- the game over screen should show the user's name, if he wins or loses and the time it took to complete the     game
- there should be a restart button that restarts the game
## Functional Components

Based on the initial logic defined in the previous game phases section try and breakdown the logic further into functional components, and by that we mean functions.  Does your logic indicate that code could be encapsulated for the purpose of reusablility.  Once a function has been defined it can then be incorporated into a class as a method. 

Time frames are also key in the development cycle.  You have limited time to code all phases of the game.  Your estimates can then be used to evalute game possibilities based on time needed and the actual time you have before game must be submitted. 

| Component | Priority | Estimated Time | Time Invetsted | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Game Screen Creation | H | 4hrs|  |  |
| Moving the ships | H | 6hrs|  |  |
| Collision detection | H | 8hrs|  |  |
| Damage indicator | L | 8hrs|  |  |
| Game over screen | L | 8hrs|  |  |
| Timer | L | 3hrs|  |  |
| Restart | L | 2hrs|  |  |
| Total |  | 39hrs|  |  |

## Helper Functions
Helper functions should be generic enought that they can be reused in other applications. Use this section to document all helper functions that fall into this category.

| Function | Description | 
| --- | :---: |  
| Capitalize | This will capitalize the first letter in a string | 

## Additional Libraries
 Use this section to list all supporting libraries and thier role in the project. 

## Code Snippet

Use this section to include a brief code snippet of functionality that you are proud of an a brief description.  

## jQuery Discoveries
 Use this section to list some, but not all, of the jQuery methods and\or functionality discovered while working on this project.

## Change Log
 Use this section to document what changes were made and the reasoning behind those changes.  

## Issues and Resolutions
 Use this section to list of all major issues encountered and their resolution.

#### SAMPLE.....
**ERROR**: app.js:34 Uncaught SyntaxError: Unexpected identifier                                
**RESOLUTION**: Missing comma after first object in sources {} object
