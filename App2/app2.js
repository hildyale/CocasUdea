
const log = console.log;
const width = window.screen.availWidth - (window.screen.availWidth*0.1);
const height = window.screen.availHeight - (window.screen.availHeight*0.1);
const app = new PIXI.Application(width, height, {backgroundColor : 0x1099bb});
PIXI.SCALE_MODES.NEAREST;
document.body.appendChild(app.view);

//boton Start
const start = PIXI.Sprite.fromImage('src/images/start.png');
start.interactive = true;
start.buttonMode = true;
start.anchor.set(0.5);
start.x = width/2;
start.y = height/2;
start.scale.set(0.1);
start.cursor = "hover";
start.on('pointerdown',crearPunto);

app.stage.addChild(start);

const egg = new Egg(app.stage);

//Css style for icons
var defaultIcon = "url('./src/images/egg52.png'),auto";
var hoverIcon = "url('./src/images/egg52.png'),auto";

//Add custom cursor styles
app.renderer.plugins.interaction.cursorStyles.default = defaultIcon;
app.renderer.plugins.interaction.cursorStyles.hover = hoverIcon;

const urls = ['button.png','icon.png','icon.png'];
const buttons = []
urls.map((url,i)=>{
    buttons[i] = new MySprite(app.stage,'src/images/'+url); 
    buttons[i].addAnimation();
    buttons[i].on('pointerdown',()=>{
        log('hola');
    })
});


function crearPunto(){
    log('start');
    let dot = new PIXI.Graphics();
    dot.beginFill("#ffffff");
    dot.drawCircle(0,0,20);
    dot.x = width/2;
    dot.y = height/2;
    app.stage.addChild(dot);
    let xVelocity = 1;
    let yVelocity = 1;
    let radius = 20;
    let timer = app.ticker.add(()=>{
         if (radius>=1500 && radius <= 1600){
            log(radius);
            app.stage.removeChild(dot);
            app.stage.removeChild(start);
            radius += 40;
            return;
         }
         if (radius>=1700){
            timer.destroy();
            return;
         }
         dot.x += xVelocity;
         dot.y += yVelocity;
         radius += 40;
         dot.drawCircle(0,0,radius);
         log(radius);
     });
 }

