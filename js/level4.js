createScenario = function()
{
var level = new Scenario();
var obstaclesPos = [
[400,0,0],
[400,125,1],
[400,250,2],
[400,375,1],
[400,500,0],
[400,625,2],
[400,800,1]
];

level.createObstacles(obstaclesPos);

var checkpointPositions = [
[200,400]
];

level.createCheckpoints(checkpointPositions);
level.setWindDirection(80);
level.setWindSpeed(15);
level.setNextLevel("sterowanie_poziom5.html");
return level;
}
