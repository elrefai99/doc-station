import { Router } from 'express';
import { dmChatController, roomsController } from './chat.controller';
import { userMiddleware } from '../../middleware/authentication/user.middleware';

const router: Router = Router();

router.get('/rooms', userMiddleware, roomsController)
router.get('/dm/:id', userMiddleware, dmChatController)

export default router;
