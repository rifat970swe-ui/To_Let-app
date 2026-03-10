import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api, { API_ENABLED } from '../config/api'
import demoListings from '../data/demoListings'
import { findLocalListingById } from '../utils/localListings'

export default function Listing() {
  const { id } = useParams()
  const [listing, setListing] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [source, setSource] = useState('')

  useEffect(() => {
    let active = true

    async function load() {
      setIsLoading(true)

      if (!API_ENABLED) {
        const local = findLocalListingById(id)
        if (!active) return
        if (local) {
          setListing(local)
          setSource('local')
          setIsLoading(false)
          return
        }

        const demo = demoListings.find((d) => d._id === id)
        if (!active) return
        if (demo) {
          setListing(demo)
          setSource('demo')
        } else {
          setListing(null)
          setSource('')
        }
        setIsLoading(false)
        return
      }

      try {
        const res = await api.get(`/api/listings/${id}`)
        if (!active) return

        setListing(res.data)
        setSource('api')
      } catch (err) {
        if (!active) return

        const local = findLocalListingById(id)
        if (local) {
          setListing(local)
          setSource('local')
          setIsLoading(false)
          return
        }

        const demo = demoListings.find((d) => d._id === id)
        if (demo) {
          setListing(demo)
          setSource('demo')
        } else {
          setListing(null)
          setSource('')
        }
      } finally {
        if (active) setIsLoading(false)
      }
    }

    load()

    return () => {
      active = false
    }
  }, [id])

  if (isLoading) return <div>Loading listing...</div>

  if (!listing) {
    return (
      <div className="max-w-3xl mx-auto bg-white rounded shadow p-6 text-gray-600">
        Listing not found. Try going back to the home page.
      </div>
    )
  }

  const coverImage = listing.images?.[0] || '/img/Home/Home-1.png'

  return (
    <div className="max-w-3xl mx-auto bg-white rounded shadow p-6">
      <img src={coverImage} alt={listing.title} className="w-full h-64 object-cover rounded mb-4" />
      <h2 className="text-2xl font-bold">{listing.title}</h2>
      <p className="text-gray-600 mt-2">{listing.city} | {listing.address}</p>
      {source ? (
        <p className="mt-2 text-sm text-gray-500">
          Data source: {source === 'api' ? 'Live API' : source === 'local' ? 'Local demo storage' : 'Built-in demo data'}
        </p>
      ) : null}
      <p className="text-xl font-semibold mt-4">{listing.currency} {listing.price}</p>
      <p className="mt-4">{listing.description}</p>
    </div>
  )
}
