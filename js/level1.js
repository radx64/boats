createScenario = function()
{
var level1 = new Scenario();
var obstaclesPos = [
[100,100,0],
[250,100,1],
[400,100,2],
[550,100,1],
[300,300,0],
];

level1.createObstacles(obstaclesPos);

var checkpointPositions = [
[100,0],
[0,0],
[100,400],
[150,400],
[100,600],
];

level1.createCheckpoints(checkpointPositions);
level1.setWindDirection(0);
level1.setWindSpeed(15);
return level1;
}
