import { Car } from './types/cars';

export interface Tour {
  id: string;
  title: string;
  slug: string;
  destination: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  category: string;
  included: string[];
  itinerary: { day: number; title: string; content: string }[];
}

export const CARS: Car[] = [
  {
    id: 'dzire',
    name: 'New Dizire 4+1',
    slug: 'new-dzire-4-1',
    brand: 'Maruti Suzuki',
    type: 'Sedan',
    transmission: 'Manual',
    fuel_type: 'Petrol',
    seats: 5,
    price_per_day: 2200,
    images: ['/dzire.png'],
    features: ['Air Conditioning', '4+1 Seating', 'Music System', 'Spacious Boot'],
    description: 'Perfect budget-friendly sedan for business or family trips.',
    is_available: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'ertiga',
    name: 'New Ertiga 6+1',
    slug: 'new-ertiga-6-1',
    brand: 'Maruti Suzuki',
    type: 'SUV',
    transmission: 'Manual',
    fuel_type: 'CNG',
    seats: 7,
    price_per_day: 3200,
    images: ['/ertiga.png'],
    features: ['Air Conditioning', '6+1 Seating', 'Bluetooth Music', 'Comfortable Ride'],
    description: 'Versatile 7-seater perfect for group travel and long weekend trips.',
    is_available: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'innova-crysta',
    name: 'Innova crysta 6+1',
    slug: 'innova-crysta-6-1',
    brand: 'Toyota',
    type: 'Luxury',
    transmission: 'Manual',
    fuel_type: 'Diesel',
    seats: 7,
    price_per_day: 4500,
    images: ['/innova.png'],
    features: ['Dual Zone AC', 'Captain Seats', 'Premium Interior', '6+1 Seating'],
    description: 'High-end comfort and supreme build quality for ultimate travel satisfaction.',
    is_available: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'scorpio-11',
    name: 'Scorpio 11 7+1',
    slug: 'scorpio-11-7-1',
    brand: 'Mahindra',
    type: 'SUV',
    transmission: 'Manual',
    fuel_type: 'Diesel',
    seats: 8,
    price_per_day: 3800,
    images: ['/scorpio.png'],
    features: ['Rugged Build', 'Excellent Suspension', '7+1 Seating', 'Powerful Engine'],
    description: 'Adventure-ready SUV with high road presence and spacious seating.',
    is_available: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'tempo-17',
    name: 'Tampo travel 17 seater',
    slug: 'tempo-traveller-17-seater',
    brand: 'Force Motors',
    type: 'Bus',
    transmission: 'Manual',
    fuel_type: 'Diesel',
    seats: 17,
    price_per_day: 6500,
    images: ['/tempo17.png'],
    features: ['A/C', '17 Reclining Seats', 'Huge Luggage space', 'TV System'],
    description: 'Highly popular and comfortable ride for large families, tours, and wedding groups.',
    is_available: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'tempo-32',
    name: 'Tampo travel 32  seater',
    slug: 'tempo-traveller-32-seater',
    brand: 'Force Motors',
    type: 'Bus',
    transmission: 'Manual',
    fuel_type: 'Diesel',
    seats: 32,
    price_per_day: 9500,
    images: ['/tempo32.png'],
    features: ['Fully Air Conditioned', '32 Comfortable Seats', 'Entertainment Screen', 'Heavy Luggage Support'],
    description: 'Perfect solution for luxury corporate tours, conventions, and large group outings.',
    is_available: true,
    created_at: new Date().toISOString()
  }
];

export const SERVICES = [
  "Cab Hire Pune",
  "Corporate Cab Booking",
  "Out Station Car Rental",
  "Airport Taxi in Pune",
  "Pune to Mumbai Cab",
  "Pune to Shirdi Cab",
  "Pune to Adlabs Imagica Cab",
  "Pune to Lonavla cab",
  "Pune to Lavasa Cab",
  "Pune to Mahabaleshwar Cab",
  "Pune to Matheran Cab",
  "Pune to Satara Cab",
  "Pune to Ellora Ajanta-Verul Taxi",
  "Pune to Ashtavinayak Cab",
  "Pune to Trimbakeshwar Cab",
  "Pune to Shegaon cab",
  "Pune to Tuljapur Cab",
  "Pune to Pandharpur Cab",
  "Pach Jyotirlinga Darshan",
  "One Way Taxi Service",
  "Pune to Bhimashankar Cab",
  "Pune to Nashik Cab",
  "Pune to Aurangabad Cab",
  "Pune to Kolhapur Cab",
  "Pune to Sangli Cab",
  "Pune to Nagpur cab",
  "Pune to Latur cab",
  "Pune to Harihareshwar Cab",
  "Pune to Ganpatipule Cab",
  "Pune to Goa Cab",
  "Pune to Alibaug cab",
  "Pune to Murud Janjira Cab",
  "Pune to Ratnagiri Cab",
  "Pune to Raigad Cab",
  "Pune to Tarkarli Cab",
  "Pune to Dapoli Cab Service",
  "Cab Booking FAQs",
  "Terms And Condition",
  "Privacy Policy",
  "Round Trip Cab Booking Pune",
  "Blog",
  "Online Cab Service Pune",
  "7 Seater Cabs on Rent in Pune",
  "Cab Service in Pune",
  "Car Hire in Pune",
  "Car Provider In Pune",
  "Innova on Rent Pune",
  "Mini Bus Hire in Pune",
  "New Ertiga on Rent in Pune",
  "Pune to Navi Mumbai Cab",
  "Sedan Car for Rent in Pune",
  "Swift Dzire on Rent in Pune",
  "Tempo Traveller On Rent Pune",
  "Wedding Car Rental Pune",
  "Innova Crysta for Outstation in Pune",
  "Kia Carens Cabs on Rent in Pune",
  "Pune Airport to Outstation Cab Fare",
  "Pune to Mumbai International Airport Cab",
  "Pune to Thane Cab",
  "Pune to Panvel Cab",
  "Pune to Konkan Darshan Cab",
  "Pune to Indore Cab",
  "Pune to Gujarat Cabs",
  "Pune to Bangalore cab",
  "Pune to Ayodhya cab",
  "Pune to Akkalkot cab",
  "Pune Airport to Shirdi cab",
  "Car Hire for Outstation Tours in Pune",
  "Pune to Panchgani Cab",
  "Pune to Jejuri Cab",
  "Innova Crysta On Rent in Pune",
  "Pune to Ahmednagar Cab",
  "Mumbai Airport to Pune Cab",
  "Maruti Ertiga On Rent in Pune",
  "Pune Airport to Mahabaleshwar Cab",
  "Pune Railway Station to Mahabaleshwar Taxi fare",
  "Pune to Devkund Waterfall Cab",
  "Pune Mumbai Cab Service"
];

