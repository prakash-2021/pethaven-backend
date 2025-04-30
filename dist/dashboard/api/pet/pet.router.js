"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const middlewares_1 = require("../../../_shared/middlewares");
const uploadMiddleware_1 = __importDefault(require("../../../_shared/middlewares/uploadMiddleware"));
const pet_controller_1 = require("./pet.controller");
const pet_schema_1 = require("./pet.schema");
const petRouter = new koa_router_1.default({
    prefix: "/api/pet",
});
// Define routes
petRouter.post("/uploads", uploadMiddleware_1.default.array("images", 3), pet_controller_1.storeImages);
petRouter.post("/", (0, middlewares_1.validate)(pet_schema_1.petSchema), pet_controller_1.createPet); // Create quiz
petRouter.get("/", pet_controller_1.getAllPets); // Get all quizzes
petRouter.get("/:petId", pet_controller_1.getPetById); // Get quiz by ID
petRouter.put("/:petId", (0, middlewares_1.validate)(pet_schema_1.petSchema), pet_controller_1.updatePet); // Update quiz
petRouter.delete("/:petId", pet_controller_1.deletePet); // Delete quiz
exports.default = petRouter;
