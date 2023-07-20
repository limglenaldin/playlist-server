// Third Party Deps
import express from "express";
import bodyParser from "body-parser";

// Custom
import playlistRouter from "./routes/playlist";

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.use('/v1', playlistRouter);

app.listen(port, () => {
    console.log(`Server Running on [http://127.0.0.1:${port}]`)
})
