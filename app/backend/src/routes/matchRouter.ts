import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';

import validateToken from '../middlewares/auth';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req, res) => matchesController.get(req, res));
router.post('/', validateToken, (req, res) => matchesController.add(req, res));
// router.get('/:id', (req, res) => teamsController.getById(req, res));

export default router;
