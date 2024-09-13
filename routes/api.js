import express from "express";
import Register from "../controllers/RegisterController.js";
import { RegisterSchema } from "../validationSchemas/RegisterSchema.js";
import  LoginController  from "../controllers/LoginController.js";
import { LoginSchema } from "../validationSchemas/LoginSchema.js";
import { createTodo } from "../controllers/TodoController.js";
import { check } from "express-validator";
import { GetTodos } from "../controllers/TodoList.js";
import { MarkTodo } from "../controllers/MarkTodoController.js";
import { RemoveTodo } from "../controllers/RemoveTodoComtroller.js";

const router = express.Router();
export const Protectedapi = express.Router();


router.post("/register", RegisterSchema, Register);
router.post("/login", LoginSchema, LoginController.Login);
router.get("/profile", LoginController.UserProfile);


Protectedapi.post('/createTodo', [check("desc", "Todo desc is required").exists()], createTodo);

Protectedapi.post('/marktodo', [check("todo_id", "Todo id is required").exists()], MarkTodo);

Protectedapi.post('/deletetodo', [check("todo_id", "Todo id is required").exists()], RemoveTodo);

Protectedapi.get('/todolist', GetTodos);



export default router;   