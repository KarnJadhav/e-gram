/// <reference path="./types/index.d.ts" />
import http from 'http';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import { connectDB } from './config/db';
import { setupLogger } from './config/logger';
import { errorHandler } from './middlewares/error';
import { setupSocket } from './utils/socket';
import authRoutes from './routes/auth.routes';

// ...existing code...

const app = express();
const server = http.createServer(app);

// Security & parsing
app.use(helmet());
app.use(cors({ origin: process.env.ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(xss());
app.use(mongoSanitize());
setupLogger(app);

// Routes
app.use('/api/auth', authRoutes);

// Error handler
app.use(errorHandler);

// Socket.io
import { Server } from 'socket.io';
const io = new Server(server, { cors: { origin: process.env.ORIGIN, credentials: true } });
setupSocket(io);

// DB & start
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
