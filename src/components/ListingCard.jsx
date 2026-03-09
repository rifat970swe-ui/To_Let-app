import React from 'react'
import { Link } from 'react-router-dom'

export default function ListingCard({ listing }) {
  const coverImage = listing.images?.[0] || '/img/Home/Home-1.png'

  return (
    <article className="bg-white rounded shadow overflow-hidden">
      <Link to={`/listing/${listing._id}`}>
        <img src={coverImage} alt={listing.title} className="w-full h-48 object-cover" />
      </Link>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{listing.title}</h3>
        <p className="text-gray-500">{listing.city}</p>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-indigo-600 font-bold">{listing.currency} {listing.price}</div>
          <Link to={`/listing/${listing._id}`} className="text-sm text-gray-600">View</Link>
        </div>
      </div>
    </article>
  )
}
