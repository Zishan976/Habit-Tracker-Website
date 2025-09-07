import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import habitRoutes from "./routes/habitRoutes.js";
import habitLogRoutes from './routes/logRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import auth from './routes/auth.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)



const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;
app.use(cors());


app.use('/api/auth', auth);

app.use("/api/habits", habitRoutes);

app.use("/api/notes", noteRoutes);

app.use("/api/habits/:habitId/logs", habitLogRoutes)

app.use(express.static(path.join(__dirname, '/client/habit_tracker/dist')))

app.get("*", (req, res) => res.sendFile(path.join(__dirname, '/client/habit_tracker/dist/index.html')))

app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});