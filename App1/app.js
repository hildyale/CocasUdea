
const log = console.log;
let widthOriginal = document.documentElement.clientWidth;
const width = (widthOriginal>800) ? widthOriginal: 800;
//const width = window.screen.availWidth;
//const height = window.screen.availHeight-95;
let heightOriginal = document.documentElement.clientHeight-4;
const height = (heightOriginal>580) ? heightOriginal: 580;
const app = new PIXI.Application(width, height, {transparent : true}); //1099bb
PIXI.SCALE_MODES.NEAREST;
document.body.appendChild(app.view);
/************************************************************************************************************************************ */
//Variables de Inicio
const showLogo = (height>580) ? true: false;
const showLogos = (width>1000) ? true: false;
const Velocidad = 1.5;
const instruccionesText = "Este juego consiste en escoger si un alimento es saludable o no es saludable,  en la parte de abajo encontraras dos canecas, la de la izquierda para alimentos no saludables y la derecha para alimentos saludables. Con las flechas del teclado se deben mover los alimentos a la izquierda o derecha mientras va cayendo hacia alguna caneca, si el alimento esta bien clasificado saldrá un chulo en el cartel de la mitad o de lo contrario saldrá una equis y posteriormente saldra un consejo sobre este alimento. Al finalizar los alimentos se mostrará el puntaje. En la parte de arriba también aparecerán 3 botones que nos sirven para pausar el juego, reiniciarlo y salir a la pantalla de inicio respectivamente de izquierda a derecha."
let scale = 0.8;
let spritesScale = 0.2;
let Puntaje = 0;
let Pause = false;
if(!showLogos || !showLogo){
    scale = 0.5;
    spritesScale = 0.15;
}
let cantidadAlimentos = getParameterByName('cant');
if(!cantidadAlimentos){
    cantidadAlimentos = 10;
}
let iconos = undefined;
let Activo = undefined;
let Finish = false;
let ticker = new PIXI.ticker.Ticker();
ticker.stop();
configTicker();

/************************************************************************************************************************************* */
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
.add('pause', 'src/images/pause.png')
.add('play', 'src/images/play.png')
.add('instruccionesTitulo', 'src/images/instrucciones.png')
.add('acercaTitulo', 'src/images/acerca.png')
.add('logosimbolo', 'src/images/logosimbolo-vertical2.png')
.add('facultad', 'src/images/Facultad-de-Ingenieria.png')
.add('escuelaNutricion', 'src/images/Escuela-de-Nutricion-y-Dietetica.png')
.add('jsonIconos', 'src/utils/iconos.json')
.add('cc', 'src/images/cc.png')


