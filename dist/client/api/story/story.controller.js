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
exports.getStoriesByUser = exports.deleteStory = exports.updateStory = exports.getStoryById = exports.getAllStories = exports.createStory = exports.storeImage = void 0;
const dotenv_1 = require("dotenv");
const cloudinaryUpload_1 = __importDefault(require("../../../_shared/config/cloudinaryUpload"));
const responseGenerator_1 = require("../../../_shared/config/responseGenerator");
const exceptions_1 = require("../../../_shared/exceptions");
const story_service_1 = require("./story.service");
// Load env
(0, dotenv_1.config)();
const storeImage = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const file = ctx.request.files[0];
    if (!file)
        throw new exceptions_1.AppError("No image file uploaded", 400, true);
    const { secure_url, created_at } = yield (0, cloudinaryUpload_1.default)(file.buffer, process.env.CLOUDINARY_FOLDER + "/story");
    ctx.status = 201;
    ctx.body = (0, responseGenerator_1.responseGenerator)({ secure_url, created_at });
});
exports.storeImage = storeImage;
// Create a story
const createStory = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, thumbnail, shortDescription, content, category, userId, status, } = ctx.request.body;
    if (!userId)
        throw new exceptions_1.AppError("Unauthorized", 401, true);
    const story = yield (0, story_service_1.createStoryService)({
        title,
        thumbnail,
        shortDescription,
        content,
        category,
        userId,
        status,
    });
    ctx.status = 201;
    ctx.body = { message: "Story created successfully", story };
});
exports.createStory = createStory;
// Get all stories
const getAllStories = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const stories = yield (0, story_service_1.getAllStoriesService)(ctx);
    ctx.status = 200;
    ctx.body = stories;
});
exports.getAllStories = getAllStories;
// Get a story by ID
const getStoryById = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { storyId } = ctx.params;
    if (!storyId)
        ctx.throw(400, "Story ID is required");
    const story = yield (0, story_service_1.getStoryByIdService)(storyId);
    if (!story)
        ctx.throw(404, "Story not found");
    ctx.status = 200;
    ctx.body = story;
});
exports.getStoryById = getStoryById;
// Update a story
const updateStory = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { storyId } = ctx.params;
    const { title, thumbnail, shortDescription, content, category } = ctx.request.body;
    if (!storyId)
        ctx.throw(400, "Story ID is required");
    const updatedStory = yield (0, story_service_1.updateStoryService)(storyId, {
        title,
        thumbnail,
        shortDescription,
        content,
        category,
    });
    ctx.status = 200;
    ctx.body = { message: "Story updated successfully", updatedStory };
});
exports.updateStory = updateStory;
// Delete a story
const deleteStory = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { storyId } = ctx.params;
    if (!storyId)
        ctx.throw(400, "Story ID is required");
    yield (0, story_service_1.deleteStoryService)(storyId);
    ctx.status = 200;
    ctx.body = { message: "Story deleted successfully" };
});
exports.deleteStory = deleteStory;
const getStoriesByUser = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = ctx.params;
    if (!userId)
        ctx.throw(400, "User ID is required");
    const stories = yield (0, story_service_1.getStoriesByUserService)(userId);
    ctx.status = 200;
    ctx.body = stories;
});
exports.getStoriesByUser = getStoriesByUser;
