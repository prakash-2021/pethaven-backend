import { config } from "dotenv";
import { ParameterizedContext } from "koa";
import cloudinaryUpload from "../../../_shared/config/cloudinaryUpload";
import { responseGenerator } from "../../../_shared/config/responseGenerator";
import { AppError } from "../../../_shared/exceptions";
import {
  createStoryService,
  deleteStoryService,
  getAllStoriesService,
  getStoriesByUserService,
  getStoryByIdService,
  updateStoryService,
} from "./story.service";

// Load env
config();

export const storeImage = async (ctx: ParameterizedContext<any, any>) => {
  const file = ctx.request.files[0];

  if (!file) throw new AppError("No image file uploaded", 400, true);

  const { secure_url, created_at } = await cloudinaryUpload(
    file.buffer,
    (process.env.CLOUDINARY_FOLDER as string) + "/story"
  );

  ctx.status = 201;
  ctx.body = responseGenerator({ secure_url, created_at });
};

// Create a story
export const createStory = async (ctx: ParameterizedContext<any, any>) => {
  const {
    title,
    thumbnail,
    shortDescription,
    content,
    category,
    userId,
    status,
  } = ctx.request.body;

  if (!userId) throw new AppError("Unauthorized", 401, true);

  const story = await createStoryService({
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
};

// Get all stories
export const getAllStories = async (ctx: ParameterizedContext<any, any>) => {
  const stories = await getAllStoriesService(ctx);
  ctx.status = 200;
  ctx.body = stories;
};

// Get a story by ID
export const getStoryById = async (ctx: ParameterizedContext<any, any>) => {
  const { storyId } = ctx.params;

  if (!storyId) ctx.throw(400, "Story ID is required");

  const story = await getStoryByIdService(storyId);

  if (!story) ctx.throw(404, "Story not found");

  ctx.status = 200;
  ctx.body = story;
};

// Update a story
export const updateStory = async (ctx: ParameterizedContext<any, any>) => {
  const { storyId } = ctx.params;
  const { title, thumbnail, shortDescription, content, category } =
    ctx.request.body;

  if (!storyId) ctx.throw(400, "Story ID is required");

  const updatedStory = await updateStoryService(storyId, {
    title,
    thumbnail,
    shortDescription,
    content,
    category,
  });

  ctx.status = 200;
  ctx.body = { message: "Story updated successfully", updatedStory };
};

// Delete a story
export const deleteStory = async (ctx: ParameterizedContext<any, any>) => {
  const { storyId } = ctx.params;

  if (!storyId) ctx.throw(400, "Story ID is required");

  await deleteStoryService(storyId);

  ctx.status = 200;
  ctx.body = { message: "Story deleted successfully" };
};

export const getStoriesByUser = async (ctx: ParameterizedContext<any, any>) => {
  const { userId } = ctx.params;

  if (!userId) ctx.throw(400, "User ID is required");

  const stories = await getStoriesByUserService(userId);

  ctx.status = 200;
  ctx.body = stories;
};
