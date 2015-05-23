Checkpoint = function(x, y)
{
    this.x = x;
    this.y = y;

    this.radius = 75;

    this.imageObject = new createjs.Container();

    this.circle = new createjs.Shape();
    this.circle.graphics.setStrokeStyle(5).beginStroke("rgba(0,255,0,0.5)").drawCircle(0, 0, this.radius);
    this.circle.shadow = new createjs.Shadow("#000000", 25, 25, 25);

    this.collisionArea = new createjs.Shape();

    this.collisionArea.x = 0;
    this.collisionArea.y = 0;
    this.collisionArea.radius = this.radius;
    //this.collisionArea.graphics.beginStroke("blue").drawCircle(0,0,this.collisionArea.radius);

    this.imageObject.addChild(this.circle);
    this.imageObject.addChild(this.collisionArea);

    stage.addChild(this.imageObject);

    this.simulate = function()
    {
        this.imageObject.x = this.x + world.x_shift;
        this.imageObject.y = this.y + world.y_shift;
    }

    this.destroy= function()
    {
        stage.removeChild(this.imageObject);
    }

}