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

      iterateBehaviors: function(func) {
        for (var key in this.behaviorsById) {
          var behavior = this.behaviorsById[key];
          func.call(this, behavior);
        }
      },

      // Remove all the behaviors.
      kill: function() {
        this.parent();
        // Defer this until the event queue is free otherwise kill behaviors
        // are removed before they can act on the entity being killed.
        setTimeout(function() {
          this.iterateBehaviors(this.removeBehavior);
        }.bind(this), 0);
      },

      addBehavior: function(behavior, name) {
        this.behaviorsById[behavior.id] = behavior;
        this.behaviorsByName[behavior.name] = behavior;
        behavior.added(this);
      },

      removeBehavior: function(behavior) {
        if (!behavior) {
          return;
        }
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
        this.iterateBehaviors(function(behavior) {
          if (!behavior) {
            return;
          }
          if (behavior.enabled && behavior[methodName]) {
            behavior[methodName].apply(behavior, [entity].concat(args));
          }
        });
      },

      // Entity methods:
      update: function() {
        this.parent();
        this.behave('update');
      },

      draw: function() {
        this.behave('predraw');
        this.parent();
        this.behave('draw');
      }

      // TODO: handleMovementTrace. Possibly, store oldVel before this.parent
      // and give behaviors a chance to set velocity themselves?
    });
  };
});
