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
const cors_1 = __importDefault(require("@koa/cors"));
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const errorHandler_1 = require("../_shared/middlewares/errorHandler");
const accounts_router_1 = __importDefault(require("./api/accounts/accounts.router"));
const answer_router_1 = __importDefault(require("./api/answer/answer.router"));
const application_router_1 = __importDefault(require("./api/application/application.router"));
const dashboard_router_1 = __importDefault(require("./api/dashboard/dashboard.router"));
const pet_router_1 = __importDefault(require("./api/pet/pet.router"));
const quiz_router_1 = __importDefault(require("./api/quiz/quiz.router"));
const story_router_1 = __importDefault(require("./api/story/story.router"));
const app = new koa_1.default();
app.use((ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield next();
    }
    catch (err) {
        // set default status and message
        ctx.status = 500;
        ctx.body = { message: "Unknown error" };
        ctx.app.emit("error", err, ctx);
    }
}));
// Middlewares
app.use((0, koa_bodyparser_1.default)());
app.use((0, cors_1.default)());
// Routes
app.use(accounts_router_1.default.routes());
app.use(accounts_router_1.default.allowedMethods());
app.use(quiz_router_1.default.routes());
app.use(quiz_router_1.default.allowedMethods());
app.use(pet_router_1.default.routes());
app.use(pet_router_1.default.allowedMethods());
app.use(answer_router_1.default.routes());
app.use(answer_router_1.default.allowedMethods());
app.use(application_router_1.default.routes());
app.use(application_router_1.default.allowedMethods());
app.use(story_router_1.default.routes());
app.use(story_router_1.default.allowedMethods());
app.use(dashboard_router_1.default.routes());
app.use(dashboard_router_1.default.allowedMethods());
app.use(errorHandler_1.notFoundHandler);
app.on("error", (err, ctx) => {
    (0, errorHandler_1.errorHandler)(ctx, err);
});
exports.default = app;
