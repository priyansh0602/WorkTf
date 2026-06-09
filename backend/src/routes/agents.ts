import { Router } from 'express';
import { requireAuth } from '../middleware';
import { getAgent, createAgentHandler, updateAgentHandler } from '../controllers';

const router = Router();

router.use(requireAuth);
router.get('/', getAgent);
router.post('/', createAgentHandler);
router.patch('/:id', updateAgentHandler);

export default router;
