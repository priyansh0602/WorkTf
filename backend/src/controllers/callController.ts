import { Request, Response, NextFunction } from 'express';
import { getCallsByUserId, initiateOutboundCall, getCallStats } from '../services';

export async function getCalls(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.user!.id;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = parseInt(req.query.skip as string) || 0;
    const result = await getCallsByUserId(userId, limit, skip);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function initiateCall(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.user!.id;
    const { contactName, contactNumber } = req.body as {
      contactName: string;
      contactNumber: string;
    };
    const call = await initiateOutboundCall(userId, contactName, contactNumber);
    res.status(201).json(call);
  } catch (error) {
    next(error);
  }
}

export async function getCallStatsHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.user!.id;
    const stats = await getCallStats(userId);
    res.status(200).json(stats);
  } catch (error) {
    next(error);
  }
}
