function World(stage)
{
	this.windSpeed = 0;
	this.windDirection = 0;

	this.windGraphics = new createjs.Container();
	this.windGraphics.x = 100;
	this.windGraphics.y = 100;

	this.windArrow = new createjs.Bitmap("wind_arrow_scaled.png");
	this.windArrow.x = -30;
	this.windArrow.y = -30;

	this.windGraphics.addChild(this.windArrow);

	stage.addChild(this.windGraphics);

	this.simulate = function(event)
	{
		this.windDirection += 1;

		if (this.windDirection >= 360)
		{
			this.windDirection -= 360;
		}

		if (this.windDirection < 0)
		{
			this.windDirection = 360 + this.windDirection;
		}

		this.windGraphics.rotation = this.windDirection + 180;

		document.getElementById("wind_speed").value = this.windSpeed;
        document.getElementById("wind_dir").value = this.windDirection;
	}
}