import express from 'express';
import cors from 'cors';
import { config } from './config';
import { checkConnection } from './lib';
import { setupRoutes } from './routes';
import { errorHandler } from './middleware';

const app = express();

const allowedOrigins = [config.clientUrl, 'http://localhost:8081'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupRoutes(app);
app.use(errorHandler);

async function startServer(): Promise<void> {
  try {
    await checkConnection();
    app.listen(config.port, () => {
      console.log(`WorkTF AI backend running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