// Let's also create structured Tours for our major/popular packages so they can be viewed on detail pages
export const TOURS: Tour[] = [
  {
    id: 'mahabaleshwar-weekend',
    title: 'Mahabaleshwar Weekend Gateway',
    slug: 'mahabaleshwar-weekend',
    destination: 'Mahabaleshwar',
    description: 'Experience the magic of Mahabaleshwar with our specially curated weekend package. From the panoramic views of Arthur Seat to the sweet taste of Mapro Garden strawberries, this tour covers the best of the hill station.',
    price: 3500,
    duration: '2 Days, 1 Night',
    image: '/mahabaleshwar.png',
    category: 'Hill Station',
    included: ['Transportation', 'Hotel Stay', 'Sightseeing', 'Breakfast'],
    itinerary: [
      { day: 1, title: 'Arrival & Local Sightseeing', content: 'Arrive at Mahabaleshwar, check-in to your hotel. Visit Venna Lake, Old Mahabaleshwar Temple, and Arthur Seat.' },
      { day: 2, title: 'Panchgani & Departure', content: 'Morning visit to Mapro Garden and Table Land in Panchgani. Late afternoon departure back to Pune.' }
    ]
  },
  {
    id: 'konkan-beach-paradise',
    title: 'Konkan Beach Paradise',
    slug: 'konkan-beach-paradise',
    destination: 'Konkan',
    description: 'Discover the pristine beaches and delicious seafood of Konkan. This tour takes you to the most serene coastal spots where the greenery meets the Arabian Sea.',
    price: 5999,
    duration: '3 Days, 2 Nights',
    image: '/konkan.png',
    category: 'Beach',
    included: ['AC Transportation', 'Beachfront Resort', 'Sightseeing', 'Dinner'],
    itinerary: [
      { day: 1, title: 'Coastal Arrival', content: 'Travel to Konkan via the scenic Tamhini Ghat. Relax at the beach in the evening.' },
      { day: 2, title: 'Water Sports & Forts', content: 'Visit Janjira Fort and enjoy water sports at the local beach.' },
      { day: 3, title: 'Temple Visit & Return', content: 'Visit Ganpatipule Temple and head back to Pune with sweet memories.' }
    ]
  },
  {
    id: 'shirdi-spiritual-tour',
    title: 'Spiritual Shirdi Tour',
    slug: 'shirdi-spiritual-tour',
    destination: 'Shirdi',
    description: 'Embark on a sacred journey to the holy town of Shirdi, home to the revered saint Sai Baba. Find peace and seek blessings with a hassle-free round trip from Pune.',
    price: 1500,
    duration: '1 Day',
    image: '/hero-bg.png',
    category: 'Spiritual',
    included: ['AC Cab Travel', 'Fuel and Toll charges', 'Sai Temple Darshan guidance', 'Driver allowance'],
    itinerary: [
      { day: 1, title: 'Travel & Darshan', content: 'Early morning pickup from Pune, travel to Shirdi. Enjoy VIP/normal darshan at the Sai Baba Temple, visit Dwarkamai and Chavadi. Return to Pune in the evening.' }
    ]
  },
  {
    id: 'lonavala-khandala-bliss',
    title: 'Lonavala & Khandala Bliss',
    slug: 'lonavala-khandala-bliss',
    destination: 'Lonavala',
    description: 'Take a break with a refreshing tour of Lonavala and Khandala. Enjoy beautiful valleys, pristine lakes, waterfalls, and delicious local chikki.',
    price: 2999,
    duration: '2 Days, 1 Night',
    image: '/mahabaleshwar.png',
    category: 'Hill Station',
    included: ['AC Transportation', 'Hotel accommodation', 'Sightseeing tour', 'Breakfast'],
    itinerary: [
      { day: 1, title: 'Lonavala Lakes & Caves', content: 'Drive to Lonavala. Visit Bhushi Dam, Tiger Point, Karla Caves, and explore local markets.' },
      { day: 2, title: 'Khandala Points & Departure', content: 'Visit Sunset Point, Rajmachi Garden, and Duke\'s Nose. Return to Pune in the evening.' }
    ]
  }
];
