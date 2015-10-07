angular.module('todo-app').service('modelizeExtension', function ($q) {

    var QUERY_WITH_PAGES = function queryWithPages(queryParams, options) {

      options = options || {};
      options.params = queryParams || {};
      if (options.updateRemoteState !== false) options.updateRemoteState = true;

      var _this = this,
        url = options.url ||
          this.baseUrl,
        fullResponse = !!options.fullResponse,
        rawData = !!options.rawData;

      if (!url) {
        throw new Error('URL error: "baseUrl" should be defined or "options.url" specified to "query" a resource');
      }

      var _future = rawData ? [] : _this.$newCollection([], options);
      var promise = this.$request.get(url, angular.extend({}, options, {fullResponse: true})).then(function (res) {
        if (rawData) {
          Array.prototype.push.apply(_future, res.data.list);
        } else {
          _future.reset(res.data.list, options);
        }
        _future.total = res.data.total;
        if (angular.isFunction(options.onSuccess)) {
          options.onSuccess.call(_this, res);
        }

        return fullResponse ? res : _future;
      }, function (res) {
        if (angular.isFunction(options.onError)) {
          options.onError.call(_this, res);
        }
        $q.reject(res);
      });

      if (_future._loadingTracker) {
        _future._loadingTracker.addPromise(promise);
      }

      promise.$future = _future;

      return promise;

    };

    function addStaticMethod(model, fncName, fnc) {
      if (!model.hasOwnProperty('static')) {
        model.static = {};
      }
      model.static[fncName] = fnc;
      return model;
    }

    this.definePagedQuery = function (model) {
      return addStaticMethod(model, 'queryWithPages', QUERY_WITH_PAGES);
    };

  });

