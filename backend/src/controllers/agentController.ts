import { Request, Response, NextFunction } from 'express';
import { getAgentByUserId, createAgent, updateAgent } from '../services';

export async function getAgent(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.user!.id;
    const agent = await getAgentByUserId(userId);
    res.status(200).json(agent);
  } catch (error) {
    next(error);
  }
}

export async function createAgentHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.user!.id;
    const agent = await createAgent(userId, req.body);
    res.status(201).json(agent);
  } catch (error) {
    next(error);
  }
}

export async function updateAgentHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const agentId = req.params.id as string;
    const agent = await updateAgent(agentId, req.body);
    res.status(200).json(agent);
  } catch (error) {
    next(error);
  }
}
