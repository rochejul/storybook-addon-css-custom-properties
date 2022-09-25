"use strict";

var _react = _interopRequireDefault(require("react"));

var _addons = require("@storybook/addons");

var _api = require("@storybook/api");

var _components = require("@storybook/components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ADDON_ID = 'cssVars';
var PANEL_ID = "".concat(ADDON_ID, "/panel"); // give a unique name for the panel

var MyPanel = function MyPanel() {
  var value = (0, _api.useParameter)(ADDON_ID, null);
  var item = value ? value.data : 'No story parameter defined';
  return /*#__PURE__*/_react["default"].createElement("div", null, item);
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
      }, /*#__PURE__*/_react["default"].createElement(MyPanel, null));
    }
  });
});