Scenario = function()
{
    this.description = "Sample description";
    this.checkpoints = Array();
    this.obstacles = Array();

    this.createCheckpoints = function(checkpointsArray)
    {
        for(var i = 0; i<checkpointsArray.length; ++i)
        {
            this.checkpoints[i] = new Checkpoint(checkpointsArray[i][0], checkpointsArray[i][1]);
        }
    }

    this.createDescription = function(descriptionText)
    {
        this.description = descriptionText;
    }

    this.createObstacles = function(obstacleArray)
    {
        for(var i = 0; i<obstacleArray.length; ++i)
        {
            this.obstacles[i] = new Obstacle(obstacleArray[i][0], obstacleArray[i][1], obstacleArray[i][2]);
        }
    }

}