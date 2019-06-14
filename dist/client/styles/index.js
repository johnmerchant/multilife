"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@emotion/core");
exports.globalStyle = core_1.css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    body {\n        font-family: 'Open Sans', sans-serif;\n        margin: 4rem;\n        color: #fff !important;\n        background-color: #000;\n        font-size: 1.2em;\n    }\n\n    * {\n        color: #fff;\n    }\n\n    html, body {\n        height: 100%;\n    }\n"], ["\n    body {\n        font-family: 'Open Sans', sans-serif;\n        margin: 4rem;\n        color: #fff !important;\n        background-color: #000;\n        font-size: 1.2em;\n    }\n\n    * {\n        color: #fff;\n    }\n\n    html, body {\n        height: 100%;\n    }\n"])));
exports.containerStyle = core_1.css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    display: flex;\n"], ["\n    display: flex;\n"])));
exports.canvasContainerStyle = core_1.css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    flex-grow: 2;\n    border: 1px #000 solid;\n"], ["\n    flex-grow: 2;\n    border: 1px #000 solid;\n"])));
exports.sidebarStyle = core_1.css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    width: 8em;\n"], ["\n    width: 8em;\n"])));
exports.populationListStyle = core_1.css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    list-style: none;\n"], ["\n    list-style: none;\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
