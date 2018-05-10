
const log = console.log;
const width = window.screen.availWidth;
const height = window.screen.availHeight - (window.screen.availHeight*0.1);
const app = new PIXI.Application(width, height, {backgroundColor : 0x1099bb});
PIXI.SCALE_MODES.NEAREST;
document.body.appendChild(app.view);


//boton Start
/*const start = PIXI.Sprite.fromImage('src/images/start.png');
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
*/

//containers
let dot = new PIXI.Graphics();
    dot.beginFill(0xcccccc);
    dot.drawPolygon([0,0, 600,0, 600,200, 0,200]);
    dot.endFill();
    dot.x = width/2;
    dot.y = height/8;
    //log(960);
    //log(117);
    app.stage.addChild(dot);

    let drop = new PIXI.Graphics();
    drop.beginFill(0xFFBC80);
    drop.drawPolygon([0,0, 600,0, 600,200, 0,200]);
    drop.endFill();
    drop.x = width/2;
    drop.y = (height/8)*3;
    //log(960);
    //log(351);
    app.stage.addChild(drop);


//Css style for icons
var defaultIcon = "url('./src/images/egg52.png'),auto";
var hoverIcon = "url('./src/images/egg52.png'),auto";

//Add custom cursor styles
app.renderer.plugins.interaction.cursorStyles.default = defaultIcon;
app.renderer.plugins.interaction.cursorStyles.hover = hoverIcon;

/*const urls = ['button.png','icon.png','icon.png'];
const buttons = []
urls.map((url,i)=>{
    buttons[i] = new MySprite(app.stage,'src/images/'+url); 
    buttons[i].addAnimation();
    
});*/
const sprites = []
for(let i=0;i<8;i++){
    let valor = Math.floor(Math.random()*380)+1;
    let url  = ('src/images/all/1 ('+encodeURIComponent(valor)+').png')
    sprites[i] = new MySprite(app.stage,url); 
    sprites[i].addAnimation();
}

/*function crearPunto(){
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
}*/

