
import { useState } from 'react';
import indiamap from '../assets/indiamap.png'




const AboutUs = () => {
  const [teamMembers] = useState([
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Technical Officer', 
      description: 'Over 15 years of experience in dental technology and innovation.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
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
    <div className="pt-16">
      {/* Hero Poster Section */}
      <div className="relative max-w-6xl mx-auto h-[500px]">
        <img 
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09"
          alt="Dental Equipment"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-5xl font-bold text-center">
            Leading the Future of Dental Supply
          </h1>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Welcome to <span className='text-green-500'>R</span>-DENTAL</h2>
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <p className="text-gray-600 mb-6">
              At RDental, we are committed to providing top-quality dental supplies and equipment
              to dental professionals worldwide. With our extensive experience and dedication to
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
            {/* Core Values Section */}
            <div className="container mx-auto px-6 py-16 flex justify-center">
        <div className="max-w-5xl w-full">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-sm">
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

            <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-sm">
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

            <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-sm">
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

      {/* Technical Team Section */}
      <div className="relative max-w-6xl mx-auto h-auto bg-gray-100">
        <div className="py-16 px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Technical Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="mb-6">
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-4xl font-bold text-blue-500 mb-2">100+</h3>
            <p className="text-gray-600">Dental Clinics Served</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-500 mb-2">300+</h3>
            <p className="text-gray-600">Products Available</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-500 mb-2">24/7</h3>
            <p className="text-gray-600">Customer Support</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-500 mb-2">98%</h3>
            <p className="text-gray-600">Customer Satisfaction</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
  

