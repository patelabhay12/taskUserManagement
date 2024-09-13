import express from "express";
import router, { Protectedapi } from "./routes/api.js";
import mongoose from "mongoose";
import { DB_URL } from "./utils/constants.js";
import AuthMiddleware from "./middlewares/AuthMiddleware.js";
import cors from 'cors';

const app = express();

const PORT = 8000;


mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
},).then((res) => {
    console.log("Database connected");
}).catch(error => {
    console.log(error);
}); 

// app.use(cors());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use('/api', router);
app.use('/api', AuthMiddleware, Protectedapi);

app.listen(PORT, () => {
    console.log(`Server is runing on port number ${PORT}`);
}); 