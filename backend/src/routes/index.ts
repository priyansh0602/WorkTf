import { Express, Request, Response } from 'express';
import usersRouter from './users';
import agentsRouter from './agents';
import callsRouter from './calls';
import webhooksRouter from './webhooks';

export function setupRoutes(app: Express): void {
  app.use('/api/users', usersRouter);
  app.use('/api/agents', agentsRouter);
  app.use('/api/calls', callsRouter);
  app.use('/api/webhooks', webhooksRouter);

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });
}
