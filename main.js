function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',9):f()}
r(function() {
    var arrows = {
        'left': '&#8592;',
        'right': '&#8594;',
        'up': '&#8593;',
        'down': '&#8595;',
        'up-left': '&#8598;',
        'up-right': '&#8599;',
        'down-left': '&#8601;',
        'down-right': '&#8600;'
    }



    display = new Display(document.getElementsByClassName('display')[0].children[0], 61, 40)

    var warriors = [];

    for(var y = 0; y < display.width; y++) {
        warriors.push(new Warrior({
            position: {
                x: 1,
                y: y,
            },
            color: 'blue',
            direction: 1,
        }));
    }

    army1 = new Army(warriors);

    var warriors = [];
    for(var y = 0; y < display.width; y++) {
        warriors.push(new Warrior({
            position: {
                x: display.width,
                y: y,
            },
            color: 'red',
            direction: -1,
        }));
    }

    army2 = new Army(warriors);


    battlefield = new Battlefield(display, [], [army1, army2]);
    controls = battlefield.render();

    window.fps = 5;
    var frameCounter = 0;
    var secondStart = new Date().getTime();
    var frameTime = new Date().getTime();
    window.tick = function() {
        frameCounter++;
        var currentTime = new Date().getTime();

        if (currentTime - frameTime > 1000 / fps) {
            battlefield.tick();
            frameTime = currentTime;
        }

        window.requestAnimationFrame(tick);

        if (currentTime-secondStart >= 1000) {
            console.log(frameCounter+' fps')
            frameCounter = 0;
            secondStart = currentTime;
        }
    };
});
