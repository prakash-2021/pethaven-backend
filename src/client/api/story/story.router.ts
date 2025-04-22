import Router from "koa-router";
import { upload } from "../../../_shared/middlewares";
import {
  createStory,
  deleteStory,
  getAllStories,
  getStoriesByUser,
  getStoryById,
  storeImage,
  updateStory,
} from "./story.controller";

const storyRouter = new Router({
  prefix: "/api/story",
});

storyRouter.post("/upload", upload.array("image", 1), storeImage);

// Create a story
storyRouter.post("/", createStory);

// Get all stories (with optional filters: category, search, pagination)
storyRouter.get("/", getAllStories);

// Get story by ID
storyRouter.get("/:storyId", getStoryById);

// Get story by user Id
storyRouter.get("/user/:userId", getStoriesByUser);

// Update a story by ID
storyRouter.put("/:storyId", updateStory);

// Delete a story by ID
storyRouter.delete("/:storyId", deleteStory);

export default storyRouter;
