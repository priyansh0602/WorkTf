import { Request, Response, NextFunction } from 'express';
import { supabaseAdmin } from '../lib';
import { IUserDocument } from '../models';

declare global {
  namespace Express {
    interface Request {
      user?: IUserDocument;
    }
  }
}

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const clerkId = req.headers['x-clerk-user-id'] as string | undefined;

    if (!clerkId) {
      res.status(401).json({ error: 'Unauthorized: Missing clerk user ID' });
      return;
    }

    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('clerk_id', clerkId)
      .single();

    if (error || !data) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    req.user = data as IUserDocument;
    next();
  } catch (error) {
    next(error);
  }
}
