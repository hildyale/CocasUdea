class MySprite extends PIXI.Sprite{

    constructor(parent=null,url){
        super(PIXI.Texture.fromImage(url));
        this.scale.set(0.5);
        this.speed = 2;
        if(parent){
            parent.addChild(this);
        }
        this.interactive = true;
        this.buttonMode = true;
        this.anchor.set(0.5);
        let ancho = ((width/2)-100);
        let alto = (height-100);
        this.x = Math.floor(Math.random()*(ancho-100+1)+100);
        this.y = Math.floor(Math.random()*(alto-100+1)+100);
        this.cursor = "hover";
        this.originalX = this.x;
        this.originalY = this.y;
        this.blendMode = PIXI.BLEND_MODES.NORMAL;
        console.log(this.x+" : "+this.y);
    }


    addAnimation(){
        const onDragStart = event => {
            this.data = event.data;
            this.dragging = true; 
            this.alpha = 0.7;
            //console.log("x: "+this.x+" y: "+this.y);
        };
        
        const onDragEnd = event => {
            delete this.data;
            this.dragging = false; 
            this.alpha = 1;
            if (!((this.x > 960 && this.x < 1560)&&(this.y > 117 && this.y < 317))){
                console.log("x: "+this.x+" y: "+this.y);
                this.x = this.originalX;
                this.y = this.originalY;
            }else{
                log("epa");
            }

        };
        
        const onDragMove = event => {
            if(this.dragging){
               this.x += event.data.originalEvent.movementX;
               this.y += event.data.originalEvent.movementY;
            }
        };
        
        this.on('pointerdown', onDragStart)
         .on('pointerup', onDragEnd)
         .on('pointerupoutside', onDragEnd)
         .on('pointermove', onDragMove)

    }

}