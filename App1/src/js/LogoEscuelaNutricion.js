class LogoEscuelaNutricion extends PIXI.Sprite{

    constructor(parent=null,url){
        super(url);
        this.scale.set(0.5);
        if(parent){
            parent.addChild(this);
        }
        this.x = 10;
        this.y = height-this.height-10;
        this.cursor = "hover";
        this.blendMode = PIXI.BLEND_MODES.NORMAL;
        this.zIndex = -2;
    }
  

}