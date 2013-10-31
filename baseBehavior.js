ig.module(
  'game.behaviors.baseBehavior'
)
.requires(
  'impact.impact'
)
.defines(function() {
  BaseBehavior = ig.Class.extend({
    enabled: true,

    init: function() {
      this.id = _.uniqueId('behavior-');
    },

    // Called when the behavior is added to an entity.
    added: function(entity) {},

    // Called when the behavior is removed from an entity.
    removed: function(entity) {}
  });
});
