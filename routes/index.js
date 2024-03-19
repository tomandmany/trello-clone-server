import express from 'express';
import membersRoutes from './members.js';
import workspacesRoutes from './workspaces.js';
import boardsRoutes from './boards.js';
import listsRoutes from './lists.js';
import cardsRoutes from './cards.js';

const router = express.Router();

router.use('/members', membersRoutes);
router.use('/workspaces', workspacesRoutes);
router.use('/boards', boardsRoutes);
router.use('/lists', listsRoutes);
router.use('/cards', cardsRoutes);

export default router;
