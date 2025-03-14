import express from 'express';
import { scheduleController } from './schedule.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { classScheduleSchemaValidation } from './schedule.validation';
import { auth } from '../../middlewares/auth';
import { Role } from '@prisma/client';

const router = express.Router();

router.post("/", auth(Role.ADMIN), validateRequest(classScheduleSchemaValidation.classScheduleSchema), scheduleController.createClassSchedule);

router.get("/", scheduleController.getClassSchedule);

router.get("/:id", auth(Role.TRAINER), scheduleController.getClassScheduleOfTrainer);

router.put("/assign-trainer/:id", auth(Role.ADMIN), validateRequest(classScheduleSchemaValidation.assignTrainerSchema), scheduleController.assignTrainer)

router.put("/:classId", auth(Role.ADMIN), validateRequest(classScheduleSchemaValidation.updateClassScheduleSchema), scheduleController.updateClassSchedule)

router.delete("/:id", auth(Role.ADMIN), scheduleController.deleteClassSchedule);

export const scheduleRoutes = router;