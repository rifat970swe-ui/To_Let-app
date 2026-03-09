const homeImages = [
  '/img/Home/Home-1.png',
  '/img/Home/Home-2.png',
  '/img/Home/Home-3.jpg',
  '/img/Home/Home-4.jpg',
  '/img/Home/Home-5.jpg',
]

const flatImages = [
  '/img/Flat/Flat-1.png',
  '/img/Flat/Flat-2.png',
  '/img/Flat/Flat-3.png',
  '/img/Flat/Flat-4.png',
  '/img/Flat/Flat-5.png',
  '/img/Flat/Flat-6.png',
]

const shopImages = [
  '/img/Shop/Shop-1.png',
  '/img/Shop/Shop-2.png',
  '/img/Shop/Shop-3.png',
  '/img/Shop/Shop-4.png',
  '/img/Shop/Shop-5.png',
  '/img/Shop/Shop-6.png',
]

const demoListings = [
  ...homeImages.map((img, i) => ({
    _id: `home-${i + 1}`,
    title: `Family Home ${i + 1}`,
    description: 'Comfortable home in a quiet neighborhood with good transport access.',
    price: 22000 + i * 1200,
    currency: 'BDT',
    type: 'HOME',
    address: `House ${12 + i}, Green Road`,
    city: 'Dhaka',
    images: [img],
    owner: { name: 'Demo Owner', email: 'owner@example.com' },
  })),
  ...flatImages.map((img, i) => ({
    _id: `flat-${i + 1}`,
    title: `Modern Flat ${i + 1}`,
    description: 'Well-lit flat with balcony, ideal for small families and professionals.',
    price: 11000 + i * 1500,
    currency: 'BDT',
    type: 'FLAT',
    address: `Flat ${i + 1}, Block B`,
    city: 'Chattogram',
    images: [img],
    owner: { name: 'Demo Owner', email: 'owner@example.com' },
  })),
  ...shopImages.map((img, i) => ({
    _id: `shop-${i + 1}`,
    title: `Commercial Shop ${i + 1}`,
    description: 'Street-facing shop space with strong daily customer traffic.',
    price: 5500 + i * 700,
    currency: 'BDT',
    type: 'SHOP',
    address: `Shop ${i + 1}, Market Lane`,
    city: 'Sylhet',
    images: [img],
    owner: { name: 'Demo Owner', email: 'owner@example.com' },
  })),
]

export default demoListings
