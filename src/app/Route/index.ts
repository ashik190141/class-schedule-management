import express from "express";
import { scheduleRoutes } from "../modules/Schedule/schedule.route";
import { userRoutes } from "../modules/User/user.route";
import { authRoutes } from '../modules/Auth/auth.route';
import { bookingRoutes } from '../modules/Booking/booking.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/schedule",
    route: scheduleRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/booking",
    route: bookingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
