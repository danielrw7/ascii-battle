var Battlefield = (function() {
    function Battlefield(display, baseElements, armies) {
        this.display = display;
        this.armies = armies || [];
        this.baseElements = baseElements || [];
        this.elements = [];
    }

    Battlefield.prototype.render = function(forceUpdate) {
        if (forceUpdate) {
            this.updatePositions();
        }
        var rows = [];
        for(var y = 1; y <= this.display.height; y++) {
            var row = [];
            for(var x = 1; x <= this.display.width; x++) {
                row.push(this.getAt(x, y, true));
            }
            rows.push(row);
        }
        this.display.render(rows);
        this.baseElements.forEach(function(element) {
            return element.afterRender();
        });
        this.armies.forEach(function(army) {
            return army.afterRender();
        });
    }

    Battlefield.prototype.getAt = function(x, y, text, recalculate) {
        var recalculate = recalculate !== undefined && recalculate !== null ? recalculate : false;
        if (recalculate) {
            var result = this.elements.filter(function(elem) {
                return elem.position.x == x && elem.position.y == y;
            });
        } else {
            if (!this.positions) {
                this.updatePositions();
            }
            var result = '';
            try {
                result = this.positions[y - 1][x - 1] || [];
            } catch (e) {
            }
        }
        if (text) {
            result = result || '';
            var char = result.length ? result[0].options.character : ' ';
            color = result.length ? result[0].options.color : "white";
            if (char == ' ') {
                return char;
            } else {
                return '<span style="color: '+color+'">' + char + '</span>';
            }
        }
        return result;
    }

    Battlefield.prototype.updatePositions = function() {
        this.updateElements();
        var rows = [];
        for(var y = 1; y <= this.display.height; y++) {
            var row = [];
            for(var x = 1; x <= this.display.width; x++) {
                row.push(this.getAt(x, y, false, true));
            }
            rows.push(row);
        }
        this.positions = rows;
    }

    Battlefield.prototype.updateElements = function() {
        var elements = this.baseElements || [];
        this.armies.forEach(function(army) {
            elements = elements.concat(army.getElements());
        });
        this.elements = elements;
    }

    Battlefield.prototype.tick = function(forceUpdate) {
        var self = this;
        this.baseElements.forEach(function(element) {
            return element.tick(self.display);
        });
        this.armies.forEach(function(army) {
            return army.tick(self.display);
        });
        if (this.hasPositionChange()) {
            this.render(true);
        }
    }

    Battlefield.prototype.hasPositionChange = function() {
        return this.baseElements.filter(function(element) {
            return element.hasPositionChange();
        }).length > 0 || this.armies.filter(function(army) {
            return army.hasPositionChange();
        }).length > 0;
    }

    return Battlefield;
})();
