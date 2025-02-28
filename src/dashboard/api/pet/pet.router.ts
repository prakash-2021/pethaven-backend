import Router from "koa-router";
import upload from "../../../_shared/middlewares/uploadMiddleware";
import {
  createPet,
  deletePet,
  getAllPets,
  getPetById,
  storeImages,
  updatePet,
} from "./pet.controller";

const petRouter = new Router({
  prefix: "/api/pet",
});

// Define routes
petRouter.post("/uploads", upload.array("images", 3), storeImages);
petRouter.post("/", createPet); // Create quiz
petRouter.get("/", getAllPets); // Get all quizzes
petRouter.get("/:id", getPetById); // Get quiz by ID
petRouter.put("/:id", updatePet); // Update quiz
petRouter.delete("/:id", deletePet); // Delete quiz

export default petRouter;
