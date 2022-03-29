import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

import dollarRoutes from "./routes/dollarRoutes.js";

dotenv.config();

const app = express();

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

if(process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(express.json());

app.get('/', async (req, res) => {
    try {
        res.send("API para obtener las cotizaciones de los distintos tipos de dólar.")
    } catch(e) {
        console.log(e)
        res.send(500);
    }
})

app.use("/api/dollar", dollarRoutes);

const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
);

export default app;