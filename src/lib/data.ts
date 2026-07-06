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

export interface Service {
  name: string;
  images?: string[];
  description?: string;
}

export const CARS: Car[] = [
  {
    id: 'swift-dzire',
    name: 'Swift Dzire',
    slug: 'swift-dzire',
    brand: 'Maruti Suzuki',
    type: 'Sedan',
    transmission: 'Manual',
    fuel_type: 'CNG',
    seats: 5,
    price_per_day: 3600,
    images: ['/dzire.png'],
    features: ['Air Conditioning', '4+1 Seating', 'Music System', 'Spacious Boot'],
    description: 'Perfect budget-friendly sedan for business or family trips in and around Pune.',
    is_available: true,
    created_at: new Date().toISOString(),
    price_per_km: 'Rs. 12/km',
    per_day_running: '300km',
    toll_parking: 'Extra',
    capacity: '4 + 1',
    car_type: 'AC/ Non-Ac'
  },
  {
    id: 'toyota-etios',
    name: 'Toyota Etios',
    slug: 'toyota-etios',
    brand: 'Toyota',
    type: 'Sedan',
    transmission: 'Manual',
    fuel_type: 'Diesel',
    seats: 5,
    price_per_day: 3600,
    images: ['/etios.png'],
    features: ['Air Conditioning', '4+1 Seating', 'Reliable Performance', 'Ample Legroom'],
    description: 'Extremely spacious and highly reliable sedan for smooth outstation rides.',
    is_available: true,
    created_at: new Date().toISOString(),
    price_per_km: 'Rs. 12/km | 13/km',
    per_day_running: '300km',
    toll_parking: 'Extra',
    capacity: '4 + 1',
    car_type: 'AC/ Non-Ac'
  },
  {
    id: 'suzuki-ertiga',
    name: 'Suzuki Ertiga',
    slug: 'suzuki-ertiga',
    brand: 'Maruti Suzuki',
    type: 'SUV',
    transmission: 'Manual',
    fuel_type: 'CNG',
    seats: 7,
    price_per_day: 4200,
    images: ['/ertiga.png'],
    features: ['Air Conditioning', '6+1 Seating', 'Smart Hybrid', 'Foldable Seats'],
    description: 'Comfortable and economical 7-seater perfect for family trips and weekend getaways.',
    is_available: true,
    created_at: new Date().toISOString(),
    price_per_km: 'Rs. 14/km | 15/km',
    per_day_running: '300km',
    toll_parking: 'Extra',
    capacity: '6 + 1',
    car_type: 'AC/ Non-Ac'
  },
  {
    id: 'toyota-innova',
    name: 'Toyota Innova',
    slug: 'toyota-innova',
    brand: 'Toyota',
    type: 'SUV',
    transmission: 'Manual',
    fuel_type: 'Diesel',
    seats: 8,
    price_per_day: 5700,
    images: ['/innova.png'],
    features: ['Dual Zone AC', '7+1 / 8 Seating', 'Robust Suspension', 'Luggage Carrier'],
    description: 'The standard of reliability and comfort for long distance group journeys.',
    is_available: true,
    created_at: new Date().toISOString(),
    price_per_km: 'Rs. 19/km | 20/km',
    per_day_running: '300km',
    toll_parking: 'Extra',
    capacity: '6 + 1, 7 + 1',
    car_type: 'AC/ Non-Ac'
  },
  {
    id: 'kia-carens',
    name: 'Kia Carens',
    slug: 'kia-carens',
    brand: 'Kia',
    type: 'SUV',
    transmission: 'Manual',
    fuel_type: 'Diesel',
    seats: 8,
    price_per_day: 4800,
    images: ['/carens.png'],
    features: ['Automatic Climate Control', 'Stylish Design', 'Premium Interiors', '6+1 / 7+1 Seating'],
    description: 'Sleek and feature-packed modern family vehicle ensuring supreme comfort.',
    is_available: true,
    created_at: new Date().toISOString(),
    price_per_km: 'Rs. 16/km | 17/km',
    per_day_running: '300km',
    toll_parking: 'Extra',
    capacity: '6 + 1, 7 + 1',
    car_type: 'AC/ Non-Ac'
  },
  {
    id: 'toyota-innova-crysta',
    name: 'Toyota Innova Crysta',
    slug: 'toyota-innova-crysta',
    brand: 'Toyota',
    type: 'Luxury',
    transmission: 'Manual',
    fuel_type: 'Diesel',
    seats: 5,
    price_per_day: 5700,
    images: ['/innova.png'],
    features: ['Premium Captain Seats', 'Ultra-luxurious Cabin', 'Dual Zone Climate Control', '4+1 Seating'],
    description: 'Chauffeur-driven premium luxury MPV offering unparalleled comfort and style.',
    is_available: true,
    created_at: new Date().toISOString(),
    price_per_km: 'Rs. 19/km | 20/km',
    per_day_running: '300km',
    toll_parking: 'Extra',
    capacity: '4 + 1',
    car_type: 'AC/ Non-Ac'
  },
  {
    id: 'mini-bus',
    name: 'Mini Bus',
    slug: 'mini-bus',
    brand: 'Force',
    type: 'Bus',
    transmission: 'Manual',
    fuel_type: 'Diesel',
    seats: 7,
    price_per_day: 7200,
    images: ['/minibus.png'],
    features: ['High Roof Cabin', 'AC/Non-AC options', '6+1 Seating Layout', 'Wide View Windows'],
    description: 'Spacious and highly comfortable compact passenger coach for medium groups.',
    is_available: true,
    created_at: new Date().toISOString(),
    price_per_km: 'Rs. 24/km | 28/km',
    per_day_running: '300km',
    toll_parking: 'Extra',
    capacity: '6 + 1',
    car_type: 'AC/ Non-Ac'
  },
  {
    id: 'tempo-traveller',
    name: 'Tempo Traveller',
    slug: 'tempo-traveller',
    brand: 'Force Motors',
    type: 'Bus',
    transmission: 'Manual',
    fuel_type: 'Diesel',
    seats: 17,
    price_per_day: 7500,
    images: ['/tempo17.png'],
    features: ['Fully Air Conditioned', 'Pushback Reclining Seats', 'LCD Screen & Music', 'Luggage Carrier'],
    description: 'Perfect solution for family picnics, weddings, and group tour travels.',
    is_available: true,
    created_at: new Date().toISOString(),
    price_per_km: 'Rs. 25/km | 28/km',
    per_day_running: '300km',
    toll_parking: 'Extra',
    capacity: '6 + 1, 7 + 1',
    car_type: 'AC/ Non-Ac'
  }
];

