// components/FoodCard.js
import { Star } from 'lucide-react'

export default function FoodCard({ name, rating }) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{name}</h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <div className="flex items-center">
            <Star className="text-yellow-400" size={20} />
            <span className="ml-1">{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
      <div className="px-4 py-4 sm:px-6">
        <button
          type="button"
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Rate this restaurant
        </button>
      </div>
    </div>
  )
}