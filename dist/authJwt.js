"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jsonwebtoken_1.default.verify(token, 'Acc3ssT0k3nS3cr3t', (err, user) => {
        if (err)
            return res.sendStatus(403);
        req.user = user;
        return next();
    });
};
exports.default = authJwt;
//# sourceMappingURL=authJwt.js.map