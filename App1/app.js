
const log = console.log;
const width = document.documentElement.clientWidth;
//const width = window.screen.availWidth;
//const height = window.screen.availHeight-95;
const height = document.documentElement.clientHeight-4;
const app = new PIXI.Application(width, height, {transparent : true}); //1099bb
PIXI.SCALE_MODES.NEAREST;
document.body.appendChild(app.view);
const scale = 0.8;
let cantidadAlimentos = getParameterByName('cant');
if(!cantidadAlimentos){
    cantidadAlimentos = 10;
}
let iconos = undefined;
let Activo = undefined;
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
.add('jsonIconos', 'src/utils/iconos.json')


loader.load((loader,resources) => {
    log('onload')
    iconos = resources.jsonIconos.data.alimentos;
    iconos = shuffle(iconos);
    //message
    let style = new PIXI.TextStyle({
        fontFamily: "times new roman",
        fontSize: 30,
        fill: "white",
      });

    sprites.message = new PIXI.Text("",style);
    sprites.message.position.set(10,height/2);
    sprites.message.width; // 2 times to wide.
    sprites.message.resolution = 1;
    sprites.message.updateText();
    sprites.message.width; // Correct width.
    gameScene.addChild(sprites.message);

    //billboard
    sprites.billboard = new PIXI.Sprite(resources.billboard.texture)
    sprites.billboard.x = (width/2)-((sprites.billboard.width*scale)/2);
    sprites.billboard.y = height-(sprites.billboard.height*scale);
    sprites.billboard.scale.set(scale);
    gameScene.addChild(sprites.billboard);


    /************************************************************************************************************************************************************** */
    //Sprites

    sprites.alimentos = [];
    if(cantidadAlimentos>iconos.length){
      cantidadAlimentos = iconos.length;
    }
    for(i=0;i<cantidadAlimentos;i++){
        sprites.alimentos[i] = new MySprite(gameScene,iconos[i].src,iconos[i].nombre,iconos[i].tipo,iconos[i].consejo);
    }
    
    /************************************************************************************************************************************************************** */
    //containers

    sprites.noSaludable = new PIXI.Sprite(resources.trashCan.texture);
    sprites.noSaludable.x = (width/4)-((sprites.noSaludable.width*scale)/2);
    sprites.noSaludable.y = height-(sprites.noSaludable.height*scale);
    sprites.noSaludable.zIndex = 1;
    sprites.noSaludable.scale.set(scale);

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
    let cont = 0
    let i = 0
    let velocity = 1;
    ticker.add(()=>{
        if(i<cantidadAlimentos){
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
                Activo.alpha = 0;
                if(Activo.type === "bueno"){
                    sprites.billboard.setTexture(loader.resources.billboardok.texture);
                    changeBillboard();
                }else{
                    sprites.billboard.setTexture(loader.resources.billboardbad.texture);
                    changeBillboard();
                }
                changeTip();
            }
        
            if(hit(Activo,sprites.noSaludable)){
                i += 1
                cont = 0
                velocity = 1;
                Activo.alpha = 0;
                if(Activo.type === "malo"){
                    sprites.billboard.setTexture(loader.resources.billboardok.texture);
                    changeBillboard();
                }else{
                    sprites.billboard.setTexture(loader.resources.billboardbad.texture);
                    changeBillboard();
                }
                changeTip();
            }
            
        }else{
            changeFinish();
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
            if(Activo.y < height-(sprites.saludable.height*scale)){
                Activo.x += 40;
            }
        }
    };


    const abajo = () =>{
        if(Activo){
            if(Activo.y < height-(sprites.saludable.height*scale)){
                velocity = 10;
            }
        }
    };


    const izquierda = () =>{
        if(Activo){
            if(Activo.y < height-(sprites.saludable.height*scale)){
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
