import express from 'express';
import cors from 'cors';
import { config } from './config';
import { checkConnection } from './lib';
import { setupRoutes } from './routes';
import { errorHandler } from './middleware';

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://work-tf-web.vercel.app',
  config.clientUrl
]

const corsOptions = {
  origin: function(origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'x-clerk-user-id'
  ]
}

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))
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
