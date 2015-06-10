createScenario = function()
{
var level = new Scenario();

var checkpointPositions = [
[550,-100],
];

level.createCheckpoints(checkpointPositions);
level.setWindDirection(220);
level.setWindSpeed(17);
level.setNextLevel("sterowanie_poziom4.html");
return level;
}
