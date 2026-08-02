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
    name: 'Sedan Car (Swift Dzire)',
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
    car_type: 'AC/ Non-AC'
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
    price_per_km: 'Rs. 12/km',
    per_day_running: '300km',
    toll_parking: 'Extra',
    capacity: '4 + 1',
    car_type: 'AC/ Non-AC'
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
    price_per_km: 'Rs. 15/km',
    per_day_running: '300km',
    toll_parking: 'Extra',
    capacity: '6 + 1',
    car_type: 'AC/ Non-AC'
  },
  {
    id: 'mahindra-scorpio',
    name: 'Mahindra Scorpio',
    slug: 'mahindra-scorpio',
    brand: 'Mahindra',
    type: 'SUV',
    transmission: 'Manual',
    fuel_type: 'Diesel',
    seats: 7,
    price_per_day: 4800,
    images: ['/scorpio.png'],
    features: ['Powerful AC', '6+1 Seating', 'High Ground Clearance', 'Rugged Performance', 'Luggage Space'],
    description: 'Robust and high-performance SUV for smooth long highway journeys and hilly terrains.',
    is_available: true,
    created_at: new Date().toISOString(),
    price_per_km: 'Rs. 17/km',
    per_day_running: '300km',
    toll_parking: 'Extra',
    capacity: '6 + 1',
    car_type: 'AC/ Non-AC'
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
    price_per_day: 5400,
    images: ['/innova.png'],
    features: ['Dual Zone AC', '6+1 / 7+1 Seating', 'Robust Suspension', 'Luggage Carrier'],
    description: 'The standard of reliability and comfort for long distance group journeys.',
    is_available: true,
    created_at: new Date().toISOString(),
    price_per_km: 'Rs. 18/km',
    per_day_running: '300km',
    toll_parking: 'Extra',
    capacity: '6 + 1, 7 + 1',
    car_type: 'AC/ Non-AC'
  },
  {
    id: 'toyota-innova-crysta',
    name: 'Toyota Innova Crysta',
    slug: 'toyota-innova-crysta',
    brand: 'Toyota',
    type: 'Luxury',
    transmission: 'Manual',
    fuel_type: 'Diesel',
    seats: 7,
    price_per_day: 6000,
    images: ['/innova.png'],
    features: ['Premium Captain Seats', 'Ultra-luxurious Cabin', 'Dual Zone Climate Control', '6+1 Seating'],
    description: 'Chauffeur-driven premium luxury MPV offering unparalleled comfort and style.',
    is_available: true,
    created_at: new Date().toISOString(),
    price_per_km: 'Rs. 20/km',
    per_day_running: '300km',
    toll_parking: 'Extra',
    capacity: '6 + 1',
    car_type: 'AC/ Non-AC'
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
    price_per_km: 'Rs. 16/km',
    per_day_running: '300km',
    toll_parking: 'Extra',
    capacity: '6 + 1, 7 + 1',
    car_type: 'AC/ Non-AC'
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
    features: ['AC & Non-AC Options', '17 Seater Layout', 'Pushback Reclining Seats', 'LCD Screen & Music', 'Luggage Carrier'],
    description: 'Perfect solution for family tours, group outings, and outstation trips.',
    is_available: true,
    created_at: new Date().toISOString(),
    price_per_km: 'Rs. 24/km (Non-AC) | Rs. 28/km (AC)',
    per_day_running: '300km',
    toll_parking: 'Extra',
    capacity: '17 + 1',
    car_type: 'Non-AC (Rs. 24/km) / AC (Rs. 28/km)'
  },
  {
    id: 'honda-city',
    name: 'Honda City',
    slug: 'honda-city',
    brand: 'Honda',
    type: 'Sedan',
    transmission: 'Manual',
    fuel_type: 'Petrol',
    seats: 5,
    price_per_day: 4200,
    images: ['/honda-city.png'],
    features: ['Automatic Climate Control', 'Leatherette Upholstery', '4+1 Seating', 'Smooth Highway Cruiser'],
    description: 'Executive luxury sedan offering unmatched comfort, quiet cabin, and premium travel experience.',
    is_available: true,
    created_at: new Date().toISOString(),
    price_per_km: 'Rs. 14/km',
    per_day_running: '300km',
    toll_parking: 'Extra',
    capacity: '4 + 1',
    car_type: 'AC'
  },
  {
    id: 'maruti-wagonr',
    name: 'Maruti WagonR',
    slug: 'maruti-wagonr',
    brand: 'Maruti Suzuki',
    type: 'Hatchback',
    transmission: 'Manual',
    fuel_type: 'CNG',
    seats: 4,
    price_per_day: 2800,
    images: ['/wagonr.png'],
    features: ['Air Conditioning', 'Tall Boy Design', 'Economical Travel', '3+1 Seating'],
    description: 'Best budget-friendly compact hatchback for quick local city travel and short errands.',
    is_available: true,
    created_at: new Date().toISOString(),
    price_per_km: 'Rs. 10/km',
    per_day_running: '300km',
    toll_parking: 'Extra',
    capacity: '3 + 1',
    car_type: 'AC/ Non-AC'
  },
  {
    id: 'toyota-fortuner',
    name: 'Toyota Fortuner',
    slug: 'toyota-fortuner',
    brand: 'Toyota',
    type: 'Luxury',
    transmission: 'Automatic',
    fuel_type: 'Diesel',
    seats: 7,
    price_per_day: 9500,
    images: ['/fortuner.png'],
    features: ['4x4 All-Wheel Drive', 'VIP Interior', '6+1 Seating', 'Ultimate Presence'],
    description: 'Flagship luxury SUV for VIP guests, corporate delegation, grand weddings, and executive travel.',
    is_available: true,
    created_at: new Date().toISOString(),
    price_per_km: 'Rs. 35/km',
    per_day_running: '300km',
    toll_parking: 'Extra',
    capacity: '6 + 1',
    car_type: 'AC'
  },
  {
    id: 'tempo-32',
    name: 'Tempo Traveller (32 Seater)',
    slug: 'tempo-32',
    brand: 'Force Motors',
    type: 'Bus',
    transmission: 'Manual',
    fuel_type: 'Diesel',
    seats: 32,
    price_per_day: 9500,
    images: ['/tempo32.png'],
    features: ['AC & Non-AC Options', '32 Reclining Seats', 'HD Music & Entertainment', 'Huge Luggage Bay'],
    description: 'Spacious 32-seater luxury coach ideal for large marriage groups, corporate outings, and pilgrimage tours.',
    is_available: true,
    created_at: new Date().toISOString(),
    price_per_km: 'Rs. 28/km (Non-AC) | Rs. 32/km (AC)',
    per_day_running: '300km',
    toll_parking: 'Extra',
    capacity: '32 + 1',
    car_type: 'Non-AC (Rs. 28/km) / AC (Rs. 32/km)'
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
  const lower = serviceName.toLowerCase();

  // Airport services
  if (lower.includes("airport") || lower.includes("flight")) {
    return {
      name: serviceName,
      images: ["/pune-airport-1.jpg", "/pune-airport-2.jpg"],
      description: "Punctual & comfortable airport transfers connecting Pune Airport with Mumbai Airport and outstation locations."
    };
  }

  // Mumbai / Thane / Panvel / Navi Mumbai
  if (lower.includes("mumbai") || lower.includes("thane") || lower.includes("panvel")) {
    return {
      name: serviceName,
      images: ["/marine-drive.jpg"],
      description: "Expressway cab service between Pune and Mumbai. Available for one-way drops and round trips 24/7."
    };
  }

  // Shirdi & Pilgrimage
  if (lower.includes("shirdi") || lower.includes("shegaon") || lower.includes("tuljapur") || lower.includes("pandharpur") || lower.includes("akkalkot") || lower.includes("ayodhya")) {
    return {
      name: serviceName,
      images: ["/shirdi.jpg"],
      description: "Spiritual pilgrimage tour package with experienced drivers, smooth highway rides, and hassle-free temple darshan."
    };
  }

  // Lonavala & Khandala & Devkund
  if (lower.includes("lonavla") || lower.includes("lonavala") || lower.includes("devkund")) {
    return {
      name: serviceName,
      images: ["/lonavala.jpg"],
      description: "Scenic weekend cab trips to Lonavala, Khandala, and Devkund waterfalls with professional mountain drivers."
    };
  }

  // Mahabaleshwar & Panchgani
  if (lower.includes("mahabaleshwar") || lower.includes("panchgani") || lower.includes("satara")) {
    return {
      name: serviceName,
      images: ["/mahabaleshwar.png"],
      description: "Hill station car rental to Mahabaleshwar and Panchgani. Enjoy viewpoints, strawberry farms, and cool weather."
    };
  }

  // Shrivardhan & Harihareshwar
  if (lower.includes("shrivardhan") || lower.includes("harihareshwar")) {
    return {
      name: serviceName,
      images: ["/shrivardhan-1.jpg", "/shrivardhan-2.jpg", "/shrivardhan-3.jpg"],
      description: "Beach tour cab service to Shrivardhan and Harihareshwar. Clean air-conditioned cars for relaxing coastal getaways."
    };
  }

  // Alibaug & Murud Janjira
  if (lower.includes("alibaug") || lower.includes("murud")) {
    return {
      name: serviceName,
      images: ["/alibaug-1.jpg", "/alibaug-2.jpg"],
      description: "Popular weekend getaway cabs from Pune to Alibaug beaches, forts, and luxury coastal resorts."
    };
  }

  // Balaji & Swaminarayan
  if (lower.includes("balaji")) {
    return {
      name: serviceName,
      images: ["/balaji-1.jpg", "/balaji-2.jpg"],
      description: "Dedicated day-trip cab service to Prati Balaji Mandir Ketkawale with family-friendly seating and clean vehicles."
    };
  }
  if (lower.includes("swaminarayan")) {
    return {
      name: serviceName,
      images: ["/swaminarayan-1.jpg", "/swaminarayan-2.jpg"],
      description: "Local sightseeing cab package to the magnificent BAPS Shri Swaminarayan Mandir Pune."
    };
  }

  // Trimbakeshwar / Nashik / Bhimashankar / Jyotirlinga
  if (lower.includes("trimbakeshwar") || lower.includes("nashik") || lower.includes("jyotirlinga") || lower.includes("bhimashankar") || lower.includes("ashtavinayak") || lower.includes("jejuri")) {
    return {
      name: serviceName,
      images: ["/trimbakeshwar.jpg"],
      description: "Holy temple tour cab service to Jyotirlingas, Nashik wine yards, and Ashtavinayak sacred sites."
    };
  }

  // Ellora / Aurangabad
  if (lower.includes("ellora") || lower.includes("aurangabad")) {
    return {
      name: serviceName,
      images: ["/ellora.jpg"],
      description: "Heritage travel cab service to UNESCO World Heritage sites at Ellora Caves and historic Chhatrapati Sambhajinagar."
    };
  }

  // Goa
  if (lower.includes("goa")) {
    return {
      name: serviceName,
      images: ["/goa.jpg"],
      description: "Outstation road trip cabs from Pune to North & South Goa beaches with experienced long-haul drivers."
    };
  }

  // Konkan / Ganpatipule / Ratnagiri / Tarkarli / Dapoli
  if (lower.includes("konkan") || lower.includes("ganpatipule") || lower.includes("ratnagiri") || lower.includes("tarkarli") || lower.includes("dapoli")) {
    return {
      name: serviceName,
      images: ["/konkan.png"],
      description: "Exotic Konkan coastal tour packages covering clean beaches, seafood spots, and scenic seaside drives."
    };
  }

  // Raigad
  if (lower.includes("raigad")) {
    return {
      name: serviceName,
      images: ["/hero-raigad-bg.png"],
      description: "Historical fort tour cab service to Fort Raigad and capital of Swarajya with expert local route knowledge."
    };
  }

  // Car specific rentals
  if (lower.includes("dzire") || lower.includes("sedan")) {
    return {
      name: serviceName,
      images: ["/dzire.png"],
      description: "Affordable and comfortable Sedan cab rental for outstation rides, business visits, and family tours."
    };
  }
  if (lower.includes("ertiga") || lower.includes("7 seater")) {
    return {
      name: serviceName,
      images: ["/ertiga.png"],
      description: "Spacious 6+1 Ertiga SUV rental in Pune for family trips, outstation tours, and group travel."
    };
  }
  if (lower.includes("innova")) {
    return {
      name: serviceName,
      images: ["/innova.png"],
      description: "Luxury Innova & Innova Crysta rentals with captain seats for premium outstation long distance trips."
    };
  }
  if (lower.includes("tempo") || lower.includes("traveller")) {
    return {
      name: serviceName,
      images: ["/tempo17.png"],
      description: "17 & 32 Seater AC Tempo Traveller rental for group trips, family functions, and corporate outings."
    };
  }
  if (lower.includes("mini bus") || lower.includes("bus")) {
    return {
      name: serviceName,
      images: ["/minibus.png"],
      description: "Luxury mini bus hire in Pune for large group tours, weddings, and outstation trips."
    };
  }

  // Fallback for all remaining general corporate/wedding/outstation services
  return {
    name: serviceName,
    images: ["/fortuner.png"],
    description: "Premium chauffeur-driven cab service in Pune with well-maintained fleet and transparent pricing."
  };
});

// Let's also create structured Tours for our major/popular packages so they can be viewed on detail pages
export const TOURS: Tour[] = [];
