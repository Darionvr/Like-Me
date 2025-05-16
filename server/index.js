import express from 'express';
import cors from "cors";
import router from './routes/likeMe.route.js';

const app = express()

app.use(express.json());
app.use(cors());
app.use("/", router);

 const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
 console.log(`Servidor escuchando en puerto http://localhost:${PORT}`);
 });
