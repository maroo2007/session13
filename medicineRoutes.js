const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine');

// Create a new medicine
router.post('/medicines', async (req, res) => {
  try {
    const medicine = new Medicine(req.body);
    await medicine.save();
    res.status(201).send(medicine);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all medicines
router.get('/medicines', async (req, res) => {
  try {
    const medicines = await Medicine.find({});
    res.send(medicines);
  } catch (error) {
    res.status(500).send();
  }
});

// Get medicine by ID
router.get('/medicines/:id', async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) {
      return res.status(404).send();
    }
    res.send(medicine);
  } catch (error) {
    res.status(500).send();
  }
});

// Update medicine
router.patch('/medicines/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'description', 'category', 'price', 'stock', 'expiryDate', 'manufacturer', 'prescriptionRequired'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!medicine) {
      return res.status(404).send();
    }
    res.send(medicine);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete medicine
router.delete('/medicines/:id', async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);
    if (!medicine) {
      return res.status(404).send();
    }
    res.send(medicine);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;