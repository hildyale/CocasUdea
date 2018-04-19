
const log = console.log;
const width = window.screen.availWidth;
//const height = window.screen.availHeight - (window.screen.availHeight*0.1);
const height = window.screen.availHeight - 95
const app = new PIXI.Application(width, height, {backgroundColor : 0x1099bb}); //1099bb
PIXI.SCALE_MODES.NEAREST;
document.body.appendChild(app.view);


//Css style for icons
var defaultIcon = "url('./src/images/egg52.png'),auto";
var hoverIcon = "url('./src/images/egg52.png'),auto";

//Add custom cursor styles
app.renderer.plugins.interaction.cursorStyles.default = defaultIcon;
app.renderer.plugins.interaction.cursorStyles.hover = hoverIcon;

const sprites = {};
const loader = new PIXI.loaders.Loader();

loader.add('billboard', 'src/images/billboard1.png')
.add('billboardok', 'src/images/billboardok.png')
.add('billboardbad', 'src/images/billboardbad.png')
.add('billboardwin', 'src/images/billboardwin.png')
.add('can', 'src/images/can1.png')
.add('trashCan', 'src/images/trash-can1.png')

let url = [];
for(let i=0;i<8;i++){
    let valor = Math.floor(Math.random()*380)+1;
    url[i] = ('src/images/all/1 ('+encodeURIComponent(valor)+').png');
}


loader.add('alimento0',url[0]);
loader.add('alimento1',url[1]);
loader.add('alimento2',url[2]);
loader.add('alimento3',url[3]);
loader.add('alimento4',url[4]);
loader.add('alimento5',url[5]);
loader.add('alimento6',url[6]);
loader.add('alimento7',url[7]);

loader.load((loader,resources) => {
    log('onload')
    //billboard
    sprites.billboard = new PIXI.Sprite(resources.billboard.texture)
    sprites.billboard.x = (width/2)-150;
    sprites.billboard.y = height-230;
    app.stage.addChild(sprites.billboard);



    /************************************************************************************************************************************************************** */
    //Sprites
    /*sprites.alimentos = []
    for(let i=0;i<8;i++){
        let name = 'alimento'+i;
        sprites.alimentos[i] = new MySprite(app.stage,resources.name.texture); 
    }*/
    sprites.alimentos = [];
    sprites.alimentos[0] = new MySprite(app.stage,resources.alimento0.texture);
    sprites.alimentos[1] = new MySprite(app.stage,resources.alimento1.texture);
    sprites.alimentos[2] = new MySprite(app.stage,resources.alimento2.texture);
    sprites.alimentos[3] = new MySprite(app.stage,resources.alimento3.texture);
    sprites.alimentos[4] = new MySprite(app.stage,resources.alimento4.texture);
    sprites.alimentos[5] = new MySprite(app.stage,resources.alimento5.texture);
    sprites.alimentos[6] = new MySprite(app.stage,resources.alimento6.texture);
    sprites.alimentos[7] = new MySprite(app.stage,resources.alimento7.texture);

    /************************************************************************************************************************************************************** */
    //containers
    /*var noSaludable = new PIXI.Graphics();
    noSaludable.beginFill(0xcccccc);
    noSaludable.drawPolygon([0,0, 400,0, 400,150, 0,150]);
    noSaludable.endFill();*/
    sprites.noSaludable = new PIXI.Sprite(resources.trashCan.texture);
    sprites.noSaludable.x = (width/4)-109;
    sprites.noSaludable.y = height-250;
    sprites.noSaludable.zIndex = 1;
      //log(960);
    //log(117);
    app.stage.addChild(sprites.noSaludable);

    sprites.saludable = new PIXI.Sprite(resources.can.texture);
    sprites.saludable.x = ((width/4)*3)-112;
    sprites.saludable.y = height-250;
    sprites.saludable.zIndex = 1;
    //log(960);
    //log(117);
    app.stage.addChild(sprites.saludable);

    /*var saludable = new PIXI.Graphics();
    saludable.beginFill(0xFFBC80);
    saludable.drawPolygon([0,0, 400,0, 400,150, 0,150]);
    saludable.endFill();
    saludable.x = ((width/4)*3)-200;
    saludable.y = height-150;
    //log(960);
    //log(351);
    app.stage.addChild(saludable);*/
});

/***************************************************************************************************************************************************************** */
//ticker



loader.onComplete.add(() => {
    log('complete')
    var Activo = undefined;
    let cont = 0
    let i = 0
    let velocity = 1;
    app.ticker.add(()=>{
        if(i<8){
            cont += velocity
            Activo = sprites.alimentos[i];
            Activo.y += velocity;
            if(cont>=height+200){
                i += 1
                cont = 0
                velocity = 1;
                sprites.billboard.setTexture(loader.resources.billboardbad.texture);
                changeBillboard();
            }
            if(hit(Activo,sprites.saludable)){
                i += 1
                cont = 0
                velocity = 1;
                sprites.billboard.setTexture(loader.resources.billboardok.texture);
                Activo.alpha = 0;
                changeBillboard();
            }
            if(hit(Activo,sprites.noSaludable)){
                i += 1
                cont = 0
                velocity = 1;
                sprites.billboard.setTexture(loader.resources.billboardbad.texture);
                Activo.alpha = 0;
                changeBillboard();
            }
        }else{
            Activo = undefined;
            sprites.billboard.setTexture(loader.resources.billboardwin.texture);
        }
    });



    let leftArrow = keyboard(37); //left arrow
    let aKey = keyboard(65); //A key

    let downArrow = keyboard(40); //Dowb arrow
    let sKey = keyboard(83); //S key

    let dKey = keyboard(68); //D key
    let rightArrow = keyboard(39); //right arrow

    const derecha = () =>{
        if(Activo){
            if(Activo.y < height-250){
                Activo.x += 40;
            }
        }
    };


    const abajo = () =>{
        if(Activo){
            if(Activo.y < height-250){
                velocity = 10;
            }
        }
        log('abajo')
    };


    const izquierda = () =>{
        if(Activo){
            if(Activo.y < height-250){
                Activo.x -= 40;
            }
        }
    };

    dKey.press = derecha;
    rightArrow.press = derecha;
    aKey.press = izquierda;
    leftArrow.press = izquierda;
    sKey.press = abajo;
    downArrow.press = abajo;


});


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
      console.log('hit x')
    }

    
    if(containerMinY<spriteMinY && containerMaxY>spriteMaxY){
      hity = true;
      console.log('hit y')
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
        log('hit x')
    }

    if(containerMaxX>spriteMinX && containerMinX<spriteMinX){
        hitx = true;
        console.log('hit x')
    }

    if(containerMinY<spriteMaxY && containerMaxY>spriteMaxY){
      hity = true;
      console.log('hit y')
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