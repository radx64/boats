createScenario = function()
{
var level = new Scenario();
var obstaclesPos = [
[100,100,0],
[250,100,1],
[400,100,2],
[550,100,1],
[300,300,0],
];

level.createObstacles(obstaclesPos);

var checkpointPositions = [
[100,0],
[0,0],
[100,400],
[150,400],
[100,600],
];

level.createCheckpoints(checkpointPositions);
level.setWindDirection(0);
level.setWindSpeed(17);
level.setNextLevel("sterowanie_.html");
return level;
}
