import { useRouter } from 'next/router'
import Head from 'next/head'
import FoodCard from '../../components/FoodCard'

const menuItems = {
  'uncle-rogers-fuiyoh': [
    { name: 'Egg Fried Rice', price: 17.99, image: "/images/eggfriedrice.jpg" },
    { name: 'Chilli Crab', price: 24.99, image: "/images/chilicrab.jpg" },
    { name: 'Kimchi Fried Rice', price: 14.99, image: "/images/kimchifriedrice.jpg" },
  ],
  'jamie-olivers': [
    { name: 'Fish and Chips', price: 15.99, image: '/api/placeholder/400/300' },
    { name: 'Shepherd\'s Pie', price: 13.99, image: '/api/placeholder/400/300' },
    { name: 'Roast Beef', price: 18.99, image: '/api/placeholder/400/300' },
  ],
  'gordon-ramsays': [
    { name: 'Beef Wellington', price: 39.99, image: '/api/placeholder/400/300' },
    { name: 'Lobster Risotto', price: 29.99, image: '/api/placeholder/400/300' },
    { name: 'Sticky Toffee Pudding', price: 9.99, image: '/api/placeholder/400/300' },
  ],
};

export default function RestaurantMenu() {
  const router = useRouter()
  const { restaurantSlug } = router.query

  console.log('Restaurant Slug:', restaurantSlug);

  // Remove the apostrophe from the slug to match the menuItems object keys
  const cleanSlug = restaurantSlug?.replace(/'/g, '');
  console.log('Clean Slug:', cleanSlug);

  const restaurantName = cleanSlug?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Restaurant';
  const menu = menuItems[cleanSlug] || [];

  console.log('Restaurant Name:', restaurantName);
  console.log('Menu Items:', menu);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <Head>
        <title>{`${restaurantName} - Menu`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-white mb-12 text-center">
          {restaurantName} Menu
        </h1>

        {menu.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menu.map((item, index) => (
              <FoodCard key={index} {...item} />
            ))}
          </div>
        ) : (
          <p className="text-white text-center text-xl">No menu items available. (Slug: {cleanSlug})</p>
        )}
      </main>
    </div>
  )
}