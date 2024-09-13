import { validationResult } from "express-validator";
import Todo from "../models/Todo.js";
import User from "../models/User.js";
import { JSONStructure } from '../utils/helper.js';
import { StatusCode } from "../utils/constants.js";

export const createTodo = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(JSONStructure(StatusCode.validation_error, "Todo is Required", errors.mapped()));
    }
    try {
        const result = await Todo.create({
            userId: req.userId,
            desc: req.body.desc,
        });

        if (result) {
            const user = await User.findOneAndUpdate(
                { _id: req.userId },
                {
                    $push: { todos: result },
                },
                { new: true }
            );
            return res.json(JSONStructure(StatusCode.success, "Todo created Successfully", result));
        }
    } catch (err) {
        return res.json(JSONStructure(StatusCode.unprocessable_entity,"Something went wrong !",err))
    }
};
