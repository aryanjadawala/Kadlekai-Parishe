import express from 'express';
import {
  getAllParkingSlots,
  getParkingSlot,
  createParkingSlot,
  updateParkingSlot,
  deleteParkingSlot,
  checkInVehicle,
  checkOutVehicle,
  getParkingStats
} from '../controllers/parkingController.js';

const router = express.Router();

// Statistics route
router.get('/stats', getParkingStats);

// Check-in and Check-out routes
router.post('/:id/checkin', checkInVehicle);
router.post('/:id/checkout', checkOutVehicle);

// CRUD routes
router.route('/')
  .get(getAllParkingSlots)
  .post(createParkingSlot);

router.route('/:id')
  .get(getParkingSlot)
  .put(updateParkingSlot)
  .delete(deleteParkingSlot);

export default router;
