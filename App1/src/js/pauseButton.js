class pauseButton extends PIXI.Sprite{

    constructor(parent=null,pauseUrl){
        super(pauseUrl);
        this.scale.set(1);
        this.interactive = true;
        this.buttonMode = true;
        if(parent){
            parent.addChild(this);
        }
        let x =(width-180);
        let y = 10;
        this.x = x;
        this.y = y;
        this.cursor = "hover";
        this.blendMode = PIXI.BLEND_MODES.NORMAL;
        this.zIndex = -2;
    }

}