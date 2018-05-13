class LogoUniversidad extends PIXI.Sprite{

    constructor(parent=null,url){
        super(url);
        this.scale.set(0.8);
        if(parent){
            parent.addChild(this);
        }
        this.x = (width-this.width)/2;
        this.y = 20;
        this.cursor = "hover";
        this.blendMode = PIXI.BLEND_MODES.NORMAL;
        this.zIndex = -2;
    }

    

}