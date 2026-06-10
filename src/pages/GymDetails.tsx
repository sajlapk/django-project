import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Star, Check, AlertCircle, Clock, ArrowLeft, Calendar, Loader, Globe, Instagram } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const getImageUrl = (url: string | null) => {
  if (!url) return "";
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  
  // Extract backend base (without /api/v1)
  const base = API_BASE_URL.replace('/api/v1', '');
  // Ensure we don't have double slashes
  const cleanUrl = url.startsWith('/') ? url : `/${url}`;
  return `${base}${cleanUrl}`;
};

const GymDetails = () => {
  const { id } = useParams();
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [gym, setGym] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGym = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/fitnesscenter/gym/${id}/`);
        setGym(response.data);
      } catch (err: any) {
        console.warn("Failed to fetch gym detail:", err);
        setError("Could not load gym details from the server.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchGym();
  }, [id]);

  const formatTime = (t: string) => {
    if (!t) return '';
    const [h, m] = t.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    return `${hour}:${String(m).padStart(2, '0')} ${ampm}`;
  };

  const formatDuration = (days: number) => {
    if (days >= 365) return `per year`;
    if (days >= 84) return `per quarter`;
    if (days >= 28) return `per month`;
    return `${days} days`;
  };

  const handleRequestMembership = (planName: string) => {
    alert(`Membership request for "${planName}" submitted successfully! A manager will contact you shortly.`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-red-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading gym details...</p>
        </div>
      </div>
    );
  }

  if (error && !gym) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Gym Not Found</h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <Link to="/fitness-directory" className="bg-red-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-600 transition-colors">
            Back to Directory
          </Link>
        </div>
      </div>
    );
  }

  // Extract data
  const gymName = gym?.name || "Gym";
  const gymDesc = gym?.description || "";
  const gymEmail = gym?.email || "";
  const gymPhone = gym?.phone_number || "";
  const gymRating = Number(gym?.average_rating) || 0;
  const gymReviews = gym?.review_count || 0;
  const gymLogo = getImageUrl(gym?.logo) || "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=150";
  const gymAddress = [gym?.location?.building_name, gym?.location?.city, gym?.location?.state].filter(Boolean).join(', ') || 'India';
  const gymCategories = gym?.categories || [];
  const gymAmenities = gym?.amenities || [];
  const gymPhotos = gym?.photos || [];
  const gymPlans = gym?.packages || [];
  const gymSlots = gym?.time_slots || [];
  const gymSocials = gym?.social_media || [];
  const rawBanner = gymPhotos.find((p: any) => p.is_primary)?.image || gymPhotos[0]?.image;
  const bannerImage = getImageUrl(rawBanner) || "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=800";

  return (
    <div className="min-h-screen bg-gray-50 pb-20">

      {/* Banner */}
      <section className="relative h-[300px] md:h-[380px] w-full bg-gray-800 overflow-hidden">
        <img src={bannerImage} alt={gymName} className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent"></div>
        <div className="absolute top-4 left-4 z-10">
          <Link to="/fitness-directory" className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Directory
          </Link>
        </div>
      </section>

      {/* Profile Card */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-20 relative z-10">
        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Logo */}
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl border-4 border-white overflow-hidden bg-white shadow-md flex-shrink-0">
              <img src={gymLogo} alt={gymName} className="w-full h-full object-contain bg-gray-50" />
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-black mb-1">{gymName}</h1>
              <div className="flex flex-wrap gap-2 mb-2">
                {gymCategories.map((c: any) => (
                  <span key={c.id} className="text-xs font-medium text-red-500 bg-red-50 px-2 py-1 rounded-full">{c.name}</span>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-red-500" />{gymAddress}</span>
                {gymRating > 0 && <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-400 fill-current" />{gymRating} ({gymReviews} reviews)</span>}
              </div>
            </div>

            {/* Contact */}
            <div className="flex flex-wrap md:flex-col gap-3 text-sm text-gray-600">
              {gymPhone && (
                <a href={`tel:${gymPhone}`} className="flex items-center gap-2 hover:text-red-500 transition-colors">
                  <Phone className="w-4 h-4 text-red-500" />{gymPhone}
                </a>
              )}
              {gymEmail && (
                <a href={`mailto:${gymEmail}`} className="flex items-center gap-2 hover:text-red-500 transition-colors">
                  <Mail className="w-4 h-4 text-red-500" />{gymEmail}
                </a>
              )}
              {gymSocials.map((s: any, i: number) => (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-red-500 transition-colors">
                  {s.platform === 'instagram' ? <Instagram className="w-4 h-4 text-red-500" /> : <Globe className="w-4 h-4 text-red-500" />}
                  <span className="capitalize">{s.platform}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">

          {/* About */}
          {gymDesc && (
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-bold text-black mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed">{gymDesc}</p>
            </div>
          )}

          {/* Amenities */}
          {gymAmenities.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-bold text-black mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {gymAmenities.map((a: any) => (
                  <div key={a.id} className="flex items-center gap-2 bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>{a.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Photos */}
          {gymPhotos.length > 1 && (
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-bold text-black mb-4">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {gymPhotos.slice(0, 6).map((p: any) => (
                  <div key={p.id} className="rounded-lg overflow-hidden h-32 md:h-40">
                    <img src={getImageUrl(p.image)} alt={p.caption} className="w-full h-full object-contain bg-gray-50 hover:scale-105 transition-transform duration-300" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Time Slots */}
          {gymSlots.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-black">Schedule & Slots</h2>
                <Clock className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-3">
                {gymSlots.map((slot: any) => (
                  <div key={slot.id} className={`border rounded-lg p-4 flex justify-between items-center ${
                    slot.is_active ? 'border-green-200 bg-green-50/30' : 'border-gray-200 opacity-50'
                  }`}>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-800">{slot.name}</h4>
                        {slot.start_date && slot.end_date && (
                          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {slot.start_date} — {slot.end_date}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{formatTime(slot.start_time)} — {formatTime(slot.end_time)}</p>
                    </div>
                    {slot.is_active ? (
                      <span className="flex items-center gap-1 bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        Active
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-gray-400 bg-gray-100 px-3 py-1 rounded-full">Inactive</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column — Plans */}
        <div>
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
            <h2 className="text-xl font-bold text-black mb-6">Membership Plans</h2>

            {gymPlans.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">No plans available yet.</p>
            ) : (
              <div className="space-y-4">
                {gymPlans.filter((p: any) => p.is_active).map((plan: any, idx: number) => (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`border rounded-lg p-5 cursor-pointer transition-all ${
                      selectedPlan === plan.id
                        ? 'border-red-500 ring-1 ring-red-500 bg-red-50/30'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900">{plan.name}</h3>
                      <div className="text-right">
                        <span className="text-xl font-bold text-black">₹{Number(plan.price).toLocaleString()}</span>
                        <p className="text-xs text-gray-400">{formatDuration(plan.duration_days)}</p>
                      </div>
                    </div>
                    {plan.description && (
                      <p className="text-xs text-gray-500 mb-3">{plan.description}</p>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); handleRequestMembership(plan.name); }}
                      className="w-full bg-red-500 text-white py-2.5 rounded-full text-sm font-semibold hover:bg-red-600 transition-colors"
                    >
                      Request Membership
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 flex items-start gap-2 bg-gray-50 rounded-lg p-3 text-xs text-gray-500">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <span>Payments are processed securely. A platform fee of ₹4 applies to registration.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GymDetails;
