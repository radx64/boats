createSpeedGauge = function()
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
};

createSteerGauge = function()
{
    steerGauge = new Gauge({
    renderTo    : 'steergauge',
    width       : 200,
    height      : 200,
    glow        : true,
    units       : 'steer',
    title       : false,
    minValue    : -50,
    maxValue    : 50,
    majorTicks  : ['-50','0','50'],
    minorTicks  : 2,
    strokeTicks : true,
    valueFormat : { int : 2, dec : 0 },
    highlights  : [],
    colors      : {
        plate      : '#224',
        majorTicks : '#f5f5f5',
        minorTicks : '#ddd',
        title      : '#fff',
        units      : '#ccc',
        numbers    : '#eee',
        needle     : { start : 'rgba(240, 128, 128, 1)', end : 'rgba(255, 160, 122, .9)' }
    }
});
    speedGauge.draw();
};

function createSailGauge()
{
    sailGauge = new Gauge({
    renderTo    : 'sailgauge',
    width       : 200,
    height      : 200,
    glow        : true,
    units       : 'sail',
    title       : false,
    minValue    : -60,
    maxValue    : 60,
    majorTicks  : ['-60','0','60'],
    minorTicks  : 2,
    strokeTicks : true,
    valueFormat : { int : 2, dec : 0 },
    highlights  : [],
    colors      : {
        plate      : '#242',
        majorTicks : '#f5f5f5',
        minorTicks : '#ddd',
        title      : '#fff',
        units      : '#ccc',
        numbers    : '#eee',
        needle     : { start : 'rgba(240, 128, 128, 1)', end : 'rgba(255, 160, 122, .9)' }
    }
});
    speedGauge.draw();
};