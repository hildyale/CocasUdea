class backButton extends PIXI.Sprite{

    constructor(parent=null,url){
        super(url);
        this.scale.set(1);
        this.interactive = true;
        this.buttonMode = true;
        if(parent){
            parent.addChild(this);
        }
        let x =(width-60);
        let y = 10;
        this.x = x;
        this.y = y;
        this.cursor = "hover";
        this.blendMode = PIXI.BLEND_MODES.NORMAL;
        this.zIndex = -2;
        this.on('pointerdown', event=>{
            Inicio.visible = true;
            gameScene.visible = false;
            Instrucciones.visible = false;
            Acerca.visible = false;
            ticker.destroy();
            console.log('back')
        })
    }

    

}