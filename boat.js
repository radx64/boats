function Boat(stage, x, y)
{
    var KEYCODE_LEFT = 37, 
        KEYCODE_RIGHT = 39,
        KEYCODE_UP = 38, 
        KEYCODE_DOWN = 40;

    this.speed = 0;
    this.direction = 0;
    this.rudder_direction = 0;
    this.sail_direction = 0;
    this.x = x;
    this.y = y;

    this.dot =  new createjs.Shape();
    this.dot.graphics.beginFill("red").drawCircle(0,0,5);

    this.sprite = new createjs.Bitmap("boat_top.png");
    this.sprite.scaleX = 0.25;
    this.sprite.scaleY = 0.25;
    this.sprite.x = -37;    // this should be done dynamicaly but need to use preloader for images, 
                            // cause bitmap is not loaded yet and can't get here width and heigth
    this.sprite.y = -90; 

    this.sail = new createjs.Shape();
    this.sail.graphics.beginFill("green").drawRect(-2, 0, 4, 70);
    this.sail.x = 0;
    this.sail.y = 0;

    this.rudder = new createjs.Shape();
    this.rudder.graphics.beginFill("blue").drawRect(-2, 0, 4, 20);
    this.rudder.x = 0;
    this.rudder.y = 85;

    this.imageObject = new createjs.Container();
    this.imageObject.addChild(this.sprite);
    this.imageObject.addChild(this.sail);
    this.imageObject.addChild(this.rudder);
    this.imageObject.addChild(this.dot);   

    stage.addChild(this.imageObject);

    this.redrawBoat = function()
    {
        this.imageObject.x = this.x;
        this.imageObject.y = this.y;
        this.sail.rotation = this.sail_direction;
        this.rudder.rotation = this.rudder_direction;
        this.imageObject.rotation += 1;
    }

    this.simulate = function()
    {
        this.redrawBoat()
        document.getElementById("boat_speed").value = this.speed;
        document.getElementById("boat_direction").value = this.direction;
        document.getElementById("sail_dir").value = this.sail_direction;
        document.getElementById("rudder_dir").value = this.rudder_direction;
        document.getElementById("boat_x").value = this.x;
        document.getElementById("boat_y").value = this.y;
    }

    this.processKey = function(event)
    {
        switch(event.keyCode)
        {
            case KEYCODE_LEFT:
                if (this.rudder_direction < 75) { this.rudder_direction += 5;}
                break;
            case KEYCODE_RIGHT: 
                if (this.rudder_direction > -75) { this.rudder_direction -= 5;}
                break;
            case KEYCODE_UP: 
                this.sail_direction += 5;
                if(this.sail_direction >= 360) { this.sail_direction = this.sail_direction - 360.0;}
                break;
            case KEYCODE_DOWN: 
                this.sail_direction -= 5;
                if(this.sail_direction < 0) { this.sail_direction = 360.0 - this.sail_direction;}
                break;
        }
    }
}