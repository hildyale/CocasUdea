function addAnimation(Sprite){
    Sprite.interactive = true;
    Sprite.buttonMode = true;
    Sprite.anchor.set(0.5);
    Sprite.x = Math.floor((Math.random() * width/2) + 1);
    Sprite.y = Math.floor((Math.random() * height) + 1);
    Sprite.cursor = "hover";
   
    const onDragStart = event => {
        Sprite.data = event.data;
        Sprite.dragging = true; 
    };
    
    const onDragEnd = event => {
        delete Sprite.data;
        Sprite.dragging = false; 
    };
    
    const onDragMove = event => {
        if(Sprite.dragging){
            const newPosition = Sprite.data.getLocalPosition(Sprite.parent);
            Sprite.x = newPosition.x;
            Sprite.y = newPosition.y;
        }
    };
    
    Sprite.on('pointerdown', onDragStart)
     .on('pointerup', onDragEnd)
     .on('pointerupoutside', onDragEnd)
     .on('pointermove', onDragMove)
}
