import express from "express";
import cors from "cors";
import feedbackRoutes from "./routes/feedbackRoutes.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

feedbackRoutes(app);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
