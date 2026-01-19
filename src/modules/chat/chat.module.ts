import { Router } from 'express';
import { userMiddleware } from '../../Middleware/authentication/user.middleware';
import { bookingChatController, dmChatController, roomsController, seenController } from './chat.controller';

const router: Router = Router();

router.get('/rooms', userMiddleware, roomsController)
router.get('/dm/:id', userMiddleware, dmChatController)
router.get('/seen/:id', userMiddleware, seenController)
router.get('/booking/:id', userMiddleware, bookingChatController)

export default router;
