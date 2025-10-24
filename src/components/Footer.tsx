import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Youtube } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleInternalLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault(); // stop the browser from doing a full reload
    window.scrollTo(0, 0); // scroll to top if desired
    navigate(path);
  };

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              {/* <Dumbbell className="h-8 w-8 text-primary-500" />
              <span className="font-bold text-2xl">Discipl</span> */}
              <img src="/logo_blac_bg.png" alt="Discipl Logo" className="h-8 w-25" />
            </div>
            <p className="text-neutral-400 text-sm leading-6">
              Your ultimate fitness and sports platform. Connecting athletes, fitness enthusiasts, 
              and wellness seekers with the best facilities and events.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/thediscipl/" target="_blank" className="text-neutral-400 hover:text-primary-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.youtube.com/@DisciplFitnessHub" target="_blank" className="text-neutral-400 hover:text-primary-500 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/discipl__/" target="_blank" className="text-neutral-400 hover:text-primary-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="../#home" className="text-neutral-400 hover:text-primary-500 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="../#about" className="text-neutral-400 hover:text-primary-500 transition-colors">
                  About
                </a>
              </li>
              {/* <li>
                <Link to="/fitness-directory" className="text-neutral-400 hover:text-primary-500 transition-colors">
                  Fitness Directory
                </Link>
              </li> */}
              <li>
                <a href="../#events" className="text-neutral-400 hover:text-primary-500 transition-colors">
                  Events
                </a>
              </li>
              <li>
                <a href="../#contact" className="text-neutral-400 hover:text-primary-500 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-neutral-400">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <a href="mailto: info@discipl.com" className="text-sm">info@thediscipl.com</a>
              </div>
              <div className="flex items-center space-x-3 text-neutral-400">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:+15551234567" className="text-sm">+91 9746458284 </a>
              </div>
              <div className="flex items-center space-x-3 text-neutral-400">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="text-[12px]">Vankannayullathil, Near Block Office, Balussery, Kozhikode, Kerala - 673613</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-12 pt-8 text-center">
          <p className="text-neutral-400 text-sm">
            © 2025 Discipl. All rights reserved. | <a href="/privacy-policy" onClick={(e) => handleInternalLink(e, '/privacy-policy')} className="hover:text-primary-500 transition-colors">Privacy Policy</a> | <a href="/privacy-policy" onClick={(e) => handleInternalLink(e, '/terms-conditions')} className="hover:text-primary-500 transition-colors">Terms and Conditions</a> | <a>Privacy Policy for Vendor App</a>
          </p>
        </div>
              
        {/* Space to show terms and conditions in mobile view */}
        <div className="block lg:hidden mt-20"></div>
      </div>
    </footer>
  );
};

export default Footer;