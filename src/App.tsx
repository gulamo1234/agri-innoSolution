import React, { useState, useEffect } from 'react';
import { Sprout, Smartphone, ShoppingBag, GraduationCap, Mail, Phone, MessageCircle, Menu, X } from 'lucide-react';
import ChatDialog from './components/ChatDialog';

const images = [
  {
    url: "https://i0.wp.com/www.bioeconomia.info/wp-content/uploads/2020/04/malawi_maiz.jpg?resize=768%2C416&ssl=1",
    alt: "Malawian agriculture"
  },
  {
    url: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80",
    alt: "African farmer in field"
  },
  {
    url: "https://images.unsplash.com/photo-1595274459742-4a41d35784ee?auto=format&fit=crop&q=80",
    alt: "Farmers working"
  }
];

function App() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-green-50">
      {/* Navigation Bar */}
      <nav className="bg-green-800 text-white fixed w-full z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Sprout className="h-8 w-8 text-green-400" />
                <span className="text-2xl font-bold">Agri-inno Solutions</span>
              </div>
              <div className="hidden md:flex space-x-6">
                <a href="#home" className="hover:text-green-300">Home</a>
                <a href="#services" className="hover:text-green-300">Services</a>
                <a href="#contact" className="hover:text-green-300">Contact</a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Flag_of_Malawi.svg"
                alt="Malawi Flag"
                className="h-6 w-10 mr-4 hidden md:block"
              />
              <span className="text-sm font-medium hidden md:block">Bright Temwa Moyo</span>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-green-700">
              <a
                href="#home"
                className="block px-3 py-2 rounded-md text-white hover:bg-green-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#services"
                className="block px-3 py-2 rounded-md text-white hover:bg-green-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 rounded-md text-white hover:bg-green-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
              <div className="px-3 py-2 flex items-center space-x-2">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Flag_of_Malawi.svg"
                  alt="Malawi Flag"
                  className="h-6 w-10"
                />
                <span className="text-sm font-medium">Bright Temwa Moyo</span>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Rest of the content */}
      <header id="home" className="relative h-screen pt-16">
        <div className="absolute inset-0">
          <img
            src={images[currentImage].url}
            alt={images[currentImage].alt}
            className="w-full h-full object-cover transition-opacity duration-1000"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Digital Agriculture Solutions
          </h1>
          <p className="text-lg md:text-xl text-green-100 max-w-2xl">
            Transforming Malawian agriculture through innovative digital solutions
          </p>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Services</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <ServiceCard 
            icon={<Smartphone />}
            title="Digital Extension"
            description="Bringing agricultural expertise directly to farmers through digital platforms and mobile solutions"
          />
          <ServiceCard 
            icon={<Sprout />}
            title="Digital Agriculture Applications"
            description="Custom applications designed to enhance farming practices and improve productivity"
          />
          <ServiceCard 
            icon={<ShoppingBag />}
            title="Digital Agri-marketing Platforms"
            description="Connecting farmers to markets through innovative digital marketplace solutions"
          />
          <ServiceCard 
            icon={<GraduationCap />}
            title="Consultancy and Trainings"
            description="Expert guidance and training programs to empower farmers with digital skills"
          />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-green-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Contact Us</h2>
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="flex flex-col space-y-6">
              <div className="flex items-center space-x-4">
                <Mail className="h-6 w-6 text-green-600" />
                <a href="mailto:moyotemwa@gmail.com" className="text-gray-700 hover:text-green-600">
                  moyotemwa@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="h-6 w-6 text-green-600" />
                <div className="text-gray-700">
                  <p>0882140999</p>
                  <p>0991515396</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Sprout className="h-6 w-6 text-green-400" />
            <span className="text-xl font-bold">Agri-inno Solutions</span>
          </div>
          <div className="text-gray-400 text-sm text-center md:text-left">
            © 2024 Agri-inno Solutions. Transforming Agriculture in Malawi.
          </div>
        </div>
      </footer>

      {/* Chat Button and Dialog */}
      <button 
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 bg-green-600 p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors z-50"
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </button>

      <ChatDialog 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </div>
  );
}

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
      <div className="text-green-600 w-12 h-12 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default App;