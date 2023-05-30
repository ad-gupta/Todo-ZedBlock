import { Router } from "express";
import {
    activeTask,
  addTask,
  completedTask,
  deleteAll,
  deleteTask,
  editTask,
  getTask,
  getTasks,
  searchTask,
  sortTitle,
} from "../controllers/task.js";

const router = Router();

router.post("/addTask", addTask);

router.put("/edit/:id", editTask);

router.get("/filter/active", activeTask);

router.get("/filter/completed", completedTask);

router.delete("/delete/:id", deleteTask);

router.delete("/deleteAll", deleteAll);

router.get("/", getTasks);

router.get("/search", searchTask);

router.get('/find/:id', getTask)

router.get('/sort/title', sortTitle)
export default router;


