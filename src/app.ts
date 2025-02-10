import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv'
import taskRoutes from './routes/task.router';
import userRoutes from './routes/user.router';

const app = express();

dotenv.config();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/task', taskRoutes);
app.use('/api/users', userRoutes);

export default app;