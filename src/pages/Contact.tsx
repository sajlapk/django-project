import React, { useState } from 'react';
import { Mail, Phone, MapPin, Youtube, Send, CheckCircle, Instagram, Facebook, PlayCircle } from 'lucide-react';
import axios from 'axios';


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post('https://discipl-web-frontend-1.onrender.com/api/contacts/sendMessage', formData);

      if (response.data.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 3000);
      }
    } catch (error) {
      console.error('Email sending failed:', error);
      alert('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

        {/* LEFT COLUMN: Header & Form */}
        <div>
          <div className="mb-10">
            <div className="flex items-center text-red-500 font-bold text-xs tracking-[0.15em] uppercase mb-4">
              <PlayCircle className="w-5 h-5 mr-2" fill="currentColor" />
              Get in Touch
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-6 tracking-tight leading-tight">
              We're here to help you succeed.
            </h1>
            <p className="text-gray-500 text-lg max-w-md">
              Questions, partnerships, or feedback — reach out and the team will get back to you.
            </p>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
            {isSubmitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-green-800 text-sm font-medium">
                  Message sent successfully!
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs font-bold text-gray-800 mb-2 pl-1">
                  Full name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-transparent border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-sm outline-none"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-bold text-gray-800 mb-2 pl-1">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-transparent border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-sm outline-none"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-bold text-gray-800 mb-2 pl-1">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-transparent border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-sm outline-none appearance-none"
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")', backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="technical">Technical Support</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold text-gray-800 mb-2 pl-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-transparent border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-sm outline-none resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center bg-[#d92325] hover:bg-red-700 text-white px-8 py-3.5 rounded-full font-bold text-sm transition-colors duration-200 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <>
                    Send message
                    <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: Contact Info & Socials */}
        <div className="flex flex-col justify-center space-y-2 mt-4 lg:mt-[16rem]">

          <div className="flex items-start py-6 border-b border-gray-100">
            <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-[#d92325] mr-5 flex-shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">Email</p>
              <a href="mailto:info@thediscipl.com" className="text-black font-bold text-[15px] hover:text-[#d92325] transition-colors block mb-1">
                info@thediscipl.com
              </a>
              <p className="text-xs text-gray-500">General inquiries or partnerships</p>
            </div>
          </div>

          <div className="flex items-start py-6 border-b border-gray-100">
            <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-[#d92325] mr-5 flex-shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">Phone</p>
              <a href="tel:+919746458284" className="text-black font-bold text-[15px] hover:text-[#d92325] transition-colors block mb-1">
                +91 97464 88282
              </a>
              <p className="text-xs text-gray-500">Call during business hours</p>
            </div>
          </div>

          <div className="flex items-start py-6 border-b border-gray-100">
            <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-[#d92325] mr-5 flex-shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">Office</p>
              <p className="text-black font-bold text-[15px] mb-1">
                Phase 1, 4th Floor, HiLITE Business Park
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Poovangal, Pantheeramkavu, Kerala 673014
              </p>
            </div>
          </div>

          <div className="pt-8">
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.youtube.com/@DisciplFitnessHub"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-bold rounded-full transition-colors border border-gray-100"
              >
                <Youtube className="w-4 h-4 mr-2 text-red-500" />
                YouTube
              </a>
              <a
                href="https://www.facebook.com/thediscipl/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-bold rounded-full transition-colors border border-gray-100"
              >
                <Facebook className="w-4 h-4 mr-2 text-red-500" />
                Facebook
              </a>
              <a
                href="https://www.instagram.com/discipl__/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-bold rounded-full transition-colors border border-gray-100"
              >
                <Instagram className="w-4 h-4 mr-2 text-red-500" />
                Instagram
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;