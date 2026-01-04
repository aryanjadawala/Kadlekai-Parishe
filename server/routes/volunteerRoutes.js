import express from 'express';
import {
  getAllVolunteers,
  getVolunteer,
  createVolunteer,
  updateVolunteer,
  deleteVolunteer,
  getVolunteerStats
} from '../controllers/volunteerController.js';

const router = express.Router();

// Statistics route (before :id route to avoid conflicts)
router.get('/stats', getVolunteerStats);

// CRUD routes
router.route('/')
  .get(getAllVolunteers)
  .post(createVolunteer);

router.route('/:id')
  .get(getVolunteer)
  .put(updateVolunteer)
  .delete(deleteVolunteer);

export default router;
