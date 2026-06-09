import { Router } from 'express';
import { requireAuth } from '../middleware';
import { getMe, createUser, updateOnboarding } from '../controllers';

const router = Router();

router.post('/', createUser);
router.get('/me', requireAuth, getMe);
router.post('/onboarding', requireAuth, updateOnboarding);

export default router;
