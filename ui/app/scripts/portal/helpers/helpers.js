angular.module('todo-app').service('helpers', function helpers() {

  var ObjectUtils = {};
  ObjectUtils.isEmpty = function (src) {
    return src === null || src === undefined;
  };
  ObjectUtils.isNotEmpty = function (src) {
    return !ObjectUtils.isEmpty(src);
  };
  ObjectUtils.isEquals = function (src, dest) {
    return src === dest;
  };
  ObjectUtils.isAllEmpty = function () {
    var isEmpty = true;
    for (var argument in arguments) {
      isEmpty = isEmpty && ObjectUtils.isEmpty(argument);
    }
    return isEmpty;
  };
  ObjectUtils.isAllNotEmpty = function () {
    return !ObjectUtils.isAllEmpty(arguments);
  };
  ObjectUtils.values = function (src) {
    if (ObjectUtils.isEmpty(src)) {
      return [];
    }
    var keys = Object.keys(src), values = [];
    for (var i = 0; i < keys.length;) {
      values.push(src[keys[i]]);
      i = i + 1;
    }
    return values;
  };
  ObjectUtils.iif = function (val, valueGood, valueDefault) {
    if (ObjectUtils.isEmpty(val)) {
      return valueGood;
    } else {
      return valueDefault;
    }
  };
  ObjectUtils.getProperty = function (val, property) {
    if (ObjectUtils.isEmpty(val)) {
      return null;
    } else {
      if (val.hasOwnProperty(property)) {
        return val[property];
      } else {
        return null;
      }
    }
  };

  var ArrayUtils = {};
  ArrayUtils.strLineToInt = function (str) {
    return str.split(',').map(function (item) {
      return parseInt(item, 10);
    });
  };
  ArrayUtils.isEmpty = function (list) {
    if (list === null || list === undefined || list.length === 0) {
      return true;
    }
    return false;
  };
  ArrayUtils.isNotEmpty = function (list) {
    return !ArrayUtils.isEmpty(list);
  };
  ArrayUtils.remove = function (list, key) {
    list.splice(key, 1);
    return ArrayUtils.clone(list);
  };
  ArrayUtils.compare = function (array) {
    // if the other array is a falsy value, return
    if (!array) {
      return false;
    }
    // compare lengths - can save a lot of time
    if (this.length !== array.length) {
      return false;
    }

    for (var i = 0, l = this.length; i < l;) {
      // Check if we have nested arrays
      if (this[i] instanceof Array && array[i] instanceof Array) {
        // recurse into the nested arrays
        if (!this[i].compare(array[i])) {
          return false;
        }
      }
      else if (this[i] !== array[i]) {
        // Warning - two different object instances will never be equal: {x:20} != {x:20}
        return false;
      }
      i = i + 1;
    }
    return true;
  };
  ArrayUtils.contains = function (array, item) {
    if (!array) {
      return false;
    }

    for (var i = 0; i < array.length;) {
      if (array[i] === item) {
        return true;
      }
      i = i + 1;
    }
    return false;
  };
  ArrayUtils.find = function (items, itemProperty, itemValue) {
    if (!items) {
      return null;
    }
    for (var i = 0; i < items.length;) {
      var item = items[i];
      if (item[itemProperty] === itemValue) {
        return item;
      }
      i = i + 1;
    }
    return null;
  };
  ArrayUtils.filter = function (items, itemProperty, itemValue) {
    if (!items) {
      return null;
    }
    var filterItems = items.filter(function (item) {
      return item[itemProperty] === itemValue;
    });
    return filterItems;
  };
  ArrayUtils.collectProps = function (items, itemProperty) {
    if (!items) {
      return null;
    }
    var collectedProperties = [];
    angular.forEach(items, function (item) {
      collectedProperties.push(item[itemProperty]);
    });
    return collectedProperties;
  };

  var FunctionHandlerUtils = {};
  FunctionHandlerUtils.forEachFn = function (arr, fnName, args) {
    var i = arr.length;
    while (i >= 0) {
      var t = arr[i];
      t[fnName].apply(t, args);
      i = i - 1;
    }
  };
  FunctionHandlerUtils.forEachFnHook = function (arr, fnName) {
    arr[fnName] = function () {
      FunctionHandlerUtils.forEachFn(this, fnName, arguments);
    };
  };

  var NumberUtils = {};
  NumberUtils.roundUp = function (number, places) {
    var multiplier = Math.pow(10, places);
    return (Math.round(number * multiplier) / multiplier);
  };
  NumberUtils.roundDown = function (number, places) {
    var multiplier = Math.pow(10, places);
    return (Math.floor(number * multiplier) / multiplier);
  };
  NumberUtils.round = function (number, places, rm) {
    if (rm === "up") {
      return NumberUtils.roundUp(number, places);
    } else if (rm === "down") {
      return NumberUtils.roundDown(number, places);
    } else {
      return number;
    }
  };
  NumberUtils.hashDecimalPlaces = function (number) {
    return number % 1 !== 0;
  };
  NumberUtils.toFixedNumberRoot = function (number, places, rtz, rm) {
    if (number === null || number === undefined) {
      return null;
    }
    if (rm !== "none") {
      number = NumberUtils.round(number, places, rm);
    }
    var numberStr = number.toFixed(places);
    if (rtz && NumberUtils.hashDecimalPlaces(number)) {
      return numberStr.replace(/0+$/, "");
    }
    return numberStr;
  };
  NumberUtils.toFixedNumber = function (number, places) {
    return NumberUtils.toFixedNumberRoot(number, places, false);
  };
  NumberUtils.toFixedNumberWith2 = function (number) {
    return NumberUtils.toFixedNumberRoot(number, 2, false);
  };

  var RandomStringUtils = {
    CHARS: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  };

  RandomStringUtils.uuid = function (len, radix) {
    "use strict";
    var chars = RandomStringUtils.CHARS, uuid = [], i;
    radix = radix || chars.length;

    if (len) {
      // Compact form
      for (i = 0; i < len; i++) {
        uuid[i] = chars[0 | Math.random() * radix];
      }
    } else {
      // rfc4122, version 4 form
      var r;

      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';

      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }

    return uuid.join('');
  };
  RandomStringUtils.uuidFast = function () {
    "use strict";

    var chars = RandomStringUtils.CHARS, uuid = new Array(36), rnd = 0, r;
    for (var i = 0; i < 36; i++) {
      if (i == 8 || i == 13 || i == 18 || i == 23) {
        uuid[i] = '-';
      } else if (i == 14) {
        uuid[i] = '4';
      } else {
        if (rnd <= 0x02) rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
        r = rnd & 0xf;
        rnd = rnd >> 4;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
    return uuid.join('');
  };
  RandomStringUtils.uuidCompact = function () {
    "use strict";

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };
  RandomStringUtils.uuidInt = function () {
    "use strict";
    return parseInt(RandomStringUtils.uuid(8, 10), 10);
  };
  RandomStringUtils.uuidIntNegative = function () {
    "use strict";
    return -1 * RandomStringUtils.uuidInt();
  };
  RandomStringUtils.uuidLong = function () {
    "use strict";
    return parseInt(RandomStringUtils.uuid(15, 10), 10);
  };
  RandomStringUtils.uuidLongNegative = function () {
    "use strict";
    return -1 * RandomStringUtils.uuidLong();
  };

  var StringUtils = {};
  StringUtils.isBlank = function (str) {
    "use strict";
    if (str === null) {
      str = '';
    }
    return (/^\s*$/).test(str);
  };
  StringUtils.isNotBlank = function (str) {
    "use strict";
    return !StringUtils.isBlank(str);
  };
  StringUtils.toSentence = function (array, separator, lastSeparator, serial) {
    "use strict";
    if (array === null) {
      return '';
    }
    separator = separator || ', ';
    lastSeparator = lastSeparator || ' and ';
    var clean = [];
    for (var i = 0; i < array.length; i++) {
      if (StringUtils.isNotBlank(array[i])) {
        clean.push(array[i]);
      }
    }
    if (clean.length === 0) {
      return '';
    }
    var a = clean.slice(), lastMember = a.pop();

    if (clean.length > 2 && serial) {
      lastSeparator = _s.rtrim(separator) + lastSeparator;
    }

    return a.length ? a.join(separator) + lastSeparator + lastMember : lastMember;
  };

  var _helpers = {};
  _helpers.numbers = NumberUtils;
  _helpers.arrays = ArrayUtils;
  _helpers.objects = ObjectUtils;
  _helpers.functionHandlers = FunctionHandlerUtils;
  _helpers.randomString = RandomStringUtils;
  _helpers.strings = StringUtils;

  return _helpers;

});
