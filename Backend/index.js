import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import userRoutes from './src/microservices/users/infraestructure/api/userRoutes.js';
import comicRoutes from './src/microservices/users/infraestructure/api/comicRoutes.js';
import marvelRoutes from './src/microservices/users/infraestructure/api/marvelRoutes.js';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config({ path: path.resolve('dotenv', '.env') });

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/comics', comicRoutes);
app.use('/marvel', marvelRoutes);

const port = process.env.PORT || 3500;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});