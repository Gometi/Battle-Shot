$(document).ready(function () {
  let playerName = $('.playerName');     //store player name
  let number_of_ships_destroyed = 0;
  let seconds = 0;
  let minutes = 0;
  let time;
  let timer;

  $('.begin').click(() => {
    if (!playerName.val()) alert('Enter Your Name to Begin!')  //if text field for the player name is empty call alert function
    else $('.welcomePage').css('display', 'none');            //hide the welcome page
  })
  $('.start_button').click(() => {                          //click function to start the game
    timer = setInterval(() => {                            //a setInterval function to calulate the time
      seconds++;
      if (seconds > 59) {
        seconds = 0;
        minutes++;
      }
      if (minutes > 59) {
        minutes = 0;
      }
      time = `${minutes} minutes ${seconds} seconds`;
      $('.timer').text(time);                           //display the time
    }, 1000);

    let playerPosition = $('.player').offset();        //store the player's ship position
    let player_ship_destroyed = false;


    let getAiPosition = (position) => {               //function for getting the ai's ship's position
      return $('.ai').offset();
    }
    let getBulletPosition = (position) => {          //function for getting the bullet's position
      return $('.bullet').css(position);
    }
    let setBulletPosition = (className, position, positionValue) => {
      $(`.${className}`).css(position, positionValue);
    }
    let setAiPosition = (position, positionValue) => {     //function for positioning the ai's  ship
      $('.ai').css(position, positionValue);
    }

    class ai_ship {                           //class definition for the ai ship
      constructor(leftPosition, topPosition) {
        this.leftPosition = leftPosition;
        this.topPosition = topPosition;
        let aiShip = $("<div></div>");       //create a div for the ai ship

        aiShip.addClass('ai');
        this.aiShip = aiShip;
        let bullet = $('<div></div>');       //create a div for the bullet
        bullet.addClass('bullet');
        this.bullet = bullet;
        this.damage_ship_can_take = 4;
        this.is_ship_destroyed = false;
        this.executing;
        this.moving_top_down;
        this.moving_right_left;
      }
      getTopPosition() {
        return this.topPosition;
      }
      getLeftPosition() {
        return this.leftPosition;
      }
      createShip() {
        $('.game-screen').append(this.aiShip);        //add the ai ship to the div with the class 'game-screen'
        setAiPosition('left', `${this.leftPosition}px`);
        setAiPosition('top', `${this.topPosition}px`);
      }
      createAmmo() {
        $('.game-screen').append(this.bullet);         //add the bullet to the div with the class 'game-screen'
        setBulletPosition('bullet', 'left', `${this.leftPosition + 20}px`);
        setBulletPosition('bullet', 'top', `${this.topPosition + 50}px`)
      }
      move() {
        let moving_right = true;
        let moving_down = true;
        this.moving_top_down = setInterval(() => {     //setInterval that makes the ai ship move up and down
          if (moving_down) {
            setAiPosition('top', `${this.topPosition++}px`);   //increases the value of the top position every iteration
            if (this.topPosition === 200) moving_down = false;
          }
          else {
            setAiPosition('top', `${this.topPosition--}px`);   //decreases the value of the top position every iteration
            if (this.topPosition === 0) moving_down = true;
          }

        }, 50);
        this.moving_right_left = setInterval(() => {         //setInterval that makes the ai ship move left and right
          if (moving_right) {
            setAiPosition('left', `${this.leftPosition++}px`);  //increases the value of the left position every iteration
            if (this.leftPosition === 750) moving_right = false;
          }
          else {
            setAiPosition('left', `${this.leftPosition--}px`);    //decreases the value of the left position every iteration
            if (this.leftPosition === 0) moving_right = true;
          }

        }, 5);

      }
      shoot() {
        setTimeout(() => {
          this.bullet.css('top', `${playerPosition.top}px`)
          this.bullet.css('left', `${playerPosition.left + 10}px`)
          setTimeout(() => {
            if (getBulletPosition('top') >= `${playerPosition.top}px` && getBulletPosition('top') <= `${playerPosition.top + 50}px` && getBulletPosition('left') >= `${playerPosition.left}px` && getBulletPosition('left') <= `${playerPosition.left + 50}px`) {    //if the position of the bullet and the player ship are equal
              this.bullet.remove();
              $('.player').addClass('explosion');     //the explosion class has a gif with an explosion animation
              clearInterval(this.moving_top_down);    //stop the ai ship from moving
              clearInterval(this.moving_right_left);
              clearInterval(this.executing);          //stops the ship from creating ammo and shootiong
              setTimeout(() => {
                $('.player').remove();                //remove the div containing the player's ship
              }, 2000);

              player_ship_destroyed = true;
            }

            else {
              this.bullet.remove();
            }
          }, 2050);
        }, 20);
      }
      executeInstructions() {              //function that calls the function for creating ammo and shooting every 2500 milliseconds
        this.executing = setInterval(() => {
          this.createAmmo();
          this.shoot();
        }, 2500);
        this.move();
      }

      destroyShip() {
        this.damage_ship_can_take--;        //reduce the damage the ai ship can take
        if (!this.is_ship_destroyed) {        //if the ai ship is not destroyed when it is hit
          this.aiShip.addClass('damage');   //add damage notification to the ai ship when it is hit
          setTimeout(() => {
            this.aiShip.removeClass('damage');
          }, 100);
        }

        if (this.damage_ship_can_take === 0) {
          this.aiShip.removeClass('ai');
          this.aiShip.addClass('ai_explosion');    //add an exploding animation to the ai ship
          clearInterval(this.moving_top_down);     //stop the ai ship's movement
          clearInterval(this.moving_right_left);
          clearInterval(this.executing);            //stop the ai ship from creating bullets and shooting
          setTimeout(() => {
            this.aiShip.remove();
            this.bullet.remove();
          }, 2000);

          this.is_ship_destroyed = true;
          number_of_ships_destroyed++;
        }
      }

    }
    let firstShip = new ai_ship(300, 2);
    firstShip.createShip();
    firstShip.executeInstructions();

    let winOrLoss = setInterval(() => {     //a setInterval function that checks if the ai ship is destroyed or if the player's ship is destroyed 
      if (firstShip.is_ship_destroyed) {
        win();                             //display notification that the player wins
        score_board();                      //display score board
        clearInterval(winOrLoss);
      }
      if (player_ship_destroyed) {
        game_over();                       //display notification that the player loses
        score_board();                     //display score board
        clearInterval(winOrLoss);
      }
    })

    $('body').keydown(event => {
      if (!player_ship_destroyed) {            //if player's ship is not destroyed
        if (event.key === 'ArrowRight') {
          if (playerPosition.left < 730) $('.player').css('left', `${playerPosition.left += 20}px`)  //move the player's ship to the right
        }
        if (event.key === 'ArrowLeft') {
          if (playerPosition.left > 20) $('.player').css('left', `${playerPosition.left -= 20}px`)   //move the player's ship to the left
        }
        if (event.key === 'ArrowUp') {         //the up arrow key creates bullets
          let bullet = $('<div></div>');
          bullet.addClass('player-bullet');
          $('.game-screen').append(bullet);    //add the player's bullet to the gamescreen
          bullet.css('left', `${playerPosition.left + 19}px`);  //make the starting position of the bullet to be close to the player' ship
          bullet.css('top', `${playerPosition.top - 10}px`);
          let bulletTopPosition = playerPosition.top - 20;   //store the bullet's position
          let bulletLeftPosition = playerPosition.left + 10;
          let bulletMovement = setInterval(() => {
            if (bulletTopPosition === 0) {      //if the bullet gets to the top of the screen stop bullet animation
              clearInterval(bulletMovement);
              bullet.remove();
            }
            else if (firstShip.getTopPosition() === bulletTopPosition && bulletLeftPosition >= firstShip.getLeftPosition() && bulletLeftPosition <= firstShip.getLeftPosition() + 50) {    //if the player's bullet's position and the ai ship position are the same, it means the bullet hit the ai ship
              bullet.remove();
              firstShip.destroyShip();
              clearInterval(bulletMovement);   //stop bullet animation

            }
            else
              bullet.css('top', `${bulletTopPosition--}px`);  //move the bullet from the bottom to the top
          }, 5)
        }
      }
    })
  })

  function win() {
    clearInterval(timer);   //stop the timer
    setTimeout(() => {
      $('.win').css('opacity', '1');  //display win notification
      $('.title, .time, .timer, .game-screen, .help, .start_button').css('opacity', '.05');
      setTimeout(() => {
        $('.win').css('opacity', '0'); //remove win notification
      }, 4000);
    }, 1000);
  }
  function game_over() {
    clearInterval(timer);
    setTimeout(() => {
      $('.gameOver').css('opacity', '1');  //display game over notification
      $('.title, .time, .timer, .game-screen, .help, .start_button').css('opacity', '.05');
      setTimeout(() => {
        $('.gameOver').css('opacity', '0'); //remove game over notification
      }, 4000);
    }, 1000);
  }
  function score_board() {
    let score = $('.score h1');
    score.eq(0).text(`${score.eq(0).text()}  ${playerName.val()}`);
    score.eq(1).text(`${score.eq(1).text()}  ${number_of_ships_destroyed}`);
    score.eq(2).text(`${score.eq(2).text()}  ${time}`);
    setTimeout(() => {
      $('.scoreBoard').css('display', 'block'); //display score board
      $('.title, .time, .timer, .game-screen, .help, .start_button').css('opacity', '.6');
    }, 6500);
  }

});
