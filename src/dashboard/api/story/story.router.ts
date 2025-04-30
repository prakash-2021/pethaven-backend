import Router from "koa-router";
import { getAllStories, updateStoryStatus } from "./story.controller";

const storyRouter = new Router({
  prefix: "/api/story",
});

// Define routes
storyRouter.get("/", getAllStories);
storyRouter.put("/:storyId", updateStoryStatus);

export default storyRouter;
