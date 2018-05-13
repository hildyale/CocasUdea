
const log = console.log;
const width = window.screen.availWidth;
//const height = window.screen.availHeight - (window.screen.availHeight*0.1);
const height = window.screen.availHeight - 95
const app = new PIXI.Application(width, height, {transparent : true}); //1099bb
PIXI.SCALE_MODES.NEAREST;
document.body.appendChild(app.view);
const scale = 0.8;
/*
let href = window.location.href; //window.location.href
let length = href.length;
let i = 0;
while(href.charAt(i)!=="?" && i<100){
    i++;
    console.log(i);
}
while(href.charAt(i)!=="=" && i<100){
    i++;
    console.log(i);
}
href = href.substring(i+1,href.length);
if(/^([0-9])*$/.test(href)){
  scale = parseFloat(href);
}else{
  scale = 0.8;
}
console.log(scale);
*/

let ticker = new PIXI.ticker.Ticker();
ticker.stop();
configTicker();
gameScene = new PIXI.Container();
app.stage.addChild(gameScene);
Inicio = new PIXI.Container();
app.stage.addChild(Inicio);
Instrucciones = new PIXI.Container();
app.stage.addChild(Instrucciones);
Acerca = new PIXI.Container();
app.stage.addChild(Acerca);
Inicio.visible = true;
gameScene.visible = false;
Instrucciones.visible = false;
Acerca.visible = false;

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
.add('acerca', 'src/images/button_acerca.png').add('acercaOver', 'src/images/button_acercaOver.png')
.add('inicio', 'src/images/button_inicio.png').add('inicioOver', 'src/images/button_inicioOver.png')
.add('instrucciones', 'src/images/button_instrucciones.png').add('instruccionesOver', 'src/images/button_instruccionesOver.png')
.add('titulo', 'src/images/titulo.png')
.add('restart', 'src/images/restartButton.png')
.add('back', 'src/images/backButton.png')
.add('instruccionesTitulo', 'src/images/instrucciones.png')
.add('acercaTitulo', 'src/images/acerca.png')
.add('logosimbolo', 'src/images/logosimbolo-vertical2.png')
.add('facultad', 'src/images/Facultad-de-Ingeniería.png')



