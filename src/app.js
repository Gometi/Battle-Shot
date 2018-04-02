$(document).ready(function () {
  let playerName = $('.playerName');
  let number_of_ships_destroyed = 0;
  let seconds = 0;
  let minutes = 0;
  let time;
  let timer;
  let ship1;
  let ship2;
  $('.begin').click(() => {
    if (!playerName.val()) alert('Enter Your Name to Begin!')
    else $('.welcomePage').css('display', 'none');
  })
  $('.start_button').click(() => {
    timer = setInterval(() => {
      seconds++;
      if (seconds > 59) {
        seconds = 0;
        minutes++;
      }
      if (minutes > 59) {
        minutes = 0;
      }
      time = `${minutes} minutes ${seconds} seconds`;
      $('.timer').text(time);
    }, 1000);

    let playerPosition = $('.player').offset();
    let player_ship_destroyed = false;


    let getAiPosition = (position) => {
      return $('.ai').offset();
    }
    let getBulletPosition = (position) => {
      return $('.bullet').css(position);
    }
    let setBulletPosition = (className, position, positionValue) => {
      $(`.${className}`).css(position, positionValue);
    }
    let setAiPosition = (position, positionValue) => {
      $('.ai').css(position, positionValue);
    }

    class ai_ship {
      constructor(leftPosition, topPosition) {
        this.leftPosition = leftPosition;
        this.topPosition = topPosition;
        let aiShip = $("<div></div>");
        
        aiShip.addClass('ai');
        this.aiShip = aiShip;
        let bullet = $('<div></div>');
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
        $('.game-screen').append(this.aiShip);
        setAiPosition('left', `${this.leftPosition}px`);
        setAiPosition('top', `${this.topPosition}px`);
      }
      createAmmo() {
        $('.game-screen').append(this.bullet);
        setBulletPosition('bullet', 'left', `${this.leftPosition + 20}px`);
        setBulletPosition('bullet', 'top', `${this.topPosition + 50}px`)
      }
      move() {
        let moving_right = true;
        let moving_down = true;
        this.moving_top_down = setInterval(()=>{
          if(moving_down){
            setAiPosition('top', `${this.topPosition++}px`);
            if (this.topPosition === 200) moving_down = false;
          }
          else{
            setAiPosition('top', `${this.topPosition--}px`);
            if (this.topPosition === 0) moving_down = true;
          }
          
        }, 50);
        this.moving_right_left = setInterval(() => {
          if (moving_right) {
            setAiPosition('left', `${this.leftPosition++}px`);
            if (this.leftPosition === 750) moving_right = false;
          }
          else {
            setAiPosition('left', `${this.leftPosition--}px`);
            if (this.leftPosition === 0) moving_right = true;
          }

        }, 5);

      }
      shoot() {
        setTimeout(() => {
          this.bullet.css('top', `${playerPosition.top}px`)
          this.bullet.css('left', `${playerPosition.left}px`)
          setTimeout(() => {
            if (getBulletPosition('top') >= `${playerPosition.top}px` && getBulletPosition('top') <= `${playerPosition.top + 50}px` && getBulletPosition('left') >= `${playerPosition.left}px` && getBulletPosition('left') <= `${playerPosition.left + 50}px`) {
              this.bullet.remove();
              $('.player').addClass('explosion');
              setTimeout(() => {
                $('.player').remove();
              }, 2000);
              
              player_ship_destroyed = true;
            }

            else {
              this.bullet.remove();
            }
          }, 2050);
        }, 20);
      }
      executeInstructions() {
        this.executing = setInterval(() => {
          this.createAmmo();
          this.shoot();
        }, 2500);
        this.move();
      }

      destroyShip() {
        this.damage_ship_can_take--;
        if(!this.is_ship_destroyed){
          this.aiShip.addClass('damage');
          setTimeout(() => {
            this.aiShip.removeClass('damage');
          }, 100);
        }
        
        if (this.damage_ship_can_take === 0) {
          this.aiShip.removeClass('ai');
          this.aiShip.addClass('ai_explosion');
          // this.aiShip.css('background-image', "url('explosion.gif')");
          clearInterval(this.moving_top_down);
          clearInterval(this.moving_right_left);
          clearInterval(this.executing);
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
    ship1 = firstShip.executing;
    
    
    let winOrLoss = setInterval(() => {
      if (firstShip.is_ship_destroyed) {
         win();
        score_board();
        clearInterval(winOrLoss);
      }
      if (player_ship_destroyed) {
        game_over();
        score_board();
        clearInterval(winOrLoss);
      }
    })

    $('body').keydown(event => {
      if (!player_ship_destroyed) {
        if (event.key === 'ArrowRight') {
          if (playerPosition.left < 730) $('.player').css('left', `${playerPosition.left += 20}px`)
        }
        if (event.key === 'ArrowLeft') {
          if (playerPosition.left > 20) $('.player').css('left', `${playerPosition.left -= 20}px`)
        }
        if (event.key === 'ArrowUp') {
          let bullet = $('<div></div>');
          bullet.addClass('player-bullet');
          $('.game-screen').append(bullet);
          bullet.css('left', `${playerPosition.left + 19}px`);
          bullet.css('top', `${playerPosition.top - 20}px`);
          let bulletTopPosition = playerPosition.top - 20;
          let bulletLeftPosition = playerPosition.left + 10;
          let bulletMovement = setInterval(() => {
            if (bulletTopPosition === 0) {
              clearInterval(bulletMovement);
              bullet.remove();
            }
            else if (firstShip.getTopPosition() === bulletTopPosition && bulletLeftPosition >= firstShip.getLeftPosition() && bulletLeftPosition <= firstShip.getLeftPosition() + 50) {
              bullet.remove();
              firstShip.destroyShip();
              clearInterval(bulletMovement);
              
            }
            else
              bullet.css('top', `${bulletTopPosition--}px`);
          }, 5)
        }
      }
    })
  })

  function win() {
    clearInterval(timer);
    clearInterval(ship1);
    $('.win').css('opacity', '1');
    setTimeout(() => {
      $('.win').css('opacity', '0');
    }, 4000);
  }
  function game_over() {
    clearInterval(timer);
    clearInterval(ship1);
    $('.gameOver').css('opacity', '1');
    setTimeout(() => {
      $('.gameOver').css('opacity', '0');
    }, 4000);
  }
  function score_board() {
    let score = $('.score h1');
    score.eq(0).text(`${score.eq(0).text()}  ${playerName.val()}`);
    score.eq(1).text(`${score.eq(1).text()}  ${number_of_ships_destroyed}`);
    score.eq(2).text(`${score.eq(2).text()}  ${time}`);
    setTimeout(() => {
      $('.scoreBoard').css('display', 'block');
    }, 6500);
  }

});
