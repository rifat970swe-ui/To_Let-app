import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import demoListings from '../data/demoListings'

export default function Listing() {
  const { id } = useParams()
  const [listing, setListing] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get(`http://localhost:5000/api/listings/${id}`)
        setListing(res.data)
      } catch (err) {
        console.warn('API not reachable or listing not found, falling back to demo data')
        const demo = demoListings.find((d) => d._id === id)
        if (demo) setListing(demo)
      }
    }
    load()
  }, [id])

  if (!listing) return <div>Loading...</div>

  const coverImage = listing.images?.[0] || '/img/Home/Home-1.png'

  return (
    <div className="max-w-3xl mx-auto bg-white rounded shadow p-6">
      <img src={coverImage} alt={listing.title} className="w-full h-64 object-cover rounded mb-4" />
      <h2 className="text-2xl font-bold">{listing.title}</h2>
      <p className="text-gray-600 mt-2">{listing.city} | {listing.address}</p>
      <p className="text-xl font-semibold mt-4">{listing.currency} {listing.price}</p>
      <p className="mt-4">{listing.description}</p>
    </div>
  )
}
