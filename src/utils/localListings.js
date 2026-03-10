const STORAGE_KEY = 'tolet_local_listings'

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (err) {
    return []
  }
}

function writeStorage(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function getLocalListings() {
  return readStorage()
}

export function createLocalListing(payload) {
  const item = {
    _id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: payload.title || '',
    description: payload.description || '',
    price: Number(payload.price || 0),
    currency: payload.currency || 'BDT',
    type: payload.type || 'HOME',
    city: payload.city || '',
    address: payload.address || '',
    images: Array.isArray(payload.images) ? payload.images : [],
    owner: payload.owner || { name: 'Local Demo User' },
    source: 'local',
    createdAt: new Date().toISOString(),
  }

  const current = readStorage()
  current.unshift(item)
  writeStorage(current)
  return item
}

export function findLocalListingById(id) {
  return readStorage().find((item) => item._id === id) || null
}
