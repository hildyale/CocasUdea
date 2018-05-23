
//https://joedicastro.com/algoritmos-shuffle.html
//http://www.programming-algorithms.net/article/43676/Fisher-Yates-shuffle
//The de-facto unbiased shuffle algorithm is the Fisher-Yates (aka Knuth) Shuffle
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//get url param

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/******************************************************************************************************************************************************************** */
//keyboard
function keyboard(keyCode) {
    let key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = event => {
      if (event.keyCode === key.code) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;
      }
      event.preventDefault();
    };
  
    //The `upHandler`
    key.upHandler = event => {
      if (event.keyCode === key.code) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
      }
      event.preventDefault();
    };
  
    //Attach event listeners
    window.addEventListener(
      "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
      "keyup", key.upHandler.bind(key), false
    );
    return key;
  }



  /**************************************************************************************************************************************************************** */
  //funcion detectar colision sprites
  function fullHit(sprite,container) {
    let hit = false;
    let hitx = false;
    let hity = false;
    let containerMinX = container.x;
    let containerMaxX = container.x + container.width; 
    let spriteMinX = sprite.x
    let spriteMaxX = sprite.x + sprite.width;
    let containerMinY = container.y;
    let containerMaxY = container.y + container.height; 
    let spriteMinY = sprite.y
    let spriteMaxY = sprite.y + sprite.height;

    if(containerMinX<spriteMinX && containerMaxX>spriteMaxX){
      hitx = true;
      
    }

    
    if(containerMinY<spriteMinY && containerMaxY>spriteMaxY){
      hity = true;
   
    }

    if(hitx&&hity){
      hit = true
    }

  
    return hit;
  };



  function hit(sprite,container) {
    let hit = false;
    let hitx = false;
    let hity = false;

    let containerMinX = container.x;
    let containerMaxX = container.x + container.width; 
    let spriteMinX = sprite.x
    let spriteMaxX = sprite.x + sprite.width;
    let containerMinY = container.y;
    let containerMaxY = container.y + container.height; 
    let spriteMinY = sprite.y
    let spriteMaxY = sprite.y + sprite.height;


    if(containerMinX<spriteMaxX && containerMaxX>spriteMaxX){
        hitx = true;
       
    }

    if(containerMaxX>spriteMinX && containerMinX<spriteMinX){
        hitx = true;
        
    }

    if(containerMinY<spriteMaxY && containerMaxY>spriteMaxY){
      hity = true;
   
    }

    if(hitx&&hity){
      hit = true
    }

  
    return hit;
  };


/**************************************************************************************************************************************************** */
//slepp function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async function changeBillboard() {
    //console.log('Taking a break...');
    await sleep(1000);
    sprites.billboard.setTexture(loader.resources.billboard.texture);
    //console.log('Two second later');
  }  

  async function changeFinish() {
    await sleep(2000);
    Activo = undefined;
    //sprites.billboard.setTexture(loader.resources.billboardwin.texture);
    if(Puntaje>=50){
      swal({
        title: "Buen Trabajo!",
        text: "Obtuviste un puntaje de: "+Puntaje+"%",
        icon: "success",
        button: "Reiniciar",
        closeOnClickOutside: false,
        closeOnEsc: false,
      }).then(() => {
        location.reload();
      });
    }else{
      swal({
        title: "Debes Mejorar!",
        text: "Obtuviste un puntaje de: "+Puntaje+"%",
        icon: "warning",
        button: "Reiniciar",
        closeOnClickOutside: false,
        closeOnEsc: false,
      }).then(() => {
        location.reload();
      });
    }
    //location.reload();
    ticker.stop();
  }  

  async function changeTip() {
    sprites.message.text = Activo.tip; 
    await sleep(2000);
    sprites.message.text = ""; 
  }

/*
  async function changeBillboard() {
    //console.log('Taking a break...');
    await sleep(1000);
    function animate() {
      if (sprites.billboard.alpha <= 1) {
        sprites.billboard2.alpha -= .01;
        sprites.billboard.alpha += .01;
      }
      log(sprites.billboard.alpha);
      requestAnimationFrame(animate);
    }
    //console.log('Two second later');
  } */