"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = void 0;
var Status;
(function (Status) {
    Status[Status["NOT_AUTHENTICATED"] = 0] = "NOT_AUTHENTICATED";
    Status[Status["AUTHENTICATED"] = 1] = "AUTHENTICATED";
    Status[Status["ERROR"] = 2] = "ERROR";
})(Status || (exports.Status = Status = {}));
