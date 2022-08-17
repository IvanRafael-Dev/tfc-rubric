import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req, res) => matchesController.get(req, res));
// router.get('/:id', (req, res) => teamsController.getById(req, res));

export default router;
