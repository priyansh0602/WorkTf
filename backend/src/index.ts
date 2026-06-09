import express from 'express';
import cors from 'cors';
import { config } from './config';
import { checkConnection } from './lib';
import { setupRoutes } from './routes';
import { errorHandler } from './middleware';

const app = express();

app.use(
  cors({
    origin: config.clientUrl,
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
