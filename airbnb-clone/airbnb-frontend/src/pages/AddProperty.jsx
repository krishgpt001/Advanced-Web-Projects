import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import './AddProperty.css'

const AddProperty = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    title: '', description: '', price: '',
    location: '', maxGuests: '', amenities: '', images: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        maxGuests: Number(formData.maxGuests),
        amenities: formData.amenities
          ? formData.amenities.split(',').map(a => a.trim()).filter(Boolean)
          : [],
        images: formData.images
          ? formData.images.split(',').map(i => i.trim()).filter(Boolean)
          : []
      }
      await api.post('/properties', payload)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create property')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="add-property">
      <h2 className="add-property__title">List your property</h2>

      {error && <p className="add-property__error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="add-property__field">
          <label className="add-property__label">Title *</label>
          <input
            className="add-property__input"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Cozy apartment in Bandra"
            required
          />
        </div>

        <div className="add-property__field">
          <label className="add-property__label">Description *</label>
          <textarea
            className="add-property__textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your place..."
            required
          />
        </div>

        <div className="add-property__row">
          <div>
            <label className="add-property__label">Price per night (₹) *</label>
            <input
              className="add-property__input"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="2500"
              min="1"
              required
            />
          </div>
          <div>
            <label className="add-property__label">Max guests *</label>
            <input
              className="add-property__input"
              type="number"
              name="maxGuests"
              value={formData.maxGuests}
              onChange={handleChange}
              placeholder="4"
              min="1"
              required
            />
          </div>
        </div>

        <div className="add-property__field">
          <label className="add-property__label">Location *</label>
          <input
            className="add-property__input"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Mumbai, Maharashtra"
            required
          />
        </div>

        <div className="add-property__field">
          <label className="add-property__label">Amenities</label>
          <input
            className="add-property__input"
            type="text"
            name="amenities"
            value={formData.amenities}
            onChange={handleChange}
            placeholder="WiFi, AC, Parking, Pool"
          />
          <small className="add-property__hint">Separate with commas</small>
        </div>

        <div className="add-property__field">
          <label className="add-property__label">Image URLs</label>
          <input
            className="add-property__input"
            type="text"
            name="images"
            value={formData.images}
            onChange={handleChange}
            placeholder="https://image1.com, https://image2.com"
          />
          <small className="add-property__hint">Paste image URLs separated by commas</small>
        </div>

        <button className="add-property__btn" type="submit" disabled={loading}>
          {loading ? 'Creating listing...' : 'Create listing'}
        </button>
      </form>
    </div>
  )
}

export default AddProperty