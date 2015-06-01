World = function(stage, scenario)
{
    this.x_shift = 0;
    this.y_shift = 0;

    this.windSpeed = 0.06;
    this.windDirection = 0;

    this.windBack = new createjs.Shape()
    this.windBack.graphics.beginFill("#222").drawRoundRectComplex(0,0,100,120,15,15,5,5);
    this.windBack.x = 50;
    this.windBack.y = 50;
    this.windBack.shadow = new createjs.Shadow("#000000", 0, 0, 25);

    this.checkpointsBack = new createjs.Shape()
    this.checkpointsBack.graphics.beginFill("#222").drawRoundRectComplex(0,0,100,120,15,15,5,5);
    this.checkpointsBack.x = stage.canvas.width - 150;
    this.checkpointsBack.y = 50;
    this.checkpointsBack.shadow = new createjs.Shadow("#000000", 0, 0, 25);

    this.checkpointCircle = new createjs.Shape();
    this.checkpointCircle.graphics.setStrokeStyle(5).beginStroke("rgba(0,255,0,0.5)").drawCircle(0, 0, 30);
    this.checkpointCircle.x = stage.canvas.width - 100;
    this.checkpointCircle.y = 100;
    this.checkpointCircle.shadow = new createjs.Shadow("#000000", 25, 25, 25);

    this.nearestCheckpointArrowGraphics = new createjs.Container();
    this.nearestCheckpointArrowGraphics.x = stage.canvas.width - 100;
    this.nearestCheckpointArrowGraphics.y = 100;

    this.nearestCheckpointArrow = new createjs.Bitmap("assets/wind_arrow_scaled.png");
    this.nearestCheckpointArrow.x = -15;
    this.nearestCheckpointArrow.y = -15;
    this.nearestCheckpointArrow.scaleX = 0.5;
    this.nearestCheckpointArrow.scaleY = 0.5;

    this.nearestCheckpointArrowGraphics.addChild(this.nearestCheckpointArrow);

    this.checkpointsCountText = new createjs.Text("0 left", "16px monospace", "#FFF");
    this.checkpointsCountText.x = stage.canvas.width - 125;
    this.checkpointsCountText.y = 145;

    this.windGraphics = new createjs.Container();
    this.windGraphics.x = 100;
    this.windGraphics.y = 100;

    this.windArrow = new createjs.Bitmap("assets/wind_arrow_scaled.png");
    this.windArrow.x = -30;
    this.windArrow.y = -30;

    this.windGraphics.addChild(this.windArrow);

    this.windSpeedText = new createjs.Text("0.0 knots", "16px monospace", "#FFF");
    this.windSpeedText.x = 60;
    this.windSpeedText.y = 145;

    this.grid = new createjs.Shape();

    this.scenario = scenario;
    this.windSpeed = scenario.windSpeed / 300.0;
    this.windDirection = scenario.windDirection;

    stage.addChildAt(this.grid,0);


    stage.addChild(this.checkpointsBack);
    stage.addChild(this.checkpointCircle);
    stage.addChild(this.nearestCheckpointArrowGraphics);
    stage.addChild(this.checkpointsCountText);
    stage.addChild(this.windBack);
    stage.addChild(this.windGraphics);
    stage.addChild(this.windSpeedText);

    this.drawGrid = function()
    
    {
        this.grid.graphics.clear();
        this.grid.graphics.beginStroke("#0077AA");

        var gridSize = 50;

        for (var i = 0 ; i < stage.canvas.width / gridSize + 1; ++i)
        {
            this.grid.graphics.moveTo(i*gridSize + (this.x_shift % gridSize), 0);
            this.grid.graphics.lineTo(i*gridSize + (this.x_shift % gridSize), stage.canvas.height);
        }

        for (var i = 0 ; i < stage.canvas.height / gridSize + 1; ++i)
        {
            this.grid.graphics.moveTo(0,i*gridSize + (this.y_shift % gridSize));
            this.grid.graphics.lineTo(stage.canvas.width, i*gridSize + (this.y_shift % gridSize));  
        }
    }

    toDegrees = function(radians)
    {
        return radians*180.0/Math.PI;
    }

    this.calculateNearestCheckpointDirection = function()
    {
        var nearestCheckpoint;
        var neartestDistance = 99999999;

        if(this.scenario.checkpoints.length == 0)
        {
            return 0;
        }

        for(var i = 0; i<this.scenario.checkpoints.length; ++i)
        {
            var dx = boat.imageObject.x - (this.scenario.checkpoints[i].x + this.x_shift);
            var dy = boat.imageObject.y - (this.scenario.checkpoints[i].y + this.y_shift);
            var distanceSquare = dx*dx + dy*dy;
            if (neartestDistance > distanceSquare)
            {
                neartestDistance = distanceSquare;
                nearestCheckpoint = this.scenario.checkpoints[i];
            }
        }
        var dx = boat.imageObject.x - (nearestCheckpoint.x + this.x_shift);
        var dy = boat.imageObject.y - (nearestCheckpoint.y + this.y_shift);

        var modifier = -90;

        if (dx < 0)
        {
            modifier = 90;    
        }

        var direction = Math.atan(dy/dx);

        return (toDegrees(direction) + modifier);
    }

    this.simulateObstacles = function()
    {
        for(var i = 0; i<this.scenario.obstacles.length; ++i)
        {
            this.scenario.obstacles[i].simulate();
            if(boat.hitWith(this.scenario.obstacles[i]))
            {
                boat.working = false;
                if(confirm('Łódź została rozbita! Chcesz powtórzyć?'))
                {
                    init();
                }
                else
                {
                    createjs.Ticker.setPaused(true);
                }
            }
        }
    }

    this.simulateCheckpoints = function()
    {
        for(var i = 0; i<this.scenario.checkpoints.length; ++i)
        {
            this.scenario.checkpoints[i].simulate();
            if (boat.hitWith(this.scenario.checkpoints[i]))
            {
                this.scenario.checkpoints[i].destroy();
                this.scenario.checkpoints.splice(i,1);
                break;
            }
        }

        var direction = this.calculateNearestCheckpointDirection();
        this.nearestCheckpointArrowGraphics.rotation = direction;

        if(this.scenario.checkpoints.length == 0)
        {
            alert('Wszystkie punkty kontrolne zostały zaliczone. Gratulacje!');
            createjs.Ticker.setPaused(true);
        }
    }

    this.simulate = function(event)
    {
        //this.windDirection += 0.4;

        if (this.windDirection >= 360)
        {
            this.windDirection -= 360;
        }

        if (this.windDirection < 0)
        {
            this.windDirection = 360 + this.windDirection;
        }

        this.windGraphics.rotation = this.windDirection;

        this.drawGrid();
        this.simulateCheckpoints();
        this.simulateObstacles();
        this.windSpeedText.text  = (this.windSpeed*300).toFixed(1) + " knots"
        this.checkpointsCountText.text = this.scenario.checkpoints.length + " left"
    }
}