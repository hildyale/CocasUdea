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
        this.x = Math.floor((Math.random() * width/2) + 1);
        this.y = Math.floor((Math.random() * height) + 1);
        this.cursor = "hover";
        this.originalX = this.x;
        this.originalY = this.y;
    }


    addAnimation(){
        const onDragStart = event => {
            this.data = event.data;
            this.dragging = true; 
            this.alpha = 0.7;
        };
        
        const onDragEnd = event => {
            delete this.data;
            this.dragging = false; 
            this.x = this.originalX;
            this.y = this.originalY;
            this.alpha = 1;
            /*let distanciaX = Math.abs(this.x - this.originalX);
            let distanciaY = Math.abs(this.y - this.originalY);
            let distx = distanciaX/5;*/
        
            /*let timer = app.ticker.add(()=>{
                 if(this.x == this.originalX && this.y == this.originalY){
                    return;
                 }
                 if(!(this.x == this.originalX)){
                    if(this.x>this.originalX){
                        this.x -= distx;
                    }else{
                        this.x += distx;
                    }
                }
                if(!(this.y == this.originalY)){
                    if(this.y>this.originalY){
                        this.y -= 1;
                    }else{
                        this.y += 1;
                    }
                }
                console.log('x = '+this.x);
                console.log('y = '+this.y);
                console.log('originalX = '+this.originalX);
                console.log('originalY = '+this.originalY);
            });*/
        };
        
        const onDragMove = event => {
            if(this.dragging){
                //const newPosition = this.data.getLocalPosition(this.parent);
                //this.x = newPosition.x;
                //this.y = newPosition.y;
                this.position.x += event.data.originalEvent.movementX;
                this.position.y += event.data.originalEvent.movementY;
            }
        };
        
        this.on('pointerdown', onDragStart)
         .on('pointerup', onDragEnd)
         .on('pointerupoutside', onDragEnd)
         .on('pointermove', onDragMove)
    }

}