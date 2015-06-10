createScenario = function()
{
var level = new Scenario();

var checkpointPositions = [
[550,-100],
];

level.createCheckpoints(checkpointPositions);
level.setWindDirection(0);
level.setWindSpeed(12);
level.setNextLevel("sterowanie_poziom2.html");
return level;
}
