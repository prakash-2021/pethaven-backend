"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const story_controller_1 = require("./story.controller");
const storyRouter = new koa_router_1.default({
    prefix: "/api/story",
});
// Define routes
storyRouter.get("/", story_controller_1.getAllStories);
storyRouter.put("/:storyId", story_controller_1.updateStoryStatus);
exports.default = storyRouter;
