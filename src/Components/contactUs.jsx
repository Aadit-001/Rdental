import { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#10B98120_0%,_transparent_25%),_radial-gradient(circle_at_top_right,_#0D948020_0%,_transparent_25%),_radial-gradient(circle_at_bottom_left,_#05966920_0%,_transparent_25%),_radial-gradient(circle_at_bottom_right,_#0F766E20_0%,_transparent_25%)] py-16 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section with floating elements */}
        <div className="relative text-center mb-16">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-72 h-72 bg-green-100 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
          </div>
          <h1 className="relative text-5xl font-bold bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Let's Connect
          </h1>
          <p className="relative text-xl text-gray-600 max-w-2xl mx-auto">
            Your smile journey begins with a conversation. Reach out to us
            today.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Phone Card */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 border border-gray-100 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:border-emerald-200">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-500 rounded-xl flex items-center justify-center group-hover:from-teal-500 group-hover:to-green-500 transition-all duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Give us a call
                  </h3>
                  <p className="text-gray-600 hover:text-green-600 transition-colors">
                    +91 961 965 3896
                  </p>
                  <p className="text-gray-600 hover:text-green-600 transition-colors">
                    +91 937 281 7043
                  </p>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 border border-gray-100 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:border-emerald-200">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-500 rounded-xl flex items-center justify-center group-hover:from-teal-500 group-hover:to-green-500 transition-all duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Visit us
                  </h3>
                  <p className="text-gray-600">
                    Shop no.16, 1st floor, Veer Hanuman Nagar Rd, opp.RBI
                    quarter, Kandarpada, Dahisar West, Mumbai, Maharashtra
                    400068
                  </p>
                </div>
              </div>
            </div>

            {/* Business Hours Card */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 border border-gray-100 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:border-emerald-200">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-500 rounded-xl flex items-center justify-center group-hover:from-teal-500 group-hover:to-green-500 transition-all duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Business Hours
                  </h3>
                  <p className="text-gray-600">Mon-Sat: 10:00 AM - 7:00 PM</p>
                  <p className="text-gray-600">Sun: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="peer w-full border-b-2 border-gray-300 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all focus:border-green-500 focus:outline-0"
                      placeholder=" "
                      required
                    />
                    <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-green-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-gray-500 peer-focus:text-xs peer-focus:leading-tight peer-focus:text-green-500 peer-focus:after:scale-x-100 peer-focus:after:border-green-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-500">
                      Name
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="peer w-full border-b-2 border-gray-300 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all focus:border-green-500 focus:outline-0"
                      placeholder=" "
                      required
                    />
                    <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-green-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-gray-500 peer-focus:text-xs peer-focus:leading-tight peer-focus:text-green-500 peer-focus:after:scale-x-100 peer-focus:after:border-green-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-500">
                      Email
                    </label>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="peer w-full border-b-2 border-gray-300 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all focus:border-green-500 focus:outline-0"
                    placeholder=" "
                    required
                  />
                  <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-green-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-gray-500 peer-focus:text-xs peer-focus:leading-tight peer-focus:text-green-500 peer-focus:after:scale-x-100 peer-focus:after:border-green-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-500">
                    Subject
                  </label>
                </div>

                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="peer w-full border-2 border-gray-300 rounded-lg bg-transparent p-4 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all focus:border-green-500 focus:outline-0"
                    placeholder="Your message..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 relative px-6 py-3 rounded-lg shadow-md 
                  before:absolute before:inset-0 before:bg-gradient-to-r before:from-green-600 before:to-emerald-500
                  before:transition-all before:duration-500 hover:before:opacity-0
                  after:absolute after:inset-0 after:bg-gradient-to-r after:from-teal-500 after:to-green-500
                  after:opacity-0 hover:after:opacity-100 after:transition-all after:duration-500
                  transform hover:scale-105 transition-all duration-300 ease-in-out
                  hover:shadow-lg hover:shadow-green-200 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 text-white font-semibold tracking-wide">
                    Send Message
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="relative overflow-hidden rounded-2xl h-[400px] mt-16">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3766.645857417349!2d72.8519759!3d19.254259999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b1aec2dde889%3A0xfc5e3bde6566cef1!2sRdental%20Supplier!5e0!3m2!1sen!2sin!4v1737190240948!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
