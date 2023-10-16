import { Router } from 'express';
import * as controller from './controller.js';

// eslint-disable-next-line new-cap
export const router = Router({
  mergeParams: true,
});

router.route('/recover').post(controller.recover);

router.route('/confirmation/:email').post(controller.confirmation);

// router.post('/recover', controller.recoverPassword);
