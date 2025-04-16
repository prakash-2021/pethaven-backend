import Router from "koa-router";
import { getAllPets, getPetById } from "./pet.controller";

const petRouter = new Router({
  prefix: "/api/pet",
});

// Define routes
petRouter.get("/", getAllPets); // Get all quizzes
petRouter.get("/:petId", getPetById); // Get quiz by ID

export default petRouter;
