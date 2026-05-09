import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'
import './Dashboard.css'

const Dashboard = () => {
  const { user } = useAuth()

  const [listings, setListings] = useState([])
  const [bookings, setBookings] = useState([])
  const [listingsLoading, setListingsLoading] = useState(true)
  const [bookingsLoading, setBookingsLoading] = useState(true)
  const [listingsError, setListingsError] = useState(null)
  const [bookingsError, setBookingsError] = useState(null)

  const fetchListings = async () => {
    setListingsLoading(true)
    setListingsError(null)
    try {
      const res = await api.get('/properties/user/my-listings')
      setListings(res.data)
    } catch {
      setListingsError('Failed to load your listings')
    } finally {
      setListingsLoading(false)
    }
  }

  const fetchBookings = async () => {
    setBookingsLoading(true)
    setBookingsError(null)
    try {
      const res = await api.get('/bookings/my-bookings')
      setBookings(res.data)
    } catch {
      setBookingsError('Failed to load your bookings')
    } finally {
      setBookingsLoading(false)
    }
  }

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchListings(), fetchBookings()])
    }
    loadData()
  }, [])
  const handleDeleteListing = async (propertyId) => {
    const confirmed = window.confirm('Are you sure you want to delete this listing?')
    if (!confirmed) return
    try {
      await api.delete(`/properties/${propertyId}`)
      setListings(prev => prev.filter(p => p._id !== propertyId))
      } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete listing')
    }
  }

  const handleCancelBooking = async (bookingId) => {
    const confirmed = window.confirm('Are you sure you want to cancel this booking?')
    if (!confirmed) return

    try {
      await api.patch(`/bookings/${bookingId}/cancel`)
      setBookings(prev =>
        prev.map(b =>
          b._id === bookingId ? { ...b, status: 'cancelled' } : b
        )
      )
      } catch (err) {
      alert(err.response?.data?.error || 'Failed to cancel booking')
    }
  }
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <div className="dashboard">
      <h1 className="dashboard__title">Welcome, {user?.name}</h1>

      {/* My Listings */}
      <section className="dashboard__section">
        <h2 className="dashboard__section-title">My listings</h2>

        {listingsLoading && (
          <p className="dashboard__status">Loading listings...</p>
        )}
        {listingsError && (
          <p className="dashboard__status dashboard__status--error">{listingsError}</p>
        )}
        {!listingsLoading && !listingsError && listings.length === 0 && (
          <p className="dashboard__status">
            You haven't listed any properties yet.{' '}
            <Link to="/add-property" style={{ color: '#FF385C' }}>Add your first listing</Link>
          </p>
        )}

        <div className="dashboard__listings">
          {listings.map((property) => (
            <ListingCard
              key={property._id}
              property={property}
              onDelete={handleDeleteListing}
            />
          ))}
        </div>
      </section>

      {/* My Bookings */}
      <section className="dashboard__section">
        <h2 className="dashboard__section-title">My bookings</h2>

        {bookingsLoading && (
          <p className="dashboard__status">Loading bookings...</p>
        )}
        {bookingsError && (
          <p className="dashboard__status dashboard__status--error">{bookingsError}</p>
        )}
        {!bookingsLoading && !bookingsError && bookings.length === 0 && (
          <p className="dashboard__status">
            You haven't made any bookings yet.{' '}
            <Link to="/" style={{ color: '#FF385C' }}>Browse properties</Link>
          </p>
        )}

        <div className="dashboard__bookings">
          {bookings.map((booking) => (
            <BookingItem
              key={booking._id}
              booking={booking}
              onCancel={handleCancelBooking}
              formatDate={formatDate}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

const ListingCard = ({ property, onDelete }) => {
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    setDeleting(true)
    await onDelete(property._id)
    setDeleting(false)
  }

  return (
    <div className="listing-card">
      <div className="listing-card__image">
        {property.images?.length > 0 ? (
          <img src={property.images[0]} alt={property.title} />
        ) : (
          <div className="listing-card__no-image">No image</div>
        )}
      </div>

      <div className="listing-card__info">
        <p className="listing-card__title">{property.title}</p>
        <p className="listing-card__location">{property.location}</p>
        <p className="listing-card__price">
          ₹{property.price}<span> / night</span>
        </p>

        <div className="listing-card__actions">
          <Link
            to={`/property/${property._id}`}
            className="listing-card__btn-view"
          >
            View
          </Link>
          <button
            className="listing-card__btn-delete"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}

const BookingItem = ({ booking, onCancel, formatDate }) => {
  const [cancelling, setCancelling] = useState(false)
  const isCancelled = booking.status === 'cancelled'

  const handleCancel = async () => {
    setCancelling(true)
    await onCancel(booking._id)
    setCancelling(false)
  }

  return (
    <div className="booking-item">
      {/* Image */}
      <div className="booking-item__image">
        {booking.property?.images?.length > 0 ? (
          <img src={booking.property.images[0]} alt={booking.property.title} />
        ) : (
          <div className="booking-item__no-image">No image</div>
        )}
      </div>

      {/* Info */}
      <div>
        <p className="booking-item__title">
          {booking.property?.title || 'Property unavailable'}
        </p>
        <p className="booking-item__location">{booking.property?.location}</p>
        <p className="booking-item__dates">
          {formatDate(booking.checkIn)} → {formatDate(booking.checkOut)}
        </p>
        <p className="booking-item__price">Total: ₹{booking.totalPrice}</p>
      </div>

      {/* Status + Cancel */}
      <div className="booking-item__right">
        <span className={`booking-item__status booking-item__status--${booking.status}`}>
          {booking.status}
        </span>
        {!isCancelled && (
          <button
            className="booking-item__btn-cancel"
            onClick={handleCancel}
            disabled={cancelling}
          >
            {cancelling ? 'Cancelling...' : 'Cancel'}
          </button>
        )}
      </div>
    </div>
  )
}

export default Dashboard