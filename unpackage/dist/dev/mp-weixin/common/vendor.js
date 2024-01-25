(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!*********************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var objectKeys = ['qy', 'env', 'error', 'version', 'lanDebug', 'cloud', 'serviceMarket', 'router', 'worklet', '__webpack_require_UNI_MP_PLUGIN__'];
var singlePageDisableKey = ['lanDebug', 'router', 'worklet'];
var target = typeof globalThis !== 'undefined' ? globalThis : function () {
  return this;
}();
var key = ['w', 'x'].join('');
var oldWx = target[key];
var launchOption = oldWx.getLaunchOptionsSync ? oldWx.getLaunchOptionsSync() : null;
function isWxKey(key) {
  if (launchOption && launchOption.scene === 1154 && singlePageDisableKey.includes(key)) {
    return false;
  }
  return objectKeys.indexOf(key) > -1 || typeof oldWx[key] === 'function';
}
function initWx() {
  var newWx = {};
  for (var _key in oldWx) {
    if (isWxKey(_key)) {
      // TODO wrapper function
      newWx[_key] = oldWx[_key];
    }
  }
  return newWx;
}
target[key] = initWx();
var _default = target[key];
exports.default = _default;

/***/ }),
/* 2 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApp = createApp;
exports.createComponent = createComponent;
exports.createPage = createPage;
exports.createPlugin = createPlugin;
exports.createSubpackageApp = createSubpackageApp;
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _construct2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/construct */ 15));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 22);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var realAtob;
var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;
    var result = '';
    var r1;
    var r2;
    var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 | (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}
function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {
    var _getCurrentUserInfo = getCurrentUserInfo(),
      role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {
    var _getCurrentUserInfo2 = getCurrentUserInfo(),
      permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {
    var _getCurrentUserInfo3 = getCurrentUserInfo(),
      tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}
var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;
function isFn(fn) {
  return typeof fn === 'function';
}
function isStr(str) {
  return typeof str === 'string';
}
function isObject(obj) {
  return obj !== null && (0, _typeof2.default)(obj) === 'object';
}
function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
function noop() {}

/**
 * Create a cached version of a pure function.
 */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
function sortObject(obj) {
  var sortObj = {};
  if (isPlainObject(obj)) {
    Object.keys(obj).sort().forEach(function (key) {
      sortObj[key] = obj[key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}
var HOOKS = ['invoke', 'success', 'fail', 'complete', 'returnValue'];
var globalInterceptors = {};
var scopedInterceptors = {};
function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}
function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}
function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}
function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}
function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}
function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}
function wrapperHook(hook, params) {
  return function (data) {
    return hook(data, params) || data;
  };
}
function isPromise(obj) {
  return !!obj && ((0, _typeof2.default)(obj) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}
function queue(hooks, data, params) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook, params));
    } else {
      var res = hook(data, params);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {}
        };
      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    }
  };
}
function wrapperOptions(interceptor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res, options).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options) {
  for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    params[_key - 3] = arguments[_key];
  }
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        // 重新访问 getApiInterceptorHooks, 允许 invoke 中再次调用 addInterceptor,removeInterceptor
        return api.apply(void 0, [wrapperOptions(getApiInterceptorHooks(method), options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}
var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  }
};
var SYNC_API_RE = /^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale|invokePushCallback|getWindowInfo|getDeviceInfo|getAppBaseInfo|getSystemSetting|getAppAuthorizeSetting|initUTS|requireUTS|registerUTS/;
var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection', 'createPushMessage'];
var CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}
function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).catch(function (err) {
    return [err];
  });
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(function (value) {
      return promise.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return promise.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };
}
function promisify(name, api) {
  if (!shouldPromise(name) || !isFn(api)) {
    return api;
  }
  return function promiseApi() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      params[_key2 - 1] = arguments[_key2];
    }
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject
      })].concat(params));
    })));
  };
}
var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;
function checkDeviceWidth() {
  var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
    platform = _wx$getSystemInfoSync.platform,
    pixelRatio = _wx$getSystemInfoSync.pixelRatio,
    windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}
function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}
var LOCALE_ZH_HANS = 'zh-Hans';
var LOCALE_ZH_HANT = 'zh-Hant';
var LOCALE_EN = 'en';
var LOCALE_FR = 'fr';
var LOCALE_ES = 'es';
var messages = {};
var locale;
{
  locale = normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}
function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}
initI18nMessages();
var i18n = (0, _uniI18n.initVueI18n)(locale, {});
var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {
    var _this = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    }
  }
};
var setLocale = i18n.setLocale;
var getLocale = i18n.getLocale;
function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale()
  });
  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {
        return watch(v);
      });
    }
  });
}
function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

function getLocale$1() {
  // 优先使用 $locale
  if (isFn(getApp)) {
    var app = getApp({
      allowDefault: true
    });
    if (app && app.$vm) {
      return app.$vm.$locale;
    }
  }
  return normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}
function setLocale$1(locale) {
  var app = isFn(getApp) ? getApp() : false;
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {
      return fn({
        locale: locale
      });
    });
    return true;
  }
  return false;
}
var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}
if (typeof global !== 'undefined') {
  global.getLocale = getLocale$1;
}
var interceptors = {
  promiseInterceptor: promiseInterceptor
};
var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale$1,
  setLocale: setLocale$1,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors
});
function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}
var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  }
};
var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(function (item, index) {
        return index < currentIndex ? item !== urls[currentIndex] : true;
      });
    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function useDeviceId(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId
    });
  }
  result.deviceId = deviceId;
}
function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.screenHeight - safeArea.bottom
    };
  }
}
function populateParameters(result) {
  var _result$brand = result.brand,
    brand = _result$brand === void 0 ? '' : _result$brand,
    _result$model = result.model,
    model = _result$model === void 0 ? '' : _result$model,
    _result$system = result.system,
    system = _result$system === void 0 ? '' : _result$system,
    _result$language = result.language,
    language = _result$language === void 0 ? '' : _result$language,
    theme = result.theme,
    version = result.version,
    platform = result.platform,
    fontSizeSetting = result.fontSizeSetting,
    SDKVersion = result.SDKVersion,
    pixelRatio = result.pixelRatio,
    deviceOrientation = result.deviceOrientation;
  // const isQuickApp = "mp-weixin".indexOf('quickapp-webview') !== -1

  var extraParam = {};

  // osName osVersion
  var osName = '';
  var osVersion = '';
  {
    osName = system.split(' ')[0] || '';
    osVersion = system.split(' ')[1] || '';
  }
  var hostVersion = version;

  // deviceType
  var deviceType = getGetDeviceType(result, model);

  // deviceModel
  var deviceBrand = getDeviceBrand(brand);

  // hostName
  var _hostName = getHostName(result);

  // deviceOrientation
  var _deviceOrientation = deviceOrientation; // 仅 微信 百度 支持

  // devicePixelRatio
  var _devicePixelRatio = pixelRatio;

  // SDKVersion
  var _SDKVersion = SDKVersion;

  // hostLanguage
  var hostLanguage = language.replace(/_/g, '-');

  // wx.getAccountInfoSync

  var parameters = {
    appId: "__UNI__72C933A",
    appName: "SecondHandMall_before",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "3.99",
    uniRuntimeVersion: "3.99",
    uniPlatform: undefined || "mp-weixin",
    deviceBrand: deviceBrand,
    deviceModel: model,
    deviceType: deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion: osVersion,
    hostTheme: theme,
    hostVersion: hostVersion,
    hostLanguage: hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: undefined,
    osTheme: undefined,
    ua: undefined,
    hostPackageName: undefined,
    browserName: undefined,
    browserVersion: undefined
  };
  Object.assign(result, parameters, extraParam);
}
function getGetDeviceType(result, model) {
  var deviceType = result.deviceType || 'phone';
  {
    var deviceTypeMaps = {
      ipad: 'pad',
      windows: 'pc',
      mac: 'pc'
    };
    var deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    var _model = model.toLocaleLowerCase();
    for (var index = 0; index < deviceTypeMapsKeys.length; index++) {
      var _m = deviceTypeMapsKeys[index];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  var deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = brand.toLocaleLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale$1 ? getLocale$1() : defaultLanguage;
}
function getHostName(result) {
  var _platform = 'WeChat';
  var _hostName = result.hostName || _platform; // mp-jd
  {
    if (result.environment) {
      _hostName = result.environment;
    } else if (result.host && result.host.env) {
      _hostName = result.host.env;
    }
  }
  return _hostName;
}
var getSystemInfo = {
  returnValue: function returnValue(result) {
    useDeviceId(result);
    addSafeAreaInsets(result);
    populateParameters(result);
  }
};
var showActionSheet = {
  args: function args(fromArgs) {
    if ((0, _typeof2.default)(fromArgs) === 'object') {
      fromArgs.alertText = fromArgs.title;
    }
  }
};
var getAppBaseInfo = {
  returnValue: function returnValue(result) {
    var _result = result,
      version = _result.version,
      language = _result.language,
      SDKVersion = _result.SDKVersion,
      theme = _result.theme;
    var _hostName = getHostName(result);
    var hostLanguage = language.replace('_', '-');
    result = sortObject(Object.assign(result, {
      appId: "__UNI__72C933A",
      appName: "SecondHandMall_before",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage),
      hostVersion: version,
      hostLanguage: hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme
    }));
  }
};
var getDeviceInfo = {
  returnValue: function returnValue(result) {
    var _result2 = result,
      brand = _result2.brand,
      model = _result2.model;
    var deviceType = getGetDeviceType(result, model);
    var deviceBrand = getDeviceBrand(brand);
    useDeviceId(result);
    result = sortObject(Object.assign(result, {
      deviceType: deviceType,
      deviceBrand: deviceBrand,
      deviceModel: model
    }));
  }
};
var getWindowInfo = {
  returnValue: function returnValue(result) {
    addSafeAreaInsets(result);
    result = sortObject(Object.assign(result, {
      windowTop: 0,
      windowBottom: 0
    }));
  }
};
var getAppAuthorizeSetting = {
  returnValue: function returnValue(result) {
    var locationReducedAccuracy = result.locationReducedAccuracy;
    result.locationAccuracy = 'unsupported';
    if (locationReducedAccuracy === true) {
      result.locationAccuracy = 'reduced';
    } else if (locationReducedAccuracy === false) {
      result.locationAccuracy = 'full';
    }
  }
};

// import navigateTo from 'uni-helpers/navigate-to'

var compressImage = {
  args: function args(fromArgs) {
    // https://developers.weixin.qq.com/community/develop/doc/000c08940c865011298e0a43256800?highLine=compressHeight
    if (fromArgs.compressedHeight && !fromArgs.compressHeight) {
      fromArgs.compressHeight = fromArgs.compressedHeight;
    }
    if (fromArgs.compressedWidth && !fromArgs.compressWidth) {
      fromArgs.compressWidth = fromArgs.compressedWidth;
    }
  }
};
var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  showActionSheet: showActionSheet,
  getAppBaseInfo: getAppBaseInfo,
  getDeviceInfo: getDeviceInfo,
  getWindowInfo: getWindowInfo,
  getAppAuthorizeSetting: getAppAuthorizeSetting,
  compressImage: compressImage
};
var todos = ['vibrate', 'preloadPage', 'unPreloadPage', 'loadSubPackage'];
var canIUses = [];
var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];
function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}
function processArgs(methodName, fromArgs) {
  var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {
    // 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {
          // 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {
          // 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {
          // {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}
function processReturnValue(methodName, res, returnValue) {
  var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {
    // 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}
function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {
      // 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {
      // 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {
        // 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}
var todoApis = Object.create(null);
var TODOS = ['onTabBarMidButtonTap', 'subscribePush', 'unsubscribePush', 'onPush', 'offPush', 'share'];
function createTodoApi(name) {
  return function todoApi(_ref) {
    var fail = _ref.fail,
      complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported")
    };
    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}
TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});
var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin']
};
function getProvider(_ref2) {
  var service = _ref2.service,
    success = _ref2.success,
    fail = _ref2.fail,
    complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service]
    };
    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found'
    };
    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}
var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider
});
var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();
function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}
function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}
var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit
});

/**
 * 框架内 try-catch
 */
/**
 * 开发者 try-catch
 */
function tryCatch(fn) {
  return function () {
    try {
      return fn.apply(fn, arguments);
    } catch (e) {
      // TODO
      console.error(e);
    }
  };
}
function getApiCallbacks(params) {
  var apiCallbacks = {};
  for (var name in params) {
    var param = params[name];
    if (isFn(param)) {
      apiCallbacks[name] = tryCatch(param);
      delete params[name];
    }
  }
  return apiCallbacks;
}
var cid;
var cidErrMsg;
var enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e) {}
  return message;
}
function invokePushCallback(args) {
  if (args.type === 'enabled') {
    enabled = true;
  } else if (args.type === 'clientId') {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === 'pushMsg') {
    var message = {
      type: 'receive',
      data: normalizePushMessage(args.message)
    };
    for (var i = 0; i < onPushMessageCallbacks.length; i++) {
      var callback = onPushMessageCallbacks[i];
      callback(message);
      // 该消息已被阻止
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === 'click') {
    onPushMessageCallbacks.forEach(function (callback) {
      callback({
        type: 'click',
        data: normalizePushMessage(args.message)
      });
    });
  }
}
var getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid, errMsg) {
  getPushCidCallbacks.forEach(function (callback) {
    callback(cid, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
function getPushClientId(args) {
  if (!isPlainObject(args)) {
    args = {};
  }
  var _getApiCallbacks = getApiCallbacks(args),
    success = _getApiCallbacks.success,
    fail = _getApiCallbacks.fail,
    complete = _getApiCallbacks.complete;
  var hasSuccess = isFn(success);
  var hasFail = isFn(fail);
  var hasComplete = isFn(complete);
  Promise.resolve().then(function () {
    if (typeof enabled === 'undefined') {
      enabled = false;
      cid = '';
      cidErrMsg = 'uniPush is not enabled';
    }
    getPushCidCallbacks.push(function (cid, errMsg) {
      var res;
      if (cid) {
        res = {
          errMsg: 'getPushClientId:ok',
          cid: cid
        };
        hasSuccess && success(res);
      } else {
        res = {
          errMsg: 'getPushClientId:fail' + (errMsg ? ' ' + errMsg : '')
        };
        hasFail && fail(res);
      }
      hasComplete && complete(res);
    });
    if (typeof cid !== 'undefined') {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
}
var onPushMessageCallbacks = [];
// 不使用 defineOnApi 实现，是因为 defineOnApi 依赖 UniServiceJSBridge ，该对象目前在小程序上未提供，故简单实现
var onPushMessage = function onPushMessage(fn) {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
var offPushMessage = function offPushMessage(fn) {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    var index = onPushMessageCallbacks.indexOf(fn);
    if (index > -1) {
      onPushMessageCallbacks.splice(index, 1);
    }
  }
};
var baseInfo = wx.getAppBaseInfo && wx.getAppBaseInfo();
if (!baseInfo) {
  baseInfo = wx.getSystemInfoSync();
}
var host = baseInfo ? baseInfo.host : null;
var shareVideoMessage = host && host.env === 'SAAASDK' ? wx.miniapp.shareVideoMessage : wx.shareVideoMessage;
var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  shareVideoMessage: shareVideoMessage,
  getPushClientId: getPushClientId,
  onPushMessage: onPushMessage,
  offPushMessage: offPushMessage,
  invokePushCallback: invokePushCallback
});
var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];
function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
function initBehavior(options) {
  return Behavior(options);
}
function isPage() {
  return !!this.route;
}
function initRelation(detail) {
  this.triggerEvent('__l', detail);
}
function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector) || [];
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || toSkip(component);
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}
function syncRefs(refs, newRefs) {
  var oldKeys = (0, _construct2.default)(Set, (0, _toConsumableArray2.default)(Object.keys(refs)));
  var newKeys = Object.keys(newRefs);
  newKeys.forEach(function (key) {
    var oldValue = refs[key];
    var newValue = newRefs[key];
    if (Array.isArray(oldValue) && Array.isArray(newValue) && oldValue.length === newValue.length && newValue.every(function (value) {
      return oldValue.includes(value);
    })) {
      return;
    }
    refs[key] = newValue;
    oldKeys.delete(key);
  });
  oldKeys.forEach(function (key) {
    delete refs[key];
  });
  return refs;
}
function initRefs(vm) {
  var mpInstance = vm.$scope;
  var refs = {};
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for') || [];
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || toSkip(component));
      });
      return syncRefs(refs, $refs);
    }
  });
}
function handleLink(event) {
  var _ref3 = event.detail || event.value,
    vuePid = _ref3.vuePid,
    vueOptions = _ref3.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  vueOptions.parent = parentVm;
}
function markMPComponent(component) {
  // 在 Vue 中标记为小程序组件
  var IS_MP = '__v_isMPComponent';
  Object.defineProperty(component, IS_MP, {
    configurable: true,
    enumerable: false,
    value: true
  });
  return component;
}
function toSkip(obj) {
  var OB = '__ob__';
  var SKIP = '__v_skip';
  if (isObject(obj) && Object.isExtensible(obj)) {
    // 避免被 @vue/composition-api 观测
    Object.defineProperty(obj, OB, {
      configurable: true,
      enumerable: false,
      value: (0, _defineProperty2.default)({}, SKIP, true)
    });
  }
  return obj;
}
var WORKLET_RE = /_(.*)_worklet_factory_/;
function initWorkletMethods(mpMethods, vueMethods) {
  if (vueMethods) {
    Object.keys(vueMethods).forEach(function (name) {
      var matches = name.match(WORKLET_RE);
      if (matches) {
        var workletName = matches[1];
        mpMethods[name] = vueMethods[name];
        mpMethods[workletName] = vueMethods[workletName];
      }
    });
  }
}
var MPPage = Page;
var MPComponent = Component;
var customizeRE = /:/g;
var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});
function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    // 事件名统一转驼峰格式，仅处理：当前组件为 vue 组件、当前组件为 vue 组件子组件
    if (this.$vm || this.dataset && this.dataset.comType) {
      event = customize(event);
    } else {
      // 针对微信/QQ小程序单独补充驼峰格式事件，以兼容历史项目
      var newEvent = customize(event);
      if (newEvent !== event) {
        oldTriggerEvent.apply(this, [newEvent].concat(args));
      }
    }
    return oldTriggerEvent.apply(this, [event].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}
function initHook(name, options, isComponent) {
  var oldHook = options[name];
  options[name] = function () {
    markMPComponent(this);
    initTriggerEvent(this);
    if (oldHook) {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      return oldHook.apply(this, args);
    }
  };
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;
  Component = function Component() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}
var PAGE_EVENT_HOOKS = ['onPullDownRefresh', 'onReachBottom', 'onAddToFavorites', 'onShareTimeline', 'onShareAppMessage', 'onPageScroll', 'onResize', 'onTabItemTap'];
function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}
function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }
  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }
  vueOptions = vueOptions.default || vueOptions;
  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super && vueOptions.super.options && Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }
  if (isFn(vueOptions[hook]) || Array.isArray(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {
      return hasHook(hook, mixin);
    });
  }
}
function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}
function initUnknownHooks(mpOptions, vueOptions) {
  var excludes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  findHooks(vueOptions).forEach(function (hook) {
    return initHook$1(mpOptions, hook, excludes);
  });
}
function findHooks(vueOptions) {
  var hooks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (vueOptions) {
    Object.keys(vueOptions).forEach(function (name) {
      if (name.indexOf('on') === 0 && isFn(vueOptions[name])) {
        hooks.push(name);
      }
    });
  }
  return hooks;
}
function initHook$1(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function (args) {
      return this.$vm && this.$vm.__call_hook(hook, args);
    };
  }
}
function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}
function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}
function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;
  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}
function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};
  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"SecondHandMall_before","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }
  if (!isPlainObject(data)) {
    data = {};
  }
  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });
  return data;
}
var PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;
  var vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: ''
          };
          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ''
          };
        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(initBehavior({
      properties: initProperties(vueExtends.props, true)
    }));
  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(initBehavior({
          properties: initProperties(vueMixin.props, true)
        }));
      }
    });
  }
  return behaviors;
}
function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function initProperties(props) {
  var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var options = arguments.length > 3 ? arguments[3] : undefined;
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: ''
    };
    {
      if (options.virtualHost) {
        properties.virtualHostStyle = {
          type: null,
          value: ''
        };
        properties.virtualHostClass = {
          type: null,
          value: ''
        };
      }
    }
    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: ''
    };
    properties.vueSlots = {
      // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots
        });
      }
    };
  }
  if (Array.isArray(props)) {
    // ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key)
      };
    });
  } else if (isPlainObject(props)) {
    // {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {
        // title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }
        opts.type = parsePropType(key, opts.type);
        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key)
        };
      } else {
        // content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key)
        };
      }
    });
  }
  return properties;
}
function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}
  event.stopPropagation = noop;
  event.preventDefault = noop;
  event.target = event.target || {};
  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }
  if (hasOwn(event, 'markerId')) {
    event.detail = (0, _typeof2.default)(event.detail) === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }
  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }
  return event;
}
function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {
      // ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];
      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }
      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }
      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}
function processEventExtra(vm, extra, event, __args__) {
  var extraObj = {};
  if (Array.isArray(extra) && extra.length) {
    /**
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *'test'
     */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {
          // model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {
            // $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            extraObj['$' + index] = event.detail ? event.detail.__args__ || __args__ : __args__;
          } else if (dataPath.indexOf('$event.') === 0) {
            // $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }
  return extraObj;
}
function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}
function processEventArgs(vm, event) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var isCustom = arguments.length > 4 ? arguments[4] : undefined;
  var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象

  // fixed 用户直接触发 mpInstance.triggerEvent
  var __args__ = isPlainObject(event.detail) ? event.detail.__args__ || [event.detail] : [event.detail];
  if (isCustom) {
    // 自定义事件
    isCustomMPEvent = event.currentTarget && event.currentTarget.dataset && event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {
      // 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return __args__;
    }
  }
  var extraObj = processEventExtra(vm, extra, event, __args__);
  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {
        // input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(__args__[0]);
        } else {
          // wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });
  return ret;
}
var ONCE = '~';
var CUSTOM = '^';
function isMatchEventType(eventType, optType) {
  return eventType === optType || optType === 'regionchange' && (eventType === 'begin' || eventType === 'end');
}
function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}
function handleEvent(event) {
  var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;
  var ret = [];
  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];
    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;
    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {
            // mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx, processEventArgs(_this2.$vm, event, eventArray[1], eventArray[2], isCustom, methodName));
            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            var _type = _this2.$vm.mpType === 'page' ? 'Page' : 'Component';
            var path = _this2.route || _this2.is;
            throw new Error("".concat(_type, " \"").concat(path, "\" does not have a method \"").concat(methodName, "\""));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(_this2.$vm, event, eventArray[1], eventArray[2], isCustom, methodName);
          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });
  if (eventType === 'input' && ret.length === 1 && typeof ret[0] !== 'undefined') {
    return ret[0];
  }
}
var eventChannels = {};
function getEventChannel(id) {
  var eventChannel = eventChannels[id];
  delete eventChannels[id];
  return eventChannel;
}
var hooks = ['onShow', 'onHide', 'onError', 'onPageNotFound', 'onThemeChange', 'onUnhandledRejection'];
function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}
function initScopedSlotsParams() {
  var center = {};
  var parents = {};
  function currentId(fn) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      fn(vueId);
    }
  }
  _vue.default.prototype.$hasSSP = function (vueId) {
    var slot = center[vueId];
    if (!slot) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return slot;
  };
  _vue.default.prototype.$getSSP = function (vueId, name, needAll) {
    var slot = center[vueId];
    if (slot) {
      var params = slot[name] || [];
      if (needAll) {
        return params;
      }
      return params[0];
    }
  };
  _vue.default.prototype.$setSSP = function (name, value) {
    var index = 0;
    currentId.call(this, function (vueId) {
      var slot = center[vueId];
      var params = slot[name] = slot[name] || [];
      params.push(value);
      index = params.length - 1;
    });
    return index;
  };
  _vue.default.prototype.$initSSP = function () {
    currentId.call(this, function (vueId) {
      center[vueId] = {};
    });
  };
  _vue.default.prototype.$callSSP = function () {
    currentId.call(this, function (vueId) {
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    });
  };
  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    }
  });
}
function parseBaseApp(vm, _ref4) {
  var mocks = _ref4.mocks,
    initRefs = _ref4.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);
  _vue.default.prototype.mpHost = "mp-weixin";
  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }
      this.mpType = this.$options.mpType;
      this.$mp = (0, _defineProperty2.default)({
        data: {}
      }, this.mpType, this.$options.mpInstance);
      this.$scope = this.$options.mpInstance;
      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {
        // hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    }
  });
  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {
        // 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {
          // 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }
      this.$vm = vm;
      this.$vm.$mp = {
        app: this
      };
      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;
      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);
      this.$vm.__call_hook('onLaunch', args);
    }
  };

  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }
  initAppLocale(_vue.default, vm, normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN);
  initHooks(appOptions, hooks);
  initUnknownHooks(appOptions, vm.$options);
  return appOptions;
}
function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs
  });
}
function createApp(vm) {
  App(parseApp(vm));
  return vm;
}
var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {
  return '%' + c.charCodeAt(0).toString(16);
};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {
  return encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ',');
};
function stringifyQuery(obj) {
  var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];
    if (val === undefined) {
      return '';
    }
    if (val === null) {
      return encodeStr(key);
    }
    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }
    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {
    return x.length > 0;
  }).join('&') : null;
  return res ? "?".concat(res) : '';
}
function parseBaseComponent(vueComponentOptions) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    isPage = _ref5.isPage,
    initRelation = _ref5.initRelation;
  var needVueOptions = arguments.length > 2 ? arguments[2] : undefined;
  var _initVueComponent = initVueComponent(_vue.default, vueComponentOptions),
    _initVueComponent2 = (0, _slicedToArray2.default)(_initVueComponent, 2),
    VueComponent = _initVueComponent2[0],
    vueOptions = _initVueComponent2[1];
  var options = _objectSpread({
    multipleSlots: true,
    // styleIsolation: 'apply-shared',
    addGlobalClass: true
  }, vueOptions.options || {});
  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }
  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file, options),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;
        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties
        };
        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options
        });

        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      }
    },
    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      }
    },
    methods: {
      __l: handleLink,
      __e: handleEvent
    }
  };
  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }
  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }
  if (needVueOptions) {
    return [componentOptions, vueOptions, VueComponent];
  }
  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}
function parseComponent(vueComponentOptions, needVueOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation
  }, needVueOptions);
}
var hooks$1 = ['onShow', 'onHide', 'onUnload'];
hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);
function parseBasePage(vuePageOptions) {
  var _parseComponent = parseComponent(vuePageOptions, true),
    _parseComponent2 = (0, _slicedToArray2.default)(_parseComponent, 2),
    pageOptions = _parseComponent2[0],
    vueOptions = _parseComponent2[1];
  initHooks(pageOptions.methods, hooks$1, vueOptions);
  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery)
    };
    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };
  {
    initUnknownHooks(pageOptions.methods, vuePageOptions, ['onReady']);
  }
  {
    initWorkletMethods(pageOptions.methods, vueOptions.methods);
  }
  return pageOptions;
}
function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions);
}
function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}
function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}
function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true
  });
  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});
canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name : canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});
var uni = {};
if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    }
  });
} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });
  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, extraApi[name]);
    });
  }
  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });
  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });
  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}
wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;
var uni$1 = uni;
var _default = uni$1;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 5 */
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles.js */ 6);
var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit.js */ 7);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 8);
var nonIterableRest = __webpack_require__(/*! ./nonIterableRest.js */ 10);
function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}
module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 6 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 7 */
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) {
        ;
      }
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 8 */
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 9);
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 9 */
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 10 */
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 11 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 12);
function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 12 */
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPropertyKey.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
var toPrimitive = __webpack_require__(/*! ./toPrimitive.js */ 14);
function _toPropertyKey(arg) {
  var key = toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
module.exports = _toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 13 */
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 14 */
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPrimitive.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
module.exports = _toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 15 */
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/construct.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ 16);
var isNativeReflectConstruct = __webpack_require__(/*! ./isNativeReflectConstruct.js */ 17);
function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct.bind(), module.exports.__esModule = true, module.exports["default"] = module.exports;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
  return _construct.apply(null, arguments);
}
module.exports = _construct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 16 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _setPrototypeOf(o, p);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 17 */
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
module.exports = _isNativeReflectConstruct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 18 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles.js */ 19);
var iterableToArray = __webpack_require__(/*! ./iterableToArray.js */ 20);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 8);
var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread.js */ 21);
function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}
module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 19 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 9);
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}
module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 20 */
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 21 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 22 */
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;
exports.compileI18nJsonStr = compileI18nJsonStr;
exports.hasI18nJson = hasI18nJson;
exports.initVueI18n = initVueI18n;
exports.isI18nStr = isI18nStr;
exports.isString = void 0;
exports.normalizeLocale = normalizeLocale;
exports.parseI18nJson = parseI18nJson;
exports.resolveLocale = resolveLocale;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 24));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var isObject = function isObject(val) {
  return val !== null && (0, _typeof2.default)(val) === 'object';
};
var defaultDelimiters = ['{', '}'];
var BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {
    (0, _classCallCheck2.default)(this, BaseFormatter);
    this._caches = Object.create(null);
  }
  (0, _createClass2.default)(BaseFormatter, [{
    key: "interpolate",
    value: function interpolate(message, values) {
      var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    }
  }]);
  return BaseFormatter;
}();
exports.Formatter = BaseFormatter;
var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {
  var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
    startDelimiter = _ref2[0],
    endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({
          type: 'text',
          value: text
        });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ? 'list' : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? 'named' : 'unknown';
      tokens.push({
        value: sub,
        type: type
      });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
      text += char;
    }
  }
  text && tokens.push({
    type: 'text',
    value: text
  });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = Array.isArray(values) ? 'list' : isObject(values) ? 'named' : 'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;
    }
    index++;
  }
  return compiled;
}
var LOCALE_ZH_HANS = 'zh-Hans';
exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';
exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';
exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';
exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';
exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {
  return hasOwnProperty.call(val, key);
};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
  if (messages && Object.keys(messages).length > 0) {
    locales = Object.keys(messages);
  }
  var lang = startsWith(locale, locales);
  if (lang) {
    return lang;
  }
}
var I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {
    var locale = _ref3.locale,
      fallbackLocale = _ref3.fallbackLocale,
      messages = _ref3.messages,
      watcher = _ref3.watcher,
      formater = _ref3.formater;
    (0, _classCallCheck2.default)(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }
  (0, _createClass2.default)(I18n, [{
    key: "setLocale",
    value: function setLocale(locale) {
      var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    }
  }, {
    key: "getLocale",
    value: function getLocale() {
      return this.locale;
    }
  }, {
    key: "watchLocale",
    value: function watchLocale(fn) {
      var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    }
  }, {
    key: "add",
    value: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else {
        this.messages[locale] = message;
      }
    }
  }, {
    key: "f",
    value: function f(message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    }
  }, {
    key: "t",
    value: function t(key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    }
  }]);
  return I18n;
}();
exports.I18n = I18n;
function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else {
    appVm.$watch(function () {
      return appVm.$locale;
    }, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {
  var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;
  var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {
    var _ref4 = [messages, locale];
    locale = _ref4[0];
    messages = _ref4[1];
  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale = typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale || LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher
  });
  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    }
  };
}
var isString = function isString(val) {
  return typeof val === 'string';
};
exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {
  var locale = _ref5.locale,
    locales = _ref5.locales,
    delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name]
      });
    }
  });
  localeValues.unshift({
    locale: locale,
    values: locales[locale]
  });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  } catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (Array.isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}
function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {
      return locales.indexOf(locale) > -1;
    });
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 23 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 24 */
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 12);
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 25 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2023 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue &&
    !value.__v_isMPComponent
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou' || vm.mpHost === 'mp-xhs'){//百度、快手、小红书 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
var NULLTYPE = '[object Null]';
var UNDEFINEDTYPE = '[object Undefined]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function nullOrUndefined(currentType, preType) {
    if(
        (currentType === NULLTYPE || currentType === UNDEFINEDTYPE) && 
        (preType === NULLTYPE || preType === UNDEFINEDTYPE)
    ) {
        return false
    }
    return true
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue !== pre[key] && nullOrUndefined(currentType, preType)) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"SecondHandMall_before","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"SecondHandMall_before","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"SecondHandMall_before","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function clearInstance(key, value) {
  // 简易去除 Vue 和小程序组件实例
  if (value) {
    if (value._isVue || value.__v_isMPComponent) {
      return {}
    }
  }
  return value
}

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret, clearInstance))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"SecondHandMall_before","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      var triggerEvent = this.$scope['_triggerEvent'] || this.$scope['triggerEvent'];
      if (triggerEvent) {
        try {
          triggerEvent.call(this.$scope, event, {
            __args__: toArray(arguments, 1)
          });
        } catch (error) {

        }
      }
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    'onUploadDouyinVideo',
    'onNFCReadMessage',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 26 */
/*!*************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/pages.json ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    if(typeof renderjs.beforeCreate === 'function'){
			renderjs.beforeCreate = [renderjs.beforeCreate]
		}
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 33 */
/*!*********************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/index.js ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _mixin = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mixin.js */ 34));
var _mpMixin = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mpMixin.js */ 35));
var _luchRequest = _interopRequireDefault(__webpack_require__(/*! ./libs/luch-request */ 36));
var _route = _interopRequireDefault(__webpack_require__(/*! ./libs/util/route.js */ 54));
var _colorGradient = _interopRequireDefault(__webpack_require__(/*! ./libs/function/colorGradient.js */ 58));
var _test = _interopRequireDefault(__webpack_require__(/*! ./libs/function/test.js */ 59));
var _debounce = _interopRequireDefault(__webpack_require__(/*! ./libs/function/debounce.js */ 60));
var _throttle = _interopRequireDefault(__webpack_require__(/*! ./libs/function/throttle.js */ 61));
var _index = _interopRequireDefault(__webpack_require__(/*! ./libs/function/index.js */ 62));
var _config = _interopRequireDefault(__webpack_require__(/*! ./libs/config/config.js */ 63));
var _props = _interopRequireDefault(__webpack_require__(/*! ./libs/config/props.js */ 64));
var _zIndex = _interopRequireDefault(__webpack_require__(/*! ./libs/config/zIndex.js */ 153));
var _color = _interopRequireDefault(__webpack_require__(/*! ./libs/config/color.js */ 154));
var _platform = _interopRequireDefault(__webpack_require__(/*! ./libs/function/platform */ 155));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var $u = _objectSpread(_objectSpread({
  route: _route.default,
  date: _index.default.timeFormat,
  // 另名date
  colorGradient: _colorGradient.default.colorGradient,
  hexToRgb: _colorGradient.default.hexToRgb,
  rgbToHex: _colorGradient.default.rgbToHex,
  colorToRgba: _colorGradient.default.colorToRgba,
  test: _test.default,
  type: ['primary', 'success', 'error', 'warning', 'info'],
  http: new _luchRequest.default(),
  config: _config.default,
  // uView配置信息相关，比如版本号
  zIndex: _zIndex.default,
  debounce: _debounce.default,
  throttle: _throttle.default,
  mixin: _mixin.default,
  mpMixin: _mpMixin.default,
  props: _props.default
}, _index.default), {}, {
  color: _color.default,
  platform: _platform.default
});

// $u挂载到uni对象上
uni.$u = $u;
var install = function install(Vue) {
  // 时间格式化，同时两个名称，date和timeFormat
  Vue.filter('timeFormat', function (timestamp, format) {
    return uni.$u.timeFormat(timestamp, format);
  });
  Vue.filter('date', function (timestamp, format) {
    return uni.$u.timeFormat(timestamp, format);
  });
  // 将多久以前的方法，注入到全局过滤器
  Vue.filter('timeFrom', function (timestamp, format) {
    return uni.$u.timeFrom(timestamp, format);
  });
  // 同时挂载到uni和Vue.prototype中

  // 只有vue，挂载到Vue.prototype才有意义，因为nvue中全局Vue.prototype和Vue.mixin是无效的
  Vue.prototype.$u = $u;
  Vue.mixin(_mixin.default);
};
var _default = {
  install: install
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 34 */
/*!********************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/mixin/mixin.js ***!
  \********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {module.exports = {
  // 定义每个组件都可能需要用到的外部样式以及类名
  props: {
    // 每个组件都有的父组件传递的样式，可以为字符串或者对象形式
    customStyle: {
      type: [Object, String],
      default: function _default() {
        return {};
      }
    },
    customClass: {
      type: String,
      default: ''
    },
    // 跳转的页面路径
    url: {
      type: String,
      default: ''
    },
    // 页面跳转的类型
    linkType: {
      type: String,
      default: 'navigateTo'
    }
  },
  data: function data() {
    return {};
  },
  onLoad: function onLoad() {
    // getRect挂载到$u上，因为这方法需要使用in(this)，所以无法把它独立成一个单独的文件导出
    this.$u.getRect = this.$uGetRect;
  },
  created: function created() {
    // 组件当中，只有created声明周期，为了能在组件使用，故也在created中将方法挂载到$u
    this.$u.getRect = this.$uGetRect;
  },
  computed: {
    // 在2.x版本中，将会把$u挂载到uni对象下，导致在模板中无法使用uni.$u.xxx形式
    // 所以这里通过computed计算属性将其附加到this.$u上，就可以在模板或者js中使用this.$u.xxx
    $u: function $u() {
      return uni.$u;
    },
    /**
    * 生成bem规则类名
    * 由于微信小程序，H5，nvue之间绑定class的差异，无法通过:class="[bem()]"的形式进行同用
    * 故采用如下折中做法，最后返回的是数组，类似['a', 'b', 'c']的形式
    * @param {String} name 组件名称
    * @param {Array} fixed 一直会存在的类名
    * @param {Array} change 会根据变量值为true或者false而出现或者隐藏的类名
    * @return Array
    */
    bem: function bem() {
      return function (name, fixed, change) {
        var _this = this;
        // 类名前缀
        var prefix = "u-".concat(name, "--");
        var classes = {};
        if (fixed) {
          fixed.map(function (item) {
            // 这里的类名，会一直存在
            classes[prefix + _this[item]] = true;
          });
        }
        if (change) {
          change.map(function (item) {
            // 这里的类名，会根据this[item]的值为true或者false，而进行添加或者移除某一个类
            _this[item] ? classes[prefix + item] = _this[item] : delete classes[prefix + item];
          });
        }
        return Object.keys(classes);
      };
    }
  },
  methods: {
    // 跳转某一个页面
    openPage: function openPage() {
      var urlKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'url';
      var url = this[urlKey];
      if (url) {
        // 执行类似uni.navigateTo的方法
        uni[this.linkType]({
          url: url
        });
      }
    },
    // 查询节点信息
    // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
    // 解决办法为在组件根部再套一个没有任何作用的view元素
    $uGetRect: function $uGetRect(selector, all) {
      var _this2 = this;
      return new Promise(function (resolve) {
        uni.createSelectorQuery().in(_this2)[all ? 'selectAll' : 'select'](selector).boundingClientRect(function (rect) {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }
          if (!all && rect) {
            resolve(rect);
          }
        }).exec();
      });
    },
    getParentData: function getParentData() {
      var _this3 = this;
      var parentName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      // 避免在created中去定义parent变量
      if (!this.parent) this.parent = {};
      // 这里的本质原理是，通过获取父组件实例(也即类似u-radio的父组件u-radio-group的this)
      // 将父组件this中对应的参数，赋值给本组件(u-radio的this)的parentData对象中对应的属性
      // 之所以需要这么做，是因为所有端中，头条小程序不支持通过this.parent.xxx去监听父组件参数的变化
      // 此处并不会自动更新子组件的数据，而是依赖父组件u-radio-group去监听data的变化，手动调用更新子组件的方法去重新获取
      this.parent = this.$u.$parent.call(this, parentName);
      if (this.parent.children) {
        // 如果父组件的children不存在本组件的实例，才将本实例添加到父组件的children中
        this.parent.children.indexOf(this) === -1 && this.parent.children.push(this);
      }
      if (this.parent && this.parentData) {
        // 历遍parentData中的属性，将parent中的同名属性赋值给parentData
        Object.keys(this.parentData).map(function (key) {
          _this3.parentData[key] = _this3.parent[key];
        });
      }
    },
    // 阻止事件冒泡
    preventEvent: function preventEvent(e) {
      e && typeof e.stopPropagation === 'function' && e.stopPropagation();
    },
    // 空操作
    noop: function noop(e) {
      this.preventEvent(e);
    }
  },
  onReachBottom: function onReachBottom() {
    uni.$emit('uOnReachBottom');
  },
  beforeDestroy: function beforeDestroy() {
    var _this4 = this;
    // 判断当前页面是否存在parent和chldren，一般在checkbox和checkbox-group父子联动的场景会有此情况
    // 组件销毁时，移除子组件在父组件children数组中的实例，释放资源，避免数据混乱
    if (this.parent && uni.$u.test.array(this.parent.children)) {
      // 组件销毁时，移除父组件中的children数组中对应的实例
      var childrenList = this.parent.children;
      childrenList.map(function (child, index) {
        // 如果相等，则移除
        if (child === _this4) {
          childrenList.splice(index, 1);
        }
      });
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 35 */
/*!**********************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/mixin/mpMixin.js ***!
  \**********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  // 将自定义节点设置成虚拟的，更加接近Vue组件的表现，能更好的使用flex属性
  options: {
    virtualHost: true
  }
};
exports.default = _default;

/***/ }),
/* 36 */
/*!***************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/luch-request/index.js ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Request = _interopRequireDefault(__webpack_require__(/*! ./core/Request */ 37));
var _default = _Request.default;
exports.default = _default;

/***/ }),
/* 37 */
/*!**********************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/luch-request/core/Request.js ***!
  \**********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 24));
var _dispatchRequest = _interopRequireDefault(__webpack_require__(/*! ./dispatchRequest */ 38));
var _InterceptorManager = _interopRequireDefault(__webpack_require__(/*! ./InterceptorManager */ 46));
var _mergeConfig = _interopRequireDefault(__webpack_require__(/*! ./mergeConfig */ 47));
var _defaults = _interopRequireDefault(__webpack_require__(/*! ./defaults */ 48));
var _utils = __webpack_require__(/*! ../utils */ 41);
var _clone = _interopRequireDefault(__webpack_require__(/*! ../utils/clone */ 49));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var Request = /*#__PURE__*/function () {
  /**
  * @param {Object} arg - 全局配置
  * @param {String} arg.baseURL - 全局根路径
  * @param {Object} arg.header - 全局header
  * @param {String} arg.method = [GET|POST|PUT|DELETE|CONNECT|HEAD|OPTIONS|TRACE] - 全局默认请求方式
  * @param {String} arg.dataType = [json] - 全局默认的dataType
  * @param {String} arg.responseType = [text|arraybuffer] - 全局默认的responseType。支付宝小程序不支持
  * @param {Object} arg.custom - 全局默认的自定义参数
  * @param {Number} arg.timeout - 全局默认的超时时间，单位 ms。默认60000。H5(HBuilderX 2.9.9+)、APP(HBuilderX 2.9.9+)、微信小程序（2.10.0）、支付宝小程序
  * @param {Boolean} arg.sslVerify - 全局默认的是否验证 ssl 证书。默认true.仅App安卓端支持（HBuilderX 2.3.3+）
  * @param {Boolean} arg.withCredentials - 全局默认的跨域请求时是否携带凭证（cookies）。默认false。仅H5支持（HBuilderX 2.6.15+）
  * @param {Boolean} arg.firstIpv4 - 全DNS解析时优先使用ipv4。默认false。仅 App-Android 支持 (HBuilderX 2.8.0+)
  * @param {Function(statusCode):Boolean} arg.validateStatus - 全局默认的自定义验证器。默认statusCode >= 200 && statusCode < 300
  */
  function Request() {
    var arg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2.default)(this, Request);
    if (!(0, _utils.isPlainObject)(arg)) {
      arg = {};
      console.warn('设置全局参数必须接收一个Object');
    }
    this.config = (0, _clone.default)(_objectSpread(_objectSpread({}, _defaults.default), arg));
    this.interceptors = {
      request: new _InterceptorManager.default(),
      response: new _InterceptorManager.default()
    };
  }

  /**
  * @Function
  * @param {Request~setConfigCallback} f - 设置全局默认配置
  */
  (0, _createClass2.default)(Request, [{
    key: "setConfig",
    value: function setConfig(f) {
      this.config = f(this.config);
    }
  }, {
    key: "middleware",
    value: function middleware(config) {
      config = (0, _mergeConfig.default)(this.config, config);
      var chain = [_dispatchRequest.default, undefined];
      var promise = Promise.resolve(config);
      this.interceptors.request.forEach(function (interceptor) {
        chain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      this.interceptors.response.forEach(function (interceptor) {
        chain.push(interceptor.fulfilled, interceptor.rejected);
      });
      while (chain.length) {
        promise = promise.then(chain.shift(), chain.shift());
      }
      return promise;
    }

    /**
    * @Function
    * @param {Object} config - 请求配置项
    * @prop {String} options.url - 请求路径
    * @prop {Object} options.data - 请求参数
    * @prop {Object} [options.responseType = config.responseType] [text|arraybuffer] - 响应的数据类型
    * @prop {Object} [options.dataType = config.dataType] - 如果设为 json，会尝试对返回的数据做一次 JSON.parse
    * @prop {Object} [options.header = config.header] - 请求header
    * @prop {Object} [options.method = config.method] - 请求方法
    * @returns {Promise<unknown>}
    */
  }, {
    key: "request",
    value: function request() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.middleware(config);
    }
  }, {
    key: "get",
    value: function get(url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.middleware(_objectSpread({
        url: url,
        method: 'GET'
      }, options));
    }
  }, {
    key: "post",
    value: function post(url, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'POST'
      }, options));
    }
  }, {
    key: "put",
    value: function put(url, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'PUT'
      }, options));
    }
  }, {
    key: "delete",
    value: function _delete(url, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'DELETE'
      }, options));
    }
  }, {
    key: "connect",
    value: function connect(url, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'CONNECT'
      }, options));
    }
  }, {
    key: "head",
    value: function head(url, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'HEAD'
      }, options));
    }
  }, {
    key: "options",
    value: function options(url, data) {
      var _options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'OPTIONS'
      }, _options));
    }
  }, {
    key: "trace",
    value: function trace(url, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'TRACE'
      }, options));
    }
  }, {
    key: "upload",
    value: function upload(url) {
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      config.url = url;
      config.method = 'UPLOAD';
      return this.middleware(config);
    }
  }, {
    key: "download",
    value: function download(url) {
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      config.url = url;
      config.method = 'DOWNLOAD';
      return this.middleware(config);
    }
  }]);
  return Request;
}();
/**
 * setConfig回调
 * @return {Object} - 返回操作后的config
 * @callback Request~setConfigCallback
 * @param {Object} config - 全局默认config
 */
exports.default = Request;

/***/ }),
/* 38 */
/*!******************************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/luch-request/core/dispatchRequest.js ***!
  \******************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = _interopRequireDefault(__webpack_require__(/*! ../adapters/index */ 39));
var _default = function _default(config) {
  return (0, _index.default)(config);
};
exports.default = _default;

/***/ }),
/* 39 */
/*!************************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/luch-request/adapters/index.js ***!
  \************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _buildURL = _interopRequireDefault(__webpack_require__(/*! ../helpers/buildURL */ 40));
var _buildFullPath = _interopRequireDefault(__webpack_require__(/*! ../core/buildFullPath */ 42));
var _settle = _interopRequireDefault(__webpack_require__(/*! ../core/settle */ 45));
var _utils = __webpack_require__(/*! ../utils */ 41);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/**
 * 返回可选值存在的配置
 * @param {Array} keys - 可选值数组
 * @param {Object} config2 - 配置
 * @return {{}} - 存在的配置项
 */
var mergeKeys = function mergeKeys(keys, config2) {
  var config = {};
  keys.forEach(function (prop) {
    if (!(0, _utils.isUndefined)(config2[prop])) {
      config[prop] = config2[prop];
    }
  });
  return config;
};
var _default = function _default(config) {
  return new Promise(function (resolve, reject) {
    var fullPath = (0, _buildURL.default)((0, _buildFullPath.default)(config.baseURL, config.url), config.params);
    var _config = {
      url: fullPath,
      header: config.header,
      complete: function complete(response) {
        config.fullPath = fullPath;
        response.config = config;
        try {
          // 对可能字符串不是json 的情况容错
          if (typeof response.data === 'string') {
            response.data = JSON.parse(response.data);
          }
          // eslint-disable-next-line no-empty
        } catch (e) {}
        (0, _settle.default)(resolve, reject, response);
      }
    };
    var requestTask;
    if (config.method === 'UPLOAD') {
      delete _config.header['content-type'];
      delete _config.header['Content-Type'];
      var otherConfig = {
        filePath: config.filePath,
        name: config.name
      };
      var optionalKeys = ['formData'];
      requestTask = uni.uploadFile(_objectSpread(_objectSpread(_objectSpread({}, _config), otherConfig), mergeKeys(optionalKeys, config)));
    } else if (config.method === 'DOWNLOAD') {
      requestTask = uni.downloadFile(_config);
    } else {
      var _optionalKeys = ['data', 'method', 'timeout', 'dataType', 'responseType'];
      requestTask = uni.request(_objectSpread(_objectSpread({}, _config), mergeKeys(_optionalKeys, config)));
    }
    if (config.getTask) {
      config.getTask(requestTask, config);
    }
  });
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 40 */
/*!**************************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/luch-request/helpers/buildURL.js ***!
  \**************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 13);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildURL;
var utils = _interopRequireWildcard(__webpack_require__(/*! ../utils */ 41));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function encode(val) {
  return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
function buildURL(url, params) {
  /* eslint no-param-reassign:0 */
  if (!params) {
    return url;
  }
  var serializedParams;
  if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];
    utils.forEach(params, function (val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }
      if (utils.isArray(val)) {
        key = "".concat(key, "[]");
      } else {
        val = [val];
      }
      utils.forEach(val, function (v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push("".concat(encode(key), "=").concat(encode(v)));
      });
    });
    serializedParams = parts.join('&');
  }
  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }
  return url;
}

/***/ }),
/* 41 */
/*!***************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/luch-request/utils.js ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// utils is a library of generic helper functions non-specific to axios
var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepMerge = deepMerge;
exports.forEach = forEach;
exports.isArray = isArray;
exports.isBoolean = isBoolean;
exports.isDate = isDate;
exports.isObject = isObject;
exports.isPlainObject = isPlainObject;
exports.isURLSearchParams = isURLSearchParams;
exports.isUndefined = isUndefined;
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && (0, _typeof2.default)(val) === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if ((0, _typeof2.default)(obj) !== 'object') {
    /* eslint no-param-reassign:0 */
    obj = [obj];
  }
  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * 是否为boolean 值
 * @param val
 * @returns {boolean}
 */
function isBoolean(val) {
  return typeof val === 'boolean';
}

/**
 * 是否为真正的对象{} new Object
 * @param {any} obj - 检测的对象
 * @returns {boolean}
 */
function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge( /* obj1, obj2, obj3, ... */
) {
  var result = {};
  function assignValue(val, key) {
    if ((0, _typeof2.default)(result[key]) === 'object' && (0, _typeof2.default)(val) === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if ((0, _typeof2.default)(val) === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }
  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}
function isUndefined(val) {
  return typeof val === 'undefined';
}

/***/ }),
/* 42 */
/*!****************************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/luch-request/core/buildFullPath.js ***!
  \****************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildFullPath;
var _isAbsoluteURL = _interopRequireDefault(__webpack_require__(/*! ../helpers/isAbsoluteURL */ 43));
var _combineURLs = _interopRequireDefault(__webpack_require__(/*! ../helpers/combineURLs */ 44));
/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !(0, _isAbsoluteURL.default)(requestedURL)) {
    return (0, _combineURLs.default)(baseURL, requestedURL);
  }
  return requestedURL;
}

/***/ }),
/* 43 */
/*!*******************************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/luch-request/helpers/isAbsoluteURL.js ***!
  \*******************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isAbsoluteURL;
function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

/***/ }),
/* 44 */
/*!*****************************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/luch-request/helpers/combineURLs.js ***!
  \*****************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = combineURLs;
function combineURLs(baseURL, relativeURL) {
  return relativeURL ? "".concat(baseURL.replace(/\/+$/, ''), "/").concat(relativeURL.replace(/^\/+/, '')) : baseURL;
}

/***/ }),
/* 45 */
/*!*********************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/luch-request/core/settle.js ***!
  \*********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = settle;
/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  var status = response.statusCode;
  if (status && (!validateStatus || validateStatus(status))) {
    resolve(response);
  } else {
    reject(response);
  }
}

/***/ }),
/* 46 */
/*!*********************************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/luch-request/core/InterceptorManager.js ***!
  \*********************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  this.handlers.forEach(function (h) {
    if (h !== null) {
      fn(h);
    }
  });
};
var _default = InterceptorManager;
exports.default = _default;

/***/ }),
/* 47 */
/*!**************************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/luch-request/core/mergeConfig.js ***!
  \**************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _utils = __webpack_require__(/*! ../utils */ 41);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/**
 * 合并局部配置优先的配置，如果局部有该配置项则用局部，如果全局有该配置项则用全局
 * @param {Array} keys - 配置项
 * @param {Object} globalsConfig - 当前的全局配置
 * @param {Object} config2 - 局部配置
 * @return {{}}
 */
var mergeKeys = function mergeKeys(keys, globalsConfig, config2) {
  var config = {};
  keys.forEach(function (prop) {
    if (!(0, _utils.isUndefined)(config2[prop])) {
      config[prop] = config2[prop];
    } else if (!(0, _utils.isUndefined)(globalsConfig[prop])) {
      config[prop] = globalsConfig[prop];
    }
  });
  return config;
};
/**
 *
 * @param globalsConfig - 当前实例的全局配置
 * @param config2 - 当前的局部配置
 * @return - 合并后的配置
 */
var _default = function _default(globalsConfig) {
  var config2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var method = config2.method || globalsConfig.method || 'GET';
  var config = {
    baseURL: globalsConfig.baseURL || '',
    method: method,
    url: config2.url || '',
    params: config2.params || {},
    custom: _objectSpread(_objectSpread({}, globalsConfig.custom || {}), config2.custom || {}),
    header: (0, _utils.deepMerge)(globalsConfig.header || {}, config2.header || {})
  };
  var defaultToConfig2Keys = ['getTask', 'validateStatus'];
  config = _objectSpread(_objectSpread({}, config), mergeKeys(defaultToConfig2Keys, globalsConfig, config2));

  // eslint-disable-next-line no-empty
  if (method === 'DOWNLOAD') {} else if (method === 'UPLOAD') {
    delete config.header['content-type'];
    delete config.header['Content-Type'];
    var uploadKeys = ['filePath', 'name', 'formData'];
    uploadKeys.forEach(function (prop) {
      if (!(0, _utils.isUndefined)(config2[prop])) {
        config[prop] = config2[prop];
      }
    });
  } else {
    var defaultsKeys = ['data', 'timeout', 'dataType', 'responseType'];
    config = _objectSpread(_objectSpread({}, config), mergeKeys(defaultsKeys, globalsConfig, config2));
  }
  return config;
};
exports.default = _default;

/***/ }),
/* 48 */
/*!***********************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/luch-request/core/defaults.js ***!
  \***********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * 默认的全局配置
 */
var _default = {
  baseURL: '',
  header: {},
  method: 'GET',
  dataType: 'json',
  responseType: 'text',
  custom: {},
  timeout: 60000,
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};
exports.default = _default;

/***/ }),
/* 49 */
/*!*********************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/luch-request/utils/clone.js ***!
  \*********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
/* eslint-disable */
var clone = function () {
  'use strict';

  function _instanceof(obj, type) {
    return type != null && obj instanceof type;
  }
  var nativeMap;
  try {
    nativeMap = Map;
  } catch (_) {
    // maybe a reference error because no `Map`. Give it a dummy value that no
    // value will ever be an instanceof.
    nativeMap = function nativeMap() {};
  }
  var nativeSet;
  try {
    nativeSet = Set;
  } catch (_) {
    nativeSet = function nativeSet() {};
  }
  var nativePromise;
  try {
    nativePromise = Promise;
  } catch (_) {
    nativePromise = function nativePromise() {};
  }

  /**
   * Clones (copies) an Object using deep copying.
   *
   * This function supports circular references by default, but if you are certain
   * there are no circular references in your object, you can save some CPU time
   * by calling clone(obj, false).
   *
   * Caution: if `circular` is false and `parent` contains circular references,
   * your program may enter an infinite loop and crash.
   *
   * @param `parent` - the object to be cloned
   * @param `circular` - set to true if the object to be cloned may contain
   *    circular references. (optional - true by default)
   * @param `depth` - set to a number if the object is only to be cloned to
   *    a particular depth. (optional - defaults to Infinity)
   * @param `prototype` - sets the prototype to be used when cloning an object.
   *    (optional - defaults to parent prototype).
   * @param `includeNonEnumerable` - set to true if the non-enumerable properties
   *    should be cloned as well. Non-enumerable properties on the prototype
   *    chain will be ignored. (optional - false by default)
   */
  function clone(parent, circular, depth, prototype, includeNonEnumerable) {
    if ((0, _typeof2.default)(circular) === 'object') {
      depth = circular.depth;
      prototype = circular.prototype;
      includeNonEnumerable = circular.includeNonEnumerable;
      circular = circular.circular;
    }
    // maintain two arrays for circular references, where corresponding parents
    // and children have the same index
    var allParents = [];
    var allChildren = [];
    var useBuffer = typeof Buffer != 'undefined';
    if (typeof circular == 'undefined') circular = true;
    if (typeof depth == 'undefined') depth = Infinity;

    // recurse this function so we don't reset allParents and allChildren
    function _clone(parent, depth) {
      // cloning null always returns null
      if (parent === null) return null;
      if (depth === 0) return parent;
      var child;
      var proto;
      if ((0, _typeof2.default)(parent) != 'object') {
        return parent;
      }
      if (_instanceof(parent, nativeMap)) {
        child = new nativeMap();
      } else if (_instanceof(parent, nativeSet)) {
        child = new nativeSet();
      } else if (_instanceof(parent, nativePromise)) {
        child = new nativePromise(function (resolve, reject) {
          parent.then(function (value) {
            resolve(_clone(value, depth - 1));
          }, function (err) {
            reject(_clone(err, depth - 1));
          });
        });
      } else if (clone.__isArray(parent)) {
        child = [];
      } else if (clone.__isRegExp(parent)) {
        child = new RegExp(parent.source, __getRegExpFlags(parent));
        if (parent.lastIndex) child.lastIndex = parent.lastIndex;
      } else if (clone.__isDate(parent)) {
        child = new Date(parent.getTime());
      } else if (useBuffer && Buffer.isBuffer(parent)) {
        if (Buffer.from) {
          // Node.js >= 5.10.0
          child = Buffer.from(parent);
        } else {
          // Older Node.js versions
          child = new Buffer(parent.length);
          parent.copy(child);
        }
        return child;
      } else if (_instanceof(parent, Error)) {
        child = Object.create(parent);
      } else {
        if (typeof prototype == 'undefined') {
          proto = Object.getPrototypeOf(parent);
          child = Object.create(proto);
        } else {
          child = Object.create(prototype);
          proto = prototype;
        }
      }
      if (circular) {
        var index = allParents.indexOf(parent);
        if (index != -1) {
          return allChildren[index];
        }
        allParents.push(parent);
        allChildren.push(child);
      }
      if (_instanceof(parent, nativeMap)) {
        parent.forEach(function (value, key) {
          var keyChild = _clone(key, depth - 1);
          var valueChild = _clone(value, depth - 1);
          child.set(keyChild, valueChild);
        });
      }
      if (_instanceof(parent, nativeSet)) {
        parent.forEach(function (value) {
          var entryChild = _clone(value, depth - 1);
          child.add(entryChild);
        });
      }
      for (var i in parent) {
        var attrs = Object.getOwnPropertyDescriptor(parent, i);
        if (attrs) {
          child[i] = _clone(parent[i], depth - 1);
        }
        try {
          var objProperty = Object.getOwnPropertyDescriptor(parent, i);
          if (objProperty.set === 'undefined') {
            // no setter defined. Skip cloning this property
            continue;
          }
          child[i] = _clone(parent[i], depth - 1);
        } catch (e) {
          if (e instanceof TypeError) {
            // when in strict mode, TypeError will be thrown if child[i] property only has a getter
            // we can't do anything about this, other than inform the user that this property cannot be set.
            continue;
          } else if (e instanceof ReferenceError) {
            //this may happen in non strict mode
            continue;
          }
        }
      }
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(parent);
        for (var i = 0; i < symbols.length; i++) {
          // Don't need to worry about cloning a symbol because it is a primitive,
          // like a number or string.
          var symbol = symbols[i];
          var descriptor = Object.getOwnPropertyDescriptor(parent, symbol);
          if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
            continue;
          }
          child[symbol] = _clone(parent[symbol], depth - 1);
          Object.defineProperty(child, symbol, descriptor);
        }
      }
      if (includeNonEnumerable) {
        var allPropertyNames = Object.getOwnPropertyNames(parent);
        for (var i = 0; i < allPropertyNames.length; i++) {
          var propertyName = allPropertyNames[i];
          var descriptor = Object.getOwnPropertyDescriptor(parent, propertyName);
          if (descriptor && descriptor.enumerable) {
            continue;
          }
          child[propertyName] = _clone(parent[propertyName], depth - 1);
          Object.defineProperty(child, propertyName, descriptor);
        }
      }
      return child;
    }
    return _clone(parent, depth);
  }

  /**
   * Simple flat clone using prototype, accepts only objects, usefull for property
   * override on FLAT configuration object (no nested props).
   *
   * USE WITH CAUTION! This may not behave as you wish if you do not know how this
   * works.
   */
  clone.clonePrototype = function clonePrototype(parent) {
    if (parent === null) return null;
    var c = function c() {};
    c.prototype = parent;
    return new c();
  };

  // private utility functions

  function __objToStr(o) {
    return Object.prototype.toString.call(o);
  }
  clone.__objToStr = __objToStr;
  function __isDate(o) {
    return (0, _typeof2.default)(o) === 'object' && __objToStr(o) === '[object Date]';
  }
  clone.__isDate = __isDate;
  function __isArray(o) {
    return (0, _typeof2.default)(o) === 'object' && __objToStr(o) === '[object Array]';
  }
  clone.__isArray = __isArray;
  function __isRegExp(o) {
    return (0, _typeof2.default)(o) === 'object' && __objToStr(o) === '[object RegExp]';
  }
  clone.__isRegExp = __isRegExp;
  function __getRegExpFlags(re) {
    var flags = '';
    if (re.global) flags += 'g';
    if (re.ignoreCase) flags += 'i';
    if (re.multiline) flags += 'm';
    return flags;
  }
  clone.__getRegExpFlags = __getRegExpFlags;
  return clone;
}();
var _default = clone;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../../applications/Hbuilder/HBuilderX/plugins/uniapp-cli/node_modules/buffer/index.js */ 50).Buffer))

/***/ }),
/* 50 */
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ 51)
var ieee754 = __webpack_require__(/*! ieee754 */ 52)
var isArray = __webpack_require__(/*! isarray */ 53)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ 3)))

/***/ }),
/* 51 */
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),
/* 52 */
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 53 */
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 54 */
/*!*******************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/util/route.js ***!
  \*******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 55));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 57));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 24));
/**
 * 路由跳转方法，该方法相对于直接使用uni.xxx的好处是使用更加简单快捷
 * 并且带有路由拦截功能
 */
var Router = /*#__PURE__*/function () {
  function Router() {
    (0, _classCallCheck2.default)(this, Router);
    // 原始属性定义
    this.config = {
      type: 'navigateTo',
      url: '',
      delta: 1,
      // navigateBack页面后退时,回退的层数
      params: {},
      // 传递的参数
      animationType: 'pop-in',
      // 窗口动画,只在APP有效
      animationDuration: 300,
      // 窗口动画持续时间,单位毫秒,只在APP有效
      intercept: false // 是否需要拦截
    };
    // 因为route方法是需要对外赋值给另外的对象使用，同时route内部有使用this，会导致route失去上下文
    // 这里在构造函数中进行this绑定
    this.route = this.route.bind(this);
  }

  // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
  (0, _createClass2.default)(Router, [{
    key: "addRootPath",
    value: function addRootPath(url) {
      return url[0] === '/' ? url : "/".concat(url);
    }

    // 整合路由参数
  }, {
    key: "mixinParam",
    value: function mixinParam(url, params) {
      url = url && this.addRootPath(url);

      // 使用正则匹配，主要依据是判断是否有"/","?","="等，如“/page/index/index?name=mary"
      // 如果有url中有get参数，转换后无需带上"?"
      var query = '';
      if (/.*\/.*\?.*=.*/.test(url)) {
        // object对象转为get类型的参数
        query = uni.$u.queryParams(params, false);
        // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
        return url += "&".concat(query);
      }
      // 直接拼接参数，因为此处url中没有后面的query参数，也就没有"?/&"之类的符号
      query = uni.$u.queryParams(params);
      return url += query;
    }

    // 对外的方法名称
  }, {
    key: "route",
    value: function () {
      var _route = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var options,
          params,
          mergeConfig,
          isNext,
          _args = arguments;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                // 合并用户的配置和内部的默认配置
                mergeConfig = {};
                if (typeof options === 'string') {
                  // 如果options为字符串，则为route(url, params)的形式
                  mergeConfig.url = this.mixinParam(options, params);
                  mergeConfig.type = 'navigateTo';
                } else {
                  mergeConfig = uni.$u.deepClone(options, this.config);
                  // 否则正常使用mergeConfig中的url和params进行拼接
                  mergeConfig.url = this.mixinParam(options.url, options.params);
                }

                // 如果本次跳转的路径和本页面路径一致，不执行跳转，防止用户快速点击跳转按钮，造成多次跳转同一个页面的问题
                if (!(mergeConfig.url === uni.$u.page())) {
                  _context.next = 6;
                  break;
                }
                return _context.abrupt("return");
              case 6:
                if (params.intercept) {
                  this.config.intercept = params.intercept;
                }
                // params参数也带给拦截器
                mergeConfig.params = params;
                // 合并内外部参数
                mergeConfig = uni.$u.deepMerge(this.config, mergeConfig);
                // 判断用户是否定义了拦截器
                if (!(typeof uni.$u.routeIntercept === 'function')) {
                  _context.next = 16;
                  break;
                }
                _context.next = 12;
                return new Promise(function (resolve, reject) {
                  uni.$u.routeIntercept(mergeConfig, resolve);
                });
              case 12:
                isNext = _context.sent;
                // 如果isNext为true，则执行路由跳转
                isNext && this.openPage(mergeConfig);
                _context.next = 17;
                break;
              case 16:
                this.openPage(mergeConfig);
              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function route() {
        return _route.apply(this, arguments);
      }
      return route;
    }() // 执行路由跳转
  }, {
    key: "openPage",
    value: function openPage(config) {
      // 解构参数
      var url = config.url,
        type = config.type,
        delta = config.delta,
        animationType = config.animationType,
        animationDuration = config.animationDuration;
      if (config.type == 'navigateTo' || config.type == 'to') {
        uni.navigateTo({
          url: url,
          animationType: animationType,
          animationDuration: animationDuration
        });
      }
      if (config.type == 'redirectTo' || config.type == 'redirect') {
        uni.redirectTo({
          url: url
        });
      }
      if (config.type == 'switchTab' || config.type == 'tab') {
        uni.switchTab({
          url: url
        });
      }
      if (config.type == 'reLaunch' || config.type == 'launch') {
        uni.reLaunch({
          url: url
        });
      }
      if (config.type == 'navigateBack' || config.type == 'back') {
        uni.navigateBack({
          delta: delta
        });
      }
    }
  }]);
  return Router;
}();
var _default = new Router().route;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 55 */
/*!************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/@babel/runtime/regenerator/index.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// TODO(Babel 8): Remove this file.

var runtime = __webpack_require__(/*! @babel/runtime/helpers/regeneratorRuntime */ 56)();
module.exports = runtime;

/***/ }),
/* 56 */
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorRuntime.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
function _regeneratorRuntime() {
  "use strict";

  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return exports;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function value(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) {
              if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            }
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) {
      keys.push(key);
    }
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) {
        "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      }
    },
    stop: function stop() {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 57 */
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 58 */
/*!*******************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/function/colorGradient.js ***!
  \*******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * 求两个颜色之间的渐变值
 * @param {string} startColor 开始的颜色
 * @param {string} endColor 结束的颜色
 * @param {number} step 颜色等分的份额
 * */
function colorGradient() {
  var startColor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgb(0, 0, 0)';
  var endColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgb(255, 255, 255)';
  var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var startRGB = hexToRgb(startColor, false); // 转换为rgb数组模式
  var startR = startRGB[0];
  var startG = startRGB[1];
  var startB = startRGB[2];
  var endRGB = hexToRgb(endColor, false);
  var endR = endRGB[0];
  var endG = endRGB[1];
  var endB = endRGB[2];
  var sR = (endR - startR) / step; // 总差值
  var sG = (endG - startG) / step;
  var sB = (endB - startB) / step;
  var colorArr = [];
  for (var i = 0; i < step; i++) {
    // 计算每一步的hex值
    var hex = rgbToHex("rgb(".concat(Math.round(sR * i + startR), ",").concat(Math.round(sG * i + startG), ",").concat(Math.round(sB * i + startB), ")"));
    // 确保第一个颜色值为startColor的值
    if (i === 0) hex = rgbToHex(startColor);
    // 确保最后一个颜色值为endColor的值
    if (i === step - 1) hex = rgbToHex(endColor);
    colorArr.push(hex);
  }
  return colorArr;
}

// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
function hexToRgb(sColor) {
  var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  sColor = String(sColor).toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = '#';
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    var sColorChange = [];
    for (var _i = 1; _i < 7; _i += 2) {
      sColorChange.push(parseInt("0x".concat(sColor.slice(_i, _i + 2))));
    }
    if (!str) {
      return sColorChange;
    }
    return "rgb(".concat(sColorChange[0], ",").concat(sColorChange[1], ",").concat(sColorChange[2], ")");
  }
  if (/^(rgb|RGB)/.test(sColor)) {
    var arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',');
    return arr.map(function (val) {
      return Number(val);
    });
  }
  return sColor;
}

// 将rgb表示方式转换为hex表示方式
function rgbToHex(rgb) {
  var _this = rgb;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    var aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',');
    var strHex = '#';
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      hex = String(hex).length == 1 ? "".concat(0, hex) : hex; // 保证每个rgb的值为2位
      if (hex === '0') {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }
    return strHex;
  }
  if (reg.test(_this)) {
    var aNum = _this.replace(/#/, '').split('');
    if (aNum.length === 6) {
      return _this;
    }
    if (aNum.length === 3) {
      var numHex = '#';
      for (var _i2 = 0; _i2 < aNum.length; _i2 += 1) {
        numHex += aNum[_i2] + aNum[_i2];
      }
      return numHex;
    }
  } else {
    return _this;
  }
}

/**
* JS颜色十六进制转换为rgb或rgba,返回的格式为 rgba（255，255，255，0.5）字符串
* sHex为传入的十六进制的色值
* alpha为rgba的透明度
*/
function colorToRgba(color, alpha) {
  color = rgbToHex(color);
  // 十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  /* 16进制颜色转为RGB格式 */
  var sColor = String(color).toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = '#';
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    var sColorChange = [];
    for (var _i3 = 1; _i3 < 7; _i3 += 2) {
      sColorChange.push(parseInt("0x".concat(sColor.slice(_i3, _i3 + 2))));
    }
    // return sColorChange.join(',')
    return "rgba(".concat(sColorChange.join(','), ",").concat(alpha, ")");
  }
  return sColor;
}
var _default = {
  colorGradient: colorGradient,
  hexToRgb: hexToRgb,
  rgbToHex: rgbToHex,
  colorToRgba: colorToRgba
};
exports.default = _default;

/***/ }),
/* 59 */
/*!**********************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/function/test.js ***!
  \**********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
/**
 * 验证电子邮箱格式
 */
function email(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
}

/**
 * 验证手机格式
 */
function mobile(value) {
  return /^1[23456789]\d{9}$/.test(value);
}

/**
 * 验证URL格式
 */
function url(value) {
  return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.test(value);
}

/**
 * 验证日期格式
 */
function date(value) {
  if (!value) return false;
  // 判断是否数值或者字符串数值(意味着为时间戳)，转为数值，否则new Date无法识别字符串时间戳
  if (number(value)) value = +value;
  return !/Invalid|NaN/.test(new Date(value).toString());
}

/**
 * 验证ISO类型的日期格式
 */
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}

/**
 * 验证十进制数字
 */
function number(value) {
  return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(value);
}

/**
 * 验证字符串
 */
function string(value) {
  return typeof value === 'string';
}

/**
 * 验证整数
 */
function digits(value) {
  return /^\d+$/.test(value);
}

/**
 * 验证身份证号码
 */
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value);
}

/**
 * 是否车牌号
 */
function carNo(value) {
  // 新能源车牌
  var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // 旧车牌
  var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  }
  if (value.length === 8) {
    return xreg.test(value);
  }
  return false;
}

/**
 * 金额,只允许2位小数
 */
function amount(value) {
  // 金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
}

/**
 * 中文
 */
function chinese(value) {
  var reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}

/**
 * 只能输入字母
 */
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}

/**
 * 只能是字母或者数字
 */
function enOrNum(value) {
  // 英文或者数字
  var reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}

/**
 * 验证是否包含某个值
 */
function contains(value, param) {
  return value.indexOf(param) >= 0;
}

/**
 * 验证一个值范围[min, max]
 */
function range(value, param) {
  return value >= param[0] && value <= param[1];
}

/**
 * 验证一个长度范围[min, max]
 */
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}

/**
 * 是否固定电话
 */
function landline(value) {
  var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
  return reg.test(value);
}

/**
 * 判断是否为空
 */
function empty(value) {
  switch ((0, _typeof2.default)(value)) {
    case 'undefined':
      return true;
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
      break;
    case 'boolean':
      if (!value) return true;
      break;
    case 'number':
      if (value === 0 || isNaN(value)) return true;
      break;
    case 'object':
      if (value === null || value.length === 0) return true;
      for (var i in value) {
        return false;
      }
      return true;
  }
  return false;
}

/**
 * 是否json字符串
 */
function jsonString(value) {
  if (typeof value === 'string') {
    try {
      var obj = JSON.parse(value);
      if ((0, _typeof2.default)(obj) === 'object' && obj) {
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }
  return false;
}

/**
 * 是否数组
 */
function array(value) {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(value);
  }
  return Object.prototype.toString.call(value) === '[object Array]';
}

/**
 * 是否对象
 */
function object(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
 * 是否短信验证码
 */
function code(value) {
  var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
  return new RegExp("^\\d{".concat(len, "}$")).test(value);
}

/**
 * 是否函数方法
 * @param {Object} value
 */
function func(value) {
  return typeof value === 'function';
}

/**
 * 是否promise对象
 * @param {Object} value
 */
function promise(value) {
  return object(value) && func(value.then) && func(value.catch);
}

/** 是否图片格式
 * @param {Object} value
 */
function image(value) {
  var IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
  return IMAGE_REGEXP.test(value);
}

/**
 * 是否视频格式
 * @param {Object} value
 */
function video(value) {
  var VIDEO_REGEXP = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv)/i;
  return VIDEO_REGEXP.test(value);
}

/**
 * 是否为正则对象
 * @param {Object}
 * @return {Boolean}
 */
function regExp(o) {
  return o && Object.prototype.toString.call(o) === '[object RegExp]';
}
var _default = {
  email: email,
  mobile: mobile,
  url: url,
  date: date,
  dateISO: dateISO,
  number: number,
  digits: digits,
  idCard: idCard,
  carNo: carNo,
  amount: amount,
  chinese: chinese,
  letter: letter,
  enOrNum: enOrNum,
  contains: contains,
  range: range,
  rangeLength: rangeLength,
  empty: empty,
  isEmpty: empty,
  jsonString: jsonString,
  landline: landline,
  object: object,
  array: array,
  code: code,
  func: func,
  promise: promise,
  video: video,
  image: image,
  regExp: regExp,
  string: string
};
exports.default = _default;

/***/ }),
/* 60 */
/*!**************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/function/debounce.js ***!
  \**************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var timeout = null;

/**
 * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
 *
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
function debounce(func) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout);
  // 立即执行，此类情况一般用不到
  if (immediate) {
    var callNow = !timeout;
    timeout = setTimeout(function () {
      timeout = null;
    }, wait);
    if (callNow) typeof func === 'function' && func();
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(function () {
      typeof func === 'function' && func();
    }, wait);
  }
}
var _default = debounce;
exports.default = _default;

/***/ }),
/* 61 */
/*!**************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/function/throttle.js ***!
  \**************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var timer;
var flag;
/**
 * 节流原理：在一定时间内，只能触发一次
 *
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
function throttle(func) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (immediate) {
    if (!flag) {
      flag = true;
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === 'function' && func();
      timer = setTimeout(function () {
        flag = false;
      }, wait);
    }
  } else if (!flag) {
    flag = true;
    // 如果是非立即执行，则在wait毫秒内的结束处执行
    timer = setTimeout(function () {
      flag = false;
      typeof func === 'function' && func();
    }, wait);
  }
}
var _default = throttle;
exports.default = _default;

/***/ }),
/* 62 */
/*!***********************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/function/index.js ***!
  \***********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _test = _interopRequireDefault(__webpack_require__(/*! ./test.js */ 59));
/**
 * 如果value小于min，取min；如果value大于max，取max
 */
function range() {
  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  return Math.max(min, Math.min(max, Number(value)));
}

/**
 * 用于获取用户传递值的px值
 * 如果用户传递了"xxpx"或者"xxrpx"，取出其数值部分，如果是"xxxrpx"还需要用过uni.upx2px进行转换
 */
function getPx(value) {
  var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (_test.default.number(value)) {
    return unit ? "".concat(value, "px") : value;
  }
  // 如果带有rpx，先取出其数值部分，再转为px值
  if (/(rpx|upx)$/.test(value)) {
    return unit ? "".concat(uni.upx2px(parseInt(value)), "px") : uni.upx2px(parseInt(value));
  }
  return unit ? "".concat(parseInt(value), "px") : parseInt(value);
}

/**
 * 进行延时，以达到可以简写代码的目的，比如
 * await uni.$u.sleep(20)将会阻塞20ms
 */
function sleep() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 30;
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, value);
  });
}
function os() {
  return uni.getSystemInfoSync().platform.toLowerCase();
}
function sys() {
  return uni.getSystemInfoSync();
}

/**
 * 取一个区间数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 */
function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    var gab = max - min + 1;
    return Math.floor(Math.random() * gab + min);
  }
  return 0;
}

/**
 * 本算法来源于简书开源代码，详见：https://www.jianshu.com/p/fdbf293d0a85
 * 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier)
 * 一般用于多个组件之间,给它一个唯一的标识符,或者v-for循环的时候,如果使用数组的index可能会导致更新列表出现问题
 * 最可能的情况是左滑删除item或者对某条信息流"不喜欢"并去掉它的时候,会导致组件内的数据可能出现错乱
 * v-for的时候,推荐使用后端返回的id而不是循环的index
 * @param {Number} len uuid的长度
 * @param {Boolean} firstU 将返回的首字母置为"u"
 * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
 */
function guid() {
  var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;
  var firstU = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var radix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  radix = radix || chars.length;
  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (var i = 0; i < len; i++) {
      uuid[i] = chars[0 | Math.random() * radix];
    }
  } else {
    var r;
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    for (var _i = 0; _i < 36; _i++) {
      if (!uuid[_i]) {
        r = 0 | Math.random() * 16;
        uuid[_i] = chars[_i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift();
    return "u".concat(uuid.join(''));
  }
  return uuid.join('');
}

// 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
// 这里默认值等于undefined有它的含义，因为最顶层元素(组件)的$parent就是undefined，意味着不传name
// 值(默认为undefined)，就是查找最顶层的$parent
function $parent() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options && parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {
      return parent;
    }
  }
  return false;
}

/**
 * 样式转换
 * 对象转字符串，或者字符串转对象
 * @param {Object | String} 需要转换的目标
 * @param {String} 转换的目的，object-转为对象，string-转为字符串
 */
function addStyle(customStyle) {
  var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'object';
  // 字符串转字符串，对象转对象情形，直接返回
  if (_test.default.empty(customStyle) || (0, _typeof2.default)(customStyle) === 'object' && target === 'object' || target === 'string' && typeof customStyle === 'string') {
    return customStyle;
  }
  // 字符串转对象
  if (target === 'object') {
    // 去除字符串样式中的两端空格(中间的空格不能去掉，比如padding: 20px 0如果去掉了就错了)，空格是无用的
    customStyle = trim(customStyle);
    // 根据";"将字符串转为数组形式
    var styleArray = customStyle.split(';');
    var style = {};
    // 历遍数组，拼接成对象
    for (var i = 0; i < styleArray.length; i++) {
      // 'font-size:20px;color:red;'，如此最后字符串有";"的话，会导致styleArray最后一个元素为空字符串，这里需要过滤
      if (styleArray[i]) {
        var item = styleArray[i].split(':');
        style[trim(item[0])] = trim(item[1]);
      }
    }
    return style;
  }
  // 这里为对象转字符串形式
  var string = '';
  for (var _i2 in customStyle) {
    // 驼峰转为中划线的形式，否则css内联样式，无法识别驼峰样式属性名
    var key = _i2.replace(/([A-Z])/g, '-$1').toLowerCase();
    string += "".concat(key, ":").concat(customStyle[_i2], ";");
  }
  // 去除两端空格
  return trim(string);
}

// 添加单位，如果有rpx，upx，%，px等单位结尾或者值为auto，直接返回，否则加上px单位结尾
function addUnit() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';
  var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'px';
  value = String(value);
  // 用uView内置验证规则中的number判断是否为数值
  return _test.default.number(value) ? "".concat(value).concat(unit) : value;
}

// 深度克隆
function deepClone(obj) {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj;
  if ((0, _typeof2.default)(obj) !== 'object' && typeof obj !== 'function') {
    // 原始类型直接返回
    return obj;
  }
  var o = _test.default.array(obj) ? [] : {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = (0, _typeof2.default)(obj[i]) === 'object' ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}

// JS对象深度合并
function deepMerge() {
  var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  target = deepClone(target);
  if ((0, _typeof2.default)(target) !== 'object' || (0, _typeof2.default)(source) !== 'object') return false;
  for (var prop in source) {
    if (!source.hasOwnProperty(prop)) continue;
    if (prop in target) {
      if ((0, _typeof2.default)(target[prop]) !== 'object') {
        target[prop] = source[prop];
      } else if ((0, _typeof2.default)(source[prop]) !== 'object') {
        target[prop] = source[prop];
      } else if (target[prop].concat && source[prop].concat) {
        target[prop] = target[prop].concat(source[prop]);
      } else {
        target[prop] = deepMerge(target[prop], source[prop]);
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}
function error(err) {
  // 开发环境才提示，生产环境不会提示
  if (true) {
    console.error("uView\u63D0\u793A\uFF1A".concat(err));
  }
}

// 打乱数组
function randomArray() {
  var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // 原理是sort排序,Math.random()产生0<= x < 1之间的数,会导致x-0.05大于或者小于0
  return array.sort(function () {
    return Math.random() - 0.5;
  });
}

// padStart 的 polyfill，因为某些机型或情况，还无法支持es7的padStart，比如电脑版的微信小程序
// 所以这里做一个兼容polyfill的兼容处理
if (!String.prototype.padStart) {
  // 为了方便表示这里 fillString 用了ES6 的默认参数，不影响理解
  String.prototype.padStart = function (maxLength) {
    var fillString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
    if (Object.prototype.toString.call(fillString) !== '[object String]') {
      throw new TypeError('fillString must be String');
    }
    var str = this;
    // 返回 String(str) 这里是为了使返回的值是字符串字面量，在控制台中更符合直觉
    if (str.length >= maxLength) return String(str);
    var fillLength = maxLength - str.length;
    var times = Math.ceil(fillLength / fillString.length);
    while (times >>= 1) {
      fillString += fillString;
      if (times === 1) {
        fillString += fillString;
      }
    }
    return fillString.slice(0, fillLength) + str;
  };
}

// 其他更多是格式化有如下:
// yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
function timeFormat() {
  var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var date = new Date(dateTime);
  var ret;
  var opt = {
    'y+': date.getFullYear().toString(),
    // 年
    'm+': (date.getMonth() + 1).toString(),
    // 月
    'd+': date.getDate().toString(),
    // 日
    'h+': date.getHours().toString(),
    // 时
    'M+': date.getMinutes().toString(),
    // 分
    's+': date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };

  for (var k in opt) {
    ret = new RegExp("(".concat(k, ")")).exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'));
    }
  }
  return fmt;
}

/**
 * 时间戳转为多久之前
 * @param String timestamp 时间戳
 * @param String | Boolean format 如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
 * 如果为布尔值false，无论什么时间，都返回多久以前的格式
 */
function timeFrom() {
  var timestamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  if (timestamp == null) timestamp = Number(new Date());
  timestamp = parseInt(timestamp);
  // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
  if (timestamp.toString().length == 10) timestamp *= 1000;
  var timer = new Date().getTime() - timestamp;
  timer = parseInt(timer / 1000);
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  var tips = '';
  switch (true) {
    case timer < 300:
      tips = '刚刚';
      break;
    case timer >= 300 && timer < 3600:
      tips = "".concat(parseInt(timer / 60), "\u5206\u949F\u524D");
      break;
    case timer >= 3600 && timer < 86400:
      tips = "".concat(parseInt(timer / 3600), "\u5C0F\u65F6\u524D");
      break;
    case timer >= 86400 && timer < 2592000:
      tips = "".concat(parseInt(timer / 86400), "\u5929\u524D");
      break;
    default:
      // 如果format为false，则无论什么时间戳，都显示xx之前
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = "".concat(parseInt(timer / (86400 * 30)), "\u4E2A\u6708\u524D");
        } else {
          tips = "".concat(parseInt(timer / (86400 * 365)), "\u5E74\u524D");
        }
      } else {
        tips = timeFormat(timestamp, format);
      }
  }
  return tips;
}

/**
 * 去除空格
 */
function trim(str) {
  var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
  str = String(str);
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, '');
  }
  if (pos == 'left') {
    return str.replace(/^\s*/, '');
  }
  if (pos == 'right') {
    return str.replace(/(\s*$)/g, '');
  }
  if (pos == 'all') {
    return str.replace(/\s+/g, '');
  }
  return str;
}

/**
 * 对象转url参数
 * @param {*} data,对象
 * @param {*} isPrefix,是否自动加上"?"
 */
function queryParams() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var isPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var arrayFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'brackets';
  var prefix = isPrefix ? '?' : '';
  var _result = [];
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';
  var _loop = function _loop(key) {
    var value = data[key];
    // 去掉为空的参数
    if (['', undefined, null].indexOf(value) >= 0) {
      return "continue";
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (var i = 0; i < value.length; i++) {
            _result.push("".concat(key, "[").concat(i, "]=").concat(value[i]));
          }
          break;
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach(function (_value) {
            _result.push("".concat(key, "[]=").concat(_value));
          });
          break;
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach(function (_value) {
            _result.push("".concat(key, "=").concat(_value));
          });
          break;
        case 'comma':
          // 结果: ids=1,2,3
          var commaStr = '';
          value.forEach(function (_value) {
            commaStr += (commaStr ? ',' : '') + _value;
          });
          _result.push("".concat(key, "=").concat(commaStr));
          break;
        default:
          value.forEach(function (_value) {
            _result.push("".concat(key, "[]=").concat(_value));
          });
      }
    } else {
      _result.push("".concat(key, "=").concat(value));
    }
  };
  for (var key in data) {
    var _ret = _loop(key);
    if (_ret === "continue") continue;
  }
  return _result.length ? prefix + _result.join('&') : '';
}
function toast(title) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;
  uni.showToast({
    title: String(title),
    icon: 'none',
    duration: duration
  });
}

/**
 * 根据主题type值,获取对应的图标
 * @param String type 主题名称,primary|info|error|warning|success
 * @param String fill 是否使用fill填充实体的图标
 */
function type2icon() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'success';
  var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // 如果非预置值,默认为success
  if (['primary', 'info', 'error', 'warning', 'success'].indexOf(type) == -1) type = 'success';
  var iconName = '';
  // 目前(2019-12-12),info和primary使用同一个图标
  switch (type) {
    case 'primary':
      iconName = 'info-circle';
      break;
    case 'info':
      iconName = 'info-circle';
      break;
    case 'error':
      iconName = 'close-circle';
      break;
    case 'warning':
      iconName = 'error-circle';
      break;
    case 'success':
      iconName = 'checkmark-circle';
      break;
    default:
      iconName = 'checkmark-circle';
  }
  // 是否是实体类型,加上-fill,在icon组件库中,实体的类名是后面加-fill的
  if (fill) iconName += '-fill';
  return iconName;
}

/*
 * 参数说明：
 * number：要格式化的数字
 * decimals：保留几位小数
 * decimalPoint：小数点符号
 * thousandsSeparator：千分位符号
 * */
function priceFormat(number) {
  var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var decimalPoint = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '.';
  var thousandsSeparator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ',';
  number = "".concat(number).replace(/[^0-9+-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number;
  var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
  var sep = typeof thousandsSeparator === 'undefined' ? ',' : thousandsSeparator;
  var dec = typeof decimalPoint === 'undefined' ? '.' : decimalPoint;
  var s = '';
  var toFixedFix = function toFixedFix(n, prec) {
    var k = Math.pow(10, prec);
    return "".concat(Math.ceil(n * k) / k);
  };
  s = (prec ? toFixedFix(n, prec) : "".concat(Math.round(n))).split('.');
  var re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1".concat(sep, "$2"));
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

// 获取duration值，如果带有ms或者s直接返回，如果大于一定值，认为是ms单位，小于一定值，认为是s单位
// 比如以30位阈值，那么300大于30，可以理解为用户想要的是300ms，而不是想花300s去执行一个动画
function getDuration(value) {
  var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var valueNum = parseInt(value);
  if (unit) {
    if (/s$/.test(value)) return value;
    return value > 30 ? "".concat(value, "ms") : "".concat(value, "s");
  }
  if (/ms$/.test(value)) return valueNum;
  if (/s$/.test(value)) return valueNum > 30 ? valueNum : valueNum * 1000;
  return valueNum;
}

// 日期的月或日补零操作
function padZero(value) {
  return "00".concat(value).slice(-2);
}

// 在u-form的子组件内容发生变化，或者失去焦点时，尝试通知u-form执行校验方法
function formValidate(instance, event) {
  var formItem = uni.$u.$parent.call(instance, 'u-form-item');
  var form = uni.$u.$parent.call(instance, 'u-form');
  // 如果发生变化的input或者textarea等，其父组件中有u-form-item或者u-form等，就执行form的validate方法
  // 同时将form-item的pros传递给form，让其进行精确对象验证
  if (formItem && form) {
    form.validateField(formItem.prop, function () {}, event);
  }
}

// 获取某个对象下的属性，用于通过类似'a.b.c'的形式去获取一个对象的的属性的形式
function getProperty(obj, key) {
  if (!obj) {
    return;
  }
  if (typeof key !== 'string' || key === '') {
    return '';
  }
  if (key.indexOf('.') !== -1) {
    var keys = key.split('.');
    var firstObj = obj[keys[0]] || {};
    for (var i = 1; i < keys.length; i++) {
      if (firstObj) {
        firstObj = firstObj[keys[i]];
      }
    }
    return firstObj;
  }
  return obj[key];
}

// 设置对象的属性值，如果'a.b.c'的形式进行设置
function setProperty(obj, key, value) {
  if (!obj) {
    return;
  }
  // 递归赋值
  var inFn = function inFn(_obj, keys, v) {
    // 最后一个属性key
    if (keys.length === 1) {
      _obj[keys[0]] = v;
      return;
    }
    // 0~length-1个key
    while (keys.length > 1) {
      var k = keys[0];
      if (!_obj[k] || (0, _typeof2.default)(_obj[k]) !== 'object') {
        _obj[k] = {};
      }
      var _key = keys.shift();
      // 自调用判断是否存在属性，不存在则自动创建对象
      inFn(_obj[k], keys, v);
    }
  };
  if (typeof key !== 'string' || key === '') {} else if (key.indexOf('.') !== -1) {
    // 支持多层级赋值操作
    var keys = key.split('.');
    inFn(obj, keys, value);
  } else {
    obj[key] = value;
  }
}

// 获取当前页面路径
function page() {
  var pages = getCurrentPages();
  return "/".concat(getCurrentPages()[pages.length - 1].route);
}
var _default = {
  range: range,
  getPx: getPx,
  sleep: sleep,
  os: os,
  sys: sys,
  random: random,
  guid: guid,
  $parent: $parent,
  addStyle: addStyle,
  addUnit: addUnit,
  deepClone: deepClone,
  deepMerge: deepMerge,
  error: error,
  randomArray: randomArray,
  timeFormat: timeFormat,
  timeFrom: timeFrom,
  trim: trim,
  queryParams: queryParams,
  toast: toast,
  type2icon: type2icon,
  priceFormat: priceFormat,
  getDuration: getDuration,
  padZero: padZero,
  formValidate: formValidate,
  getProperty: getProperty,
  setProperty: setProperty,
  page: page
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 63 */
/*!**********************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/config.js ***!
  \**********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// 此版本发布于2020-12-08
var version = '2.0.10';
var _default = {
  v: version,
  version: version,
  // 主题名称
  type: ['primary', 'success', 'info', 'error', 'warning'],
  // 颜色部分，本来可以通过scss的:export导出供js使用，但是奈何nvue不支持
  color: {
    'u-primary': '#2979ff',
    'u-warning': '#ff9900',
    'u-success': '#19be6b',
    'u-error': '#fa3534',
    'u-info': '#909399',
    'u-main-color': '#303133',
    'u-content-color': '#606266',
    'u-tips-color': '#909399',
    'u-light-color': '#c0c4cc'
  }
};
exports.default = _default;

/***/ }),
/* 64 */
/*!*********************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props.js ***!
  \*********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _config = _interopRequireDefault(__webpack_require__(/*! ./config */ 63));
var _actionSheet = _interopRequireDefault(__webpack_require__(/*! ./props/actionSheet.js */ 65));
var _album = _interopRequireDefault(__webpack_require__(/*! ./props/album.js */ 66));
var _alert = _interopRequireDefault(__webpack_require__(/*! ./props/alert.js */ 67));
var _avatar = _interopRequireDefault(__webpack_require__(/*! ./props/avatar */ 68));
var _avatarGroup = _interopRequireDefault(__webpack_require__(/*! ./props/avatarGroup */ 69));
var _backtop = _interopRequireDefault(__webpack_require__(/*! ./props/backtop */ 70));
var _badge = _interopRequireDefault(__webpack_require__(/*! ./props/badge */ 71));
var _button = _interopRequireDefault(__webpack_require__(/*! ./props/button */ 72));
var _calendar = _interopRequireDefault(__webpack_require__(/*! ./props/calendar */ 73));
var _carKeyboard = _interopRequireDefault(__webpack_require__(/*! ./props/carKeyboard */ 74));
var _cell = _interopRequireDefault(__webpack_require__(/*! ./props/cell */ 75));
var _cellGroup = _interopRequireDefault(__webpack_require__(/*! ./props/cellGroup */ 76));
var _checkbox = _interopRequireDefault(__webpack_require__(/*! ./props/checkbox */ 77));
var _checkboxGroup = _interopRequireDefault(__webpack_require__(/*! ./props/checkboxGroup */ 78));
var _circleProgress = _interopRequireDefault(__webpack_require__(/*! ./props/circleProgress */ 79));
var _code = _interopRequireDefault(__webpack_require__(/*! ./props/code */ 80));
var _codeInput = _interopRequireDefault(__webpack_require__(/*! ./props/codeInput */ 81));
var _col = _interopRequireDefault(__webpack_require__(/*! ./props/col */ 82));
var _collapse = _interopRequireDefault(__webpack_require__(/*! ./props/collapse */ 83));
var _collapseItem = _interopRequireDefault(__webpack_require__(/*! ./props/collapseItem */ 84));
var _columnNotice = _interopRequireDefault(__webpack_require__(/*! ./props/columnNotice */ 85));
var _countDown = _interopRequireDefault(__webpack_require__(/*! ./props/countDown */ 86));
var _countTo = _interopRequireDefault(__webpack_require__(/*! ./props/countTo */ 87));
var _datetimePicker = _interopRequireDefault(__webpack_require__(/*! ./props/datetimePicker */ 88));
var _divider = _interopRequireDefault(__webpack_require__(/*! ./props/divider */ 89));
var _empty = _interopRequireDefault(__webpack_require__(/*! ./props/empty */ 90));
var _form = _interopRequireDefault(__webpack_require__(/*! ./props/form */ 91));
var _formItem = _interopRequireDefault(__webpack_require__(/*! ./props/formItem */ 92));
var _gap = _interopRequireDefault(__webpack_require__(/*! ./props/gap */ 93));
var _grid = _interopRequireDefault(__webpack_require__(/*! ./props/grid */ 94));
var _gridItem = _interopRequireDefault(__webpack_require__(/*! ./props/gridItem */ 95));
var _icon = _interopRequireDefault(__webpack_require__(/*! ./props/icon */ 96));
var _image = _interopRequireDefault(__webpack_require__(/*! ./props/image */ 97));
var _indexAnchor = _interopRequireDefault(__webpack_require__(/*! ./props/indexAnchor */ 98));
var _indexList = _interopRequireDefault(__webpack_require__(/*! ./props/indexList */ 99));
var _input = _interopRequireDefault(__webpack_require__(/*! ./props/input */ 100));
var _keyboard = _interopRequireDefault(__webpack_require__(/*! ./props/keyboard */ 101));
var _line = _interopRequireDefault(__webpack_require__(/*! ./props/line */ 102));
var _lineProgress = _interopRequireDefault(__webpack_require__(/*! ./props/lineProgress */ 103));
var _link = _interopRequireDefault(__webpack_require__(/*! ./props/link */ 104));
var _list = _interopRequireDefault(__webpack_require__(/*! ./props/list */ 105));
var _listItem = _interopRequireDefault(__webpack_require__(/*! ./props/listItem */ 106));
var _loadingIcon = _interopRequireDefault(__webpack_require__(/*! ./props/loadingIcon */ 107));
var _loadingPage = _interopRequireDefault(__webpack_require__(/*! ./props/loadingPage */ 108));
var _loadmore = _interopRequireDefault(__webpack_require__(/*! ./props/loadmore */ 109));
var _modal = _interopRequireDefault(__webpack_require__(/*! ./props/modal */ 110));
var _navbar = _interopRequireDefault(__webpack_require__(/*! ./props/navbar */ 111));
var _noNetwork = _interopRequireDefault(__webpack_require__(/*! ./props/noNetwork */ 112));
var _noticeBar = _interopRequireDefault(__webpack_require__(/*! ./props/noticeBar */ 113));
var _notify = _interopRequireDefault(__webpack_require__(/*! ./props/notify */ 114));
var _numberBox = _interopRequireDefault(__webpack_require__(/*! ./props/numberBox */ 115));
var _numberKeyboard = _interopRequireDefault(__webpack_require__(/*! ./props/numberKeyboard */ 116));
var _overlay = _interopRequireDefault(__webpack_require__(/*! ./props/overlay */ 117));
var _parse = _interopRequireDefault(__webpack_require__(/*! ./props/parse */ 118));
var _picker = _interopRequireDefault(__webpack_require__(/*! ./props/picker */ 119));
var _popup = _interopRequireDefault(__webpack_require__(/*! ./props/popup */ 120));
var _radio = _interopRequireDefault(__webpack_require__(/*! ./props/radio */ 121));
var _radioGroup = _interopRequireDefault(__webpack_require__(/*! ./props/radioGroup */ 122));
var _rate = _interopRequireDefault(__webpack_require__(/*! ./props/rate */ 123));
var _readMore = _interopRequireDefault(__webpack_require__(/*! ./props/readMore */ 124));
var _row = _interopRequireDefault(__webpack_require__(/*! ./props/row */ 125));
var _rowNotice = _interopRequireDefault(__webpack_require__(/*! ./props/rowNotice */ 126));
var _scrollList = _interopRequireDefault(__webpack_require__(/*! ./props/scrollList */ 127));
var _search = _interopRequireDefault(__webpack_require__(/*! ./props/search */ 128));
var _section = _interopRequireDefault(__webpack_require__(/*! ./props/section */ 129));
var _skeleton = _interopRequireDefault(__webpack_require__(/*! ./props/skeleton */ 130));
var _slider = _interopRequireDefault(__webpack_require__(/*! ./props/slider */ 131));
var _statusBar = _interopRequireDefault(__webpack_require__(/*! ./props/statusBar */ 132));
var _steps = _interopRequireDefault(__webpack_require__(/*! ./props/steps */ 133));
var _stepsItem = _interopRequireDefault(__webpack_require__(/*! ./props/stepsItem */ 134));
var _sticky = _interopRequireDefault(__webpack_require__(/*! ./props/sticky */ 135));
var _subsection = _interopRequireDefault(__webpack_require__(/*! ./props/subsection */ 136));
var _swipeAction = _interopRequireDefault(__webpack_require__(/*! ./props/swipeAction */ 137));
var _swipeActionItem = _interopRequireDefault(__webpack_require__(/*! ./props/swipeActionItem */ 138));
var _swiper = _interopRequireDefault(__webpack_require__(/*! ./props/swiper */ 139));
var _swipterIndicator = _interopRequireDefault(__webpack_require__(/*! ./props/swipterIndicator */ 140));
var _switch2 = _interopRequireDefault(__webpack_require__(/*! ./props/switch */ 141));
var _tabbar = _interopRequireDefault(__webpack_require__(/*! ./props/tabbar */ 142));
var _tabbarItem = _interopRequireDefault(__webpack_require__(/*! ./props/tabbarItem */ 143));
var _tabs = _interopRequireDefault(__webpack_require__(/*! ./props/tabs */ 144));
var _tag = _interopRequireDefault(__webpack_require__(/*! ./props/tag */ 145));
var _text = _interopRequireDefault(__webpack_require__(/*! ./props/text */ 146));
var _textarea = _interopRequireDefault(__webpack_require__(/*! ./props/textarea */ 147));
var _toast = _interopRequireDefault(__webpack_require__(/*! ./props/toast */ 148));
var _toolbar = _interopRequireDefault(__webpack_require__(/*! ./props/toolbar */ 149));
var _tooltip = _interopRequireDefault(__webpack_require__(/*! ./props/tooltip */ 150));
var _transition = _interopRequireDefault(__webpack_require__(/*! ./props/transition */ 151));
var _upload = _interopRequireDefault(__webpack_require__(/*! ./props/upload */ 152));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var color = _config.default.color;
var _default = _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, _actionSheet.default), _album.default), _alert.default), _avatar.default), _avatarGroup.default), _backtop.default), _badge.default), _button.default), _calendar.default), _carKeyboard.default), _cell.default), _cellGroup.default), _checkbox.default), _checkboxGroup.default), _circleProgress.default), _code.default), _codeInput.default), _col.default), _collapse.default), _collapseItem.default), _columnNotice.default), _countDown.default), _countTo.default), _datetimePicker.default), _divider.default), _empty.default), _form.default), _formItem.default), _gap.default), _grid.default), _gridItem.default), _icon.default), _image.default), _indexAnchor.default), _indexList.default), _input.default), _keyboard.default), _line.default), _lineProgress.default), _link.default), _list.default), _listItem.default), _loadingIcon.default), _loadingPage.default), _loadmore.default), _modal.default), _navbar.default), _noNetwork.default), _noticeBar.default), _notify.default), _numberBox.default), _numberKeyboard.default), _overlay.default), _parse.default), _picker.default), _popup.default), _radio.default), _radioGroup.default), _rate.default), _readMore.default), _row.default), _rowNotice.default), _scrollList.default), _search.default), _section.default), _skeleton.default), _slider.default), _statusBar.default), _steps.default), _stepsItem.default), _sticky.default), _subsection.default), _swipeAction.default), _swipeActionItem.default), _swiper.default), _swipterIndicator.default), _switch2.default), _tabbar.default), _tabbarItem.default), _tabs.default), _tag.default), _text.default), _textarea.default), _toast.default), _toolbar.default), _tooltip.default), _transition.default), _upload.default);
exports.default = _default;

/***/ }),
/* 65 */
/*!*********************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/actionSheet.js ***!
  \*********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:44:35
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/actionSheet.js
 */
var _default = {
  // action-sheet组件
  actionSheet: {
    show: false,
    title: '',
    description: '',
    actions: function actions() {
      return [];
    },
    index: '',
    cancelText: '',
    closeOnClickAction: true,
    safeAreaInsetBottom: true,
    openType: '',
    closeOnClickOverlay: true,
    round: false
  }
};
exports.default = _default;

/***/ }),
/* 66 */
/*!***************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/album.js ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:47:24
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/album.js
 */
var _default = {
  // album 组件
  album: {
    urls: function urls() {
      return [];
    },
    keyName: '',
    singleSize: 180,
    multipleSize: 70,
    space: 6,
    singleMode: 'scaleToFill',
    multipleMode: 'aspectFill',
    maxCount: 9,
    previewFullImage: true,
    rowCount: 3,
    showMore: true
  }
};
exports.default = _default;

/***/ }),
/* 67 */
/*!***************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/alert.js ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:48:53
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/alert.js
 */
var _default = {
  // alert警告组件
  alert: {
    title: '',
    type: 'warning',
    description: '',
    closable: false,
    showIcon: false,
    effect: 'light',
    center: false,
    fontSize: 14
  }
};
exports.default = _default;

/***/ }),
/* 68 */
/*!****************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/avatar.js ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:49:22
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/avatar.js
 */
var _default = {
  // avatar 组件
  avatar: {
    src: '',
    shape: 'circle',
    size: 40,
    mode: 'scaleToFill',
    text: '',
    bgColor: '#c0c4cc',
    color: '#ffffff',
    fontSize: 18,
    icon: '',
    mpAvatar: false,
    randomBgColor: false,
    defaultUrl: '',
    colorIndex: '',
    name: ''
  }
};
exports.default = _default;

/***/ }),
/* 69 */
/*!*********************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/avatarGroup.js ***!
  \*********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:49:55
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/avatarGroup.js
 */
var _default = {
  // avatarGroup 组件
  avatarGroup: {
    urls: function urls() {
      return [];
    },
    maxCount: 5,
    shape: 'circle',
    mode: 'scaleToFill',
    showMore: true,
    size: 40,
    keyName: '',
    gap: 0.5,
    extraValue: 0
  }
};
exports.default = _default;

/***/ }),
/* 70 */
/*!*****************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/backtop.js ***!
  \*****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:50:18
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/backtop.js
 */
var _default = {
  // backtop组件
  backtop: {
    mode: 'circle',
    icon: 'arrow-upward',
    text: '',
    duration: 100,
    scrollTop: 0,
    top: 400,
    bottom: 100,
    right: 20,
    zIndex: 9,
    iconStyle: function iconStyle() {
      return {
        color: '#909399',
        fontSize: '19px'
      };
    }
  }
};
exports.default = _default;

/***/ }),
/* 71 */
/*!***************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/badge.js ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-23 19:51:50
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/badge.js
 */
var _default = {
  // 徽标数组件
  badge: {
    isDot: false,
    value: '',
    show: true,
    max: 999,
    type: 'error',
    showZero: false,
    bgColor: null,
    color: null,
    shape: 'circle',
    numberType: 'overflow',
    offset: function offset() {
      return [];
    },
    inverted: false,
    absolute: false
  }
};
exports.default = _default;

/***/ }),
/* 72 */
/*!****************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/button.js ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:51:27
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/button.js
 */
var _default = {
  // button组件
  button: {
    hairline: false,
    type: 'info',
    size: 'normal',
    shape: 'square',
    plain: false,
    disabled: false,
    loading: false,
    loadingText: '',
    loadingMode: 'spinner',
    loadingSize: 15,
    openType: '',
    formType: '',
    appParameter: '',
    hoverStopPropagation: true,
    lang: 'en',
    sessionFrom: '',
    sendMessageTitle: '',
    sendMessagePath: '',
    sendMessageImg: '',
    showMessageCard: false,
    dataName: '',
    throttleTime: 0,
    hoverStartTime: 0,
    hoverStayTime: 200,
    text: '',
    icon: '',
    iconColor: '',
    color: ''
  }
};
exports.default = _default;

/***/ }),
/* 73 */
/*!******************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/calendar.js ***!
  \******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:52:43
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/calendar.js
 */
var _default = {
  // calendar 组件
  calendar: {
    title: '日期选择',
    showTitle: true,
    showSubtitle: true,
    mode: 'single',
    startText: '开始',
    endText: '结束',
    customList: function customList() {
      return [];
    },
    color: '#3c9cff',
    minDate: 0,
    maxDate: 0,
    defaultDate: null,
    maxCount: Number.MAX_SAFE_INTEGER,
    // Infinity
    rowHeight: 56,
    formatter: null,
    showLunar: false,
    showMark: true,
    confirmText: '确定',
    confirmDisabledText: '确定',
    show: false,
    closeOnClickOverlay: false,
    readonly: false,
    showConfirm: true,
    maxRange: Number.MAX_SAFE_INTEGER,
    // Infinity
    rangePrompt: '',
    showRangePrompt: true,
    allowSameDay: false
  }
};
exports.default = _default;

/***/ }),
/* 74 */
/*!*********************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/carKeyboard.js ***!
  \*********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:53:20
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/carKeyboard.js
 */
var _default = {
  // 车牌号键盘
  carKeyboard: {
    random: false
  }
};
exports.default = _default;

/***/ }),
/* 75 */
/*!**************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/cell.js ***!
  \**************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-23 20:53:09
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/cell.js
 */
var _default = {
  // cell组件的props
  cell: {
    customClass: '',
    title: '',
    label: '',
    value: '',
    icon: '',
    titleWidth: '',
    disabled: false,
    border: true,
    center: false,
    url: '',
    linkType: 'navigateTo',
    clickable: false,
    isLink: false,
    required: false,
    arrowDirection: '',
    rightIconStyle: {},
    rightIcon: 'arrow-right',
    titleStyle: {},
    size: '',
    stop: true,
    name: ''
  }
};
exports.default = _default;

/***/ }),
/* 76 */
/*!*******************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/cellGroup.js ***!
  \*******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:54:16
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/cellGroup.js
 */
var _default = {
  // cell-group组件的props
  cellGroup: {
    title: '',
    border: true,
    customStyle: {}
  }
};
exports.default = _default;

/***/ }),
/* 77 */
/*!******************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/checkbox.js ***!
  \******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-23 21:06:59
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/checkbox.js
 */
var _default = {
  // checkbox组件
  checkbox: {
    name: '',
    shape: 'square',
    size: '',
    checkbox: false,
    disabled: '',
    activeColor: '',
    inactiveColor: '',
    iconSize: '',
    iconColor: '',
    label: '',
    labelSize: '',
    labelColor: '',
    labelDisabled: ''
  }
};
exports.default = _default;

/***/ }),
/* 78 */
/*!***********************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/checkboxGroup.js ***!
  \***********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:54:47
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/checkboxGroup.js
 */
var _default = {
  // checkbox-group组件
  checkboxGroup: {
    name: '',
    value: function value() {
      return [];
    },
    shape: 'square',
    disabled: false,
    activeColor: '#2979ff',
    inactiveColor: '#c8c9cc',
    size: 18,
    placement: 'row',
    labelSize: 14,
    labelColor: '#303133',
    labelDisabled: false,
    iconColor: '#ffffff',
    iconSize: 12,
    iconPlacement: 'left',
    borderBottom: false
  }
};
exports.default = _default;

/***/ }),
/* 79 */
/*!************************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/circleProgress.js ***!
  \************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:55:02
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/circleProgress.js
 */
var _default = {
  // circleProgress 组件
  circleProgress: {
    percentage: 30
  }
};
exports.default = _default;

/***/ }),
/* 80 */
/*!**************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/code.js ***!
  \**************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:55:27
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/code.js
 */
var _default = {
  // code 组件
  code: {
    seconds: 60,
    startText: '获取验证码',
    changeText: 'X秒重新获取',
    endText: '重新获取',
    keepRunning: false,
    uniqueKey: ''
  }
};
exports.default = _default;

/***/ }),
/* 81 */
/*!*******************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/codeInput.js ***!
  \*******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:55:58
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/codeInput.js
 */
var _default = {
  // codeInput 组件
  codeInput: {
    maxlength: 6,
    dot: false,
    mode: 'box',
    hairline: false,
    space: 10,
    value: '',
    focus: false,
    bold: false,
    color: '#606266',
    fontSize: 18,
    size: 35,
    disabledKeyboard: false,
    borderColor: '#c9cacc'
  }
};
exports.default = _default;

/***/ }),
/* 82 */
/*!*************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/col.js ***!
  \*************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:56:12
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/col.js
 */
var _default = {
  // col 组件
  col: {
    span: 12,
    offset: 0,
    justify: 'start',
    align: 'stretch',
    textAlign: 'left'
  }
};
exports.default = _default;

/***/ }),
/* 83 */
/*!******************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/collapse.js ***!
  \******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:56:30
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/collapse.js
 */
var _default = {
  // collapse 组件
  collapse: {
    value: null,
    accordion: false,
    border: true
  }
};
exports.default = _default;

/***/ }),
/* 84 */
/*!**********************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/collapseItem.js ***!
  \**********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:56:42
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/collapseItem.js
 */
var _default = {
  // collapseItem 组件
  collapseItem: {
    title: '',
    value: '',
    label: '',
    disabled: false,
    isLink: true,
    clickable: true,
    border: true,
    align: 'left',
    name: '',
    icon: '',
    duration: 300
  }
};
exports.default = _default;

/***/ }),
/* 85 */
/*!**********************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/columnNotice.js ***!
  \**********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:57:16
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/columnNotice.js
 */
var _default = {
  // columnNotice 组件
  columnNotice: {
    text: '',
    icon: 'volume',
    mode: '',
    color: '#f9ae3d',
    bgColor: '#fdf6ec',
    fontSize: 14,
    speed: 80,
    step: false,
    duration: 1500,
    disableTouch: true
  }
};
exports.default = _default;

/***/ }),
/* 86 */
/*!*******************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/countDown.js ***!
  \*******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:11:29
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/countDown.js
 */
var _default = {
  // u-count-down 计时器组件
  countDown: {
    time: 0,
    format: 'HH:mm:ss',
    autoStart: true,
    millisecond: false
  }
};
exports.default = _default;

/***/ }),
/* 87 */
/*!*****************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/countTo.js ***!
  \*****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:57:32
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/countTo.js
 */
var _default = {
  // countTo 组件
  countTo: {
    startVal: 0,
    endVal: 0,
    duration: 2000,
    autoplay: true,
    decimals: 0,
    useEasing: true,
    decimal: '.',
    color: '#606266',
    fontSize: 22,
    bold: false,
    separator: ''
  }
};
exports.default = _default;

/***/ }),
/* 88 */
/*!************************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/datetimePicker.js ***!
  \************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:57:48
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/datetimePicker.js
 */
var _default = {
  // datetimePicker 组件
  datetimePicker: {
    show: false,
    showToolbar: true,
    value: '',
    title: '',
    mode: 'datetime',
    maxDate: new Date(new Date().getFullYear() + 10, 0, 1).getTime(),
    minDate: new Date(new Date().getFullYear() - 10, 0, 1).getTime(),
    minHour: 0,
    maxHour: 23,
    minMinute: 0,
    maxMinute: 59,
    filter: null,
    formatter: null,
    loading: false,
    itemHeight: 44,
    cancelText: '取消',
    confirmText: '确认',
    cancelColor: '#909193',
    confirmColor: '#3c9cff',
    visibleItemCount: 5,
    closeOnClickOverlay: false,
    defaultIndex: function defaultIndex() {
      return [];
    }
  }
};
exports.default = _default;

/***/ }),
/* 89 */
/*!*****************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/divider.js ***!
  \*****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:58:03
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/divider.js
 */
var _default = {
  // divider组件
  divider: {
    dashed: false,
    hairline: true,
    dot: false,
    textPosition: 'center',
    text: '',
    textSize: 14,
    textColor: '#909399',
    lineColor: '#dcdfe6'
  }
};
exports.default = _default;

/***/ }),
/* 90 */
/*!***************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/empty.js ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:03:27
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/empty.js
 */
var _default = {
  // empty组件
  empty: {
    icon: '',
    text: '',
    textColor: '#c0c4cc',
    textSize: 14,
    iconColor: '#c0c4cc',
    iconSize: 90,
    mode: 'data',
    width: 160,
    height: 160,
    show: true,
    marginTop: 0
  }
};
exports.default = _default;

/***/ }),
/* 91 */
/*!**************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/form.js ***!
  \**************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:03:49
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/form.js
 */
var _default = {
  // form 组件
  form: {
    model: function model() {
      return {};
    },
    rules: function rules() {
      return {};
    },
    errorType: 'message',
    borderBottom: true,
    labelPosition: 'left',
    labelWidth: 45,
    labelAlign: 'left',
    labelStyle: function labelStyle() {
      return {};
    }
  }
};
exports.default = _default;

/***/ }),
/* 92 */
/*!******************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/formItem.js ***!
  \******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:04:32
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/formItem.js
 */
var _default = {
  // formItem 组件
  formItem: {
    label: '',
    prop: '',
    borderBottom: '',
    labelWidth: '',
    rightIcon: '',
    leftIcon: '',
    required: false
  }
};
exports.default = _default;

/***/ }),
/* 93 */
/*!*************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/gap.js ***!
  \*************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:05:25
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/gap.js
 */
var _default = {
  // gap组件
  gap: {
    bgColor: 'transparent',
    height: 20,
    marginTop: 0,
    marginBottom: 0,
    customStyle: {}
  }
};
exports.default = _default;

/***/ }),
/* 94 */
/*!**************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/grid.js ***!
  \**************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:05:57
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/grid.js
 */
var _default = {
  // grid组件
  grid: {
    col: 3,
    border: false,
    align: 'left'
  }
};
exports.default = _default;

/***/ }),
/* 95 */
/*!******************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/gridItem.js ***!
  \******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:06:13
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/gridItem.js
 */
var _default = {
  // grid-item组件
  gridItem: {
    name: null,
    bgColor: 'transparent'
  }
};
exports.default = _default;

/***/ }),
/* 96 */
/*!**************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/icon.js ***!
  \**************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _config = _interopRequireDefault(__webpack_require__(/*! ../config */ 63));
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 18:00:14
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/icon.js
 */

var color = _config.default.color;
var _default = {
  // icon组件
  icon: {
    name: '',
    color: color['u-content-color'],
    size: '16px',
    bold: false,
    index: '',
    hoverClass: '',
    customPrefix: 'uicon',
    label: '',
    labelPos: 'right',
    labelSize: '15px',
    labelColor: color['u-content-color'],
    space: '3px',
    imgMode: '',
    width: '',
    height: '',
    top: 0,
    stop: false
  }
};
exports.default = _default;

/***/ }),
/* 97 */
/*!***************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/image.js ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:01:51
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/image.js
 */
var _default = {
  // image组件
  image: {
    src: '',
    mode: 'aspectFill',
    width: '300',
    height: '225',
    shape: 'square',
    radius: 0,
    lazyLoad: true,
    showMenuByLongpress: true,
    loadingIcon: 'photo',
    errorIcon: 'error-circle',
    showLoading: true,
    showError: true,
    fade: true,
    webp: false,
    duration: 500,
    bgColor: '#f3f4f6'
  }
};
exports.default = _default;

/***/ }),
/* 98 */
/*!*********************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/indexAnchor.js ***!
  \*********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:13:15
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/indexAnchor.js
 */
var _default = {
  // indexAnchor 组件
  indexAnchor: {
    text: '',
    color: '#606266',
    size: 14,
    bgColor: '#dedede',
    height: 32
  }
};
exports.default = _default;

/***/ }),
/* 99 */
/*!*******************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/indexList.js ***!
  \*******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:13:35
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/indexList.js
 */
var _default = {
  // indexList 组件
  indexList: {
    inactiveColor: '#606266',
    activeColor: '#5677fc',
    indexList: function indexList() {
      return [];
    },
    sticky: true,
    customNavHeight: 0
  }
};
exports.default = _default;

/***/ }),
/* 100 */
/*!***************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/input.js ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:13:55
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/input.js
 */
var _default = {
  // index 组件
  input: {
    value: '',
    type: 'text',
    fixed: false,
    disabled: false,
    disabledColor: '#f5f7fa',
    clearable: false,
    password: false,
    maxlength: -1,
    placeholder: '',
    placeholderClass: 'input-placeholder',
    placeholderStyle: 'color: #c0c4cc',
    showWordLimit: false,
    confirmType: 'done',
    confirmHold: false,
    holdKeyboard: false,
    focus: false,
    autoBlur: false,
    disableDefaultPadding: false,
    cursor: -1,
    cursorSpacing: 30,
    selectionStart: -1,
    selectionEnd: -1,
    adjustPosition: true,
    inputAlign: 'left',
    fontSize: '15px',
    color: '#303133',
    prefixIcon: '',
    prefixIconStyle: '',
    suffixIcon: '',
    suffixIconStyle: '',
    border: 'surround',
    readonly: false,
    shape: 'square',
    formatter: null
  }
};
exports.default = _default;

/***/ }),
/* 101 */
/*!******************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/keyboard.js ***!
  \******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:07:49
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/keyboard.js
 */
var _default = {
  // 键盘组件
  keyboard: {
    mode: 'number',
    dotDisabled: false,
    tooltip: true,
    showTips: true,
    tips: '',
    showCancel: true,
    showConfirm: true,
    random: false,
    safeAreaInsetBottom: true,
    closeOnClickOverlay: true,
    show: false,
    overlay: true,
    zIndex: 10075,
    cancelText: '取消',
    confirmText: '确定',
    autoChange: false
  }
};
exports.default = _default;

/***/ }),
/* 102 */
/*!**************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/line.js ***!
  \**************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:04:49
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/line.js
 */
var _default = {
  // line组件
  line: {
    color: '#d6d7d9',
    length: '100%',
    direction: 'row',
    hairline: true,
    margin: 0,
    dashed: false
  }
};
exports.default = _default;

/***/ }),
/* 103 */
/*!**********************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/lineProgress.js ***!
  \**********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:14:11
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/lineProgress.js
 */
var _default = {
  // lineProgress 组件
  lineProgress: {
    activeColor: '#19be6b',
    inactiveColor: '#ececec',
    percentage: 0,
    showText: true,
    height: 12
  }
};
exports.default = _default;

/***/ }),
/* 104 */
/*!**************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/link.js ***!
  \**************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _config = _interopRequireDefault(__webpack_require__(/*! ../config */ 63));
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:45:36
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/link.js
 */

var color = _config.default.color;
var _default = {
  // link超链接组件props参数
  link: {
    color: color['u-primary'],
    fontSize: 15,
    underLine: false,
    href: '',
    mpTips: '链接已复制，请在浏览器打开',
    lineColor: '',
    text: ''
  }
};
exports.default = _default;

/***/ }),
/* 105 */
/*!**************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/list.js ***!
  \**************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:14:53
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/list.js
 */
var _default = {
  // list 组件
  list: {
    showScrollbar: false,
    lowerThreshold: 50,
    upperThreshold: 0,
    scrollTop: 0,
    offsetAccuracy: 10,
    enableFlex: false,
    pagingEnabled: false,
    scrollable: true,
    scrollIntoView: '',
    scrollWithAnimation: false,
    enableBackToTop: false,
    height: 0,
    width: 0,
    preLoadScreen: 1
  }
};
exports.default = _default;

/***/ }),
/* 106 */
/*!******************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/listItem.js ***!
  \******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:15:40
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/listItem.js
 */
var _default = {
  // listItem 组件
  listItem: {
    anchor: ''
  }
};
exports.default = _default;

/***/ }),
/* 107 */
/*!*********************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/loadingIcon.js ***!
  \*********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _config = _interopRequireDefault(__webpack_require__(/*! ../config */ 63));
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:45:47
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/loadingIcon.js
 */

var color = _config.default.color;
var _default = {
  // loading-icon加载中图标组件
  loadingIcon: {
    show: true,
    color: color['u-tips-color'],
    textColor: color['u-tips-color'],
    vertical: false,
    mode: 'spinner',
    size: 24,
    textSize: 15,
    text: '',
    timingFunction: 'ease-in-out',
    duration: 1200,
    inactiveColor: ''
  }
};
exports.default = _default;

/***/ }),
/* 108 */
/*!*********************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/loadingPage.js ***!
  \*********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:00:23
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/loadingPage.js
 */
var _default = {
  // loading-page组件
  loadingPage: {
    loadingText: '正在加载',
    image: '',
    loadingMode: 'circle',
    loading: false,
    bgColor: '#ffffff',
    color: '#C8C8C8',
    fontSize: 19,
    loadingColor: '#C8C8C8'
  }
};
exports.default = _default;

/***/ }),
/* 109 */
/*!******************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/loadmore.js ***!
  \******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:15:26
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/loadmore.js
 */
var _default = {
  // loadmore 组件
  loadmore: {
    status: 'loadmore',
    bgColor: 'transparent',
    icon: true,
    fontSize: 14,
    color: '#606266',
    loadingIcon: 'spinner',
    loadmoreText: '加载更多',
    loadingText: '正在加载...',
    nomoreText: '没有更多了',
    isDot: false,
    iconColor: '#b7b7b7',
    marginTop: 10,
    marginBottom: 10,
    height: 'auto',
    line: false
  }
};
exports.default = _default;

/***/ }),
/* 110 */
/*!***************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/modal.js ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:15:59
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/modal.js
 */
var _default = {
  // modal 组件
  modal: {
    show: false,
    title: '',
    content: '',
    confirmText: '确认',
    cancelText: '取消',
    showConfirmButton: true,
    showCancelButton: false,
    confirmColor: '#2979ff',
    cancelColor: '#606266',
    buttonReverse: false,
    zoom: true,
    asyncClose: false,
    closeOnClickOverlay: false,
    negativeTop: 0,
    width: '650rpx',
    confirmButtonShape: ''
  }
};
exports.default = _default;

/***/ }),
/* 111 */
/*!****************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/navbar.js ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:16:18
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/navbar.js
 */
var _default = {
  // navbar 组件
  navbar: {
    safeAreaInsetTop: false,
    placeholder: false,
    fixed: false,
    border: false,
    leftIcon: 'arrow-left',
    leftText: '',
    rightText: '',
    rightIcon: '',
    title: '',
    bgColor: '#ffffff',
    titleWidth: '400rpx',
    height: '44px'
  }
};
exports.default = _default;

/***/ }),
/* 112 */
/*!*******************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/noNetwork.js ***!
  \*******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:16:39
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/noNetwork.js
 */
var _default = {
  // noNetwork
  noNetwork: {
    tips: '哎呀，网络信号丢失',
    zIndex: '',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAABLKADAAQAAAABAAABLAAAAADYYILnAABAAElEQVR4Ae29CZhkV3kefNeq6m2W7tn3nl0aCbHIAgmQPGB+sLCNzSID9g9PYrAf57d/+4+DiW0cy8QBJ06c2In/PLFDHJ78+MGCGNsYgyxwIwktwEijAc1ohtmnZ+2Z7p5eq6vu9r/vuXWrq25VdVV1V3dXVX9Hmj73nv285963vvOd75yraeIEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQaD8E9PbrkvRopSMwMBBYRs+5O/yJS68cPnzYXel4tFP/jXbqjPRFEAiCQNe6Bw/6gdFn9Oy9Q90LLG2DgBBW2wyldIQIPPPCte2a5q3jtR+4ff/4wuBuXotrDwSEsNpjHKUXQODppy+udYJMEUEZgbd94DvnNwlA7YGAEFZ7jOOK78Xp06eTTkq7sxwQhmXuf/754VXl4iSstRAQwmqt8ZLWlkHg0UcD49qYfUjXfLtMtOZ7npExJu4iqZWLl7DWQUAIq3XGSlpaAYHD77q8xwuCOSUoXw8Sl0eMux977DGzQjES3AIICGG1wCBJEysj8PXnz230XXdr5RQFMYbRvWnv6w8UhMhliyGwYghr4Pjg3oEXL34ey9zyC9tiD2ml5h47dr1LN7S6CMjz/A3PvHh1Z6UyJby5EVgRhKUe7Kz/JU0LfvrJo5f+Y3MPibSuFgQGBgasYSd9l6GDsup0WS/T/9RTp9fXmU2SNwECdQ92E7S57iaMeJnPQLK6ixkDLfjlb7546RfrLkQyNBcC3dsP6oHWMd9G+V3JgwPHh7rnm1/yLQ8CbU9Y33zp0j+nZFUMb/DHmB7+SHGY3LUKAk8cObtD00xlHDrfNge+Z2ozU3c9dvx4Yr5lSL6lR6CtCWvg6OAPw9z538ZhhZRl6XrwhW8du1KX/iNejtwvPQIDR8+vSRqJ/obU7GupjdNdh2gW0ZDypJBFR6BtB2rg2OVtuub9JcmpHIpBoK1xfffLzx4f7C0XL2HNiYDp6bs9z23Ypn1fC1Y/9PCFDc3ZW2lVHIG2JKzTp4Ok7nv/G6Q054MIvda+bNb74pEgKGtwGAdL7pcfAa8vOKEZ2kyjWuLr7uDh+/qvN6o8KWdxEWhLwroyeek/g4zuqwU6kNrhyZcu/UktaSXN8iNwuL9/RuvVXtJ9PbPQ1vhmcP6t9+47u9ByJP/SIdB2hDVw9MJHQFYfrQdCph84evFX68kjaZcPAZJWwjMXRFpJ2zr91tfuvrh8vZCa54NA2xGWrunvmg8QWCJ/N4ir7fCYDxatkOeBB7an501agXbygVdvv9IK/ZQ2FiPQdi9osGbH+zRNf7y4m9Xu9Me7N9nv0HXdr5ZS4psHgXpJC9P/wDRTx0Vn1TxjWG9LGrbaUm/Fi5meSvcrkxf/Cg/ow9XqAUk91v3qHT97r6471dJKfHMi8Oyzgx1Z03t1YAQVT2MwgsC3u+yXHzi0faQ5eyGtqgWBtpOw2Ol9+/TM+sTOn8L08MtzgQCy+tOHXr3jA0JWc6HU/HF5Scssr4jXcYqfP6V/T8iq+ceyWgvbUsKKOn38eJAYyl56TAuCEr2WYei//9Crd/5GlFb81kdASVopSFrerKRlaoZj9HR+700H10+0fg+lB21NWBxe2lhNHsUpDZr27mi4dV379R9+za4/iO7Fbx8ECknLCPTsTDJ17O33bJpqnx6u7J60PWFxeAcCbMV56dJfQKf1bkMLfuGh1+76zMoe9vbuPUnLsb2DtmOe5HSxvXsrvWtLBEhaTx29+Ma27Jx0ShAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQaEsEVoQdVluO3BJ06ptHL34b1XRjp4Ch6Rq24+kmjG4Nwwg+9uA9u/73EjRBqhAEihAoe3xwUQq5WTYEzp0b3ZnV/Ncf6O/9AvY9wlh/6dy3X7ncN512Zw9BVLXjuAP4np44vnQtkZoEgVkEhLBmsWiKqwsXpjbPBOn3gRfenwnc+7GBe+zsjclvonFDS9nA9Iy/u3x9+vAP3735VPk4CRUEFhcBIazFxbfm0k9fHD7k+v4nQFaPQIrx8Gmyx/GJ0J/t7ez7mw0b9MmaC2pQQgh0/ZSm4g5TwueWWtqLt0HuVy4CQljLPPYnB0depTn+b3t+8B4t0AdBUv93h2H9xc6da0aXs2m+r1WQsLRnl7NdUvfKRkAIa5nG//r1oGtsZvjTgev/kqYHF/TA+AXoqv4npJemOEiQU1Eo2l+G0movBK1UBBPU7s9E1+ILAkuNgKwSLjXiqO/khVtvARH8dxDBRkMzPrF/V+9/BlG5y9CUqlXinHv9mRPXtvuus88L9H3JPv2zD2yXExCqAicJBIFWRwAvv3Xqwq0/Pnn+lv/K+ZvfPH3p9p5W75O0fxaBp793ce3AwIDMWmYhafiVgNtwSMsXeHp4eNXJC8Nf0PAdRCiuf/XgrnWUqsqotcvnl9DmRkCdweX4b9N7+m/ih+mbMraLM14yJVwcXItKpT1VRve+ArC3Qqn+3gM7132jKEGZm6tXg86J7OhDfuA/iHwPUpfUZSfu2L59tXxEoQxeyxkEgjKeOnLxHb4RqC+NY5H3+2953d4XlrNN7Vq3ENYij+yZwbG9jpt9GkBPQ5H9zgP9607OVeWp87cOQtn9zwJf+xDMNFfj+jryPqXpxj8c2Nn7P+SXey70lidu4IXzb0DNB4tr9751+HV7zxSHyd1CERDCWiiCc+QPjUCnsaqmZ62O5IN7N/VUNP48ee7mAZDTf4Tt049iUG4Guv4ZfNLos9UIbo7qJWoJEHjy+bP7fNsoOcnW0A0/aacef8PdG28sQTNWTBVCWIs01OfPj66BpfqTmq732UnjgT1bei+Vq4pTv7HM8Ceg2/o1qLQug7T+FaaM3IqTLZdewpoHgYEjV9fphvOj+OShWa5V+CxvZtpzv/LwG/aNl4uXsPoRwI+4uEYjAJ2GmdG8L0FK2mYa+tsrkdXZy+P7x2ZuHdW14P+BLdank9q6Qwd3rf+ckFWjR6Tx5Q2cP58K9Jm3VCIr1ogt48lO237r3//96YofeG18y9q7RFklXITxPXV+5DchKb3ZDMy37Nu5tuxG4R9cHH6b42QfAzlds+3EPXu2rfrBIjRFilwkBIIR7SHoJDurFU89ZOd680Gke6JaWomvjoBIWNUxqivFD87fej0e0n8Fwvr0/t1rnyqX+QfnRz7g+8FX8Rv8vL3auF/IqhxKzR2WCPxXqKeq3krDTdj2ierpJEUtCIgOqxaUakwzNBR0D09yiqePHOjveyOkpxLr9VMXb73V97S/h3nDXx7Y2fdPkAYbncW1IgIDxy5vM7LZt/hgrnLtxyaBrJNxv/72N+6tuNhSLp+EVUZACKsyNnXHvHL+1qcgNf2KbSXu2bt9dcmS9qlzo/fARgcmCtpzB3b1/Vg5QiuslLowENyDWDn8cSjl98PgdBviu03N+rl9/WufLEwr18uDwLdevLTF1YK3xnVZ2HI1bUxrT7z5zTuXdRP78qCyeLUKYTUI25OXbm4JPO00TBj+6I7+db8ZL3ZwMOiYdG4dA1lN9HWte2iuI2NAVPapC8O/CGPR34Ip/AZIbIMo7yX8G9QMbcS09P+2b1vf5XgdrXaPfiYns9oeLLEd8D1/B7Dp0E1jGP042pXQj7RKf546cmGzp+tv1TRf6YQD35/QO3seP3xow5IfC9QqmM23naJ0ny9ysXwgq98BWc0kVhv/Nhalbqe8kd/Fr8MOSEr3zEVWrwyO3I29hl+E9LUHGf+nAXI6sGPdd8uV2YphIKnE5IyL6bLxk7cn3bdkHHefrpvJAExMZ1uBZmqeNzXtfzUzk/m/ens7LjV7Px+8d9e1579/44l0duZtge+Np5zEEw8c2pBu9na3YvtEwmrAqNE8IZvNHsep5//yjl3r/0O8yFOXbv0QCO05gP0JGIL+fjw+uj91YeRh/Dp/PtCDM7Zpfmjvjt6Xo7hW9ycmJjaYduf7Hdf/8HTGfa3rG9rYxLSWnsloPg7fijZV8oFM2Ja2a9t6EJd7bCztvHP7us4rrdD/r3/7ct9I99jEI4cOiQ3dIg2YEFYDgOUJDFj1e8TqX7cT4kImXuQr5279A4DeBEX8ayvprU4N3rovcALot/TH13T0fXDTJn0qXk4r3k9OTm4y7a6PzjjORzOOvn1kbEqbnEprPhRzwAKzwFLHk05hv6Yd6N+o3R6beG50aPSdr3qV6IJKkVp5ITIlXOCYn4Yexr0w/DO6YXymHFlR0e5r7tsM3fxgJbI6fW1ivTeT+SsYmr54cFff+5Cu5X+hb94Merp6/J/PusGvTE6724eGJ7RpSFOkKPCUZvBPBccoHBet3Rwe13rX9tw/PjXzZ5hKvr8SfhWKkeA2REAIa4GD6p0feRdWBnvxjv2PckVhVfBf4A29uG/X2i+Ui2eYn8n8NryuDr3jPfWSFV5k44UT137eshIP2K7/64cObbheqZ6lCp+Ydt8TBO7vTM5od1+/NR4SFVhoLpKKt410lnE8LTMzo3V2dLznxLkhYgQ9obiVjEDln7mVjEodfYcpw+MAsftg/7qSDbAnb97sCSb0Yei2fqOcbovVqKNnNO8HmAE9Cv3Wp+uoWjt27HpXNqH9WTKR+kBHKqEFbvo5y3N/avfu4g23R45f3WGa1k9ZicTd0zPTf/f6O7f8dT311Jp2fHzmgJlI/N70jPPe4bEZ6Kg4qw0lqlrLiNKBiLWerpTW25PUbkPXZViW62ecHz+4d8PXojTirzwEyhq8rTwYFtRjvpX/rlwJ+iSXugPbMuyKBOHo3geRJtuT7PujcmVUCuPJlhnL/9NUqvMD2eyM5sxMaIlE4n7XML907tyNjcxHQjty4sZv66Z1xEok/xNW5n4uZSf+8sT5m++vVO58wkEu5sR09pd9w/rWyET2vReujiqygrSopn/zKZN5qMeirotKeTyolm7p/+X06Wvr51ue5Gt9BISwFjiGsLl6N6SrvylXDNTK70D4mX071pwtF88w6Jd/DG/1E1u26NOV0pQL71y3/8PJVOcHMzPTWkcCH2YGOaTTaS2RTN6f1fQvvvDK1bdnbO2JZCr1SeRfn05Pa1PTU0gXJBKW+ecnzlxvCGndhFQ1NRP8bcY1/vjS9bF1V26MwHwsVKiXa3etYVw1TNhYJ3TDjQCO42jJVMcez7J+t9YyJF37ISCEtahjGjxkGDr2DJZ31D8h5vUQJL5RPkXlUMM07u3qSGidICvkzzuSlmlZb0olrK9hD9v9JCrPC196JoPMAolFg6CV+PPj54YeyWecx8Vk2v1Q0rSfhFT18LnBmzBRyNalp5qrSuq7kiAsh4SFa7oZ9M0wzI+cPHOjZPo9V1kS1z4ICGEt4lhiCvZrSa2jol7qzPXJPk6nIGbVbWfUvcr7hO9MP97ZVXpggOu6ajplYStj7l1XvbRMXbPAbp6HzSSBlkraNknrvfVCcPt2sHYi7f3pTDb47KUbYxuvKqkKpYBXKBnV869c3WgbDEixAck0FGFFfEzJzbIsO9C1TyrcymWWsLZGIHoW2rqTzdo5dXyykz0NC8l779i5vu4zwM+eHVntGP5jqVTq/6AkVc5NZ3wNH2lVxNWZNIukMSjiNd9z0+CHp5DXAdX4SAg203w8GB5IATtODHzdK8C15kEjhXvNS9rWA11dnfcMDY9prscss48RySakrOLWqODCoIKAgkuVgsS0urtD60haeV1YYVbbtjUn6/74HXvW/11huFy3PwKzT1r797Upe3jq4sib9u9Y+wxe+vh7W1N7jx49v6ZzbffnQD4/Cj1Pfjx54XiBls6GVuTUc9mQsOIO9mPQFdkIRlz4fy5JLm2ZMOqTcJaXIqpcqnixVe+rdbZ3dbc2OT0D0wZIibHSksmklslknvx+//q3PiKnXcTQae/b+LPQ3r1t0969cOL6G7o6E09qgZegdMJBpVQ1DbKCpyUt6oPKz/4NEJalCAuZFIuEVBJd+jgLh4rvAiFqUVGkhJZMWFp3Z0obGSu/d5gSnWmavuO6h+/cvYHSobgVgoAYjrb4QPMUiGtj1/79jBMkLBwiTlMASlYzTkhWCJyTrGAyMOFkst/BoYMmuIIyGJYcMXMMdNwHPhYN1qWS1t6ZLGaKZL8yzFXTr15BooLLMugHMBRNKgW+It8y9TEcJGt4rvcRFCCEVQbFdg0Swmrxkb0+cf2XOzq73kgdFieEXF2jdEUJKQH6SVWQrNjtZDKlpTPp38U58iUbthk/Ph7sN6zg/xudSGvD4xkq6otcnnjyF0XRRTflkyC0IIJE1JG0QbqGNpMNp5xFhRTcZDNoj66988SFm5vv3LX+WkGUXLYxAuXnCW3c4XbqGs9hwjv+a9lsuN+ahOJSCoLjNDAFvVUll0p1aNPp6adTweSflEszPO48oFn+4yOTmR+6enOshKyYhzWpf/jDuuf6x2aV/qNRaPG/1d0gUXWCA0uu7GhMmkqmerEc8KOVU0lMuyFQ+Ylut562YX9Sncmf7Ojo3BDZWbGLtMkiUVXSWTFNuMqWuYG530f7+/tnGFboxsfdd9mm8XdDo9O7rg6NFq0CFqZr5DWlK9qV0fZqGvZchSuPlevB2VmG/hOV4yWm3RAQwmrhEcW64qu4ykfJho52Vp3J8quBYQooqWDKADftBd6HD+5efyoKj/zR8ew/hWXY56/cnFh7a3RCTTGjuMX0SVB9qzu1qfQM+jO3dBW1g6uVSHv/qVNX10Vh4rc3AkJYLTy+WA/8ou9kJjo7bOh+DLVFZ64TEbCyBktxI5PJZj56R//Gx+NdH5vM4vuI+p8NXh9LjU1iw3EZhXc8TyPuuV9wDaaCfBjTM06N0hVWQmHBDzvSDZ5tvqYR7ZAymh8BIazmH6OKLbzv0KZvJEz3ZzEFnEolaEtV2XEaCLKadrIz//TQnk1/EU85NuH8th8Yf4j9gMZUOrNkZEVZCnsbtTU9KW18GqcKFyjh420sd2+j33pg3F8uTsLaDwEhrBYf04O7N/2t7/o/C2FoGnsIy/YGlvAwSfCvZzLOe+8oR1ZT3u/5uvHJC9dGtJlMrfqjslXVHwjpat2aLi2rjFFLjUSrFUjlO0juddXSSXx7ICCE1QbjiHO0/hofbPgwpnDTOR2V6hWNQqGUx34890noet5yaO+Gko3Y45PO7/uB/lvnrwxrWdha1absbgxo1FWtwplXqYSJY5Nn5lU3bLHQmGA/yko0plVSSjMjIITVzKNTR9sO7dv8RSeb/T9BWmMkKv4D+YzBXuljV7yxd+zfte6VeHGKrHTz4+cv38JWmyUmKzSGG5z7VndoE7kz3uPtq+Welvhwm39weVjOyaoFsBZPI4TV4gNY2Pw79mz8KyebeRIH+VEZTaX0sf27+v794TKmCxNTzr/2NOPj5wZBVjjdYSklq6jN69dyKuhqmWztivYob+RTSkPbe/xMdlMUJn77IiCE1W5jq+s4dYEO6mzsYAmvi/+CrH7LDYxPcBq4HGTFVcG1ULLT5orS1ULIkoSFI2cMHKG8obiXcteOCAhhtdmo6gaOh4EWWlkyYU9gvHswXfgV19d/7+LVkSWfBrItJJhObL/p7elQR8fUZnEV70XxPc01sM+xrzhU7toRgZIHuh07uZL6xA3LBaYB+Ar8rBsfz34YX1j+D5eu317QNGy2xPquSE4mDuXb2IujY2AgytNE67RiKFshzuwCR5s9ZSMlsK0QEMJqq+GkBKOF5yFzRoidK5BoFCeMjM/8mG+a//Xy0Li55KYLBRiTrGjwOQ1br4VMBQuKVJeQKVPxMLlvPwSEsNpsTEECmBLSgbHUpwD1YGwse59l2p+9fmuig4fiNZIowrqq/6Xeqm9Vh9JbjcOKvqFtACX7gV8kTVZvkaRoRQSEsFpx1OZoM2iKxxuHLtDcsZlgLzYZfv7m7XSv+r7fIm234XSP/8o5ktWqzqSyZr89PoXPYDTYkZvziw0NLluKayoEyq4iNVULpTF1IaDjHHZmoAW4aep9geN8fiLt998cGYdtVp7K6iqzXGJFUCAi7jdkuapsBJKcPBwgyP8YRyV7B04Q3dDbpY3jg6gupoMNla5U41BbUN9n0sr1ScKaHwEhrOYfo7paCAW0WiWknihhW/0Tabf/6tDtxpIVSIhGnz1dSXUkDL8fSHKi4/lWPId9Kp3Vxqegp8J/m9f14D6DQ/nmb281FwgkZ1Dj7bnSSFx7ICCE1R7jmO8FJJr8jCvjeNrIxFjDJBpKVaSlXhwDw384MyucBoLAGEfHI5ptO6n1YAq4FjorH9IWjUOnFlF3pj62aui3whbI33ZGQAir/UY3XCVEvzgdw/8NcSyGUhSlpVWQrFg2p39xp0JYLyIohaXxdZ2FGofG6yi85/QS32F0Asu8URgu1+2JgCjd22xcsVElPC85169Gaa1YTkRWJKpSqooBiQQzONvq9sRULKKxtzzAEJw1api2EFZjoW3K0oSwmnJY5tcoSD09HanEDztubnfO/IopyUWC6sUmZUpW5aSqkgwgK04DxxaZrFivacCaIdAuH9zaM1rSDgloOwSEsNpoSMenvU93dXb+EE5taFivKElRqd67qrNmsqIF+yjMF/i56MV2JqadYKxXMDXM6+4Wu04pf/kQEMJaPuwbWvPticwj4Il/NnTrdl7JrqaDC5wTUle1GmdWWVCw1+JotjA6PgnThsIdQrXknF8arkJi/+R355dbcrUaArU9ha3WqxXW3tHR9C5dN//T9eEJ3aGdUwP7T0V7F86Mr0VW4mF6o2NTS/ilaB2HDmb8wA2+08AuS1FNjIAQVhMPTi1NgwRkGKbxRxMz3uaJSRzVUkumOtLwo6Zc7aOkVdEhynN9NQ1cyuNqeEqD67mX9TXGyxXbJhFthYAQVosP58S0909czfqJqzdGODVqaG/IUbCWr2p0yukfp4FUtDfeir1yl8IPUGjPHFy/fqJyKolpJwSEsFp4NEfT6Z3YBvOp8MvMc0hAi9hHNQ1cBrJil5TUZxhfXsTuSdFNhoAQVpMNSD3NMTzzU1PZYAM/ProYkg3UV5rHT8lXmA7SwnwEq4FLLVkRI04HM+n0LdvzvlEPZpK2tREQwmrR8ZucCd7hePr7rw2N5PfxLUZXON1zHKz4kb0KnIttP6Njk8tyaimbwXPrsW/yq3v3bhoqaJZctjkCQlgtOMCYCnU4GedTI+NpQ32XbxH7QOmKG5nzdIWZJz8HNkKygqI9TmSL2JSiovGVn0A39c8WBcpN2yMghNWCQ4zPc0HRbr6GEs6chJFnmfl3knZO4/hmII1B6fiFG9br0s6qAeXPp2WUrhzHeXH/jr6n5pNf8rQuAkJYLTZ2kK7Wul7w6zeGx9DyUsZovOodOizosTg1TM9k1Wogpa7lIisOF+w48E/7E5B1Y/cgtdizsBKbK6c1tNioT6X9n3MDcyePOo7OoJqrC6S0+ZIYV+GSOHxvc18PJCxXG4ed13I727axqTp9yk9rX1jutkj9S4+ASFhLj/m8axwdDdbgELxfGsLpoZyqVXPVU1QugVJUV0dC27p+FaaBWWxknq6ceAljTNMiAf/BoUMbJpewWqmqSRAQCatJBqKWZpgJ731Zx9pJM4aK0hXe5vlKVFEbKFlxs3PvqpSSqpbzKztRm+gnEkktnU6/2GFMfa4wXK5XDgJCWC0y1iAR6/Z49iOjY7C5qkG6mk+3SFQGlEP8FFdnygrNFqBsn1OxP5+K5pGHbcBhqhT8fqu/v39mHkVIljZAQAirRQYx7Wj3Zj3tddQjVVJ4l50CMjHe8mqOTJCCvmoTyIrENXx7Uinbm4Gs2PZUqkObnp76i0N7N36tWl8kvn0RaGnCGhgILKPn3B3+xKVXDh8+nPseX3sOlpt13+P4uonv71WeDqLr1ampFB8S1JrulNaHc9rTMxltcpofOeWns0rTLkeIZUHRnpm5YibMf7kc9UudzYNAyyrd8ZLpWvfgQT8w+oyevXeo++bBtaEtQd9s1/ffRsV3I6eDJCp+nourgH04UZQnhIYfWm1o8xdUGCU8/E/bil89sH3dlQUVJplbHoGWJaxnXri2HTvd1nEEcCBS3z++MLi75UejQgcmJjL92ax/gNJPo6QekhVXAbdvXI3D+XQ1Bcxiu02zTAEjKFIdHTQS/S8Hd2/4YhQm/spFoCUJ6+mnL651gkwRQRmBt33gO+c3teNQYin/oG6aKX5rcKEukqqoWN+Ij5vy81v8UATDG0WGC21jlJ96K6wKPpWd8H8jChN/ZSPQcoR1+vTppJPS7iw3bIZl7n/++eFV5eJaOczX9Z2YvM1LPxWpocBHKv8qHHdMqSphGUqqahaThfj40ITBcbLnsDj6oXvu2bS4n96JVy73TYtASxHWo48GxrUx+5Cu+XY5RH3PMzLGxF0ktXLxrRoGNVPPfNtOolIrgElLGYH2wbZqcipdIFVFlDbfGhqfj9bskCaHHS/7gTt3r73Y+BqkxFZFoKUI6/C7Lu/Bl1jmlKB8PUhcHjHufuyxx/g5lbZw+BL7bX4EoiZqyS0T0uM0j1+82QSl+ua+bhxj7GjD2LicwWkLzaarigbKsmDJ7gcTmezMBw/t3ixntUfAiK8QaBmzhq8/f26j77pbaxo3w+jetPf1B5D2RE3pmzyR4/nH+Mti4Wx1dUrCHO0lSVGqskFUnakkpn6mhu086jgYHkWTW3Wbo4Tli6L5gqYHE47vfeDufVv+YflaIjU3KwItIWEdO3a9Szc0ElDNDqcLbHjmxas7a87QxAnX9ljfxcr+Mzs29ykpi1O8iJjoR/cm5o7dnUl89LRLW93dyWmVIip+Kp7pmlWqIvQ8Mga9Gslm3Efu3LX+K008HNK0ZUSgplnGMrZPGxgYsIKeXa/TA61jPu0w0+7xBx/cd3M+eZspD0wbDgWm+RXP13cODY/jWGKuGAb48jG+agNpilbqlKZoWDqDY2AyjtNUlupzYZlKpXgaxIVMNv0zd+/d+uxcaSVuZSPQ/IT13TN34QRvZW81n6HSDdMLUqmjh9tgd//Fi8OHEl3JL3Z2dh3MzGA7XU664llVWRz/QhLjNYmsmaWp/DjCjqIDdlaZTOZZ1/A+fGj7hjP5OLkQBMog0NSE9cSRszuswNhdpt31BRnazM3U9IuPHDrUuG+419eChqU+cvzqjp7u5P9KJpMPpqc51Zv9QntLkFQBEqZluVCw/7nhaP9i376+8YIouRQEyiLQtIQ1cPT8GjOw7vE8tyFtxBrb2MBXdh579FF99g0vC0nzB548ebNHT2l/aFmJj1BPBYyav9EFLaQ+jdPAVNL8/pZ13a8qiJLLOhAAjvrTRy/d0enbF+69d0tzHFhWR/vnk7Rple6mp+9uFFkRGF8LVj/08IUN8wGp2fIcPLh+4sCu9R+F3ucj0MLf4vaVVnChqYWmdaQS2jpY2vd0djh86Vqh7c3Yxm8dudTPxaW0lrn7yJEjZW0Tm7HdC2lT0xKW1xecgHE3FDWNcb7uDh6+r/96Y0prjlIO7ur7TOD5b3ayzt9ylY0Gl83qKFXZsCXrXdOlrV3djf2LBr556JOshLDmMWhPPXV6vav5O5jVxYLUhNl3iIbV8yiqpbI0bQcP85C2Xu0l3dczC0XUN4Pzb71339mFltOM+Q/0rzu5f2fvu1zH+QDOt3uZ0pbVRMRFouJK5qqeTkhVqyBdtdUmhGV5JI4cudrpd5kHiyp3tTU/8s6r+4rC2vCmaQmLWJO0Ep65INJK2tbpt75298U2HLuiLh3oX/95L+0/kHUyvwTieiUJHVEimVzy1UKeWMqv2pCoKEVFRNXT1aHawnBx80eAZj7TwcxdAc5Gi5fiaNnNT37nCk4xaV/X1IRF2B94YHt63qQVaCcfePX2K+07fMU9U7qtHev+xE/7r3cc70O+6w1gxuV0dHZiusgvJS/O7IskRXLs6KCxqj+B26t9a3uUREWi4plbQlTFYzXvu+7tB3EIUGel/L6e3TNw5NS8zYAqldss4YvzBC9C7559drAja3qvDoyg6pwCP+KBZaVOPPjazS1vMLpQKE9fuPnawDB+EqehPwzWuAuSl8LPg90WVxhJJPWQCUmPBAWTBEz1TFUGpqO3wYYvIPgr2az35a2b1/50V6f1e1NTlVcvEzB0xRekj67usu5FmS2/crvQcaol/zeeObfTSOj91dIq28PxiaOHDx9quy8LtQxhcZBqIS0Dhkl2l/3yA4e2j1Qb2JUUD1Iyz1waOQib0vsxKXsAFvH3wMB0JySwtZC+DBPTN5BOCEnhrI1BuKe9l6tIzsVCiD6E0DOabrwI2elZ09aP7N3aNxjheXvK+a1OENa0EFYEyYL9rz072Ju03ZpNQKj7Xd899cKhNrA9LASvZTY/s9GcHoK0XsrakLS8UklLxyl+/rj+/Qfu2367sJNyTS7SuZfneO7ffweBGScu3NwAqWgrTvTc5jjBZmw87tMCfRXYKQWOgula4OiBOQUZ7DZuhrAGdQXxV0zPuCaGnkv3VPGHOpPw7+QPR62OM5HhdNddGOeX2kmCbSnC4mDlSStVTFr4eLljdHV+702vWz9R66Cu5HS5h5hmHvz3QiOxwJTRo2BGgY06dm7OVhewYGAY6s75oD+ZDs4JPY9JyqSCQ7ABqftd5VFM3/j2Ja4mtsWpJQSq6ZXu5UZTKeJnsHpohiYPRqBn04nkS2+CQWW59BK2dAjwS0Y4IHDz2ERWG8Gnwm7iK9W3sFmbvrqGPzw6gW8eTmvTM07XmTPX28KYd7EQ3rjnvv1QFHbPt3zT9DcMPHd+13zzN1s+/hC2rKOo7NjeQdsxT5LEWrYjbdLw05eHtwWe9jl0542u62HZHZIVpalY/yIlP5X3MHYddLLZfy4fmYiBhNuB509vw+rG3tKY+kOwGHLi7W/cS91jS7v4s9TSnZHGLx8CICH9lXNDX+zpWfXuycnaBV2e3e567nAm4973qv0bzy1fD5qr5oEB7KXt0u7B3Loh7yhWVfypbOalh9+wr6U3mbfklLC5Hi1pDRE4ef7Wj+EEiZ+amqpvJT2bzWjJRLIPR3n9riA5i4DZg720DSIrlsrvHXSZ9p7ZGlrzSgirNcetqVp9/vz5FJTqj6JRejTdq6eBMzNpHP9s//QrF4bvrydfO6f1JrCX1mvcXlo98Kembjotr3wXwmrnp36J+pYNeh5JdqRem83O77gxkpxtW3bgOZ/g1HKJmt3U1Rw+3D+zrc89aunagnWzpq6PdxujLz388L4F78tdbtCEsJZ7BFq8/sHBoMPX/I9hyrGgnuDUUZzrnnz7yQu3HlxQQW2Ued++fZmJ1e5LoPB5k5ZpWCPXz+08du+99zrtAI0QVjuM4jL2YcIZeh+2+9wF49MFtYJSlgmHE0g/JlLWLJQPg7RmhtyXsJ18eja0tivsXhj6xy9ve/mRR5TRcG2ZmjyViN9NPkDN3Dz1FW5z9XM4i+s1ME1YcFNpUIrVLHzJzHnwjl0bn1twgW1UwPHjxxPXpztejR0HFTc+F3YXRwxdfdM9W08D0zrs4wtLaM5rkbCac1xaolWOvurhZIPIih0OdVm2haNTfqUlAFjCRnJP4HBn+iUqz6tVa2nGpTe/etsP2o2s2G8hrGqjL/FlEQC5GHghfplSUSMdvwaEA/9+4vjpa3c2stx2KIsfUek2dr+EuXNF2xEjSJx98w/tbFt7NiGsdniSl6EPp84O3W/Z1oPzXRms1GRKWdCJdeCIlJ+vlGYlh997r+70+EPH8NHJEtLCauCph+7bmj81ox1xEsJqx1Fdij4Zxi9AT2KSYBrtslgxhOD2gWOyz7AstFzx6zFHj1mGobYUYAgC9cHge3ddK5uhjQKFsNpoMJeqK6+8cm0X6noXiWUxHA8WxAdWNyQM45HFKL8dyiRpueM7jllmMGpnjO+1w9fNaxmXxiogaqlR0jQdAkeOBPjczrnOiQ6jw88ESSOA6KT7iQzOHEvavu1pZsLQg4QPP/DdZG9Xx/vWrOr+mfR03SvtNffdxleAQIgvTzjBT0w409Mpu2faufZy+vDhw5WPMa25dEnYqggIYbXqyNXY7i/jCyvdfmaVb5hdVsLp9LJGp43j1/1A7/RdvdMwPRzEboRnLVHe9vEvL3eXBOB4ZMta22H+TiqV2LJQ26u5u6Bju44Z3J7O/Lvp6cwPmBanOwQ4uNHRTWMK21bSvh1Mm642nTWCtKkH07rnTE72aOO0XZq7bIltVQSEsFp15HLthg5J/+aJE12m3tVjOPYq1/dW4cTjHnwMYhXOce8xDd3y/PJW6OpMdsTRVy4iK/rKMR/jwvz825VIHFzT3fkx13UW/dnhRy3GJyeeHEs7n1XNibUPFvY6vtGDw5vV9w0Vofn81qGhZfDhi3HX8SfQ/3HPMse9CWcCX0gel2OIFJIt+2fRH7qWRaYJG85NxldGzV4tGayFSLQ24+q9ULyu9gJfMU5ELTn6wUISTl03NHz1KzyiJLqmX657OLLdSJgoXTO7cBxyN172blier4YCvBsFdSNXV2dC35tKJrbzfPfFdjwvC/qs9MSMxxNRsSqmT6LhUDQHE+jUBE7UnATXTuLsrRn01K2l/x6+qItiR3TNG8V59KNB0DGSfNXGUXwJY2Gm+osNhpSvEBDCasIHgVLTt75/aQ0MnXpBNb2QgNYEntfr4wu/nBYpKQLtxtdwAh0SBX3VDe7nM/Ha5vf1Fb/CURS2bCTAWWuxR229qRsbQQQbUed61LfW14JVKKsTJ5sk8WUcHbtlNANyTOhgcmAGKH7p3m1FWpqtuZCu+LByVdKHVMjpKEQrBwIW9tnpXOIH+QTDSH/D9f0bmCLewDn1I4HmwtAypPDZ/oe9oXKf/aMPsWxSs/RR13FHrURiZE1gDR86tKHEdCDMKX+XCwEhrOVCvqBeHNaW6ui11/mWDtLQ1kEiWodXE4rwYgepAPssTPCMOjIdAk94TZ8pMZjch8HjDorGFUTUAwlkh64be0A9/ZCatiDZWtOyE7ClQmIdJICJFYhA+TRV4Fo5/QIHiUvrTEbkVRCxiJfsSBbfYk87OTExXxdazY5yUgiRKfpHQ1YSkONmAZY+gV4NIeVFfCXoLNA5h/Plb5LzWAyzF+IVXdNnvO/6GcsyhjC1vmWZ7s2pO3fdOqzriy9asnJxZREoerDLppDAhiIAEtCfO3F5rW0a6z1PX4/nf53nG5RqqrpieSnULEVh8cx4E7ugH78H8tG9eP/24oVezY+pkpA8b/abhPF8le75BqdsXUtaFeaTlTI2IByEoU1l8oq1mkokcZHElIRoWmpejMMCMyCvQXyy7JjjuUcgOl4tLCzCMpTHgFpcgkViX/dH/ax2Szf8m2Yqc/MN+1r7BM/C/rfCtRDWEozSkbMjq7NTY5t13dqE6dhG3wsSqlp+C9DDi0ifLrqmT1f6BgUaPjiHN0lJAGAfvpWcI4XjiHIMF6ocO/EjmMa9HeelQ1LT1PRpoce/sJwOTCQtc+kfGQp6Uxl+9JWtmL+jNEaJ0gKBgbsygR58B4sHfwV5aliVWg3vCHv6ymHcdG868IzrVsK6pnd71+/dsmXxbD3m3/W2ybn0T1/bQFe5I8euX+9ybuqbXMPbDA7ZCKV4uMOecyz+9OfmWvj9x9zEw6JW+JuOX298WhE6qtwLEV3TL1tb/AWj7sqwfqaro/sdmcyM+vBp2XzzDEzaBiQsNH+e+eeTjQ+ohwqnG0BYhfVzNYKrkOmpyauYYH8KvD8G6RPBszrC6Jq+ystl0ghzXEZjR5+O4+iZwTh+eG7Yqa5rq/3hGzzTSkXKn4YgIITVABjBP+ZzP7i8ydasrZCetuCHvIvFRs92SEdlpnCYE2LOQi12OA7RNf1yjrphHIyE9yOXPnfNMDg70DpdTf8DWDKs5rRvMVwChAWrUgh21HzllD0NrigqlxKVC7bKQuOOWeGiuI7OTkhb6T8C/Xw3xkel9cXxj6eIxiY3Hhx3X9dHsWJwDaa3l1+zd9Mt/F4tUk/ijWnP+/DBb8++LWqvnh0c7NDGta0pO7kl6zpb8AJzEUr91kYEFdeBRCt69Nm4+AsSl6jwjVGckY6VwPwUpLhLURx9xliWvxFHi/w+zB0SWCnLsVpxnoXesSI2ngp4zmRJXPgf/0IleGH51R6uwjeX5MR76qtITh7+8N9Cp4GF7Sm8Zl1s35pVXVomm/5c1vG+Wm284njHJeJq44/FjixUAld8w7uijW6+xo3MhW2S6+oIVHumqpewglJ87+LFtcFUcqur+1vxwPcZJqYPMOyhXw6GKI4+4/GwQpjCBhe+6XDIpFb06PM+np5hhS5eXzw9bLJ2pBLGv4Fe36BU4kA6IQGw8MUY6MJywVeqDs54Z69zrWdY7jI3G1ZtUiSV6zzDI3IqLLew/wu9jspl+yywrA1pEed5QceXPT3jBb/DLrA5ua5UHZ/4eMTbFx+fwvE3DJO8fANrjlctL7giJhRx9MrfR89R+VgJ1Y6currONuwd0FNsxwtV02mPlWGLy1TxlPHf6Hh8PH9xesvw9yRM+5PIRT2ZIgVKKZxWUY/PT8aTFPji0i3m4Ed1hDWV/7uY9bNGtiGqAyorJRWSqCgdkrQiR5KddrwPlsq8xfhG6efvx8dvtiQczDdmmPaldDBxSVYeZ3GJXxUMWzxq5d4fPz7Ym7X1HTAL2A7NqtJHEQ3qtCPjw3LoxB/v+OMZ5VVzR5aHWRuErYA+y4uu6fM+Xl9J/lh7bFvbY+vmv0bWos9tsXAWSLIiaSnyApHxJz6SbFSFuXTw8i86r5vVRW1m+6IHmUREAuI0lcREP5q2ztWPrO9/YK54xsXHI56+cePvj3qBfimZNS+J5FWMcrjptThsRd4dPX9+DcwEd5iQphwozfkCwJKaLv9ewHYKeicfSudwShcnJDBBOD3MTwGRO0cqLIj73jQTaejDBYaPHTBgJ/i5+HyYijd95sFhRzkzB7yL2IrCtGwezj9nOQVTUlfPwiicifnu5J0qHHd8mXHIG6ZD7JQqIk9kJK6QwAokMWRUhMaSeJ0vcfaiXNhs7PyuwpYV51Vh+EM/Pu2M9GckpyiOuZm2Wvtom+Y4me8xPbvIIujzPu6Wbvyt1ejL3U7Sv/v754ZHsORwaX3KGdwiJhO5pzY+Mivk/urVq52jTnIXlEc78LKu8qAMx/G8kHhyOicosz0ovM3IrIDKb15HSvDoOoqv+hMLYCOWI8ash0vmufryZVcqLz4u8fym3ov1xT/EVp4UDUTn4/iS0xW+sZTMojASmLqGp64iH4FRXJQ2TKj+lv7JVRTVxwQkm9APyaboGnGMzSVR6VR87ipsVT645ovOzi5tamb6zzB1/nqzjz+s9YetwLioZW5C8jq08K9+1IxS8yQsfF6ap1WL2BK8VOaJc6NbPcPrx7wJ++hmHQUPvOaQgMJ3ETtVlERDP0wVsQ19uPgcLQyt/Dc+p4jlL6k/1xa2qVyh5ApEzEoErm/DsPOTXV3de6anq36roFyRdYWVbVSshHJEMt98saIXfIu9koplYZL6m/hUz7kS/Jt0/PE8+Jj6X/Y6k+fv2tA1BKIvB/OC8WnGAmp5dpqx3XW36fjgYK/upXbhFd+BrRlqn16MfkrspkoC4hnirYjbUVWzs4rHx8uL3cerjwt0TA4RcBcsuX8Rn97q54okVsCKJJ9YkSvy1gJR4aOtnAr6OJP+L13d+BKBKMEzHhAfgDh6yzD+vqHjTDDvYpAxLqwEfVdbE9bpIEi6V27tdLP+LnzPrWS/XrRTnz5d4e79+LNY7r4kP+Z7Jv7z1LyPL0B4Tb+ci9cXLy+eJ54e8Rw//rqqcUR+HOrgYVprJbBl5E2w63oI64J7k8mUDZLGhmAXs19ucVkxP8gKQu4ptCxbMy2TW3KAGI4u1P207ztH3CDx/7bL+Cdse8h1Zy5ev7Dp8uHD7blJuy0J69TV8XW6l92Dl3cbLG6g98idbhDgdANcY1ZY9o2N4mpNr96GRf1Da3Wui0RW69F1bWslvp81LD2xDTOGu9DhQzBc7AcYfYlkAqo6A6ozqHNBYJTESGitTGShsp0qQSxT4AcoPJQw0LBlEPhBFakHDjoLvY+XgVIyg7WK77tG8n9pvpHXBbXL+OMBd7FN6KLu+uf27esbX9RHdIkLbxvCGhgYsDb3v2a7obt7YHakpKmYiqgE2ioqJbzIOszXcSov/DAzRRNehyJKvPx4+igv/ZLKEaCkoZxUFMYXE1I8f7Xyq/UHp9CkAlfbCF3NdlhS7IQguA0N2wiJYy1ktC5IISb1Okr5jSYruy2SGlYkIkKLSC3yy/WrUWGzSnjaTUX/QEhYQuNewLCdwBFKRkpOuAfr4sBnwwfDg6B0MHagORhBHNqHw5WxTwYav6lAt/42MBLfrYZXHO9w3Ftr/B0Hp0pY+tkD29ddAz5ln8NGjddSlNPyhHV8aKjbzAS7Dd3egRcvgRHJWyrHASw9Pyp+vlSxEluH0jWAGQF9VVZMpxHVRZ/xSKQU4PR5Xy0+/sLQZCFS9DN/XKtSeh5WrL2x+sMyZv+W67+vwz5eC7oDx12rm9pakNg639B68XL3Qh+2Bm94DySxHhg0daBHSQhiCbyyyMS9SDi8RhEHyYP1qD9qak0S4VGn5VYrSTRKEkKHWYYiHuQmCYb/YKYLqS+3H5LYckxJmz6qhSYJ5yNgzgtuclESpncBfN8Fj3lgJdCSGpHcGECoxrouMoHjzO+4evLLMB1VKxJV8Wyj8Q80Ix043jnTu32hlTdkh08Yn7UWcnio9Qs3pzZm0lN7LCOxIdIZxbuQ1+lAVFFxJB7aMeUIiPkiPRPjo2v6dPF4FVjHnxi/oQK0Az/bymf5uI7ayGLj6eM63nrbF5VNXzV7nv3HViQL3JAEaSV1z0iBNJIgJBCYkSKJYbdjEiSHw7a0BI5s6QBBbINUswMUsQ6E11UojZGccA9dcZDBdQY+TgyFTgkiEKYyIBvstAQzIRk8cBJ+A2j4gZFDFWAqjAp3V5IhQYYwwUJ57ByS0QINzMYK8FyrRxt3KNbXb2qG/UVNT5wDyCt6/A0boGbdqzPA4tD21SPquWihPy1FWHjQzYs3xnZkM95ePIZd8RccBx1xez/UPowp46I4+uVcLD9/8Plq0Gfy6Jp+uez5uqPyY+UtNN5DuVQc06drpv4bIDXsjtsMpdkOSC79QK4Xog3PzwF4IBNCBiIhpBSpoE8jioqWaM2KCRuOqwLXgIQItKIe0lCYD/lZjoqgGIo0+J++SsmMKA8eqQ21qHuUh2PfzQHN6vgG6vVK8GfmQhcbr3Yff+AEi3rtdCtNF8u/eIWD2ATXx4Mg0XH1Vr/hm7sDQw8PvyvTrriKWocEE0C6oM/kJRJHrAykgj6WGlq+JUifu6YfS6pu4/UVa6AgQcXKi78ApekhcWFBwMstEkTX9MvVHw+Lt2ex+4+Pg62CxgsHEwZbAdgWIJfA+ICkfDRYtyAwWWB7Ay8F8VT/KB0bOJ4Gx/CQfUKSwZGrJJs8iZHYgB0zMB+zk8hopQ8hEcEog2ERASIBAOL5fIrVIKLxXKtzKPZLgZUckvGf+/nH5HsK0+Uz3316zeAjj3D23Lwu90w0ZwNpiZ72UnvwfO/AXIFnXfLBxLOsHn6yiLqmr3oQ04LHX9hq6TFHI6txrlYWkHj98UT1lh8vryR/rIKq6aO204drdP8hRWF3itmLUw42QnW1CSTSA2IAIXkWOBYKLWw8wjVqNkEaFqjFwLQNJhWI4ZiFoiq6QX0SbsEo6HMoWVFCYprwjw6FP65BXCSoXJwiOwpnFK9A6yiWkQhRDwA9XAfpwLS/AqnqSKP7jwapquiznXFXMn6x8Yg/X/HySvLHKqiaPlZfvf0H6BloAM/v3tpzHkJwUx59Uxb4GE5Lfnt2ZGS16SX3+F5mq4llfegtwnaSR6J5EC8hPUV6IDaS6aDnoZ5DpYe6AtdgOr4pyhXLNPH0KKCo/DDP7N+S+mI6qHzbQr7AbdgW+iylWn0l5cf6E29ftfSN6L9lGl04x30tOtMHklmLhxpClW9BL4S1T+i2uNPRp+0FflD0AN9A9LHnmHGBBfJCE3QL9ALiguoJqiu+64gDzWGIIAlhzhaSDsMV/yjJi3BxyY9khP9BXBSzEMY/AFORGMmM1yyKZfmm+ZKuJf4uMHV1THEj+o+S864E7zYd/8Dliqp2MamvPbt9uw4dY/M4DnXTuMuXx/scK9iHLcbryzfKwvOJBSGNPl10Tb8WV0xYyMFymDdXXv46Kq+ueChJQI4WlSUqf8StOf5CNdXqr9afxe8/Gm6AoLAqGKyCGLSG350ACFzKM2FvaeOseEhFOsjItdQ2S6wYYmkOdl2+CfLBvmpIV55vYY2Qn6uAxAWC40zbhxSmWArcQj0TSIiSU37mx0kgVesgLereOSz8E5EWJa6Qzyh1hZEcO7xY4Ct9WLfNvwa+5xA2h6uGP6vMPxMsZ8WNf0Gf+cOCw9usq51a5+kNG9Sn1IjJsjoO0LI7EpVra/vxhPdFs7JyjYriohlbTAKGxO1C6oJEljseOLqmTxfPX66OucJK66OUNzuDjK7p05UIbGwX25I/vrj4BYrnD0uZ/Rtvfzz9fPsPIkgkbL0DZNMFRVEHFEY2ZCBTcwMLdfCsCCVN4SwpE9YG+ARNgD24IDHYSYB1yNCYDkLRFoC8oOUG40AKQx5IYyAmlQ6SF7dDoSof0hbJiApzqLs43aPc5UG+AvVQ/4T7nGQFQiJ5kdbAkmgH2Sz0FaWB4gLrad22v4nmuvPt/yzCc1+V4t0e4z93r8PYwDCvNANxLSthkai0jmCf5+jq6y6Y4SkjTfoKprgWufj9Dg3AozBmiK7pl3H8WDH3u0YfLY6u6c/HVS2vSvsxoygyTF2q/qNenEyjJ5NJPYGPRidME1M1/JYqwyoNq32Ihu4J0z5M+WA2DoqwEI9wfmEaEhQJzPNsKNOh0jJwrfRVJqbnNOrC6IGwQFzgHiKrpCuq2kE+FizrMXWE7IWCEKemg7hSiimOQchNIC3EchqpHlBO95TshQThkwF5TL9k+Mm/MZLGzVo3AlQdLzagDle1vCYd/wU9/5Z5ZcyZPnNow/J8ZHZZCGtsbKw3rdn7nIzTx42o0WfP1cPKuYJ6XPFs5q7p8zmKx5v8cdcxDeMPOR1fj+gh4X10TV/dukiC+nJPeLy8eH1hrtm/UVvpKxcrP2oL/dlcs1eQ9PCeo73wGcp+R2Xyvlp74vH19B9EkoA2CYKUlcQqJCQj6vkoyBjh/IurcJiy4Zxy2FMptRBO7sK3kClR0UYUZAX+wMqfC1ICiYHMYBsKSQsSFKaAUEqZLoiK00ASFsgpN0UEUWE6yOkiiArE6NmUb91OWwAAEuNJREFUszCNxA0c/uBoF04W86YOarWQAYjGmHBBEIkUiXEqib025hNmInWknv6zKo77Sh3/RvcfSx5Xl4O4yr5Y7NxiuEEQFT4uvs8yrF5VvosX28LLS185vsiRHkc9YPiJtrCbJIzHyx3gJdfpl80flZWPR6qIxJghus7xjSqj4E9UNn2VvN76Csqq6XIR+48OYEeGlcAaXhLfQwxNQcgQEI9IErOOxBUuCuDLz9Arm5iyOTaYy7Jty8hAb2VCm43ZmwnwQTbgFpAWyA4SGEKhaMdgYNpngKAcpeMCAfFjYGE4yAqco3RZ0LorUqOkxVkf6AgzvFBPFbISSsOUD+WRrWijpcwbmI4Gomj4yxAIv4bPVU+q9sfxk/EP36UlfP49N3vNWr/m9CZdX/zzjDDofAoW3XHVr9NPHdB8p2+uORl/mjFLUktMbBTtkSJbpLCRxYyD5OpJps/4+DJuvq5IIgoLqfi3pLzcRuloM7QSzKImsBSWG80LVKkxkSvOkFHaCjL5QvrPN9rwvaSVtEg2ICmQCNRQkGjwnlOpNktMxdds+GxcRFrIyCmhTQMEUJjl4qwtzPbAOVC8o0DUZroGiMmBpEUfRBZ4DvRUJC4/1GOpij1ML9XU0PJdFxIZGsOpJkkOQ0YdFh5CPodKl0WfRqQkVUhTIEf1iN4GkdJU4Rx/xsJfHkpfMv4cd+IAUJb1+YdkfSU7NXp6+/bti7qquKiEdfVq0Gl2TO2DonYzAcUTCv0slCB8FuGia/q8j7iAPl30aNIPHVKq55w+00MvjFLo05WmV8H5P9XLzydVF/H0xbGl9UGfjm226B98po2u6fO+0f3H9M7SbT1h+FoS00ybSmm+5/RZHxzbwWvVHtSvNuLRR4BKl0vPtHRhWh1SESUsNBkH0qjvNiAx4MA1JDBc4yBmTPmwJArJCFM+dA1SE5XsmFIqRTzKUrZYkMio78IUkauFoW6Mcbin1GWrOR8nqOEUEUQFmuK3ZdEw6NFg92s9j3XLp0CIsAuS8VdPkcKhCZ9/KAc81x/c3NdzFjy6KHZc0YPNh7VhDg9jYnh4co9n2dvx1nLalys7Rimx2xLGigfEJBQ0Xr149FkBVb04BQiTlPAFbTiDxRGKM1pJf5AgarPKG0sQu413N07hkCANO5m0fSebtCwziW5DqMISHTRMJCDF23inYbmsauNCHq+Vn1ta5dErzKN8psP/RiIXVpAegKJQ30Y06AQSEXdAIpdL0wbTNsLpoSIeCwRJHZYBpTusIFAIlPC0iqL5AxoCcmLPQkkLdITRCc0dSFqQD1A51g4pLOXmhZCwDMO2BpH9q6ZtDoU4oKQIy5yEynFnv+mzw+0+/q3Sf5yT4aYs89zq1alLIK7wYeQANcCpgW5AOaqIARzxcudrXrMTz+cuFAxBI1Rw06eLKz3xsnDikt+Mmr9mWBlXrbySeJAlTt8MXJImXHRNv0zx2GpWZ3r0KKqzXHlRHH26+fQf+mkbg56ADjppUuihMJl7BEhGtmnj+4Phj1lEUAzjaQcgJkzcqPPmlI/yjdJV8Trf/+hbeYyP0uMS0zSVF8SEaSELxkhR6a7IC1IVHkNMBWEkCljxYQ7YXgWKrDCHw2ohJDDKSkr5Tst3TANBp7DdgkTFKSOpxYMtV2i3hXQoJjwbBo3L4oibAajdXmSbCl01PEvi6x3PetMvwfi3cv+xHpPRk8GZvo6Oq5y5FvZlvtfqQZ5v5igfH7iRdHqrn/H24McyEb6ejCUxkCwqEATi8JDNKtWRIxI6wrLj+aOyQgIqLT/KTZ+OLYnCFGHE60PdSgzIgVmcfrbt5evjYkB97VeNyv8plx/UYoChElhYgB7KtD3PAUWRpejIVNzNAjNzyDuYRqnrMF5dIx4CkTrlAJQRps2FhZIX5lqYwfFLOygTBeSmkUhDEgNvIC7MR5ML6JhozoCpn+858G1utbH4j7BRT0Z9VlZzbTyOKJCKeCjkqYbkFBJh+DXCPVcKuXKIFURlm8WBoZSFOBCYmk6i33ioT+Kw1CegEMspcFfe+M8+rRySNum/YUwm9I7TPT04NWOBDg/nwtz16xMbEp3mPswIOuI6G7wBSlynz1pQWZEIP0smIcEEWN3QsfJDn+nj9FFSPh73wilgdE2f+eOumo4pPqWI2kI/LKu4RVXLq7H/kJopRUFhnkj4joNT9KC/BlZgAIVD1I+cwASVUBgCIsF1KEQxJLpGPKHGP5LYrAs5ikREnmJ61KF4K5cG1+REVS6HC1JauGroYYcOrLWUEp6MSF0UpoZgK5hV2dgEzeNLYbMBnRQZEUPnOwGMT6GOp57Kg/0WTCMYjnsQHpDmlJFTR5IcNt/alvV1PdF5NsKcLSpGG03L6QcjnWDpeIXqgFYb//A9wGi1+fMPDeqY7nae6uvT530KKp+JebkhHJyX6Fqz33X83tCgRr1d6gXBH+XnFtEwDmEVMBfAtbK7UvHxVTb1gGLQokbFVBZMDtUJHmT+dsPxmqSRU2nkrxkWxhfbOfEVwLov4sIaonSRr1qZy6vy8xliPbn+qPjYHxSm6mJwdB357DfaVtJ/BMLeW0/ayVQSR6TA5AB7h8kwmFeRrFBUSFYkJk7GsM+F5SuiCQmFBEriCskHYcxfEM9ozBjBS/yaKD//rBzndjD3BHswAcmqwFdhOWGugCw5owwpEt9sxMlVGWQEK4GlcAOi1XAcL6eLICfdcMFmNDnH7xdO/YTCHTkxM2B6EiSPbuXmHrZO5eJy4Iu6lfo2Gu8orFfA+PM9UMjnHpBIx9v+/Q9Wm8nMfcMTE1d7u7vP4Ec6fzy1wqOGP3xI63JHjgT2/rsy/boTbMP0pe78dVUWS5wjK0VUjIqNN3kA62ZYeIcfxofXDFNFUZBTT4W6m71mWBlXrb4yWSoEYWh0jVIUdJEmzA6o18mRDN7dCplCEkK8IiP4WRAU9OO8j5wimZB3SAhKYlJEphLkJCaSEP7PEdxsfVG5UWFxP6qPPngTlvBED6IWLN8dTPmg8ocFPPRXWBdlFWqqCEmLlhAgLRtKdLaAkpQNfRUM6DUQGOUiTimNEaT7FvRVw/F6K91XG4/mHf9KPaovvJ36jzfSS1mpc6mUdhnvhZL4a0GjZsKBKK+n0+kt0AHvztCAsIzjeeAeUKVPF1l101cBWCICxcGmcPalUeHRnyguIsJYej79fFnpKxdjrKhu+spVK69Ke+OW6SXlh7Xk/8b7D5umJKY6nUiQAEmp5ZKoD5Ay8kTFzcAsJIrL+ZREYCWAaU4ubXRNP8wfpuSuGubHMwCJhSuGPCiYJIMw5GV6xkfY0Wd+WoPiBAlEhvnzNluw3SKZYTkQHIQ5J1RQDg7Lw/QQGUIdFp4wcC9KgQ/7KkxjucEHROVmc3ZaCFfEjMxUvlPvBZ0WhT1Q1zG06hQKyGPA9qEh4bPRJuO/0p//WvoPyXpa77BPr9L1mn64QiJRT0vlP3jg1oyn0/th1dnN6VOkQyh8wVRuPpLUH9GHi+sckD4vLaj43NSHLwfv8cKjbGxdgc97JUpFpIRbpovKYHTUltkpHYkyEqNYf1gWfZU+Vn+JiMZERS4qKyTAMv1hmwoItLT/aL6OL9cn8A4mknhDkR5CUuh43ExhAXjnIQVxRQ9UwnU1JM73meHISINzlY/1Ir3jwNQBtui5IpU3K2mFZbEUEhgJiHlZhkqI8rws7hPFxBHlZ5romu1CGRSv2HyQEQiLPkwefJcSk2o0mU+F8Z46KswbKd8qvRUWiq7BsuoYlF/q+Jd839p4/KNnFHhw+Fbc819r/y3dHO7qsk9D2lLPBvEq59SLXC6CYSCq1OTk5F48g+FxLyQSvvyzhFK8taaYL1ACiYdkkSOg/HVO4irmAySLlR8+yHy5wnaWysTF7YmnRxdyecMXFDcxx3KjNCUEGUtb2r4Iixwh5qebxEG58v2Hkh0ERqlLp5kClNLkngLSyF8XExrZi089SYbFm9DRg1FCbEKyoxQE8sqFkTOgTwrDVIPCP/k8qpRcGrxMEXmxnpwjUeXbhjpgA2bBNsp0HPQWOiwNOnddw5YcNIdSFyzTlUKehEbrLDxDNn7osjCXPw5FO22qgPfKHn/pf8XxxxetvSvYlX8BxBVKCdGDmPPDhz0W+Oijjxof//jHt+Hh2oko/qKqFx4l0BJQmQIwS3RNn/fxZXqGFbq4nQzimI9tKFs+S1S1KJ9XoQkEfUQwtKg98fSzefMMwmx5F28/IqK2RLjM2b54/gX0H0v6+IiDZSVgHJogfYWNzDMUpCtsUkKg4pKIUJAsnNTlkjNWzfBCPMOhi8JAiCSqPBmyMFVQ1OdctQwLywNZ5cPCpDl80D6IhjzBASQF0sUeREpSJCyE4ceSpJXbEO2612AHepaTSRn/YrtEAD3n8xV/ntv4+S96nyGRO9gccQZmEPiBK3bRi5kPHcG+v2T32n2+53bxNY8oQyWIB0SR9OmqxMeTh5lm/8azx8srEbCQNSqTpUTX+eagwCiPqiWeQAXO/olHV2tPaYUFjWCxsQJjt7MV564K6iOB2Xj1adNGa3PqDMFl4XwSSnAQCUIibqFPlwtTwbiOkoSR+JvLx3KYv9BXaSrlLyifSegQBNMFTAWhiIeFArRZnoX+8Y2EzKhbnuNlYO9wFpZXkwoH5Kmj/6qOFTz+0n8+Y4Y/2pVIcJqY35+YJ6wjEN33ZzL9kPY3hWjx6Sv+RcByLIQAZZYQJSn2C944FRF/QkvjQ31XZDcV04GVPOGl+WdJEhVGbaNPV3d7Va7ZP83U/1ACgzTjkg4gjUFvHhGWkrPAPnnBLNeFSEKKfAbzOu9yBAUdVj6cZURpZuU3XOUILioD93x2IEnxxFGc9c6M+M93cHSNZVzHquBQDeMn4x898wQ2us7pgGvAbyU8/z5e5EupVEqtJirCgp4KHxVI7sbrQIYKHyKF3+yvIvEEX8FsQNk9qXwgBpgQwNo7p9OKrukzfdzF08+WTmYrV35YF+tU8bEpYImInGtLVH+8PkzZ8iQcVpjrawXCLOHH5uo/9JmWjbXHJMQcNhVW8bOklbsumnJw7Q+cgtVK2mJxAUNNKKncp54KHuzAwnjCE01B1UIHA1A80ik/IkdIfTj6mE8MXh2sSKZhdHUd+IcDykwFLj4eMv7Fv+il75c8/xEmeHaojD+jZ4LgbsPVVvO5iutg4oSAFCCiAqVp/jrUKRU8mzVexsube05ff3tiD0Q1wkP/ojrYgeiaftiheHsjLKL4GrudTxYvb0H9h94bpzeAwCD4cAqJf5SmlBjFH5D8ChVC1Q8KyIkrjtgbE64y4lqtINJHel5Hq4q4ZdsYzsWBWaU+rkFWtFzQbiNNnWciNbT/qD4+Hitq/FdE/3mWzmvQU+W4hZZPenQuRHRNfylcvfVjpUqz0Tj6dNE1/fm4euufTx1z5am3/hr6z6lj9A9ElneKwPJ3IYEVEpqKys0YFeUhoDBP4TV/+bjVIkfqKuu8/ixC/+tqR73111V4DYnrrb+G8a+h1tkk9dY/m7MxV7XUzwdP3ApBgCYG6Co+L6/+kcB4X0g0ERFFzwXjojBc5q8ZhqOKtWEoROmLEwSWBIHowVySyqSS5kIABEYhisRFEov8SgRWGD6K9OMgq8IwBIkTBBYXASGsxcW3pUoHgfF5iIiLPv9x+03kuLxMqaqsUj1KJL4gsFgICGEtFrJtUG6OwDhtJHHhqLOl+dBAG0AnXRAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBAFBQBAQBAQBQUAQEAQEAUFAEBAEBIGVhMD/D0fV/fpMMM+gAAAAAElFTkSuQmCC'
  }
};
exports.default = _default;

/***/ }),
/* 113 */
/*!*******************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/noticeBar.js ***!
  \*******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:17:13
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/noticeBar.js
 */
var _default = {
  // noticeBar
  noticeBar: {
    text: function text() {
      return [];
    },
    direction: 'row',
    step: false,
    icon: 'volume',
    mode: '',
    color: '#f9ae3d',
    bgColor: '#fdf6ec',
    speed: 80,
    fontSize: 14,
    duration: 2000,
    disableTouch: true,
    url: '',
    linkType: 'navigateTo'
  }
};
exports.default = _default;

/***/ }),
/* 114 */
/*!****************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/notify.js ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:10:21
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/notify.js
 */
var _default = {
  // notify组件
  notify: {
    top: 0,
    type: 'primary',
    color: '#ffffff',
    bgColor: '',
    message: '',
    duration: 3000,
    fontSize: 15,
    safeAreaInsetTop: false
  }
};
exports.default = _default;

/***/ }),
/* 115 */
/*!*******************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/numberBox.js ***!
  \*******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:11:46
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/numberBox.js
 */
var _default = {
  // 步进器组件
  numberBox: {
    name: '',
    value: 0,
    min: 1,
    max: Number.MAX_SAFE_INTEGER,
    step: 1,
    integer: false,
    disabled: false,
    disabledInput: false,
    asyncChange: false,
    inputWidth: 35,
    showMinus: true,
    showPlus: true,
    decimalLength: null,
    longPress: true,
    color: '#323233',
    buttonSize: 30,
    bgColor: '#EBECEE',
    cursorSpacing: 100,
    disableMinus: false,
    disablePlus: false,
    iconStyle: ''
  }
};
exports.default = _default;

/***/ }),
/* 116 */
/*!************************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/numberKeyboard.js ***!
  \************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:08:05
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/numberKeyboard.js
 */
var _default = {
  // 数字键盘
  numberKeyboard: {
    mode: 'number',
    dotDisabled: false,
    random: false
  }
};
exports.default = _default;

/***/ }),
/* 117 */
/*!*****************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/overlay.js ***!
  \*****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:06:50
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/overlay.js
 */
var _default = {
  // overlay组件
  overlay: {
    show: false,
    zIndex: 10070,
    duration: 300,
    opacity: 0.5
  }
};
exports.default = _default;

/***/ }),
/* 118 */
/*!***************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/parse.js ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:17:33
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/parse.js
 */
var _default = {
  // parse
  parse: {
    copyLink: true,
    errorImg: '',
    lazyLoad: false,
    loadingImg: '',
    pauseVideo: true,
    previewImg: true,
    setTitle: true,
    showImgMenu: true
  }
};
exports.default = _default;

/***/ }),
/* 119 */
/*!****************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/picker.js ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:18:20
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/picker.js
 */
var _default = {
  // picker
  picker: {
    show: false,
    showToolbar: true,
    title: '',
    columns: function columns() {
      return [];
    },
    loading: false,
    itemHeight: 44,
    cancelText: '取消',
    confirmText: '确定',
    cancelColor: '#909193',
    confirmColor: '#3c9cff',
    singleIndex: 0,
    visibleItemCount: 5,
    keyName: 'text',
    closeOnClickOverlay: false,
    defaultIndex: function defaultIndex() {
      return [];
    }
  }
};
exports.default = _default;

/***/ }),
/* 120 */
/*!***************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/popup.js ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:06:33
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/popup.js
 */
var _default = {
  // popup组件
  popup: {
    show: false,
    overlay: true,
    mode: 'bottom',
    duration: 300,
    closeable: false,
    overlayStyle: function overlayStyle() {},
    closeOnClickOverlay: true,
    zIndex: 10075,
    safeAreaInsetBottom: true,
    safeAreaInsetTop: false,
    closeIconPos: 'top-right',
    round: 0,
    zoom: true,
    bgColor: '',
    overlayOpacity: 0.5
  }
};
exports.default = _default;

/***/ }),
/* 121 */
/*!***************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/radio.js ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:02:34
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/radio.js
 */
var _default = {
  // radio组件
  radio: {
    name: '',
    shape: '',
    disabled: '',
    labelDisabled: '',
    activeColor: '',
    inactiveColor: '',
    iconSize: '',
    labelSize: '',
    label: '',
    labelColor: '',
    size: '',
    iconColor: '',
    placement: ''
  }
};
exports.default = _default;

/***/ }),
/* 122 */
/*!********************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/radioGroup.js ***!
  \********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:03:12
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/radioGroup.js
 */
var _default = {
  // radio-group组件
  radioGroup: {
    value: '',
    disabled: false,
    shape: 'circle',
    activeColor: '#2979ff',
    inactiveColor: '#c8c9cc',
    name: '',
    size: 18,
    placement: 'row',
    label: '',
    labelColor: '#303133',
    labelSize: 14,
    labelDisabled: false,
    iconColor: '#ffffff',
    iconSize: 12,
    borderBottom: false,
    iconPlacement: 'left'
  }
};
exports.default = _default;

/***/ }),
/* 123 */
/*!**************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/rate.js ***!
  \**************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:05:09
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/rate.js
 */
var _default = {
  // rate组件
  rate: {
    value: 1,
    count: 5,
    disabled: false,
    size: 18,
    inactiveColor: '#b2b2b2',
    activeColor: '#FA3534',
    gutter: 4,
    minCount: 1,
    allowHalf: false,
    activeIcon: 'star-fill',
    inactiveIcon: 'star',
    touchable: true
  }
};
exports.default = _default;

/***/ }),
/* 124 */
/*!******************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/readMore.js ***!
  \******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:18:41
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/readMore.js
 */
var _default = {
  // readMore
  readMore: {
    showHeight: 400,
    toggle: false,
    closeText: '展开阅读全文',
    openText: '收起',
    color: '#2979ff',
    fontSize: 14,
    textIndent: '2em',
    name: ''
  }
};
exports.default = _default;

/***/ }),
/* 125 */
/*!*************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/row.js ***!
  \*************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:18:58
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/row.js
 */
var _default = {
  // row
  row: {
    gutter: 0,
    justify: 'start',
    align: 'center'
  }
};
exports.default = _default;

/***/ }),
/* 126 */
/*!*******************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/rowNotice.js ***!
  \*******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:19:13
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/rowNotice.js
 */
var _default = {
  // rowNotice
  rowNotice: {
    text: '',
    icon: 'volume',
    mode: '',
    color: '#f9ae3d',
    bgColor: '#fdf6ec',
    fontSize: 14,
    speed: 80
  }
};
exports.default = _default;

/***/ }),
/* 127 */
/*!********************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/scrollList.js ***!
  \********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:19:28
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/scrollList.js
 */
var _default = {
  // scrollList
  scrollList: {
    indicatorWidth: 50,
    indicatorBarWidth: 20,
    indicator: true,
    indicatorColor: '#f2f2f2',
    indicatorActiveColor: '#3c9cff',
    indicatorStyle: ''
  }
};
exports.default = _default;

/***/ }),
/* 128 */
/*!****************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/search.js ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:19:45
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/search.js
 */
var _default = {
  // search
  search: {
    shape: 'round',
    bgColor: '#f2f2f2',
    placeholder: '请输入关键字',
    clearabled: true,
    focus: false,
    showAction: true,
    actionStyle: function actionStyle() {
      return {};
    },
    actionText: '搜索',
    inputAlign: 'left',
    inputStyle: function inputStyle() {
      return {};
    },
    disabled: false,
    borderColor: 'transparent',
    searchIconColor: '#909399',
    color: '#606266',
    placeholderColor: '#909399',
    searchIcon: 'search',
    margin: '0',
    animation: false,
    value: '',
    maxlength: '-1',
    height: 64,
    label: null
  }
};
exports.default = _default;

/***/ }),
/* 129 */
/*!*****************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/section.js ***!
  \*****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:07:33
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/section.js
 */
var _default = {
  // u-section组件
  section: {
    title: '',
    subTitle: '更多',
    right: true,
    fontSize: 15,
    bold: true,
    color: '#303133',
    subColor: '#909399',
    showLine: true,
    lineColor: '',
    arrow: true
  }
};
exports.default = _default;

/***/ }),
/* 130 */
/*!******************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/skeleton.js ***!
  \******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:20:14
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/skeleton.js
 */
var _default = {
  // skeleton
  skeleton: {
    loading: true,
    animate: true,
    rows: 0,
    rowsWidth: '100%',
    rowsHeight: 18,
    title: true,
    titleWidth: '50%',
    titleHeight: 18,
    avatar: false,
    avatarSize: 32,
    avatarShape: 'circle'
  }
};
exports.default = _default;

/***/ }),
/* 131 */
/*!****************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/slider.js ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:08:25
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/slider.js
 */
var _default = {
  // slider组件
  slider: {
    value: 0,
    blockSize: 18,
    min: 0,
    max: 100,
    step: 1,
    activeColor: '#2979ff',
    inactiveColor: '#c0c4cc',
    blockColor: '#ffffff',
    showValue: false,
    blockStyle: function blockStyle() {}
  }
};
exports.default = _default;

/***/ }),
/* 132 */
/*!*******************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/statusBar.js ***!
  \*******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:20:39
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/statusBar.js
 */
var _default = {
  // statusBar
  statusBar: {
    bgColor: 'transparent'
  }
};
exports.default = _default;

/***/ }),
/* 133 */
/*!***************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/steps.js ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:12:37
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/steps.js
 */
var _default = {
  // steps组件
  steps: {
    direction: 'row',
    current: 0,
    activeColor: '#3c9cff',
    inactiveColor: '#969799',
    activeIcon: '',
    inactiveIcon: '',
    dot: false
  }
};
exports.default = _default;

/***/ }),
/* 134 */
/*!*******************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/stepsItem.js ***!
  \*******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:12:55
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/stepsItem.js
 */
var _default = {
  // steps-item组件
  stepsItem: {
    title: '',
    desc: '',
    iconSize: 17,
    error: false
  }
};
exports.default = _default;

/***/ }),
/* 135 */
/*!****************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/sticky.js ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:01:30
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/sticky.js
 */
var _default = {
  // sticky组件
  sticky: {
    offsetTop: 0,
    customNavHeight: 0,
    disabled: false,
    bgColor: 'transparent',
    zIndex: '',
    index: ''
  }
};
exports.default = _default;

/***/ }),
/* 136 */
/*!********************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/subsection.js ***!
  \********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:12:20
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/subsection.js
 */
var _default = {
  // subsection组件
  subsection: {
    list: [],
    current: 0,
    activeColor: '#3c9cff',
    inactiveColor: '#303133',
    mode: 'button',
    fontSize: 12,
    bold: true,
    bgColor: '#eeeeef'
  }
};
exports.default = _default;

/***/ }),
/* 137 */
/*!*********************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/swipeAction.js ***!
  \*********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:00:42
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/swipeAction.js
 */
var _default = {
  // swipe-action组件
  swipeAction: {
    autoClose: true
  }
};
exports.default = _default;

/***/ }),
/* 138 */
/*!*************************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/swipeActionItem.js ***!
  \*************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:01:13
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/swipeActionItem.js
 */
var _default = {
  // swipeActionItem 组件
  swipeActionItem: {
    show: false,
    name: '',
    disabled: false,
    threshold: 20,
    autoClose: true,
    options: [],
    duration: 300
  }
};
exports.default = _default;

/***/ }),
/* 139 */
/*!****************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/swiper.js ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:21:38
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/swiper.js
 */
var _default = {
  // swiper 组件
  swiper: {
    list: function list() {
      return [];
    },
    indicator: false,
    indicatorActiveColor: '#FFFFFF',
    indicatorInactiveColor: 'rgba(255, 255, 255, 0.35)',
    indicatorStyle: '',
    indicatorMode: 'line',
    autoplay: true,
    current: 0,
    currentItemId: '',
    interval: 3000,
    duration: 300,
    circular: false,
    previousMargin: 0,
    nextMargin: 0,
    acceleration: false,
    displayMultipleItems: 1,
    easingFunction: 'default',
    keyName: 'url',
    imgMode: 'aspectFill',
    height: 130,
    bgColor: '#f3f4f6',
    radius: 4,
    loading: false,
    showTitle: false
  }
};
exports.default = _default;

/***/ }),
/* 140 */
/*!**************************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/swipterIndicator.js ***!
  \**************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:22:07
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/swiperIndicator.js
 */
var _default = {
  // swiperIndicator 组件
  swiperIndicator: {
    length: 0,
    current: 0,
    indicatorActiveColor: '',
    indicatorInactiveColor: '',
    indicatorMode: 'line'
  }
};
exports.default = _default;

/***/ }),
/* 141 */
/*!****************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/switch.js ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:22:24
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/switch.js
 */
var _default = {
  // switch
  switch: {
    loading: false,
    disabled: false,
    size: 25,
    activeColor: '#2979ff',
    inactiveColor: '#ffffff',
    value: false,
    activeValue: true,
    inactiveValue: false,
    asyncChange: false,
    space: 0
  }
};
exports.default = _default;

/***/ }),
/* 142 */
/*!****************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/tabbar.js ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:22:40
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/tabbar.js
 */
var _default = {
  // tabbar
  tabbar: {
    value: null,
    safeAreaInsetBottom: true,
    border: true,
    zIndex: 1,
    activeColor: '#1989fa',
    inactiveColor: '#7d7e80',
    fixed: true,
    placeholder: true
  }
};
exports.default = _default;

/***/ }),
/* 143 */
/*!********************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/tabbarItem.js ***!
  \********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:22:55
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/tabbarItem.js
 */
var _default = {
  //
  tabbarItem: {
    name: null,
    icon: '',
    badge: null,
    dot: false,
    text: '',
    badgeStyle: 'top: 6px;right:2px;'
  }
};
exports.default = _default;

/***/ }),
/* 144 */
/*!**************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/tabs.js ***!
  \**************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:23:14
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/tabs.js
 */
var _default = {
  //
  tabs: {
    duration: 300,
    list: function list() {
      return [];
    },
    lineColor: '#3c9cff',
    activeStyle: function activeStyle() {
      return {
        color: '#303133'
      };
    },
    inactiveStyle: function inactiveStyle() {
      return {
        color: '#606266'
      };
    },
    lineWidth: 20,
    lineHeight: 3,
    itemStyle: function itemStyle() {
      return {
        height: '44px'
      };
    },
    scrollable: true,
    current: 0,
    keyName: 'name'
  }
};
exports.default = _default;

/***/ }),
/* 145 */
/*!*************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/tag.js ***!
  \*************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:23:37
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/tag.js
 */
var _default = {
  // tag 组件
  tag: {
    type: 'primary',
    disabled: false,
    size: 'medium',
    shape: 'square',
    text: '',
    bgColor: '',
    color: '',
    borderColor: '',
    closeColor: '#C6C7CB',
    name: '',
    plainFill: false,
    plain: false,
    closable: false,
    show: true,
    icon: ''
  }
};
exports.default = _default;

/***/ }),
/* 146 */
/*!**************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/text.js ***!
  \**************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:23:58
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/text.js
 */
var _default = {
  // text 组件
  text: {
    type: '',
    show: true,
    text: '',
    prefixIcon: '',
    suffixIcon: '',
    mode: '',
    href: '',
    format: '',
    call: false,
    openType: '',
    bold: false,
    block: false,
    lines: '',
    color: '#303133',
    size: 15,
    iconStyle: function iconStyle() {
      return {
        fontSize: '15px'
      };
    },
    precision: true,
    decoration: 'none',
    margin: 0,
    lineHeight: '',
    align: 'left',
    wordWrap: 'normal'
  }
};
exports.default = _default;

/***/ }),
/* 147 */
/*!******************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/textarea.js ***!
  \******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:24:32
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/textarea.js
 */
var _default = {
  // textarea 组件
  textarea: {
    value: '',
    placeholder: '',
    placeholderClass: 'textarea-placeholder',
    placeholderStyle: 'color: #c0c4cc',
    height: 70,
    confirmType: 'done',
    disabled: false,
    count: false,
    focus: false,
    autoHeight: false,
    fixed: false,
    cursorSpacing: 0,
    cursor: '',
    showConfirmBar: true,
    selectionStart: -1,
    selectionEnd: -1,
    adjustPosition: true,
    disableDefaultPadding: false,
    holdKeyboard: false,
    maxlength: 140,
    border: 'surround',
    formatter: null
  }
};
exports.default = _default;

/***/ }),
/* 148 */
/*!***************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/toast.js ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:07:07
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/toast.js
 */
var _default = {
  // toast组件
  toast: {
    zIndex: 10090,
    loading: false,
    text: '',
    icon: '',
    type: '',
    loadingMode: '',
    show: '',
    overlay: false,
    position: 'center',
    params: function params() {},
    duration: 2000,
    isTab: false,
    url: '',
    callback: null,
    back: false
  }
};
exports.default = _default;

/***/ }),
/* 149 */
/*!*****************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/toolbar.js ***!
  \*****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:24:55
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/toolbar.js
 */
var _default = {
  // toolbar 组件
  toolbar: {
    show: true,
    cancelText: '取消',
    confirmText: '确认',
    cancelColor: '#909193',
    confirmColor: '#3c9cff',
    title: ''
  }
};
exports.default = _default;

/***/ }),
/* 150 */
/*!*****************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/tooltip.js ***!
  \*****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:25:14
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/tooltip.js
 */
var _default = {
  // tooltip 组件
  tooltip: {
    text: '',
    copyText: '',
    size: 14,
    color: '#606266',
    bgColor: 'transparent',
    direction: 'top',
    zIndex: 10071,
    showCopy: true,
    buttons: function buttons() {
      return [];
    },
    overlay: true,
    showToast: true
  }
};
exports.default = _default;

/***/ }),
/* 151 */
/*!********************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/transition.js ***!
  \********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:59:00
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/transition.js
 */
var _default = {
  // transition动画组件的props
  transition: {
    show: false,
    mode: 'fade',
    duration: '300',
    timingFunction: 'ease-out'
  }
};
exports.default = _default;

/***/ }),
/* 152 */
/*!****************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/props/upload.js ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:09:50
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/upload.js
 */
var _default = {
  // upload组件
  upload: {
    accept: 'image',
    capture: function capture() {
      return ['album', 'camera'];
    },
    compressed: true,
    camera: 'back',
    maxDuration: 60,
    uploadIcon: 'camera-fill',
    uploadIconColor: '#D3D4D6',
    useBeforeRead: false,
    previewFullImage: true,
    maxCount: 52,
    disabled: false,
    imageMode: 'aspectFill',
    name: '',
    sizeType: function sizeType() {
      return ['original', 'compressed'];
    },
    multiple: false,
    deletable: true,
    maxSize: Number.MAX_VALUE,
    fileList: function fileList() {
      return [];
    },
    uploadText: '',
    width: 80,
    height: 80,
    previewImage: true
  }
};
exports.default = _default;

/***/ }),
/* 153 */
/*!**********************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/zIndex.js ***!
  \**********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// uniapp在H5中各API的z-index值如下：
/**
 * actionsheet: 999
 * modal: 999
 * navigate: 998
 * tabbar: 998
 * toast: 999
 */
var _default = {
  toast: 10090,
  noNetwork: 10080,
  // popup包含popup，actionsheet，keyboard，picker的值
  popup: 10075,
  mask: 10070,
  navbar: 980,
  topTips: 975,
  sticky: 970,
  indexListSticky: 965
};
exports.default = _default;

/***/ }),
/* 154 */
/*!*********************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/config/color.js ***!
  \*********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// 为了让用户能够自定义主题，会逐步弃用此文件，各颜色通过css提供
// 为了给某些特殊场景使用和向后兼容，无需删除此文件(2020-06-20)
var color = {
  primary: '#3c9cff',
  info: '#909399',
  default: '#909399',
  warning: '#f9ae3d',
  error: '#f56c6c',
  success: '#5ac725',
  mainColor: '#303133',
  contentColor: '#606266',
  tipsColor: '#909399',
  lightColor: '#c0c4cc',
  borderColor: '#e4e7ed'
};
var _default = color;
exports.default = _default;

/***/ }),
/* 155 */
/*!**************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/function/platform.js ***!
  \**************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * 注意：
 * 此部分内容，在vue-cli模式下，需要在vue.config.js加入如下内容才有效：
 * module.exports = {
 *     transpileDependencies: ['uview-v2']
 * }
 */

var platform = 'none';
platform = 'vue2';
platform = 'weixin';
platform = 'mp';
var _default = platform;
exports.default = _default;

/***/ }),
/* 156 */
/*!*****************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/store/index.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 157));
_vue.default.use(_vuex.default);
var store = new _vuex.default.Store({
  state: {},
  mutations: {},
  action: {}
});
var _default = store;
exports.default = _default;

/***/ }),
/* 157 */
/*!**************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vuex3/dist/vuex.common.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * vuex v3.6.2
 * (c) 2021 Evan You
 * @license MIT
 */


function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find (list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
function deepCopy (obj, cache) {
  if ( cache === void 0 ) cache = [];

  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  var hit = find(cache, function (c) { return c.original === obj; });
  if (hit) {
    return hit.copy
  }

  var copy = Array.isArray(obj) ? [] : {};
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy: copy
  });

  Object.keys(obj).forEach(function (key) {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy
}

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  var child = parent.getChild(key);

  if (!child) {
    if ((true)) {
      console.warn(
        "[vuex] trying to unregister module '" + key + "', which is " +
        "not registered"
      );
    }
    return
  }

  if (!child.runtime) {
    return
  }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  if (parent) {
    return parent.hasChild(key)
  }

  return false
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype[[104,111,116,85,112,100,97,116,101].map(function (item) {return String.fromCharCode(item)}).join('')] = function (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept another params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

// Credits: borrowed code from fcomb/redux-logger

function createLogger (ref) {
  if ( ref === void 0 ) ref = {};
  var collapsed = ref.collapsed; if ( collapsed === void 0 ) collapsed = true;
  var filter = ref.filter; if ( filter === void 0 ) filter = function (mutation, stateBefore, stateAfter) { return true; };
  var transformer = ref.transformer; if ( transformer === void 0 ) transformer = function (state) { return state; };
  var mutationTransformer = ref.mutationTransformer; if ( mutationTransformer === void 0 ) mutationTransformer = function (mut) { return mut; };
  var actionFilter = ref.actionFilter; if ( actionFilter === void 0 ) actionFilter = function (action, state) { return true; };
  var actionTransformer = ref.actionTransformer; if ( actionTransformer === void 0 ) actionTransformer = function (act) { return act; };
  var logMutations = ref.logMutations; if ( logMutations === void 0 ) logMutations = true;
  var logActions = ref.logActions; if ( logActions === void 0 ) logActions = true;
  var logger = ref.logger; if ( logger === void 0 ) logger = console;

  return function (store) {
    var prevState = deepCopy(store.state);

    if (typeof logger === 'undefined') {
      return
    }

    if (logMutations) {
      store.subscribe(function (mutation, state) {
        var nextState = deepCopy(state);

        if (filter(mutation, prevState, nextState)) {
          var formattedTime = getFormattedTime();
          var formattedMutation = mutationTransformer(mutation);
          var message = "mutation " + (mutation.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c prev state', 'color: #9E9E9E; font-weight: bold', transformer(prevState));
          logger.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
          logger.log('%c next state', 'color: #4CAF50; font-weight: bold', transformer(nextState));
          endMessage(logger);
        }

        prevState = nextState;
      });
    }

    if (logActions) {
      store.subscribeAction(function (action, state) {
        if (actionFilter(action, state)) {
          var formattedTime = getFormattedTime();
          var formattedAction = actionTransformer(action);
          var message = "action " + (action.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c action', 'color: #03A9F4; font-weight: bold', formattedAction);
          endMessage(logger);
        }
      });
    }
  }
}

function startMessage (logger, message, collapsed) {
  var startMessage = collapsed
    ? logger.groupCollapsed
    : logger.group;

  // render
  try {
    startMessage.call(logger, message);
  } catch (e) {
    logger.log(message);
  }
}

function endMessage (logger) {
  try {
    logger.groupEnd();
  } catch (e) {
    logger.log('—— log end ——');
  }
}

function getFormattedTime () {
  var time = new Date();
  return (" @ " + (pad(time.getHours(), 2)) + ":" + (pad(time.getMinutes(), 2)) + ":" + (pad(time.getSeconds(), 2)) + "." + (pad(time.getMilliseconds(), 3)))
}

function repeat (str, times) {
  return (new Array(times + 1)).join(str)
}

function pad (num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num
}

var index_cjs = {
  Store: Store,
  install: install,
  version: '3.6.2',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers,
  createLogger: createLogger
};

module.exports = index_cjs;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 158 */
/*!*******************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/router/router.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "RouterMount", {
  enumerable: true,
  get: function get() {
    return _uniSimpleRouter.RouterMount;
  }
});
exports.router = void 0;
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _uniSimpleRouter = __webpack_require__(/*! uni-simple-router */ 159);
// router.js

var router = (0, _uniSimpleRouter.createRouter)({
  platform: "mp-weixin",
  routes: (0, _toConsumableArray2.default)([{"path":"/pages/HOME/home","name":"home","aliasPath":"/"},{"path":"/pages/USER/user","name":"user"},{"path":"/pages/PUBLISH/publish","name":"publish"},{"path":"/pages/NEWS/news","name":"news"},{"path":"/pages/FORUM/forum","name":"forum"},{"path":"/pages/USER/address"},{"path":"/pages/USER/addAddress","name":"addAddress"},{"path":"/pages/USER/editorAddress"},{"path":"/pages/PUBLISH/rentout","name":"rentout"},{"path":"/pages/PUBLISH/seekpublish","name":"seekpublish"},{"path":"/pages/PUBLISH/seekrentout","name":"seekrentout"},{"path":"/pages/HOME/select","name":"select"},{"path":"/pages/HOME/kinds","name":"kinds"},{"path":"/pages/HOME/detail","name":"detail"},{"path":"/pages/NEWS/talkwindows"},{"path":"/pages/USER/personalInfo"},{"path":"/pages/USER/setup"},{"path":"/pages/PUBLISH/management"},{"path":"/pages/USER/personalHome"},{"path":"/pages/USER/recommendation"},{"path":"/pages/USER/collected"},{"path":"/pages/USER/agreementlist"},{"path":"/pages/FORUM/articleDetail"},{"path":"/pages/FORUM/publishArticle"},{"path":"/pages/PUBLISH/editProduct"}])
});
//全局路由前置守卫
exports.router = router;
router.beforeEach(function (to, from, next) {
  next();
});
// 全局路由后置守卫
router.afterEach(function (to, from) {});

/***/ }),
/* 159 */
/*!***********************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uni-simple-router/dist/uni-simple-router.js ***!
  \***********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni, module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 13);
!function (e, t) {
  "object" == ( false ? undefined : _typeof(exports)) && "object" == ( false ? undefined : _typeof(module)) ? module.exports = t() :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(self, function () {
  return e = {
    779: function _(e, t, r) {
      var o = r(173);
      e.exports = function e(t, r, n) {
        return o(r) || (n = r || n, r = []), n = n || {}, t instanceof RegExp ? function (e, t) {
          var r = e.source.match(/\((?!\?)/g);
          if (r) for (var o = 0; o < r.length; o++) {
            t.push({
              name: o,
              prefix: null,
              delimiter: null,
              optional: !1,
              repeat: !1,
              partial: !1,
              asterisk: !1,
              pattern: null
            });
          }
          return c(e, t);
        }(t, r) : o(t) ? function (t, r, o) {
          for (var n = [], a = 0; a < t.length; a++) {
            n.push(e(t[a], r, o).source);
          }
          return c(new RegExp("(?:" + n.join("|") + ")", s(o)), r);
        }(t, r, n) : function (e, t, r) {
          return f(a(e, r), t, r);
        }(t, r, n);
      }, e.exports.parse = a, e.exports.compile = function (e, t) {
        return u(a(e, t), t);
      }, e.exports.tokensToFunction = u, e.exports.tokensToRegExp = f;
      var n = new RegExp(["(\\\\.)", "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"), "g");
      function a(e, t) {
        for (var r, o = [], a = 0, i = 0, u = "", c = t && t.delimiter || "/"; null != (r = n.exec(e));) {
          var s = r[0],
            f = r[1],
            h = r.index;
          if (u += e.slice(i, h), i = h + s.length, f) u += f[1];else {
            var v = e[i],
              y = r[2],
              g = r[3],
              d = r[4],
              m = r[5],
              b = r[6],
              O = r[7];
            u && (o.push(u), u = "");
            var P = null != y && null != v && v !== y,
              k = "+" === b || "*" === b,
              j = "?" === b || "*" === b,
              w = r[2] || c,
              R = d || m;
            o.push({
              name: g || a++,
              prefix: y || "",
              delimiter: w,
              optional: j,
              repeat: k,
              partial: P,
              asterisk: !!O,
              pattern: R ? p(R) : O ? ".*" : "[^" + l(w) + "]+?"
            });
          }
        }
        return i < e.length && (u += e.substr(i)), u && o.push(u), o;
      }
      function i(e) {
        return encodeURI(e).replace(/[\/?#]/g, function (e) {
          return "%" + e.charCodeAt(0).toString(16).toUpperCase();
        });
      }
      function u(e, t) {
        for (var r = new Array(e.length), n = 0; n < e.length; n++) {
          "object" == _typeof(e[n]) && (r[n] = new RegExp("^(?:" + e[n].pattern + ")$", s(t)));
        }
        return function (t, n) {
          for (var a = "", u = t || {}, l = (n || {}).pretty ? i : encodeURIComponent, p = 0; p < e.length; p++) {
            var c = e[p];
            if ("string" != typeof c) {
              var s,
                f = u[c.name];
              if (null == f) {
                if (c.optional) {
                  c.partial && (a += c.prefix);
                  continue;
                }
                throw new TypeError('Expected "' + c.name + '" to be defined');
              }
              if (o(f)) {
                if (!c.repeat) throw new TypeError('Expected "' + c.name + '" to not repeat, but received `' + JSON.stringify(f) + "`");
                if (0 === f.length) {
                  if (c.optional) continue;
                  throw new TypeError('Expected "' + c.name + '" to not be empty');
                }
                for (var h = 0; h < f.length; h++) {
                  if (s = l(f[h]), !r[p].test(s)) throw new TypeError('Expected all "' + c.name + '" to match "' + c.pattern + '", but received `' + JSON.stringify(s) + "`");
                  a += (0 === h ? c.prefix : c.delimiter) + s;
                }
              } else {
                if (s = c.asterisk ? encodeURI(f).replace(/[?#]/g, function (e) {
                  return "%" + e.charCodeAt(0).toString(16).toUpperCase();
                }) : l(f), !r[p].test(s)) throw new TypeError('Expected "' + c.name + '" to match "' + c.pattern + '", but received "' + s + '"');
                a += c.prefix + s;
              }
            } else a += c;
          }
          return a;
        };
      }
      function l(e) {
        return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g, "\\$1");
      }
      function p(e) {
        return e.replace(/([=!:$\/()])/g, "\\$1");
      }
      function c(e, t) {
        return e.keys = t, e;
      }
      function s(e) {
        return e && e.sensitive ? "" : "i";
      }
      function f(e, t, r) {
        o(t) || (r = t || r, t = []);
        for (var n = (r = r || {}).strict, a = !1 !== r.end, i = "", u = 0; u < e.length; u++) {
          var p = e[u];
          if ("string" == typeof p) i += l(p);else {
            var f = l(p.prefix),
              h = "(?:" + p.pattern + ")";
            t.push(p), p.repeat && (h += "(?:" + f + h + ")*"), i += h = p.optional ? p.partial ? f + "(" + h + ")?" : "(?:" + f + "(" + h + "))?" : f + "(" + h + ")";
          }
        }
        var v = l(r.delimiter || "/"),
          y = i.slice(-v.length) === v;
        return n || (i = (y ? i.slice(0, -v.length) : i) + "(?:" + v + "(?=$))?"), i += a ? "$" : n && y ? "" : "(?=" + v + "|$)", c(new RegExp("^" + i, s(r)), t);
      }
    },
    173: function _(e) {
      e.exports = Array.isArray || function (e) {
        return "[object Array]" == Object.prototype.toString.call(e);
      };
    },
    844: function _(e, t, r) {
      "use strict";

      var o = this && this.__assign || function () {
        return (o = Object.assign || function (e) {
          for (var t, r = 1, o = arguments.length; r < o; r++) {
            for (var n in t = arguments[r]) {
              Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            }
          }
          return e;
        }).apply(this, arguments);
      };
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.buildVueRouter = t.buildVueRoutes = void 0;
      var n = r(366),
        a = r(883),
        i = r(789),
        u = r(169);
      t.buildVueRoutes = function (e, t) {
        for (var r = e.routesMap, o = r.pathMap, l = r.finallyPathList, p = Object.keys(t), c = 0; c < p.length; c++) {
          var s = p[c],
            f = o[s],
            h = t[s];
          if (f) {
            var v = i.getRoutePath(f, e).finallyPath;
            if (v instanceof Array) throw new Error("非 vueRouterDev 模式下，alias、aliasPath、path 无法提供数组类型！ " + JSON.stringify(f));
            null != f.name && (h.name = f.name);
            var y = h.path,
              g = h.alias;
            delete h.alias, h.path = v, "/" === y && null != g && (h.alias = g, h.path = y), f.beforeEnter && (h.beforeEnter = function (t, r, o) {
              u.onTriggerEachHook(t, r, e, n.hookToggle.enterHooks, o);
            });
          } else a.warn(s + " 路由地址在路由表中未找到，确定是否传递漏啦", e, !0);
        }
        return l.includes("*") && (t["*"] = o["*"]), t;
      }, t.buildVueRouter = function (e, t, r) {
        var n;
        n = "[object Array]" === i.getDataType(r) ? r : Object.values(r);
        var a = e.options.h5,
          u = a.scrollBehavior,
          l = a.fallback,
          p = t.options.scrollBehavior;
        t.options.scrollBehavior = function (e, t, r) {
          return p && p(e, t, r), u(e, t, r);
        }, t.fallback = l;
        var c = new t.constructor(o(o({}, e.options.h5), {
          base: t.options.base,
          mode: t.options.mode,
          routes: n
        }));
        t.matcher = c.matcher;
      };
    },
    147: function _(e, t) {
      "use strict";

      var _r,
        o = this && this.__extends || (_r = function r(e, t) {
          return (_r = Object.setPrototypeOf || {
            __proto__: []
          } instanceof Array && function (e, t) {
            e.__proto__ = t;
          } || function (e, t) {
            for (var r in t) {
              Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            }
          })(e, t);
        }, function (e, t) {
          function o() {
            this.constructor = e;
          }
          _r(e, t), e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
        });
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.proxyH5Mount = t.proxyEachHook = t.MyArray = void 0;
      var n = function (e) {
        function t(r, o, n, a) {
          var i = e.call(this) || this;
          return i.router = r, i.vueEachArray = o, i.myEachHook = n, i.hookName = a, Object.setPrototypeOf(i, t.prototype), i;
        }
        return o(t, e), t.prototype.push = function (e) {
          var t = this;
          this.vueEachArray.push(e);
          var r = this.length;
          this[this.length] = function (e, o, n) {
            r > 0 ? t.vueEachArray[r](e, o, function () {
              n && n();
            }) : t.myEachHook(e, o, function (a) {
              !1 === a ? n(!1) : t.vueEachArray[r](e, o, function (e) {
                n(a);
              });
            }, t.router, !0);
          };
        }, t;
      }(Array);
      t.MyArray = n, t.proxyEachHook = function (e, t) {
        for (var r = ["beforeHooks", "afterHooks"], o = 0; o < r.length; o++) {
          var a = r[o],
            i = e.lifeCycle[a][0];
          if (i) {
            var u = t[a];
            t[a] = new n(e, u, i, a);
          }
        }
      }, t.proxyH5Mount = function (e) {
        var t;
        if (0 === e.mount.length) {
          if (null === (t = e.options.h5) || void 0 === t ? void 0 : t.vueRouterDev) return;
          navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) && setTimeout(function () {
            if (document.getElementsByTagName("uni-page").length > 0) return !1;
            window.location.reload();
          }, 0);
        } else e.mount[0].app.$mount(), e.mount = [];
      };
    },
    814: function _(e, t) {
      "use strict";

      var r = this && this.__assign || function () {
        return (r = Object.assign || function (e) {
          for (var t, r = 1, o = arguments.length; r < o; r++) {
            for (var n in t = arguments[r]) {
              Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            }
          }
          return e;
        }).apply(this, arguments);
      };
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.tabIndexSelect = t.runtimeQuit = t.registerLoddingPage = void 0;
      var o = null,
        n = null;
      t.registerLoddingPage = function (e) {
        if (e.options.registerLoadingPage) {
          var t = e.options.APP,
            o = t.loadingPageHook,
            n = t.loadingPageStyle;
          o(new plus.nativeObj.View("router-loadding", r({
            top: "0px",
            left: "0px",
            height: "100%",
            width: "100%"
          }, n())));
        }
      }, t.runtimeQuit = function (e) {
        void 0 === e && (e = "再按一次退出应用");
        var t = +new Date();
        o ? t - o < 1e3 && plus.runtime.quit() : (o = t, uni.showToast({
          title: e,
          icon: "none",
          position: "bottom",
          duration: 1e3
        }), setTimeout(function () {
          o = null;
        }, 1e3));
      }, t.tabIndexSelect = function (e, t) {
        if (!__uniConfig.tabBar || !Array.isArray(__uniConfig.tabBar.list)) return !1;
        for (var r = __uniConfig.tabBar.list, o = [], a = 0, i = 0; i < r.length; i++) {
          var u = r[i];
          if ("/" + u.pagePath !== e.path && "/" + u.pagePath !== t.path || (u.pagePath === t.path && (a = i), o.push(u)), 2 === o.length) break;
        }
        return 2 === o.length && (null == n && (n = uni.requireNativePlugin("uni-tabview")), n.switchSelect({
          index: a
        }), !0);
      };
    },
    334: function _(e, t) {
      "use strict";

      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getEnterPath = void 0, t.getEnterPath = function (e, t) {
        switch (t.options.platform) {
          case "mp-alipay":
          case "mp-weixin":
          case "mp-toutiao":
          case "mp-qq":
            return e.$options.mpInstance.route;
          case "mp-baidu":
            return e.$options.mpInstance.is || e.$options.mpInstance.pageinstance.route;
        }
        return e.$options.mpInstance.route;
      };
    },
    282: function _(e, t, r) {
      "use strict";

      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.proxyHookName = t.proxyHookDeps = t.lifeCycle = t.baseConfig = t.mpPlatformReg = void 0;
      var o = r(883);
      t.mpPlatformReg = "(^mp-weixin$)|(^mp-baidu$)|(^mp-alipay$)|(^mp-toutiao$)|(^mp-qq$)|(^mp-360$)", t.baseConfig = {
        h5: {
          paramsToQuery: !1,
          vueRouterDev: !1,
          vueNext: !1,
          mode: "hash",
          base: "/",
          linkActiveClass: "router-link-active",
          linkExactActiveClass: "router-link-exact-active",
          scrollBehavior: function scrollBehavior(e, t, r) {
            return {
              x: 0,
              y: 0
            };
          },
          fallback: !0
        },
        APP: {
          registerLoadingPage: !0,
          loadingPageStyle: function loadingPageStyle() {
            return JSON.parse('{"backgroundColor":"#FFF"}');
          },
          loadingPageHook: function loadingPageHook(e) {
            e.show();
          },
          launchedHook: function launchedHook() {
            plus.navigator.closeSplashscreen();
          },
          animation: {}
        },
        applet: {
          animationDuration: 300
        },
        platform: "h5",
        keepUniOriginNav: !1,
        debugger: !1,
        routerBeforeEach: function routerBeforeEach(e, t, r) {
          r();
        },
        routerAfterEach: function routerAfterEach(e, t) {},
        routerErrorEach: function routerErrorEach(e, t) {
          t.$lockStatus = !1, o.err(e, t, !0);
        },
        detectBeforeLock: function detectBeforeLock(e, t, r) {},
        routes: [{
          path: "/choose-location"
        }, {
          path: "/open-location"
        }, {
          path: "/preview-image"
        }]
      }, t.lifeCycle = {
        beforeHooks: [],
        afterHooks: [],
        routerBeforeHooks: [],
        routerAfterHooks: [],
        routerErrorHooks: []
      }, t.proxyHookDeps = {
        resetIndex: [],
        hooks: {},
        options: {}
      }, t.proxyHookName = ["onLaunch", "onShow", "onHide", "onError", "onInit", "onLoad", "onReady", "onUnload", "onResize", "created", "beforeMount", "mounted", "beforeDestroy", "destroyed"];
    },
    801: function _(e, t, r) {
      "use strict";

      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.createRouteMap = void 0;
      var o = r(883),
        n = r(789);
      t.createRouteMap = function (e, t) {
        var r = {
          finallyPathList: [],
          finallyPathMap: Object.create(null),
          aliasPathMap: Object.create(null),
          pathMap: Object.create(null),
          vueRouteMap: Object.create(null),
          nameMap: Object.create(null)
        };
        return t.forEach(function (t) {
          var a = n.getRoutePath(t, e),
            i = a.finallyPath,
            u = a.aliasPath,
            l = a.path;
          if (null == l) throw new Error("请提供一个完整的路由对象，包括以绝对路径开始的 ‘path’ 字符串 " + JSON.stringify(t));
          if (i instanceof Array && !e.options.h5.vueRouterDev && "h5" === e.options.platform) throw new Error("非 vueRouterDev 模式下，route.alias 目前无法提供数组类型！ " + JSON.stringify(t));
          var p = i,
            c = u;
          "h5" !== e.options.platform && 0 !== p.indexOf("/") && "*" !== l && o.warn("当前路由对象下，route：" + JSON.stringify(t) + " 是否缺少了前缀 ‘/’", e, !0), r.finallyPathMap[p] || (r.finallyPathMap[p] = t, r.aliasPathMap[c] = t, r.pathMap[l] = t, r.finallyPathList.push(p), null != t.name && (r.nameMap[t.name] = t));
        }), r;
      };
    },
    662: function _(e, t, r) {
      "use strict";

      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.registerEachHooks = t.registerRouterHooks = t.registerHook = void 0;
      var o = r(366),
        n = r(169);
      function a(e, t) {
        e[0] = t;
      }
      t.registerHook = a, t.registerRouterHooks = function (e, t) {
        return a(e.routerBeforeHooks, function (e, r, o) {
          t.routerBeforeEach(e, r, o);
        }), a(e.routerAfterHooks, function (e, r) {
          t.routerAfterEach(e, r);
        }), a(e.routerErrorHooks, function (e, r) {
          t.routerErrorEach(e, r);
        }), e;
      }, t.registerEachHooks = function (e, t, r) {
        a(e.lifeCycle[t], function (e, a, i, u, l) {
          l ? n.onTriggerEachHook(e, a, u, o.hookToggle[t], i) : r(e, a, i);
        });
      };
    },
    460: function _(e, t, r) {
      "use strict";

      var o = this && this.__assign || function () {
        return (o = Object.assign || function (e) {
          for (var t, r = 1, o = arguments.length; r < o; r++) {
            for (var n in t = arguments[r]) {
              Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            }
          }
          return e;
        }).apply(this, arguments);
      };
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.initMixins = t.getMixins = void 0;
      var n = r(801),
        a = r(844),
        i = r(147),
        u = r(814),
        l = r(845),
        p = r(890),
        c = r(789),
        s = r(334),
        f = r(282),
        h = !1,
        v = !1,
        y = {
          app: !1,
          page: ""
        };
      function g(e, t) {
        var r = t.options.platform;
        return new RegExp(f.mpPlatformReg, "g").test(r) && (r = "app-lets"), {
          h5: {
            beforeCreate: function beforeCreate() {
              var e;
              if (this.$options.router) {
                t.$route = this.$options.router;
                var r = [];
                (null === (e = t.options.h5) || void 0 === e ? void 0 : e.vueRouterDev) ? r = t.options.routes : (r = n.createRouteMap(t, this.$options.router.options.routes).finallyPathMap, t.routesMap.vueRouteMap = r, a.buildVueRoutes(t, r)), a.buildVueRouter(t, this.$options.router, r), i.proxyEachHook(t, this.$options.router);
              }
            }
          },
          "app-plus": {
            beforeCreate: function beforeCreate() {
              h || (h = !0, l.proxyPageHook(this, t, "app"), u.registerLoddingPage(t));
            }
          },
          "app-lets": {
            beforeCreate: function beforeCreate() {
              c.voidFun("UNI-SIMPLE-ROUTER");
              var e = !0,
                r = this.$options.mpType;
              v || ("component" === r ? e = c.assertParentChild(y.page, this) : "page" === r ? (y[r] = s.getEnterPath(this, t), t.enterPath = y[r]) : y[r] = !0, e && l.proxyPageHook(this, t, r));
            },
            onLoad: function onLoad() {
              c.voidFun("UNI-SIMPLE-ROUTER"), !v && c.assertParentChild(y.page, this) && (v = !0, p.forceGuardEach(t));
            }
          }
        }[r];
      }
      t.getMixins = g, t.initMixins = function (e, t) {
        var r = n.createRouteMap(t, t.options.routes);
        t.routesMap = r, e.mixin(o({}, g(0, t)));
      };
    },
    789: function _(e, t, r) {
      "use strict";

      var o = this && this.__assign || function () {
          return (o = Object.assign || function (e) {
            for (var t, r = 1, o = arguments.length; r < o; r++) {
              for (var n in t = arguments[r]) {
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }
            }
            return e;
          }).apply(this, arguments);
        },
        n = this && this.__rest || function (e, t) {
          var r = {};
          for (var o in e) {
            Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (r[o] = e[o]);
          }
          if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
            var n = 0;
            for (o = Object.getOwnPropertySymbols(e); n < o.length; n++) {
              t.indexOf(o[n]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[n]) && (r[o[n]] = e[o[n]]);
            }
          }
          return r;
        },
        a = this && this.__spreadArrays || function () {
          for (var e = 0, t = 0, r = arguments.length; t < r; t++) {
            e += arguments[t].length;
          }
          var o = Array(e),
            n = 0;
          for (t = 0; t < r; t++) {
            for (var a = arguments[t], i = 0, u = a.length; i < u; i++, n++) {
              o[n] = a[i];
            }
          }
          return o;
        };
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.deepDecodeQuery = t.resolveAbsolutePath = t.assertParentChild = t.lockDetectWarn = t.deepClone = t.baseClone = t.assertDeepObject = t.paramsToQuery = t.forMatNextToFrom = t.urlToJson = t.getUniCachePage = t.copyData = t.getDataType = t.routesForMapRoute = t.notRouteTo404 = t.getWildcardRule = t.assertNewOptions = t.getRoutePath = t.notDeepClearNull = t.mergeConfig = t.timeOut = t.def = t.voidFun = void 0;
      var i = r(282),
        u = r(169),
        l = r(883),
        p = r(890),
        c = r(779);
      function s(e, t) {
        for (var r = Object.create(null), n = Object.keys(e).concat(["resolveQuery", "parseQuery"]), i = 0; i < n.length; i += 1) {
          var u = n[i];
          null != t[u] ? t[u].constructor === Object ? r[u] = o(o({}, e[u]), t[u]) : r[u] = "routes" === u ? a(e[u], t[u]) : t[u] : r[u] = e[u];
        }
        return r;
      }
      function f(e, t) {
        var r = e.aliasPath || e.alias || e.path;
        return "h5" !== t.options.platform && (r = e.path), {
          finallyPath: r,
          aliasPath: e.aliasPath || e.path,
          path: e.path,
          alias: e.alias
        };
      }
      function h(e, t) {
        var r = e.routesMap.finallyPathMap["*"];
        if (r) return r;
        throw t && u.ERRORHOOK[0](t, e), new Error("当前路由表匹配规则已全部匹配完成，未找到满足的匹配规则。你可以使用 '*' 通配符捕捉最后的异常");
      }
      function v(e) {
        return Object.prototype.toString.call(e);
      }
      function y(e, t) {
        if (null == e) t = e;else for (var r = 0, o = Object.keys(e); r < o.length; r++) {
          var n = o[r],
            a = n;
          e[n] !== e && ("object" == _typeof(e[n]) ? (t[a] = "[object Array]" === v(e[n]) ? [] : {}, t[a] = y(e[n], t[a])) : t[a] = e[n]);
        }
        return t;
      }
      function g(e) {
        var t = "[object Array]" === v(e) ? [] : {};
        return y(e, t), t;
      }
      t.voidFun = function () {
        for (var e = [], t = 0; t < arguments.length; t++) {
          e[t] = arguments[t];
        }
      }, t.def = function (e, t, r) {
        Object.defineProperty(e, t, {
          get: function get() {
            return r();
          }
        });
      }, t.timeOut = function (e) {
        return new Promise(function (t) {
          setTimeout(function () {
            t();
          }, e);
        });
      }, t.mergeConfig = s, t.notDeepClearNull = function (e) {
        for (var t in e) {
          null == e[t] && delete e[t];
        }
        return e;
      }, t.getRoutePath = f, t.assertNewOptions = function (e) {
        var t,
          r = e.platform,
          o = e.routes;
        if (null == r) throw new Error("你在实例化路由时必须传递 'platform'");
        if (null == o || 0 === o.length) throw new Error("你在实例化路由时必须传递 routes 为空，这是无意义的。");
        return "h5" === e.platform && (null === (t = e.h5) || void 0 === t ? void 0 : t.vueRouterDev) && (i.baseConfig.routes = []), s(i.baseConfig, e);
      }, t.getWildcardRule = h, t.notRouteTo404 = function (e, t, r, o) {
        if ("*" !== t.path) return t;
        var n = t.redirect;
        if (void 0 === n) throw new Error(" *  通配符必须配合 redirect 使用。redirect: string | Location | Function");
        var a = n;
        return "function" == typeof a && (a = a(r)), p.navjump(a, e, o, void 0, void 0, void 0, !1);
      }, t.routesForMapRoute = function e(t, r, o, n) {
        var a;
        if (void 0 === n && (n = !1), null === (a = t.options.h5) || void 0 === a ? void 0 : a.vueRouterDev) return {
          path: r
        };
        for (var i = r.split("?")[0], u = "", l = t.routesMap, p = 0; p < o.length; p++) {
          for (var s = l[o[p]], f = 0, y = Object.entries(s); f < y.length; f++) {
            var g = y[f],
              d = g[0],
              m = g[1];
            if ("*" !== d) {
              var b = m,
                O = d;
              if ("[object Array]" === v(s) && (O = b), null != c(O).exec(i)) return "[object String]" === v(b) ? l.finallyPathMap[b] : b;
            } else "" === u && (u = "*");
          }
        }
        if (n) return {};
        if (l.aliasPathMap) {
          var P = e(t, r, ["aliasPathMap"], !0);
          if (Object.keys(P).length > 0) return P;
        }
        if ("" !== u) return h(t);
        throw new Error(r + " 路径无法在路由表中找到！检查跳转路径及路由表");
      }, t.getDataType = v, t.copyData = function (e) {
        return JSON.parse(JSON.stringify(e));
      }, t.getUniCachePage = function (e) {
        var t = getCurrentPages();
        if (null == e) return t;
        if (0 === t.length) return t;
        var r = t.reverse()[e];
        return null == r ? [] : r;
      }, t.urlToJson = function (e) {
        var t = {},
          r = e.split("?"),
          o = r[0],
          n = r[1];
        if (null != n) for (var a = 0, i = n.split("&"); a < i.length; a++) {
          var u = i[a].split("=");
          t[u[0]] = u[1];
        }
        return {
          path: o,
          query: t
        };
      }, t.forMatNextToFrom = function (e, t, r) {
        var o = [t, r],
          n = o[0],
          a = o[1];
        if ("h5" === e.options.platform) {
          var i = e.options.h5,
            u = i.vueNext,
            l = i.vueRouterDev;
          u || l || (n = p.createRoute(e, void 0, n), a = p.createRoute(e, void 0, a));
        } else n = p.createRoute(e, void 0, g(n)), a = p.createRoute(e, void 0, g(a));
        return {
          matTo: n,
          matFrom: a
        };
      }, t.paramsToQuery = function (e, t) {
        var r;
        if ("h5" === e.options.platform && !(null === (r = e.options.h5) || void 0 === r ? void 0 : r.paramsToQuery)) return t;
        if ("[object Object]" === v(t)) {
          var a = t,
            i = a.name,
            l = a.params,
            p = n(a, ["name", "params"]),
            c = l;
          if ("h5" !== e.options.platform && null == c && (c = {}), null != i && null != c) {
            var s = e.routesMap.nameMap[i];
            null == s && (s = h(e, {
              type: 2,
              msg: "命名路由为：" + i + " 的路由，无法在路由表中找到！",
              toRule: t
            }));
            var y = f(s, e).finallyPath;
            if (!y.includes(":")) return o(o({}, p), {
              path: y,
              query: c
            });
            u.ERRORHOOK[0]({
              type: 2,
              msg: "动态路由：" + y + " 无法使用 paramsToQuery！",
              toRule: t
            }, e);
          }
        }
        return t;
      }, t.assertDeepObject = function (e) {
        var t = null;
        try {
          t = JSON.stringify(e).match(/\{|\[|\}|\]/g);
        } catch (e) {
          l.warnLock("传递的参数解析对象失败。" + e);
        }
        return null != t && t.length > 3;
      }, t.baseClone = y, t.deepClone = g, t.lockDetectWarn = function (e, t, r, o, n, a) {
        if (void 0 === n && (n = {}), "afterHooks" === a) o();else {
          var i = e.options.detectBeforeLock;
          i && i(e, t, r), e.$lockStatus ? e.options.routerErrorEach({
            type: 2,
            msg: "当前页面正在处于跳转状态，请稍后再进行跳转....",
            NAVTYPE: r,
            uniActualData: n
          }, e) : o();
        }
      }, t.assertParentChild = function (e, t) {
        for (; null != t.$parent;) {
          var r = t.$parent.$mp;
          if (r.page && r.page.is === e) return !0;
          t = t.$parent;
        }
        try {
          if (t.$mp.page.is === e || t.$mp.page.route === e) return !0;
        } catch (e) {
          return !1;
        }
        return !1;
      }, t.resolveAbsolutePath = function (e, t) {
        var r = /^\/?([^\?\s]+)(\?.+)?$/,
          o = e.trim();
        if (!r.test(o)) throw new Error("【" + e + "】 路径错误，请提供完整的路径(10001)。");
        var n = o.match(r);
        if (null == n) throw new Error("【" + e + "】 路径错误，请提供完整的路径(10002)。");
        var a = n[2] || "";
        if (/^\.\/[^\.]+/.test(o)) return (t.currentRoute.path + e).replace(/[^\/]+\.\//, "");
        var i = n[1].replace(/\//g, "\\/").replace(/\.\./g, "[^\\/]+").replace(/\./g, "\\."),
          u = new RegExp("^\\/" + i + "$"),
          l = t.options.routes.filter(function (e) {
            return u.test(e.path);
          });
        if (1 !== l.length) throw new Error("【" + e + "】 路径错误，尝试转成绝对路径失败，请手动转成绝对路径(10003)。");
        return l[0].path + a;
      }, t.deepDecodeQuery = function e(t) {
        for (var r = "[object Array]" === v(t) ? [] : {}, o = Object.keys(t), n = 0; n < o.length; n++) {
          var a = o[n],
            i = t[a];
          if ("string" == typeof i) try {
            var u = JSON.parse(decodeURIComponent(i));
            "object" != _typeof(u) && (u = i), r[a] = u;
          } catch (e) {
            try {
              r[a] = decodeURIComponent(i);
            } catch (e) {
              r[a] = i;
            }
          } else if ("object" == _typeof(i)) {
            var l = e(i);
            r[a] = l;
          } else r[a] = i;
        }
        return r;
      };
    },
    883: function _(e, t) {
      "use strict";

      function r(e, t, r, o) {
        if (void 0 === o && (o = !1), !o) {
          var n = "[object Object]" === t.toString();
          if (!1 === t) return !1;
          if (n && !1 === t[e]) return !1;
        }
        return console[e](r), !0;
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.warnLock = t.log = t.warn = t.err = t.isLog = void 0, t.isLog = r, t.err = function (e, t, o) {
        r("error", t.options.debugger, e, o);
      }, t.warn = function (e, t, o) {
        r("warn", t.options.debugger, e, o);
      }, t.log = function (e, t, o) {
        r("log", t.options.debugger, e, o);
      }, t.warnLock = function (e) {
        console.warn(e);
      };
    },
    607: function _(e, t, r) {
      "use strict";

      var o = this && this.__createBinding || (Object.create ? function (e, t, r, o) {
          void 0 === o && (o = r), Object.defineProperty(e, o, {
            enumerable: !0,
            get: function get() {
              return t[r];
            }
          });
        } : function (e, t, r, o) {
          void 0 === o && (o = r), e[o] = t[r];
        }),
        n = this && this.__exportStar || function (e, t) {
          for (var r in e) {
            "default" === r || Object.prototype.hasOwnProperty.call(t, r) || o(t, e, r);
          }
        };
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.createRouter = t.RouterMount = t.runtimeQuit = void 0, n(r(366), t), n(r(309), t);
      var a = r(814);
      Object.defineProperty(t, "runtimeQuit", {
        enumerable: !0,
        get: function get() {
          return a.runtimeQuit;
        }
      });
      var i = r(963);
      Object.defineProperty(t, "RouterMount", {
        enumerable: !0,
        get: function get() {
          return i.RouterMount;
        }
      }), Object.defineProperty(t, "createRouter", {
        enumerable: !0,
        get: function get() {
          return i.createRouter;
        }
      });
    },
    366: function _(e, t) {
      "use strict";

      var r, o, n;
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.rewriteMethodToggle = t.navtypeToggle = t.hookToggle = void 0, (n = t.hookToggle || (t.hookToggle = {})).beforeHooks = "beforeEach", n.afterHooks = "afterEach", n.enterHooks = "beforeEnter", (o = t.navtypeToggle || (t.navtypeToggle = {})).push = "navigateTo", o.replace = "redirectTo", o.replaceAll = "reLaunch", o.pushTab = "switchTab", o.back = "navigateBack", (r = t.rewriteMethodToggle || (t.rewriteMethodToggle = {})).navigateTo = "push", r.navigate = "push", r.redirectTo = "replace", r.reLaunch = "replaceAll", r.switchTab = "pushTab", r.navigateBack = "back";
    },
    309: function _(e, t) {
      "use strict";

      Object.defineProperty(t, "__esModule", {
        value: !0
      });
    },
    169: function _(e, t, r) {
      "use strict";

      var o = this && this.__rest || function (e, t) {
        var r = {};
        for (var o in e) {
          Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (r[o] = e[o]);
        }
        if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
          var n = 0;
          for (o = Object.getOwnPropertySymbols(e); n < o.length; n++) {
            t.indexOf(o[n]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[n]) && (r[o[n]] = e[o[n]]);
          }
        }
        return r;
      };
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.loopCallHook = t.transitionTo = t.onTriggerEachHook = t.callHook = t.callBeforeRouteLeave = t.HOOKLIST = t.ERRORHOOK = void 0;
      var n = r(789),
        a = r(890),
        i = r(147),
        u = r(814);
      function l(e, t, r, o) {
        var a,
          i = n.getUniCachePage(0);
        if (Object.keys(i).length > 0) {
          var u = void 0;
          switch ("h5" === e.options.platform ? u = i.$options.beforeRouteLeave : null != i.$vm && (u = i.$vm.$options.beforeRouteLeave), n.getDataType(u)) {
            case "[object Array]":
              a = (a = u[0]).bind(i);
              break;
            case "[object Function]":
              a = u.bind(i.$vm);
          }
        }
        return p(a, t, r, e, o);
      }
      function p(e, t, r, o, n, a) {
        void 0 === a && (a = !0), null != e && e instanceof Function ? !0 === a ? e(t, r, n, o, !1) : (e(t, r, function () {}, o, !1), n()) : n();
      }
      function c(e, t, r, o, a, i) {
        var u = n.forMatNextToFrom(e, t, r),
          l = u.matTo,
          p = u.matFrom;
        "h5" === e.options.platform ? s(a, 0, i, e, l, p, o) : s(a.slice(0, 4), 0, function () {
          i(function () {
            s(a.slice(4), 0, n.voidFun, e, l, p, o);
          });
        }, e, l, p, o);
      }
      function s(e, r, i, l, p, c, f) {
        var h = n.routesForMapRoute(l, p.path, ["finallyPathMap", "pathMap"]);
        if (e.length - 1 < r) return i();
        var v = e[r],
          y = t.ERRORHOOK[0];
        v(l, p, c, h, function (t) {
          if ("app-plus" === l.options.platform && (!1 !== t && "string" != typeof t && "object" != _typeof(t) || u.tabIndexSelect(p, c)), !1 === t) "h5" === l.options.platform && i(!1), y({
            type: 0,
            msg: "管道函数传递 false 导航被终止!",
            matTo: p,
            matFrom: c,
            nextTo: t
          }, l);else if ("string" == typeof t || "object" == _typeof(t)) {
            var n = f,
              h = t;
            if ("object" == _typeof(t)) {
              var v = t.NAVTYPE;
              h = o(t, ["NAVTYPE"]), null != v && (n = v);
            }
            a.navjump(h, l, n, {
              from: c,
              next: i
            });
          } else null == t ? (r++, s(e, r, i, l, p, c, f)) : y({
            type: 1,
            msg: "管道函数传递未知类型，无法被识别。导航被终止！",
            matTo: p,
            matFrom: c,
            nextTo: t
          }, l);
        });
      }
      t.ERRORHOOK = [function (e, t) {
        return t.lifeCycle.routerErrorHooks[0](e, t);
      }], t.HOOKLIST = [function (e, t, r, o, n) {
        return p(e.lifeCycle.routerBeforeHooks[0], t, r, e, n);
      }, function (e, t, r, o, n) {
        return l(e, t, r, n);
      }, function (e, t, r, o, n) {
        return p(e.lifeCycle.beforeHooks[0], t, r, e, n);
      }, function (e, t, r, o, n) {
        return p(o.beforeEnter, t, r, e, n);
      }, function (e, t, r, o, n) {
        return p(e.lifeCycle.afterHooks[0], t, r, e, n, !1);
      }, function (e, t, r, o, n) {
        return e.$lockStatus = !1, "h5" === e.options.platform && i.proxyH5Mount(e), p(e.lifeCycle.routerAfterHooks[0], t, r, e, n, !1);
      }], t.callBeforeRouteLeave = l, t.callHook = p, t.onTriggerEachHook = function (e, r, o, n, a) {
        var i = [];
        switch (n) {
          case "beforeEach":
            i = t.HOOKLIST.slice(0, 3);
            break;
          case "afterEach":
            i = t.HOOKLIST.slice(4);
            break;
          case "beforeEnter":
            i = t.HOOKLIST.slice(3, 4);
        }
        c(o, e, r, "push", i, a);
      }, t.transitionTo = c, t.loopCallHook = s;
    },
    890: function _(e, t, r) {
      "use strict";

      var o = this && this.__assign || function () {
          return (o = Object.assign || function (e) {
            for (var t, r = 1, o = arguments.length; r < o; r++) {
              for (var n in t = arguments[r]) {
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }
            }
            return e;
          }).apply(this, arguments);
        },
        n = this && this.__rest || function (e, t) {
          var r = {};
          for (var o in e) {
            Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (r[o] = e[o]);
          }
          if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
            var n = 0;
            for (o = Object.getOwnPropertySymbols(e); n < o.length; n++) {
              t.indexOf(o[n]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[n]) && (r[o[n]] = e[o[n]]);
            }
          }
          return r;
        };
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.createRoute = t.forceGuardEach = t.backOptionsBuild = t.navjump = t.lockNavjump = void 0;
      var a = r(366),
        i = r(99),
        u = r(789),
        l = r(169),
        p = r(845),
        c = r(169);
      function s(e, t, r, o, n) {
        u.lockDetectWarn(t, e, r, function () {
          "h5" !== t.options.platform && (t.$lockStatus = !0), f(e, t, r, void 0, o, n);
        }, n);
      }
      function f(e, t, r, n, s, f, v) {
        if (void 0 === v && (v = !0), "back" === r) {
          var y;
          if (y = "string" == typeof e ? +e : e.delta || 1, "h5" === t.options.platform) {
            t.$route.go(-y);
            var g = (f || {
                success: u.voidFun
              }).success || u.voidFun,
              d = (f || {
                complete: u.voidFun
              }).complete || u.voidFun;
            return g({
              errMsg: "navigateBack:ok"
            }), void d({
              errMsg: "navigateBack:ok"
            });
          }
          e = h(t, y, f);
        }
        var m = i.queryPageToMap(e, t).rule;
        m.type = a.navtypeToggle[r];
        var b = u.paramsToQuery(t, m),
          O = i.resolveQuery(b, t);
        if ("h5" === t.options.platform) {
          if ("push" !== r && (r = "replace"), null != n) n.next(o({
            replace: "push" !== r
          }, O));else if ("push" === r && Reflect.has(O, "events")) {
            if (Reflect.has(O, "name")) throw new Error("在h5端上使用 'push'、'navigateTo' 跳转时，如果包含 events 不允许使用 name 跳转，因为 name 实现了动态路由。请更换为 path 或者 url 跳转！");
            uni.navigateTo(O, !0, u.voidFun, s);
          } else t.$route[r](O, O.success || u.voidFun, O.fail || u.voidFun);
        } else {
          var P = {
            path: ""
          };
          if (null == n) {
            var k = u.routesForMapRoute(t, O.path, ["finallyPathMap", "pathMap"]);
            k = u.notRouteTo404(t, k, O, r), O = o(o(o(o({}, k), {
              params: {}
            }), O), {
              path: k.path
            }), P = p.createToFrom(O, t);
          } else P = n.from;
          if (p.createFullPath(O, P), !1 === v) return O;
          l.transitionTo(t, O, P, r, c.HOOKLIST, function (e) {
            uni[a.navtypeToggle[r]](O, !0, e, s);
          });
        }
      }
      function h(e, t, r) {
        void 0 === r && (r = {});
        var n = v(e, t, void 0, o({
            NAVTYPE: "back"
          }, r)),
          a = o(o({}, r), {
            path: n.path,
            query: n.query,
            delta: t
          });
        if ("[object Object]" === u.getDataType(r)) {
          var i = r,
            l = i.animationDuration,
            p = i.animationType;
          null != l && (a.animationDuration = l), null != p && (a.animationType = p);
          var c = r.from;
          null != c && (a.BACKTYPE = c);
        }
        return a;
      }
      function v(e, t, r, l) {
        void 0 === t && (t = 0), void 0 === l && (l = {});
        var p = {
          name: "",
          meta: {},
          path: "",
          fullPath: "",
          NAVTYPE: "",
          query: {},
          params: {},
          BACKTYPE: (r || {
            BACKTYPE: ""
          }).BACKTYPE || ""
        };
        if (19970806 === t) return p;
        if ("h5" === e.options.platform) {
          var c = {
            path: ""
          };
          c = null != r ? r : e.$route.currentRoute;
          var s = u.copyData(c.params);
          delete s.__id__;
          var f = i.parseQuery(o(o({}, s), u.copyData(c.query)), e);
          c = o(o({}, c), {
            query: f
          }), p.path = c.path, p.fullPath = c.fullPath || "", p.query = u.deepDecodeQuery(c.query || {}), p.NAVTYPE = a.rewriteMethodToggle[c.type || "reLaunch"];
        } else {
          var h = {};
          if (null != r) h = o(o({}, r), {
            openType: r.type
          });else {
            var v = u.getUniCachePage(t);
            if (0 === Object.keys(v).length) {
              var y = l.NAVTYPE,
                g = n(l, ["NAVTYPE"]),
                d = "不存在的页面栈，请确保有足够的页面可用，当前 level:" + t;
              throw e.options.routerErrorEach({
                type: 3,
                msg: d,
                NAVTYPE: y,
                level: t,
                uniActualData: g
              }, e), new Error(d);
            }
            var m = v.options || {};
            h = o(o({}, v.$page || {}), {
              query: u.deepDecodeQuery(m),
              fullPath: decodeURIComponent((v.$page || {}).fullPath || "/" + v.route)
            }), "app-plus" !== e.options.platform && (h.path = "/" + v.route);
          }
          var b = h.openType;
          p.query = h.query, p.path = h.path, p.fullPath = h.fullPath, p.NAVTYPE = a.rewriteMethodToggle[b || "reLaunch"];
        }
        var O = u.routesForMapRoute(e, p.path, ["finallyPathMap", "pathMap"]),
          P = o(o({}, p), O);
        return P.query = i.parseQuery(P.query, e), P;
      }
      t.lockNavjump = s, t.navjump = f, t.backOptionsBuild = h, t.forceGuardEach = function (e, t, r) {
        if (void 0 === t && (t = "replaceAll"), void 0 === r && (r = !1), "h5" === e.options.platform) throw new Error("在h5端上使用：forceGuardEach 是无意义的，目前 forceGuardEach 仅支持在非h5端上使用");
        var o = u.getUniCachePage(0);
        0 === Object.keys(o).length && e.options.routerErrorEach({
          type: 3,
          NAVTYPE: t,
          uniActualData: {},
          level: 0,
          msg: "不存在的页面栈，请确保有足够的页面可用，当前 level:0"
        }, e);
        var n = o,
          a = n.route,
          i = n.options;
        s({
          path: "/" + a,
          query: u.deepDecodeQuery(i || {})
        }, e, t, r);
      }, t.createRoute = v;
    },
    845: function _(e, t, r) {
      "use strict";

      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.resetPageHook = t.resetAndCallPageHook = t.proxyPageHook = t.createFullPath = t.createToFrom = void 0;
      var o = r(282),
        n = r(789),
        a = r(890),
        i = r(99);
      function u(e) {
        for (var t = e.proxyHookDeps, r = 0, o = Object.entries(t.hooks); r < o.length; r++) {
          (0, o[r][1].resetHook)();
        }
      }
      t.createToFrom = function (e, t) {
        var r = n.getUniCachePage(0);
        return "[object Array]" === n.getDataType(r) ? n.deepClone(e) : a.createRoute(t);
      }, t.createFullPath = function (e, t) {
        if (null == e.fullPath) {
          var r = i.stringifyQuery(e.query);
          e.fullPath = e.path + r;
        }
        null == t.fullPath && (r = i.stringifyQuery(t.query), t.fullPath = t.path + r);
      }, t.proxyPageHook = function (e, t, r) {
        for (var n = t.proxyHookDeps, a = e.$options, i = function i(_i) {
            var u = o.proxyHookName[_i],
              l = a[u];
            if (l) for (var p = function p(o) {
                if (l[o].toString().includes("UNI-SIMPLE-ROUTER")) return "continue";
                var a = Object.keys(n.hooks).length + 1,
                  i = function i() {
                    for (var e = [], t = 0; t < arguments.length; t++) {
                      e[t] = arguments[t];
                    }
                    n.resetIndex.push(a), n.options[a] = e;
                  },
                  u = l.splice(o, 1, i)[0];
                n.hooks[a] = {
                  proxyHook: i,
                  callHook: function callHook(o) {
                    if (t.enterPath.replace(/^\//, "") === o.replace(/^\//, "") || "app" === r) {
                      var i = n.options[a];
                      u.apply(e, i);
                    }
                  },
                  resetHook: function resetHook() {
                    l.splice(o, 1, u);
                  }
                };
              }, c = 0; c < l.length; c++) {
              p(c);
            }
          }, u = 0; u < o.proxyHookName.length; u++) {
          i(u);
        }
      }, t.resetAndCallPageHook = function (e, t, r) {
        void 0 === r && (r = !0);
        var o = t.trim().match(/^(\/?[^\?\s]+)(\?[\s\S]*$)?$/);
        if (null == o) throw new Error("还原hook失败。请检查 【" + t + "】 路径是否正确。");
        t = o[1];
        for (var n = e.proxyHookDeps, a = n.resetIndex, i = 0; i < a.length; i++) {
          var l = a[i];
          (0, n.hooks[l].callHook)(t);
        }
        r && u(e);
      }, t.resetPageHook = u;
    },
    99: function _(e, t, r) {
      "use strict";

      var o = this && this.__assign || function () {
        return (o = Object.assign || function (e) {
          for (var t, r = 1, o = arguments.length; r < o; r++) {
            for (var n in t = arguments[r]) {
              Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            }
          }
          return e;
        }).apply(this, arguments);
      };
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.stringifyQuery = t.parseQuery = t.resolveQuery = t.queryPageToMap = void 0;
      var n = r(789),
        a = r(169),
        i = r(883),
        u = /[!'()*]/g,
        l = function l(e) {
          return "%" + e.charCodeAt(0).toString(16);
        },
        p = /%2C/g,
        c = function c(e) {
          return encodeURIComponent(e).replace(u, l).replace(p, ",");
        };
      t.queryPageToMap = function (e, t) {
        var r = {},
          i = "",
          u = e.success,
          l = e.fail;
        if ("[object Object]" === n.getDataType(e)) {
          var p = e;
          if (null != p.path) {
            var c = n.urlToJson(p.path),
              s = c.path,
              f = c.query;
            i = n.routesForMapRoute(t, s, ["finallyPathList", "pathMap"]), r = o(o({}, f), e.query || {}), p.path = s, p.query = r, delete e.params;
          } else null != p.name ? null == (i = t.routesMap.nameMap[p.name]) ? i = n.getWildcardRule(t, {
            type: 2,
            msg: "命名路由为：" + p.name + " 的路由，无法在路由表中找到！",
            toRule: e
          }) : (r = e.params || {}, delete e.query) : i = n.getWildcardRule(t, {
            type: 2,
            msg: e + " 解析失败，请检测当前路由表下是否有包含。",
            toRule: e
          });
        } else e = n.urlToJson(e), i = n.routesForMapRoute(t, e.path, ["finallyPathList", "pathMap"]), r = e.query;
        if ("h5" === t.options.platform) {
          n.getRoutePath(i, t).finallyPath.includes(":") && null == e.name && a.ERRORHOOK[0]({
            type: 2,
            msg: "当有设置 alias或者aliasPath 为动态路由时，不允许使用 path 跳转。请使用 name 跳转！",
            route: i
          }, t);
          var h = e.complete,
            v = e.success,
            y = e.fail;
          if ("[object Function]" === n.getDataType(h)) {
            var g = function g(e, t) {
              "[object Function]" === n.getDataType(t) && t.apply(this, e), h.apply(this, e);
            };
            u = function u() {
              for (var e = [], t = 0; t < arguments.length; t++) {
                e[t] = arguments[t];
              }
              g.call(this, e, v);
            }, l = function l() {
              for (var e = [], t = 0; t < arguments.length; t++) {
                e[t] = arguments[t];
              }
              g.call(this, e, y);
            };
          }
        }
        var d = e;
        return "[object Function]" === n.getDataType(d.success) && (d.success = u), "[object Function]" === n.getDataType(d.fail) && (d.fail = l), {
          rule: d,
          route: i,
          query: r
        };
      }, t.resolveQuery = function (e, t) {
        var r = "query";
        null != e.params && (r = "params"), null != e.query && (r = "query");
        var o = n.copyData(e[r] || {}),
          a = t.options.resolveQuery;
        if (a) {
          var u = a(o);
          "[object Object]" !== n.getDataType(u) ? i.warn("请按格式返回参数： resolveQuery?:(jsonQuery:{[propName: string]: any;})=>{[propName: string]: any;}", t) : e[r] = u;
        } else {
          if (!n.assertDeepObject(o)) return e;
          var l = JSON.stringify(o);
          e[r] = {
            query: l
          };
        }
        return e;
      }, t.parseQuery = function (e, t) {
        var r = t.options.parseQuery;
        if (r) e = r(n.copyData(e)), "[object Object]" !== n.getDataType(e) && i.warn("请按格式返回参数： parseQuery?:(jsonQuery:{[propName: string]: any;})=>{[propName: string]: any;}", t);else if (Reflect.get(e, "query")) {
          var o = Reflect.get(e, "query");
          if ("string" == typeof o) try {
            o = JSON.parse(o);
          } catch (e) {
            i.warn("尝试解析深度对象失败，按原样输出。" + e, t);
          }
          if ("object" == _typeof(o)) return n.deepDecodeQuery(o);
        }
        return e;
      }, t.stringifyQuery = function (e) {
        var t = e ? Object.keys(e).map(function (t) {
          var r = e[t];
          if (void 0 === r) return "";
          if (null === r) return c(t);
          if (Array.isArray(r)) {
            var o = [];
            return r.forEach(function (e) {
              void 0 !== e && (null === e ? o.push(c(t)) : o.push(c(t) + "=" + c(e)));
            }), o.join("&");
          }
          return c(t) + "=" + c(r);
        }).filter(function (e) {
          return e.length > 0;
        }).join("&") : null;
        return t ? "?" + t : "";
      };
    },
    314: function _(e, t, r) {
      "use strict";

      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.rewriteMethod = void 0;
      var o = r(366),
        n = r(789),
        a = r(883),
        i = r(809),
        u = ["navigateTo", "redirectTo", "reLaunch", "switchTab", "navigateBack"];
      t.rewriteMethod = function (e) {
        !1 === e.options.keepUniOriginNav && u.forEach(function (t) {
          var r = uni[t];
          uni[t] = function (u, l, p, c) {
            void 0 === l && (l = !1), l ? i.uniOriginJump(e, r, t, u, p, c) : ("app-plus" === e.options.platform && 0 === Object.keys(e.appMain).length && (e.appMain = {
              NAVTYPE: t,
              path: u.url
            }), function (e, t, r) {
              if ("app-plus" === r.options.platform) {
                var i = null;
                e && (i = e.openType), null != i && "appLaunch" === i && (t = "reLaunch");
              }
              if ("reLaunch" === t && '{"url":"/"}' === JSON.stringify(e) && (a.warn("uni-app 原生方法：reLaunch({url:'/'}) 默认被重写啦！你可以使用 this.$Router.replaceAll() 或者 uni.reLaunch({url:'/?xxx=xxx'})", r, !0), t = "navigateBack", e = {
                from: "backbutton"
              }), "navigateBack" === t) {
                var u = 1;
                null == e && (e = {
                  delta: 1
                }), "[object Number]" === n.getDataType(e.delta) && (u = e.delta), r.back(u, e);
              } else {
                var l = o.rewriteMethodToggle[t],
                  p = e.url;
                if (!p.startsWith("/")) {
                  var c = n.resolveAbsolutePath(p, r);
                  p = c, e.url = c;
                }
                if ("switchTab" === t) {
                  var s = n.routesForMapRoute(r, p, ["pathMap", "finallyPathList"]),
                    f = n.getRoutePath(s, r).finallyPath;
                  if ("[object Array]" === n.getDataType(f) && a.warn("uni-app 原生方法跳转路径为：" + p + "。此路为是tab页面时，不允许设置 alias 为数组的情况，并且不能为动态路由！当然你可以通过通配符*解决！", r, !0), "*" === f && a.warn("uni-app 原生方法跳转路径为：" + p + "。在路由表中找不到相关路由表！当然你可以通过通配符*解决！", r, !0), "h5" === r.options.platform) {
                    var h = e.success;
                    e.success = function () {
                      for (var t = [], r = 0; r < arguments.length; r++) {
                        t[r] = arguments[r];
                      }
                      null == h || h.apply(null, t), n.timeOut(150).then(function () {
                        var t = e.detail || {};
                        if (Object.keys(t).length > 0 && Reflect.has(t, "index")) {
                          var r = n.getUniCachePage(0);
                          if (0 === Object.keys(r).length) return !1;
                          var o = r,
                            a = o.$options.onTabItemTap;
                          if (a) for (var i = 0; i < a.length; i++) {
                            a[i].call(o, t);
                          }
                        }
                      });
                    };
                  }
                  p = f;
                }
                var v = e,
                  y = v.events,
                  g = v.success,
                  d = v.fail,
                  m = v.complete,
                  b = v.animationType,
                  O = {
                    path: p,
                    events: y,
                    success: g,
                    fail: d,
                    complete: m,
                    animationDuration: v.animationDuration,
                    animationType: b
                  };
                r[l](n.notDeepClearNull(O));
              }
            }(u, t, e));
          };
        });
      };
    },
    963: function _(e, t, r) {
      "use strict";

      var o = this && this.__assign || function () {
        return (o = Object.assign || function (e) {
          for (var t, r = 1, o = arguments.length; r < o; r++) {
            for (var n in t = arguments[r]) {
              Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            }
          }
          return e;
        }).apply(this, arguments);
      };
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.createRouter = t.RouterMount = void 0;
      var n = r(282),
        a = r(789),
        i = r(662),
        u = r(460),
        l = r(890),
        p = r(314),
        c = function c() {},
        s = new Promise(function (e) {
          return c = e;
        });
      t.createRouter = function (e) {
        var t = a.assertNewOptions(e),
          r = {
            options: t,
            mount: [],
            Vue: null,
            proxyHookDeps: n.proxyHookDeps,
            appMain: {},
            enterPath: "",
            $route: null,
            $lockStatus: !1,
            routesMap: {},
            lifeCycle: i.registerRouterHooks(n.lifeCycle, t),
            push: function push(e) {
              l.lockNavjump(e, r, "push");
            },
            replace: function replace(e) {
              l.lockNavjump(e, r, "replace");
            },
            replaceAll: function replaceAll(e) {
              l.lockNavjump(e, r, "replaceAll");
            },
            pushTab: function pushTab(e) {
              l.lockNavjump(e, r, "pushTab");
            },
            back: function back(e, t) {
              void 0 === e && (e = 1), "[object Object]" !== a.getDataType(t) ? t = {
                from: "navigateBack"
              } : Reflect.has(t, "from") || (t = o(o({}, t), {
                from: "navigateBack"
              })), l.lockNavjump(e + "", r, "back", void 0, t);
            },
            forceGuardEach: function forceGuardEach(e, t) {
              l.forceGuardEach(r, e, t);
            },
            beforeEach: function beforeEach(e) {
              i.registerEachHooks(r, "beforeHooks", e);
            },
            afterEach: function afterEach(e) {
              i.registerEachHooks(r, "afterHooks", e);
            },
            install: function install(e) {
              r.Vue = e, p.rewriteMethod(this), u.initMixins(e, this), Object.defineProperty(e.prototype, "$Router", {
                get: function get() {
                  var e = r;
                  return Object.defineProperty(this, "$Router", {
                    value: e,
                    writable: !1,
                    configurable: !1,
                    enumerable: !1
                  }), Object.seal(e);
                }
              }), Object.defineProperty(e.prototype, "$Route", {
                get: function get() {
                  return l.createRoute(r);
                }
              }), Object.defineProperty(e.prototype, "$AppReady", {
                get: function get() {
                  return "h5" === r.options.platform ? Promise.resolve() : s;
                },
                set: function set(e) {
                  !0 === e && c();
                }
              });
            }
          };
        return a.def(r, "currentRoute", function () {
          return l.createRoute(r);
        }), r.beforeEach(function (e, t, r) {
          return r();
        }), r.afterEach(function () {}), r;
      }, t.RouterMount = function (e, t, r) {
        if (void 0 === r && (r = "#app"), "[object Array]" !== a.getDataType(t.mount)) throw new Error("挂载路由失败，router.app 应该为数组类型。当前类型：" + _typeof(t.mount));
        if (t.mount.push({
          app: e,
          el: r
        }), "h5" === t.options.platform) {
          var o = t.$route;
          o.replace({
            path: o.currentRoute.fullPath
          });
        }
      };
    },
    809: function _(e, t, r) {
      "use strict";

      var o = this && this.__assign || function () {
          return (o = Object.assign || function (e) {
            for (var t, r = 1, o = arguments.length; r < o; r++) {
              for (var n in t = arguments[r]) {
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }
            }
            return e;
          }).apply(this, arguments);
        },
        n = this && this.__awaiter || function (e, t, r, o) {
          return new (r || (r = Promise))(function (n, a) {
            function i(e) {
              try {
                l(o.next(e));
              } catch (e) {
                a(e);
              }
            }
            function u(e) {
              try {
                l(o.throw(e));
              } catch (e) {
                a(e);
              }
            }
            function l(e) {
              var t;
              e.done ? n(e.value) : (t = e.value, t instanceof r ? t : new r(function (e) {
                e(t);
              })).then(i, u);
            }
            l((o = o.apply(e, t || [])).next());
          });
        },
        a = this && this.__generator || function (e, t) {
          var r,
            o,
            n,
            a,
            i = {
              label: 0,
              sent: function sent() {
                if (1 & n[0]) throw n[1];
                return n[1];
              },
              trys: [],
              ops: []
            };
          return a = {
            next: u(0),
            throw: u(1),
            return: u(2)
          }, "function" == typeof Symbol && (a[Symbol.iterator] = function () {
            return this;
          }), a;
          function u(a) {
            return function (u) {
              return function (a) {
                if (r) throw new TypeError("Generator is already executing.");
                for (; i;) {
                  try {
                    if (r = 1, o && (n = 2 & a[0] ? o.return : a[0] ? o.throw || ((n = o.return) && n.call(o), 0) : o.next) && !(n = n.call(o, a[1])).done) return n;
                    switch (o = 0, n && (a = [2 & a[0], n.value]), a[0]) {
                      case 0:
                      case 1:
                        n = a;
                        break;
                      case 4:
                        return i.label++, {
                          value: a[1],
                          done: !1
                        };
                      case 5:
                        i.label++, o = a[1], a = [0];
                        continue;
                      case 7:
                        a = i.ops.pop(), i.trys.pop();
                        continue;
                      default:
                        if (!((n = (n = i.trys).length > 0 && n[n.length - 1]) || 6 !== a[0] && 2 !== a[0])) {
                          i = 0;
                          continue;
                        }
                        if (3 === a[0] && (!n || a[1] > n[0] && a[1] < n[3])) {
                          i.label = a[1];
                          break;
                        }
                        if (6 === a[0] && i.label < n[1]) {
                          i.label = n[1], n = a;
                          break;
                        }
                        if (n && i.label < n[2]) {
                          i.label = n[2], i.ops.push(a);
                          break;
                        }
                        n[2] && i.ops.pop(), i.trys.pop();
                        continue;
                    }
                    a = t.call(e, i);
                  } catch (e) {
                    a = [6, e], o = 0;
                  } finally {
                    r = n = 0;
                  }
                }
                if (5 & a[0]) throw a[1];
                return {
                  value: a[0] ? a[1] : void 0,
                  done: !0
                };
              }([a, u]);
            };
          }
        },
        i = this && this.__rest || function (e, t) {
          var r = {};
          for (var o in e) {
            Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (r[o] = e[o]);
          }
          if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
            var n = 0;
            for (o = Object.getOwnPropertySymbols(e); n < o.length; n++) {
              t.indexOf(o[n]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[n]) && (r[o[n]] = e[o[n]]);
            }
          }
          return r;
        };
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.formatOriginURLQuery = t.uniOriginJump = void 0;
      var u = r(99),
        l = r(789),
        p = r(282),
        c = r(845),
        s = 0,
        f = "reLaunch";
      function h(e, t, r) {
        var n,
          a = t.url,
          i = t.path,
          p = t.query,
          c = t.animationType,
          s = t.animationDuration,
          f = t.events,
          h = t.success,
          v = t.fail,
          y = t.complete,
          g = t.delta,
          d = t.animation,
          m = u.stringifyQuery(p || {}),
          b = "" === m ? i || a : (i || a) + m,
          O = {};
        return "app-plus" === e.options.platform && "navigateBack" !== r && (O = (null === (n = e.options.APP) || void 0 === n ? void 0 : n.animation) || {}, O = o(o({}, O), d || {})), l.notDeepClearNull({
          delta: g,
          url: b,
          animationType: c || O.animationType,
          animationDuration: s || O.animationDuration,
          events: f,
          success: h,
          fail: v,
          complete: y
        });
      }
      t.uniOriginJump = function (e, t, r, u, v, y) {
        var g = h(e, u, r),
          d = g.complete,
          m = i(g, ["complete"]),
          b = e.options.platform;
        null != y && !1 === y ? (0 === s && (s++, "h5" !== b && (c.resetAndCallPageHook(e, m.url), e.Vue.prototype.$AppReady = !0)), d && d.apply(null, {
          msg: "forceGuardEach强制触发并且不执行跳转"
        }), v && v.apply(null, {
          msg: "forceGuardEach强制触发并且不执行跳转"
        })) : (0 === s && ("app-plus" === b ? c.resetAndCallPageHook(e, m.url) : new RegExp(p.mpPlatformReg, "g").test(b) && c.resetAndCallPageHook(e, m.url, !1)), t(o(o({}, m), {
          from: u.BACKTYPE,
          complete: function complete() {
            for (var t, o, i, u, h = [], y = 0; y < arguments.length; y++) {
              h[y] = arguments[y];
            }
            return n(this, void 0, void 0, function () {
              var n, y, g;
              return a(this, function (a) {
                switch (a.label) {
                  case 0:
                    return 0 === s && (s++, "h5" !== b && (new RegExp(p.mpPlatformReg, "g").test(b) && c.resetPageHook(e), e.Vue.prototype.$AppReady = !0, "app-plus" === b && ((n = plus.nativeObj.View.getViewById("router-loadding")) && n.close(), (y = null === (t = e.options.APP) || void 0 === t ? void 0 : t.launchedHook) && y()))), g = 0, new RegExp(p.mpPlatformReg, "g").test(b) ? g = null === (o = e.options.applet) || void 0 === o ? void 0 : o.animationDuration : "app-plus" === b && "navigateBack" === r && "navigateTo" === f && (g = null === (u = null === (i = e.options.APP) || void 0 === i ? void 0 : i.animation) || void 0 === u ? void 0 : u.animationDuration), "navigateTo" !== r && "navigateBack" !== r || 0 === g ? [3, 2] : [4, l.timeOut(g)];
                  case 1:
                    a.sent(), a.label = 2;
                  case 2:
                    return f = r, d && d.apply(null, h), v && v.apply(null, h), [2];
                }
              });
            });
          }
        })));
      }, t.formatOriginURLQuery = h;
    }
  }, t = {}, function r(o) {
    if (t[o]) return t[o].exports;
    var n = t[o] = {
      exports: {}
    };
    return e[o].call(n.exports, n, n.exports, r), n.exports;
  }(607);
  var e, t;
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./../../../../../../applications/Hbuilder/HBuilderX/plugins/uniapp-cli/node_modules/webpack/buildin/module.js */ 160)(module)))

/***/ }),
/* 160 */
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 161 */
/*!*******************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/components/login_Controll.js ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initModal;
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 157));
function initModal(v) {
  // 挂在store到全局Vue原型上
  v.prototype.$modalStore = new _vuex.default.Store({
    state: {
      show_updateValue: false,
      show_agreement: false,
      show: false,
      title: "标题",
      content: '内容',
      showCancel: true,
      cancelText: "取消",
      confirmText: "确定",
      success: null
    },
    mutations: {
      hideModal: function hideModal(state) {
        state.show = false;
      },
      showModal: function showModal(state, data) {
        state = Object.assign(state, data);
        state.show = true;
      },
      success: function success(state, res) {
        var cb = state.success;
        var resObj = {
          cancel: false,
          confirm: false
        };
        res == "confirm" ? resObj.confirm = true : resObj.cancel = true;
        cb && cb(resObj);
      },
      showAgreement: function showAgreement(state) {
        state.show_agreement = true;
      },
      hideAgreement: function hideAgreement(state) {
        state.show_agreement = false;
      },
      show_show_updateValue: function show_show_updateValue(state, data) {
        state = Object.assign(state, data);
        state.show_updateValue = true;
      },
      hide_show_updateValue: function hide_show_updateValue(state) {
        state.show_updateValue = false;
      },
      success_updateValue: function success_updateValue(state, data) {
        var cb = state.success;
        var resObj = {
          cancel: false,
          confirm: false,
          value: ''
        };
        data.res == "confirm" ? resObj.confirm = true : resObj.cancel = true;
        resObj.value = data.updateValue;
        cb && cb(resObj);
      }
    }
  });
  v.prototype.$showModal = function (option) {
    if ((0, _typeof2.default)(option) === 'object') {
      v.prototype.$modalStore.commit('showModal', option);
    } else {
      throw "配置项必须为对象传入的值为：" + (0, _typeof2.default)(option);
    }
  }, v.prototype.$showAgreement = function (option) {
    v.prototype.$modalStore.commit('showAgreement');
  }, v.prototype.$showUpdate = function (option) {
    if ((0, _typeof2.default)(option) === 'object') {
      v.prototype.$modalStore.commit('show_show_updateValue', option);
    } else {
      throw "配置项必须为对象传入的值为：" + (0, _typeof2.default)(option);
    }
  };
}

/***/ }),
/* 162 */
/*!********************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/config/request.js ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.request = void 0;
var controll = 2; // 1未生产环境  2为开发环境
var API_BASE_URL = '';
API_BASE_URL = 'http://localhost:3000';
var request = function request(options) {
  return new Promise(function (resolve, reject) {
    var openid = uni.getStorageSync('OPENID');
    uni.request({
      url: API_BASE_URL + options.url,
      method: options.method || "GET",
      data: options.data || {},
      header: {
        'openid': openid
      },
      dataType: 'json',
      success: function success(res) {
        resolve(res);
      },
      fail: function fail(error) {
        reject(error);
      }
    });
  });
};
exports.request = request;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */
/*!***********************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/config/portConfig.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var controll = 2; // 1未生产环境  2为开发环境
var port = '';
port = 'http://localhost:3000';
module.exports = {
  port: port
};

/***/ }),
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */
/*!*******************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/config/socket.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
var _weappSocket = _interopRequireDefault(__webpack_require__(/*! weapp.socket.io */ 195));
var controll = 2; // 1未生产环境  2为开发环境
var server = 'http://localhost:3000';
var socket = (0, _weappSocket.default)(server);
module.exports = {
  socket: socket
};

/***/ }),
/* 195 */
/*!******************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/weapp.socket.io/lib/weapp.socket.io.js ***!
  \******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(wx, module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _defineProperty = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11);
var _assertThisInitialized = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ 196);
var _get = __webpack_require__(/*! @babel/runtime/helpers/get */ 197);
var _inherits = __webpack_require__(/*! @babel/runtime/helpers/inherits */ 200);
var _possibleConstructorReturn = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ 201);
var _getPrototypeOf = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ 199);
var _classCallCheck = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23);
var _createClass = __webpack_require__(/*! @babel/runtime/helpers/createClass */ 24);
var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 13);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e10) { throw _e10; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e11) { didErr = true; err = _e11; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
!function (t, e) {
  if ("object" == ( false ? undefined : _typeof(exports)) && "object" == ( false ? undefined : _typeof(module))) module.exports = e();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (e),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else { var n, r; }
}(window, function () {
  return function (t) {
    var e = {};
    function r(n) {
      if (e[n]) return e[n].exports;
      var s = e[n] = {
        i: n,
        l: !1,
        exports: {}
      };
      return t[n].call(s.exports, s, s.exports, r), s.l = !0, s.exports;
    }
    return r.m = t, r.c = e, r.d = function (t, e, n) {
      r.o(t, e) || Object.defineProperty(t, e, {
        enumerable: !0,
        get: n
      });
    }, r.r = function (t) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(t, "__esModule", {
        value: !0
      });
    }, r.t = function (t, e) {
      if (1 & e && (t = r(t)), 8 & e) return t;
      if (4 & e && "object" == _typeof(t) && t && t.__esModule) return t;
      var n = Object.create(null);
      if (r.r(n), Object.defineProperty(n, "default", {
        enumerable: !0,
        value: t
      }), 2 & e && "string" != typeof t) for (var s in t) {
        r.d(n, s, function (e) {
          return t[e];
        }.bind(null, s));
      }
      return n;
    }, r.n = function (t) {
      var e = t && t.__esModule ? function () {
        return t.default;
      } : function () {
        return t;
      };
      return r.d(e, "a", e), e;
    }, r.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }, r.p = "", r(r.s = 14);
  }([function (t, e) {
    t.exports = function () {
      return function () {};
    };
  }, function (t, e, r) {
    function n(t) {
      if (t) return function (t) {
        for (var e in n.prototype) {
          t[e] = n.prototype[e];
        }
        return t;
      }(t);
    }
    t.exports = n, n.prototype.on = n.prototype.addEventListener = function (t, e) {
      return this._callbacks = this._callbacks || {}, (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e), this;
    }, n.prototype.once = function (t, e) {
      function r() {
        this.off(t, r), e.apply(this, arguments);
      }
      return r.fn = e, this.on(t, r), this;
    }, n.prototype.off = n.prototype.removeListener = n.prototype.removeAllListeners = n.prototype.removeEventListener = function (t, e) {
      if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
      var r,
        n = this._callbacks["$" + t];
      if (!n) return this;
      if (1 == arguments.length) return delete this._callbacks["$" + t], this;
      for (var s = 0; s < n.length; s++) {
        if ((r = n[s]) === e || r.fn === e) {
          n.splice(s, 1);
          break;
        }
      }
      return 0 === n.length && delete this._callbacks["$" + t], this;
    }, n.prototype.emit = function (t) {
      this._callbacks = this._callbacks || {};
      for (var e = new Array(arguments.length - 1), r = this._callbacks["$" + t], n = 1; n < arguments.length; n++) {
        e[n - 1] = arguments[n];
      }
      if (r) {
        n = 0;
        for (var s = (r = r.slice(0)).length; n < s; ++n) {
          r[n].apply(this, e);
        }
      }
      return this;
    }, n.prototype.listeners = function (t) {
      return this._callbacks = this._callbacks || {}, this._callbacks["$" + t] || [];
    }, n.prototype.hasListeners = function (t) {
      return !!this.listeners(t).length;
    };
  }, function (t, e, r) {
    var n = r(24),
      s = r(25),
      o = String.fromCharCode(30);
    t.exports = {
      protocol: 4,
      encodePacket: n,
      encodePayload: function encodePayload(t, e) {
        var r = t.length,
          s = new Array(r);
        var i = 0;
        t.forEach(function (t, a) {
          n(t, !1, function (t) {
            s[a] = t, ++i === r && e(s.join(o));
          });
        });
      },
      decodePacket: s,
      decodePayload: function decodePayload(t, e) {
        var r = t.split(o),
          n = [];
        for (var _t = 0; _t < r.length; _t++) {
          var _o = s(r[_t], e);
          if (n.push(_o), "error" === _o.type) break;
        }
        return n;
      }
    };
  }, function (t, e, r) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.Decoder = e.Encoder = e.PacketType = e.protocol = void 0;
    var n = r(1),
      s = r(41),
      o = r(12),
      i = r(0)("socket.io-parser");
    var a;
    e.protocol = 5, function (t) {
      t[t.CONNECT = 0] = "CONNECT", t[t.DISCONNECT = 1] = "DISCONNECT", t[t.EVENT = 2] = "EVENT", t[t.ACK = 3] = "ACK", t[t.CONNECT_ERROR = 4] = "CONNECT_ERROR", t[t.BINARY_EVENT = 5] = "BINARY_EVENT", t[t.BINARY_ACK = 6] = "BINARY_ACK";
    }(a = e.PacketType || (e.PacketType = {}));
    e.Encoder = /*#__PURE__*/function () {
      function _class() {
        _classCallCheck(this, _class);
      }
      _createClass(_class, [{
        key: "encode",
        value: function encode(t) {
          return i("encoding packet %j", t), t.type !== a.EVENT && t.type !== a.ACK || !o.hasBinary(t) ? [this.encodeAsString(t)] : (t.type = t.type === a.EVENT ? a.BINARY_EVENT : a.BINARY_ACK, this.encodeAsBinary(t));
        }
      }, {
        key: "encodeAsString",
        value: function encodeAsString(t) {
          var e = "" + t.type;
          return t.type !== a.BINARY_EVENT && t.type !== a.BINARY_ACK || (e += t.attachments + "-"), t.nsp && "/" !== t.nsp && (e += t.nsp + ","), null != t.id && (e += t.id), null != t.data && (e += JSON.stringify(t.data)), i("encoded %j as %s", t, e), e;
        }
      }, {
        key: "encodeAsBinary",
        value: function encodeAsBinary(t) {
          var e = s.deconstructPacket(t),
            r = this.encodeAsString(e.packet),
            n = e.buffers;
          return n.unshift(r), n;
        }
      }]);
      return _class;
    }();
    var c = /*#__PURE__*/function (_n) {
      _inherits(c, _n);
      var _super = _createSuper(c);
      function c() {
        _classCallCheck(this, c);
        return _super.call(this);
      }
      _createClass(c, [{
        key: "add",
        value: function add(t) {
          var e;
          if ("string" == typeof t) e = this.decodeString(t), e.type === a.BINARY_EVENT || e.type === a.BINARY_ACK ? (this.reconstructor = new h(e), 0 === e.attachments && _get(_getPrototypeOf(c.prototype), "emit", this).call(this, "decoded", e)) : _get(_getPrototypeOf(c.prototype), "emit", this).call(this, "decoded", e);else {
            if (!o.isBinary(t) && !t.base64) throw new Error("Unknown type: " + t);
            if (!this.reconstructor) throw new Error("got binary data when not reconstructing a packet");
            e = this.reconstructor.takeBinaryData(t), e && (this.reconstructor = null, _get(_getPrototypeOf(c.prototype), "emit", this).call(this, "decoded", e));
          }
        }
      }, {
        key: "decodeString",
        value: function decodeString(t) {
          var e = 0;
          var r = {
            type: Number(t.charAt(0))
          };
          if (void 0 === a[r.type]) throw new Error("unknown packet type " + r.type);
          if (r.type === a.BINARY_EVENT || r.type === a.BINARY_ACK) {
            var _n2 = e + 1;
            for (; "-" !== t.charAt(++e) && e != t.length;) {
              ;
            }
            var _s = t.substring(_n2, e);
            if (_s != Number(_s) || "-" !== t.charAt(e)) throw new Error("Illegal attachments");
            r.attachments = Number(_s);
          }
          if ("/" === t.charAt(e + 1)) {
            var _n3 = e + 1;
            for (; ++e;) {
              if ("," === t.charAt(e)) break;
              if (e === t.length) break;
            }
            r.nsp = t.substring(_n3, e);
          } else r.nsp = "/";
          var n = t.charAt(e + 1);
          if ("" !== n && Number(n) == n) {
            var _n4 = e + 1;
            for (; ++e;) {
              var _r = t.charAt(e);
              if (null == _r || Number(_r) != _r) {
                --e;
                break;
              }
              if (e === t.length) break;
            }
            r.id = Number(t.substring(_n4, e + 1));
          }
          if (t.charAt(++e)) {
            var _n5 = function (t) {
              try {
                return JSON.parse(t);
              } catch (t) {
                return !1;
              }
            }(t.substr(e));
            if (!c.isPayloadValid(r.type, _n5)) throw new Error("invalid payload");
            r.data = _n5;
          }
          return i("decoded %s as %j", t, r), r;
        }
      }, {
        key: "destroy",
        value: function destroy() {
          this.reconstructor && this.reconstructor.finishedReconstruction();
        }
      }], [{
        key: "isPayloadValid",
        value: function isPayloadValid(t, e) {
          switch (t) {
            case a.CONNECT:
              return "object" == _typeof(e);
            case a.DISCONNECT:
              return void 0 === e;
            case a.CONNECT_ERROR:
              return "string" == typeof e || "object" == _typeof(e);
            case a.EVENT:
            case a.BINARY_EVENT:
              return Array.isArray(e) && e.length > 0;
            case a.ACK:
            case a.BINARY_ACK:
              return Array.isArray(e);
          }
        }
      }]);
      return c;
    }(n);
    e.Decoder = c;
    var h = /*#__PURE__*/function () {
      function h(t) {
        _classCallCheck(this, h);
        this.packet = t, this.buffers = [], this.reconPack = t;
      }
      _createClass(h, [{
        key: "takeBinaryData",
        value: function takeBinaryData(t) {
          if (this.buffers.push(t), this.buffers.length === this.reconPack.attachments) {
            var _t2 = s.reconstructPacket(this.reconPack, this.buffers);
            return this.finishedReconstruction(), _t2;
          }
          return null;
        }
      }, {
        key: "finishedReconstruction",
        value: function finishedReconstruction() {
          this.reconPack = null, this.buffers = [];
        }
      }]);
      return h;
    }();
  }, function (t, e) {
    var r = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
      n = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
    t.exports = function (t) {
      var e = t,
        s = t.indexOf("["),
        o = t.indexOf("]");
      -1 != s && -1 != o && (t = t.substring(0, s) + t.substring(s, o).replace(/:/g, ";") + t.substring(o, t.length));
      for (var i, a, c = r.exec(t || ""), h = {}, u = 14; u--;) {
        h[n[u]] = c[u] || "";
      }
      return -1 != s && -1 != o && (h.source = e, h.host = h.host.substring(1, h.host.length - 1).replace(/;/g, ":"), h.authority = h.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), h.ipv6uri = !0), h.pathNames = function (t, e) {
        var r = e.replace(/\/{2,9}/g, "/").split("/");
        "/" != e.substr(0, 1) && 0 !== e.length || r.splice(0, 1);
        "/" == e.substr(e.length - 1, 1) && r.splice(r.length - 1, 1);
        return r;
      }(0, h.path), h.queryKey = (i = h.query, a = {}, i.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function (t, e, r) {
        e && (a[e] = r);
      }), a), h;
    };
  }, function (t, e, r) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.Manager = void 0;
    var n = r(17),
      s = r(11),
      o = r(1),
      i = r(3),
      a = r(13),
      c = r(42),
      h = r(0)("socket.io-client:manager");
    e.Manager = /*#__PURE__*/function (_o2) {
      _inherits(_class2, _o2);
      var _super2 = _createSuper(_class2);
      function _class2(t, e) {
        var _this;
        _classCallCheck(this, _class2);
        _this = _super2.call(this), _this.nsps = {}, _this.subs = [], t && "object" == _typeof(t) && (e = t, t = void 0), (e = e || {}).path = e.path || "/socket.io", _this.opts = e, _this.reconnection(!1 !== e.reconnection), _this.reconnectionAttempts(e.reconnectionAttempts || 1 / 0), _this.reconnectionDelay(e.reconnectionDelay || 1e3), _this.reconnectionDelayMax(e.reconnectionDelayMax || 5e3), _this.randomizationFactor(e.randomizationFactor || .5), _this.backoff = new c({
          min: _this.reconnectionDelay(),
          max: _this.reconnectionDelayMax(),
          jitter: _this.randomizationFactor()
        }), _this.timeout(null == e.timeout ? 2e4 : e.timeout), _this._readyState = "closed", _this.uri = t;
        var r = e.parser || i;
        _this.encoder = new r.Encoder(), _this.decoder = new r.Decoder(), _this._autoConnect = !1 !== e.autoConnect, _this._autoConnect && _this.open();
        return _this;
      }
      _createClass(_class2, [{
        key: "reconnection",
        value: function reconnection(t) {
          return arguments.length ? (this._reconnection = !!t, this) : this._reconnection;
        }
      }, {
        key: "reconnectionAttempts",
        value: function reconnectionAttempts(t) {
          return void 0 === t ? this._reconnectionAttempts : (this._reconnectionAttempts = t, this);
        }
      }, {
        key: "reconnectionDelay",
        value: function reconnectionDelay(t) {
          var e;
          return void 0 === t ? this._reconnectionDelay : (this._reconnectionDelay = t, null === (e = this.backoff) || void 0 === e || e.setMin(t), this);
        }
      }, {
        key: "randomizationFactor",
        value: function randomizationFactor(t) {
          var e;
          return void 0 === t ? this._randomizationFactor : (this._randomizationFactor = t, null === (e = this.backoff) || void 0 === e || e.setJitter(t), this);
        }
      }, {
        key: "reconnectionDelayMax",
        value: function reconnectionDelayMax(t) {
          var e;
          return void 0 === t ? this._reconnectionDelayMax : (this._reconnectionDelayMax = t, null === (e = this.backoff) || void 0 === e || e.setMax(t), this);
        }
      }, {
        key: "timeout",
        value: function timeout(t) {
          return arguments.length ? (this._timeout = t, this) : this._timeout;
        }
      }, {
        key: "maybeReconnectOnOpen",
        value: function maybeReconnectOnOpen() {
          !this._reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect();
        }
      }, {
        key: "open",
        value: function open(t) {
          var _this2 = this;
          if (h("readyState %s", this._readyState), ~this._readyState.indexOf("open")) return this;
          h("opening %s", this.uri), this.engine = n(this.uri, this.opts);
          var e = this.engine,
            r = this;
          this._readyState = "opening", this.skipReconnect = !1;
          var s = a.on(e, "open", function () {
              r.onopen(), t && t();
            }),
            o = a.on(e, "error", function (e) {
              h("error"), r.cleanup(), r._readyState = "closed", _get(_getPrototypeOf(_class2.prototype), "emit", _this2).call(_this2, "error", e), t ? t(e) : r.maybeReconnectOnOpen();
            });
          if (!1 !== this._timeout) {
            var _t3 = this._timeout;
            h("connect attempt will timeout after %d", _t3), 0 === _t3 && s();
            var _r2 = setTimeout(function () {
              h("connect attempt timed out after %d", _t3), s(), e.close(), e.emit("error", new Error("timeout"));
            }, _t3);
            this.subs.push(function () {
              clearTimeout(_r2);
            });
          }
          return this.subs.push(s), this.subs.push(o), this;
        }
      }, {
        key: "connect",
        value: function connect(t) {
          return this.open(t);
        }
      }, {
        key: "onopen",
        value: function onopen() {
          h("open"), this.cleanup(), this._readyState = "open", _get(_getPrototypeOf(_class2.prototype), "emit", this).call(this, "open");
          var t = this.engine;
          this.subs.push(a.on(t, "ping", this.onping.bind(this)), a.on(t, "data", this.ondata.bind(this)), a.on(t, "error", this.onerror.bind(this)), a.on(t, "close", this.onclose.bind(this)), a.on(this.decoder, "decoded", this.ondecoded.bind(this)));
        }
      }, {
        key: "onping",
        value: function onping() {
          _get(_getPrototypeOf(_class2.prototype), "emit", this).call(this, "ping");
        }
      }, {
        key: "ondata",
        value: function ondata(t) {
          this.decoder.add(t);
        }
      }, {
        key: "ondecoded",
        value: function ondecoded(t) {
          _get(_getPrototypeOf(_class2.prototype), "emit", this).call(this, "packet", t);
        }
      }, {
        key: "onerror",
        value: function onerror(t) {
          h("error", t), _get(_getPrototypeOf(_class2.prototype), "emit", this).call(this, "error", t);
        }
      }, {
        key: "socket",
        value: function socket(t, e) {
          var r = this.nsps[t];
          return r || (r = new s.Socket(this, t, e), this.nsps[t] = r), r;
        }
      }, {
        key: "_destroy",
        value: function _destroy(t) {
          var e = Object.keys(this.nsps);
          for (var _i = 0, _e = e; _i < _e.length; _i++) {
            var _t4 = _e[_i];
            if (this.nsps[_t4].active) return void h("socket %s is still active, skipping close", _t4);
          }
          this._close();
        }
      }, {
        key: "_packet",
        value: function _packet(t) {
          h("writing packet %j", t);
          var e = this.encoder.encode(t);
          for (var _r3 = 0; _r3 < e.length; _r3++) {
            this.engine.write(e[_r3], t.options);
          }
        }
      }, {
        key: "cleanup",
        value: function cleanup() {
          h("cleanup"), this.subs.forEach(function (t) {
            return t();
          }), this.subs.length = 0, this.decoder.destroy();
        }
      }, {
        key: "_close",
        value: function _close() {
          h("disconnect"), this.skipReconnect = !0, this._reconnecting = !1, "opening" === this._readyState && this.cleanup(), this.backoff.reset(), this._readyState = "closed", this.engine && this.engine.close();
        }
      }, {
        key: "disconnect",
        value: function disconnect() {
          return this._close();
        }
      }, {
        key: "onclose",
        value: function onclose(t) {
          h("onclose"), this.cleanup(), this.backoff.reset(), this._readyState = "closed", _get(_getPrototypeOf(_class2.prototype), "emit", this).call(this, "close", t), this._reconnection && !this.skipReconnect && this.reconnect();
        }
      }, {
        key: "reconnect",
        value: function reconnect() {
          var _this3 = this;
          if (this._reconnecting || this.skipReconnect) return this;
          var t = this;
          if (this.backoff.attempts >= this._reconnectionAttempts) h("reconnect failed"), this.backoff.reset(), _get(_getPrototypeOf(_class2.prototype), "emit", this).call(this, "reconnect_failed"), this._reconnecting = !1;else {
            var _e2 = this.backoff.duration();
            h("will wait %dms before reconnect attempt", _e2), this._reconnecting = !0;
            var _r4 = setTimeout(function () {
              t.skipReconnect || (h("attempting reconnect"), _get(_getPrototypeOf(_class2.prototype), "emit", _this3).call(_this3, "reconnect_attempt", t.backoff.attempts), t.skipReconnect || t.open(function (e) {
                e ? (h("reconnect attempt error"), t._reconnecting = !1, t.reconnect(), _get(_getPrototypeOf(_class2.prototype), "emit", _this3).call(_this3, "reconnect_error", e)) : (h("reconnect success"), t.onreconnect());
              }));
            }, _e2);
            this.subs.push(function () {
              clearTimeout(_r4);
            });
          }
        }
      }, {
        key: "onreconnect",
        value: function onreconnect() {
          var t = this.backoff.attempts;
          this._reconnecting = !1, this.backoff.reset(), _get(_getPrototypeOf(_class2.prototype), "emit", this).call(this, "reconnect", t);
        }
      }]);
      return _class2;
    }(o);
  }, function (t, e, r) {
    var n = r(19);
    e.websocket = n;
  }, function (t, e) {
    var r;
    r = function () {
      return this;
    }();
    try {
      r = r || new Function("return this")();
    } catch (t) {
      "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && (r = window);
    }
    t.exports = r;
  }, function (t, e, r) {
    var n = r(2),
      s = r(1),
      o = r(0)("engine.io-client:transport");
    t.exports = /*#__PURE__*/function (_s2) {
      "use strict";

      _inherits(_class3, _s2);
      var _super3 = _createSuper(_class3);
      function _class3(t) {
        var _this4;
        _classCallCheck(this, _class3);
        _this4 = _super3.call(this), _this4.opts = t, _this4.query = t.query, _this4.readyState = "", _this4.socket = t.socket;
        return _this4;
      }
      _createClass(_class3, [{
        key: "onError",
        value: function onError(t, e) {
          var r = new Error(t);
          return r.type = "TransportError", r.description = e, this.emit("error", r), this;
        }
      }, {
        key: "open",
        value: function open() {
          return "closed" !== this.readyState && "" !== this.readyState || (this.readyState = "opening", this.doOpen()), this;
        }
      }, {
        key: "close",
        value: function close() {
          return "opening" !== this.readyState && "open" !== this.readyState || (this.doClose(), this.onClose()), this;
        }
      }, {
        key: "send",
        value: function send(t) {
          "open" === this.readyState ? this.write(t) : o("transport is not open, discarding packets");
        }
      }, {
        key: "onOpen",
        value: function onOpen() {
          this.readyState = "open", this.writable = !0, this.emit("open");
        }
      }, {
        key: "onData",
        value: function onData(t) {
          var e = n.decodePacket(t, this.socket.binaryType);
          this.onPacket(e);
        }
      }, {
        key: "onPacket",
        value: function onPacket(t) {
          this.emit("packet", t);
        }
      }, {
        key: "onClose",
        value: function onClose() {
          this.readyState = "closed", this.emit("close");
        }
      }]);
      return _class3;
    }(s);
  }, function (t, e) {
    var r = Object.create(null);
    r.open = "0", r.close = "1", r.ping = "2", r.pong = "3", r.message = "4", r.upgrade = "5", r.noop = "6";
    var n = Object.create(null);
    Object.keys(r).forEach(function (t) {
      n[r[t]] = t;
    });
    t.exports = {
      PACKET_TYPES: r,
      PACKET_TYPES_REVERSE: n,
      ERROR_PACKET: {
        type: "error",
        data: "parser error"
      }
    };
  }, function (t, e) {
    e.encode = function (t) {
      var e = "";
      for (var r in t) {
        t.hasOwnProperty(r) && (e.length && (e += "&"), e += encodeURIComponent(r) + "=" + encodeURIComponent(t[r]));
      }
      return e;
    }, e.decode = function (t) {
      for (var e = {}, r = t.split("&"), n = 0, s = r.length; n < s; n++) {
        var o = r[n].split("=");
        e[decodeURIComponent(o[0])] = decodeURIComponent(o[1]);
      }
      return e;
    };
  }, function (t, e, r) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.Socket = void 0;
    var n = r(3),
      s = r(1),
      o = r(13),
      i = r(0)("socket.io-client:socket"),
      a = Object.freeze({
        connect: 1,
        connect_error: 1,
        disconnect: 1,
        disconnecting: 1,
        newListener: 1,
        removeListener: 1
      });
    e.Socket = /*#__PURE__*/function (_s3) {
      _inherits(_class4, _s3);
      var _super4 = _createSuper(_class4);
      function _class4(t, e, r) {
        var _this5;
        _classCallCheck(this, _class4);
        _this5 = _super4.call(this), _this5.receiveBuffer = [], _this5.sendBuffer = [], _this5.ids = 0, _this5.acks = {}, _this5.flags = {}, _this5.io = t, _this5.nsp = e, _this5.ids = 0, _this5.acks = {}, _this5.receiveBuffer = [], _this5.sendBuffer = [], _this5.connected = !1, _this5.disconnected = !0, _this5.flags = {}, r && r.auth && (_this5.auth = r.auth), _this5.io._autoConnect && _this5.open();
        return _this5;
      }
      _createClass(_class4, [{
        key: "subEvents",
        value: function subEvents() {
          if (this.subs) return;
          var t = this.io;
          this.subs = [o.on(t, "open", this.onopen.bind(this)), o.on(t, "packet", this.onpacket.bind(this)), o.on(t, "error", this.onerror.bind(this)), o.on(t, "close", this.onclose.bind(this))];
        }
      }, {
        key: "active",
        get: function get() {
          return !!this.subs;
        }
      }, {
        key: "connect",
        value: function connect() {
          return this.connected || (this.subEvents(), this.io._reconnecting || this.io.open(), "open" === this.io._readyState && this.onopen()), this;
        }
      }, {
        key: "open",
        value: function open() {
          return this.connect();
        }
      }, {
        key: "send",
        value: function send() {
          for (var _len = arguments.length, t = new Array(_len), _key = 0; _key < _len; _key++) {
            t[_key] = arguments[_key];
          }
          return t.unshift("message"), this.emit.apply(this, t), this;
        }
      }, {
        key: "emit",
        value: function emit(t) {
          if (a.hasOwnProperty(t)) throw new Error('"' + t + '" is a reserved event name');
          for (var _len2 = arguments.length, e = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            e[_key2 - 1] = arguments[_key2];
          }
          e.unshift(t);
          var r = {
            type: n.PacketType.EVENT,
            data: e,
            options: {}
          };
          r.options.compress = !1 !== this.flags.compress, "function" == typeof e[e.length - 1] && (i("emitting packet with ack id %d", this.ids), this.acks[this.ids] = e.pop(), r.id = this.ids++);
          var s = this.io.engine && this.io.engine.transport && this.io.engine.transport.writable;
          return this.flags.volatile && (!s || !this.connected) ? i("discard packet as the transport is not currently writable") : this.connected ? this.packet(r) : this.sendBuffer.push(r), this.flags = {}, this;
        }
      }, {
        key: "packet",
        value: function packet(t) {
          t.nsp = this.nsp, this.io._packet(t);
        }
      }, {
        key: "onopen",
        value: function onopen() {
          var _this6 = this;
          i("transport is open - connecting"), "function" == typeof this.auth ? this.auth(function (t) {
            _this6.packet({
              type: n.PacketType.CONNECT,
              data: t
            });
          }) : this.packet({
            type: n.PacketType.CONNECT,
            data: this.auth
          });
        }
      }, {
        key: "onerror",
        value: function onerror(t) {
          this.connected || _get(_getPrototypeOf(_class4.prototype), "emit", this).call(this, "connect_error", t);
        }
      }, {
        key: "onclose",
        value: function onclose(t) {
          i("close (%s)", t), this.connected = !1, this.disconnected = !0, delete this.id, _get(_getPrototypeOf(_class4.prototype), "emit", this).call(this, "disconnect", t);
        }
      }, {
        key: "onpacket",
        value: function onpacket(t) {
          if (t.nsp === this.nsp) switch (t.type) {
            case n.PacketType.CONNECT:
              if (t.data && t.data.sid) {
                var _e4 = t.data.sid;
                this.onconnect(_e4);
              } else _get(_getPrototypeOf(_class4.prototype), "emit", this).call(this, "connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
              break;
            case n.PacketType.EVENT:
            case n.PacketType.BINARY_EVENT:
              this.onevent(t);
              break;
            case n.PacketType.ACK:
            case n.PacketType.BINARY_ACK:
              this.onack(t);
              break;
            case n.PacketType.DISCONNECT:
              this.ondisconnect();
              break;
            case n.PacketType.CONNECT_ERROR:
              var _e3 = new Error(t.data.message);
              _e3.data = t.data.data, _get(_getPrototypeOf(_class4.prototype), "emit", this).call(this, "connect_error", _e3);
          }
        }
      }, {
        key: "onevent",
        value: function onevent(t) {
          var e = t.data || [];
          i("emitting event %j", e), null != t.id && (i("attaching ack callback to event"), e.push(this.ack(t.id))), this.connected ? this.emitEvent(e) : this.receiveBuffer.push(Object.freeze(e));
        }
      }, {
        key: "emitEvent",
        value: function emitEvent(t) {
          if (this._anyListeners && this._anyListeners.length) {
            var _e5 = this._anyListeners.slice();
            var _iterator = _createForOfIteratorHelper(_e5),
              _step;
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var _r5 = _step.value;
                _r5.apply(this, t);
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
          }
          _get(_getPrototypeOf(_class4.prototype), "emit", this).apply(this, t);
        }
      }, {
        key: "ack",
        value: function ack(t) {
          var e = this;
          var r = !1;
          return function () {
            for (var _len3 = arguments.length, s = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
              s[_key3] = arguments[_key3];
            }
            r || (r = !0, i("sending ack %j", s), e.packet({
              type: n.PacketType.ACK,
              id: t,
              data: s
            }));
          };
        }
      }, {
        key: "onack",
        value: function onack(t) {
          var e = this.acks[t.id];
          "function" == typeof e ? (i("calling ack %s with %j", t.id, t.data), e.apply(this, t.data), delete this.acks[t.id]) : i("bad ack %s", t.id);
        }
      }, {
        key: "onconnect",
        value: function onconnect(t) {
          i("socket connected with id %s", t), this.id = t, this.connected = !0, this.disconnected = !1, _get(_getPrototypeOf(_class4.prototype), "emit", this).call(this, "connect"), this.emitBuffered();
        }
      }, {
        key: "emitBuffered",
        value: function emitBuffered() {
          var _this7 = this;
          this.receiveBuffer.forEach(function (t) {
            return _this7.emitEvent(t);
          }), this.receiveBuffer = [], this.sendBuffer.forEach(function (t) {
            return _this7.packet(t);
          }), this.sendBuffer = [];
        }
      }, {
        key: "ondisconnect",
        value: function ondisconnect() {
          i("server disconnect (%s)", this.nsp), this.destroy(), this.onclose("io server disconnect");
        }
      }, {
        key: "destroy",
        value: function destroy() {
          this.subs && (this.subs.forEach(function (t) {
            return t();
          }), this.subs = void 0), this.io._destroy(this);
        }
      }, {
        key: "disconnect",
        value: function disconnect() {
          return this.connected && (i("performing disconnect (%s)", this.nsp), this.packet({
            type: n.PacketType.DISCONNECT
          })), this.destroy(), this.connected && this.onclose("io client disconnect"), this;
        }
      }, {
        key: "close",
        value: function close() {
          return this.disconnect();
        }
      }, {
        key: "compress",
        value: function compress(t) {
          return this.flags.compress = t, this;
        }
      }, {
        key: "volatile",
        get: function get() {
          return this.flags.volatile = !0, this;
        }
      }, {
        key: "onAny",
        value: function onAny(t) {
          return this._anyListeners = this._anyListeners || [], this._anyListeners.push(t), this;
        }
      }, {
        key: "prependAny",
        value: function prependAny(t) {
          return this._anyListeners = this._anyListeners || [], this._anyListeners.unshift(t), this;
        }
      }, {
        key: "offAny",
        value: function offAny(t) {
          if (!this._anyListeners) return this;
          if (t) {
            var _e6 = this._anyListeners;
            for (var _r6 = 0; _r6 < _e6.length; _r6++) {
              if (t === _e6[_r6]) return _e6.splice(_r6, 1), this;
            }
          } else this._anyListeners = [];
          return this;
        }
      }, {
        key: "listenersAny",
        value: function listenersAny() {
          return this._anyListeners || [];
        }
      }]);
      return _class4;
    }(s);
  }, function (t, e, r) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.hasBinary = e.isBinary = void 0;
    var n = "function" == typeof ArrayBuffer,
      s = Object.prototype.toString,
      o = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === s.call(Blob),
      i = "function" == typeof File || "undefined" != typeof File && "[object FileConstructor]" === s.call(File);
    function a(t) {
      return n && (t instanceof ArrayBuffer || function (t) {
        return "function" == typeof ArrayBuffer.isView ? ArrayBuffer.isView(t) : t.buffer instanceof ArrayBuffer;
      }(t)) || o && t instanceof Blob || i && t instanceof File;
    }
    e.isBinary = a, e.hasBinary = function t(e, r) {
      if (!e || "object" != _typeof(e)) return !1;
      if (Array.isArray(e)) {
        for (var _r7 = 0, _n6 = e.length; _r7 < _n6; _r7++) {
          if (t(e[_r7])) return !0;
        }
        return !1;
      }
      if (a(e)) return !0;
      if (e.toJSON && "function" == typeof e.toJSON && 1 === arguments.length) return t(e.toJSON(), !0);
      for (var _r8 in e) {
        if (Object.prototype.hasOwnProperty.call(e, _r8) && t(e[_r8])) return !0;
      }
      return !1;
    };
  }, function (t, e, r) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.on = void 0, e.on = function (t, e, r) {
      return t.on(e, r), function () {
        t.off(e, r);
      };
    };
  }, function (t, e, r) {
    t.exports = r(15);
  }, function (t, e, r) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.Socket = e.io = e.Manager = e.protocol = void 0;
    var n = r(16),
      s = r(5),
      o = r(11);
    Object.defineProperty(e, "Socket", {
      enumerable: !0,
      get: function get() {
        return o.Socket;
      }
    });
    var i = r(0)("socket.io-client");
    t.exports = e = c;
    var a = e.managers = {};
    function c(t, e) {
      "object" == _typeof(t) && (e = t, t = void 0), e = e || {};
      var r = n.url(t, e.path),
        o = r.source,
        c = r.id,
        h = r.path,
        u = a[c] && h in a[c].nsps;
      var f;
      return e.forceNew || e["force new connection"] || !1 === e.multiplex || u ? (i("ignoring socket cache for %s", o), f = new s.Manager(o, e)) : (a[c] || (i("new io instance for %s", o), a[c] = new s.Manager(o, e)), f = a[c]), r.query && !e.query && (e.query = r.queryKey), f.socket(r.path, e);
    }
    e.io = c;
    var h = r(3);
    Object.defineProperty(e, "protocol", {
      enumerable: !0,
      get: function get() {
        return h.protocol;
      }
    }), e.connect = c;
    var u = r(5);
    Object.defineProperty(e, "Manager", {
      enumerable: !0,
      get: function get() {
        return u.Manager;
      }
    });
  }, function (t, e, r) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.url = void 0;
    var n = r(4),
      s = r(0)("socket.io-client:url");
    e.url = function (t) {
      var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      var r = arguments.length > 2 ? arguments[2] : undefined;
      var o = t;
      r = r || "undefined" != typeof location && location, null == t && (t = r.protocol + "//" + r.host), "string" == typeof t && ("/" === t.charAt(0) && (t = "/" === t.charAt(1) ? r.protocol + t : r.host + t), /^(https?|wss?):\/\//.test(t) || (s("protocol-less url %s", t), t = void 0 !== r ? r.protocol + "//" + t : "https://" + t), s("parse %s", t), o = n(t)), o.port || (/^(http|ws)$/.test(o.protocol) ? o.port = "80" : /^(http|ws)s$/.test(o.protocol) && (o.port = "443")), o.path = o.path || "/";
      var i = -1 !== o.host.indexOf(":") ? "[" + o.host + "]" : o.host;
      return o.id = o.protocol + "://" + i + ":" + o.port + e, o.href = o.protocol + "://" + i + (r && r.port === o.port ? "" : ":" + o.port), o;
    };
  }, function (t, e, r) {
    var n = r(18);
    t.exports = function (t, e) {
      return new n(t, e);
    }, t.exports.Socket = n, t.exports.protocol = n.protocol, t.exports.Transport = r(8), t.exports.transports = r(6), t.exports.parser = r(2);
  }, function (t, e, r) {
    var n = r(6),
      s = r(1),
      o = r(0)("engine.io-client:socket"),
      i = r(2),
      a = r(4),
      c = r(10);
    var h = /*#__PURE__*/function (_s4) {
      "use strict";

      _inherits(h, _s4);
      var _super5 = _createSuper(h);
      function h(t) {
        var _this8;
        var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        _classCallCheck(this, h);
        _this8 = _super5.call(this), t && "object" == _typeof(t) && (e = t, t = null), t ? (t = a(t), e.hostname = t.host, e.secure = "https" === t.protocol || "wss" === t.protocol, e.port = t.port, t.query && (e.query = t.query)) : e.host && (e.hostname = a(e.host).host), _this8.secure = null != e.secure ? e.secure : "undefined" != typeof location && "https:" === location.protocol, e.hostname && !e.port && (e.port = _this8.secure ? "443" : "80"), _this8.hostname = e.hostname || ("undefined" != typeof location ? location.hostname : "localhost"), _this8.port = e.port || ("undefined" != typeof location && location.port ? location.port : _this8.secure ? 443 : 80), _this8.transports = e.transports || ["websocket"], _this8.readyState = "", _this8.writeBuffer = [], _this8.prevBufferLen = 0, _this8.opts = Object.assign({
          path: "/engine.io",
          agent: !1,
          withCredentials: !1,
          upgrade: !0,
          jsonp: !0,
          timestampParam: "t",
          rememberUpgrade: !1,
          rejectUnauthorized: !0,
          perMessageDeflate: {
            threshold: 1024
          },
          transportOptions: {}
        }, e), _this8.opts.path = _this8.opts.path.replace(/\/$/, "") + "/", "string" == typeof _this8.opts.query && (_this8.opts.query = c.decode(_this8.opts.query)), _this8.id = null, _this8.upgrades = null, _this8.pingInterval = null, _this8.pingTimeout = null, _this8.pingTimeoutTimer = null, "function" == typeof addEventListener && addEventListener("beforeunload", function () {
          _this8.transport && (_this8.transport.removeAllListeners(), _this8.transport.close());
        }, !1), _this8.open();
        return _this8;
      }
      _createClass(h, [{
        key: "createTransport",
        value: function createTransport(t) {
          o('creating transport "%s"', t);
          var e = function (t) {
            var e = {};
            for (var _r9 in t) {
              t.hasOwnProperty(_r9) && (e[_r9] = t[_r9]);
            }
            return e;
          }(this.opts.query);
          e.EIO = i.protocol, e.transport = t, this.id && (e.sid = this.id);
          var r = Object.assign({}, this.opts.transportOptions[t], this.opts, {
            query: e,
            socket: this,
            hostname: this.hostname,
            secure: this.secure,
            port: this.port
          });
          return o("options: %j", r), new n[t](r);
        }
      }, {
        key: "open",
        value: function open() {
          var t;
          if (this.opts.rememberUpgrade && h.priorWebsocketSuccess && -1 !== this.transports.indexOf("websocket")) t = "websocket";else {
            if (0 === this.transports.length) {
              var _t5 = this;
              return void setTimeout(function () {
                _t5.emit("error", "No transports available");
              }, 0);
            }
            t = this.transports[0];
          }
          this.readyState = "opening";
          try {
            t = this.createTransport(t);
          } catch (t) {
            return o("error while creating transport: %s", t), this.transports.shift(), void this.open();
          }
          t.open(), this.setTransport(t);
        }
      }, {
        key: "setTransport",
        value: function setTransport(t) {
          o("setting transport %s", t.name);
          var e = this;
          this.transport && (o("clearing existing transport %s", this.transport.name), this.transport.removeAllListeners()), this.transport = t, t.on("drain", function () {
            e.onDrain();
          }).on("packet", function (t) {
            e.onPacket(t);
          }).on("error", function (t) {
            e.onError(t);
          }).on("close", function () {
            e.onClose("transport close");
          });
        }
      }, {
        key: "probe",
        value: function probe(t) {
          o('probing transport "%s"', t);
          var e = this.createTransport(t, {
              probe: 1
            }),
            r = !1;
          var n = this;
          function s() {
            if (n.onlyBinaryUpgrades) {
              var _t6 = !this.supportsBinary && n.transport.supportsBinary;
              r = r || _t6;
            }
            r || (o('probe transport "%s" opened', t), e.send([{
              type: "ping",
              data: "probe"
            }]), e.once("packet", function (s) {
              if (!r) if ("pong" === s.type && "probe" === s.data) {
                if (o('probe transport "%s" pong', t), n.upgrading = !0, n.emit("upgrading", e), !e) return;
                h.priorWebsocketSuccess = "websocket" === e.name, o('pausing current transport "%s"', n.transport.name), n.transport.pause(function () {
                  r || "closed" !== n.readyState && (o("changing transport and sending upgrade packet"), p(), n.setTransport(e), e.send([{
                    type: "upgrade"
                  }]), n.emit("upgrade", e), e = null, n.upgrading = !1, n.flush());
                });
              } else {
                o('probe transport "%s" failed', t);
                var _r10 = new Error("probe error");
                _r10.transport = e.name, n.emit("upgradeError", _r10);
              }
            }));
          }
          function i() {
            r || (r = !0, p(), e.close(), e = null);
          }
          function a(r) {
            var s = new Error("probe error: " + r);
            s.transport = e.name, i(), o('probe transport "%s" failed because of error: %s', t, r), n.emit("upgradeError", s);
          }
          function c() {
            a("transport closed");
          }
          function u() {
            a("socket closed");
          }
          function f(t) {
            e && t.name !== e.name && (o('"%s" works - aborting "%s"', t.name, e.name), i());
          }
          function p() {
            e.removeListener("open", s), e.removeListener("error", a), e.removeListener("close", c), n.removeListener("close", u), n.removeListener("upgrading", f);
          }
          h.priorWebsocketSuccess = !1, e.once("open", s), e.once("error", a), e.once("close", c), this.once("close", u), this.once("upgrading", f), e.open();
        }
      }, {
        key: "onOpen",
        value: function onOpen() {
          if (o("socket open"), this.readyState = "open", h.priorWebsocketSuccess = "websocket" === this.transport.name, this.emit("open"), this.flush(), "open" === this.readyState && this.opts.upgrade && this.transport.pause) {
            o("starting upgrade probes");
            var _t7 = 0;
            var _e7 = this.upgrades.length;
            for (; _t7 < _e7; _t7++) {
              this.probe(this.upgrades[_t7]);
            }
          }
        }
      }, {
        key: "onPacket",
        value: function onPacket(t) {
          if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) switch (o('socket receive: type "%s", data "%s"', t.type, t.data), this.emit("packet", t), this.emit("heartbeat"), t.type) {
            case "open":
              this.onHandshake(JSON.parse(t.data));
              break;
            case "ping":
              this.resetPingTimeout(), this.sendPacket("pong"), this.emit("pong");
              break;
            case "error":
              var _e8 = new Error("server error");
              _e8.code = t.data, this.onError(_e8);
              break;
            case "message":
              this.emit("data", t.data), this.emit("message", t.data);
          } else o('packet received with socket readyState "%s"', this.readyState);
        }
      }, {
        key: "onHandshake",
        value: function onHandshake(t) {
          this.emit("handshake", t), this.id = t.sid, this.transport.query.sid = t.sid, this.upgrades = this.filterUpgrades(t.upgrades), this.pingInterval = t.pingInterval, this.pingTimeout = t.pingTimeout, this.onOpen(), "closed" !== this.readyState && this.resetPingTimeout();
        }
      }, {
        key: "resetPingTimeout",
        value: function resetPingTimeout() {
          var _this9 = this;
          clearTimeout(this.pingTimeoutTimer), this.pingTimeoutTimer = setTimeout(function () {
            _this9.onClose("ping timeout");
          }, this.pingInterval + this.pingTimeout);
        }
      }, {
        key: "onDrain",
        value: function onDrain() {
          this.writeBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, 0 === this.writeBuffer.length ? this.emit("drain") : this.flush();
        }
      }, {
        key: "flush",
        value: function flush() {
          "closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (o("flushing %d packets in socket", this.writeBuffer.length), this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, this.emit("flush"));
        }
      }, {
        key: "write",
        value: function write(t, e, r) {
          return this.sendPacket("message", t, e, r), this;
        }
      }, {
        key: "send",
        value: function send(t, e, r) {
          return this.sendPacket("message", t, e, r), this;
        }
      }, {
        key: "sendPacket",
        value: function sendPacket(t, e, r, n) {
          if ("function" == typeof e && (n = e, e = void 0), "function" == typeof r && (n = r, r = null), "closing" === this.readyState || "closed" === this.readyState) return;
          (r = r || {}).compress = !1 !== r.compress;
          var s = {
            type: t,
            data: e,
            options: r
          };
          this.emit("packetCreate", s), this.writeBuffer.push(s), n && this.once("flush", n), this.flush();
        }
      }, {
        key: "close",
        value: function close() {
          var t = this;
          function e() {
            t.onClose("forced close"), o("socket closing - telling transport to close"), t.transport.close();
          }
          function r() {
            t.removeListener("upgrade", r), t.removeListener("upgradeError", r), e();
          }
          function n() {
            t.once("upgrade", r), t.once("upgradeError", r);
          }
          return "opening" !== this.readyState && "open" !== this.readyState || (this.readyState = "closing", this.writeBuffer.length ? this.once("drain", function () {
            this.upgrading ? n() : e();
          }) : this.upgrading ? n() : e()), this;
        }
      }, {
        key: "onError",
        value: function onError(t) {
          o("socket error %j", t), h.priorWebsocketSuccess = !1, this.emit("error", t), this.onClose("transport error", t);
        }
      }, {
        key: "onClose",
        value: function onClose(t, e) {
          if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
            o('socket close with reason: "%s"', t);
            var _r11 = this;
            clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), this.readyState = "closed", this.id = null, this.emit("close", t, e), _r11.writeBuffer = [], _r11.prevBufferLen = 0;
          }
        }
      }, {
        key: "filterUpgrades",
        value: function filterUpgrades(t) {
          var e = [];
          var r = 0;
          var n = t.length;
          for (; r < n; r++) {
            ~this.transports.indexOf(t[r]) && e.push(t[r]);
          }
          return e;
        }
      }]);
      return h;
    }(s);
    h.priorWebsocketSuccess = !1, h.protocol = i.protocol, t.exports = h;
  }, function (t, e, r) {
    (function (e) {
      var n = r(8),
        s = r(2),
        o = r(10),
        i = r(27),
        _r12 = r(28),
        a = _r12.pick,
        _r13 = r(29),
        c = _r13.WebSocket,
        h = _r13.usingBrowserWebSocket,
        u = _r13.defaultBinaryType,
        f = r(0)("engine.io-client:websocket"),
        p = "undefined" != typeof navigator && "string" == typeof navigator.product && "reactnative" === navigator.product.toLowerCase();
      var l = /*#__PURE__*/function (_n7) {
        "use strict";

        _inherits(l, _n7);
        var _super6 = _createSuper(l);
        function l(t) {
          var _this10;
          _classCallCheck(this, l);
          _this10 = _super6.call(this, t), _this10.supportsBinary = !t.forceBase64;
          return _this10;
        }
        _createClass(l, [{
          key: "name",
          get: function get() {
            return "websocket";
          }
        }, {
          key: "doOpen",
          value: function doOpen() {
            if (!this.check()) return;
            var t = this.uri(),
              e = this.opts.protocols,
              r = p ? {} : a(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
            this.opts.extraHeaders && (r.headers = this.opts.extraHeaders);
            try {
              this.ws = h && !p ? e ? new c(t, e) : new c(t) : new c(t, e, r);
            } catch (t) {
              return this.emit("error", t);
            }
            this.ws.binaryType = this.socket.binaryType || u, this.addEventListeners();
          }
        }, {
          key: "addEventListeners",
          value: function addEventListeners() {
            var t = this;
            this.ws.onopen = function () {
              t.onOpen();
            }, this.ws.onclose = function () {
              t.onClose();
            }, this.ws.onmessage = function (e) {
              t.onData(e.data);
            }, this.ws.onerror = function (e) {
              t.onError("websocket error", e);
            };
          }
        }, {
          key: "write",
          value: function write(t) {
            var r = this;
            this.writable = !1;
            var n = t.length,
              o = 0;
            var i = n;
            for (; o < i; o++) {
              !function (t) {
                s.encodePacket(t, r.supportsBinary, function (s) {
                  var o = {};
                  if (!h && (t.options && (o.compress = t.options.compress), r.opts.perMessageDeflate)) {
                    ("string" == typeof s ? e.byteLength(s) : s.length) < r.opts.perMessageDeflate.threshold && (o.compress = !1);
                  }
                  try {
                    h ? r.ws.send(s) : r.ws.send(s, o);
                  } catch (t) {
                    f("websocket closed before onclose event");
                  }
                  --n || a();
                });
              }(t[o]);
            }
            function a() {
              r.emit("flush"), setTimeout(function () {
                r.writable = !0, r.emit("drain");
              }, 0);
            }
          }
        }, {
          key: "onClose",
          value: function onClose() {
            n.prototype.onClose.call(this);
          }
        }, {
          key: "doClose",
          value: function doClose() {
            void 0 !== this.ws && (this.ws.close(), this.ws = null);
          }
        }, {
          key: "uri",
          value: function uri() {
            var t = this.query || {};
            var e = this.opts.secure ? "wss" : "ws";
            var r = "";
            return this.opts.port && ("wss" === e && 443 !== Number(this.opts.port) || "ws" === e && 80 !== Number(this.opts.port)) && (r = ":" + this.opts.port), this.opts.timestampRequests && (t[this.opts.timestampParam] = i()), this.supportsBinary || (t.b64 = 1), t = o.encode(t), t.length && (t = "?" + t), e + "://" + (-1 !== this.opts.hostname.indexOf(":") ? "[" + this.opts.hostname + "]" : this.opts.hostname) + r + this.opts.path + t;
          }
        }, {
          key: "check",
          value: function check() {
            return !(!c || "__initialize" in c && this.name === l.prototype.name);
          }
        }]);
        return l;
      }(n);
      t.exports = l;
    }).call(this, r(20).Buffer);
  }, function (t, e, r) {
    "use strict";

    (function (t) {
      /*!
       * The buffer module from node.js, for the browser.
       *
       * @author   Feross Aboukhadijeh <http://feross.org>
       * @license  MIT
       */
      var n = r(21),
        s = r(22),
        o = r(23);
      function i() {
        return c.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
      }
      function a(t, e) {
        if (i() < e) throw new RangeError("Invalid typed array length");
        return c.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(e)).__proto__ = c.prototype : (null === t && (t = new c(e)), t.length = e), t;
      }
      function c(t, e, r) {
        if (!(c.TYPED_ARRAY_SUPPORT || this instanceof c)) return new c(t, e, r);
        if ("number" == typeof t) {
          if ("string" == typeof e) throw new Error("If encoding is specified then the first argument must be a string");
          return f(this, t);
        }
        return h(this, t, e, r);
      }
      function h(t, e, r, n) {
        if ("number" == typeof e) throw new TypeError('"value" argument must not be a number');
        return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ? function (t, e, r, n) {
          if (e.byteLength, r < 0 || e.byteLength < r) throw new RangeError("'offset' is out of bounds");
          if (e.byteLength < r + (n || 0)) throw new RangeError("'length' is out of bounds");
          e = void 0 === r && void 0 === n ? new Uint8Array(e) : void 0 === n ? new Uint8Array(e, r) : new Uint8Array(e, r, n);
          c.TYPED_ARRAY_SUPPORT ? (t = e).__proto__ = c.prototype : t = p(t, e);
          return t;
        }(t, e, r, n) : "string" == typeof e ? function (t, e, r) {
          "string" == typeof r && "" !== r || (r = "utf8");
          if (!c.isEncoding(r)) throw new TypeError('"encoding" must be a valid string encoding');
          var n = 0 | d(e, r),
            s = (t = a(t, n)).write(e, r);
          s !== n && (t = t.slice(0, s));
          return t;
        }(t, e, r) : function (t, e) {
          if (c.isBuffer(e)) {
            var r = 0 | l(e.length);
            return 0 === (t = a(t, r)).length || e.copy(t, 0, 0, r), t;
          }
          if (e) {
            if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length" in e) return "number" != typeof e.length || (n = e.length) != n ? a(t, 0) : p(t, e);
            if ("Buffer" === e.type && o(e.data)) return p(t, e.data);
          }
          var n;
          throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
        }(t, e);
      }
      function u(t) {
        if ("number" != typeof t) throw new TypeError('"size" argument must be a number');
        if (t < 0) throw new RangeError('"size" argument must not be negative');
      }
      function f(t, e) {
        if (u(e), t = a(t, e < 0 ? 0 : 0 | l(e)), !c.TYPED_ARRAY_SUPPORT) for (var r = 0; r < e; ++r) {
          t[r] = 0;
        }
        return t;
      }
      function p(t, e) {
        var r = e.length < 0 ? 0 : 0 | l(e.length);
        t = a(t, r);
        for (var n = 0; n < r; n += 1) {
          t[n] = 255 & e[n];
        }
        return t;
      }
      function l(t) {
        if (t >= i()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i().toString(16) + " bytes");
        return 0 | t;
      }
      function d(t, e) {
        if (c.isBuffer(t)) return t.length;
        if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return t.byteLength;
        "string" != typeof t && (t = "" + t);
        var r = t.length;
        if (0 === r) return 0;
        for (var n = !1;;) {
          switch (e) {
            case "ascii":
            case "latin1":
            case "binary":
              return r;
            case "utf8":
            case "utf-8":
            case void 0:
              return Y(t).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return 2 * r;
            case "hex":
              return r >>> 1;
            case "base64":
              return q(t).length;
            default:
              if (n) return Y(t).length;
              e = ("" + e).toLowerCase(), n = !0;
          }
        }
      }
      function y(t, e, r) {
        var n = !1;
        if ((void 0 === e || e < 0) && (e = 0), e > this.length) return "";
        if ((void 0 === r || r > this.length) && (r = this.length), r <= 0) return "";
        if ((r >>>= 0) <= (e >>>= 0)) return "";
        for (t || (t = "utf8");;) {
          switch (t) {
            case "hex":
              return P(this, e, r);
            case "utf8":
            case "utf-8":
              return S(this, e, r);
            case "ascii":
              return C(this, e, r);
            case "latin1":
            case "binary":
              return T(this, e, r);
            case "base64":
              return O(this, e, r);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return R(this, e, r);
            default:
              if (n) throw new TypeError("Unknown encoding: " + t);
              t = (t + "").toLowerCase(), n = !0;
          }
        }
      }
      function g(t, e, r) {
        var n = t[e];
        t[e] = t[r], t[r] = n;
      }
      function m(t, e, r, n, s) {
        if (0 === t.length) return -1;
        if ("string" == typeof r ? (n = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), r = +r, isNaN(r) && (r = s ? 0 : t.length - 1), r < 0 && (r = t.length + r), r >= t.length) {
          if (s) return -1;
          r = t.length - 1;
        } else if (r < 0) {
          if (!s) return -1;
          r = 0;
        }
        if ("string" == typeof e && (e = c.from(e, n)), c.isBuffer(e)) return 0 === e.length ? -1 : v(t, e, r, n, s);
        if ("number" == typeof e) return e &= 255, c.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? s ? Uint8Array.prototype.indexOf.call(t, e, r) : Uint8Array.prototype.lastIndexOf.call(t, e, r) : v(t, [e], r, n, s);
        throw new TypeError("val must be string, number or Buffer");
      }
      function v(t, e, r, n, s) {
        var o,
          i = 1,
          a = t.length,
          c = e.length;
        if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
          if (t.length < 2 || e.length < 2) return -1;
          i = 2, a /= 2, c /= 2, r /= 2;
        }
        function h(t, e) {
          return 1 === i ? t[e] : t.readUInt16BE(e * i);
        }
        if (s) {
          var u = -1;
          for (o = r; o < a; o++) {
            if (h(t, o) === h(e, -1 === u ? 0 : o - u)) {
              if (-1 === u && (u = o), o - u + 1 === c) return u * i;
            } else -1 !== u && (o -= o - u), u = -1;
          }
        } else for (r + c > a && (r = a - c), o = r; o >= 0; o--) {
          for (var f = !0, p = 0; p < c; p++) {
            if (h(t, o + p) !== h(e, p)) {
              f = !1;
              break;
            }
          }
          if (f) return o;
        }
        return -1;
      }
      function b(t, e, r, n) {
        r = Number(r) || 0;
        var s = t.length - r;
        n ? (n = Number(n)) > s && (n = s) : n = s;
        var o = e.length;
        if (o % 2 != 0) throw new TypeError("Invalid hex string");
        n > o / 2 && (n = o / 2);
        for (var i = 0; i < n; ++i) {
          var a = parseInt(e.substr(2 * i, 2), 16);
          if (isNaN(a)) return i;
          t[r + i] = a;
        }
        return i;
      }
      function w(t, e, r, n) {
        return F(Y(e, t.length - r), t, r, n);
      }
      function _(t, e, r, n) {
        return F(function (t) {
          for (var e = [], r = 0; r < t.length; ++r) {
            e.push(255 & t.charCodeAt(r));
          }
          return e;
        }(e), t, r, n);
      }
      function E(t, e, r, n) {
        return _(t, e, r, n);
      }
      function k(t, e, r, n) {
        return F(q(e), t, r, n);
      }
      function A(t, e, r, n) {
        return F(function (t, e) {
          for (var r, n, s, o = [], i = 0; i < t.length && !((e -= 2) < 0); ++i) {
            r = t.charCodeAt(i), n = r >> 8, s = r % 256, o.push(s), o.push(n);
          }
          return o;
        }(e, t.length - r), t, r, n);
      }
      function O(t, e, r) {
        return 0 === e && r === t.length ? n.fromByteArray(t) : n.fromByteArray(t.slice(e, r));
      }
      function S(t, e, r) {
        r = Math.min(t.length, r);
        for (var n = [], s = e; s < r;) {
          var o,
            i,
            a,
            c,
            h = t[s],
            u = null,
            f = h > 239 ? 4 : h > 223 ? 3 : h > 191 ? 2 : 1;
          if (s + f <= r) switch (f) {
            case 1:
              h < 128 && (u = h);
              break;
            case 2:
              128 == (192 & (o = t[s + 1])) && (c = (31 & h) << 6 | 63 & o) > 127 && (u = c);
              break;
            case 3:
              o = t[s + 1], i = t[s + 2], 128 == (192 & o) && 128 == (192 & i) && (c = (15 & h) << 12 | (63 & o) << 6 | 63 & i) > 2047 && (c < 55296 || c > 57343) && (u = c);
              break;
            case 4:
              o = t[s + 1], i = t[s + 2], a = t[s + 3], 128 == (192 & o) && 128 == (192 & i) && 128 == (192 & a) && (c = (15 & h) << 18 | (63 & o) << 12 | (63 & i) << 6 | 63 & a) > 65535 && c < 1114112 && (u = c);
          }
          null === u ? (u = 65533, f = 1) : u > 65535 && (u -= 65536, n.push(u >>> 10 & 1023 | 55296), u = 56320 | 1023 & u), n.push(u), s += f;
        }
        return function (t) {
          var e = t.length;
          if (e <= 4096) return String.fromCharCode.apply(String, t);
          var r = "",
            n = 0;
          for (; n < e;) {
            r += String.fromCharCode.apply(String, t.slice(n, n += 4096));
          }
          return r;
        }(n);
      }
      e.Buffer = c, e.SlowBuffer = function (t) {
        +t != t && (t = 0);
        return c.alloc(+t);
      }, e.INSPECT_MAX_BYTES = 50, c.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : function () {
        try {
          var t = new Uint8Array(1);
          return t.__proto__ = {
            __proto__: Uint8Array.prototype,
            foo: function foo() {
              return 42;
            }
          }, 42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength;
        } catch (t) {
          return !1;
        }
      }(), e.kMaxLength = i(), c.poolSize = 8192, c._augment = function (t) {
        return t.__proto__ = c.prototype, t;
      }, c.from = function (t, e, r) {
        return h(null, t, e, r);
      }, c.TYPED_ARRAY_SUPPORT && (c.prototype.__proto__ = Uint8Array.prototype, c.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && c[Symbol.species] === c && Object.defineProperty(c, Symbol.species, {
        value: null,
        configurable: !0
      })), c.alloc = function (t, e, r) {
        return function (t, e, r, n) {
          return u(e), e <= 0 ? a(t, e) : void 0 !== r ? "string" == typeof n ? a(t, e).fill(r, n) : a(t, e).fill(r) : a(t, e);
        }(null, t, e, r);
      }, c.allocUnsafe = function (t) {
        return f(null, t);
      }, c.allocUnsafeSlow = function (t) {
        return f(null, t);
      }, c.isBuffer = function (t) {
        return !(null == t || !t._isBuffer);
      }, c.compare = function (t, e) {
        if (!c.isBuffer(t) || !c.isBuffer(e)) throw new TypeError("Arguments must be Buffers");
        if (t === e) return 0;
        for (var r = t.length, n = e.length, s = 0, o = Math.min(r, n); s < o; ++s) {
          if (t[s] !== e[s]) {
            r = t[s], n = e[s];
            break;
          }
        }
        return r < n ? -1 : n < r ? 1 : 0;
      }, c.isEncoding = function (t) {
        switch (String(t).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return !0;
          default:
            return !1;
        }
      }, c.concat = function (t, e) {
        if (!o(t)) throw new TypeError('"list" argument must be an Array of Buffers');
        if (0 === t.length) return c.alloc(0);
        var r;
        if (void 0 === e) for (e = 0, r = 0; r < t.length; ++r) {
          e += t[r].length;
        }
        var n = c.allocUnsafe(e),
          s = 0;
        for (r = 0; r < t.length; ++r) {
          var i = t[r];
          if (!c.isBuffer(i)) throw new TypeError('"list" argument must be an Array of Buffers');
          i.copy(n, s), s += i.length;
        }
        return n;
      }, c.byteLength = d, c.prototype._isBuffer = !0, c.prototype.swap16 = function () {
        var t = this.length;
        if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
        for (var e = 0; e < t; e += 2) {
          g(this, e, e + 1);
        }
        return this;
      }, c.prototype.swap32 = function () {
        var t = this.length;
        if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
        for (var e = 0; e < t; e += 4) {
          g(this, e, e + 3), g(this, e + 1, e + 2);
        }
        return this;
      }, c.prototype.swap64 = function () {
        var t = this.length;
        if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
        for (var e = 0; e < t; e += 8) {
          g(this, e, e + 7), g(this, e + 1, e + 6), g(this, e + 2, e + 5), g(this, e + 3, e + 4);
        }
        return this;
      }, c.prototype.toString = function () {
        var t = 0 | this.length;
        return 0 === t ? "" : 0 === arguments.length ? S(this, 0, t) : y.apply(this, arguments);
      }, c.prototype.equals = function (t) {
        if (!c.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
        return this === t || 0 === c.compare(this, t);
      }, c.prototype.inspect = function () {
        var t = "",
          r = e.INSPECT_MAX_BYTES;
        return this.length > 0 && (t = this.toString("hex", 0, r).match(/.{2}/g).join(" "), this.length > r && (t += " ... ")), "<Buffer " + t + ">";
      }, c.prototype.compare = function (t, e, r, n, s) {
        if (!c.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
        if (void 0 === e && (e = 0), void 0 === r && (r = t ? t.length : 0), void 0 === n && (n = 0), void 0 === s && (s = this.length), e < 0 || r > t.length || n < 0 || s > this.length) throw new RangeError("out of range index");
        if (n >= s && e >= r) return 0;
        if (n >= s) return -1;
        if (e >= r) return 1;
        if (this === t) return 0;
        for (var o = (s >>>= 0) - (n >>>= 0), i = (r >>>= 0) - (e >>>= 0), a = Math.min(o, i), h = this.slice(n, s), u = t.slice(e, r), f = 0; f < a; ++f) {
          if (h[f] !== u[f]) {
            o = h[f], i = u[f];
            break;
          }
        }
        return o < i ? -1 : i < o ? 1 : 0;
      }, c.prototype.includes = function (t, e, r) {
        return -1 !== this.indexOf(t, e, r);
      }, c.prototype.indexOf = function (t, e, r) {
        return m(this, t, e, r, !0);
      }, c.prototype.lastIndexOf = function (t, e, r) {
        return m(this, t, e, r, !1);
      }, c.prototype.write = function (t, e, r, n) {
        if (void 0 === e) n = "utf8", r = this.length, e = 0;else if (void 0 === r && "string" == typeof e) n = e, r = this.length, e = 0;else {
          if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
          e |= 0, isFinite(r) ? (r |= 0, void 0 === n && (n = "utf8")) : (n = r, r = void 0);
        }
        var s = this.length - e;
        if ((void 0 === r || r > s) && (r = s), t.length > 0 && (r < 0 || e < 0) || e > this.length) throw new RangeError("Attempt to write outside buffer bounds");
        n || (n = "utf8");
        for (var o = !1;;) {
          switch (n) {
            case "hex":
              return b(this, t, e, r);
            case "utf8":
            case "utf-8":
              return w(this, t, e, r);
            case "ascii":
              return _(this, t, e, r);
            case "latin1":
            case "binary":
              return E(this, t, e, r);
            case "base64":
              return k(this, t, e, r);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return A(this, t, e, r);
            default:
              if (o) throw new TypeError("Unknown encoding: " + n);
              n = ("" + n).toLowerCase(), o = !0;
          }
        }
      }, c.prototype.toJSON = function () {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      function C(t, e, r) {
        var n = "";
        r = Math.min(t.length, r);
        for (var s = e; s < r; ++s) {
          n += String.fromCharCode(127 & t[s]);
        }
        return n;
      }
      function T(t, e, r) {
        var n = "";
        r = Math.min(t.length, r);
        for (var s = e; s < r; ++s) {
          n += String.fromCharCode(t[s]);
        }
        return n;
      }
      function P(t, e, r) {
        var n = t.length;
        (!e || e < 0) && (e = 0), (!r || r < 0 || r > n) && (r = n);
        for (var s = "", o = e; o < r; ++o) {
          s += D(t[o]);
        }
        return s;
      }
      function R(t, e, r) {
        for (var n = t.slice(e, r), s = "", o = 0; o < n.length; o += 2) {
          s += String.fromCharCode(n[o] + 256 * n[o + 1]);
        }
        return s;
      }
      function x(t, e, r) {
        if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
        if (t + e > r) throw new RangeError("Trying to access beyond buffer length");
      }
      function B(t, e, r, n, s, o) {
        if (!c.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (e > s || e < o) throw new RangeError('"value" argument is out of bounds');
        if (r + n > t.length) throw new RangeError("Index out of range");
      }
      function N(t, e, r, n) {
        e < 0 && (e = 65535 + e + 1);
        for (var s = 0, o = Math.min(t.length - r, 2); s < o; ++s) {
          t[r + s] = (e & 255 << 8 * (n ? s : 1 - s)) >>> 8 * (n ? s : 1 - s);
        }
      }
      function L(t, e, r, n) {
        e < 0 && (e = 4294967295 + e + 1);
        for (var s = 0, o = Math.min(t.length - r, 4); s < o; ++s) {
          t[r + s] = e >>> 8 * (n ? s : 3 - s) & 255;
        }
      }
      function j(t, e, r, n, s, o) {
        if (r + n > t.length) throw new RangeError("Index out of range");
        if (r < 0) throw new RangeError("Index out of range");
      }
      function I(t, e, r, n, o) {
        return o || j(t, 0, r, 4), s.write(t, e, r, n, 23, 4), r + 4;
      }
      function U(t, e, r, n, o) {
        return o || j(t, 0, r, 8), s.write(t, e, r, n, 52, 8), r + 8;
      }
      c.prototype.slice = function (t, e) {
        var r,
          n = this.length;
        if ((t = ~~t) < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n), (e = void 0 === e ? n : ~~e) < 0 ? (e += n) < 0 && (e = 0) : e > n && (e = n), e < t && (e = t), c.TYPED_ARRAY_SUPPORT) (r = this.subarray(t, e)).__proto__ = c.prototype;else {
          var s = e - t;
          r = new c(s, void 0);
          for (var o = 0; o < s; ++o) {
            r[o] = this[o + t];
          }
        }
        return r;
      }, c.prototype.readUIntLE = function (t, e, r) {
        t |= 0, e |= 0, r || x(t, e, this.length);
        for (var n = this[t], s = 1, o = 0; ++o < e && (s *= 256);) {
          n += this[t + o] * s;
        }
        return n;
      }, c.prototype.readUIntBE = function (t, e, r) {
        t |= 0, e |= 0, r || x(t, e, this.length);
        for (var n = this[t + --e], s = 1; e > 0 && (s *= 256);) {
          n += this[t + --e] * s;
        }
        return n;
      }, c.prototype.readUInt8 = function (t, e) {
        return e || x(t, 1, this.length), this[t];
      }, c.prototype.readUInt16LE = function (t, e) {
        return e || x(t, 2, this.length), this[t] | this[t + 1] << 8;
      }, c.prototype.readUInt16BE = function (t, e) {
        return e || x(t, 2, this.length), this[t] << 8 | this[t + 1];
      }, c.prototype.readUInt32LE = function (t, e) {
        return e || x(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3];
      }, c.prototype.readUInt32BE = function (t, e) {
        return e || x(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]);
      }, c.prototype.readIntLE = function (t, e, r) {
        t |= 0, e |= 0, r || x(t, e, this.length);
        for (var n = this[t], s = 1, o = 0; ++o < e && (s *= 256);) {
          n += this[t + o] * s;
        }
        return n >= (s *= 128) && (n -= Math.pow(2, 8 * e)), n;
      }, c.prototype.readIntBE = function (t, e, r) {
        t |= 0, e |= 0, r || x(t, e, this.length);
        for (var n = e, s = 1, o = this[t + --n]; n > 0 && (s *= 256);) {
          o += this[t + --n] * s;
        }
        return o >= (s *= 128) && (o -= Math.pow(2, 8 * e)), o;
      }, c.prototype.readInt8 = function (t, e) {
        return e || x(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t];
      }, c.prototype.readInt16LE = function (t, e) {
        e || x(t, 2, this.length);
        var r = this[t] | this[t + 1] << 8;
        return 32768 & r ? 4294901760 | r : r;
      }, c.prototype.readInt16BE = function (t, e) {
        e || x(t, 2, this.length);
        var r = this[t + 1] | this[t] << 8;
        return 32768 & r ? 4294901760 | r : r;
      }, c.prototype.readInt32LE = function (t, e) {
        return e || x(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24;
      }, c.prototype.readInt32BE = function (t, e) {
        return e || x(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3];
      }, c.prototype.readFloatLE = function (t, e) {
        return e || x(t, 4, this.length), s.read(this, t, !0, 23, 4);
      }, c.prototype.readFloatBE = function (t, e) {
        return e || x(t, 4, this.length), s.read(this, t, !1, 23, 4);
      }, c.prototype.readDoubleLE = function (t, e) {
        return e || x(t, 8, this.length), s.read(this, t, !0, 52, 8);
      }, c.prototype.readDoubleBE = function (t, e) {
        return e || x(t, 8, this.length), s.read(this, t, !1, 52, 8);
      }, c.prototype.writeUIntLE = function (t, e, r, n) {
        (t = +t, e |= 0, r |= 0, n) || B(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
        var s = 1,
          o = 0;
        for (this[e] = 255 & t; ++o < r && (s *= 256);) {
          this[e + o] = t / s & 255;
        }
        return e + r;
      }, c.prototype.writeUIntBE = function (t, e, r, n) {
        (t = +t, e |= 0, r |= 0, n) || B(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
        var s = r - 1,
          o = 1;
        for (this[e + s] = 255 & t; --s >= 0 && (o *= 256);) {
          this[e + s] = t / o & 255;
        }
        return e + r;
      }, c.prototype.writeUInt8 = function (t, e, r) {
        return t = +t, e |= 0, r || B(this, t, e, 1, 255, 0), c.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), this[e] = 255 & t, e + 1;
      }, c.prototype.writeUInt16LE = function (t, e, r) {
        return t = +t, e |= 0, r || B(this, t, e, 2, 65535, 0), c.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : N(this, t, e, !0), e + 2;
      }, c.prototype.writeUInt16BE = function (t, e, r) {
        return t = +t, e |= 0, r || B(this, t, e, 2, 65535, 0), c.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : N(this, t, e, !1), e + 2;
      }, c.prototype.writeUInt32LE = function (t, e, r) {
        return t = +t, e |= 0, r || B(this, t, e, 4, 4294967295, 0), c.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t) : L(this, t, e, !0), e + 4;
      }, c.prototype.writeUInt32BE = function (t, e, r) {
        return t = +t, e |= 0, r || B(this, t, e, 4, 4294967295, 0), c.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : L(this, t, e, !1), e + 4;
      }, c.prototype.writeIntLE = function (t, e, r, n) {
        if (t = +t, e |= 0, !n) {
          var s = Math.pow(2, 8 * r - 1);
          B(this, t, e, r, s - 1, -s);
        }
        var o = 0,
          i = 1,
          a = 0;
        for (this[e] = 255 & t; ++o < r && (i *= 256);) {
          t < 0 && 0 === a && 0 !== this[e + o - 1] && (a = 1), this[e + o] = (t / i >> 0) - a & 255;
        }
        return e + r;
      }, c.prototype.writeIntBE = function (t, e, r, n) {
        if (t = +t, e |= 0, !n) {
          var s = Math.pow(2, 8 * r - 1);
          B(this, t, e, r, s - 1, -s);
        }
        var o = r - 1,
          i = 1,
          a = 0;
        for (this[e + o] = 255 & t; --o >= 0 && (i *= 256);) {
          t < 0 && 0 === a && 0 !== this[e + o + 1] && (a = 1), this[e + o] = (t / i >> 0) - a & 255;
        }
        return e + r;
      }, c.prototype.writeInt8 = function (t, e, r) {
        return t = +t, e |= 0, r || B(this, t, e, 1, 127, -128), c.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1;
      }, c.prototype.writeInt16LE = function (t, e, r) {
        return t = +t, e |= 0, r || B(this, t, e, 2, 32767, -32768), c.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : N(this, t, e, !0), e + 2;
      }, c.prototype.writeInt16BE = function (t, e, r) {
        return t = +t, e |= 0, r || B(this, t, e, 2, 32767, -32768), c.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : N(this, t, e, !1), e + 2;
      }, c.prototype.writeInt32LE = function (t, e, r) {
        return t = +t, e |= 0, r || B(this, t, e, 4, 2147483647, -2147483648), c.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24) : L(this, t, e, !0), e + 4;
      }, c.prototype.writeInt32BE = function (t, e, r) {
        return t = +t, e |= 0, r || B(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), c.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : L(this, t, e, !1), e + 4;
      }, c.prototype.writeFloatLE = function (t, e, r) {
        return I(this, t, e, !0, r);
      }, c.prototype.writeFloatBE = function (t, e, r) {
        return I(this, t, e, !1, r);
      }, c.prototype.writeDoubleLE = function (t, e, r) {
        return U(this, t, e, !0, r);
      }, c.prototype.writeDoubleBE = function (t, e, r) {
        return U(this, t, e, !1, r);
      }, c.prototype.copy = function (t, e, r, n) {
        if (r || (r = 0), n || 0 === n || (n = this.length), e >= t.length && (e = t.length), e || (e = 0), n > 0 && n < r && (n = r), n === r) return 0;
        if (0 === t.length || 0 === this.length) return 0;
        if (e < 0) throw new RangeError("targetStart out of bounds");
        if (r < 0 || r >= this.length) throw new RangeError("sourceStart out of bounds");
        if (n < 0) throw new RangeError("sourceEnd out of bounds");
        n > this.length && (n = this.length), t.length - e < n - r && (n = t.length - e + r);
        var s,
          o = n - r;
        if (this === t && r < e && e < n) for (s = o - 1; s >= 0; --s) {
          t[s + e] = this[s + r];
        } else if (o < 1e3 || !c.TYPED_ARRAY_SUPPORT) for (s = 0; s < o; ++s) {
          t[s + e] = this[s + r];
        } else Uint8Array.prototype.set.call(t, this.subarray(r, r + o), e);
        return o;
      }, c.prototype.fill = function (t, e, r, n) {
        if ("string" == typeof t) {
          if ("string" == typeof e ? (n = e, e = 0, r = this.length) : "string" == typeof r && (n = r, r = this.length), 1 === t.length) {
            var s = t.charCodeAt(0);
            s < 256 && (t = s);
          }
          if (void 0 !== n && "string" != typeof n) throw new TypeError("encoding must be a string");
          if ("string" == typeof n && !c.isEncoding(n)) throw new TypeError("Unknown encoding: " + n);
        } else "number" == typeof t && (t &= 255);
        if (e < 0 || this.length < e || this.length < r) throw new RangeError("Out of range index");
        if (r <= e) return this;
        var o;
        if (e >>>= 0, r = void 0 === r ? this.length : r >>> 0, t || (t = 0), "number" == typeof t) for (o = e; o < r; ++o) {
          this[o] = t;
        } else {
          var i = c.isBuffer(t) ? t : Y(new c(t, n).toString()),
            a = i.length;
          for (o = 0; o < r - e; ++o) {
            this[o + e] = i[o % a];
          }
        }
        return this;
      };
      var M = /[^+\/0-9A-Za-z-_]/g;
      function D(t) {
        return t < 16 ? "0" + t.toString(16) : t.toString(16);
      }
      function Y(t, e) {
        var r;
        e = e || 1 / 0;
        for (var n = t.length, s = null, o = [], i = 0; i < n; ++i) {
          if ((r = t.charCodeAt(i)) > 55295 && r < 57344) {
            if (!s) {
              if (r > 56319) {
                (e -= 3) > -1 && o.push(239, 191, 189);
                continue;
              }
              if (i + 1 === n) {
                (e -= 3) > -1 && o.push(239, 191, 189);
                continue;
              }
              s = r;
              continue;
            }
            if (r < 56320) {
              (e -= 3) > -1 && o.push(239, 191, 189), s = r;
              continue;
            }
            r = 65536 + (s - 55296 << 10 | r - 56320);
          } else s && (e -= 3) > -1 && o.push(239, 191, 189);
          if (s = null, r < 128) {
            if ((e -= 1) < 0) break;
            o.push(r);
          } else if (r < 2048) {
            if ((e -= 2) < 0) break;
            o.push(r >> 6 | 192, 63 & r | 128);
          } else if (r < 65536) {
            if ((e -= 3) < 0) break;
            o.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128);
          } else {
            if (!(r < 1114112)) throw new Error("Invalid code point");
            if ((e -= 4) < 0) break;
            o.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128);
          }
        }
        return o;
      }
      function q(t) {
        return n.toByteArray(function (t) {
          if ((t = function (t) {
            return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
          }(t).replace(M, "")).length < 2) return "";
          for (; t.length % 4 != 0;) {
            t += "=";
          }
          return t;
        }(t));
      }
      function F(t, e, r, n) {
        for (var s = 0; s < n && !(s + r >= e.length || s >= t.length); ++s) {
          e[s + r] = t[s];
        }
        return s;
      }
    }).call(this, r(7));
  }, function (t, e, r) {
    "use strict";

    e.byteLength = function (t) {
      var e = h(t),
        r = e[0],
        n = e[1];
      return 3 * (r + n) / 4 - n;
    }, e.toByteArray = function (t) {
      var e,
        r,
        n = h(t),
        i = n[0],
        a = n[1],
        c = new o(function (t, e, r) {
          return 3 * (e + r) / 4 - r;
        }(0, i, a)),
        u = 0,
        f = a > 0 ? i - 4 : i;
      for (r = 0; r < f; r += 4) {
        e = s[t.charCodeAt(r)] << 18 | s[t.charCodeAt(r + 1)] << 12 | s[t.charCodeAt(r + 2)] << 6 | s[t.charCodeAt(r + 3)], c[u++] = e >> 16 & 255, c[u++] = e >> 8 & 255, c[u++] = 255 & e;
      }
      2 === a && (e = s[t.charCodeAt(r)] << 2 | s[t.charCodeAt(r + 1)] >> 4, c[u++] = 255 & e);
      1 === a && (e = s[t.charCodeAt(r)] << 10 | s[t.charCodeAt(r + 1)] << 4 | s[t.charCodeAt(r + 2)] >> 2, c[u++] = e >> 8 & 255, c[u++] = 255 & e);
      return c;
    }, e.fromByteArray = function (t) {
      for (var e, r = t.length, s = r % 3, o = [], i = 0, a = r - s; i < a; i += 16383) {
        o.push(u(t, i, i + 16383 > a ? a : i + 16383));
      }
      1 === s ? (e = t[r - 1], o.push(n[e >> 2] + n[e << 4 & 63] + "==")) : 2 === s && (e = (t[r - 2] << 8) + t[r - 1], o.push(n[e >> 10] + n[e >> 4 & 63] + n[e << 2 & 63] + "="));
      return o.join("");
    };
    for (var n = [], s = [], o = "undefined" != typeof Uint8Array ? Uint8Array : Array, i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = 0, c = i.length; a < c; ++a) {
      n[a] = i[a], s[i.charCodeAt(a)] = a;
    }
    function h(t) {
      var e = t.length;
      if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
      var r = t.indexOf("=");
      return -1 === r && (r = e), [r, r === e ? 0 : 4 - r % 4];
    }
    function u(t, e, r) {
      for (var s, o, i = [], a = e; a < r; a += 3) {
        s = (t[a] << 16 & 16711680) + (t[a + 1] << 8 & 65280) + (255 & t[a + 2]), i.push(n[(o = s) >> 18 & 63] + n[o >> 12 & 63] + n[o >> 6 & 63] + n[63 & o]);
      }
      return i.join("");
    }
    s["-".charCodeAt(0)] = 62, s["_".charCodeAt(0)] = 63;
  }, function (t, e) {
    e.read = function (t, e, r, n, s) {
      var o,
        i,
        a = 8 * s - n - 1,
        c = (1 << a) - 1,
        h = c >> 1,
        u = -7,
        f = r ? s - 1 : 0,
        p = r ? -1 : 1,
        l = t[e + f];
      for (f += p, o = l & (1 << -u) - 1, l >>= -u, u += a; u > 0; o = 256 * o + t[e + f], f += p, u -= 8) {
        ;
      }
      for (i = o & (1 << -u) - 1, o >>= -u, u += n; u > 0; i = 256 * i + t[e + f], f += p, u -= 8) {
        ;
      }
      if (0 === o) o = 1 - h;else {
        if (o === c) return i ? NaN : 1 / 0 * (l ? -1 : 1);
        i += Math.pow(2, n), o -= h;
      }
      return (l ? -1 : 1) * i * Math.pow(2, o - n);
    }, e.write = function (t, e, r, n, s, o) {
      var i,
        a,
        c,
        h = 8 * o - s - 1,
        u = (1 << h) - 1,
        f = u >> 1,
        p = 23 === s ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
        l = n ? 0 : o - 1,
        d = n ? 1 : -1,
        y = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
      for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (a = isNaN(e) ? 1 : 0, i = u) : (i = Math.floor(Math.log(e) / Math.LN2), e * (c = Math.pow(2, -i)) < 1 && (i--, c *= 2), (e += i + f >= 1 ? p / c : p * Math.pow(2, 1 - f)) * c >= 2 && (i++, c /= 2), i + f >= u ? (a = 0, i = u) : i + f >= 1 ? (a = (e * c - 1) * Math.pow(2, s), i += f) : (a = e * Math.pow(2, f - 1) * Math.pow(2, s), i = 0)); s >= 8; t[r + l] = 255 & a, l += d, a /= 256, s -= 8) {
        ;
      }
      for (i = i << s | a, h += s; h > 0; t[r + l] = 255 & i, l += d, i /= 256, h -= 8) {
        ;
      }
      t[r + l - d] |= 128 * y;
    };
  }, function (t, e) {
    var r = {}.toString;
    t.exports = Array.isArray || function (t) {
      return "[object Array]" == r.call(t);
    };
  }, function (t, e, r) {
    var _r14 = r(9),
      n = _r14.PACKET_TYPES,
      s = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === Object.prototype.toString.call(Blob),
      o = "function" == typeof ArrayBuffer,
      i = function i(t, e) {
        var r = new FileReader();
        return r.onload = function () {
          var t = r.result.split(",")[1];
          e("b" + t);
        }, r.readAsDataURL(t);
      };
    t.exports = function (_ref, r, a) {
      var t = _ref.type,
        e = _ref.data;
      return s && e instanceof Blob ? r ? a(e) : i(e, a) : o && (e instanceof ArrayBuffer || (c = e, "function" == typeof ArrayBuffer.isView ? ArrayBuffer.isView(c) : c && c.buffer instanceof ArrayBuffer)) ? r ? a(e) : i(new Blob([e]), a) : a(n[t] + (e || ""));
      var c;
    };
  }, function (t, e, r) {
    var _r15 = r(9),
      n = _r15.PACKET_TYPES_REVERSE,
      s = _r15.ERROR_PACKET;
    var o;
    "function" == typeof ArrayBuffer && (o = r(26));
    var i = function i(t, e) {
        if (o) {
          var _r16 = o.decode(t);
          return a(_r16, e);
        }
        return {
          base64: !0,
          data: t
        };
      },
      a = function a(t, e) {
        switch (e) {
          case "blob":
            return t instanceof ArrayBuffer ? new Blob([t]) : t;
          case "arraybuffer":
          default:
            return t;
        }
      };
    t.exports = function (t, e) {
      if ("string" != typeof t) return {
        type: "message",
        data: a(t, e)
      };
      var r = t.charAt(0);
      return "b" === r ? {
        type: "message",
        data: i(t.substring(1), e)
      } : n[r] ? t.length > 1 ? {
        type: n[r],
        data: t.substring(1)
      } : {
        type: n[r]
      } : s;
    };
  }, function (t, e) {
    !function (t) {
      "use strict";

      e.encode = function (e) {
        var r,
          n = new Uint8Array(e),
          s = n.length,
          o = "";
        for (r = 0; r < s; r += 3) {
          o += t[n[r] >> 2], o += t[(3 & n[r]) << 4 | n[r + 1] >> 4], o += t[(15 & n[r + 1]) << 2 | n[r + 2] >> 6], o += t[63 & n[r + 2]];
        }
        return s % 3 == 2 ? o = o.substring(0, o.length - 1) + "=" : s % 3 == 1 && (o = o.substring(0, o.length - 2) + "=="), o;
      }, e.decode = function (e) {
        var r,
          n,
          s,
          o,
          i,
          a = .75 * e.length,
          c = e.length,
          h = 0;
        "=" === e[e.length - 1] && (a--, "=" === e[e.length - 2] && a--);
        var u = new ArrayBuffer(a),
          f = new Uint8Array(u);
        for (r = 0; r < c; r += 4) {
          n = t.indexOf(e[r]), s = t.indexOf(e[r + 1]), o = t.indexOf(e[r + 2]), i = t.indexOf(e[r + 3]), f[h++] = n << 2 | s >> 4, f[h++] = (15 & s) << 4 | o >> 2, f[h++] = (3 & o) << 6 | 63 & i;
        }
        return u;
      };
    }("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");
  }, function (t, e, r) {
    "use strict";

    var n,
      s = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),
      o = {},
      i = 0,
      a = 0;
    function c(t) {
      var e = "";
      do {
        e = s[t % 64] + e, t = Math.floor(t / 64);
      } while (t > 0);
      return e;
    }
    function h() {
      var t = c(+new Date());
      return t !== n ? (i = 0, n = t) : t + "." + c(i++);
    }
    for (; a < 64; a++) {
      o[s[a]] = a;
    }
    h.encode = c, h.decode = function (t) {
      var e = 0;
      for (a = 0; a < t.length; a++) {
        e = 64 * e + o[t.charAt(a)];
      }
      return e;
    }, t.exports = h;
  }, function (t, e) {
    t.exports.pick = function (t) {
      for (var _len4 = arguments.length, e = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        e[_key4 - 1] = arguments[_key4];
      }
      return e.reduce(function (e, r) {
        return t.hasOwnProperty(r) && (e[r] = t[r]), e;
      }, {});
    };
  }, function (t, e, r) {
    t.exports = {
      WebSocket: r(30),
      usingBrowserWebSocket: !1,
      defaultBinaryType: "nodebuffer"
    };
  }, function (t, e, r) {
    var n = r(31),
      _r17 = r(32),
      s = _r17.URL,
      _r18 = r(39),
      o = _r18.addEventListener,
      i = _r18.removeEventListener,
      a = r(40),
      c = r(0)("wx-ws:wx-ws"),
      h = ["nodebuffer", "arraybuffer"],
      u = ["CONNECTING", "OPEN", "CLOSING", "CLOSED"];
    var f = /*#__PURE__*/function (_n8) {
      "use strict";

      _inherits(f, _n8);
      var _super7 = _createSuper(f);
      function f(t, e, r) {
        var _this11;
        _classCallCheck(this, f);
        _this11 = _super7.call(this), c("constructor: ", t, e, r), _this11.readyState = f.CONNECTING, _this11.protocol = "", _this11._closeCode = 1006, _this11._closeMessage = "", _this11._binaryType = h[0], _this11._socket = null, _this11.supports = {
          binary: !0
        }, null !== t && (_this11._bufferedAmount = 0, _this11._redirects = 0, "object" == _typeof(e) && null !== e && (r = e, e = void 0), function (t, e, r, n) {
          var s = _objectSpread({
            maxPayload: 104857600,
            perMessageDeflate: !0
          }, n);
          c("initAsClient: opts: ", s), t.url = e;
          var o = function (t, e) {
            c("start create conn: ", t);
            var r = wx.connectSocket(t);
            if (r) return r;
            return {
              onClose: wx.onSocketClose,
              onOpen: wx.onSocketOpen,
              onError: wx.onSocketError,
              onMessage: wx.onSocketMessage,
              send: wx.sendSocketMessage,
              close: wx.closeSocket
            };
          }({
            url: t.url,
            header: s.headers,
            protocols: r,
            perMessageDeflate: !!s.perMessageDeflate,
            tcpNoDelay: !!s.tcpNoDelay
          });
          t.setSocket(o);
        }(_assertThisInitialized(_this11), t, e, r));
        return _this11;
      }
      _createClass(f, [{
        key: "CONNECTING",
        get: function get() {
          return f.CONNECTING;
        }
      }, {
        key: "CLOSING",
        get: function get() {
          return f.CLOSING;
        }
      }, {
        key: "CLOSED",
        get: function get() {
          return f.CLOSED;
        }
      }, {
        key: "OPEN",
        get: function get() {
          return f.OPEN;
        }
      }, {
        key: "bufferedAmount",
        get: function get() {
          return this._socket ? (this._socket.bufferSize || 0) + this._sender._bufferedBytes : this._bufferedAmount;
        }
      }, {
        key: "binaryType",
        get: function get() {
          return this._binaryType;
        },
        set: function set(t) {
          c("set binaryType: ", t), h.includes(t) && (this._binaryType = t);
        }
      }, {
        key: "setSocket",
        value: function setSocket(t, e) {
          var _this12 = this;
          this._socket = t, this._sender = new a(t), c("set socket: socket =", t, ", head =", e, ", this: ", this), this._socket.onOpen(function (t) {
            c("socket onopen: ", t), _this12.readyState = f.OPEN, _this12.emit("open", t);
          }), this._socket.onClose(function (t) {
            c("socket onclose: ", t), _this12._closeCode = t.code, _this12._closeMessage = t.reason, _this12.emitClose();
          }), this._socket.onError(function (t) {
            c("socket onerror: ", t), _this12.emit("error", t);
          }), this._socket.onMessage(function (t) {
            c("socket onmessage: ", t, _this12), _this12.emit("message", t.data);
          });
        }
      }, {
        key: "emitClose",
        value: function emitClose() {
          this.readyState = f.CLOSED, this.removeEventListener(), this.emit("close", this._closeCode, this._closeMessage);
        }
      }, {
        key: "send",
        value: function send(t, e, r) {
          if (c("socket send msg: ", t, this.readyState, ", sender: ", this._sender), this.readyState === f.CONNECTING) throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
          if ("number" == typeof t && (t = t.toString()), this.readyState === f.OPEN) this._sender.send(t, e, r);else if (r) {
            r(new Error("WebSocket is not open: readyState ".concat(this.readyState, " ") + "(".concat(u[this.readyState], ")")));
          }
        }
      }, {
        key: "close",
        value: function close(t, e) {
          var _this13 = this;
          if (c("closing connection: ", this.readyState), this.readyState !== f.CLOSED) {
            if (this.readyState === f.CONNECTING) {
              throw new Error("WebSocket was closed before the connection was established");
            }
            this.readyState !== f.CLOSING && (this.readyState = f.CLOSING, this._socket.close({
              code: t,
              reason: e,
              success: function success() {
                c("connection closed..."), _this13.readyState = f.CLOSED, _this13._socket = null;
              }
            }));
          }
        }
      }]);
      return f;
    }(n);
    u.forEach(function (t, e) {
      f[t] = e;
    }), ["open", "error", "close", "message"].forEach(function (t) {
      Object.defineProperty(f.prototype, "on".concat(t), {
        get: function get() {
          var e = this.listeners(t);
          for (var _t8 = 0; _t8 < e.length; _t8++) {
            if (e[_t8]._listener) return e[_t8]._listener;
          }
        },
        set: function set(e) {
          var r = this.listeners(t);
          for (var _e9 = 0; _e9 < r.length; _e9++) {
            r[_e9]._listener && this.removeListener(t, r[_e9]);
          }
          this.addEventListener(t, e);
        }
      });
    }), f.prototype.addEventListener = o, f.prototype.removeEventListener = i, t.exports = f;
  }, function (t, e, r) {
    "use strict";

    var n,
      s = "object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) ? Reflect : null,
      o = s && "function" == typeof s.apply ? s.apply : function (t, e, r) {
        return Function.prototype.apply.call(t, e, r);
      };
    n = s && "function" == typeof s.ownKeys ? s.ownKeys : Object.getOwnPropertySymbols ? function (t) {
      return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t));
    } : function (t) {
      return Object.getOwnPropertyNames(t);
    };
    var i = Number.isNaN || function (t) {
      return t != t;
    };
    function a() {
      a.init.call(this);
    }
    t.exports = a, a.EventEmitter = a, a.prototype._events = void 0, a.prototype._eventsCount = 0, a.prototype._maxListeners = void 0;
    var c = 10;
    function h(t) {
      if ("function" != typeof t) throw new TypeError('The "listener" argument must be of type Function. Received type ' + _typeof(t));
    }
    function u(t) {
      return void 0 === t._maxListeners ? a.defaultMaxListeners : t._maxListeners;
    }
    function f(t, e, r, n) {
      var s, o, i, a;
      if (h(r), void 0 === (o = t._events) ? (o = t._events = Object.create(null), t._eventsCount = 0) : (void 0 !== o.newListener && (t.emit("newListener", e, r.listener ? r.listener : r), o = t._events), i = o[e]), void 0 === i) i = o[e] = r, ++t._eventsCount;else if ("function" == typeof i ? i = o[e] = n ? [r, i] : [i, r] : n ? i.unshift(r) : i.push(r), (s = u(t)) > 0 && i.length > s && !i.warned) {
        i.warned = !0;
        var c = new Error("Possible EventEmitter memory leak detected. " + i.length + " " + String(e) + " listeners added. Use emitter.setMaxListeners() to increase limit");
        c.name = "MaxListenersExceededWarning", c.emitter = t, c.type = e, c.count = i.length, a = c, console && console.warn && console.warn(a);
      }
      return t;
    }
    function p() {
      if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, 0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
    }
    function l(t, e, r) {
      var n = {
          fired: !1,
          wrapFn: void 0,
          target: t,
          type: e,
          listener: r
        },
        s = p.bind(n);
      return s.listener = r, n.wrapFn = s, s;
    }
    function d(t, e, r) {
      var n = t._events;
      if (void 0 === n) return [];
      var s = n[e];
      return void 0 === s ? [] : "function" == typeof s ? r ? [s.listener || s] : [s] : r ? function (t) {
        for (var e = new Array(t.length), r = 0; r < e.length; ++r) {
          e[r] = t[r].listener || t[r];
        }
        return e;
      }(s) : g(s, s.length);
    }
    function y(t) {
      var e = this._events;
      if (void 0 !== e) {
        var r = e[t];
        if ("function" == typeof r) return 1;
        if (void 0 !== r) return r.length;
      }
      return 0;
    }
    function g(t, e) {
      for (var r = new Array(e), n = 0; n < e; ++n) {
        r[n] = t[n];
      }
      return r;
    }
    Object.defineProperty(a, "defaultMaxListeners", {
      enumerable: !0,
      get: function get() {
        return c;
      },
      set: function set(t) {
        if ("number" != typeof t || t < 0 || i(t)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + t + ".");
        c = t;
      }
    }), a.init = function () {
      void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
    }, a.prototype.setMaxListeners = function (t) {
      if ("number" != typeof t || t < 0 || i(t)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
      return this._maxListeners = t, this;
    }, a.prototype.getMaxListeners = function () {
      return u(this);
    }, a.prototype.emit = function (t) {
      for (var e = [], r = 1; r < arguments.length; r++) {
        e.push(arguments[r]);
      }
      var n = "error" === t,
        s = this._events;
      if (void 0 !== s) n = n && void 0 === s.error;else if (!n) return !1;
      if (n) {
        var i;
        if (e.length > 0 && (i = e[0]), i instanceof Error) throw i;
        var a = new Error("Unhandled error." + (i ? " (" + i.message + ")" : ""));
        throw a.context = i, a;
      }
      var c = s[t];
      if (void 0 === c) return !1;
      if ("function" == typeof c) o(c, this, e);else {
        var h = c.length,
          u = g(c, h);
        for (r = 0; r < h; ++r) {
          o(u[r], this, e);
        }
      }
      return !0;
    }, a.prototype.addListener = function (t, e) {
      return f(this, t, e, !1);
    }, a.prototype.on = a.prototype.addListener, a.prototype.prependListener = function (t, e) {
      return f(this, t, e, !0);
    }, a.prototype.once = function (t, e) {
      return h(e), this.on(t, l(this, t, e)), this;
    }, a.prototype.prependOnceListener = function (t, e) {
      return h(e), this.prependListener(t, l(this, t, e)), this;
    }, a.prototype.removeListener = function (t, e) {
      var r, n, s, o, i;
      if (h(e), void 0 === (n = this._events)) return this;
      if (void 0 === (r = n[t])) return this;
      if (r === e || r.listener === e) 0 == --this._eventsCount ? this._events = Object.create(null) : (delete n[t], n.removeListener && this.emit("removeListener", t, r.listener || e));else if ("function" != typeof r) {
        for (s = -1, o = r.length - 1; o >= 0; o--) {
          if (r[o] === e || r[o].listener === e) {
            i = r[o].listener, s = o;
            break;
          }
        }
        if (s < 0) return this;
        0 === s ? r.shift() : function (t, e) {
          for (; e + 1 < t.length; e++) {
            t[e] = t[e + 1];
          }
          t.pop();
        }(r, s), 1 === r.length && (n[t] = r[0]), void 0 !== n.removeListener && this.emit("removeListener", t, i || e);
      }
      return this;
    }, a.prototype.off = a.prototype.removeListener, a.prototype.removeAllListeners = function (t) {
      var e, r, n;
      if (void 0 === (r = this._events)) return this;
      if (void 0 === r.removeListener) return 0 === arguments.length ? (this._events = Object.create(null), this._eventsCount = 0) : void 0 !== r[t] && (0 == --this._eventsCount ? this._events = Object.create(null) : delete r[t]), this;
      if (0 === arguments.length) {
        var s,
          o = Object.keys(r);
        for (n = 0; n < o.length; ++n) {
          "removeListener" !== (s = o[n]) && this.removeAllListeners(s);
        }
        return this.removeAllListeners("removeListener"), this._events = Object.create(null), this._eventsCount = 0, this;
      }
      if ("function" == typeof (e = r[t])) this.removeListener(t, e);else if (void 0 !== e) for (n = e.length - 1; n >= 0; n--) {
        this.removeListener(t, e[n]);
      }
      return this;
    }, a.prototype.listeners = function (t) {
      return d(this, t, !0);
    }, a.prototype.rawListeners = function (t) {
      return d(this, t, !1);
    }, a.listenerCount = function (t, e) {
      return "function" == typeof t.listenerCount ? t.listenerCount(e) : y.call(t, e);
    }, a.prototype.listenerCount = y, a.prototype.eventNames = function () {
      return this._eventsCount > 0 ? n(this._events) : [];
    };
  }, function (t, e, r) {
    "use strict";

    var n = r(33),
      s = r(35);
    function o() {
      this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null;
    }
    e.parse = b, e.resolve = function (t, e) {
      return b(t, !1, !0).resolve(e);
    }, e.resolveObject = function (t, e) {
      return t ? b(t, !1, !0).resolveObject(e) : e;
    }, e.format = function (t) {
      s.isString(t) && (t = b(t));
      return t instanceof o ? t.format() : o.prototype.format.call(t);
    }, e.Url = o;
    var i = /^([a-z0-9.+-]+:)/i,
      a = /:[0-9]*$/,
      c = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
      h = ["{", "}", "|", "\\", "^", "`"].concat(["<", ">", '"', "`", " ", "\r", "\n", "\t"]),
      u = ["'"].concat(h),
      f = ["%", "/", "?", ";", "#"].concat(u),
      p = ["/", "?", "#"],
      l = /^[+a-z0-9A-Z_-]{0,63}$/,
      d = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
      y = {
        javascript: !0,
        "javascript:": !0
      },
      g = {
        javascript: !0,
        "javascript:": !0
      },
      m = {
        http: !0,
        https: !0,
        ftp: !0,
        gopher: !0,
        file: !0,
        "http:": !0,
        "https:": !0,
        "ftp:": !0,
        "gopher:": !0,
        "file:": !0
      },
      v = r(36);
    function b(t, e, r) {
      if (t && s.isObject(t) && t instanceof o) return t;
      var n = new o();
      return n.parse(t, e, r), n;
    }
    o.prototype.parse = function (t, e, r) {
      if (!s.isString(t)) throw new TypeError("Parameter 'url' must be a string, not " + _typeof(t));
      var o = t.indexOf("?"),
        a = -1 !== o && o < t.indexOf("#") ? "?" : "#",
        h = t.split(a);
      h[0] = h[0].replace(/\\/g, "/");
      var b = t = h.join(a);
      if (b = b.trim(), !r && 1 === t.split("#").length) {
        var w = c.exec(b);
        if (w) return this.path = b, this.href = b, this.pathname = w[1], w[2] ? (this.search = w[2], this.query = e ? v.parse(this.search.substr(1)) : this.search.substr(1)) : e && (this.search = "", this.query = {}), this;
      }
      var _ = i.exec(b);
      if (_) {
        var E = (_ = _[0]).toLowerCase();
        this.protocol = E, b = b.substr(_.length);
      }
      if (r || _ || b.match(/^\/\/[^@\/]+@[^@\/]+/)) {
        var k = "//" === b.substr(0, 2);
        !k || _ && g[_] || (b = b.substr(2), this.slashes = !0);
      }
      if (!g[_] && (k || _ && !m[_])) {
        for (var A, O, S = -1, C = 0; C < p.length; C++) {
          -1 !== (T = b.indexOf(p[C])) && (-1 === S || T < S) && (S = T);
        }
        -1 !== (O = -1 === S ? b.lastIndexOf("@") : b.lastIndexOf("@", S)) && (A = b.slice(0, O), b = b.slice(O + 1), this.auth = decodeURIComponent(A)), S = -1;
        for (C = 0; C < f.length; C++) {
          var T;
          -1 !== (T = b.indexOf(f[C])) && (-1 === S || T < S) && (S = T);
        }
        -1 === S && (S = b.length), this.host = b.slice(0, S), b = b.slice(S), this.parseHost(), this.hostname = this.hostname || "";
        var P = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
        if (!P) for (var R = this.hostname.split(/\./), x = (C = 0, R.length); C < x; C++) {
          var B = R[C];
          if (B && !B.match(l)) {
            for (var N = "", L = 0, j = B.length; L < j; L++) {
              B.charCodeAt(L) > 127 ? N += "x" : N += B[L];
            }
            if (!N.match(l)) {
              var I = R.slice(0, C),
                U = R.slice(C + 1),
                M = B.match(d);
              M && (I.push(M[1]), U.unshift(M[2])), U.length && (b = "/" + U.join(".") + b), this.hostname = I.join(".");
              break;
            }
          }
        }
        this.hostname.length > 255 ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), P || (this.hostname = n.toASCII(this.hostname));
        var D = this.port ? ":" + this.port : "",
          Y = this.hostname || "";
        this.host = Y + D, this.href += this.host, P && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), "/" !== b[0] && (b = "/" + b));
      }
      if (!y[E]) for (C = 0, x = u.length; C < x; C++) {
        var q = u[C];
        if (-1 !== b.indexOf(q)) {
          var F = encodeURIComponent(q);
          F === q && (F = escape(q)), b = b.split(q).join(F);
        }
      }
      var K = b.indexOf("#");
      -1 !== K && (this.hash = b.substr(K), b = b.slice(0, K));
      var V = b.indexOf("?");
      if (-1 !== V ? (this.search = b.substr(V), this.query = b.substr(V + 1), e && (this.query = v.parse(this.query)), b = b.slice(0, V)) : e && (this.search = "", this.query = {}), b && (this.pathname = b), m[E] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
        D = this.pathname || "";
        var z = this.search || "";
        this.path = D + z;
      }
      return this.href = this.format(), this;
    }, o.prototype.format = function () {
      var t = this.auth || "";
      t && (t = (t = encodeURIComponent(t)).replace(/%3A/i, ":"), t += "@");
      var e = this.protocol || "",
        r = this.pathname || "",
        n = this.hash || "",
        o = !1,
        i = "";
      this.host ? o = t + this.host : this.hostname && (o = t + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"), this.port && (o += ":" + this.port)), this.query && s.isObject(this.query) && Object.keys(this.query).length && (i = v.stringify(this.query));
      var a = this.search || i && "?" + i || "";
      return e && ":" !== e.substr(-1) && (e += ":"), this.slashes || (!e || m[e]) && !1 !== o ? (o = "//" + (o || ""), r && "/" !== r.charAt(0) && (r = "/" + r)) : o || (o = ""), n && "#" !== n.charAt(0) && (n = "#" + n), a && "?" !== a.charAt(0) && (a = "?" + a), e + o + (r = r.replace(/[?#]/g, function (t) {
        return encodeURIComponent(t);
      })) + (a = a.replace("#", "%23")) + n;
    }, o.prototype.resolve = function (t) {
      return this.resolveObject(b(t, !1, !0)).format();
    }, o.prototype.resolveObject = function (t) {
      if (s.isString(t)) {
        var e = new o();
        e.parse(t, !1, !0), t = e;
      }
      for (var r = new o(), n = Object.keys(this), i = 0; i < n.length; i++) {
        var a = n[i];
        r[a] = this[a];
      }
      if (r.hash = t.hash, "" === t.href) return r.href = r.format(), r;
      if (t.slashes && !t.protocol) {
        for (var c = Object.keys(t), h = 0; h < c.length; h++) {
          var u = c[h];
          "protocol" !== u && (r[u] = t[u]);
        }
        return m[r.protocol] && r.hostname && !r.pathname && (r.path = r.pathname = "/"), r.href = r.format(), r;
      }
      if (t.protocol && t.protocol !== r.protocol) {
        if (!m[t.protocol]) {
          for (var f = Object.keys(t), p = 0; p < f.length; p++) {
            var l = f[p];
            r[l] = t[l];
          }
          return r.href = r.format(), r;
        }
        if (r.protocol = t.protocol, t.host || g[t.protocol]) r.pathname = t.pathname;else {
          for (var d = (t.pathname || "").split("/"); d.length && !(t.host = d.shift());) {
            ;
          }
          t.host || (t.host = ""), t.hostname || (t.hostname = ""), "" !== d[0] && d.unshift(""), d.length < 2 && d.unshift(""), r.pathname = d.join("/");
        }
        if (r.search = t.search, r.query = t.query, r.host = t.host || "", r.auth = t.auth, r.hostname = t.hostname || t.host, r.port = t.port, r.pathname || r.search) {
          var y = r.pathname || "",
            v = r.search || "";
          r.path = y + v;
        }
        return r.slashes = r.slashes || t.slashes, r.href = r.format(), r;
      }
      var b = r.pathname && "/" === r.pathname.charAt(0),
        w = t.host || t.pathname && "/" === t.pathname.charAt(0),
        _ = w || b || r.host && t.pathname,
        E = _,
        k = r.pathname && r.pathname.split("/") || [],
        A = (d = t.pathname && t.pathname.split("/") || [], r.protocol && !m[r.protocol]);
      if (A && (r.hostname = "", r.port = null, r.host && ("" === k[0] ? k[0] = r.host : k.unshift(r.host)), r.host = "", t.protocol && (t.hostname = null, t.port = null, t.host && ("" === d[0] ? d[0] = t.host : d.unshift(t.host)), t.host = null), _ = _ && ("" === d[0] || "" === k[0])), w) r.host = t.host || "" === t.host ? t.host : r.host, r.hostname = t.hostname || "" === t.hostname ? t.hostname : r.hostname, r.search = t.search, r.query = t.query, k = d;else if (d.length) k || (k = []), k.pop(), k = k.concat(d), r.search = t.search, r.query = t.query;else if (!s.isNullOrUndefined(t.search)) {
        if (A) r.hostname = r.host = k.shift(), (P = !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@")) && (r.auth = P.shift(), r.host = r.hostname = P.shift());
        return r.search = t.search, r.query = t.query, s.isNull(r.pathname) && s.isNull(r.search) || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")), r.href = r.format(), r;
      }
      if (!k.length) return r.pathname = null, r.search ? r.path = "/" + r.search : r.path = null, r.href = r.format(), r;
      for (var O = k.slice(-1)[0], S = (r.host || t.host || k.length > 1) && ("." === O || ".." === O) || "" === O, C = 0, T = k.length; T >= 0; T--) {
        "." === (O = k[T]) ? k.splice(T, 1) : ".." === O ? (k.splice(T, 1), C++) : C && (k.splice(T, 1), C--);
      }
      if (!_ && !E) for (; C--; C) {
        k.unshift("..");
      }
      !_ || "" === k[0] || k[0] && "/" === k[0].charAt(0) || k.unshift(""), S && "/" !== k.join("/").substr(-1) && k.push("");
      var P,
        R = "" === k[0] || k[0] && "/" === k[0].charAt(0);
      A && (r.hostname = r.host = R ? "" : k.length ? k.shift() : "", (P = !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@")) && (r.auth = P.shift(), r.host = r.hostname = P.shift()));
      return (_ = _ || r.host && k.length) && !R && k.unshift(""), k.length ? r.pathname = k.join("/") : (r.pathname = null, r.path = null), s.isNull(r.pathname) && s.isNull(r.search) || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")), r.auth = t.auth || r.auth, r.slashes = r.slashes || t.slashes, r.href = r.format(), r;
    }, o.prototype.parseHost = function () {
      var t = this.host,
        e = a.exec(t);
      e && (":" !== (e = e[0]) && (this.port = e.substr(1)), t = t.substr(0, t.length - e.length)), t && (this.hostname = t);
    };
  }, function (t, e, r) {
    (function (t, n) {
      var s; /*! https://mths.be/punycode v1.4.1 by @mathias */
      !function (o) {
        e && e.nodeType, t && t.nodeType;
        var i = "object" == _typeof(n) && n;
        i.global !== i && i.window !== i && i.self;
        var a,
          c = 2147483647,
          h = /^xn--/,
          u = /[^\x20-\x7E]/,
          f = /[\x2E\u3002\uFF0E\uFF61]/g,
          p = {
            overflow: "Overflow: input needs wider integers to process",
            "not-basic": "Illegal input >= 0x80 (not a basic code point)",
            "invalid-input": "Invalid input"
          },
          l = Math.floor,
          d = String.fromCharCode;
        function y(t) {
          throw new RangeError(p[t]);
        }
        function g(t, e) {
          for (var r = t.length, n = []; r--;) {
            n[r] = e(t[r]);
          }
          return n;
        }
        function m(t, e) {
          var r = t.split("@"),
            n = "";
          return r.length > 1 && (n = r[0] + "@", t = r[1]), n + g((t = t.replace(f, ".")).split("."), e).join(".");
        }
        function v(t) {
          for (var e, r, n = [], s = 0, o = t.length; s < o;) {
            (e = t.charCodeAt(s++)) >= 55296 && e <= 56319 && s < o ? 56320 == (64512 & (r = t.charCodeAt(s++))) ? n.push(((1023 & e) << 10) + (1023 & r) + 65536) : (n.push(e), s--) : n.push(e);
          }
          return n;
        }
        function b(t) {
          return g(t, function (t) {
            var e = "";
            return t > 65535 && (e += d((t -= 65536) >>> 10 & 1023 | 55296), t = 56320 | 1023 & t), e += d(t);
          }).join("");
        }
        function w(t, e) {
          return t + 22 + 75 * (t < 26) - ((0 != e) << 5);
        }
        function _(t, e, r) {
          var n = 0;
          for (t = r ? l(t / 700) : t >> 1, t += l(t / e); t > 455; n += 36) {
            t = l(t / 35);
          }
          return l(n + 36 * t / (t + 38));
        }
        function E(t) {
          var e,
            r,
            n,
            s,
            o,
            i,
            a,
            h,
            u,
            f,
            p,
            d = [],
            g = t.length,
            m = 0,
            v = 128,
            w = 72;
          for ((r = t.lastIndexOf("-")) < 0 && (r = 0), n = 0; n < r; ++n) {
            t.charCodeAt(n) >= 128 && y("not-basic"), d.push(t.charCodeAt(n));
          }
          for (s = r > 0 ? r + 1 : 0; s < g;) {
            for (o = m, i = 1, a = 36; s >= g && y("invalid-input"), ((h = (p = t.charCodeAt(s++)) - 48 < 10 ? p - 22 : p - 65 < 26 ? p - 65 : p - 97 < 26 ? p - 97 : 36) >= 36 || h > l((c - m) / i)) && y("overflow"), m += h * i, !(h < (u = a <= w ? 1 : a >= w + 26 ? 26 : a - w)); a += 36) {
              i > l(c / (f = 36 - u)) && y("overflow"), i *= f;
            }
            w = _(m - o, e = d.length + 1, 0 == o), l(m / e) > c - v && y("overflow"), v += l(m / e), m %= e, d.splice(m++, 0, v);
          }
          return b(d);
        }
        function k(t) {
          var e,
            r,
            n,
            s,
            o,
            i,
            a,
            h,
            u,
            f,
            p,
            g,
            m,
            b,
            E,
            k = [];
          for (g = (t = v(t)).length, e = 128, r = 0, o = 72, i = 0; i < g; ++i) {
            (p = t[i]) < 128 && k.push(d(p));
          }
          for (n = s = k.length, s && k.push("-"); n < g;) {
            for (a = c, i = 0; i < g; ++i) {
              (p = t[i]) >= e && p < a && (a = p);
            }
            for (a - e > l((c - r) / (m = n + 1)) && y("overflow"), r += (a - e) * m, e = a, i = 0; i < g; ++i) {
              if ((p = t[i]) < e && ++r > c && y("overflow"), p == e) {
                for (h = r, u = 36; !(h < (f = u <= o ? 1 : u >= o + 26 ? 26 : u - o)); u += 36) {
                  E = h - f, b = 36 - f, k.push(d(w(f + E % b, 0))), h = l(E / b);
                }
                k.push(d(w(h, 0))), o = _(r, m, n == s), r = 0, ++n;
              }
            }
            ++r, ++e;
          }
          return k.join("");
        }
        a = {
          version: "1.4.1",
          ucs2: {
            decode: v,
            encode: b
          },
          decode: E,
          encode: k,
          toASCII: function toASCII(t) {
            return m(t, function (t) {
              return u.test(t) ? "xn--" + k(t) : t;
            });
          },
          toUnicode: function toUnicode(t) {
            return m(t, function (t) {
              return h.test(t) ? E(t.slice(4).toLowerCase()) : t;
            });
          }
        }, void 0 === (s = function () {
          return a;
        }.call(e, r, e, t)) || (t.exports = s);
      }();
    }).call(this, r(34)(t), r(7));
  }, function (t, e) {
    t.exports = function (t) {
      return t.webpackPolyfill || (t.deprecate = function () {}, t.paths = [], t.children || (t.children = []), Object.defineProperty(t, "loaded", {
        enumerable: !0,
        get: function get() {
          return t.l;
        }
      }), Object.defineProperty(t, "id", {
        enumerable: !0,
        get: function get() {
          return t.i;
        }
      }), t.webpackPolyfill = 1), t;
    };
  }, function (t, e, r) {
    "use strict";

    t.exports = {
      isString: function isString(t) {
        return "string" == typeof t;
      },
      isObject: function isObject(t) {
        return "object" == _typeof(t) && null !== t;
      },
      isNull: function isNull(t) {
        return null === t;
      },
      isNullOrUndefined: function isNullOrUndefined(t) {
        return null == t;
      }
    };
  }, function (t, e, r) {
    "use strict";

    e.decode = e.parse = r(37), e.encode = e.stringify = r(38);
  }, function (t, e, r) {
    "use strict";

    function n(t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }
    t.exports = function (t, e, r, o) {
      e = e || "&", r = r || "=";
      var i = {};
      if ("string" != typeof t || 0 === t.length) return i;
      var a = /\+/g;
      t = t.split(e);
      var c = 1e3;
      o && "number" == typeof o.maxKeys && (c = o.maxKeys);
      var h = t.length;
      c > 0 && h > c && (h = c);
      for (var u = 0; u < h; ++u) {
        var f,
          p,
          l,
          d,
          y = t[u].replace(a, "%20"),
          g = y.indexOf(r);
        g >= 0 ? (f = y.substr(0, g), p = y.substr(g + 1)) : (f = y, p = ""), l = decodeURIComponent(f), d = decodeURIComponent(p), n(i, l) ? s(i[l]) ? i[l].push(d) : i[l] = [i[l], d] : i[l] = d;
      }
      return i;
    };
    var s = Array.isArray || function (t) {
      return "[object Array]" === Object.prototype.toString.call(t);
    };
  }, function (t, e, r) {
    "use strict";

    var n = function n(t) {
      switch (_typeof(t)) {
        case "string":
          return t;
        case "boolean":
          return t ? "true" : "false";
        case "number":
          return isFinite(t) ? t : "";
        default:
          return "";
      }
    };
    t.exports = function (t, e, r, a) {
      return e = e || "&", r = r || "=", null === t && (t = void 0), "object" == _typeof(t) ? o(i(t), function (i) {
        var a = encodeURIComponent(n(i)) + r;
        return s(t[i]) ? o(t[i], function (t) {
          return a + encodeURIComponent(n(t));
        }).join(e) : a + encodeURIComponent(n(t[i]));
      }).join(e) : a ? encodeURIComponent(n(a)) + r + encodeURIComponent(n(t)) : "";
    };
    var s = Array.isArray || function (t) {
      return "[object Array]" === Object.prototype.toString.call(t);
    };
    function o(t, e) {
      if (t.map) return t.map(e);
      for (var r = [], n = 0; n < t.length; n++) {
        r.push(e(t[n], n));
      }
      return r;
    }
    var i = Object.keys || function (t) {
      var e = [];
      for (var r in t) {
        Object.prototype.hasOwnProperty.call(t, r) && e.push(r);
      }
      return e;
    };
  }, function (t, e, r) {
    "use strict";

    var n = /*#__PURE__*/_createClass(function n(t, e) {
      _classCallCheck(this, n);
      this.target = e, this.type = t;
    });
    var s = /*#__PURE__*/function (_n9) {
      _inherits(s, _n9);
      var _super8 = _createSuper(s);
      function s(t, e) {
        var _this14;
        _classCallCheck(this, s);
        _this14 = _super8.call(this, "message", e), _this14.data = t;
        return _this14;
      }
      return _createClass(s);
    }(n);
    var o = /*#__PURE__*/function (_n10) {
      _inherits(o, _n10);
      var _super9 = _createSuper(o);
      function o(t, e, r) {
        var _this15;
        _classCallCheck(this, o);
        _this15 = _super9.call(this, "close", r), _this15.wasClean = r._closeFrameReceived && r._closeFrameSent, _this15.reason = e, _this15.code = t;
        return _this15;
      }
      return _createClass(o);
    }(n);
    var i = /*#__PURE__*/function (_n11) {
      _inherits(i, _n11);
      var _super10 = _createSuper(i);
      function i(t) {
        _classCallCheck(this, i);
        return _super10.call(this, "open", t);
      }
      return _createClass(i);
    }(n);
    var a = /*#__PURE__*/function (_n12) {
      _inherits(a, _n12);
      var _super11 = _createSuper(a);
      function a(t, e) {
        var _this16;
        _classCallCheck(this, a);
        _this16 = _super11.call(this, "error", e), _this16.message = t.message, _this16.error = t;
        return _this16;
      }
      return _createClass(a);
    }(n);
    var c = {
      addEventListener: function addEventListener(t, e) {
        function r(t) {
          e.call(this, new s(t, this));
        }
        function n(t, r) {
          e.call(this, new o(t, r, this));
        }
        function c(t) {
          e.call(this, new a(t, this));
        }
        function h() {
          e.call(this, new i(this));
        }
        "function" == typeof e && ("message" === t ? (r._listener = e, this.on(t, r)) : "close" === t ? (n._listener = e, this.on(t, n)) : "error" === t ? (c._listener = e, this.on(t, c)) : "open" === t ? (h._listener = e, this.on(t, h)) : this.on(t, e));
      },
      removeEventListener: function removeEventListener(t, e) {
        var r = this.listeners(t);
        for (var _n13 = 0; _n13 < r.length; _n13++) {
          r[_n13] !== e && r[_n13]._listener !== e || this.removeListener(t, r[_n13]);
        }
      }
    };
    t.exports = c;
  }, function (t, e, r) {
    var n = r(0)("wx-ws:sender");
    t.exports = /*#__PURE__*/function () {
      "use strict";

      function _class5(t) {
        _classCallCheck(this, _class5);
        this._socket = t, this._queue = [], this._bufferedBytes = 0, this._deflating = !1;
      }
      _createClass(_class5, [{
        key: "send",
        value: function send(t, e, r) {
          n("send msg: ", t, " sender: ", this, this._deflating), this._deflating ? this.enqueue([this.dispatch, t, e, r]) : this.dispatch(t, e, r);
        }
      }, {
        key: "dispatch",
        value: function dispatch(t, e, r) {
          n("dispatch msg: ", t, ", sender: ", this), this._deflating = !0, "function" == typeof e && (r = e, e = {}), this._deflating = !1, this._socket.send({
            data: t,
            success: function success(t) {
              return r && r(null, t);
            },
            fail: function fail(t) {
              return r && r(t);
            }
          }), this.dequeue();
        }
      }, {
        key: "dequeue",
        value: function dequeue() {
          for (; !this._deflating && this._queue.length;) {
            var _t9 = this._queue.shift();
            this._bufferedBytes -= _t9[1].length, Reflect.apply(_t9[0], this, _t9.slice(1));
          }
        }
      }, {
        key: "enqueue",
        value: function enqueue(t) {
          this._bufferedBytes += t[1].length, this._queue.push(t);
        }
      }]);
      return _class5;
    }();
  }, function (t, e, r) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.reconstructPacket = e.deconstructPacket = void 0;
    var n = r(12);
    e.deconstructPacket = function (t) {
      var e = [],
        r = t.data,
        s = t;
      return s.data = function t(e, r) {
        if (!e) return e;
        if (n.isBinary(e)) {
          var _t10 = {
            _placeholder: !0,
            num: r.length
          };
          return r.push(e), _t10;
        }
        if (Array.isArray(e)) {
          var _n14 = new Array(e.length);
          for (var _s5 = 0; _s5 < e.length; _s5++) {
            _n14[_s5] = t(e[_s5], r);
          }
          return _n14;
        }
        if ("object" == _typeof(e) && !(e instanceof Date)) {
          var _n15 = {};
          for (var _s6 in e) {
            e.hasOwnProperty(_s6) && (_n15[_s6] = t(e[_s6], r));
          }
          return _n15;
        }
        return e;
      }(r, e), s.attachments = e.length, {
        packet: s,
        buffers: e
      };
    }, e.reconstructPacket = function (t, e) {
      return t.data = function t(e, r) {
        if (!e) return e;
        if (e && e._placeholder) return r[e.num];
        if (Array.isArray(e)) for (var _n16 = 0; _n16 < e.length; _n16++) {
          e[_n16] = t(e[_n16], r);
        } else if ("object" == _typeof(e)) for (var _n17 in e) {
          e.hasOwnProperty(_n17) && (e[_n17] = t(e[_n17], r));
        }
        return e;
      }(t.data, e), t.attachments = void 0, t;
    };
  }, function (t, e) {
    function r(t) {
      t = t || {}, this.ms = t.min || 100, this.max = t.max || 1e4, this.factor = t.factor || 2, this.jitter = t.jitter > 0 && t.jitter <= 1 ? t.jitter : 0, this.attempts = 0;
    }
    t.exports = r, r.prototype.duration = function () {
      var t = this.ms * Math.pow(this.factor, this.attempts++);
      if (this.jitter) {
        var e = Math.random(),
          r = Math.floor(e * this.jitter * t);
        t = 0 == (1 & Math.floor(10 * e)) ? t - r : t + r;
      }
      return 0 | Math.min(t, this.max);
    }, r.prototype.reset = function () {
      this.attempts = 0;
    }, r.prototype.setMin = function (t) {
      this.ms = t;
    }, r.prototype.setMax = function (t) {
      this.max = t;
    }, r.prototype.setJitter = function (t) {
      this.jitter = t;
    };
  }]);
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./../../../../../../applications/Hbuilder/HBuilderX/plugins/uniapp-cli/node_modules/webpack/buildin/module.js */ 160)(module)))

/***/ }),
/* 196 */
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
module.exports = _assertThisInitialized, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 197 */
/*!****************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/get.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var superPropBase = __webpack_require__(/*! ./superPropBase.js */ 198);
function _get() {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    module.exports = _get = Reflect.get.bind(), module.exports.__esModule = true, module.exports["default"] = module.exports;
  } else {
    module.exports = _get = function _get(target, property, receiver) {
      var base = superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }
      return desc.value;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
  return _get.apply(this, arguments);
}
module.exports = _get, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 198 */
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/superPropBase.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__(/*! ./getPrototypeOf.js */ 199);
function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = getPrototypeOf(object);
    if (object === null) break;
  }
  return object;
}
module.exports = _superPropBase, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 199 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _getPrototypeOf(o);
}
module.exports = _getPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 200 */
/*!*********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/inherits.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ 16);
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}
module.exports = _inherits, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 201 */
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
var assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized.js */ 196);
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return assertThisInitialized(self);
}
module.exports = _possibleConstructorReturn, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */,
/* 359 */,
/* 360 */,
/* 361 */,
/* 362 */,
/* 363 */,
/* 364 */,
/* 365 */,
/* 366 */,
/* 367 */,
/* 368 */,
/* 369 */,
/* 370 */,
/* 371 */,
/* 372 */,
/* 373 */,
/* 374 */,
/* 375 */,
/* 376 */,
/* 377 */,
/* 378 */,
/* 379 */,
/* 380 */,
/* 381 */,
/* 382 */,
/* 383 */,
/* 384 */,
/* 385 */,
/* 386 */,
/* 387 */,
/* 388 */,
/* 389 */,
/* 390 */,
/* 391 */,
/* 392 */,
/* 393 */,
/* 394 */,
/* 395 */,
/* 396 */
/*!*****************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/components/u-swiper/props.js ***!
  \*****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 列表数组，元素可为字符串，如为对象可通过keyName指定目标属性名
    list: {
      type: Array,
      default: uni.$u.props.swiper.list
    },
    // 是否显示面板指示器
    indicator: {
      type: Boolean,
      default: uni.$u.props.swiper.indicator
    },
    // 指示器非激活颜色
    indicatorActiveColor: {
      type: String,
      default: uni.$u.props.swiper.indicatorActiveColor
    },
    // 指示器的激活颜色
    indicatorInactiveColor: {
      type: String,
      default: uni.$u.props.swiper.indicatorInactiveColor
    },
    // 指示器样式，可通过bottom，left，right进行定位
    indicatorStyle: {
      type: [String, Object],
      default: uni.$u.props.swiper.indicatorStyle
    },
    // 指示器模式，line-线型，dot-点型
    indicatorMode: {
      type: String,
      default: uni.$u.props.swiper.indicatorMode
    },
    // 是否自动切换
    autoplay: {
      type: Boolean,
      default: uni.$u.props.swiper.autoplay
    },
    // 当前所在滑块的 index
    current: {
      type: [String, Number],
      default: uni.$u.props.swiper.current
    },
    // 当前所在滑块的 item-id ，不能与 current 被同时指定
    currentItemId: {
      type: String,
      default: uni.$u.props.swiper.currentItemId
    },
    // 滑块自动切换时间间隔
    interval: {
      type: [String, Number],
      default: uni.$u.props.swiper.interval
    },
    // 滑块切换过程所需时间
    duration: {
      type: [String, Number],
      default: uni.$u.props.swiper.duration
    },
    // 播放到末尾后是否重新回到开头
    circular: {
      type: Boolean,
      default: uni.$u.props.swiper.circular
    },
    // 前边距，可用于露出前一项的一小部分，nvue和支付宝不支持
    previousMargin: {
      type: [String, Number],
      default: uni.$u.props.swiper.previousMargin
    },
    // 后边距，可用于露出后一项的一小部分，nvue和支付宝不支持
    nextMargin: {
      type: [String, Number],
      default: uni.$u.props.swiper.nextMargin
    },
    // 当开启时，会根据滑动速度，连续滑动多屏，支付宝不支持
    acceleration: {
      type: Boolean,
      default: uni.$u.props.swiper.acceleration
    },
    // 同时显示的滑块数量，nvue、支付宝小程序不支持
    displayMultipleItems: {
      type: Number,
      default: uni.$u.props.swiper.displayMultipleItems
    },
    // 指定swiper切换缓动动画类型，有效值：default、linear、easeInCubic、easeOutCubic、easeInOutCubic
    // 只对微信小程序有效
    easingFunction: {
      type: String,
      default: uni.$u.props.swiper.easingFunction
    },
    // list数组中指定对象的目标属性名
    keyName: {
      type: String,
      default: uni.$u.props.swiper.keyName
    },
    // 图片的裁剪模式
    imgMode: {
      type: String,
      default: uni.$u.props.swiper.imgMode
    },
    // 组件高度
    height: {
      type: [String, Number],
      default: uni.$u.props.swiper.height
    },
    // 背景颜色
    bgColor: {
      type: String,
      default: uni.$u.props.swiper.bgColor
    },
    // 组件圆角，数值或带单位的字符串
    radius: {
      type: [String, Number],
      default: uni.$u.props.swiper.radius
    },
    // 是否加载中
    loading: {
      type: Boolean,
      default: uni.$u.props.swiper.loading
    },
    // 是否显示标题，要求数组对象中有title属性
    showTitle: {
      type: Boolean,
      default: uni.$u.props.swiper.showTitle
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 397 */,
/* 398 */,
/* 399 */,
/* 400 */,
/* 401 */,
/* 402 */,
/* 403 */,
/* 404 */
/*!*****************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/components/u-sticky/props.js ***!
  \*****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 吸顶容器到顶部某个距离的时候，进行吸顶，在H5平台，NavigationBar为44px
    offsetTop: {
      type: [String, Number],
      default: uni.$u.props.sticky.offsetTop
    },
    // 自定义导航栏的高度
    customNavHeight: {
      type: [String, Number],
      default: uni.$u.props.sticky.customNavHeight
    },
    // 是否开启吸顶功能
    disabled: {
      type: Boolean,
      default: uni.$u.props.sticky.disabled
    },
    // 吸顶区域的背景颜色
    bgColor: {
      type: String,
      default: uni.$u.props.sticky.bgColor
    },
    // z-index值
    zIndex: {
      type: [String, Number],
      default: uni.$u.props.sticky.zIndex
    },
    // 列表中的索引值
    index: {
      type: [String, Number],
      default: uni.$u.props.sticky.index
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 405 */,
/* 406 */,
/* 407 */,
/* 408 */,
/* 409 */,
/* 410 */,
/* 411 */,
/* 412 */,
/* 413 */,
/* 414 */,
/* 415 */,
/* 416 */,
/* 417 */,
/* 418 */,
/* 419 */,
/* 420 */,
/* 421 */,
/* 422 */,
/* 423 */,
/* 424 */,
/* 425 */,
/* 426 */,
/* 427 */,
/* 428 */,
/* 429 */,
/* 430 */,
/* 431 */,
/* 432 */,
/* 433 */,
/* 434 */,
/* 435 */,
/* 436 */,
/* 437 */,
/* 438 */,
/* 439 */,
/* 440 */,
/* 441 */,
/* 442 */,
/* 443 */,
/* 444 */,
/* 445 */,
/* 446 */,
/* 447 */,
/* 448 */,
/* 449 */,
/* 450 */,
/* 451 */,
/* 452 */,
/* 453 */,
/* 454 */,
/* 455 */,
/* 456 */,
/* 457 */,
/* 458 */,
/* 459 */,
/* 460 */,
/* 461 */
/*!***************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/components/u-form/props.js ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 当前form的需要验证字段的集合
    model: {
      type: Object,
      default: uni.$u.props.form.model
    },
    // 验证规则
    rules: {
      type: [Object, Function, Array],
      default: uni.$u.props.form.rules
    },
    // 有错误时的提示方式，message-提示信息，toast-进行toast提示
    // border-bottom-下边框呈现红色，none-无提示
    errorType: {
      type: String,
      default: uni.$u.props.form.errorType
    },
    // 是否显示表单域的下划线边框
    borderBottom: {
      type: Boolean,
      default: uni.$u.props.form.borderBottom
    },
    // label的位置，left-左边，top-上边
    labelPosition: {
      type: String,
      default: uni.$u.props.form.labelPosition
    },
    // label的宽度，单位px
    labelWidth: {
      type: [String, Number],
      default: uni.$u.props.form.labelWidth
    },
    // lable字体的对齐方式
    labelAlign: {
      type: String,
      default: uni.$u.props.form.labelAlign
    },
    // lable的样式，对象形式
    labelStyle: {
      type: Object,
      default: uni.$u.props.form.labelStyle
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 462 */,
/* 463 */,
/* 464 */,
/* 465 */,
/* 466 */,
/* 467 */
/*!********************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/components/u-form-item/props.js ***!
  \********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // input的label提示语
    label: {
      type: String,
      default: uni.$u.props.formItem.label
    },
    // 绑定的值
    prop: {
      type: String,
      default: uni.$u.props.formItem.prop
    },
    // 是否显示表单域的下划线边框
    borderBottom: {
      type: [String, Boolean],
      default: uni.$u.props.formItem.borderBottom
    },
    // label的宽度，单位px
    labelWidth: {
      type: [String, Number],
      default: uni.$u.props.formItem.labelWidth
    },
    // 右侧图标
    rightIcon: {
      type: String,
      default: uni.$u.props.formItem.rightIcon
    },
    // 左侧图标
    leftIcon: {
      type: String,
      default: uni.$u.props.formItem.leftIcon
    },
    // 是否显示左边的必填星号，只作显示用，具体校验必填的逻辑，请在rules中配置
    required: {
      type: Boolean,
      default: uni.$u.props.formItem.required
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 468 */,
/* 469 */,
/* 470 */,
/* 471 */,
/* 472 */,
/* 473 */,
/* 474 */,
/* 475 */
/*!*************************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/components/u-checkbox-group/props.js ***!
  \*************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 标识符
    name: {
      type: String,
      default: uni.$u.props.checkboxGroup.name
    },
    // 绑定的值
    value: {
      type: Array,
      default: uni.$u.props.checkboxGroup.value
    },
    // 形状，circle-圆形，square-方形
    shape: {
      type: String,
      default: uni.$u.props.checkboxGroup.shape
    },
    // 是否禁用全部checkbox
    disabled: {
      type: Boolean,
      default: uni.$u.props.checkboxGroup.disabled
    },
    // 选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值
    activeColor: {
      type: String,
      default: uni.$u.props.checkboxGroup.activeColor
    },
    // 未选中的颜色
    inactiveColor: {
      type: String,
      default: uni.$u.props.checkboxGroup.inactiveColor
    },
    // 整个组件的尺寸，默认px
    size: {
      type: [String, Number],
      default: uni.$u.props.checkboxGroup.size
    },
    // 布局方式，row-横向，column-纵向
    placement: {
      type: String,
      default: uni.$u.props.checkboxGroup.placement
    },
    // label的字体大小，px单位
    labelSize: {
      type: [String, Number],
      default: uni.$u.props.checkboxGroup.labelSize
    },
    // label的字体颜色
    labelColor: {
      type: [String],
      default: uni.$u.props.checkboxGroup.labelColor
    },
    // 是否禁止点击文本操作
    labelDisabled: {
      type: Boolean,
      default: uni.$u.props.checkboxGroup.labelDisabled
    },
    // 图标颜色
    iconColor: {
      type: String,
      default: uni.$u.props.checkboxGroup.iconColor
    },
    // 图标的大小，单位px
    iconSize: {
      type: [String, Number],
      default: uni.$u.props.checkboxGroup.iconSize
    },
    // 勾选图标的对齐方式，left-左边，right-右边
    iconPlacement: {
      type: String,
      default: uni.$u.props.checkboxGroup.iconPlacement
    },
    // 竖向配列时，是否显示下划线
    borderBottom: {
      type: Boolean,
      default: uni.$u.props.checkboxGroup.borderBottom
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 476 */,
/* 477 */,
/* 478 */,
/* 479 */,
/* 480 */,
/* 481 */,
/* 482 */,
/* 483 */
/*!*******************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/components/u-checkbox/props.js ***!
  \*******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // checkbox的名称
    name: {
      type: [String, Number, Boolean],
      default: uni.$u.props.checkbox.name
    },
    // 形状，square为方形，circle为圆型
    shape: {
      type: String,
      default: uni.$u.props.checkbox.shape
    },
    // 整体的大小
    size: {
      type: [String, Number],
      default: uni.$u.props.checkbox.size
    },
    // 是否默认选中
    checked: {
      type: Boolean,
      default: uni.$u.props.checkbox.checked
    },
    // 是否禁用
    disabled: {
      type: [String, Boolean],
      default: uni.$u.props.checkbox.disabled
    },
    // 选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值
    activeColor: {
      type: String,
      default: uni.$u.props.checkbox.activeColor
    },
    // 未选中的颜色
    inactiveColor: {
      type: String,
      default: uni.$u.props.checkbox.inactiveColor
    },
    // 图标的大小，单位px
    iconSize: {
      type: [String, Number],
      default: uni.$u.props.checkbox.iconSize
    },
    // 图标颜色
    iconColor: {
      type: String,
      default: uni.$u.props.checkbox.iconColor
    },
    // label提示文字，因为nvue下，直接slot进来的文字，由于特殊的结构，无法修改样式
    label: {
      type: [String, Number],
      default: uni.$u.props.checkbox.label
    },
    // label的字体大小，px单位
    labelSize: {
      type: [String, Number],
      default: uni.$u.props.checkbox.labelSize
    },
    // label的颜色
    labelColor: {
      type: String,
      default: uni.$u.props.checkbox.labelColor
    },
    // 是否禁止点击提示语选中复选框
    labelDisabled: {
      type: [String, Boolean],
      default: uni.$u.props.checkbox.labelDisabled
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 484 */,
/* 485 */,
/* 486 */,
/* 487 */,
/* 488 */,
/* 489 */,
/* 490 */,
/* 491 */
/*!*****************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/components/u-picker/props.js ***!
  \*****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 是否展示picker弹窗
    show: {
      type: Boolean,
      default: uni.$u.props.picker.show
    },
    // 是否展示顶部的操作栏
    showToolbar: {
      type: Boolean,
      default: uni.$u.props.picker.showToolbar
    },
    // 顶部标题
    title: {
      type: String,
      default: uni.$u.props.picker.title
    },
    // 对象数组，设置每一列的数据
    columns: {
      type: Array,
      default: uni.$u.props.picker.columns
    },
    // 是否显示加载中状态
    loading: {
      type: Boolean,
      default: uni.$u.props.picker.loading
    },
    // 各列中，单个选项的高度
    itemHeight: {
      type: [String, Number],
      default: uni.$u.props.picker.itemHeight
    },
    // 取消按钮的文字
    cancelText: {
      type: String,
      default: uni.$u.props.picker.cancelText
    },
    // 确认按钮的文字
    confirmText: {
      type: String,
      default: uni.$u.props.picker.confirmText
    },
    // 取消按钮的颜色
    cancelColor: {
      type: String,
      default: uni.$u.props.picker.cancelColor
    },
    // 确认按钮的颜色
    confirmColor: {
      type: String,
      default: uni.$u.props.picker.confirmColor
    },
    // 选择器只有一列时，默认选中项的索引，从0开始
    singleIndex: {
      type: [String, Number],
      default: uni.$u.props.picker.singleIndex
    },
    // 每列中可见选项的数量
    visibleItemCount: {
      type: [String, Number],
      default: uni.$u.props.picker.visibleItemCount
    },
    // 选项对象中，需要展示的属性键名
    keyName: {
      type: String,
      default: uni.$u.props.picker.keyName
    },
    // 是否允许点击遮罩关闭选择器
    closeOnClickOverlay: {
      type: Boolean,
      default: uni.$u.props.picker.closeOnClickOverlay
    },
    // 各列的默认索引
    defaultIndex: {
      type: Array,
      default: uni.$u.props.picker.defaultIndex
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 492 */,
/* 493 */,
/* 494 */,
/* 495 */,
/* 496 */,
/* 497 */,
/* 498 */,
/* 499 */
/*!*******************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/components/u-textarea/props.js ***!
  \*******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 输入框的内容
    value: {
      type: [String, Number],
      default: uni.$u.props.textarea.value
    },
    // 输入框为空时占位符
    placeholder: {
      type: [String, Number],
      default: uni.$u.props.textarea.placeholder
    },
    // 指定placeholder的样式类，注意页面或组件的style中写了scoped时，需要在类名前写/deep/
    placeholderClass: {
      type: String,
      default: uni.$u.props.input.placeholderClass
    },
    // 指定placeholder的样式
    placeholderStyle: {
      type: [String, Object],
      default: uni.$u.props.input.placeholderStyle
    },
    // 输入框高度
    height: {
      type: [String, Number],
      default: uni.$u.props.textarea.height
    },
    // 设置键盘右下角按钮的文字，仅微信小程序，App-vue和H5有效
    confirmType: {
      type: String,
      default: uni.$u.props.textarea.confirmType
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: uni.$u.props.textarea.disabled
    },
    // 是否显示统计字数
    count: {
      type: Boolean,
      default: uni.$u.props.textarea.count
    },
    // 是否自动获取焦点，nvue不支持，H5取决于浏览器的实现
    focus: {
      type: Boolean,
      default: uni.$u.props.textarea.focus
    },
    // 是否自动增加高度
    autoHeight: {
      type: Boolean,
      default: uni.$u.props.textarea.autoHeight
    },
    // 如果textarea是在一个position:fixed的区域，需要显示指定属性fixed为true
    fixed: {
      type: Boolean,
      default: uni.$u.props.textarea.fixed
    },
    // 指定光标与键盘的距离
    cursorSpacing: {
      type: Number,
      default: uni.$u.props.textarea.cursorSpacing
    },
    // 指定focus时的光标位置
    cursor: {
      type: [String, Number],
      default: uni.$u.props.textarea.cursor
    },
    // 是否显示键盘上方带有”完成“按钮那一栏，
    showConfirmBar: {
      type: Boolean,
      default: uni.$u.props.textarea.showConfirmBar
    },
    // 光标起始位置，自动聚焦时有效，需与selection-end搭配使用
    selectionStart: {
      type: Number,
      default: uni.$u.props.textarea.selectionStart
    },
    // 光标结束位置，自动聚焦时有效，需与selection-start搭配使用
    selectionEnd: {
      type: Number,
      default: uni.$u.props.textarea.selectionEnd
    },
    // 键盘弹起时，是否自动上推页面
    adjustPosition: {
      type: Boolean,
      default: uni.$u.props.textarea.adjustPosition
    },
    // 是否去掉 iOS 下的默认内边距，只微信小程序有效
    disableDefaultPadding: {
      type: Boolean,
      default: uni.$u.props.textarea.disableDefaultPadding
    },
    // focus时，点击页面的时候不收起键盘，只微信小程序有效
    holdKeyboard: {
      type: Boolean,
      default: uni.$u.props.textarea.holdKeyboard
    },
    // 最大输入长度，设置为 -1 的时候不限制最大长度
    maxlength: {
      type: [String, Number],
      default: uni.$u.props.textarea.maxlength
    },
    // 边框类型，surround-四周边框，bottom-底部边框
    border: {
      type: String,
      default: uni.$u.props.textarea.border
    },
    // 用于处理或者过滤输入框内容的方法
    formatter: {
      type: [Function, null],
      default: uni.$u.props.textarea.formatter
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 500 */,
/* 501 */,
/* 502 */,
/* 503 */,
/* 504 */,
/* 505 */
/*!*****************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/components/u-upload/utils.js ***!
  \*****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, wx) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chooseFile = chooseFile;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function pickExclude(obj, keys) {
  if (!uni.$u.test.object(obj)) {
    return {};
  }
  return Object.keys(obj).reduce(function (prev, key) {
    if (!keys.includes(key)) {
      prev[key] = obj[key];
    }
    return prev;
  }, {});
}
function formatImage(res) {
  return res.tempFiles.map(function (item) {
    return _objectSpread(_objectSpread({}, pickExclude(item, ['path'])), {}, {
      type: 'image',
      url: item.path,
      thumb: item.path
    });
  });
}
function formatVideo(res) {
  return [_objectSpread(_objectSpread({}, pickExclude(res, ['tempFilePath', 'thumbTempFilePath', 'errMsg'])), {}, {
    type: 'video',
    url: res.tempFilePath,
    thumb: res.thumbTempFilePath
  })];
}
function formatMedia(res) {
  return res.tempFiles.map(function (item) {
    return _objectSpread(_objectSpread({}, pickExclude(item, ['fileType', 'thumbTempFilePath', 'tempFilePath'])), {}, {
      type: res.type,
      url: item.tempFilePath,
      thumb: res.type === 'video' ? item.thumbTempFilePath : item.tempFilePath
    });
  });
}
function formatFile(res) {
  return res.tempFiles.map(function (item) {
    return _objectSpread(_objectSpread({}, pickExclude(item, ['path'])), {}, {
      url: item.path
    });
  });
}
function chooseFile(_ref) {
  var accept = _ref.accept,
    multiple = _ref.multiple,
    capture = _ref.capture,
    compressed = _ref.compressed,
    maxDuration = _ref.maxDuration,
    sizeType = _ref.sizeType,
    camera = _ref.camera,
    maxCount = _ref.maxCount;
  return new Promise(function (resolve, reject) {
    switch (accept) {
      case 'image':
        uni.chooseImage({
          count: multiple ? Math.min(maxCount, 9) : 1,
          sourceType: capture,
          sizeType: sizeType,
          success: function success(res) {
            return resolve(formatImage(res));
          },
          fail: reject
        });
        break;

      // 只有微信小程序才支持chooseMedia接口
      case 'media':
        wx.chooseMedia({
          count: multiple ? Math.min(maxCount, 9) : 1,
          sourceType: capture,
          maxDuration: maxDuration,
          sizeType: sizeType,
          camera: camera,
          success: function success(res) {
            return resolve(formatMedia(res));
          },
          fail: reject
        });
        break;
      case 'video':
        uni.chooseVideo({
          sourceType: capture,
          compressed: compressed,
          maxDuration: maxDuration,
          camera: camera,
          success: function success(res) {
            return resolve(formatVideo(res));
          },
          fail: reject
        });
        break;

      // 只有微信小程序才支持chooseMessageFile接口
      case 'file':
        wx.chooseMessageFile({
          count: multiple ? maxCount : 1,
          type: accept,
          success: function success(res) {
            return resolve(formatFile(res));
          },
          fail: reject
        });
        break;
    }
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"]))

/***/ }),
/* 506 */
/*!*****************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/components/u-upload/mixin.js ***!
  \*****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  watch: {
    // 监听accept的变化，判断是否符合个平台要求
    // 只有微信小程序才支持选择媒体，文件类型，所以这里做一个判断提示
    accept: {
      immediate: true,
      handler: function handler(val) {}
    }
  }
};
exports.default = _default;

/***/ }),
/* 507 */
/*!*****************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/components/u-upload/props.js ***!
  \*****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 接受的文件类型, 可选值为all media image file video
    accept: {
      type: String,
      default: uni.$u.props.upload.accept
    },
    // 	图片或视频拾取模式，当accept为image类型时设置capture可选额外camera可以直接调起摄像头
    capture: {
      type: [String, Array],
      default: uni.$u.props.upload.capture
    },
    // 当accept为video时生效，是否压缩视频，默认为true
    compressed: {
      type: Boolean,
      default: uni.$u.props.upload.compressed
    },
    // 当accept为video时生效，可选值为back或front
    camera: {
      type: String,
      default: uni.$u.props.upload.camera
    },
    // 当accept为video时生效，拍摄视频最长拍摄时间，单位秒
    maxDuration: {
      type: Number,
      value: uni.$u.props.upload.maxDuration
    },
    // 上传区域的图标，只能内置图标
    uploadIcon: {
      type: String,
      default: uni.$u.props.upload.uploadIcon
    },
    // 上传区域的图标的颜色，默认
    uploadIconColor: {
      type: String,
      default: uni.$u.props.upload.uploadIconColor
    },
    // 是否开启文件读取前事件
    useBeforeRead: {
      type: Boolean,
      default: uni.$u.props.upload.useBeforeRead
    },
    // 读取后的处理函数
    afterRead: {
      type: Function,
      default: null
    },
    // 读取前的处理函数
    beforeRead: {
      type: Function,
      default: null
    },
    // 是否显示组件自带的图片预览功能
    previewFullImage: {
      type: Boolean,
      default: uni.$u.props.upload.previewFullImage
    },
    // 最大上传数量
    maxCount: {
      type: [String, Number],
      default: uni.$u.props.upload.maxCount
    },
    // 是否启用
    disabled: {
      type: Boolean,
      default: uni.$u.props.upload.disabled
    },
    // 预览上传的图片时的裁剪模式，和image组件mode属性一致
    imageMode: {
      type: String,
      default: uni.$u.props.upload.imageMode
    },
    // 标识符，可以在回调函数的第二项参数中获取
    name: {
      type: String,
      default: uni.$u.props.upload.name
    },
    // 所选的图片的尺寸, 可选值为original compressed
    sizeType: {
      type: Array,
      default: uni.$u.props.upload.sizeType
    },
    // 是否开启图片多选，部分安卓机型不支持
    multiple: {
      type: Boolean,
      default: uni.$u.props.upload.multiple
    },
    // 是否展示删除按钮
    deletable: {
      type: Boolean,
      default: uni.$u.props.upload.deletable
    },
    // 文件大小限制，单位为byte
    maxSize: {
      type: [String, Number],
      default: uni.$u.props.upload.maxSize
    },
    // 显示已上传的文件列表
    fileList: {
      type: Array,
      default: uni.$u.props.upload.fileList
    },
    // 上传区域的提示文字
    uploadText: {
      type: String,
      default: uni.$u.props.upload.uploadText
    },
    // 内部预览图片区域和选择图片按钮的区域宽度
    width: {
      type: [String, Number],
      default: uni.$u.props.upload.width
    },
    // 内部预览图片区域和选择图片按钮的区域高度
    height: {
      type: [String, Number],
      default: uni.$u.props.upload.height
    },
    // 是否在上传完成后展示预览图
    previewImage: {
      type: Boolean,
      default: uni.$u.props.upload.previewImage
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 508 */,
/* 509 */,
/* 510 */,
/* 511 */,
/* 512 */,
/* 513 */,
/* 514 */,
/* 515 */
/*!****************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/components/u-album/props.js ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 图片地址，Array<String>|Array<Object>形式
    urls: {
      type: Array,
      default: uni.$u.props.album.urls
    },
    // 指定从数组的对象元素中读取哪个属性作为图片地址
    keyName: {
      type: String,
      default: uni.$u.props.album.keyName
    },
    // 单图时，图片长边的长度
    singleSize: {
      type: [String, Number],
      default: uni.$u.props.album.singleSize
    },
    // 多图时，图片边长
    multipleSize: {
      type: [String, Number],
      default: uni.$u.props.album.multipleSize
    },
    // 多图时，图片水平和垂直之间的间隔
    space: {
      type: [String, Number],
      default: uni.$u.props.album.space
    },
    // 单图时，图片缩放裁剪的模式
    singleMode: {
      type: String,
      default: uni.$u.props.album.singleMode
    },
    // 多图时，图片缩放裁剪的模式
    multipleMode: {
      type: String,
      default: uni.$u.props.album.multipleMode
    },
    // 最多展示的图片数量，超出时最后一个位置将会显示剩余图片数量
    maxCount: {
      type: [String, Number],
      default: uni.$u.props.album.maxCount
    },
    // 是否可以预览图片
    previewFullImage: {
      type: Boolean,
      default: uni.$u.props.album.previewFullImage
    },
    // 每行展示图片数量，如设置，singleSize和multipleSize将会无效
    rowCount: {
      type: [String, Number],
      default: uni.$u.props.album.rowCount
    },
    // 超出maxCount时是否显示查看更多的提示
    showMore: {
      type: Boolean,
      default: uni.$u.props.album.showMore
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 516 */,
/* 517 */,
/* 518 */,
/* 519 */,
/* 520 */,
/* 521 */,
/* 522 */,
/* 523 */
/*!**********************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/components/u-radio-group/props.js ***!
  \**********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 绑定的值
    value: {
      type: [String, Number, Boolean],
      default: uni.$u.props.radioGroup.value
    },
    // 是否禁用全部radio
    disabled: {
      type: Boolean,
      default: uni.$u.props.radioGroup.disabled
    },
    // 形状，circle-圆形，square-方形
    shape: {
      type: String,
      default: uni.$u.props.radioGroup.shape
    },
    // 选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值
    activeColor: {
      type: String,
      default: uni.$u.props.radioGroup.activeColor
    },
    // 未选中的颜色
    inactiveColor: {
      type: String,
      default: uni.$u.props.radioGroup.inactiveColor
    },
    // 标识符
    name: {
      type: String,
      default: uni.$u.props.radioGroup.name
    },
    // 整个组件的尺寸，默认px
    size: {
      type: [String, Number],
      default: uni.$u.props.radioGroup.size
    },
    // 布局方式，row-横向，column-纵向
    placement: {
      type: String,
      default: uni.$u.props.radioGroup.placement
    },
    // label的文本
    label: {
      type: [String],
      default: uni.$u.props.radioGroup.label
    },
    // label的颜色 （默认 '#303133' ）
    labelColor: {
      type: [String],
      default: uni.$u.props.radioGroup.labelColor
    },
    // label的字体大小，px单位
    labelSize: {
      type: [String, Number],
      default: uni.$u.props.radioGroup.labelSize
    },
    // 是否禁止点击文本操作checkbox(默认 false )
    labelDisabled: {
      type: Boolean,
      default: uni.$u.props.radioGroup.labelDisabled
    },
    // 图标颜色
    iconColor: {
      type: String,
      default: uni.$u.props.radioGroup.iconColor
    },
    // 图标的大小，单位px
    iconSize: {
      type: [String, Number],
      default: uni.$u.props.radioGroup.iconSize
    },
    // 竖向配列时，是否显示下划线
    borderBottom: {
      type: Boolean,
      default: uni.$u.props.radioGroup.borderBottom
    },
    // 图标与文字的对齐方式
    iconPlacement: {
      type: String,
      default: uni.$u.props.radio.iconPlacement
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 524 */,
/* 525 */,
/* 526 */,
/* 527 */,
/* 528 */,
/* 529 */,
/* 530 */,
/* 531 */
/*!****************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/components/u-radio/props.js ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // radio的名称
    name: {
      type: [String, Number, Boolean],
      default: uni.$u.props.radio.name
    },
    // 形状，square为方形，circle为圆型
    shape: {
      type: String,
      default: uni.$u.props.radio.shape
    },
    // 是否禁用
    disabled: {
      type: [String, Boolean],
      default: uni.$u.props.radio.disabled
    },
    // 是否禁止点击提示语选中单选框
    labelDisabled: {
      type: [String, Boolean],
      default: uni.$u.props.radio.labelDisabled
    },
    // 选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值
    activeColor: {
      type: String,
      default: uni.$u.props.radio.activeColor
    },
    // 未选中的颜色
    inactiveColor: {
      type: String,
      default: uni.$u.props.radio.inactiveColor
    },
    // 图标的大小，单位px
    iconSize: {
      type: [String, Number],
      default: uni.$u.props.radio.iconSize
    },
    // label的字体大小，px单位
    labelSize: {
      type: [String, Number],
      default: uni.$u.props.radio.labelSize
    },
    // label提示文字，因为nvue下，直接slot进来的文字，由于特殊的结构，无法修改样式
    label: {
      type: [String, Number],
      default: uni.$u.props.radio.label
    },
    // 整体的大小
    size: {
      type: [String, Number],
      default: uni.$u.props.radio.size
    },
    // 图标颜色
    color: {
      type: String,
      default: uni.$u.props.radio.color
    },
    // label的颜色
    labelColor: {
      type: String,
      default: uni.$u.props.radio.labelColor
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 532 */,
/* 533 */,
/* 534 */,
/* 535 */,
/* 536 */,
/* 537 */,
/* 538 */,
/* 539 */
/*!****************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/components/u-input/props.js ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 输入的值
    value: {
      type: [String, Number],
      default: uni.$u.props.input.value
    },
    // 输入框类型
    // number-数字输入键盘，app-vue下可以输入浮点数，app-nvue和小程序平台下只能输入整数
    // idcard-身份证输入键盘，微信、支付宝、百度、QQ小程序
    // digit-带小数点的数字键盘，App的nvue页面、微信、支付宝、百度、头条、QQ小程序
    // text-文本输入键盘
    type: {
      type: String,
      default: uni.$u.props.input.type
    },
    // 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true，
    // 兼容性：微信小程序、百度小程序、字节跳动小程序、QQ小程序
    fixed: {
      type: Boolean,
      default: uni.$u.props.input.fixed
    },
    // 是否禁用输入框
    disabled: {
      type: Boolean,
      default: uni.$u.props.input.disabled
    },
    // 禁用状态时的背景色
    disabledColor: {
      type: String,
      default: uni.$u.props.input.disabledColor
    },
    // 是否显示清除控件
    clearable: {
      type: Boolean,
      default: uni.$u.props.input.clearable
    },
    // 是否密码类型
    password: {
      type: Boolean,
      default: uni.$u.props.input.password
    },
    // 最大输入长度，设置为 -1 的时候不限制最大长度
    maxlength: {
      type: [String, Number],
      default: uni.$u.props.input.maxlength
    },
    // 	输入框为空时的占位符
    placeholder: {
      type: String,
      default: uni.$u.props.input.placeholder
    },
    // 指定placeholder的样式类，注意页面或组件的style中写了scoped时，需要在类名前写/deep/
    placeholderClass: {
      type: String,
      default: uni.$u.props.input.placeholderClass
    },
    // 指定placeholder的样式
    placeholderStyle: {
      type: [String, Object],
      default: uni.$u.props.input.placeholderStyle
    },
    // 是否显示输入字数统计，只在 type ="text"或type ="textarea"时有效
    showWordLimit: {
      type: Boolean,
      default: uni.$u.props.input.showWordLimit
    },
    // 设置右下角按钮的文字，有效值：send|search|next|go|done，兼容性详见uni-app文档
    // https://uniapp.dcloud.io/component/input
    // https://uniapp.dcloud.io/component/textarea
    confirmType: {
      type: String,
      default: uni.$u.props.input.confirmType
    },
    // 点击键盘右下角按钮时是否保持键盘不收起，H5无效
    confirmHold: {
      type: Boolean,
      default: uni.$u.props.input.confirmHold
    },
    // focus时，点击页面的时候不收起键盘，微信小程序有效
    holdKeyboard: {
      type: Boolean,
      default: uni.$u.props.input.holdKeyboard
    },
    // 自动获取焦点
    // 在 H5 平台能否聚焦以及软键盘是否跟随弹出，取决于当前浏览器本身的实现。nvue 页面不支持，需使用组件的 focus()、blur() 方法控制焦点
    focus: {
      type: Boolean,
      default: uni.$u.props.input.focus
    },
    // 键盘收起时，是否自动失去焦点，目前仅App3.0.0+有效
    autoBlur: {
      type: Boolean,
      default: uni.$u.props.input.autoBlur
    },
    // 是否去掉 iOS 下的默认内边距，仅微信小程序，且type=textarea时有效
    disableDefaultPadding: {
      type: Boolean,
      default: uni.$u.props.input.disableDefaultPadding
    },
    // 指定focus时光标的位置
    cursor: {
      type: [String, Number],
      default: uni.$u.props.input.cursor
    },
    // 输入框聚焦时底部与键盘的距离
    cursorSpacing: {
      type: [String, Number],
      default: uni.$u.props.input.cursorSpacing
    },
    // 光标起始位置，自动聚集时有效，需与selection-end搭配使用
    selectionStart: {
      type: [String, Number],
      default: uni.$u.props.input.selectionStart
    },
    // 光标结束位置，自动聚集时有效，需与selection-start搭配使用
    selectionEnd: {
      type: [String, Number],
      default: uni.$u.props.input.selectionEnd
    },
    // 键盘弹起时，是否自动上推页面
    adjustPosition: {
      type: Boolean,
      default: uni.$u.props.input.adjustPosition
    },
    // 输入框内容对齐方式，可选值为：left|center|right
    inputAlign: {
      type: String,
      default: uni.$u.props.input.inputAlign
    },
    // 输入框字体的大小
    fontSize: {
      type: [String, Number],
      default: uni.$u.props.input.fontSize
    },
    // 输入框字体颜色
    color: {
      type: String,
      default: uni.$u.props.input.color
    },
    // 输入框前置图标
    prefixIcon: {
      type: String,
      default: uni.$u.props.input.prefixIcon
    },
    // 前置图标样式，对象或字符串
    prefixIconStyle: {
      type: [String, Object],
      default: uni.$u.props.input.prefixIconStyle
    },
    // 输入框后置图标
    suffixIcon: {
      type: String,
      default: uni.$u.props.input.suffixIcon
    },
    // 后置图标样式，对象或字符串
    suffixIconStyle: {
      type: [String, Object],
      default: uni.$u.props.input.suffixIconStyle
    },
    // 边框类型，surround-四周边框，bottom-底部边框，none-无边框
    border: {
      type: String,
      default: uni.$u.props.input.border
    },
    // 是否只读，与disabled不同之处在于disabled会置灰组件，而readonly则不会
    readonly: {
      type: Boolean,
      default: uni.$u.props.input.readonly
    },
    // 输入框形状，circle-圆形，square-方形
    shape: {
      type: String,
      default: uni.$u.props.input.shape
    },
    // 用于处理或者过滤输入框内容的方法
    formatter: {
      type: [Function, null],
      default: uni.$u.props.input.formatter
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 540 */,
/* 541 */,
/* 542 */,
/* 543 */,
/* 544 */,
/* 545 */,
/* 546 */,
/* 547 */,
/* 548 */,
/* 549 */,
/* 550 */,
/* 551 */,
/* 552 */,
/* 553 */,
/* 554 */
/*!*********************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/components/u-notice-bar/props.js ***!
  \*********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 显示的内容，数组
    text: {
      type: [Array, String],
      default: uni.$u.props.noticeBar.text
    },
    // 通告滚动模式，row-横向滚动，column-竖向滚动
    direction: {
      type: String,
      default: uni.$u.props.noticeBar.direction
    },
    // direction = row时，是否使用步进形式滚动
    step: {
      type: Boolean,
      default: uni.$u.props.noticeBar.step
    },
    // 是否显示左侧的音量图标
    icon: {
      type: String,
      default: uni.$u.props.noticeBar.icon
    },
    // 通告模式，link-显示右箭头，closable-显示右侧关闭图标
    mode: {
      type: String,
      default: uni.$u.props.noticeBar.mode
    },
    // 文字颜色，各图标也会使用文字颜色
    color: {
      type: String,
      default: uni.$u.props.noticeBar.color
    },
    // 背景颜色
    bgColor: {
      type: String,
      default: uni.$u.props.noticeBar.bgColor
    },
    // 水平滚动时的滚动速度，即每秒滚动多少px(px)，这有利于控制文字无论多少时，都能有一个恒定的速度
    speed: {
      type: [String, Number],
      default: uni.$u.props.noticeBar.speed
    },
    // 字体大小
    fontSize: {
      type: [String, Number],
      default: uni.$u.props.noticeBar.fontSize
    },
    // 滚动一个周期的时间长，单位ms
    duration: {
      type: [String, Number],
      default: uni.$u.props.noticeBar.duration
    },
    // 是否禁止用手滑动切换
    // 目前HX2.6.11，只支持App 2.5.5+、H5 2.5.5+、支付宝小程序、字节跳动小程序
    disableTouch: {
      type: Boolean,
      default: uni.$u.props.noticeBar.disableTouch
    },
    // 跳转的页面路径
    url: {
      type: String,
      default: uni.$u.props.noticeBar.url
    },
    // 页面跳转的类型
    linkType: {
      type: String,
      default: uni.$u.props.noticeBar.linkType
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 555 */,
/* 556 */,
/* 557 */,
/* 558 */,
/* 559 */,
/* 560 */,
/* 561 */,
/* 562 */
/*!*****************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/components/u-switch/props.js ***!
  \*****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 是否为加载中状态
    loading: {
      type: Boolean,
      default: uni.$u.props.switch.loading
    },
    // 是否为禁用装填
    disabled: {
      type: Boolean,
      default: uni.$u.props.switch.disabled
    },
    // 开关尺寸，单位px
    size: {
      type: [String, Number],
      default: uni.$u.props.switch.size
    },
    // 打开时的背景颜色
    activeColor: {
      type: String,
      default: uni.$u.props.switch.activeColor
    },
    // 关闭时的背景颜色
    inactiveColor: {
      type: String,
      default: uni.$u.props.switch.inactiveColor
    },
    // 通过v-model双向绑定的值
    value: {
      type: [Boolean, String, Number],
      default: uni.$u.props.switch.value
    },
    // 打开选择器时的值
    activeValue: {
      type: [String, Number, Boolean],
      default: uni.$u.props.switch.activeValue
    },
    // 关闭选择器时的值
    inactiveValue: {
      type: [String, Number, Boolean],
      default: uni.$u.props.switch.inactiveValue
    },
    // 是否开启异步变更，开启后需要手动控制输入值
    asyncChange: {
      type: Boolean,
      default: uni.$u.props.switch.asyncChange
    },
    // 圆点与外边框的距离
    space: {
      type: [String, Number],
      default: uni.$u.props.switch.space
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 563 */,
/* 564 */,
/* 565 */,
/* 566 */,
/* 567 */,
/* 568 */,
/* 569 */,
/* 570 */
/*!*****************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/util/async-validator.js ***!
  \*****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

/* eslint no-console:0 */
var formatRegExp = /%[sdj%]/g;
var warning = function warning() {}; // don't print warning message when in production env or node runtime

if (typeof process !== 'undefined' && Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"SecondHandMall_before","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}) && "development" !== 'production' && typeof window !== 'undefined' && typeof document !== 'undefined') {
  warning = function warning(type, errors) {
    if (typeof console !== 'undefined' && console.warn) {
      if (errors.every(function (e) {
        return typeof e === 'string';
      })) {
        console.warn(type, errors);
      }
    }
  };
}
function convertFieldsError(errors) {
  if (!errors || !errors.length) return null;
  var fields = {};
  errors.forEach(function (error) {
    var field = error.field;
    fields[field] = fields[field] || [];
    fields[field].push(error);
  });
  return fields;
}
function format() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var i = 1;
  var f = args[0];
  var len = args.length;
  if (typeof f === 'function') {
    return f.apply(null, args.slice(1));
  }
  if (typeof f === 'string') {
    var str = String(f).replace(formatRegExp, function (x) {
      if (x === '%%') {
        return '%';
      }
      if (i >= len) {
        return x;
      }
      switch (x) {
        case '%s':
          return String(args[i++]);
        case '%d':
          return Number(args[i++]);
        case '%j':
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return '[Circular]';
          }
          break;
        default:
          return x;
      }
    });
    for (var arg = args[i]; i < len; arg = args[++i]) {
      str += " ".concat(arg);
    }
    return str;
  }
  return f;
}
function isNativeStringType(type) {
  return type === 'string' || type === 'url' || type === 'hex' || type === 'email' || type === 'pattern';
}
function isEmptyValue(value, type) {
  if (value === undefined || value === null) {
    return true;
  }
  if (type === 'array' && Array.isArray(value) && !value.length) {
    return true;
  }
  if (isNativeStringType(type) && typeof value === 'string' && !value) {
    return true;
  }
  return false;
}
function asyncParallelArray(arr, func, callback) {
  var results = [];
  var total = 0;
  var arrLength = arr.length;
  function count(errors) {
    results.push.apply(results, errors);
    total++;
    if (total === arrLength) {
      callback(results);
    }
  }
  arr.forEach(function (a) {
    func(a, count);
  });
}
function asyncSerialArray(arr, func, callback) {
  var index = 0;
  var arrLength = arr.length;
  function next(errors) {
    if (errors && errors.length) {
      callback(errors);
      return;
    }
    var original = index;
    index += 1;
    if (original < arrLength) {
      func(arr[original], next);
    } else {
      callback([]);
    }
  }
  next([]);
}
function flattenObjArr(objArr) {
  var ret = [];
  Object.keys(objArr).forEach(function (k) {
    ret.push.apply(ret, objArr[k]);
  });
  return ret;
}
function asyncMap(objArr, option, func, callback) {
  if (option.first) {
    var _pending = new Promise(function (resolve, reject) {
      var next = function next(errors) {
        callback(errors);
        return errors.length ? reject({
          errors: errors,
          fields: convertFieldsError(errors)
        }) : resolve();
      };
      var flattenArr = flattenObjArr(objArr);
      asyncSerialArray(flattenArr, func, next);
    });
    _pending.catch(function (e) {
      return e;
    });
    return _pending;
  }
  var firstFields = option.firstFields || [];
  if (firstFields === true) {
    firstFields = Object.keys(objArr);
  }
  var objArrKeys = Object.keys(objArr);
  var objArrLength = objArrKeys.length;
  var total = 0;
  var results = [];
  var pending = new Promise(function (resolve, reject) {
    var next = function next(errors) {
      results.push.apply(results, errors);
      total++;
      if (total === objArrLength) {
        callback(results);
        return results.length ? reject({
          errors: results,
          fields: convertFieldsError(results)
        }) : resolve();
      }
    };
    if (!objArrKeys.length) {
      callback(results);
      resolve();
    }
    objArrKeys.forEach(function (key) {
      var arr = objArr[key];
      if (firstFields.indexOf(key) !== -1) {
        asyncSerialArray(arr, func, next);
      } else {
        asyncParallelArray(arr, func, next);
      }
    });
  });
  pending.catch(function (e) {
    return e;
  });
  return pending;
}
function complementError(rule) {
  return function (oe) {
    if (oe && oe.message) {
      oe.field = oe.field || rule.fullField;
      return oe;
    }
    return {
      message: typeof oe === 'function' ? oe() : oe,
      field: oe.field || rule.fullField
    };
  };
}
function deepMerge(target, source) {
  if (source) {
    for (var s in source) {
      if (source.hasOwnProperty(s)) {
        var value = source[s];
        if ((0, _typeof2.default)(value) === 'object' && (0, _typeof2.default)(target[s]) === 'object') {
          target[s] = _objectSpread(_objectSpread({}, target[s]), value);
        } else {
          target[s] = value;
        }
      }
    }
  }
  return target;
}

/**
 *  Rule for validating required fields.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function required(rule, value, source, errors, options, type) {
  if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue(value, type || rule.type))) {
    errors.push(format(options.messages.required, rule.fullField));
  }
}

/**
 *  Rule for validating whitespace.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function whitespace(rule, value, source, errors, options) {
  if (/^\s+$/.test(value) || value === '') {
    errors.push(format(options.messages.whitespace, rule.fullField));
  }
}

/* eslint max-len:0 */

var pattern = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  url: new RegExp("^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$", 'i'),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
};
var types = {
  integer: function integer(value) {
    return types.number(value) && parseInt(value, 10) === value;
  },
  float: function float(value) {
    return types.number(value) && !types.integer(value);
  },
  array: function array(value) {
    return Array.isArray(value);
  },
  regexp: function regexp(value) {
    if (value instanceof RegExp) {
      return true;
    }
    try {
      return !!new RegExp(value);
    } catch (e) {
      return false;
    }
  },
  date: function date(value) {
    return typeof value.getTime === 'function' && typeof value.getMonth === 'function' && typeof value.getYear === 'function';
  },
  number: function number(value) {
    if (isNaN(value)) {
      return false;
    }

    // 修改源码，将字符串数值先转为数值
    return typeof +value === 'number';
  },
  object: function object(value) {
    return (0, _typeof2.default)(value) === 'object' && !types.array(value);
  },
  method: function method(value) {
    return typeof value === 'function';
  },
  email: function email(value) {
    return typeof value === 'string' && !!value.match(pattern.email) && value.length < 255;
  },
  url: function url(value) {
    return typeof value === 'string' && !!value.match(pattern.url);
  },
  hex: function hex(value) {
    return typeof value === 'string' && !!value.match(pattern.hex);
  }
};
/**
 *  Rule for validating the type of a value.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function type(rule, value, source, errors, options) {
  if (rule.required && value === undefined) {
    required(rule, value, source, errors, options);
    return;
  }
  var custom = ['integer', 'float', 'array', 'regexp', 'object', 'method', 'email', 'number', 'date', 'url', 'hex'];
  var ruleType = rule.type;
  if (custom.indexOf(ruleType) > -1) {
    if (!types[ruleType](value)) {
      errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
    } // straight typeof check
  } else if (ruleType && (0, _typeof2.default)(value) !== rule.type) {
    errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
  }
}

/**
 *  Rule for validating minimum and maximum allowed values.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function range(rule, value, source, errors, options) {
  var len = typeof rule.len === 'number';
  var min = typeof rule.min === 'number';
  var max = typeof rule.max === 'number'; // 正则匹配码点范围从U+010000一直到U+10FFFF的文字（补充平面Supplementary Plane）

  var spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  var val = value;
  var key = null;
  var num = typeof value === 'number';
  var str = typeof value === 'string';
  var arr = Array.isArray(value);
  if (num) {
    key = 'number';
  } else if (str) {
    key = 'string';
  } else if (arr) {
    key = 'array';
  } // if the value is not of a supported type for range validation
  // the validation rule rule should use the
  // type property to also test for a particular type

  if (!key) {
    return false;
  }
  if (arr) {
    val = value.length;
  }
  if (str) {
    // 处理码点大于U+010000的文字length属性不准确的bug，如"𠮷𠮷𠮷".lenght !== 3
    val = value.replace(spRegexp, '_').length;
  }
  if (len) {
    if (val !== rule.len) {
      errors.push(format(options.messages[key].len, rule.fullField, rule.len));
    }
  } else if (min && !max && val < rule.min) {
    errors.push(format(options.messages[key].min, rule.fullField, rule.min));
  } else if (max && !min && val > rule.max) {
    errors.push(format(options.messages[key].max, rule.fullField, rule.max));
  } else if (min && max && (val < rule.min || val > rule.max)) {
    errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max));
  }
}
var ENUM = 'enum';
/**
 *  Rule for validating a value exists in an enumerable list.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function enumerable(rule, value, source, errors, options) {
  rule[ENUM] = Array.isArray(rule[ENUM]) ? rule[ENUM] : [];
  if (rule[ENUM].indexOf(value) === -1) {
    errors.push(format(options.messages[ENUM], rule.fullField, rule[ENUM].join(', ')));
  }
}

/**
 *  Rule for validating a regular expression pattern.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function pattern$1(rule, value, source, errors, options) {
  if (rule.pattern) {
    if (rule.pattern instanceof RegExp) {
      // if a RegExp instance is passed, reset `lastIndex` in case its `global`
      // flag is accidentally set to `true`, which in a validation scenario
      // is not necessary and the result might be misleading
      rule.pattern.lastIndex = 0;
      if (!rule.pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    } else if (typeof rule.pattern === 'string') {
      var _pattern = new RegExp(rule.pattern);
      if (!_pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    }
  }
}
var rules = {
  required: required,
  whitespace: whitespace,
  type: type,
  range: range,
  enum: enumerable,
  pattern: pattern$1
};

/**
 *  Performs validation for string types.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function string(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options, 'string');
    if (!isEmptyValue(value, 'string')) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
      rules.pattern(rule, value, source, errors, options);
      if (rule.whitespace === true) {
        rules.whitespace(rule, value, source, errors, options);
      }
    }
  }
  callback(errors);
}

/**
 *  Validates a function.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function method(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/**
 *  Validates a number.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function number(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (value === '') {
      value = undefined;
    }
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/**
 *  Validates a boolean.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function _boolean(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/**
 *  Validates the regular expression type.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function regexp(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (!isEmptyValue(value)) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/**
 *  Validates a number is an integer.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function integer(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/**
 *  Validates a number is a floating point number.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function floatFn(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/**
 *  Validates an array.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function array(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value, 'array') && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options, 'array');
    if (!isEmptyValue(value, 'array')) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/**
 *  Validates an object.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function object(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
}
var ENUM$1 = 'enum';
/**
 *  Validates an enumerable list.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function enumerable$1(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== undefined) {
      rules[ENUM$1](rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/**
 *  Validates a regular expression pattern.
 *
 *  Performs validation when a rule only contains
 *  a pattern property but is not declared as a string type.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function pattern$2(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (!isEmptyValue(value, 'string')) {
      rules.pattern(rule, value, source, errors, options);
    }
  }
  callback(errors);
}
function date(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (!isEmptyValue(value)) {
      var dateObject;
      if (typeof value === 'number') {
        dateObject = new Date(value);
      } else {
        dateObject = value;
      }
      rules.type(rule, dateObject, source, errors, options);
      if (dateObject) {
        rules.range(rule, dateObject.getTime(), source, errors, options);
      }
    }
  }
  callback(errors);
}
function required$1(rule, value, callback, source, options) {
  var errors = [];
  var type = Array.isArray(value) ? 'array' : (0, _typeof2.default)(value);
  rules.required(rule, value, source, errors, options, type);
  callback(errors);
}
function type$1(rule, value, callback, source, options) {
  var ruleType = rule.type;
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value, ruleType) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options, ruleType);
    if (!isEmptyValue(value, ruleType)) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/**
 *  Performs validation for any type.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function any(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
  }
  callback(errors);
}
var validators = {
  string: string,
  method: method,
  number: number,
  boolean: _boolean,
  regexp: regexp,
  integer: integer,
  float: floatFn,
  array: array,
  object: object,
  enum: enumerable$1,
  pattern: pattern$2,
  date: date,
  url: type$1,
  hex: type$1,
  email: type$1,
  required: required$1,
  any: any
};
function newMessages() {
  return {
    default: 'Validation error on field %s',
    required: '%s is required',
    enum: '%s must be one of %s',
    whitespace: '%s cannot be empty',
    date: {
      format: '%s date %s is invalid for format %s',
      parse: '%s date could not be parsed, %s is invalid ',
      invalid: '%s date %s is invalid'
    },
    types: {
      string: '%s is not a %s',
      method: '%s is not a %s (function)',
      array: '%s is not an %s',
      object: '%s is not an %s',
      number: '%s is not a %s',
      date: '%s is not a %s',
      boolean: '%s is not a %s',
      integer: '%s is not an %s',
      float: '%s is not a %s',
      regexp: '%s is not a valid %s',
      email: '%s is not a valid %s',
      url: '%s is not a valid %s',
      hex: '%s is not a valid %s'
    },
    string: {
      len: '%s must be exactly %s characters',
      min: '%s must be at least %s characters',
      max: '%s cannot be longer than %s characters',
      range: '%s must be between %s and %s characters'
    },
    number: {
      len: '%s must equal %s',
      min: '%s cannot be less than %s',
      max: '%s cannot be greater than %s',
      range: '%s must be between %s and %s'
    },
    array: {
      len: '%s must be exactly %s in length',
      min: '%s cannot be less than %s in length',
      max: '%s cannot be greater than %s in length',
      range: '%s must be between %s and %s in length'
    },
    pattern: {
      mismatch: '%s value %s does not match pattern %s'
    },
    clone: function clone() {
      var cloned = JSON.parse(JSON.stringify(this));
      cloned.clone = this.clone;
      return cloned;
    }
  };
}
var messages = newMessages();

/**
 *  Encapsulates a validation schema.
 *
 *  @param descriptor An object declaring validation rules
 *  for this schema.
 */

function Schema(descriptor) {
  this.rules = null;
  this._messages = messages;
  this.define(descriptor);
}
Schema.prototype = {
  messages: function messages(_messages) {
    if (_messages) {
      this._messages = deepMerge(newMessages(), _messages);
    }
    return this._messages;
  },
  define: function define(rules) {
    if (!rules) {
      throw new Error('Cannot configure a schema with no rules');
    }
    if ((0, _typeof2.default)(rules) !== 'object' || Array.isArray(rules)) {
      throw new Error('Rules must be an object');
    }
    this.rules = {};
    var z;
    var item;
    for (z in rules) {
      if (rules.hasOwnProperty(z)) {
        item = rules[z];
        this.rules[z] = Array.isArray(item) ? item : [item];
      }
    }
  },
  validate: function validate(source_, o, oc) {
    var _this = this;
    if (o === void 0) {
      o = {};
    }
    if (oc === void 0) {
      oc = function oc() {};
    }
    var source = source_;
    var options = o;
    var callback = oc;
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    if (!this.rules || Object.keys(this.rules).length === 0) {
      if (callback) {
        callback();
      }
      return Promise.resolve();
    }
    function complete(results) {
      var i;
      var errors = [];
      var fields = {};
      function add(e) {
        if (Array.isArray(e)) {
          var _errors;
          errors = (_errors = errors).concat.apply(_errors, e);
        } else {
          errors.push(e);
        }
      }
      for (i = 0; i < results.length; i++) {
        add(results[i]);
      }
      if (!errors.length) {
        errors = null;
        fields = null;
      } else {
        fields = convertFieldsError(errors);
      }
      callback(errors, fields);
    }
    if (options.messages) {
      var messages$1 = this.messages();
      if (messages$1 === messages) {
        messages$1 = newMessages();
      }
      deepMerge(messages$1, options.messages);
      options.messages = messages$1;
    } else {
      options.messages = this.messages();
    }
    var arr;
    var value;
    var series = {};
    var keys = options.keys || Object.keys(this.rules);
    keys.forEach(function (z) {
      arr = _this.rules[z];
      value = source[z];
      arr.forEach(function (r) {
        var rule = r;
        if (typeof rule.transform === 'function') {
          if (source === source_) {
            source = _objectSpread({}, source);
          }
          value = source[z] = rule.transform(value);
        }
        if (typeof rule === 'function') {
          rule = {
            validator: rule
          };
        } else {
          rule = _objectSpread({}, rule);
        }
        rule.validator = _this.getValidationMethod(rule);
        rule.field = z;
        rule.fullField = rule.fullField || z;
        rule.type = _this.getType(rule);
        if (!rule.validator) {
          return;
        }
        series[z] = series[z] || [];
        series[z].push({
          rule: rule,
          value: value,
          source: source,
          field: z
        });
      });
    });
    var errorFields = {};
    return asyncMap(series, options, function (data, doIt) {
      var rule = data.rule;
      var deep = (rule.type === 'object' || rule.type === 'array') && ((0, _typeof2.default)(rule.fields) === 'object' || (0, _typeof2.default)(rule.defaultField) === 'object');
      deep = deep && (rule.required || !rule.required && data.value);
      rule.field = data.field;
      function addFullfield(key, schema) {
        return _objectSpread(_objectSpread({}, schema), {}, {
          fullField: "".concat(rule.fullField, ".").concat(key)
        });
      }
      function cb(e) {
        if (e === void 0) {
          e = [];
        }
        var errors = e;
        if (!Array.isArray(errors)) {
          errors = [errors];
        }
        if (!options.suppressWarning && errors.length) {
          Schema.warning('async-validator:', errors);
        }
        if (errors.length && rule.message) {
          errors = [].concat(rule.message);
        }
        errors = errors.map(complementError(rule));
        if (options.first && errors.length) {
          errorFields[rule.field] = 1;
          return doIt(errors);
        }
        if (!deep) {
          doIt(errors);
        } else {
          // if rule is required but the target object
          // does not exist fail at the rule level and don't
          // go deeper
          if (rule.required && !data.value) {
            if (rule.message) {
              errors = [].concat(rule.message).map(complementError(rule));
            } else if (options.error) {
              errors = [options.error(rule, format(options.messages.required, rule.field))];
            } else {
              errors = [];
            }
            return doIt(errors);
          }
          var fieldsSchema = {};
          if (rule.defaultField) {
            for (var k in data.value) {
              if (data.value.hasOwnProperty(k)) {
                fieldsSchema[k] = rule.defaultField;
              }
            }
          }
          fieldsSchema = _objectSpread(_objectSpread({}, fieldsSchema), data.rule.fields);
          for (var f in fieldsSchema) {
            if (fieldsSchema.hasOwnProperty(f)) {
              var fieldSchema = Array.isArray(fieldsSchema[f]) ? fieldsSchema[f] : [fieldsSchema[f]];
              fieldsSchema[f] = fieldSchema.map(addFullfield.bind(null, f));
            }
          }
          var schema = new Schema(fieldsSchema);
          schema.messages(options.messages);
          if (data.rule.options) {
            data.rule.options.messages = options.messages;
            data.rule.options.error = options.error;
          }
          schema.validate(data.value, data.rule.options || options, function (errs) {
            var finalErrors = [];
            if (errors && errors.length) {
              finalErrors.push.apply(finalErrors, errors);
            }
            if (errs && errs.length) {
              finalErrors.push.apply(finalErrors, errs);
            }
            doIt(finalErrors.length ? finalErrors : null);
          });
        }
      }
      var res;
      if (rule.asyncValidator) {
        res = rule.asyncValidator(rule, data.value, cb, data.source, options);
      } else if (rule.validator) {
        res = rule.validator(rule, data.value, cb, data.source, options);
        if (res === true) {
          cb();
        } else if (res === false) {
          cb(rule.message || "".concat(rule.field, " fails"));
        } else if (res instanceof Array) {
          cb(res);
        } else if (res instanceof Error) {
          cb(res.message);
        }
      }
      if (res && res.then) {
        res.then(function () {
          return cb();
        }, function (e) {
          return cb(e);
        });
      }
    }, function (results) {
      complete(results);
    });
  },
  getType: function getType(rule) {
    if (rule.type === undefined && rule.pattern instanceof RegExp) {
      rule.type = 'pattern';
    }
    if (typeof rule.validator !== 'function' && rule.type && !validators.hasOwnProperty(rule.type)) {
      throw new Error(format('Unknown rule type %s', rule.type));
    }
    return rule.type || 'string';
  },
  getValidationMethod: function getValidationMethod(rule) {
    if (typeof rule.validator === 'function') {
      return rule.validator;
    }
    var keys = Object.keys(rule);
    var messageIndex = keys.indexOf('message');
    if (messageIndex !== -1) {
      keys.splice(messageIndex, 1);
    }
    if (keys.length === 1 && keys[0] === 'required') {
      return validators.required;
    }
    return validators[this.getType(rule)] || false;
  }
};
Schema.register = function register(type, validator) {
  if (typeof validator !== 'function') {
    throw new Error('Cannot register a validator by type, validator is not a function');
  }
  validators[type] = validator;
};
Schema.warning = warning;
Schema.messages = messages;
var _default = Schema; // # sourceMappingURL=index.js.map
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../applications/Hbuilder/HBuilderX/plugins/uniapp-cli/node_modules/node-libs-browser/mock/process.js */ 571)))

/***/ }),
/* 571 */
/*!********************************************************!*\
  !*** ./node_modules/node-libs-browser/mock/process.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.nextTick = function nextTick(fn) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    setTimeout(function () {
        fn.apply(null, args);
    }, 0);
};

exports.platform = exports.arch = 
exports.execPath = exports.title = 'browser';
exports.pid = 1;
exports.browser = true;
exports.env = {};
exports.argv = [];

exports.binding = function (name) {
	throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    exports.cwd = function () { return cwd };
    exports.chdir = function (dir) {
        if (!path) path = __webpack_require__(/*! path */ 572);
        cwd = path.resolve(dir, cwd);
    };
})();

exports.exit = exports.kill = 
exports.umask = exports.dlopen = 
exports.uptime = exports.memoryUsage = 
exports.uvCounters = function() {};
exports.features = {};


/***/ }),
/* 572 */
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node-libs-browser/mock/process.js */ 571)))

/***/ }),
/* 573 */,
/* 574 */,
/* 575 */,
/* 576 */,
/* 577 */,
/* 578 */
/*!****************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/components/u-empty/props.js ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 内置图标名称，或图片路径，建议绝对路径
    icon: {
      type: String,
      default: uni.$u.props.empty.icon
    },
    // 提示文字
    text: {
      type: String,
      default: uni.$u.props.empty.text
    },
    // 文字颜色
    textColor: {
      type: String,
      default: uni.$u.props.empty.textColor
    },
    // 文字大小
    textSize: {
      type: [String, Number],
      default: uni.$u.props.empty.textSize
    },
    // 图标的颜色
    iconColor: {
      type: String,
      default: uni.$u.props.empty.iconColor
    },
    // 图标的大小
    iconSize: {
      type: [String, Number],
      default: uni.$u.props.empty.iconSize
    },
    // 选择预置的图标类型
    mode: {
      type: String,
      default: uni.$u.props.empty.mode
    },
    //  图标宽度，单位px
    width: {
      type: [String, Number],
      default: uni.$u.props.empty.width
    },
    // 图标高度，单位px
    height: {
      type: [String, Number],
      default: uni.$u.props.empty.height
    },
    // 是否显示组件
    show: {
      type: Boolean,
      default: uni.$u.props.empty.show
    },
    // 组件距离上一个元素之间的距离，默认px单位
    marginTop: {
      type: [String, Number],
      default: uni.$u.props.empty.marginTop
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 579 */,
/* 580 */,
/* 581 */,
/* 582 */,
/* 583 */,
/* 584 */,
/* 585 */,
/* 586 */
/*!****************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/components/u-popup/props.js ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 是否展示弹窗
    show: {
      type: Boolean,
      default: uni.$u.props.popup.show
    },
    // 是否显示遮罩
    overlay: {
      type: Boolean,
      default: uni.$u.props.popup.overlay
    },
    // 弹出的方向，可选值为 top bottom right left center
    mode: {
      type: String,
      default: uni.$u.props.popup.mode
    },
    // 动画时长，单位ms
    duration: {
      type: [String, Number],
      default: uni.$u.props.popup.duration
    },
    // 是否显示关闭图标
    closeable: {
      type: Boolean,
      default: uni.$u.props.popup.closeable
    },
    // 自定义遮罩的样式
    overlayStyle: {
      type: [Object, String],
      default: uni.$u.props.popup.overlayStyle
    },
    // 点击遮罩是否关闭弹窗
    closeOnClickOverlay: {
      type: Boolean,
      default: uni.$u.props.popup.closeOnClickOverlay
    },
    // 层级
    zIndex: {
      type: [String, Number],
      default: uni.$u.props.popup.zIndex
    },
    // 是否为iPhoneX留出底部安全距离
    safeAreaInsetBottom: {
      type: Boolean,
      default: uni.$u.props.popup.safeAreaInsetBottom
    },
    // 是否留出顶部安全距离（状态栏高度）
    safeAreaInsetTop: {
      type: Boolean,
      default: uni.$u.props.popup.safeAreaInsetTop
    },
    // 自定义关闭图标位置，top-left为左上角，top-right为右上角，bottom-left为左下角，bottom-right为右下角
    closeIconPos: {
      type: String,
      default: uni.$u.props.popup.closeIconPos
    },
    // 是否显示圆角
    round: {
      type: [Boolean, String, Number],
      default: uni.$u.props.popup.round
    },
    // mode=center，也即中部弹出时，是否使用缩放模式
    zoom: {
      type: Boolean,
      default: uni.$u.props.popup.zoom
    },
    // 弹窗背景色，设置为transparent可去除白色背景
    bgColor: {
      type: String,
      default: uni.$u.props.popup.bgColor
    },
    // 遮罩的透明度，0-1之间
    overlayOpacity: {
      type: [Number, String],
      default: uni.$u.props.popup.overlayOpacity
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 587 */,
/* 588 */,
/* 589 */,
/* 590 */,
/* 591 */,
/* 592 */,
/* 593 */,
/* 594 */,
/* 595 */,
/* 596 */,
/* 597 */,
/* 598 */,
/* 599 */,
/* 600 */,
/* 601 */,
/* 602 */,
/* 603 */,
/* 604 */,
/* 605 */,
/* 606 */,
/* 607 */,
/* 608 */,
/* 609 */,
/* 610 */,
/* 611 */,
/* 612 */,
/* 613 */,
/* 614 */,
/* 615 */
/*!***********************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/components/u-loading-icon/props.js ***!
  \***********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 是否显示组件
    show: {
      type: Boolean,
      default: uni.$u.props.loadingIcon.show
    },
    // 颜色
    color: {
      type: String,
      default: uni.$u.props.loadingIcon.color
    },
    // 提示文字颜色
    textColor: {
      type: String,
      default: uni.$u.props.loadingIcon.textColor
    },
    // 文字和图标是否垂直排列
    vertical: {
      type: Boolean,
      default: uni.$u.props.loadingIcon.vertical
    },
    // 模式选择，circle-圆形，spinner-花朵形，semicircle-半圆形
    mode: {
      type: String,
      default: uni.$u.props.loadingIcon.mode
    },
    // 图标大小，单位默认px
    size: {
      type: [String, Number],
      default: uni.$u.props.loadingIcon.size
    },
    // 文字大小
    textSize: {
      type: [String, Number],
      default: uni.$u.props.loadingIcon.textSize
    },
    // 文字内容
    text: {
      type: [String, Number],
      default: uni.$u.props.loadingIcon.text
    },
    // 动画模式
    timingFunction: {
      type: String,
      default: uni.$u.props.loadingIcon.timingFunction
    },
    // 动画执行周期时间
    duration: {
      type: [String, Number],
      default: uni.$u.props.loadingIcon.duration
    },
    // mode=circle时的暗边颜色
    inactiveColor: {
      type: String,
      default: uni.$u.props.loadingIcon.inactiveColor
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 616 */,
/* 617 */,
/* 618 */,
/* 619 */,
/* 620 */,
/* 621 */,
/* 622 */,
/* 623 */
/*!***************************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/components/u-swiper-indicator/props.js ***!
  \***************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 轮播的长度
    length: {
      type: [String, Number],
      default: uni.$u.props.swiperIndicator.length
    },
    // 当前处于活动状态的轮播的索引
    current: {
      type: [String, Number],
      default: uni.$u.props.swiperIndicator.current
    },
    // 指示器非激活颜色
    indicatorActiveColor: {
      type: String,
      default: uni.$u.props.swiperIndicator.indicatorActiveColor
    },
    // 指示器的激活颜色
    indicatorInactiveColor: {
      type: String,
      default: uni.$u.props.swiperIndicator.indicatorInactiveColor
    },
    // 指示器模式，line-线型，dot-点型
    indicatorMode: {
      type: String,
      default: uni.$u.props.swiperIndicator.indicatorMode
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 624 */,
/* 625 */,
/* 626 */,
/* 627 */,
/* 628 */,
/* 629 */,
/* 630 */,
/* 631 */
/*!***************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/components/u-icon/icons.js ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  'uicon-level': "\uE693",
  'uicon-column-line': "\uE68E",
  'uicon-checkbox-mark': "\uE807",
  'uicon-folder': "\uE7F5",
  'uicon-movie': "\uE7F6",
  'uicon-star-fill': "\uE669",
  'uicon-star': "\uE65F",
  'uicon-phone-fill': "\uE64F",
  'uicon-phone': "\uE622",
  'uicon-apple-fill': "\uE881",
  'uicon-chrome-circle-fill': "\uE885",
  'uicon-backspace': "\uE67B",
  'uicon-attach': "\uE632",
  'uicon-cut': "\uE948",
  'uicon-empty-car': "\uE602",
  'uicon-empty-coupon': "\uE682",
  'uicon-empty-address': "\uE646",
  'uicon-empty-favor': "\uE67C",
  'uicon-empty-permission': "\uE686",
  'uicon-empty-news': "\uE687",
  'uicon-empty-search': "\uE664",
  'uicon-github-circle-fill': "\uE887",
  'uicon-rmb': "\uE608",
  'uicon-person-delete-fill': "\uE66A",
  'uicon-reload': "\uE788",
  'uicon-order': "\uE68F",
  'uicon-server-man': "\uE6BC",
  'uicon-search': "\uE62A",
  'uicon-fingerprint': "\uE955",
  'uicon-more-dot-fill': "\uE630",
  'uicon-scan': "\uE662",
  'uicon-share-square': "\uE60B",
  'uicon-map': "\uE61D",
  'uicon-map-fill': "\uE64E",
  'uicon-tags': "\uE629",
  'uicon-tags-fill': "\uE651",
  'uicon-bookmark-fill': "\uE63B",
  'uicon-bookmark': "\uE60A",
  'uicon-eye': "\uE613",
  'uicon-eye-fill': "\uE641",
  'uicon-mic': "\uE64A",
  'uicon-mic-off': "\uE649",
  'uicon-calendar': "\uE66E",
  'uicon-calendar-fill': "\uE634",
  'uicon-trash': "\uE623",
  'uicon-trash-fill': "\uE658",
  'uicon-play-left': "\uE66D",
  'uicon-play-right': "\uE610",
  'uicon-minus': "\uE618",
  'uicon-plus': "\uE62D",
  'uicon-info': "\uE653",
  'uicon-info-circle': "\uE7D2",
  'uicon-info-circle-fill': "\uE64B",
  'uicon-question': "\uE715",
  'uicon-error': "\uE6D3",
  'uicon-close': "\uE685",
  'uicon-checkmark': "\uE6A8",
  'uicon-android-circle-fill': "\uE67E",
  'uicon-android-fill': "\uE67D",
  'uicon-ie': "\uE87B",
  'uicon-IE-circle-fill': "\uE889",
  'uicon-google': "\uE87A",
  'uicon-google-circle-fill': "\uE88A",
  'uicon-setting-fill': "\uE872",
  'uicon-setting': "\uE61F",
  'uicon-minus-square-fill': "\uE855",
  'uicon-plus-square-fill': "\uE856",
  'uicon-heart': "\uE7DF",
  'uicon-heart-fill': "\uE851",
  'uicon-camera': "\uE7D7",
  'uicon-camera-fill': "\uE870",
  'uicon-more-circle': "\uE63E",
  'uicon-more-circle-fill': "\uE645",
  'uicon-chat': "\uE620",
  'uicon-chat-fill': "\uE61E",
  'uicon-bag-fill': "\uE617",
  'uicon-bag': "\uE619",
  'uicon-error-circle-fill': "\uE62C",
  'uicon-error-circle': "\uE624",
  'uicon-close-circle': "\uE63F",
  'uicon-close-circle-fill': "\uE637",
  'uicon-checkmark-circle': "\uE63D",
  'uicon-checkmark-circle-fill': "\uE635",
  'uicon-question-circle-fill': "\uE666",
  'uicon-question-circle': "\uE625",
  'uicon-share': "\uE631",
  'uicon-share-fill': "\uE65E",
  'uicon-shopping-cart': "\uE621",
  'uicon-shopping-cart-fill': "\uE65D",
  'uicon-bell': "\uE609",
  'uicon-bell-fill': "\uE640",
  'uicon-list': "\uE650",
  'uicon-list-dot': "\uE616",
  'uicon-zhihu': "\uE6BA",
  'uicon-zhihu-circle-fill': "\uE709",
  'uicon-zhifubao': "\uE6B9",
  'uicon-zhifubao-circle-fill': "\uE6B8",
  'uicon-weixin-circle-fill': "\uE6B1",
  'uicon-weixin-fill': "\uE6B2",
  'uicon-twitter-circle-fill': "\uE6AB",
  'uicon-twitter': "\uE6AA",
  'uicon-taobao-circle-fill': "\uE6A7",
  'uicon-taobao': "\uE6A6",
  'uicon-weibo-circle-fill': "\uE6A5",
  'uicon-weibo': "\uE6A4",
  'uicon-qq-fill': "\uE6A1",
  'uicon-qq-circle-fill': "\uE6A0",
  'uicon-moments-circel-fill': "\uE69A",
  'uicon-moments': "\uE69B",
  'uicon-qzone': "\uE695",
  'uicon-qzone-circle-fill': "\uE696",
  'uicon-baidu-circle-fill': "\uE680",
  'uicon-baidu': "\uE681",
  'uicon-facebook-circle-fill': "\uE68A",
  'uicon-facebook': "\uE689",
  'uicon-car': "\uE60C",
  'uicon-car-fill': "\uE636",
  'uicon-warning-fill': "\uE64D",
  'uicon-warning': "\uE694",
  'uicon-clock-fill': "\uE638",
  'uicon-clock': "\uE60F",
  'uicon-edit-pen': "\uE612",
  'uicon-edit-pen-fill': "\uE66B",
  'uicon-email': "\uE611",
  'uicon-email-fill': "\uE642",
  'uicon-minus-circle': "\uE61B",
  'uicon-minus-circle-fill': "\uE652",
  'uicon-plus-circle': "\uE62E",
  'uicon-plus-circle-fill': "\uE661",
  'uicon-file-text': "\uE663",
  'uicon-file-text-fill': "\uE665",
  'uicon-pushpin': "\uE7E3",
  'uicon-pushpin-fill': "\uE86E",
  'uicon-grid': "\uE673",
  'uicon-grid-fill': "\uE678",
  'uicon-play-circle': "\uE647",
  'uicon-play-circle-fill': "\uE655",
  'uicon-pause-circle-fill': "\uE654",
  'uicon-pause': "\uE8FA",
  'uicon-pause-circle': "\uE643",
  'uicon-eye-off': "\uE648",
  'uicon-eye-off-outline': "\uE62B",
  'uicon-gift-fill': "\uE65C",
  'uicon-gift': "\uE65B",
  'uicon-rmb-circle-fill': "\uE657",
  'uicon-rmb-circle': "\uE677",
  'uicon-kefu-ermai': "\uE656",
  'uicon-server-fill': "\uE751",
  'uicon-coupon-fill': "\uE8C4",
  'uicon-coupon': "\uE8AE",
  'uicon-integral': "\uE704",
  'uicon-integral-fill': "\uE703",
  'uicon-home-fill': "\uE964",
  'uicon-home': "\uE965",
  'uicon-hourglass-half-fill': "\uE966",
  'uicon-hourglass': "\uE967",
  'uicon-account': "\uE628",
  'uicon-plus-people-fill': "\uE626",
  'uicon-minus-people-fill': "\uE615",
  'uicon-account-fill': "\uE614",
  'uicon-thumb-down-fill': "\uE726",
  'uicon-thumb-down': "\uE727",
  'uicon-thumb-up': "\uE733",
  'uicon-thumb-up-fill': "\uE72F",
  'uicon-lock-fill': "\uE979",
  'uicon-lock-open': "\uE973",
  'uicon-lock-opened-fill': "\uE974",
  'uicon-lock': "\uE97A",
  'uicon-red-packet-fill': "\uE690",
  'uicon-photo-fill': "\uE98B",
  'uicon-photo': "\uE98D",
  'uicon-volume-off-fill': "\uE659",
  'uicon-volume-off': "\uE644",
  'uicon-volume-fill': "\uE670",
  'uicon-volume': "\uE633",
  'uicon-red-packet': "\uE691",
  'uicon-download': "\uE63C",
  'uicon-arrow-up-fill': "\uE6B0",
  'uicon-arrow-down-fill': "\uE600",
  'uicon-play-left-fill': "\uE675",
  'uicon-play-right-fill': "\uE676",
  'uicon-rewind-left-fill': "\uE679",
  'uicon-rewind-right-fill': "\uE67A",
  'uicon-arrow-downward': "\uE604",
  'uicon-arrow-leftward': "\uE601",
  'uicon-arrow-rightward': "\uE603",
  'uicon-arrow-upward': "\uE607",
  'uicon-arrow-down': "\uE60D",
  'uicon-arrow-right': "\uE605",
  'uicon-arrow-left': "\uE60E",
  'uicon-arrow-up': "\uE606",
  'uicon-skip-back-left': "\uE674",
  'uicon-skip-forward-right': "\uE672",
  'uicon-rewind-right': "\uE66F",
  'uicon-rewind-left': "\uE671",
  'uicon-arrow-right-double': "\uE68D",
  'uicon-arrow-left-double': "\uE68C",
  'uicon-wifi-off': "\uE668",
  'uicon-wifi': "\uE667",
  'uicon-empty-data': "\uE62F",
  'uicon-empty-history': "\uE684",
  'uicon-empty-list': "\uE68B",
  'uicon-empty-page': "\uE627",
  'uicon-empty-order': "\uE639",
  'uicon-man': "\uE697",
  'uicon-woman': "\uE69C",
  'uicon-man-add': "\uE61C",
  'uicon-man-add-fill': "\uE64C",
  'uicon-man-delete': "\uE61A",
  'uicon-man-delete-fill': "\uE66A",
  'uicon-zh': "\uE70A",
  'uicon-en': "\uE692"
};
exports.default = _default;

/***/ }),
/* 632 */
/*!***************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/components/u-icon/props.js ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 图标类名
    name: {
      type: String,
      default: uni.$u.props.icon.name
    },
    // 图标颜色，可接受主题色
    color: {
      type: String,
      default: uni.$u.props.icon.color
    },
    // 字体大小，单位px
    size: {
      type: [String, Number],
      default: uni.$u.props.icon.size
    },
    // 是否显示粗体
    bold: {
      type: Boolean,
      default: uni.$u.props.icon.bold
    },
    // 点击图标的时候传递事件出去的index（用于区分点击了哪一个）
    index: {
      type: [String, Number],
      default: uni.$u.props.icon.index
    },
    // 触摸图标时的类名
    hoverClass: {
      type: String,
      default: uni.$u.props.icon.hoverClass
    },
    // 自定义扩展前缀，方便用户扩展自己的图标库
    customPrefix: {
      type: String,
      default: uni.$u.props.icon.customPrefix
    },
    // 图标右边或者下面的文字
    label: {
      type: [String, Number],
      default: uni.$u.props.icon.label
    },
    // label的位置，只能右边或者下边
    labelPos: {
      type: String,
      default: uni.$u.props.icon.labelPos
    },
    // label的大小
    labelSize: {
      type: [String, Number],
      default: uni.$u.props.icon.labelSize
    },
    // label的颜色
    labelColor: {
      type: String,
      default: uni.$u.props.icon.labelColor
    },
    // label与图标的距离
    space: {
      type: [String, Number],
      default: uni.$u.props.icon.space
    },
    // 图片的mode
    imgMode: {
      type: String,
      default: uni.$u.props.icon.imgMode
    },
    // 用于显示图片小图标时，图片的宽度
    width: {
      type: [String, Number],
      default: uni.$u.props.icon.width
    },
    // 用于显示图片小图标时，图片的高度
    height: {
      type: [String, Number],
      default: uni.$u.props.icon.height
    },
    // 用于解决某些情况下，让图标垂直居中的用途
    top: {
      type: [String, Number],
      default: uni.$u.props.icon.top
    },
    // 是否阻止事件传播
    stop: {
      type: Boolean,
      default: uni.$u.props.icon.stop
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 633 */,
/* 634 */,
/* 635 */,
/* 636 */,
/* 637 */,
/* 638 */,
/* 639 */,
/* 640 */
/*!***************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/components/u-line/props.js ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    color: {
      type: String,
      default: uni.$u.props.line.color
    },
    // 长度，竖向时表现为高度，横向时表现为长度，可以为百分比，带px单位的值等
    length: {
      type: [String, Number],
      default: uni.$u.props.line.length
    },
    // 线条方向，col-竖向，row-横向
    direction: {
      type: String,
      default: uni.$u.props.line.direction
    },
    // 是否显示细边框
    hairline: {
      type: Boolean,
      default: uni.$u.props.line.hairline
    },
    // 线条与上下左右元素的间距，字符串形式，如"30px"、"20px 30px"
    margin: {
      type: [String, Number],
      default: uni.$u.props.line.margin
    },
    // 是否虚线，true-实线，false-虚线
    dashed: {
      type: Boolean,
      default: uni.$u.props.line.dashed
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 641 */,
/* 642 */,
/* 643 */,
/* 644 */,
/* 645 */,
/* 646 */,
/* 647 */,
/* 648 */
/*!******************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/components/u-toolbar/props.js ***!
  \******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 是否展示工具条
    show: {
      type: Boolean,
      default: uni.$u.props.toolbar.show
    },
    // 取消按钮的文字
    cancelText: {
      type: String,
      default: uni.$u.props.toolbar.cancelText
    },
    // 确认按钮的文字
    confirmText: {
      type: String,
      default: uni.$u.props.toolbar.confirmText
    },
    // 取消按钮的颜色
    cancelColor: {
      type: String,
      default: uni.$u.props.toolbar.cancelColor
    },
    // 确认按钮的颜色
    confirmColor: {
      type: String,
      default: uni.$u.props.toolbar.confirmColor
    },
    // 标题文字
    title: {
      type: String,
      default: uni.$u.props.toolbar.title
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 649 */,
/* 650 */,
/* 651 */,
/* 652 */,
/* 653 */,
/* 654 */,
/* 655 */,
/* 656 */,
/* 657 */,
/* 658 */,
/* 659 */,
/* 660 */,
/* 661 */,
/* 662 */,
/* 663 */
/*!***************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/components/u-text/props.js ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 主题颜色
    type: {
      type: String,
      default: uni.$u.props.text.type
    },
    // 是否显示
    show: {
      type: Boolean,
      default: uni.$u.props.text.show
    },
    // 显示的值
    text: {
      type: [String, Number],
      default: uni.$u.props.text.text
    },
    // 前置图标
    prefixIcon: {
      type: String,
      default: uni.$u.props.text.prefixIcon
    },
    // 后置图标
    suffixIcon: {
      type: String,
      default: uni.$u.props.text.suffixIcon
    },
    // 文本处理的匹配模式
    // text-普通文本，price-价格，phone-手机号，name-姓名，date-日期，link-超链接
    mode: {
      type: String,
      default: uni.$u.props.text.mode
    },
    // mode=link下，配置的链接
    href: {
      type: String,
      default: uni.$u.props.text.href
    },
    // 格式化规则
    format: {
      type: [String, Function],
      default: uni.$u.props.text.format
    },
    // mode=phone时，点击文本是否拨打电话
    call: {
      type: Boolean,
      default: uni.$u.props.text.call
    },
    // 小程序的打开方式
    openType: {
      type: String,
      default: uni.$u.props.text.openType
    },
    // 是否粗体，默认normal
    bold: {
      type: Boolean,
      default: uni.$u.props.text.bold
    },
    // 是否块状
    block: {
      type: Boolean,
      default: uni.$u.props.text.block
    },
    // 文本显示的行数，如果设置，超出此行数，将会显示省略号
    lines: {
      type: [String, Number],
      default: uni.$u.props.text.lines
    },
    // 文本颜色
    color: {
      type: String,
      default: uni.$u.props.text.color
    },
    // 字体大小
    size: {
      type: [String, Number],
      default: uni.$u.props.text.size
    },
    // 图标的样式
    iconStyle: {
      type: [Object, String],
      default: uni.$u.props.text.iconStyle
    },
    // 是否显示金额的千分位，mode=price时有效
    precision: {
      type: Boolean,
      default: uni.$u.props.text.precision
    },
    // 文字装饰，下划线，中划线等，可选值 none|underline|line-through
    decoration: {
      tepe: String,
      default: uni.$u.props.text.decoration
    },
    // 外边距，对象、字符串，数值形式均可
    margin: {
      type: [Object, String, Number],
      default: uni.$u.props.text.margin
    },
    // 文本行高
    lineHeight: {
      type: [String, Number],
      default: uni.$u.props.text.lineHeight
    },
    // 文本对齐方式，可选值left|center|right
    align: {
      type: String,
      default: uni.$u.props.text.align
    },
    // 文字换行，可选值break-word|normal|anywhere
    wordWrap: {
      type: String,
      default: uni.$u.props.text.wordWrap
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 664 */,
/* 665 */,
/* 666 */,
/* 667 */,
/* 668 */,
/* 669 */
/*!************************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/components/u-column-notice/props.js ***!
  \************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 显示的内容，字符串
    text: {
      type: [Array],
      default: uni.$u.props.columnNotice.text
    },
    // 是否显示左侧的音量图标
    icon: {
      type: String,
      default: uni.$u.props.columnNotice.icon
    },
    // 通告模式，link-显示右箭头，closable-显示右侧关闭图标
    mode: {
      type: String,
      default: uni.$u.props.columnNotice.mode
    },
    // 文字颜色，各图标也会使用文字颜色
    color: {
      type: String,
      default: uni.$u.props.columnNotice.color
    },
    // 背景颜色
    bgColor: {
      type: String,
      default: uni.$u.props.columnNotice.bgColor
    },
    // 字体大小，单位px
    fontSize: {
      type: [String, Number],
      default: uni.$u.props.columnNotice.fontSize
    },
    // 水平滚动时的滚动速度，即每秒滚动多少px(px)，这有利于控制文字无论多少时，都能有一个恒定的速度
    speed: {
      type: [String, Number],
      default: uni.$u.props.columnNotice.speed
    },
    // direction = row时，是否使用步进形式滚动
    step: {
      type: Boolean,
      default: uni.$u.props.columnNotice.step
    },
    // 滚动一个周期的时间长，单位ms
    duration: {
      type: [String, Number],
      default: uni.$u.props.columnNotice.duration
    },
    // 是否禁止用手滑动切换
    // 目前HX2.6.11，只支持App 2.5.5+、H5 2.5.5+、支付宝小程序、字节跳动小程序
    disableTouch: {
      type: Boolean,
      default: uni.$u.props.columnNotice.disableTouch
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 670 */,
/* 671 */,
/* 672 */,
/* 673 */,
/* 674 */,
/* 675 */,
/* 676 */,
/* 677 */
/*!*********************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/components/u-row-notice/props.js ***!
  \*********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 显示的内容，字符串
    text: {
      type: String,
      default: uni.$u.props.rowNotice.text
    },
    // 是否显示左侧的音量图标
    icon: {
      type: String,
      default: uni.$u.props.rowNotice.icon
    },
    // 通告模式，link-显示右箭头，closable-显示右侧关闭图标
    mode: {
      type: String,
      default: uni.$u.props.rowNotice.mode
    },
    // 文字颜色，各图标也会使用文字颜色
    color: {
      type: String,
      default: uni.$u.props.rowNotice.color
    },
    // 背景颜色
    bgColor: {
      type: String,
      default: uni.$u.props.rowNotice.bgColor
    },
    // 字体大小，单位px
    fontSize: {
      type: [String, Number],
      default: uni.$u.props.rowNotice.fontSize
    },
    // 水平滚动时的滚动速度，即每秒滚动多少px(rpx)，这有利于控制文字无论多少时，都能有一个恒定的速度
    speed: {
      type: [String, Number],
      default: uni.$u.props.rowNotice.speed
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 678 */,
/* 679 */,
/* 680 */,
/* 681 */,
/* 682 */,
/* 683 */,
/* 684 */,
/* 685 */
/*!******************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/components/u-overlay/props.js ***!
  \******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 是否显示遮罩
    show: {
      type: Boolean,
      default: uni.$u.props.overlay.show
    },
    // 层级z-index
    zIndex: {
      type: [String, Number],
      default: uni.$u.props.overlay.zIndex
    },
    // 遮罩的过渡时间，单位为ms
    duration: {
      type: [String, Number],
      default: uni.$u.props.overlay.duration
    },
    // 不透明度值，当做rgba的第四个参数
    opacity: {
      type: [String, Number],
      default: uni.$u.props.overlay.opacity
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 686 */,
/* 687 */,
/* 688 */,
/* 689 */,
/* 690 */,
/* 691 */,
/* 692 */,
/* 693 */
/*!*********************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/components/u-transition/props.js ***!
  \*********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 是否展示组件
    show: {
      type: Boolean,
      default: uni.$u.props.transition.show
    },
    // 使用的动画模式
    mode: {
      type: String,
      default: uni.$u.props.transition.mode
    },
    // 动画的执行时间，单位ms
    duration: {
      type: [String, Number],
      default: uni.$u.props.transition.duration
    },
    // 使用的动画过渡函数
    timingFunction: {
      type: String,
      default: uni.$u.props.transition.timingFunction
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 694 */
/*!**************************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/components/u-transition/transition.js ***!
  \**************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 55));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 57));
var _nvueAniMap = _interopRequireDefault(__webpack_require__(/*! ./nvue.ani-map.js */ 695));
// 定义一个一定时间后自动成功的promise，让调用nextTick方法处，进入下一个then方法
var nextTick = function nextTick() {
  return new Promise(function (resolve) {
    return setTimeout(resolve, 1000 / 50);
  });
};
// nvue动画模块实现细节抽离在外部文件

// 定义类名，通过给元素动态切换类名，赋予元素一定的css动画样式
var getClassNames = function getClassNames(name) {
  return {
    enter: "u-".concat(name, "-enter u-").concat(name, "-enter-active"),
    'enter-to': "u-".concat(name, "-enter-to u-").concat(name, "-enter-active"),
    leave: "u-".concat(name, "-leave u-").concat(name, "-leave-active"),
    'leave-to': "u-".concat(name, "-leave-to u-").concat(name, "-leave-active")
  };
};
var _default = {
  methods: {
    // 组件被点击发出事件
    clickHandler: function clickHandler() {
      this.$emit('click');
    },
    // vue版本的组件进场处理
    vueEnter: function vueEnter() {
      var _this = this;
      // 动画进入时的类名
      var classNames = getClassNames(this.mode);
      // 定义状态和发出动画进入前事件
      this.status = 'enter';
      this.$emit('beforeEnter');
      this.inited = true;
      this.display = true;
      this.classes = classNames.enter;
      this.$nextTick( /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // 组件动画进入后触发的事件
                _this.$emit('afterEnter');
                // 标识动画尚未结束
                _this.transitionEnded = false;
                // 赋予组件enter-to类名
                _this.classes = classNames['enter-to'];
              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })));
    },
    // 动画离场处理
    vueLeave: function vueLeave() {
      var _this2 = this;
      // 如果不是展示状态，无需执行逻辑
      if (!this.display) return;
      var classNames = getClassNames(this.mode);
      // 标记离开状态和发出事件
      this.status = 'leave';
      this.$emit('beforeLeave');
      // 获得类名
      this.classes = classNames.leave;
      this.$nextTick(function () {
        // 标记动画已经结束了
        _this2.transitionEnded = false;
        // 组件执行动画，到了执行的执行时间后，执行一些额外处理
        setTimeout(_this2.onTransitionEnd, _this2.duration);
        _this2.classes = classNames['leave-to'];
      });
    },
    // 完成过渡后触发
    onTransitionEnd: function onTransitionEnd() {
      // 如果已经是结束的状态，无需再处理
      if (this.transitionEnded) return;
      this.transitionEnded = true;
      // 发出组件动画执行后的事件
      this.$emit(this.status === 'leave' ? 'afterLeave' : 'afterEnter');
      if (!this.show && this.display) {
        this.display = false;
        this.inited = false;
      }
    }
  }
};
exports.default = _default;

/***/ }),
/* 695 */
/*!****************************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/components/u-transition/nvue.ani-map.js ***!
  \****************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  fade: {
    enter: {
      opacity: 0
    },
    'enter-to': {
      opacity: 1
    },
    leave: {
      opacity: 1
    },
    'leave-to': {
      opacity: 0
    }
  },
  'fade-up': {
    enter: {
      opacity: 0,
      transform: 'translateY(100%)'
    },
    'enter-to': {
      opacity: 1,
      transform: 'translateY(0)'
    },
    leave: {
      opacity: 1,
      transform: 'translateY(0)'
    },
    'leave-to': {
      opacity: 0,
      transform: 'translateY(100%)'
    }
  },
  'fade-down': {
    enter: {
      opacity: 0,
      transform: 'translateY(-100%)'
    },
    'enter-to': {
      opacity: 1,
      transform: 'translateY(0)'
    },
    leave: {
      opacity: 1,
      transform: 'translateY(0)'
    },
    'leave-to': {
      opacity: 0,
      transform: 'translateY(-100%)'
    }
  },
  'fade-left': {
    enter: {
      opacity: 0,
      transform: 'translateX(-100%)'
    },
    'enter-to': {
      opacity: 1,
      transform: 'translateY(0)'
    },
    leave: {
      opacity: 1,
      transform: 'translateY(0)'
    },
    'leave-to': {
      opacity: 0,
      transform: 'translateX(-100%)'
    }
  },
  'fade-right': {
    enter: {
      opacity: 0,
      transform: 'translateX(100%)'
    },
    'enter-to': {
      opacity: 1,
      transform: 'translateY(0)'
    },
    leave: {
      opacity: 1,
      transform: 'translateY(0)'
    },
    'leave-to': {
      opacity: 0,
      transform: 'translateX(100%)'
    }
  },
  'slide-up': {
    enter: {
      transform: 'translateY(100%)'
    },
    'enter-to': {
      transform: 'translateY(0)'
    },
    leave: {
      transform: 'translateY(0)'
    },
    'leave-to': {
      transform: 'translateY(100%)'
    }
  },
  'slide-down': {
    enter: {
      transform: 'translateY(-100%)'
    },
    'enter-to': {
      transform: 'translateY(0)'
    },
    leave: {
      transform: 'translateY(0)'
    },
    'leave-to': {
      transform: 'translateY(-100%)'
    }
  },
  'slide-left': {
    enter: {
      transform: 'translateX(-100%)'
    },
    'enter-to': {
      transform: 'translateY(0)'
    },
    leave: {
      transform: 'translateY(0)'
    },
    'leave-to': {
      transform: 'translateX(-100%)'
    }
  },
  'slide-right': {
    enter: {
      transform: 'translateX(100%)'
    },
    'enter-to': {
      transform: 'translateY(0)'
    },
    leave: {
      transform: 'translateY(0)'
    },
    'leave-to': {
      transform: 'translateX(100%)'
    }
  },
  zoom: {
    enter: {
      transform: 'scale(0.95)'
    },
    'enter-to': {
      transform: 'scale(1)'
    },
    leave: {
      transform: 'scale(1)'
    },
    'leave-to': {
      transform: 'scale(0.95)'
    }
  },
  'fade-zoom': {
    enter: {
      opacity: 0,
      transform: 'scale(0.95)'
    },
    'enter-to': {
      opacity: 1,
      transform: 'scale(1)'
    },
    leave: {
      opacity: 1,
      transform: 'scale(1)'
    },
    'leave-to': {
      opacity: 0,
      transform: 'scale(0.95)'
    }
  }
};
exports.default = _default;

/***/ }),
/* 696 */,
/* 697 */,
/* 698 */,
/* 699 */,
/* 700 */,
/* 701 */,
/* 702 */,
/* 703 */
/*!*********************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/components/u-status-bar/props.js ***!
  \*********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    bgColor: {
      type: String,
      default: uni.$u.props.statusBar.bgColor
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 704 */,
/* 705 */,
/* 706 */,
/* 707 */,
/* 708 */,
/* 709 */,
/* 710 */,
/* 711 */
/*!**********************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/components/u-safe-bottom/props.js ***!
  \**********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {}
};
exports.default = _default;

/***/ }),
/* 712 */,
/* 713 */,
/* 714 */,
/* 715 */,
/* 716 */,
/* 717 */,
/* 718 */,
/* 719 */
/*!***************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/components/u-text/value.js ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  computed: {
    // 经处理后需要显示的值
    value: function value() {
      var text = this.text,
        mode = this.mode,
        format = this.format,
        href = this.href;
      // 价格类型
      if (mode === 'price') {
        // 如果text不为金额进行提示
        if (!/^\d+(\.\d+)?$/.test(text)) {
          uni.$u.error('金额模式下，text参数需要为金额格式');
        }
        // 进行格式化，判断用户传入的format参数为正则，或者函数，如果没有传入format，则使用默认的金额格式化处理
        if (uni.$u.test.func(format)) {
          // 如果用户传入的是函数，使用函数格式化
          return format(text);
        }
        // 如果format非正则，非函数，则使用默认的金额格式化方法进行操作
        return uni.$u.priceFormat(text, 2);
      }
      if (mode === 'date') {
        // 判断是否合法的日期或者时间戳
        !uni.$u.test.date(text) && uni.$u.error('日期模式下，text参数需要为日期或时间戳格式');
        // 进行格式化，判断用户传入的format参数为正则，或者函数，如果没有传入format，则使用默认的格式化处理
        if (uni.$u.test.func(format)) {
          // 如果用户传入的是函数，使用函数格式化
          return format(text);
        }
        if (this.formart) {
          // 如果format非正则，非函数，则使用默认的时间格式化方法进行操作
          return uni.$u.timeFormat(text, format);
        }
        // 如果没有设置format，则设置为默认的时间格式化形式
        return uni.$u.timeFormat(text, 'yyyy-mm-dd');
      }
      if (mode === 'phone') {
        // 判断是否合法的手机号
        !uni.$u.test.mobile(text) && uni.$u.error('手机号模式下，text参数需要为手机号码格式');
        if (uni.$u.test.func(format)) {
          // 如果用户传入的是函数，使用函数格式化
          return format(text);
        }
        if (format === 'encrypt') {
          // 如果format为encrypt，则将手机号进行星号加密处理
          return "".concat(text.substr(0, 3), "****").concat(text.substr(7));
        }
        return text;
      }
      if (mode === 'name') {
        // 判断是否合法的字符粗
        !(typeof text === 'string') && uni.$u.error('姓名模式下，text参数需要为字符串格式');
        if (uni.$u.test.func(format)) {
          // 如果用户传入的是函数，使用函数格式化
          return format(text);
        }
        if (format === 'encrypt') {
          // 如果format为encrypt，则将姓名进行星号加密处理
          return this.formatName(text);
        }
        return text;
      }
      if (mode === 'link') {
        // 判断是否合法的字符粗
        !uni.$u.test.url(href) && uni.$u.error('超链接模式下，href参数需要为URL格式');
        return text;
      }
      return text;
    }
  },
  methods: {
    // 默认的姓名脱敏规则
    formatName: function formatName(name) {
      var value = '';
      if (name.length === 2) {
        value = name.substr(0, 1) + '*';
      } else if (name.length > 2) {
        var char = '';
        for (var i = 0, len = name.length - 2; i < len; i++) {
          char += '*';
        }
        value = name.substr(0, 1) + char + name.substr(-1, 1);
      } else {
        value = name;
      }
      return value;
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 720 */
/*!*********************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/mixin/button.js ***!
  \*********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    lang: String,
    sessionFrom: String,
    sendMessageTitle: String,
    sendMessagePath: String,
    sendMessageImg: String,
    showMessageCard: Boolean,
    appParameter: String,
    formType: String,
    openType: String
  }
};
exports.default = _default;

/***/ }),
/* 721 */
/*!***********************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/libs/mixin/openType.js ***!
  \***********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    openType: String
  },
  methods: {
    onGetUserInfo: function onGetUserInfo(event) {
      this.$emit('getuserinfo', event.detail);
    },
    onContact: function onContact(event) {
      this.$emit('contact', event.detail);
    },
    onGetPhoneNumber: function onGetPhoneNumber(event) {
      this.$emit('getphonenumber', event.detail);
    },
    onError: function onError(event) {
      this.$emit('error', event.detail);
    },
    onLaunchApp: function onLaunchApp(event) {
      this.$emit('launchapp', event.detail);
    },
    onOpenSetting: function onOpenSetting(event) {
      this.$emit('opensetting', event.detail);
    }
  }
};
exports.default = _default;

/***/ }),
/* 722 */,
/* 723 */,
/* 724 */,
/* 725 */,
/* 726 */,
/* 727 */,
/* 728 */,
/* 729 */
/*!***************************************************************************************************************************************************!*\
  !*** D:/work-files/二手交易前端/SecondHandMall_before-master-2fa79ff18511df3afcf6b441d38725056a0ee431/node_modules/uview-ui/components/u-link/props.js ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 文字颜色
    color: {
      type: String,
      default: uni.$u.props.link.color
    },
    // 字体大小，单位px
    fontSize: {
      type: [String, Number],
      default: uni.$u.props.link.fontSize
    },
    // 是否显示下划线
    underLine: {
      type: Boolean,
      default: uni.$u.props.link.underLine
    },
    // 要跳转的链接
    href: {
      type: String,
      default: uni.$u.props.link.href
    },
    // 小程序中复制到粘贴板的提示语
    mpTips: {
      type: String,
      default: uni.$u.props.link.mpTips
    },
    // 下划线颜色
    lineColor: {
      type: String,
      default: uni.$u.props.link.lineColor
    },
    // 超链接的问题，不使用slot形式传入，是因为nvue下无法修改颜色
    text: {
      type: String,
      default: uni.$u.props.link.text
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map