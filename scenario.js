Scenario = function()
{
    this.checkpoints = Array();
    this.obstacles = Array();
    this.windDirection = 0.0;
    this.windSpeed = 0.0;

    this.createCheckpoints = function(checkpointsArray)
    {
        for(var i = 0; i<checkpointsArray.length; ++i)
        {
            this.checkpoints[i] = new Checkpoint(checkpointsArray[i][0], checkpointsArray[i][1]);
        }
    }

    this.createObstacles = function(obstacleArray)
    {
        for(var i = 0; i<obstacleArray.length; ++i)
        {
            this.obstacles[i] = new Obstacle(obstacleArray[i][0], obstacleArray[i][1], obstacleArray[i][2]);
        }
    }

    this.setWindDirection = function(dir)
    {
        this.windDirection = dir;
    }

    this.setWindSpeed = function(speed)
    {
        this.windSpeed = speed;
    }
}