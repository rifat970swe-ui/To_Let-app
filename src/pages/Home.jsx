import React, { useEffect, useMemo, useState } from 'react'
import api from '../config/api'
import ListingCard from '../components/ListingCard'
import demoListings from '../data/demoListings'
import { getLocalListings } from '../utils/localListings'

function mergeUniqueById(...groups) {
  const map = new Map()

  groups.flat().forEach((item) => {
    if (item?._id) map.set(item._id, item)
  })

  return Array.from(map.values())
}

export default function Home() {
  const [listings, setListings] = useState(() => mergeUniqueById(demoListings, getLocalListings()))
  const [query, setQuery] = useState('')
  const [city, setCity] = useState('')
  const [type, setType] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const [isLoading, setIsLoading] = useState(true)
  const [dataNotice, setDataNotice] = useState('Loading listings...')

  useEffect(() => {
    let active = true

    async function load() {
      setIsLoading(true)
      const localListings = getLocalListings()

      try {
        const res = await api.get('/api/listings')
        const items = Array.isArray(res.data?.items)
          ? res.data.items
          : (Array.isArray(res.data) ? res.data : [])

        if (!active) return

        if (items.length > 0) {
          setListings(mergeUniqueById(items, localListings))
          setDataNotice('Showing live API listings and your local demo listings.')
        } else {
          setListings(mergeUniqueById(demoListings, localListings))
          setDataNotice('No API listing found. Showing demo and local listings.')
        }
      } catch (err) {
        if (!active) return
        setListings(mergeUniqueById(demoListings, localListings))
        setDataNotice('Backend unavailable. Showing demo and local listings.')
      } finally {
        if (active) setIsLoading(false)
      }
    }

    load()

    return () => {
      active = false
    }
  }, [])

  const cityOptions = useMemo(
    () => Array.from(new Set(listings.map((l) => l.city).filter(Boolean))).sort((a, b) => a.localeCompare(b)),
    [listings],
  )

  const filtered = listings
    .filter((l) => {
      const q = query.trim().toLowerCase()
      const matchesQuery = !q
        || (l.title || '').toLowerCase().includes(q)
        || (l.city || '').toLowerCase().includes(q)
        || (l.description || '').toLowerCase().includes(q)
      const matchesCity = !city || l.city === city
      const matchesType = !type || l.type === type
      const price = Number(l.price || 0)
      const matchesMin = !minPrice || price >= Number(minPrice)
      const matchesMax = !maxPrice || price <= Number(maxPrice)

      return matchesQuery && matchesCity && matchesType && matchesMin && matchesMax
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return Number(a.price || 0) - Number(b.price || 0)
      if (sortBy === 'price-desc') return Number(b.price || 0) - Number(a.price || 0)
      return 0
    })

  function resetFilters() {
    setQuery('')
    setCity('')
    setType('')
    setMinPrice('')
    setMaxPrice('')
    setSortBy('default')
  }

  return (
    <div>
      <section
        className="rounded overflow-hidden mb-8 relative"
        style={{
          backgroundImage: `url('/img/Home/Home-1.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '320px',
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl font-bold">Find your next home or shop</h1>
            <p className="mt-2 text-lg">Search verified listings for rent - homes, shops and more.</p>
            <div className="mt-4 flex gap-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by city, title or keyword"
                className="w-full max-w-md px-3 py-2 rounded"
              />
              <button type="button" onClick={resetFilters} className="bg-indigo-600 text-white px-4 py-2 rounded">Reset</button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded shadow p-4 mb-6 grid grid-cols-1 md:grid-cols-5 gap-3">
        <select value={city} onChange={(e) => setCity(e.target.value)} className="border rounded px-3 py-2">
          <option value="">All cities</option>
          {cityOptions.map((cityName) => (
            <option key={cityName} value={cityName}>{cityName}</option>
          ))}
        </select>

        <select value={type} onChange={(e) => setType(e.target.value)} className="border rounded px-3 py-2">
          <option value="">All types</option>
          <option value="HOME">Home</option>
          <option value="FLAT">Flat</option>
          <option value="SHOP">Shop</option>
        </select>

        <input
          type="number"
          min="0"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="Min price"
          className="border rounded px-3 py-2"
        />

        <input
          type="number"
          min="0"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Max price"
          className="border rounded px-3 py-2"
        />

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border rounded px-3 py-2">
          <option value="default">Default order</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
        </select>
      </section>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-gray-600">{dataNotice}</p>
        <span className="text-sm text-gray-500">{filtered.length} listing found</span>
      </div>

      <h2 className="text-3xl font-semibold mb-6">Discover properties</h2>
      {isLoading ? (
        <div className="bg-white rounded shadow p-8 text-center text-gray-600">
          Loading listings...
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded shadow p-8 text-center text-gray-600">
          No listing matched your filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((l) => (
            <ListingCard key={l._id} listing={l} />
          ))}
        </div>
      )}
    </div>
  )
}
