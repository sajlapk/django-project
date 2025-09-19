import React, { useState } from 'react';
import { Plus, X, Calendar, Clock, MapPin, IndianRupee, FileText, Image as ImageIcon, Trash2, Users, Phone, AtSign, Award } from 'lucide-react';
import axios from 'axios';

// Define the structure for social media links
interface SocialMediaLink {
  platform: 'Instagram' | 'YouTube' | 'Facebook';
  handle: string;
}

// Define the main structure for an event
interface EventDetails {
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  fee: string;
  image: File | null;
  category: string;
  maxParticipants: string;
  judgingCriteria: string[];
  prize_sponsorship: string;
  org_phone_no: string;
  org_email: string;
  socialMedia: SocialMediaLink[];
}

const AdminPanel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Initialize state with all the new fields
  const [eventDetails, setEventDetails] = useState<EventDetails>({
    name: '', date: '', time: '', location: '', description: '', fee: '', image: null,
    category: 'General', maxParticipants: '50', judgingCriteria: [''], prize_sponsorship: '',
    org_phone_no: '', org_email: '', socialMedia: [{ platform: 'Instagram', handle: '' }],
  });

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEventDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setEventDetails(prev => ({ ...prev, image: e.target.files[0] }));
    }
  };

  // --- Handlers for Judging Criteria ---
  const handleCriteriaChange = (index: number, value: string) => {
    const newCriteria = [...eventDetails.judgingCriteria];
    newCriteria[index] = value;
    setEventDetails(prev => ({ ...prev, judgingCriteria: newCriteria }));
  };
  const addCriteriaField = () => {
    setEventDetails(prev => ({ ...prev, judgingCriteria: [...prev.judgingCriteria, ''] }));
  };
  const removeCriteriaField = (index: number) => {
    const newCriteria = eventDetails.judgingCriteria.filter((_, i) => i !== index);
    setEventDetails(prev => ({ ...prev, judgingCriteria: newCriteria }));
  };

  // --- NEW HANDLERS FOR SOCIAL MEDIA ---
  const handleSocialMediaChange = (index: number, field: 'platform' | 'handle', value: string) => {
    const newSocials = [...eventDetails.socialMedia];
    newSocials[index][field] = value as any; // Type assertion for platform
    setEventDetails(prev => ({ ...prev, socialMedia: newSocials }));
  };
  const addSocialMediaField = () => {
    setEventDetails(prev => ({ ...prev, socialMedia: [...prev.socialMedia, { platform: 'Instagram', handle: '' }] }));
  };
  const removeSocialMediaField = (index: number) => {
    const newSocials = eventDetails.socialMedia.filter((_, i) => i !== index);
    setEventDetails(prev => ({ ...prev, socialMedia: newSocials }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      let imageUrl = '';
      if (eventDetails.image) {
        const formData = new FormData();
        formData.append('file', eventDetails.image);
        formData.append('upload_preset', uploadPreset);
        const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
        imageUrl = cloudinaryResponse.data.secure_url;
      }

      const finalCriteria = eventDetails.judgingCriteria.filter(c => c.trim() !== '');
      const finalSocials = eventDetails.socialMedia.filter(s => s.handle.trim() !== '');

      const eventData = { ...eventDetails, imageUrl, judgingCriteria: finalCriteria, socialMedia: finalSocials };

      await axios.post('https://discipl-server.onrender.com/api/events', eventData); // This is used when running from github repo
      // await axios.post('http://localhost:8172/api/events', eventData); // This is used when running on localhost
      alert("Event created successfully!");
      setIsModalOpen(false);
      setEventDetails({
        name: '', date: '', time: '', location: '', description: '', fee: '', image: null,
        category: 'General', maxParticipants: '50', judgingCriteria: [''], prize_sponsorship: '',
        org_phone_no: '', org_email: '', socialMedia: [{ platform: 'Instagram', handle: '' }],
      });
    } catch (error) {
      console.error("Failed to create event:", error);
      alert("Failed to create event. See console for details.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-16 md:pt-20">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center sm:text-left">
              Admin Panel
            </h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center bg-red-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Event
            </button>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center text-center p-4">
                <p className="text-gray-500">Your event management dashboard will be displayed here.</p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Create New Event</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-4 sm:p-8 space-y-6 overflow-y-auto">
              {/* Event Name, Date, Time, Location, Fee, Category, Max Participants... */}
              <div className="relative">
                <input type="text" name="name" placeholder="Event Name" required onChange={handleInputChange} value={eventDetails.name} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" />
                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative"><input type="date" name="date" required onChange={handleInputChange} value={eventDetails.date} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" /><Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /></div>
                <div className="relative"><input type="time" name="time" required onChange={handleInputChange} value={eventDetails.time} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" /><Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative"><input type="text" name="location" placeholder="Location or Venue" required onChange={handleInputChange} value={eventDetails.location} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" /><MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /></div>
                <div className="relative"><input type="number" name="fee" placeholder="Registration Fee" required onChange={handleInputChange} value={eventDetails.fee} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" /><IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative"><input type="text" name="category" placeholder="Category (e.g., Challenge)" required onChange={handleInputChange} value={eventDetails.category} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" /><FileText className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /></div>
                <div className="relative"><input type="number" name="maxParticipants" placeholder="Max Participants" required onChange={handleInputChange} value={eventDetails.maxParticipants} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" /><Users className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /></div>
              </div>
              <div className="relative"><textarea name="description" placeholder="Event Description" required rows={4} onChange={handleInputChange} value={eventDetails.description} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors resize-none" /><FileText className="absolute left-4 top-4 h-5 w-5 text-gray-400" /></div>
              
              {/* Judging Criteria */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Judging Criteria</label>
                {eventDetails.judgingCriteria.map((criterion, index) => (<div key={index} className="flex items-center gap-2 mb-2"><input type="text" placeholder={`Criterion #${index + 1}`} value={criterion} onChange={(e) => handleCriteriaChange(index, e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" />{eventDetails.judgingCriteria.length > 1 && (<button type="button" onClick={() => removeCriteriaField(index)} className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"><Trash2 className="w-5 h-5" /></button>)}</div>))}
                <button type="button" onClick={addCriteriaField} className="mt-2 flex items-center text-sm font-medium text-red-600 hover:text-red-800"><Plus className="w-4 h-4 mr-1" />Add Criterion</button>
              </div>

              {/* Prize & Sponsorship */}
              <div className="relative"><textarea name="prize_sponsorship" placeholder="Prize & Sponsorship Details" required rows={3} onChange={handleInputChange} value={eventDetails.prize_sponsorship} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors resize-none" /><Award className="absolute left-4 top-4 h-5 w-5 text-gray-400" /></div>

              {/* Organizer Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Organizer Details</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div className="relative"><input type="tel" name="org_phone_no" placeholder="Organizer Phone" required pattern="[0-9]{10}" onChange={handleInputChange} value={eventDetails.org_phone_no} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" /><Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /></div><div className="relative"><input type="email" name="org_email" placeholder="Organizer Email" required onChange={handleInputChange} value={eventDetails.org_email} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" /><AtSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /></div></div>
              </div>

              {/* --- NEW UI FOR SOCIAL MEDIA --- */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Social Media Handles</label>
                {eventDetails.socialMedia.map((social, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <select value={social.platform} onChange={(e) => handleSocialMediaChange(index, 'platform', e.target.value)} className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors bg-white">
                      <option>Instagram</option>
                      <option>YouTube</option>
                      <option>Facebook</option>
                    </select>
                    <input type="text" placeholder="Handle (e.g., @username)" value={social.handle} onChange={(e) => handleSocialMediaChange(index, 'handle', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" />
                    {eventDetails.socialMedia.length > 1 && (<button type="button" onClick={() => removeSocialMediaField(index)} className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"><Trash2 className="w-5 h-5" /></button>)}
                  </div>
                ))}
                <button type="button" onClick={addSocialMediaField} className="mt-2 flex items-center text-sm font-medium text-red-600 hover:text-red-800"><Plus className="w-4 h-4 mr-1" />Add Social Media</button>
              </div>
              
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Banner</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"><div className="space-y-1 text-center"><ImageIcon className="mx-auto h-12 w-12 text-gray-400" /><div className="flex text-sm text-gray-600"><label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500"><span>Upload a file</span><input id="file-upload" name="image" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" /></label><p className="pl-1">or drag and drop</p></div><p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>{eventDetails.image && <p className="text-sm text-green-600 mt-2">Selected: {eventDetails.image.name}</p>}</div></div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end items-center pt-6 border-t border-gray-200 space-x-4 flex-shrink-0">
                <button type="button" onClick={() => setIsModalOpen(false)} disabled={isUploading} className="px-6 py-3 rounded-full font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50">Cancel</button>
                <button type="submit" disabled={isUploading} className="px-6 py-3 rounded-full font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors flex items-center disabled:bg-red-400">{isUploading && <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>}{isUploading ? 'Creating...' : 'Create Event'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPanel;
