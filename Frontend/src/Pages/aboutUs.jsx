import { useState } from 'react';
import { motion } from 'framer-motion';
import indiamap from '../assets/indiamap.png';
import suresh from '../assets/suresh.jpeg';

const AboutUs = () => {
  const [teamMembers] = useState([
    {
      name: 'Adit Jha',
      role: 'Lead Developer & Team Leader', 
      description: 'Developed the fully functioanl frontend and backend for R-dental.',
      contact: 'Contact Adit',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR48kgQNS7jHuRO0_X6Qv5PCh-chkE0_E8uRA&s'
    },
    {
      name: 'Kaif Shaikh',
      role: 'Frontend Developer',
      description: 'Builds robust server-side logic and ensures smooth communication with front-end frameworks.',
      contact: 'Contact Kaif',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR48kgQNS7jHuRO0_X6Qv5PCh-chkE0_E8uRA&s'
    }
  ]);
  console.log('teamMembers:', teamMembers);

  return (
    <div className="pt-24">
      {/* Hero Poster Section */}
      <div className="relative max-w-6xl mx-4 sm:mx-6 md:mx-auto h-[200px] sm:h-[250px] md:h-[450px] rounded-2xl overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          alt="Dental Equipment"
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 opacity-70 flex flex-col items-center justify-center px-4">
          <h1 className="text-white text-2xl sm:text-4xl md:text-6xl font-bold text-center mb-4 md:mb-8 drop-shadow-md">
            Empowering the Future of Dental Care
          </h1>
          <p className="text-white text-sm sm:text-xl md:text-2xl text-center drop-shadow-md">
            Providing High-Quality Dental Equipment and Supplies with Unparalleled Customer Service
          </p>
        </div>
      </div>


      {/* Welcome Section */}
      <div className="container mx-auto px-6 py-16">
        <motion.h2
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 1,
            ease: 'easeInOut'
          }}
          className="text-3xl font-bold text-center mb-8"
        >
          Welcome to <span className='text-green-500'>R</span>-DENTAL
        </motion.h2>
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <p className="text-gray-600 mb-6">
              At <span className='text-green-500'>R</span>-DENTAL, we are committed to providing top-quality dental supplies and equipment
              to dental professionals. With our extensive experience and dedication to
              excellence, we ensure that our products meet the highest standards of quality and innovation.
            </p>
            <p className="text-gray-600">
              Our mission is to support dental professionals in delivering the best possible care
              to their patients by providing reliable, innovative, and cost-effective dental solutions.
            </p>
          </div>
          <div className="hidden md:block w-96">
            <img 
              src={indiamap} 
              alt="India Map"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Company Overview Heading */}
      <h2 className="text-4xl font-bold text-center mb-12 max-w-4xl mx-auto px-4">
        <span className='text-blue-900'>We Deal In All Kind Of Dental Material, Instruments & Equipment.</span></h2>

      {/* New Section 1 */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">
          <div className="w-full max-w-[300px] md:w-[1000px] lg:w-[1200px] order-2 md:order-1 mt-8 md:mt-0">
            <img 
              src="https://images.unsplash.com/photo-1629909615184-74f495363b67"
              alt="Dental Technology"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="max-w-2xl order-1 md:order-2">
            <h2 className="text-3xl font-bold mb-6 text-center">About us</h2>
            <p className="text-gray-600 mb-6">
              <span className='text-green-500'>R</span>-DENTAL was founded in 2020, At Mumbai. With the commitment to deliver the best quality 
              product that offer long term compatibility to Dentist.
               This we have achieved by serving more than 200+ happy doctors and delivering 1000+ orders.
            </p>
            <p className="text-gray-600">
              With a focus on continuous improvement and adaptation to industry trends, we stay ahead
              of the curve in dental technology advancement.
            </p>
          </div>
        </div>
      </div>

      {/* New Section 2 */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">
          <div className="max-w-2xl order-1">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              To achieve excellence in all areas of service, so that we help our beloved dentist to 
              experience the highest level of healthy experience with their patients.
            </p>
            <p className="text-gray-600">
              This commitment to quality has earned us the trust of dental professionals
              and established us as a reliable partner in dental care delivery.
            </p>
          </div>
          <div className="w-full max-w-[300px] md:w-96 order-2 mt-8 md:mt-0">
            <img 
              src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95"
              alt="Quality Assurance"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="container mx-auto px-6 py-16 flex justify-center">
        <div className="max-w-5xl w-full">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-sm transform transition duration-300 hover:scale-105 hover:shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca"
                alt="Quality"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Quality</h3>
                <p className="text-gray-600">
                  Maintaining the highest standards in all our products and services without compromise.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-sm transform transition duration-300 hover:scale-105 hover:shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
                alt="Integrity" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Integrity</h3>
                <p className="text-gray-600">
                  Operating with transparency and honesty in all our business dealings and relationships.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-sm transform transition duration-300 hover:scale-105 hover:shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4"
                alt="Excellence"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                <p className="text-gray-600">
                  Striving for excellence in every aspect of our service and product delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Founder Section */}
      <div className="relative max-w-6xl mx-auto py-20">
        {/* Simplified background decorative elements - removed corner blobs */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50"></div>
        <div className="absolute bottom-0 left-1/2 w-32 h-32 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        
        <div className="relative max-w-6xl mx-auto px-4">
          {/* Added top border with gradient */}
          <div className="h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-t-lg mb-16"></div>
          
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">
              Meet Our Visionary Leader
            </span>
          </h2>
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            {/* Image Container with adjusted positioning */}
            <div className="relative flex-shrink-0 lg:ml-8">  {/* Added lg:ml-8 for right margin on larger screens */}
              <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-spin-slow opacity-20"></div>
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-green-400 rounded-full animate-reverse-spin opacity-20"></div>
              
              <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80">
                <div className="w-full h-full bg-white rounded-full p-3 shadow-2xl">
                  <div className="w-full h-full rounded-full overflow-hidden ring-4 ring-white">
                    <img 
                      src={suresh} 
                      alt="Suresh Gupta - Founder & CEO"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Content Container remains the same */}
            <div className="flex-1 max-w-2xl">
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl">
                <h3 className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">
                  Suresh Gupta
                </h3>
                <p className="text-2xl font-semibold text-green-600 mb-6">Founder & CEO</p>
                <div className="w-32 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-8"></div>
                
                <div className="space-y-6">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    With over <span className="font-semibold text-green-600">[X] years</span> of experience 
                    in the dental industry, our founder established R-DENTAL with a vision to revolutionize 
                    dental equipment distribution in India. Their commitment to quality and customer service 
                    has been the driving force behind our company's success.
                  </p>
                  
                  <blockquote className="relative p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl">
                    <div className="absolute top-0 left-0 transform -translate-x-4 -translate-y-4">
                      <svg className="h-8 w-8 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                    <p className="text-gray-700 italic text-lg leading-relaxed pl-6">
                      "Our mission is to empower dental professionals with the finest equipment and 
                      supplies, enabling them to provide exceptional care to their patients. We believe 
                      in building lasting relationships based on trust, quality, and innovation."
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      
      <div className="relative max-w-6xl mx-auto h-auto bg-gray-50 py-16 mb-16 mt-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Comprehensive Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Prime Dental Products",desc: "Manufacturer of Restorite Composites, Prosthodontic Products & Conservative Products offered by Prime Dental Products."},
              { title: "GC", desc: "GC offers a wide range of products, including restorative materials, preventive products, adhesives, cements, and dental equipment." },
              { title: "Ivoclar - Vivadent", desc: "Discover our revolutionary dental product range. From direct restoratives, zirconia restorations and digital denture to metal ceramics and more." },
              { title: "Shofu", desc: "Shofu Dental India provides the best dental products and equipment, from adhesives to porcelain restoratives." },
              { title: "GDC", desc: "GDC Marketing is renowned all over the world for it's ergonomics, design, precision, performance and uncompromising quality." },
              { title: "Mani - Japan", desc: "Shop a wide range mani burs, mani k files, mani dental burs, mani files, mani diamond burs, mani fiber post." },
              { title: "Dentsply", desc: "Manufacturer of Carbide Burs, Impression Paste & Complete Composite Finishing." },
              { title: "SS White Products", desc: "Adhesives, Bonding Agents & Etchants · Cement and Liners · Composites · Endodontics · Finishing & Polishing · Tooth Whitening · Auxiliaries." },
              { title: "Prevest Denpro", desc: "Illuminating clinics with cutting-edge operatory lighting." },
              { title: "ORO Products", desc: "HEALTHCARE. STERILIZATION PACKAGING · STERILITY MONITORING · SAFETY WEAR. DENTAL CARE. ENDODONTIC · DISPOSABLES · INSTRUMENTS." },
              { title: "Oracraft", desc: "Leading Dental Instruments Company who offers the best, high-quality & 100% genuine dental products, instruments." },
              { title: "3M", desc: "Offering durable crown and bridge restorative materials." },
              { title: "MAARC", desc: "Company catering a wide range of products such as Dental Consumables incl. Endo, Prostho, Restorative, Lab range, dental alloys, jewellery waxes, etc…" },
              { title: "API Instruments", desc: "Supplying essential lab equipment for dental excellence." },
              { title: "Waldent", desc: "Enhancing smiles with cosmetic dentistry essentials." },
            ].map((service, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-md group hover:shadow-xl transition-all duration-300"
              >
                <div className="h-2 bg-gradient-to-r from-green-400 to-blue-500"></div>
                <div className="p-6">
                  <div className="relative">
                    <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-green-500 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300"></div>
                  </div>
                  <p className="text-gray-600 mt-4">{service.desc}</p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technical Team Section */}
      <div className="relative max-w-6xl mx-auto py-16 mb-6">
        {/* Background elements remain the same */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-blue-900 opacity-95 rounded-3xl"></div>
        <div className="absolute inset-0">
          <div className="absolute w-full h-full">
            <div className="absolute inset-0 opacity-10">
              <div className="h-full w-full" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                backgroundSize: '24px 24px'
              }}></div>
            </div>
          </div>
        </div>

        <div className="relative container mx-auto px-6">
          {/* Header remains the same */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-green-300 mb-4">
              Technical Innovation Team
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto"></div>
          </div>

          {/* Adjusted Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {teamMembers.slice(0, 2).map((member, index) => (
              <div 
                key={index} 
                className="relative w-full"
              >
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl blur-md opacity-90"></div>
                
                {/* Card content - increased padding */}
                <div className="relative bg-slate-800/90 rounded-2xl p-8 ring-1 ring-gray-700/50 h-full">
                  <div className="flex flex-col md:flex-row items-center gap-8 h-full">
                    {/* Larger Image Container */}
                    <div className="relative w-36 h-36 md:w-40 md:h-40 flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl animate-pulse opacity-20"></div>
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="relative w-full h-full object-cover rounded-xl ring-2 ring-green-500/50"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/50 rounded-xl">
                        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-slate-900/50 to-transparent rounded-b-xl"></div>
                      </div>
                    </div>

                    {/* Content - adjusted spacing */}
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl font-bold text-blue-300 mb-3">{member.name}</h3>
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-900/70 text-blue-200 mb-4">
                        {member.role}
                      </div>
                      <p className="text-gray-200 text-sm leading-relaxed mb-5">
                        {member.description}
                      </p>
                      
                      {/* Technical tags */}
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 text-xs rounded-md bg-green-900/50 text-green-300 border border-green-500/40">
                          Technical Expert
                        </span>
                        <span className="px-2 py-1 text-xs rounded-md bg-blue-900/50 text-blue-300 border border-blue-500/40">
                          Innovation Lead
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom line remains the same */}
          <div className="mt-16 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20"></div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold text-green-500 mb-2 transform transition duration-300 hover:scale-105">200+</h3>
              <p className="text-gray-600">Dental Clinics Served</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-green-500 mb-2 transform transition duration-300 hover:scale-105">150+</h3>
              <p className="text-gray-600">Products Available</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-green-500 mb-2 transform transition duration-300 hover:scale-105">24/7</h3>
              <p className="text-gray-600">Customer Support</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-green-500 mb-2 transform transition duration-300 hover:scale-105">98%</h3>
              <p className="text-gray-600">Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;