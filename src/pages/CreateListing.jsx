import React, { useState } from 'react'
import api from '../config/api'
import { createLocalListing } from '../utils/localListings'

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result || ''))
    reader.onerror = () => reject(new Error('Failed to read image file'))
    reader.readAsDataURL(file)
  })
}

export default function CreateListing() {
  const [form, setForm] = useState({ title: '', description: '', price: '', city: '', address: '', type: 'HOME', images: [] })
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState({ type: '', text: '' })

  function onChange(e) {
    const { name, value } = e.target
    setForm((s) => ({ ...s, [name]: value }))
  }

  async function onImagesChange(e) {
    const files = Array.from(e.target.files)
    if (files.length === 0) {
      setForm((s) => ({ ...s, images: [] }))
      return
    }

    try {
      const dataUrls = await Promise.all(files.map((file) => fileToDataUrl(file)))
      setForm((s) => ({ ...s, images: dataUrls }))
    } catch (err) {
      setStatus({ type: 'error', text: 'Could not read selected images.' })
    }
  }

  async function onSubmit(e) {
    e.preventDefault()

    if (!form.title.trim() || !form.city.trim() || !form.price) {
      setStatus({ type: 'error', text: 'Title, city and price are required.' })
      return
    }

    setSaving(true)
    setStatus({ type: '', text: '' })

    const payload = {
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      city: form.city.trim(),
      address: form.address.trim(),
      price: Number(form.price),
      images: form.images,
    }

    try {
      const token = localStorage.getItem('token')

      await api.post('/api/listings', payload, {
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      })
      setStatus({ type: 'success', text: 'Listing created on server.' })
      setForm({ title: '', description: '', price: '', city: '', address: '', type: 'HOME', images: [] })
    } catch (err) {
      createLocalListing(payload)
      setStatus({ type: 'warning', text: 'Backend unavailable. Listing saved locally for demo mode.' })
      setForm({ title: '', description: '', price: '', city: '', address: '', type: 'HOME', images: [] })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded shadow p-6">
      <h2 className="text-2xl font-semibold mb-4">Create Listing</h2>
      <p className="mb-4 text-sm text-gray-500">If server is offline, listing will be saved to local demo storage.</p>
      {status.text ? (
        <div
          className={`mb-4 text-sm ${
            status.type === 'error'
              ? 'text-red-700'
              : status.type === 'warning'
                ? 'text-amber-700'
                : 'text-green-700'
          }`}
        >
          {status.text}
        </div>
      ) : null}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input name="title" value={form.title} onChange={onChange} className="mt-1 block w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea name="description" value={form.description} onChange={onChange} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Price</label>
            <input type="number" min="0" name="price" value={form.price} onChange={onChange} className="mt-1 block w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Type</label>
            <select name="type" value={form.type} onChange={onChange} className="mt-1 block w-full border rounded px-3 py-2">
              <option value="HOME">Home</option>
              <option value="FLAT">Flat</option>
              <option value="SHOP">Shop</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">City</label>
            <input name="city" value={form.city} onChange={onChange} className="mt-1 block w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Address</label>
            <input name="address" value={form.address} onChange={onChange} className="mt-1 block w-full border rounded px-3 py-2" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Images</label>
          <input type="file" multiple accept="image/*" onChange={onImagesChange} className="mt-1" />
          <div className="mt-2 flex gap-2">
            {form.images.map((src, i) => (
              <img key={i} src={src} alt={`preview-${i}`} className="w-24 h-16 object-cover rounded" />
            ))}
          </div>
        </div>
        <div>
          <button type="submit" disabled={saving} className="bg-indigo-600 text-white px-4 py-2 rounded">{saving ? 'Saving...' : 'Create'}</button>
        </div>
      </form>
    </div>
  )
}
