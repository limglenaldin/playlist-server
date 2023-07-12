import express from "express";

const app = express();
const port = 5000;

app.get('/',(req,res) => {
    res.send('Hello World');
})

app.listen(port, () => {
    console.log(`Server Running on [http://127.0.0.1:${port}]`)
})
