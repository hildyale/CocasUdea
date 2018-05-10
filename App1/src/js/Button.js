class Button extends PIXI.Sprite{

    constructor(parent=null,textureButton,textureButtonOver){
        super(textureButton);
        this.scale.set(1);
        if(parent){
            parent.addChild(this);
        }
        this.interactive = true;
        this.buttonMode = true;
        //this.anchor.set(0.5);
        this.cursor = "hover";
        this.blendMode = PIXI.BLEND_MODES.NORMAL;
        this.zIndex = -2;
        
        const  onButtonUp = () => {
            this.isdown = false;
            if (this.isOver) {
                this.texture = textureButtonOver;
            }
            else {
                this.texture = textureButton;
            }
        }
        
        const onButtonOver = () => {
            this.isOver = true;
            if (this.isdown) {
                return;
            }
            this.texture = textureButtonOver;
        }
        
        const onButtonOut = () => {
            this.isOver = false;
            if (this.isdown) {
                return;
            }
            this.texture = textureButton;
        }

        this
        .on('pointerup', onButtonUp)
        .on('pointerupoutside', onButtonUp)
        .on('pointerover', onButtonOver)
        .on('pointerout', onButtonOut);   
        
        
    }

    

}