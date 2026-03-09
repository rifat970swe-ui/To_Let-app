import React, { useState } from 'react'
import axios from 'axios'

export default function CreateListing() {
  const [form, setForm] = useState({ title: '', description: '', price: '', city: '', address: '', type: 'HOME', images: [] })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  function onChange(e) {
    const { name, value } = e.target
    setForm((s) => ({ ...s, [name]: value }))
  }

  function onImagesChange(e) {
    const files = Array.from(e.target.files)
    // Convert to local object URLs for preview; uploading not implemented yet
    const urls = files.map((f) => URL.createObjectURL(f))
    setForm((s) => ({ ...s, images: urls }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    try {
      const token = localStorage.getItem('token')
      // For now we POST with image URLs stored locally (not uploaded)
      const payload = {
        ...form,
        price: Number(form.price),
        images: form.images,
      }
      await axios.post('http://localhost:5000/api/listings', payload, {
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      })
      setMessage('Listing created (you may need to refresh the home page)')
      setForm({ title: '', description: '', price: '', city: '', address: '', type: 'HOME', images: [] })
    } catch (err) {
      console.error(err)
      setMessage('Error creating listing. Ensure the server is running and you are authenticated.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded shadow p-6">
      <h2 className="text-2xl font-semibold mb-4">Create Listing</h2>
      {message && <div className="mb-4 text-sm text-green-700">{message}</div>}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input name="title" value={form.title} onChange={onChange} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea name="description" value={form.description} onChange={onChange} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Price</label>
            <input name="price" value={form.price} onChange={onChange} className="mt-1 block w-full border rounded px-3 py-2" />
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
            <input name="city" value={form.city} onChange={onChange} className="mt-1 block w-full border rounded px-3 py-2" />
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
