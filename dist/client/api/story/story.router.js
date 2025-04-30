"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const middlewares_1 = require("../../../_shared/middlewares");
const story_controller_1 = require("./story.controller");
const storyRouter = new koa_router_1.default({
    prefix: "/api/story",
});
storyRouter.post("/upload", middlewares_1.upload.array("image", 1), story_controller_1.storeImage);
// Create a story
storyRouter.post("/", story_controller_1.createStory);
// Get all stories (with optional filters: category, search, pagination)
storyRouter.get("/", story_controller_1.getAllStories);
// Get story by ID
storyRouter.get("/:storyId", story_controller_1.getStoryById);
// Get story by user Id
storyRouter.get("/user/:userId", story_controller_1.getStoriesByUser);
// Update a story by ID
storyRouter.put("/:storyId", story_controller_1.updateStory);
// Delete a story by ID
storyRouter.delete("/:storyId", story_controller_1.deleteStory);
exports.default = storyRouter;
