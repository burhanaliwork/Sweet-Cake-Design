import { Router, type IRouter } from "express";
import healthRouter from "./health";
import adminRouter, { initAdminDb } from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(adminRouter);

initAdminDb().catch(err => console.error("DB init error:", err));

export default router;
