import { Hero } from "@/components/home/hero";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      <Hero />
      
      {/* Car Rental Promo Section */}
      <section className="bg-slate-950 py-24 text-white overflow-hidden relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                Premium <span className="text-primary">Car Rental</span> Service in Pune
              </h2>
              <p className="text-xl text-white/70 mb-10 leading-relaxed">
                Experience luxury and comfort with our wide range of well-maintained vehicles. From SUVs for family trips to premium sedans for business.
              </p>
              <ul className="grid grid-cols-2 gap-4 mb-12">
                {['Professional Drivers', '24/7 Support', 'Clean & Sanitized Cars', 'Transparent Pricing', 'Easy WhatsApp Booking', 'Flexible Rentals'].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                      ✓
                    </div>
                    <span className="text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="h-16 px-10 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20">
                  <a href="/cars">Explore Fleet</a>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-16 px-10 rounded-2xl text-lg font-bold border-white/10 hover:bg-white/5">
                  <a href="https://wa.me/919172936138" target="_blank" rel="noopener noreferrer">Inquire Pricing</a>
                </Button>
              </div>
            </div>
            <div className="relative">
              {/* Floating Glass Cards for Cars */}
              <div className="relative z-10 grid grid-cols-1 gap-6 translate-x-0 lg:translate-x-12 rotate-0 lg:-rotate-6">
                <div className="glass-dark border-white/10 p-4 rounded-[2.5rem] shadow-2xl scale-100 lg:scale-110">
                  <div className="relative h-64 rounded-[2rem] overflow-hidden mb-4">
                    <Image src="/fortuner.png" alt="Luxury Car" fill className="object-cover" />
                  </div>
                  <div className="flex justify-between items-center px-4 pb-2">
                    <span className="font-bold text-xl">Toyota Innova Crysta</span>
                  </div>
                </div>
              </div>
              
              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 blur-[100px] rounded-full" />
            </div>
          </div>
        </div>
      </section>
      {/* Why Choose Us Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Choose <span className="text-primary italic">Harshada Rentals?</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">We provide the best-in-class car rental services with a focus on safety, comfort, and reliability.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Best Price Guarantee', icon: '💰', desc: 'Competitive pricing with no hidden charges or surprise costs.' },
            { title: 'Verified Drivers', icon: '👨‍✈️', desc: 'Highly experienced and professional chauffeurs for every trip.' },
            { title: '24/7 Support', icon: '📞', desc: 'Round-the-clock assistance for all your travel emergencies.' }
          ].map((feature, i) => (
            <div key={i} className="glass p-10 rounded-[3rem] border-white/20 text-center hover:scale-105 transition-transform">
              <div className="text-5xl mb-6">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-50 dark:bg-slate-900/30 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">What Our <span className="text-primary italic">Clients Say</span></h2>
            <p className="text-muted-foreground">Thousands of happy travelers trust us for their journeys.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Rahul Sharma', role: 'Business Traveler', text: 'Excellent service! The car was clean and the driver was very professional. Highly recommend for airport transfers.' },
              { name: 'Anjali Deshmukh', role: 'Family Trip', text: 'Our Mahabaleshwar tour was perfectly managed. The itinerary was well-planned and we had a great time.' },
              { name: 'Sameer Kulkarni', role: 'Corporate Client', text: 'Harshada Tours has been our reliable partner for all corporate travel needs in Pune for years.' }
            ].map((t, i) => (
              <div key={i} className="glass p-8 rounded-3xl border-white/20 relative">
                <div className="text-primary text-4xl mb-4 font-serif">&quot;</div>
                <p className="text-foreground/80 mb-8 leading-relaxed italic">{t.text}</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}
