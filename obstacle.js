Obstacle = function(x, y, imageIndex)
{
    this.x = x;
    this.y = y;

    this.radius = 75;

    this.imageObject = new createjs.Container();

    this.sprite = new createjs.Sprite(spriteSheet, "rock"+imageIndex);
    this.sprite.x = -127;   // half size of sprite so center is in the middle, still preloader not implemented 
    this.sprite.y = -127;   // (not sure if it ever will be)
    this.sprite.shadow = new createjs.Shadow("#000000", 0, 0, 25);

    this.collisionArea = new createjs.Shape();
    this.collisionArea.x = 0;
    this.collisionArea.y = 0;
    this.collisionArea.radius = this.radius;
    //this.collisionArea.graphics.beginStroke("blue").drawCircle(0,0,this.collisionArea.radius);

    this.imageObject.addChild(this.sprite);
    this.imageObject.addChild(this.collisionArea);

    stage.addChild(this.imageObject);

    this.simulate = function()
    {
        this.imageObject.x = this.x + world.x_shift;
        this.imageObject.y = this.y + world.y_shift;
    }

};