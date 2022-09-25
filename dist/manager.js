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

var AddonCssVarTable = function AddonCssVarTable() {
  var _useStorybookState = (0, _api.useStorybookState)(),
      path = _useStorybookState.path;

  var _useArgs = (0, _api.useArgs)(),
      _useArgs2 = _slicedToArray(_useArgs, 3),
      args = _useArgs2[0],
      updateArgs = _useArgs2[1],
      resetArgs = _useArgs2[2];

  var _useGlobals = (0, _api.useGlobals)(),
      _useGlobals2 = _slicedToArray(_useGlobals, 1),
      globals = _useGlobals2[0];

  var config = (0, _api.useParameter)(ADDON_ID, null);
  var rows = Object.keys(config).map(function (cssVarName) {
    var cssVarValue = config[cssVarName];
    return {
      name: cssVarName,
      description: "CSS var (".concat(cssVarName, ")"),
      category: "",
      key: cssVarName,
      control: {
        type: 'color',
        value: cssVarValue //presetColors,

      },
      table: {
        type: "CSS Custom Property",
        defaultValue: {
          summary: cssVarValue
        }
      }
    };
  });
  return /*#__PURE__*/_react["default"].createElement(_components.ArgsTable, {
    key: path,
    // resets state when switching stories
    compact: true,
    rows: rows,
    args: args,
    globals: globals,
    updateArgs: updateArgs,
    resetArgs: resetArgs,
    inAddonPanel: true
  });
};

var AddonCssVarPanel = function AddonCssVarPanel() {
  var config = (0, _api.useParameter)(ADDON_ID, null);

  if (!config) {
    return /*#__PURE__*/_react["default"].createElement("div", null, "No story parameter defined");
  }

  return /*#__PURE__*/_react["default"].createElement(AddonCssVarTable, null);
};

_addons.addons.register(ADDON_ID, function (api) {
  _addons.addons.add(PANEL_ID, {
    type: _addons.types.PANEL,
    title: 'CSS vars',
    render: function render(_ref) {
      var active = _ref.active,
          key = _ref.key;
      return /*#__PURE__*/_react["default"].createElement(_components.AddonPanel, {
        active: active,
        key: key
      }, /*#__PURE__*/_react["default"].createElement(AddonCssVarPanel, null));
    }
  });
});