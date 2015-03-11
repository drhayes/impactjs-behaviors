ig.module(
  'game.behaviors.baseBehavior'
)
.requires(
  'impact.impact'
)
.defines(function() {

  var idCounter = 0;

  var uniqueId = function(prefix) {
    var id = prefix + idCounter;
    idCounter += 1;
    return id;
  }

  BaseBehavior = ig.Class.extend({
    enabled: true,

    init: function() {
      this.id = uniqueId('behavior-');
    },

    // Called when the behavior is added to an entity.
    added: function(entity) {},

    // Called when the behavior is removed from an entity.
    removed: function(entity) {}
  });
});
