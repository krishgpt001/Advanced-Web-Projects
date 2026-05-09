import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'
import './PropertyDetail.css'

const PropertyDetail = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [bookingLoading, setBookingLoading] = useState(false)
  const [bookingError, setBookingError] = useState(null)
  const [bookingSuccess, setBookingSuccess] = useState(false)

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await api.get(`/properties/${id}`)
        setProperty(res.data)
      } catch (err) {
        console.error(err)
        setError('Property not found')
      } finally {
        setLoading(false)
      }
    }
    fetchProperty()
  }, [id])

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0
    return Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))
  }

  const handleBooking = async (e) => {
    e.preventDefault()
    if (!user) { navigate('/login'); return }
    setBookingLoading(true)
    setBookingError(null)
    setBookingSuccess(false)
    try {
      await api.post('/bookings', { propertyId: id, checkIn, checkOut })
      setBookingSuccess(true)
      setCheckIn('')
      setCheckOut('')
    } catch (err) {
      setBookingError(err.response?.data?.error || 'Booking failed')
    } finally {
      setBookingLoading(false)
    }
  }

  if (loading) return <p className="property-detail__status">Loading...</p>
  if (error) return <p className="property-detail__status property-detail__status--error">{error}</p>
  if (!property) return null

  const nights = calculateNights()
  const isOwner = user && property.owner._id === user.id
  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="property-detail">
      <div className="property-detail__hero">
        {property.images?.length > 0 ? (
          <img src={property.images[0]} alt={property.title} />
        ) : (
          <div className="property-detail__no-image">No images available</div>
        )}
      </div>

      <div className="property-detail__body">
        {/* Left */}
        <div>
          <h1 className="property-detail__title">{property.title}</h1>
          <p className="property-detail__meta">{property.location}</p>
          <p className="property-detail__meta">Up to {property.maxGuests} guests</p>

          <hr className="property-detail__divider" />

          <h3 className="property-detail__section-title">
            Hosted by {property.owner?.name}
          </h3>

          <hr className="property-detail__divider" />

          <h3 className="property-detail__section-title">About this place</h3>
          <p className="property-detail__description">{property.description}</p>

          {property.amenities?.length > 0 && (
            <>
              <hr className="property-detail__divider" />
              <h3 className="property-detail__section-title">What this place offers</h3>
              <div className="property-detail__amenities">
                {property.amenities.map((amenity, i) => (
                  <span key={i} className="property-detail__amenity">{amenity}</span>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Right — Booking card */}
        <div className="booking-card">
          <p className="booking-card__price">
            ₹{property.price}<span> / night</span>
          </p>

          {isOwner ? (
            <p className="booking-card__owner-note">This is your listing</p>
          ) : (
            <form onSubmit={handleBooking}>
              <label className="booking-card__label">Check-in</label>
              <input
                className="booking-card__input"
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                min={today}
                required
              />

              <label className="booking-card__label">Check-out</label>
              <input
                className="booking-card__input"
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={checkIn || today}
                required
              />

              {nights > 0 && (
                <div className="booking-card__breakdown">
                  <div className="booking-card__breakdown-row">
                    <span>₹{property.price} × {nights} nights</span>
                    <span>₹{property.price * nights}</span>
                  </div>
                  <div className="booking-card__breakdown-total">
                    <span>Total</span>
                    <span>₹{property.price * nights}</span>
                  </div>
                </div>
              )}

              {bookingError && <p className="booking-card__error">{bookingError}</p>}
              {bookingSuccess && (
                <p className="booking-card__success">Booking confirmed! Check your dashboard.</p>
              )}

              <button className="booking-card__btn" type="submit" disabled={bookingLoading}>
                {bookingLoading ? 'Booking...' : user ? 'Reserve' : 'Login to book'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default PropertyDetail