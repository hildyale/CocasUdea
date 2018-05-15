class MySprite extends PIXI.Sprite.fromImage{

    constructor(parent=null,url,name,type,tip){
        super(url);
        this.scale.set(0.2);
        this.speed = 2;
        if(parent){
            parent.addChild(this);
        }
        //this.anchor.set(0.5);
        let ancho =(width/2);
        let alto = -150;
        this.x = ancho;
        this.y = alto;
        this.cursor = "hover";
        this.originalX = this.x;
        this.originalY = this.y;
        this.blendMode = PIXI.BLEND_MODES.NORMAL;
        this.zIndex = -2;
        this.name = name;
        this.type = type;
        this.tip = tip;
    }

    

}