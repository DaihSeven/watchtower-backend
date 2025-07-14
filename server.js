import express from "express";
import { logEvents, logger } from "./src/middleware/logger.middleware.js";
import dotenv from "dotenv";
import pessoas from "./src/router/pessoas.routes.js";
import avistamento from "./src/router/avistamento.routes.js";
import contato from "./src/router/contato.routes.js"
import local from "./src/router/localizacao.routes.js"
import user from "./src/router/user.routes.js"
import adminRoutes from "./src/router/admin.routes.js";
import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerDocs = require("./src/swagger.json");
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
const PORT = 3002;


app.use(logger);
app.use(express.json()); 

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use('/admin', adminRoutes);
app.use("/pessoas",pessoas );
app.use("/avistamento",avistamento);
app.use("/contato",contato);
app.use("/local",local);
app.use("/user",user);

app.listen(PORT, async () => {
logEvents(`Servidor rodando na porta ${PORT}`, "listen.log");
});
