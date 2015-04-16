function Boat(stage, x, y)
{
    var KEYCODE_SPACE = 32,
        KEYCODE_LEFT = 37, 
        KEYCODE_RIGHT = 39,
        KEYCODE_UP = 38, 
        KEYCODE_DOWN = 40;

    this.speed = 0;
    this.direction = 0;
    this.rudder_direction = 0;
    this.sail_direction = 0;
    this.x = x;
    this.y = y;

    this.sailForce = 0.0;               // this force is applied in front direction of boat by sail
    this.maxDragForce = 0.0015;          // this force is maximum drag force applied in rear direction of boat
    this.longitudinalForce = 0.0;       // this force is resulting force after adding sail force to drag force


    this.rudderForceCoeficient = 0.04;

    this.dot =  new createjs.Shape();
    this.dot.graphics.beginFill("red").drawCircle(0,0,5);

    this.sprite = new createjs.Bitmap("boat_top_scaled.png");
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

    this.debugBox = new createjs.Shape();
    this.debugBox.graphics.beginStroke("black").drawRect(-37, -90, 74, 180);

    this.imageObject = new createjs.Container();
    this.imageObject.addChild(this.sprite);
    this.imageObject.addChild(this.sail);
    this.imageObject.addChild(this.rudder);
    this.imageObject.addChild(this.dot);  
    this.imageObject.addChild(this.debugBox); 

    stage.addChild(this.imageObject);

    this.redrawBoat = function()
    {
        this.imageObject.x = this.x;
        this.imageObject.y = this.y;
        this.sail.rotation = this.sail_direction;
        this.rudder.rotation = this.rudder_direction;
        this.imageObject.rotation = this.direction;
    }

    this.simulate = function(event, keys)
    {
        this.processKey(keys);
        
        this.direction -= this.rudder_direction * this.rudderForceCoeficient * this.speed * event.delta/100.0;   

        if (this.direction >= 360 )
        {
            this.direction = 0; // to keep direction always in range 0..360
        }

        if (this.direction < 0)
        {
            this.direction = 360 + this.direction;
        }

        this.longitudinalForce = this.sailForce - (Math.pow(this.speed,1.1)) * this.maxDragForce;

        this.speed += this.longitudinalForce * event.delta/2.0;

        directionInRadians = this.direction*Math.PI/180.0;

        this.x += Math.sin(directionInRadians) * this.speed;
        this.y -= Math.cos(directionInRadians) * this.speed;

        this.redrawBoat(); 

        /* jumping over borders */
        if (this.x < 0) 
        {
            this.x = stage.canvas.width;
        }

        if (this.y < 0) 
        {
            this.y = stage.canvas.height;
        }

        if (this.x > stage.canvas.width) 
        {
            this.x = 0;
        }

        if (this.y > stage.canvas.height) 
        {
            this.y = 0;
        }

        this.sailForce = 0.000;     //to stop powering boat DEBUG puropses only
        
        /* Code below is only for testing purposes. Will be removed when ... probably never :) Nah. Will be.*/
        document.getElementById("boat_speed").value = this.speed;
        document.getElementById("longitudinal_force").value = this.longitudinalForce;
        document.getElementById("boat_direction").value = this.direction;
        document.getElementById("sail_dir").value = this.sail_direction;
        document.getElementById("abs_sail_dir").value = this.sail_direction - this.direction;
        document.getElementById("rudder_dir").value = this.rudder_direction;
        document.getElementById("boat_x").value = this.x;
        document.getElementById("boat_y").value = this.y;
    }

    this.processKey = function(keys)
    {
        if(keys[KEYCODE_LEFT])
        {
            if (this.rudder_direction < 75) { this.rudder_direction += 1;}   
        }

        if(keys[KEYCODE_RIGHT])
        {
            if (this.rudder_direction > -75) { this.rudder_direction -= 1;}  
        }

        if(keys[KEYCODE_UP])
        {
                this.sail_direction += 1;
                if(this.sail_direction >= 360) { this.sail_direction = this.sail_direction - 360.0;}  
        }

        if(keys[KEYCODE_DOWN])
        {
                this.sail_direction -= 1;
                if(this.sail_direction < 0) { this.sail_direction = 360 + this.sail_direction;}    
        }

        if(keys[KEYCODE_SPACE])
        {
            this.sailForce = 0.01; //this is only for DEBUG purposes. Sail force will be calculated with some wind force fiddling
        }
    }
}