function createSpeedGauge()
{
    speedGauge = new Gauge({
    renderTo    : 'speedgauge',
    width       : 200,
    height      : 200,
    glow        : true,
    units       : 'knots',
    title       : false,
    minValue    : 0,
    maxValue    : 16,
    majorTicks  : ['0','4','8','12','16'],
    animation   : { delay : 1, duration : 1000, fn : 'elastic' },
    minorTicks  : 2,
    strokeTicks : true,
    valueFormat : { int : 2, dec : 2 },
    highlights  : [
        { from : 0,   to : 10, color : 'rgba(0,   255, 0, .35)' },
        { from : 10, to : 12, color : 'rgba(255, 255, 0, .35)' },
        { from : 12, to : 16, color : 'rgba(255, 0, 0, .45)' }
    ],
    colors      : {
        plate      : '#222',
        majorTicks : '#f5f5f5',
        minorTicks : '#ddd',
        title      : '#fff',
        units      : '#ccc',
        numbers    : '#eee',
        needle     : { start : 'rgba(240, 128, 128, 1)', end : 'rgba(255, 160, 122, .9)' }
    }
});
    speedGauge.draw();
}