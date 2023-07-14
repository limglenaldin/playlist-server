// Third Party Deps
import express from "express";
import bodyParser from "body-parser";


// Custom
import Route from "./routes/route";

const app = express();
const port = 5000;

app.use(bodyParser.json());

Route(app);

app.listen(port, () => {
    console.log(`Server Running on [http://127.0.0.1:${port}]`)
})
