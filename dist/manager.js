"use strict";

var _react = _interopRequireDefault(require("react"));

var _addons = require("@storybook/addons");

var _api = require("@storybook/api");

var _components = require("@storybook/components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ADDON_ID = 'cssVars';
var PANEL_ID = "".concat(ADDON_ID, "/panel");

var getIframeRoot = function getIframeRoot() {
  var iframe = document.querySelector('iframe#storybook-preview-iframe');
  var root = iframe.contentWindow.document.querySelector('#root');
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
        type: 'color',
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
  var cssVariablesStates = {};

  var applyCssVariables = function applyCssVariables() {
    var rootElement = getElementToApplyCssVars({
      query: config.elementQuery
    });

    for (var _i2 = 0, _Object$entries = Object.entries(cssVariablesStates); _i2 < _Object$entries.length; _i2++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2),
          cssVariableName = _Object$entries$_i[0],
          cssVariableValue = _Object$entries$_i[1];

      rootElement.style.setProperty(cssVariableName, cssVariableValue);
    }
  };

  var resetCssVariables = function resetCssVariables() {
    var rootElement = getElementToApplyCssVars({
      query: config.elementQuery
    });

    for (var _i3 = 0, _Object$entries2 = Object.entries(cssVariablesStates); _i3 < _Object$entries2.length; _i3++) {
      var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i3], 2),
          cssVariableName = _Object$entries2$_i[0],
          cssVariableValue = _Object$entries2$_i[1];

      rootElement.style.removeProperty(cssVariableName);
    }
  };

  var resetArgs = function resetArgs() {
    resetCssVariables();
    cssVariablesStates = {};
    rows.pop();
  };

  var updateArgs = function updateArgs(arg) {
    var _Object$keys = Object.keys(arg),
        _Object$keys2 = _slicedToArray(_Object$keys, 1),
        cssVariableName = _Object$keys2[0];

    var cssVariableValue = arg[cssVariableName]; // Do something when we change values

    cssVariablesStates[cssVariableName] = cssVariableValue;
    applyCssVariables();
  };

  return /*#__PURE__*/_react["default"].createElement(_components.ArgsTable, {
    key: path,
    compact: false,
    inAddonPanel: true,
    rows: rows,
    args: args,
    globals: globals,
    updateArgs: updateArgs,
    resetArgs: resetArgs
  });
};

var AddonCssVarPanel = function AddonCssVarPanel() {
  var config = (0, _api.useParameter)(ADDON_ID, null);

  if (!config || Object.keys(config.vars).length === 0) {
    return /*#__PURE__*/_react["default"].createElement("div", null, "No story parameter defined");
  }

  return /*#__PURE__*/_react["default"].createElement(AddonCssVarTable, null);
};

_addons.addons.register(ADDON_ID, function (api) {
  _addons.addons.add(PANEL_ID, {
    type: _addons.types.PANEL,
    title: function title() {
      var config = (0, _api.useParameter)(ADDON_ID, null);
      var count = config && Object.keys(config.vars).length || 0;
      var suffix = count === 0 ? '' : " (".concat(count, ")");
      return "CSS vars".concat(suffix);
    },
    render: function render(_ref2) {
      var active = _ref2.active,
          key = _ref2.key;
      return /*#__PURE__*/_react["default"].createElement(_components.AddonPanel, {
        active: active,
        key: key
      }, /*#__PURE__*/_react["default"].createElement(AddonCssVarPanel, null));
    }
  });
});