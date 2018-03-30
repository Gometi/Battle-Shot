$(document).ready(function() {
  let playerPosition = $('.player').offset();

  
 
  
  let getAiPosition = (position) =>{
    return $('.ai').offset();
  }
  let getBulletPosition = (position) =>{
    return $('.bullet').css(position);
  }
  let setBulletPosition = (className, position, positionValue) =>{
    $(`.${className}`).css(position, positionValue);
  }
  let setAiPosition = (position, positionValue) =>{
    $('.ai').css(position, positionValue);
  }

class ai_ship{
  constructor(leftPosition, topPosition){
    this.leftPosition = leftPosition;
    this.topPosition = topPosition;
    let aiShip = $('<div></div>');
    aiShip.addClass('ai');
    this.aiShip = aiShip;
    let bullet = $('<div></div>');
    bullet.addClass('bullet');
    this.bullet = bullet;
  }
  getTopPosition(){
    return this.topPosition;
  }
  createShip(){
    $('.game-screen').append(this.aiShip);
    setAiPosition('left', `${this.leftPosition}px`);
    setAiPosition('top', `${this.topPosition}px`);
  }
  createAmmo(){
    $('.game-screen').append(this.bullet);
    setBulletPosition('bullet', 'left', `${this.leftPosition + 20}px`);
    setBulletPosition('bullet', 'top', `${this.topPosition + 50}px`)
  }
  shoot(){
    setTimeout(() => {
      this.bullet.css('top', `${playerPosition.top}px`)
      this.bullet.css('left', `${playerPosition.left}px`)
    setTimeout(() => {
      if (getBulletPosition('top') >= `${playerPosition.top}px` && getBulletPosition('top') <= `${playerPosition.top + 50}px` && getBulletPosition('left') >= `${playerPosition.left}px` && getBulletPosition('left') <= `${playerPosition.left + 50}px`){
        this.bullet.remove();
        $('.player').remove();
      }

      else {
        // $('.bullet').css('top', `${600}px`)
        // $('.bullet').css('transition', '1s linear')
        this.bullet.remove();
      }
    }, 3050);
  }, 20);
  }
  destroyShip(){
   this.aiShip.remove();
  }
  
}
 let firstShip = new ai_ship(300,10);
  firstShip.createShip();
  let first_ship_shoots = setInterval(()=>{
    firstShip.createAmmo();
    firstShip.shoot();
  },4000);
  


  $('body').keydown(event => {
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
      let bulletPosition = playerPosition.top - 20;
      let bulletMovement = setInterval(() => {
        if (bulletPosition === 0) {
          clearInterval(bulletMovement);
          bullet.remove();
        }
        else if(firstShip.getTopPosition() === bulletPosition) {
          firstShip.destroyShip();
          clearInterval(first_ship_shoots);
          clearInterval(bulletMovement);
          bullet.remove();
        }
        else
          bullet.css('top', `${bulletPosition--}px`);
      }, 5)
    }

  })

  // let bullet = $('<div></div>').addClass('bullet');
  // $('.gameScreen').append(bullet);
  // setAiPosition('left', '369px');
  // setBulletPosition('left', `${getAiPosition('left').left + 10}px`)
  // setTimeout(() => {
  //   $('.bullet').css('top', `${playerPosition.top}px`)
  //   $('.bullet').css('left', `${playerPosition.left}px`)
  //   setTimeout(() => {
  //     if (getBulletPosition('top') >= `${playerPosition.top}px` && getBulletPosition('top') <= `${playerPosition.top + 50}px` && getBulletPosition('left') >= `${playerPosition.left}px` && getBulletPosition('left') <= `${playerPosition.left + 50}px`){
  //       $('.bullet').remove();
  //     }
       
  //     else {
  //       $('.bullet').css('top', `${500}px`)
  //       $('.bullet').css('transition', '1s linear')
  //     }
  //   }, 3050);
  // }, 1000);
  
  
  
  
  
  
  
  
  
  //  let moveBullet = setInterval(() =>{
  //    if (getBulletPosition.top > playerPosition.top && getBulletPosition.top < playerPosition.top + 50 && getBulletPosition.left > playerPosition.left && getBulletPosition.left < playerPosition.left +50 ){
  //      clearInterval(moveBullet);
  //      $('.bullet').remove();
  //    } 
  //    if (getBulletPosition.top > 500) $('.bullet').remove();
  //     $('.bullet').css('top', `${getBulletPosition.top++}px`)
      
  //   },5)
});
