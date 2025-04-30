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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllStories = exports.updateStoryStatus = void 0;
const story_service_1 = require("./story.service");
const updateStoryStatus = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { storyId } = ctx.params;
    const { status } = ctx.request.body;
    if (!storyId)
        ctx.throw(400, "Story ID is required.");
    if (!status || status.trim() === "") {
        ctx.throw(400, "Status cannot be empty.");
    }
    const updatedStory = yield (0, story_service_1.updateStoryStatusService)(ctx);
    ctx.status = 200;
    ctx.body = {
        message: "Story status updated successfully.",
        updatedStory,
    };
});
exports.updateStoryStatus = updateStoryStatus;
const getAllStories = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, story_service_1.getAllStoriesService)(ctx);
        ctx.status = 200;
        ctx.body = {
            message: "Stories fetched successfully",
            data: result,
        };
    }
    catch (error) {
        ctx.throw(500, "Failed to fetch stories");
    }
});
exports.getAllStories = getAllStories;
