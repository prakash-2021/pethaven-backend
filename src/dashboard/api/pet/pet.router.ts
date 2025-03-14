import Router from "koa-router";
import { validate } from "../../../_shared/middlewares";
import upload from "../../../_shared/middlewares/uploadMiddleware";
import {
  createPet,
  deletePet,
  getAllPets,
  getPetById,
  storeImages,
  updatePet,
} from "./pet.controller";
import { petSchema } from "./pet.schema";

const petRouter = new Router({
  prefix: "/api/pet",
});

// Define routes
petRouter.post("/uploads", upload.array("images", 3), storeImages);
petRouter.post("/", validate(petSchema), createPet); // Create quiz
petRouter.get("/", getAllPets); // Get all quizzes
petRouter.get("/:petId", getPetById); // Get quiz by ID
petRouter.put("/:petId", validate(petSchema), updatePet); // Update quiz
petRouter.delete("/:petId", deletePet); // Delete quiz

export default petRouter;
