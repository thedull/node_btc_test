"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const btc_1 = __importDefault(require("../lib/btc-stats/btc"));
const authJwt_1 = __importDefault(require("./authJwt"));
const users_1 = require("./users");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/btc-stats', authJwt_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { start, end } = req.query;
    const [startDate, endDate] = [start === null || start === void 0 ? void 0 : start.toString(), end === null || end === void 0 ? void 0 : end.toString()];
    const btcData = yield (0, btc_1.default)(startDate, endDate);
    res.setHeader('Content-type', 'application/json');
    return res.status(200).send(btcData);
}));
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users_1.users.find(user => {
        return user.username === username && user.password === password;
    });
    if (!user)
        return res.sendStatus(401);
    const accessToken = jsonwebtoken_1.default.sign({
        username: user.username,
        role: user.role
    }, 'Acc3ssT0k3nS3cr3t');
    return res.json({ accessToken });
});
app.get('/admin', authJwt_1.default, (req, res) => {
    const { role } = (req.user);
    if (role !== 'admin')
        return res.status(403);
    return res.send('Hello, admin');
});
app.listen(3001, () => console.log('Server running on http://localhost:3001'));
//# sourceMappingURL=server.js.map