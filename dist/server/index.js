"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var http = __importStar(require("http"));
var ws = __importStar(require("ws"));
var Server = /** @class */ (function () {
    function Server() {
        this.httpServer = new http.Server({});
        this.wsServer = new ws.Server({ server: this.httpServer });
    }
    Server.prototype.run = function () {
        var _this = this;
        this.httpServer.listen(5000);
        return new Promise(function (resolve) { return _this.httpServer.on('close', function () { return resolve(); }); });
    };
    return Server;
}());
exports.Server = Server;
