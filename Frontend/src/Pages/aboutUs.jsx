import { useState } from 'react';
import { motion } from 'framer-motion';
import indiamap from '../assets/indiamap.png'

const AboutUs = () => {
  const [teamMembers, setTeamMembers] = useState([
    {
      name: 'Shravan Gupta',
      role: 'Front-End Integration Engineer', 
      description: 'Develops user-facing components while ensuring seamless interaction with back-end APIs.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR48kgQNS7jHuRO0_X6Qv5PCh-chkE0_E8uRA&s'
    },
    {
      name: 'Kaif Shaikh',
      role: 'Back-End Functionality Specialist',
      description: 'Builds robust server-side logic and ensures smooth communication with front-end frameworks.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR48kgQNS7jHuRO0_X6Qv5PCh-chkE0_E8uRA&s'
    }
  ]);
  console.log('teamMembers:', teamMembers);

  return (
    <div className="pt-24">
      {/* Hero Poster Section */}
      <div className="relative max-w-6xl mx-auto h-[450px] rounded-2xl overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          alt="Dental Equipment"
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 opacity-70 flex flex-col items-center justify-center">
          <h1 className="text-white text-6xl font-bold text-center mb-8 drop-shadow-md">
            Empowering the Future of Dental Care
          </h1>
          <p className="text-white text-2xl text-center drop-shadow-md">
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
          <div className="w-96">
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
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="w-96">
            <img 
              src="https://images.unsplash.com/photo-1629909615184-74f495363b67"
              alt="Dental Technology"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="max-w-2xl">
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
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          
          <div className="max-w-2xl">
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
          <div className="w-96">
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

      {/* Services Section */}
      
      <div className="relative max-w-6xl mx-auto h-auto bg-gray-50 py-16 mb-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Comprehensive Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Prime Dental Products" },
              { title: "GC", desc: "Innovating braces and orthodontic accessories for confident smiles." },
              { title: "Ivoclar - Vivadent", desc: "Pioneering diagnostic tools for superior dental care." },
              { title: "Shofu", desc: "Delivering premium materials for dental prosthetics and restorations." },
              { title: "GDC", desc: "Crafting high-precision tools for efficient dental procedures." },
              { title: "Mani - Japan", desc: "Leading in root canal treatment technologies and solutions." },
              { title: "Dentsply", desc: "Trusted for cements, composites, and reliable filling materials." },
              { title: "SS White Products", desc: "Redefining comfort with ergonomic dental chairs." },
              { title: "Prevest Denpro", desc: "Illuminating clinics with cutting-edge operatory lighting." },
              { title: "ORO Products", desc: "Ensuring hygiene with effective sterilization solutions." },
              { title: "Oracraft", desc: "Specialized in fluoride treatments and dental sealants." },
              { title: "3M", desc: "Offering durable crown and bridge restorative materials." },
              { title: "MAARC", desc: "Revolutionizing dentistry with laser tools and accessories." },
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
      <div className="relative max-w-6xl mx-auto h-auto bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Technical Team</h2>
          <div className="flex items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {teamMembers.slice(0, 2).map((member, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
                  <div className="relative w-48 h-48 rounded-full overflow-hidden mb-6">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-blue-600 mb-2 text-center">{member.role}</p>
                  <p className="text-gray-600 text-center">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
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
              <h3 className="text-4xl font-bold text-green-500 mb-2 transform transition duration-300 hover:scale-105">300+</h3>
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