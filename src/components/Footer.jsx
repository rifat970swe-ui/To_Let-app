import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-white text-xl font-bold">Tolet</h3>
          <p className="mt-2 text-sm">A simple platform for renting homes and shops. Built for student projects and demos.</p>
        </div>

        <div>
          <h4 className="text-white font-semibold">Quick Links</h4>
          <ul className="mt-2 space-y-1 text-sm">
            <li><a className="hover:underline" href="#">Home</a></li>
            <li><a className="hover:underline" href="#">Create Listing</a></li>
            <li><a className="hover:underline" href="#">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold">Contact</h4>
          <p className="mt-2 text-sm">Email: <a className="text-indigo-400 hover:underline" href="mailto:info@tolet.example">info@tolet.example</a></p>
          <p className="mt-1 text-sm">Phone: +880 1234 567890</p>
          <div className="mt-3 flex space-x-3">
            <a className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center hover:bg-indigo-600" href="#" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724 9.866 9.866 0 0 1-3.127 1.195 4.916 4.916 0 0 0-8.379 4.482A13.94 13.94 0 0 1 1.671 3.149a4.916 4.916 0 0 0 1.523 6.573 4.897 4.897 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.934 4.934 0 0 1-2.224.084 4.918 4.918 0 0 0 4.588 3.417A9.867 9.867 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.212c9.057 0 14.01-7.506 14.01-14.01 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.557z"/></svg>
            </a>
            <a className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center hover:bg-indigo-600" href="#" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24h11.495v-9.294H9.69v-3.622h3.13V8.408c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.098 2.794.142v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.311h3.587l-.467 3.622h-3.12V24h6.116C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">© {new Date().getFullYear()} Tolet. All rights reserved.</div>
      </div>
    </footer>
  )
}
