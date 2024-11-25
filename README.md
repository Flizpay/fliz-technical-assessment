# FLIZpay Technical Assessment  

- Game of Empires 

- Your goal is to use the files in this project to develop a React + Express + MongoDB web application that allows the user to play the Game of Empires on the browser.
- The game consists of a map with places to be explored (Actions) where you have peasants, coins and scrolls (Resources) to spend on these explorations. 
- Each action consumes a certain amount of scrolls, peasants and coins. 
- Each action rewards the player with skill points and/or peasants, coins and scrolls. 
- The skills in the game are Fear, Magic, Trading and Wisdom. 
- Actions are more willing to be successful based on the level of the player skills
- Actions take time to complete, and the player can choose to pay coins to speed-up an action. (Pay-to-win)
- Once an action was initiated, the resources allocated on it are committed until the end of the action (Transactions)
- The game starts with a set of 20 adventures, once they are all completed a new set of 20 adventures will be available (Easy, Medium Hard)


## Game Features 

- Login and Sign-up 
  - Implement Google Sign-up and Login 
  - Player needs to choose one House to belong during sign-up (Cosmetic only: doesn't change the amount of resources)
  - Player needs to choose a UNIQUE nickname and provide a UNIQUE e-mail (Obtained from Google Login)

- Play
  - Players can see a map full of activities (randomly placed)
  - Players can distribute the initial skills as they choose appropriate
  - Players can click one activity to start it, thus spending the predefined resource cost 
  - Once an activity was started a timer should be shown on top of it on the screen showing the remaining time for its completion
  - Once an activity is finished players shall be rewarded with the predefined activity reward
  - If an activity fails it shall not be marked as completed and the player can restart it
  - On the left side of the screen the player shall see its stats: Resources + Skills + House 
  - On the right side of the screen the player can see the list of activities remaining to be completed on the current level and can interact with it as if they were clicking on the activity in the map.

- Pay to win 
  - Players can pay to finish an action earlier:
    - Easy: 0.1 coins/second remaining
    - Medium: 0.2 coins/second remaining
    - Hard: 0.3 coins/second remaining

## Project

  - Config 
    - Initial config for the player initial resources and skill points
    - Levels config with all actions for the 3 game levels
  
  - Assets 
    - All necessary icons, backgrounds and images are provided in the assets folder

## Tunning 

- Why These Values?

  - Resources: The starting resources give enough to handle about 4-6 actions on the Easy level without running out of  materials.

  - Skills: A 50%-70% success rate for easy tasks ensures new players feel rewarded without making failure trivial. Success rates for medium tasks will hover at ~30%-50% initially, encouraging skill growth.


## Tasks (Required)

- Fork this project to a public repository on your GitHub Account
- Implement the game using React + Express + MongoDB
- Develop all the required functionalities and feel free to add more functionalities
- Create separate feature branches and PR's to your repo, use semantic commits
- Deploy it to a cloud provider of your choice 
- Assign a domain name with SSL/TLS 
- Share the web address to your game

## Nice to have (Not required)

- Multiplayer with websocket
- Cool animations
- FX Sounds

