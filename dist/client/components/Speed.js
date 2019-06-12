"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_redux_1 = require("react-redux");
var react_1 = __importStar(require("react"));
var actions_1 = require("../actions");
var use_debounce_1 = require("use-debounce");
var SpeedComponent = function (_a) {
    var min = _a.min, max = _a.max, speed = _a.speed, setSpeed = _a.setSpeed;
    var _b = __read(react_1.useState(speed), 2), state = _b[0], setState = _b[1];
    var _c = __read(use_debounce_1.useDebouncedCallback(function (value) { return setState(value); }, 100), 1), setSpeedCallback = _c[0];
    react_1.useEffect(function () {
        if (state) {
            setSpeed(state);
        }
    }, [state]);
    return react_1.default.createElement("div", null,
        react_1.default.createElement("label", null, "Interval:"),
        react_1.default.createElement("span", null,
            speed,
            "ms"),
        react_1.default.createElement("input", { type: "range", min: min, max: max, defaultValue: String(state), onChange: function (event) { return setSpeedCallback(parseInt(event.target.value)); } }));
};
exports.Speed = react_redux_1.connect(function (state) { return ({ speed: state.game.speed }); }, function (dispatch) { return ({ setSpeed: function (speed) { return dispatch(actions_1.setSpeed(speed)); } }); })(SpeedComponent);
