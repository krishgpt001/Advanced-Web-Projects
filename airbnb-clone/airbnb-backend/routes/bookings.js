const express = require('express')
const router = express.Router()
const Booking = require('../models/Booking')
const Property = require('../models/Property')
const verifyToken = require('../middleware/auth')

// POST create booking
router.post('/', verifyToken, async (req, res) => {
  try {
    const { propertyId, checkIn, checkOut } = req.body

    if (!propertyId || !checkIn || !checkOut) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)

    if (checkInDate >= checkOutDate) {
      return res.status(400).json({ error: 'Check-out must be after check-in' })
    }

    if (checkInDate < new Date()) {
      return res.status(400).json({ error: 'Check-in date cannot be in the past' })
    }

    const property = await Property.findById(propertyId)
    if (!property) {
      return res.status(404).json({ error: 'Property not found' })
    }

    if (property.owner.toString() === req.userId) {
      return res.status(400).json({ error: 'You cannot book your own property' })
    }

    const conflict = await Booking.findOne({
      property: propertyId,
      status: { $ne: 'cancelled' },
      $or: [
        {
          checkIn: { $lte: checkOutDate },
          checkOut: { $gte: checkInDate }
        }
      ]
    })

    if (conflict) {
      return res.status(400).json({ error: 'Property is not available for these dates' })
    }

    const nights = Math.ceil(
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
    )
    const totalPrice = nights * property.price

    const booking = await Booking.create({
      property: propertyId,
      guest: req.userId,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      totalPrice
    })

    await booking.populate('property', 'title location images price')
    await booking.populate('guest', 'name email')

    res.status(201).json(booking)

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// GET my bookings (as guest)
router.get('/my-bookings', verifyToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ guest: req.userId })
      .populate('property', 'title location images price')
      .sort({ createdAt: -1 })
    res.json(bookings)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// GET bookings for a property (as host)
router.get('/property/:propertyId', verifyToken, async (req, res) => {
  try {
    const property = await Property.findById(req.params.propertyId)

    if (!property) {
      return res.status(404).json({ error: 'Property not found' })
    }
    if (property.owner.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' })
    }

    const bookings = await Booking.find({
      property: req.params.propertyId,
      status: { $ne: 'cancelled' }
    })
      .populate('guest', 'name email')
      .sort({ checkIn: 1 })

    res.json(bookings)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// PATCH cancel booking
router.patch('/:id/cancel', verifyToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' })
    }
    if (booking.guest.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized to cancel this booking' })
    }
    if (booking.status === 'cancelled') {
      return res.status(400).json({ error: 'Booking is already cancelled' })
    }

    booking.status = 'cancelled'
    await booking.save()

    res.json({ message: 'Booking cancelled successfully', booking })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router