loader.load((loader,resources) => {
    log('onload')
    iconos = resources.jsonIconos.data.alimentos;
    iconos = shuffle(iconos);
   

    //billboard
    sprites.billboard = new PIXI.Sprite(resources.billboard.texture)
    sprites.billboard.x = (width/2)-((sprites.billboard.width*scale)/2);
    sprites.billboard.y = height-(sprites.billboard.height*scale);
    sprites.billboard.scale.set(scale);
    gameScene.addChild(sprites.billboard);
    //message
     let style = new PIXI.TextStyle({
        fontFamily: "times new roman",
        fontSize: 38*scale,
        fill: "white",
        stroke : '#000000',
        strokeThickness : 4,
        align: "left",
        leading: 0,
        wordWrap: true,
        wordWrapWidth: 250*scale,
      });

    sprites.message = new PIXI.Text("",style);
    sprites.message.x = (width/2)-((250*scale)/2);
    sprites.message.y = sprites.billboard.y+20;
    gameScene.addChild(sprites.message);

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

    if(showLogo){
        /*sprites.logo = new LogoUniversidad(Inicio,resources.logosimbolo.texture);*/
        sprites.logoInstrucciones =  new LogoUniversidad(Instrucciones,resources.logosimbolo.texture); 
        sprites.logoAcerca =  new LogoUniversidad(Acerca,resources.logosimbolo.texture);
    }

    if(showLogos){
        sprites.logo2 = new LogoFacultad(Inicio,resources.facultad.texture);
        sprites.logo2Instrucciones = new LogoFacultad(Instrucciones,resources.facultad.texture);
        sprites.logo2Acerca = new LogoFacultad(Acerca,resources.facultad.texture);

        sprites.logo3 = new LogoEscuelaNutricion(Inicio,resources.escuelaNutricion.texture);
        sprites.logo3Instrucciones = new LogoEscuelaNutricion(Instrucciones,resources.escuelaNutricion.texture);
        sprites.logo3Acerca = new LogoEscuelaNutricion(Acerca,resources.escuelaNutricion.texture);
    }


    //Inicio Container

    let logoy =  (sprites.logo) ? sprites.logo.height: 0;
    let logoInstruccionesy =  (sprites.logoInstrucciones) ? sprites.logoInstrucciones.height: 0;
    let logoAcercay =  (sprites.logoAcerca) ? sprites.logoAcerca.height: 0;
    sprites.titulo = new PIXI.Sprite(resources.titulo.texture);
    sprites.titulo.x = (width-sprites.titulo.width)/2;
    sprites.titulo.y = logoy;
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
        if(!Pause){
            ticker.start();
        }
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
    sprites.pause = new pauseButton(null,resources.pause.texture);
    sprites.play = new pauseButton(null,resources.play.texture);
    sprites.play.visible = false;
    sprites.pause.on('pointerdown', event=>{
        ticker.stop();
        Pause = true;
        sprites.play.visible = true;
        sprites.play.zIndex = 1;
        sprites.pause.visible = false;
    })
    sprites.play.on('pointerdown', event=>{
        ticker.start();
        Pause = false;
        sprites.pause.visible = true;
        sprites.pause.zIndex = 1;
        sprites.play.visible = false;
    })
    gameScene.addChild(sprites.restart);
    gameScene.addChild(sprites.pause);
    gameScene.addChild(sprites.play);



    //Instrucciones Container

    sprites.instruccionesTitulo = new PIXI.Sprite(resources.instruccionesTitulo.texture);
    sprites.instruccionesTitulo.x = (width-sprites.instruccionesTitulo.width)/2;
    sprites.instruccionesTitulo.y = logoInstruccionesy;
    Instrucciones.addChild(sprites.instruccionesTitulo);

    let textStyle = new PIXI.TextStyle({
        fontFamily: "times new roman",
        fontSize: 38*scale,
        fill: "white",
        stroke : '#000000',
        strokeThickness : 4,
        align: "center",
        leading: 0,
        wordWrap: true,
        wordWrapWidth: 1000*scale,
        /*dropShadow: true,
        dropShadowAlpha: 1,
        dropShadowDistance: 2*/
      });

    
    sprites.instruccionesText = new PIXI.Text(instruccionesText,textStyle);
    sprites.instruccionesText.x = (width-sprites.instruccionesText.width)/2;
    sprites.instruccionesText.y = (sprites.instruccionesTitulo.y+sprites.instruccionesTitulo.height);
    Instrucciones.addChild(sprites.instruccionesText);

    //Acerca Container

    sprites.acercaTitulo = new PIXI.Sprite(resources.acercaTitulo.texture);
    sprites.acercaTitulo.x = (width-sprites.acercaTitulo.width)/2;
    sprites.acercaTitulo.y = logoAcercay;
    Acerca.addChild(sprites.acercaTitulo);


    let desarrolladoresTitulo = "Desarrolladores";
    let desarrolladores = "Alejandro Isaza Delgado Sebastian Giraldo Botero"
    let asesoresTitulo = "Asesores";
    let asesores = "Angela Franco Castro Diana Margot Lopez H."
    let agradecimientosTitulo = "Agradecimientos"
    let agradecimientos = "hola"
    let creditos = "Desarrollado para el curso Proyecto Integrador I del programa de Ingeniería de Sistemas."
    let version = "2018 version 1.0"
    let cc = "Licencia Creative Commons Atribución-NoComercial-CompartirIgual 4.0 Internacional."


    let tituloStyle = new PIXI.TextStyle({
        fontFamily: "times new roman",
        fontSize: 50*scale,
        fill: "#7AB700",
        stroke : '#000000',
        strokeThickness : 4,
        align: "right",
        leading: 0,
      });

    let textoStyle = new PIXI.TextStyle({
        fontFamily: "times new roman",
        fontSize: 38*scale,
        fill: "white",
        stroke : '#000000',
        strokeThickness : 4,
        align: "right",
        leading: 0,
        wordWrap: true,
        wordWrapWidth: 400*scale,
    });

    let textoStyle2 = new PIXI.TextStyle({
        fontFamily: "times new roman",
        fontSize: 38*scale,
        fill: "white",
        stroke : '#000000',
        strokeThickness : 4,
        align: "right",
        leading: 0,
        wordWrap: true,
        wordWrapWidth: 370*scale,
    });

    let textoStyle3 = new PIXI.TextStyle({
        fontFamily: "times new roman",
        fontSize: 38*scale,
        fill: "white",
        stroke : '#000000',
        strokeThickness : 4,
        align: "left",
        leading: 0,
        wordWrap: true,
        wordWrapWidth: 370*scale,
    });

    let textoStyle4 = new PIXI.TextStyle({
        fontFamily: "times new roman",
        fontSize: 28*scale,
        fill: "white",
        stroke : '#000000',
        strokeThickness : 4,
        align: "left",
        leading: 0,
        wordWrap: true,
        wordWrapWidth: 400*scale,
    });

    sprites.acercaTitulos = [];
    sprites.acercaTextos = [];
    espacioLineas = 20;

    sprites.acercaTitulos[0] = new PIXI.Text(desarrolladoresTitulo,tituloStyle);
    sprites.acercaTitulos[0].x = ((width/2)-sprites.acercaTitulos[0].width)-espacioLineas;
    sprites.acercaTitulos[0].y = (sprites.acercaTitulo.y+sprites.acercaTitulo.height);
    Acerca.addChild(sprites.acercaTitulos[0]);

    sprites.acercaTextos[0] = new PIXI.Text(desarrolladores,textoStyle);
    sprites.acercaTextos[0].x = ((width/2)-sprites.acercaTextos[0].width)-espacioLineas;
    sprites.acercaTextos[0].y = (sprites.acercaTitulos[0].y+sprites.acercaTitulos[0].height);
    Acerca.addChild(sprites.acercaTextos[0]);

    sprites.acercaTitulos[1] = new PIXI.Text(asesoresTitulo,tituloStyle);
    sprites.acercaTitulos[1].x = ((width/2)-sprites.acercaTitulos[1].width)-espacioLineas;
    sprites.acercaTitulos[1].y = (sprites.acercaTextos[0].y+sprites.acercaTextos[0].height);
    Acerca.addChild(sprites.acercaTitulos[1]);

    sprites.acercaTextos[1] = new PIXI.Text(asesores,textoStyle2);
    sprites.acercaTextos[1].x = ((width/2)-sprites.acercaTextos[1].width)-espacioLineas;
    sprites.acercaTextos[1].y = (sprites.acercaTitulos[1].y+sprites.acercaTitulos[1].height);
    Acerca.addChild(sprites.acercaTextos[1]);

    sprites.acercaTitulos[2] = new PIXI.Text(agradecimientosTitulo,tituloStyle);
    sprites.acercaTitulos[2].x = ((width/2)-sprites.acercaTitulos[2].width)-espacioLineas;
    sprites.acercaTitulos[2].y = (sprites.acercaTextos[1].y+sprites.acercaTextos[1].height);
    Acerca.addChild(sprites.acercaTitulos[2]);

    sprites.acercaTextos[2] = new PIXI.Text(agradecimientos,textoStyle2);
    sprites.acercaTextos[2].x = ((width/2)-sprites.acercaTextos[2].width)-espacioLineas;
    sprites.acercaTextos[2].y = (sprites.acercaTitulos[2].y+sprites.acercaTitulos[2].height);
    Acerca.addChild(sprites.acercaTextos[2]);

    sprites.acercaTextos[3] = new PIXI.Text(creditos,textoStyle3);
    sprites.acercaTextos[3].x = (width/2)+espacioLineas;
    sprites.acercaTextos[3].y = (sprites.acercaTitulo.y+sprites.acercaTitulo.height);
    Acerca.addChild(sprites.acercaTextos[3]);

    sprites.acercaTextos[4] = new PIXI.Text(version,textoStyle3);
    sprites.acercaTextos[4].x = (width/2)+espacioLineas;
    sprites.acercaTextos[4].y = (sprites.acercaTextos[3].y+sprites.acercaTextos[3].height+espacioLineas);
    Acerca.addChild(sprites.acercaTextos[4]);

    sprites.cc = new PIXI.Sprite(resources.cc.texture);
    sprites.cc.x = (width/2)+espacioLineas;
    sprites.cc.y = (sprites.acercaTextos[4].y+sprites.acercaTextos[4].height+espacioLineas);
    Acerca.addChild(sprites.cc);

    sprites.acercaTextos[5] = new PIXI.Text(cc,textoStyle4);
    sprites.acercaTextos[5].x = (width/2)+espacioLineas;
    sprites.acercaTextos[5].y = (sprites.cc.y+sprites.cc.height);
    Acerca.addChild(sprites.acercaTextos[5]);

});

