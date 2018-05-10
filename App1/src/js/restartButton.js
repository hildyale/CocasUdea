class restartButton extends PIXI.Sprite{

    constructor(parent=null,url){
        super(url);
        this.scale.set(1);
        this.interactive = true;
        this.buttonMode = true;
        if(parent){
            parent.addChild(this);
        }
        let x =(width-120);
        let y = 10;
        this.x = x;
        this.y = y;
        this.cursor = "hover";
        this.blendMode = PIXI.BLEND_MODES.NORMAL;
        this.zIndex = -2;
        this.on('pointerdown', event=>{
            location.href = location.reload();
            location.assign(url)
            Inicio.visible = false;
            gameScene.visible = true;
        })
    }

    

}