const SERVICES_RAW = [
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
  "Pune to Prati Balaji Mandir Cab",
  "Pune Swaminarayan Mandir Cab",
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
  "Pune to Shrivardhan Cab",
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

export const SERVICES: Service[] = SERVICES_RAW.map(serviceName => {
  if (serviceName === "Airport Taxi in Pune") {
    return {
      name: serviceName,
      images: ["/pune-airport-1.jpg", "/pune-airport-2.jpg"],
      description: "Reliable airport transfers between Pune city and Pune International Airport. Safe, clean, and punctual chauffeur-driven cabs."
    };
  }
  if (serviceName === "Pune to Mumbai Cab" || serviceName === "Pune Mumbai Cab Service") {
    return {
      name: serviceName,
      images: ["/marine-drive.jpg"],
      description: "Premium one-way and round-trip cab services between Pune and Mumbai. Travel comfortably via Express Highway with experienced drivers."
    };
  }
  if (serviceName === "Pune to Shrivardhan Cab") {
    return {
      name: serviceName,
      images: ["/shrivardhan-1.jpg", "/shrivardhan-2.jpg", "/shrivardhan-3.jpg", "/shrivardhan-4.jpg", "/shrivardhan-5.jpg"],
      description: "Safe and comfortable cab service from Pune to the pristine beaches of Shrivardhan. Clean cars, professional drivers, and smooth rides."
    };
  }
  if (serviceName === "Pune to Alibaug cab") {
    return {
      name: serviceName,
      images: ["/alibaug-1.jpg", "/alibaug-2.jpg", "/alibaug-3.jpg", "/alibaug-4.jpg"],
      description: "Book premium chauffeur-driven cabs from Pune to Alibaug. Perfect for weekend beach getaways, fort exploration, and resort holidays."
    };
  }
  if (serviceName === "Pune to Prati Balaji Mandir Cab") {
    return {
      name: serviceName,
      images: ["/balaji-1.jpg", "/balaji-2.jpg", "/balaji-3.jpg"],
      description: "Spiritual day-trip from Pune to the beautiful Prati Balaji Mandir in Ketkawale. Clean vehicles and hassle-free darshan travels."
    };
  }
  if (serviceName === "Pune Swaminarayan Mandir Cab") {
    return {
      name: serviceName,
      images: ["/swaminarayan-1.jpg", "/swaminarayan-2.jpg", "/swaminarayan-3.jpg"],
      description: "Comfortable and hassle-free local sightseeing to the majestic BAPS Shri Swaminarayan Mandir in Pune. Perfect for family visits."
    };
  }
  
  return { name: serviceName };
});

// Let's also create structured Tours for our major/popular packages so they can be viewed on detail pages
export const TOURS: Tour[] = [];
