import { ParameterizedContext } from "koa";
import {
  getAllStoriesService,
  updateStoryStatusService,
} from "./story.service";

export const updateStoryStatus = async (
  ctx: ParameterizedContext<any, any>
): Promise<void> => {
  const { storyId } = ctx.params;
  const { status } = ctx.request.body as { status: string };

  if (!storyId) ctx.throw(400, "Story ID is required.");
  if (!status || status.trim() === "") {
    ctx.throw(400, "Status cannot be empty.");
  }

  const updatedStory = await updateStoryStatusService(ctx);

  ctx.status = 200;
  ctx.body = {
    message: "Story status updated successfully.",
    updatedStory,
  };
};

export const getAllStories = async (
  ctx: ParameterizedContext<any, any>
): Promise<void> => {
  try {
    const result = await getAllStoriesService(ctx);
    ctx.status = 200;
    ctx.body = {
      message: "Stories fetched successfully",
      data: result,
    };
  } catch (error) {
    ctx.throw(500, "Failed to fetch stories");
  }
};
