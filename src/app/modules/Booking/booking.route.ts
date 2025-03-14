import express from 'express';
import { auth } from '../../middlewares/auth';
import { Role } from '@prisma/client';
import { validateRequest } from '../../middlewares/validateRequest';
import { bookingController } from './booking.controller';
import { bookingSchemaValidation } from './booking.validation';

const router = express.Router();

router.post("/", auth(Role.TRAINEE), validateRequest(bookingSchemaValidation.bookingClassSchema), bookingController.classBooking);

router.delete("/:id", auth(Role.TRAINEE), bookingController.removeBookings);


export const bookingRoutes = router;