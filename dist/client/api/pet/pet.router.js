"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const pet_controller_1 = require("./pet.controller");
const petRouter = new koa_router_1.default({
    prefix: "/api/pet",
});
// Define routes
petRouter.get("/", pet_controller_1.getAllPets); // Get all quizzes
petRouter.get("/:petId", pet_controller_1.getPetById); // Get quiz by ID
exports.default = petRouter;
