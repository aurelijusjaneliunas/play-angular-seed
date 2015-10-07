angular.module('todo-app')
  .factory('locationChangeHandler', ['$location', '$rootScope', '$timeout', function locationChangeHandler($location, $rootScope, $timeout) {
    /*
     * Location handler - helper to watch $location changes.
     * Only unique changes would be fired to 'onUrlChange' callback.
     *
     * Notes.
     *  - Private methods are marked wih underscore
     */

    function LocationWatcher(id) {
      var self = this;
      var state = {
        id: id,
        onInit: null,
        onUrlChange: null,
        onParamChange: null,
        resolveParams: null,
        block: true,
        flush: false
      };
      this.ready = function (registration) {
        self._init(registration);
        return self;
      };
      this._init = function (registration) {
        state.onInit = registration.onInit;
        state.onUrlChange = registration.onUrlChange;
        state.onParamChange = registration.onParamChange;
        state.resolveParams = registration.resolveParams;
        state.block = true;
        return self;
      };
      this._changeWatch = function () {
        if (state.block) {
          return;
        }
        if (state.flush) {
          state.flush = false;
          return;
        }
        var searchParams = $location.search(),
          controllerParams = self._resolveControllerParameters();
        if (angular.equals(controllerParams, searchParams)) {
          return;
        }
        self._applyUrlChange(searchParams);
      };
      this._resolveControllerParameters = function () {
        if (state.resolveParams) {
          return state.resolveParams();
        }
        return null;
      };
      this._applyUrlChange = function (searchParams) {
        if (state.onUrlChange) {
          state.onUrlChange(searchParams);
        }
      };
      this._applyParamChange = function (searchParams) {
        if (state.onParamChange) {
          state.onParamChange(searchParams);
        }
      };
      this.push = function () {
        if (state.block) {
          return;
        }
        var searchParams = $location.search(),
          controllerParams = self._resolveControllerParameters();
        if (angular.equals(controllerParams, searchParams)) {
          return;
        }
        self._applyParamChange(controllerParams);
        $location.search(controllerParams);
      };
      this._dropPassives = function (passives) {
        if (passives) {
          angular.forEach(passives, function (passive) {
            $location.search(passive, null);
          });
        }
      };
      this._parsePassives = function (passives) {
        var passiveParams = null;
        if (passives) {
          passiveParams = {};
          var searchParams = $location.search();
          angular.forEach(passives, function (passive) {
            var paramValue = searchParams[passive];
            if (ObjectUtils.isNotEmpty(paramValue)) {
              passiveParams[passive] = paramValue;
            }
          });
        }
        return passiveParams;
      };
      this.start = function (passives) {
        var passiveParams = null, searchParams = null;
        if (passives) {
          passiveParams = self._parsePassives(passives);
          self._dropPassives(passives);
        }
        searchParams = $location.search();
        if (state.onInit) {
          //TODO may we need to use callbacks
          $timeout(function () {
            state.onInit(searchParams, passiveParams);
            self.unBlock();
          });
        } else {
          self.unBlock();
        }
      };
      this.flush = function () {
        if (state.block) {
          return;
        }
        state.flush = true;
        $location.search({});
      };
      this.block = function () {
        state.block = true;
      };
      this.unBlock = function () {
        state.block = false;
      };
    }

    var locationWatcher = new LocationWatcher('_locationWatcher');

    $rootScope.$on('$locationChangeSuccess', function (event, o, n) {
      locationWatcher._changeWatch();
    });

    return {
      create: function (registration) {
        return locationWatcher.ready(registration);
      }
    };

  }]);
