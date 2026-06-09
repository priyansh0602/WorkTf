import { Router } from 'express';
import { requireAuth } from '../middleware';
import { getCalls, initiateCall, getCallStatsHandler } from '../controllers';

const router = Router();

router.use(requireAuth);
router.get('/', getCalls);
router.post('/', initiateCall);
router.get('/stats', getCallStatsHandler);

export default router;
