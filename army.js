var Army = (function() {
   function Army(members) {
      this.members = members || [];
      this.hasChange = true;
   }

   Army.prototype.getElements = function() {
      return this.members || [];
   }

   Army.prototype.tick = function(display) {
      var self = this;
      this.members.forEach(function(member) {
         member.tick(display);
         self.hasChange = self.hasChange || member.hasChange;
      });
   }

   Army.prototype.hasPositionChange = function() {
      return this.hasChange;
   }

   Army.prototype.afterRender = function() {
      this.hasChange = false;
      this.members.forEach(function(member) {
         member.afterRender();
      })
   }

   return Army;
})();
