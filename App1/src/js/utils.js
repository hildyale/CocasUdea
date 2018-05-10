
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
      //event.preventDefault();
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
    console.log('Taking a break...');
    await sleep(1000);
    sprites.billboard.setTexture(loader.resources.billboard.texture);
    console.log('Two second later');
  }  