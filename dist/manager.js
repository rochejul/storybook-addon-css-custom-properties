"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _react = _interopRequireWildcard(require("react"));

var _addons = require("@storybook/addons");

var _api = require("@storybook/api");

var _components = require("@storybook/components");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ADDON_ID = "cssVars";
var PANEL_ID = "".concat(ADDON_ID, "/panel");

var clone = function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
};

var getIframeRoot = function getIframeRoot() {
  var iframe = document.querySelector("iframe#storybook-preview-iframe");
  var root = iframe.contentWindow.document.querySelector("#root");
  return root;
};

var getElementToApplyCssVars = function getElementToApplyCssVars(_ref) {
  var query = _ref.query;
  var rootElement = getIframeRoot();
  var element = rootElement;

  if (query) {
    element = rootElement.querySelector(query);
  }

  return element || rootElement;
};

var AddonCssVarTable = function AddonCssVarTable() {
  var _useStorybookState = (0, _api.useStorybookState)(),
      path = _useStorybookState.path;

  var _useArgs = (0, _api.useArgs)(),
      _useArgs2 = _slicedToArray(_useArgs, 1),
      args = _useArgs2[0];

  var _useGlobals = (0, _api.useGlobals)(),
      _useGlobals2 = _slicedToArray(_useGlobals, 1),
      globals = _useGlobals2[0];

  var config = (0, _api.useParameter)(ADDON_ID, null);
  var rows = Object.keys(config.vars).map(function (cssVarName) {
    var cssConfig = config.vars[cssVarName];
    var cssVarValue = cssConfig.value,
        _cssConfig$descriptio = cssConfig.description,
        cssVarDescription = _cssConfig$descriptio === void 0 ? "CSS var (".concat(cssVarName, ")") : _cssConfig$descriptio,
        cssVarCategory = cssConfig.category,
        cssVarSubcategory = cssConfig.subcategory;
    return {
      name: cssVarName,
      description: cssVarDescription,
      category: "",
      key: cssVarName,
      control: {
        type: "color",
        value: cssVarValue //presetColors,

      },
      table: {
        type: "CSS Custom Property",
        category: cssVarCategory,
        subcategory: cssVarSubcategory,
        defaultValue: {
          summary: cssVarValue
        }
      }
    };
  });

  var _useState = (0, _react.useState)(rows),
      _useState2 = _slicedToArray(_useState, 2),
      getRows = _useState2[0],
      setRows = _useState2[1];

  var applyCssVariables = function applyCssVariables(cssVariableName, cssVariableValue) {
    var rootElement = getElementToApplyCssVars({
      query: config.elementQuery
    });
    rootElement.style.setProperty(cssVariableName, cssVariableValue);
  };

  var resetCssVariables = function resetCssVariables() {
    var rootElement = getElementToApplyCssVars({
      query: config.elementQuery
    });

    var _iterator = _createForOfIteratorHelper(rows),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var row = _step.value;
        rootElement.style.removeProperty(row.name);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    setRows([]);
    setTimeout(function () {
      return setRows(clone(rows));
    });
  };

  var resetArgs = function resetArgs() {
    resetCssVariables();
  };

  var updateArgs = function updateArgs(arg) {
    var _Object$keys = Object.keys(arg),
        _Object$keys2 = _slicedToArray(_Object$keys, 1),
        cssVariableName = _Object$keys2[0];

    var cssVariableValue = arg[cssVariableName];
    applyCssVariables(cssVariableName, cssVariableValue);
  };

  return /*#__PURE__*/_react["default"].createElement(_components.ArgsTable, {
    key: path,
    compact: false,
    inAddonPanel: true,
    rows: getRows,
    args: args,
    globals: globals,
    updateArgs: updateArgs,
    resetArgs: resetArgs
  });
};

var AddonCssVarPanel = function AddonCssVarPanel() {
  var config = (0, _api.useParameter)(ADDON_ID, null);

  if (!config || Object.keys(config.vars).length === 0) {
    var divStyle = {
      textAlign: 'middle'
    };
    return /*#__PURE__*/_react["default"].createElement("div", {
      style: divStyle
    }, "No story parameter defined: we can't display the related CSS custom properties (a.k.a. CSS vars)");
  }

  return /*#__PURE__*/_react["default"].createElement(AddonCssVarTable, null);
};

_addons.addons.register(ADDON_ID, function (api) {
  _addons.addons.add(PANEL_ID, {
    type: _addons.types.PANEL,
    title: function title() {
      var config = (0, _api.useParameter)(ADDON_ID, null);
      var count = config && Object.keys(config.vars).length || 0;
      var suffix = count === 0 ? "" : " (".concat(count, ")");
      return "CSS vars".concat(suffix);
    },
    render: function render(_ref2) {
      var active = _ref2.active,
          key = _ref2.key;

      if (!active || !api.getCurrentStoryData()) {
        return null;
      }

      return /*#__PURE__*/_react["default"].createElement(_components.AddonPanel, {
        key: key,
        active: active
      }, /*#__PURE__*/_react["default"].createElement(AddonCssVarPanel, null));
    }
  });
});