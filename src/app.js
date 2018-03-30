$(document).ready(function () {
  $('.start_button').click(()=>{
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
        let aiShip = $('<div></div>');
        aiShip.addClass('ai');
        this.aiShip = aiShip;
        let bullet = $('<div></div>');
        bullet.addClass('bullet');
        this.bullet = bullet;
        this.damage_ship_can_take = 3;
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
        let moveRight;
        let moving_right = true;
        moveRight = setInterval(() => {
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
              $('.player').remove();
              player_ship_destroyed = true;
            }

            else {
              this.bullet.remove();
            }
          }, 2050);
        }, 20);
      }
      destroyShip() {
        this.damage_ship_can_take--;
        this.aiShip.addClass('damage');
        setTimeout(() => {
          this.aiShip.removeClass('damage');
        }, 100);
        if (this.damage_ship_can_take === 0) {
          this.aiShip.remove();
          this.bullet.remove();
        }
      }

    }
    let firstShip = new ai_ship(300, 2);
    firstShip.createShip();
    let first_ship_shoots = setInterval(() => {

      firstShip.createAmmo();
      firstShip.shoot();
    }, 2500);
    firstShip.move();


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
          bullet.css('left', `${playerPosition.left + 10}px`);
          bullet.css('top', `${playerPosition.top - 20}px`);
          let bulletTopPosition = playerPosition.top - 20;
          let bulletLeftPosition = playerPosition.left + 10;
          let bulletMovement = setInterval(() => {
            if (bulletTopPosition === 0) {
              clearInterval(bulletMovement);
              bullet.remove();
            }
            else if (firstShip.getTopPosition() === bulletTopPosition && bulletLeftPosition >= firstShip.getLeftPosition() && bulletLeftPosition <= firstShip.getLeftPosition() + 50) {
              firstShip.destroyShip();
              if (firstShip.damage_ship_can_take === 0) {
                clearInterval(first_ship_shoots);
              }
              clearInterval(bulletMovement);
              bullet.remove();
            }
            else
              bullet.css('top', `${bulletTopPosition--}px`);
          }, 5)
        }
      }
    })
  })
  

 
});
