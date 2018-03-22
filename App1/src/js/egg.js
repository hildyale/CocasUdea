class Egg extends PIXI.Sprite{
    constructor(parent=null){
        super(PIXI.Texture.fromImage('./src/images/egg6.png'));
        this.scale.set(0.5);
        this.speed = 2;
        if(parent){
            parent.addChild(this);
        }
    }
}


