import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import habitRoutes from "./routes/habitRoutes.js";
import habitLogRoutes from './routes/logRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import auth from './routes/auth.js';


const app = express();
app.use(express.json());
const PORT = process.env.PORT;
app.use(cors());


app.use('/api/auth', auth);

app.use("/api/habits", habitRoutes);

app.use("/api/habits/:habitId/logs", habitLogRoutes)

app.use("/api/habits/:habitId/notes", noteRoutes)


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