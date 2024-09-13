import { validationResult } from "express-validator";
import Todo from "../models/Todo.js";
import User from "../models/User.js";
import { JSONStructure } from "../utils/helper.js";
import { StatusCode } from "../utils/constants.js";

export const RemoveTodo = async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.json(JSONStructure(StatusCode.validation_error, "todo id is required ...."));
    }

    try {
        const result = await Todo.findOneAndDelete({
            userId: req.userId,
            _id: req.body.todo_id
        });

        if (result) {
            const user = await User.findOneAndUpdate({
                _id: req.userId,
            },
                { $pull: { todos: req.body.todo_id } }
            );
            return res.json(JSONStructure(StatusCode.success, "todo deleted ", null));


        }

    } catch (err) {
        return res.json(JSONStructure(StatusCode.unprocessable_entity, "Could not delete ", null));
    }
};