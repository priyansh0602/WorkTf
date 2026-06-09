import { Router, Request, Response } from 'express';
import { processWebhookEvent } from '../services';

const router = Router();

router.post('/vapi', async (req: Request, res: Response) => {
  try {
    await processWebhookEvent(req.body);
    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    // Always return 200 to VAPI to prevent retries
    res.status(200).json({ received: true });
  }
});

export default router;
