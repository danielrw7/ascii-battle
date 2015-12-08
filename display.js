var Display = (function() {
   function Display(container, width, height, unit) {
      var unit = Number(unit) || 10;

      container.style.fontSize = unit * 1.6;

      this.container = container;
      this.width = width;
      this.height = height;
      this.unit = unit;
   }

   Display.prototype.render = function(rows) {
      this.container.innerHTML = rows.map(function(row) {
         return row.join('');
      }).join('\n');
   }

   return Display;
})();
