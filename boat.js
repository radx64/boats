Boat = function(stage, world, x, y)
{
    var KEYCODE_SPACE = 32,
        KEYCODE_LEFT = 37, 
        KEYCODE_RIGHT = 39,
        KEYCODE_UP = 38, 
        KEYCODE_DOWN = 40;

//--------------------------------------------SAIL
    this.sail_max_angle = 0;
    this.sail_angle = 0;

    this.working = true;

    this.speed = 0;
    this.direction = 0;
    this.rudder_direction = 0;
    this.x = x;
    this.y = y;

    this.windForce = 0.0;               //this force is a force that is generated by wind to sail
    this.windLongitudinalForce = 0.0    //this force is aplied in longitudinal direction of a boat

    this.sailForce = 0.0;               // this force is applied in front direction of boat by sail
    this.maxDragForce = 0.0015;          // this force is maximum drag force applied in rear direction of boat
    this.longitudinalForce = 0.0;       // this force is resulting force after adding sail force to drag force

    this.rudderForceCoeficient = 0.04;

    this.dot =  new createjs.Shape();
    this.dot.graphics.beginFill("red").drawCircle(0,0,3);

    this.sprite = new createjs.Bitmap("assets/boat_top_scaled.png");
    this.sprite.x = -37;    // this should be done dynamicaly but need to use preloader for images, 
                            // cause bitmap is not loaded yet and can't get here width and heigth
    this.sprite.y = -90; 

    this.sprite.shadow = new createjs.Shadow("#002244", 10, 10, 30);

    this.sail = new createjs.Container();
    this.sail.shadow = new createjs.Shadow("#000000", 5, 5, 30);

    this.sailPlane = new createjs.Shape();
    this.sailPlane.graphics.beginFill("white").bezierCurveTo(0,-80,40,-40, 0,0);

    this.sailBar = new createjs.Shape();
    this.sailBar.graphics.beginFill("green").drawRect(-2, 0, 4, -80);

    this.sail.addChild(this.sailPlane);
    this.sail.addChild(this.sailBar);

    this.rudder = new createjs.Shape();
    this.rudder.graphics.beginFill("blue").drawRect(-2, 0, 4, 20);
    this.rudder.x = 0;
    this.rudder.y = 85;
    this.rudder.shadow = new createjs.Shadow("#000000", 2, 2, 5);

    //this.debugBox = new createjs.Shape();
    //this.debugBox.graphics.beginStroke("red").drawRect(-37, -90, 74, 180);

    this.imageObject = new createjs.Container();
    this.imageObject.addChild(this.sprite);
    this.imageObject.addChild(this.sail);
    this.imageObject.addChild(this.rudder);
    this.imageObject.addChild(this.dot);  


    this.collisionArea1 = new createjs.Shape();
    this.collisionArea1.x = 0;
    this.collisionArea1.y = -42;
    this.collisionArea1.radius = 20;
    //this.collisionArea1.graphics.beginStroke("blue").drawCircle(0,0,this.collisionArea1.radius);
    this.imageObject.addChild(this.collisionArea1);

    this.collisionArea2 = new createjs.Shape();
    this.collisionArea2.x = 0;
    this.collisionArea2.y = 0;
    this.collisionArea2.radius = 35;
    //this.collisionArea2.graphics.beginStroke("blue").drawCircle(0,0,this.collisionArea2.radius);
    this.imageObject.addChild(this.collisionArea2); 

    this.collisionArea3 = new createjs.Shape();
    this.collisionArea3.x = 0;
    this.collisionArea3.y = 50;
    this.collisionArea3.radius = 35;
    //this.collisionArea3.graphics.beginStroke("blue").drawCircle(0,0,this.collisionArea3.radius);
    this.imageObject.addChild(this.collisionArea3); 

    stage.addChild(this.imageObject);

    this.redrawBoat = function()
    {
        this.imageObject.x = stage.canvas.width/2;
        this.imageObject.y = stage.canvas.height/2;
        this.sail.rotation = this.sail_direction;
        this.rudder.rotation = this.rudder_direction;
        this.imageObject.rotation = this.direction;
    }

    toRadians = function(degrees)
    {
        return degrees*Math.PI/180.0
    }

    this.simulate = function(event, keys)
    {
        if(this.working)
        {
            //some work here
        }
        else
        {
            this.speed = 0;
            return; //game over maybe
        }

        this.processKey(keys);

        if (this.direction >= 360 )
        {
            this.direction = 0; // to keep direction always in range 0..360
        }

        if (this.direction < 0)
        {
            this.direction = 360 + this.direction;
        }

        if (this.direction - world.windDirection <= 180)
        {
            if(this.sail_angle < this.sail_max_angle)
            {
                this.sail_angle += 2;
            }
        }
        else 
        {
            if(this.sail_angle > -this.sail_max_angle)
            {
                this.sail_angle -= 2;
            }
        }

        this.sail_direction = 180 + this.sail_angle;
        this.absolute_sail_direction = this.sail_direction + this.direction;
        this.windForce = Math.sin(toRadians(this.absolute_sail_direction - world.windDirection)) * world.windSpeed;
        this.windLongitudinalForce = Math.cos(toRadians(this.direction - world.windDirection)) * 0.125;
        this.sailForce = Math.abs(this.windForce) * this.windLongitudinalForce;
        this.sailSuctionForce = Math.cos(toRadians(this.absolute_sail_direction - world.windDirection + 10.0)) * world.windSpeed *0.04;
        this.sailSuctionForce = this.sailSuctionForce > 0 ? this.sailSuctionForce : 0;
        this.longitudinalForce = this.sailForce - (Math.pow(this.speed,1.2)) * this.maxDragForce + this.sailSuctionForce;
        this.speed += this.longitudinalForce * event.delta/2.0;
        this.direction -= this.rudder_direction * this.rudderForceCoeficient * this.speed * event.delta/100.0;

        directionInRadians = toRadians(this.direction);
        this.x += Math.sin(directionInRadians) * this.speed;
        this.y -= Math.cos(directionInRadians) * this.speed;

        world.x_shift = - this.x;
        world.y_shift = - this.y;

        if (this.speed < 0.0001) this.speed = 0.0;

        this.sailPlane.graphics.clear();
        this.sailPlane.graphics.beginStroke("black");
        this.sailPlane.graphics.beginFill("#E6DFC1").bezierCurveTo(0,-80, (Math.random()*6) - 600 *  this.windForce, -40, 0,0);

        this.redrawBoat();
    }

    this.processKey = function(keys)
    {
        if(keys[KEYCODE_LEFT])
        {
            if (this.rudder_direction < 50) this.rudder_direction += 2;  
        }

        if(keys[KEYCODE_RIGHT])
        {
            if (this.rudder_direction > -50) this.rudder_direction -= 2;  
        }

        if(keys[KEYCODE_UP])
        {
            if(this.sail_max_angle <= 75)
            {
                this.sail_max_angle += 1;
            }
        }

        if(keys[KEYCODE_DOWN])
        {
            if(this.sail_max_angle >= 0)
            {
                this.sail_max_angle -= 1;

                if(this.sail_angle > this.sail_max_angle)
                {
                    this.sail_angle = this.sail_max_angle; 
                }

                if(this.sail_angle < -this.sail_max_angle)
                {
                     this.sail_angle = -this.sail_max_angle; 
                } 
            }
        }

        if(keys[KEYCODE_SPACE])
        {
            this.speed += 1.01; //this is only for DEBUG purposes. Sail force will be calculated with some wind force fiddling
        }
    }

    this.detectCollisionOfArea = function(x,y,radius,ownCollsionArea)
    {
        var translatedPoint = ownCollsionArea.localToGlobal(0, 0);
        var dx = translatedPoint.x - (x + world.x_shift);
        var dy = translatedPoint.y - (y + world.y_shift);
        var distance = Math.sqrt(dx * dx + dy * dy); 

        if (distance < (ownCollsionArea.radius + radius))
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    this.hitWith = function(object)
    {
        return (this.detectCollisionOfArea(object.x, object.y, object.radius, this.collisionArea1) ||
            this.detectCollisionOfArea(object.x, object.y, object.radius, this.collisionArea2) ||
            this.detectCollisionOfArea(object.x, object.y, object.radius, this.collisionArea3))
    }
}