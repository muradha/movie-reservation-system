import { Router } from "express";
import { createMovie, getAllMovies, updateMovie, deleteMovie } from "#controllers/movieController.js";
import validateSchema from "#middlewares/validateSchema.js";
import movieSchema from "#validators/movieSchema.js";
import ParseIntPipe from "#pipes/ParseIntPipe.js";

const router = new Router();

router.get("/", getAllMovies);
router.post("/", validateSchema(movieSchema.create), createMovie);
router.put("/:movieId", ParseIntPipe("movieId"), validateSchema(movieSchema.update), updateMovie);
router.delete("/:movieId", ParseIntPipe("movieId"), deleteMovie)

export default router;