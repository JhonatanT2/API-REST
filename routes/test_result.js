import { Router } from "express";
import { test_resultController } from "../controllers/test_result.js";

export const test_resultRouter = Router();


test_resultRouter.post('/',test_resultController.create);
test_resultRouter.get('/',test_resultController.getAll);
test_resultRouter.get('/user/:userId',test_resultController.getByUserId);
test_resultRouter.get('/usertest',test_resultController.getByUserAndTest);
test_resultRouter.put('/update-score', test_resultController.updateResult);
test_resultRouter.post('/updatetestresult', test_resultController.updateOrCreateTestResult);