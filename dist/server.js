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
const btc_stats_1 = __importDefault(require("@thedull/btc-stats"));
const app = (0, express_1.default)();
app.get('/btc-stats', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { start, end } = req.query;
    const [startDate, endDate] = [start === null || start === void 0 ? void 0 : start.toString(), end === null || end === void 0 ? void 0 : end.toString()];
    const btcData = yield (0, btc_stats_1.default)(startDate, endDate);
    res.setHeader('Content-type', 'application/json');
    return res.status(200).send(btcData);
}));
app.listen(3001, () => console.log('Server running on http://localhost:3001'));
