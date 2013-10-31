ig.module(
  'game.behaviors.enableBehaviors'
)
.requires(
  'impact.impact'
)
.defines(function() {

  enableBehaviors = function(entityClass) {
    entityClass.inject({
      // A map of behavior IDs to behaviors.
      behaviorsById: {},
      // A map of behavior name to behavior instance. Currently support
      // only single instances added at a time of any given behavior.
      behaviorsByName: {},

      addBehavior: function(behavior, name) {
        this.behaviorsById[behavior.id] = behavior;
        this.behaviorsByName[behavior.name] = behavior;
        behavior.added(this);
      },

      removeBehavior: function(behavior) {
        if (this.behaviorsById.hasOwnProperty(behavior.id)) {
          this.behaviorsById[behavior.id] = null;
          this.behaviorsByName[behavior.name] = null;
          behavior.removed(this);
        }
      },

      removeBehaviorByName: function(name) {
        if (this.behaviorsByName.hasOwnProperty(name)) {
          var behavior = this.behaviorsByName[name];
          this.behaviorsByName[name] = null;
          this.behaviorsById[behavior.id] = null;
          behavior.removed(this);
        }
      },

      behave: function(methodName) {
        var entity = this;
        var args = Array.prototype.slice.call(arguments, 1);
        _.each(this.behaviorsById, function(behavior) {
          if (!behavior) {
            return;
          }
          if (behavior.enabled && behavior[methodName]) {
            behavior[methodName].apply(behavior, [entity].concat(args));
          }
        });
      }
    });
  };
});
