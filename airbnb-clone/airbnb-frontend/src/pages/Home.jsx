import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import './Home.css'

const Home = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState({
    location: '', minPrice: '', maxPrice: '', guests: ''
  })

  const fetchProperties = useCallback(async (filters = {}) => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (filters.location) params.append('location', filters.location)
      if (filters.minPrice) params.append('minPrice', filters.minPrice)
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice)
      if (filters.guests) params.append('guests', filters.guests)
      const res = await api.get(`/properties?${params.toString()}`)
      setProperties(res.data)
    } catch (err) {
      console.error(err)
      setError('Failed to load properties')
    } finally {
      setLoading(false)
    }
  },[])

  useEffect(() => {
    const loadProperties = async () => {
      await fetchProperties()
    }
    loadProperties()
  }, [fetchProperties])

  const handleSearch = (e) => {
    e.preventDefault()
    fetchProperties(search)
  }

  const handleClear = () => {
    setSearch({ location: '', minPrice: '', maxPrice: '', guests: '' })
    fetchProperties()
  }

  return (
    <div className="home">
      <form className="home__search" onSubmit={handleSearch}>
        <input
          className="home__search-input"
          type="text"
          placeholder="Location"
          value={search.location}
          onChange={(e) => setSearch({ ...search, location: e.target.value })}
        />
        <input
          className="home__search-input home__search-input--short"
          type="number"
          placeholder="Min price"
          value={search.minPrice}
          onChange={(e) => setSearch({ ...search, minPrice: e.target.value })}
        />
        <input
          className="home__search-input home__search-input--short"
          type="number"
          placeholder="Max price"
          value={search.maxPrice}
          onChange={(e) => setSearch({ ...search, maxPrice: e.target.value })}
        />
        <input
          className="home__search-input home__search-input--xshort"
          type="number"
          placeholder="Guests"
          value={search.guests}
          onChange={(e) => setSearch({ ...search, guests: e.target.value })}
        />
        <button className="home__btn-search" type="submit">Search</button>
        <button className="home__btn-clear" type="button" onClick={handleClear}>Clear</button>
      </form>

      {loading && <p className="home__status">Loading properties...</p>}
      {error && <p className="home__status home__status--error">{error}</p>}
      {!loading && properties.length === 0 && (
        <p className="home__status">No properties found.</p>
      )}

      <div className="home__grid">
        {properties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
    </div>
  )
}

const PropertyCard = ({ property }) => (
  <Link to={`/property/${property._id}`}>
    <div className="property-card">
      <div className="property-card__image">
        {property.images?.length > 0 ? (
          <img src={property.images[0]} alt={property.title} />
        ) : (
          <div className="property-card__no-image">No image</div>
        )}
      </div>
      <div className="property-card__info">
        <p className="property-card__title">{property.title}</p>
        <p className="property-card__location">{property.location}</p>
        <p className="property-card__price">
          ₹{property.price}<span> / night</span>
        </p>
        <p className="property-card__guests">Up to {property.maxGuests} guests</p>
      </div>
    </div>
  </Link>
)

export default Home