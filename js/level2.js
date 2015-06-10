createScenario = function()
{
var level = new Scenario();

var checkpointPositions = [
[850,0],
];

level.createCheckpoints(checkpointPositions);
level.setWindDirection(45);
level.setWindSpeed(13);
level.setNextLevel("sterowanie_poziom3.html");
return level;
}
