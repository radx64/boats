function World(stage)
{
	this.x_shift = 0;
	this.y_shift = 0;

	this.windSpeed = 0.06;
	this.windDirection = 0;

	this.windGraphics = new createjs.Container();
	this.windGraphics.x = 100;
	this.windGraphics.y = 100;

	this.windArrow = new createjs.Bitmap("assets/wind_arrow_scaled.png");
	this.windArrow.x = -30;
	this.windArrow.y = -30;

	this.windGraphics.addChild(this.windArrow);
	this.windGraphics.shadow = new createjs.Shadow("#005588", 10, 10, 30);

	this.grid = new createjs.Shape();

	stage.addChild(this.grid);

	

	this.obstaclesPos = [
	[300,300],
	[20,20],
	[30,30],
	[40,40]
	];

	this.obstacles = Array();

	for(var i = 0; i<this.obstaclesPos.length; ++i)
	{
		this.obstacles[i] = new createjs.Shape();
    	this.obstacles[i].graphics.beginFill("red").drawCircle(0,0,20);
    	this.obstacles[i].absolute_x = this.obstaclesPos[i][0];
    	this.obstacles[i].absolute_y = this.obstaclesPos[i][1];
    	stage.addChild(this.obstacles[i]);
	}

	stage.addChild(this.windGraphics);

	this.drawGrid = function()
	{
		this.grid.graphics.clear();
		this.grid.graphics.beginStroke("white");

		for (var i = 0 ; i < stage.canvas.width / 100 + 1; ++i)
		{
			this.grid.graphics.moveTo(i*100 + (this.x_shift % 100), 0);
			this.grid.graphics.lineTo(i*100 + (this.x_shift % 100), stage.canvas.height);
		}

		for (var i = 0 ; i < stage.canvas.height / 100 + 1; ++i)
		{
			this.grid.graphics.moveTo(0,i*100 + (this.y_shift % 100));
			this.grid.graphics.lineTo(stage.canvas.width, i*100 + (this.y_shift % 100));	
		}
	}

	this.drawObstacles = function()
	{
		for(var i = 0; i<this.obstacles.length; ++i)
		{
			this.obstacles[i].x = (this.obstacles[i].absolute_x + this.x_shift);
			this.obstacles[i].y = (this.obstacles[i].absolute_y + this.y_shift);
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
		this.drawObstacles();

		// document.getElementById("wind_speed").value = this.windSpeed;
  //       document.getElementById("wind_dir").value = this.windDirection;  

  //       document.getElementById("world_x_shift").value = this.x_shift;
  //       document.getElementById("world_y_shift").value = this.y_shift;

	}
}