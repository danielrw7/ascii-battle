function extend() {
    var result = arguments[0];
    for(var i = 1; i < arguments.length; i++) {
        for(var key in arguments[i]) {
            result[key] = arguments[i][key];
        }
    }
    return result;
}

var Warrior = (function() {
    function Warrior(options) {
        this.options = extend({
            character: '+',
            color: 'white',
            position: {
                x: 1,
                y: 1
            }
        }, options);

        this.hasChange = true;
        this.position = this.options.position;
    }

    Warrior.prototype.tick = function(display) {
        this.setX(this.position.x + this.options.direction);
    }

    Warrior.prototype.afterRender = function(surroundings) {
        this.hasChange = false;
    }

    Warrior.prototype.setX = function(x) {
        this.position.x = x;
        this.hasChange = true;
    }
    Warrior.prototype.setY = function(y) {
        this.position.y = y;
        this.hasChange = true;
    }

    return Warrior;
})();
