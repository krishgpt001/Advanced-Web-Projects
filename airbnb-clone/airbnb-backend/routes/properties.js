const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const verifyToken = require('../middleware/auth');

// Get all properties
router.get('/', async (req, res) => {
    try {
        const { location, minPrice, maxPrice, guests } = req.query;
        const filter = {};
        if(location){
            filter.location = { $regex: location, $options: 'i' };
        }
        if(minPrice || maxPrice){
            filter.price = {};
            if(minPrice){
                filter.price.$gte = Number(minPrice);
            }
            if(maxPrice){
                filter.price.$lte = Number(maxPrice);
            }
        }
        if(guests){
            filter.maxGuests = { $gte: Number(guests) };
        }
        const properties = await Property.find(filter).populate('owner', 'username email').sort({ createdAt: -1 });
        res.json(properties);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get One property By ID
router.get('/:id', async (req, res) => {
    try{
        const property = await Property.findById(req.params.id).populate('owner', 'username email');
        if(!property){
            return res.status(404).json({ error: 'Property not found' });
        }
        res.json(property);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Create a new property
router.post('/', verifyToken, async (req, res) => {
    try {
        const { title, description, price, location, images, amenities, maxGuests } = req.body;
        if (!title || !description || !price || !location || !maxGuests) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const property = await Property.create({ title, description, price, location, images, amenities, maxGuests, owner: req.userId });
        res.status(201).json(property);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update a property
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }
        if (property.owner.toString() !== req.userId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        const updatedProperty = await Property.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, runValidators: true });
        res.json(updatedProperty);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete a property
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }
        if (property.owner.toString() !== req.userId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        await Property.findByIdAndDelete(req.params.id);
        res.json({ message: 'Property deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get properties of the logged-in user
router.get('/user/my-listings', verifyToken, async (req, res) => {
    try {
        const properties = await Property.find({ owner: req.userId }).sort({ createdAt: -1 });
        res.json(properties);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;