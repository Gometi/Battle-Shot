$(document).ready(function() {
  let playerPosition = $('.player').offset();

  $('body').keydown(event => {
    if (event.key === 'ArrowRight') {
      if (playerPosition.left < 730) $('.player').css('left', `${playerPosition.left += 20}px`)
    }
    if (event.key === 'ArrowLeft') {
      if (playerPosition.left > 20) $('.player').css('left', `${playerPosition.left -= 20}px`)
    }
    if (event.key === 'ArrowUp') {
      if (playerPosition.top > 20) $('.player').css('top', `${playerPosition.top -= 20}px`)
    }
    if (event.key === 'ArrowDown') {
      if (playerPosition.top < 430) $('.player').css('top', `${playerPosition.top += 20}px`)
    }
  })
 
  let bullet = $('<div></div>').addClass('bullet');
  $('.gameScreen').append(bullet);
  let bulletPosition = $('.bullet').offset();
  // $('.bullet').css('left', `${bulletPosition.left + 400}px`)
   let moveBullet = setInterval(() =>{
     if (bulletPosition.top > playerPosition.top && bulletPosition.top < playerPosition.top + 50 && bulletPosition.left > playerPosition.left && bulletPosition.left < playerPosition.left +50 ){
       clearInterval(moveBullet);
       $('.bullet').remove();
     } 
     if (bulletPosition.top > 500) $('.bullet').remove();
      $('.bullet').css('top', `${bulletPosition.top++}px`)
      
    },5)
});