let url = [];
for(let i=0;i<8;i++){
    let valor = Math.floor(Math.random()*380)+1;
    url[i] = ('src/images/all/1 ('+encodeURIComponent(valor)+').png');
}Acerca


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
    sprites.billboard.x = (width/2)-((sprites.billboard.width*scale)/2);
    sprites.billboard.y = height-(sprites.billboard.height*scale);
    sprites.billboard.scale.set(scale);
    gameScene.addChild(sprites.billboard);



    /************************************************************************************************************************************************************** */
    //Sprites
    /*sprites.alimentos = []
    for(let i=0;i<8;i++){
        let name = 'alimento'+i;
        sprites.alimentos[i] = new MySprite(gameScene,resources.name.texture); 
    }*/
    sprites.alimentos = [];
    sprites.alimentos[0] = new MySprite(gameScene,resources.alimento0.texture);
    sprites.alimentos[1] = new MySprite(gameScene,resources.alimento1.texture);
    sprites.alimentos[2] = new MySprite(gameScene,resources.alimento2.texture);
    sprites.alimentos[3] = new MySprite(gameScene,resources.alimento3.texture);
    sprites.alimentos[4] = new MySprite(gameScene,resources.alimento4.texture);
    sprites.alimentos[5] = new MySprite(gameScene,resources.alimento5.texture);
    sprites.alimentos[6] = new MySprite(gameScene,resources.alimento6.texture);
    sprites.alimentos[7] = new MySprite(gameScene,resources.alimento7.texture);

    /************************************************************************************************************************************************************** */
    //containers
    /*var noSaludable = new PIXI.Graphics();
    noSaludable.beginFill(0xcccccc);
    noSaludable.drawPolygon([0,0, 400,0, 400,150, 0,150]);
    noSaludable.endFill();*/
    sprites.noSaludable = new PIXI.Sprite(resources.trashCan.texture);
    sprites.noSaludable.x = (width/4)-((sprites.noSaludable.width*scale)/2);
    sprites.noSaludable.y = height-(sprites.noSaludable.height*scale);
    sprites.noSaludable.zIndex = 1;
    sprites.noSaludable.scale.set(scale);

      //log(960);
    //log(117);
    gameScene.addChild(sprites.noSaludable);

    sprites.saludable = new PIXI.Sprite(resources.can.texture);
    sprites.saludable.x = ((width/4)*3)-((sprites.saludable.width*scale)/2);
    sprites.saludable.y = height-(sprites.saludable.height*scale);
    sprites.saludable.zIndex = 1;
    sprites.saludable.scale.set(scale);
    
    gameScene.addChild(sprites.saludable);


    sprites.logo = new LogoUniversidad(Inicio,resources.logosimbolo.texture);
    sprites.logoInstrucciones =  new LogoUniversidad(Instrucciones,resources.logosimbolo.texture); 
    sprites.logoAcerca =  new LogoUniversidad(Acerca,resources.logosimbolo.texture);

    sprites.logo2 = new LogoFacultad(Inicio,resources.facultad.texture);
    sprites.logo2Instrucciones = new LogoFacultad(Instrucciones,resources.facultad.texture);
    sprites.logo2Acerca = new LogoFacultad(Acerca,resources.facultad.texture);

    sprites.titulo = new PIXI.Sprite(resources.titulo.texture);
    sprites.titulo.x = (width-sprites.titulo.width)/2;
    sprites.titulo.y = sprites.logo.height;
    Inicio.addChild(sprites.titulo);

    sprites.buttons = [];
    sprites.buttons[0] = new Button(Inicio,resources.inicio.texture,resources.inicioOver.texture);
    sprites.buttons[0].x = (width-sprites.buttons[0].width)/2;
    sprites.buttons[0].y = (sprites.titulo.y+sprites.titulo.height);

    sprites.buttons[1] = new Button(Inicio,resources.instrucciones.texture,resources.instruccionesOver.texture);
    sprites.buttons[1].x = (width-sprites.buttons[1].width)/2;
    sprites.buttons[1].y = (sprites.buttons[0].y+sprites.buttons[0].height+10);

    sprites.buttons[2] = new Button(Inicio,resources.acerca.texture,resources.acercaOver.texture);
    sprites.buttons[2].x = (width-sprites.buttons[2].width)/2;
    sprites.buttons[2].y = (sprites.buttons[1].y+sprites.buttons[1].height+10);

    sprites.buttons[0].on('pointerdown', event=>{
        ticker.start();
        Inicio.visible = false;
        gameScene.addChild(sprites.back);
        gameScene.visible = true;
        document.body.style.background = "#00cc5f";
    })

    sprites.buttons[1].on('pointerdown', event=>{
        Inicio.visible = false;
        Instrucciones.addChild(sprites.back);
        Instrucciones.visible = true;
    })

    sprites.buttons[2].on('pointerdown', event=>{
        Inicio.visible = false;
        Acerca.addChild(sprites.back);
        Acerca.visible = true;
    })

    sprites.back = new backButton(null,resources.back.texture);
    sprites.restart = new restartButton(null,resources.restart.texture);
    gameScene.addChild(sprites.restart);


    sprites.instruccionesTitulo = new PIXI.Sprite(resources.instruccionesTitulo.texture);
    sprites.instruccionesTitulo.x = (width-sprites.instruccionesTitulo.width)/2;
    sprites.instruccionesTitulo.y = sprites.logo.height;
    Instrucciones.addChild(sprites.instruccionesTitulo);

    sprites.acercaTitulo = new PIXI.Sprite(resources.acercaTitulo.texture);
    sprites.acercaTitulo.x = (width-sprites.acercaTitulo.width)/2;
    sprites.acercaTitulo.y = sprites.logo.height;
    Acerca.addChild(sprites.acercaTitulo);

    

});

/***************************************************************************************************************************************************************** */
//ticker



loader.onComplete.add(() => {
    log('complete')
    
});


function configTicker(){
    let Activo = undefined;
    let cont = 0
    let i = 0
    let velocity = 1;
    ticker.add(()=>{
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
}
