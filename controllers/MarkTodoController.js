import { validationResult } from "express-validator";
import Todo from "../models/Todo.js";


export const MarkTodo = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.json({
            staus: 501,
            message: "todo id is required ",
            errors
        })
    }

    try {
        const todo = await Todo.findOneAndUpdate(
            {
                _id: req.body.todo_id,
                userId: req.userId
            }, [
            {
                $set: {
                    isCompleted: {
                        $eq: [false, "$isCompleted"]
                    }
                }
            }
        ]
        );

        if (todo) {
            return res.json({
                status: 200,
                message: "Todo Completed successfully",
                todo
            })
        } else {
            return res.json({
                status: 401,
                message: "could not upadate it ",
                null:""
            })
        }
    } catch (err) {
        return res.staus(501).json({
            message: "Something went wrong",
            err
        })
    }
};