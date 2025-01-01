import { useState } from 'react';
import indiamap from '../assets/indiamap.png'




const AboutUs = () => {
  const [teamMembers] = useState([
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Technical Officer', 
      description: 'Over 15 years of experience in dental technology and innovation.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330 '
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Head of Product Development',
      description: 'Specialist in dental materials and equipment design.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a'
    },
    {
      name: 'Dr. Emily Williams', 
      role: 'Quality Assurance Director',
      description: 'Ensures all products meet highest industry standards.',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e'
    }
  ]);

  return (
    <div className="pt-24">
      {/* Hero Poster Section */}
      <div className="relative max-w-6xl mx-auto h-[500px] rounded-2xl overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09"
          alt="Dental Equipment"
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
          <h1 className="text-white text-5xl font-bold text-center mb-4">
            Leading the Future of Dental Supply
          </h1>
          <p className="text-white text-xl text-center">
            Providing Quality Dental Equipment and Supplies Since 2020
          </p>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Welcome to <span className='text-green-500'>R</span>-DENTAL</h2>
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
        <span className='text-blue-500'>We Deal In All Kind Of Dental Material, Instruments & Equipment.</span></h2>

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
      <div className="relative max-w-6xl mx-auto py-16 mb-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Comprehensive Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              "Prime Dental Products",
              "GC",
              "Ivoclar - Vivadent",
              "Shofu",
              "GDC",
              "Mani - Japan",
              "Dentsply",
              "SS White Products",
              "Prevest Denpro",
              "ORO Products",
              "Oracraft",
              "3M",
              "MAARC",
              "API Instruments",
              "Waldent",
            ].map((title, index) => (
              <div 
                key={index}
                className="group [perspective:1000px] h-32"
              >
                <div className="relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* Front */}
                  <div className="absolute inset-0 [backface-visibility:hidden]">
                    <div className="h-full w-full bg-white rounded-xl border-2 border-gray-100 shadow-md
                                  flex items-center justify-center p-4 text-center">
                      <span className="text-sm font-medium text-gray-700">{title}</span>
                    </div>
                  </div>
                  
                  {/* Back */}
                  <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <div className="h-full w-full bg-gradient-to-br from-green-400 to-blue-500 rounded-xl
                                  flex items-center justify-center p-4 text-center">
                      <span className="text-sm font-medium text-white">{title}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technical Team Section */}
      <div className="relative max-w-6xl mx-auto h-auto bg-gray-100 py-16">
        <div className="py-12 px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Technical Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="mb-6 transform transition duration-300 hover:scale-110">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-48 h-48 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-blue-600 mb-2">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
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
  




// services section alternative code with icons
{/* Services Section */}
/*
<div className="bg-gray-50 py-16">
<div className="max-w-6xl mx-auto px-6">
  <h2 className="text-3xl font-bold text-center mb-12">Our Comprehensive Services</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {[
      { icon: "🦷", title: "Dental Implant Solutions", desc: "Complete range of implant systems and surgical tools" },
      { icon: "💉", title: "Orthodontic Supplies", desc: "Braces, wires, and orthodontic accessories" },
      { icon: "🔬", title: "Diagnostic Equipment", desc: "Advanced imaging and diagnostic tools" },
      { icon: "🦿", title: "Prosthetic Materials", desc: "High-quality materials for dental prosthetics" },
      { icon: "🧰", title: "Surgical Instruments", desc: "Precision tools for dental procedures" },
      { icon: "🦷", title: "Endodontic Products", desc: "Complete root canal treatment solutions" },
      { icon: "🧪", title: "Dental Materials", desc: "Composites, cements, and filling materials" },
      { icon: "🪑", title: "Dental Chairs", desc: "Ergonomic and advanced dental chairs" },
      { icon: "💡", title: "LED Lighting Solutions", desc: "Dental operatory lighting systems" },
      { icon: "🧼", title: "Sterilization Equipment", desc: "Autoclave and sterilization products" },
      { icon: "💊", title: "Preventive Products", desc: "Fluoride treatments and sealants" },
      { icon: "🦷", title: "Restorative Solutions", desc: "Crown and bridge materials" },
      { icon: "🎯", title: "Laser Systems", desc: "Dental laser equipment and accessories" },
      { icon: "🧬", title: "Laboratory Products", desc: "Complete lab equipment solutions" },
      { icon: "🎨", title: "Aesthetic Dentistry", desc: "Cosmetic dentistry supplies" },
    ].map((service, index) => (
      <div 
        key={index}
        className="bg-white p-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl border-l-4 border-green-500"
      >
        <div className="text-4xl mb-4">{service.icon}</div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{service.title}</h3>
        <p className="text-gray-600">{service.desc}</p>
      </div>
    ))}
  </div>
</div>
</div>
*/


// services section alternative code with diff styles and animation

      {/* Services Section */}
      /*
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
*/
