import User from "../models/User.js";
import { JSONStructure } from '../utils/helper.js';
import { StatusCode } from '../utils/constants.js';

export const GetTodos = async (req, res) => {
    try {
        const list = await User.findById(req.userId).select("-password").populate("todos").exec();


        return res.json(JSONStructure(StatusCode.success, "All todo lsit",list));

    } catch (error) {
        return res.json(JSONStructure(StatusCode.unprocessable_entity, "Error ",list));
    }
};