/***************************************************************************************************************************************************************** */
//ticker



loader.onComplete.add(() => {
    log('complete')
    
});


function configTicker(){
    let cont = 0
    let i = 0
    let velocity = Velocidad;
    let actualI = -1;
    ticker.add(()=>{
        if(i<cantidadAlimentos){
            cont += velocity
            Activo = sprites.alimentos[i];
            Activo.y += velocity;
            if(i!=actualI){
                changeName();
                actualI = i;
            }
            if(cont>=height+200){
                i += 1
                cont = 0
                velocity = Velocidad;
                sprites.billboard.setTexture(loader.resources.billboardbad.texture);
                changeBillboard();
            }
            
            if(hit(Activo,sprites.saludable)){
                i += 1
                cont = 0
                velocity = Velocidad;
                Activo.alpha = 0;
                if(Activo.type === "saludable"){
                    Puntaje++;
                    sprites.billboard.setTexture(loader.resources.billboardok.texture);
                    changeBillboard();
                    changeTip(true);
                }else{
                    sprites.billboard.setTexture(loader.resources.billboardbad.texture);
                    changeBillboard();
                    changeTip(false);
                }
            }
        
            if(hit(Activo,sprites.noSaludable)){
                i += 1
                cont = 0
                velocity = Velocidad;
                Activo.alpha = 0;
                if(Activo.type === "noSaludable"){
                    Puntaje++;
                    sprites.billboard.setTexture(loader.resources.billboardok.texture);
                    changeBillboard();
                    changeTip(true);
                }else{
                    sprites.billboard.setTexture(loader.resources.billboardbad.texture);
                    changeBillboard();
                    changeTip(false);
                }
            }
            
        }else{
            if(!Finish) {
                Puntaje = parseInt((Puntaje/cantidadAlimentos)*100,10);
                changeFinish();
                Finish = true;
            }
        }
    });
    

    let leftArrow = keyboard(37); //left arrow
    let aKey = keyboard(65); //A key

    let downArrow = keyboard(40); //Dowb arrow
    let sKey = keyboard(83); //S key

    let dKey = keyboard(68); //D key
    let rightArrow = keyboard(39); //right arrow

    const derecha = () =>{
        if(Activo && !Pause){
            if(Activo.y < height-(sprites.saludable.height*scale)){
                Activo.x += 40;
            }
        }
    };


    const abajo = () =>{
        if(Activo && !Pause){
            if(Activo.y < height-(sprites.saludable.height*scale)){
                velocity = 10;
            }
        }
    };


    const izquierda = () =>{
        if(Activo && !Pause){
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
