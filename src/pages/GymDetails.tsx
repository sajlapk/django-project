import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Star, Check, AlertCircle, Clock, ArrowLeft, Calendar, Loader, Globe, Instagram, Facebook, Youtube, MessageCircle, X, Award, Navigation, Dumbbell } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const renderSocialIcon = (platform: string) => {
  const lower = platform.toLowerCase();
  if (lower.includes('instagram')) return <Instagram className="w-5 h-5 text-pink-600 hover:scale-110 transition-transform" />;
  if (lower.includes('facebook')) return <Facebook className="w-5 h-5 text-blue-600 hover:scale-110 transition-transform" />;
  if (lower.includes('youtube')) return <Youtube className="w-5 h-5 text-red-600 hover:scale-110 transition-transform" />;
  if (lower.includes('whatsapp')) return <MessageCircle className="w-5 h-5 text-green-500 hover:scale-110 transition-transform" />;
  return <Globe className="w-5 h-5 text-gray-500 hover:scale-110 transition-transform" />;
};

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
  const [selectedTrainer, setSelectedTrainer] = useState<any | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchGym = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/fitnesscenter/gym/${id}/`);
        setGym(response.data.data || response.data);

        try {
          const resReviews = await axios.get(`${API_BASE_URL}/fitnesscenter/organization/${id}/reviews/`);
          const reviewsData = resReviews.data.results?.reviews || resReviews.data.reviews || resReviews.data.results || [];
          setReviews(Array.isArray(reviewsData) ? reviewsData : []);
        } catch (revErr) {
          console.warn("Failed to fetch reviews:", revErr);
        }
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

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch {
      return dateStr;
    }
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
  const gymLogo = getImageUrl(gym?.logo);
  const gymAddress = [gym?.location?.building_name, gym?.location?.city, gym?.location?.state].filter(Boolean).join(', ') || 'India';
  const gymCategories = gym?.categories || [];
  const gymAmenities = gym?.amenities || [];
  const gymPhotos = gym?.photos || [];
  const gymPlans = gym?.packages || [];
  const gymSlots = gym?.time_slots || [];
  const gymSocials = gym?.social_media || [];
  const rawBanner = gymPhotos.find((p: any) => p.is_primary)?.image || gymPhotos[0]?.image;
  const bannerImage = getImageUrl(rawBanner);

  const reviewsToRender = reviews.map((r: any) => ({
    id: r.id,
    name: r.customer_name || "Member",
    rating: Number(r.rating) || 5,
    date: formatDate(r.created),
    comment: r.comment || "Great gym, highly recommended!",
    avatar: r.profile_picture ? getImageUrl(r.profile_picture) : `https://ui-avatars.com/api/?name=${encodeURIComponent(r.customer_name || "Member")}&background=random`
  }));

  const trainersToRender = gym?.trainers || [];

  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let totalReviewsForGraph = 0;
  reviewsToRender.forEach((rev) => {
    const r = Math.max(1, Math.min(5, Math.round(rev.rating)));
    ratingCounts[r as keyof typeof ratingCounts]++;
    totalReviewsForGraph++;
  });

  const getRatingPercent = (star: number) => {
    if (totalReviewsForGraph === 0) {
      if (gymRating >= 4.5) return star === 5 ? 85 : star === 4 ? 10 : star === 3 ? 5 : 0;
      if (gymRating >= 4.0) return star === 5 ? 60 : star === 4 ? 30 : star === 3 ? 10 : 0;
      if (gymRating >= 3.0) return star === 5 ? 20 : star === 4 ? 40 : star === 3 ? 30 : star === 2 ? 10 : 0;
      if (gymRating > 0) return star === 3 ? 50 : star === 2 ? 30 : star === 1 ? 20 : 0;
      return 0;
    }
    return Math.round((ratingCounts[star as keyof typeof ratingCounts] / totalReviewsForGraph) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">

      {/* Banner */}
      <section className="relative h-[300px] md:h-[380px] w-full bg-gradient-to-br from-gray-900 via-red-950 to-gray-900 overflow-hidden">
        {bannerImage && (
          <img src={bannerImage} alt={gymName} className="w-full h-full object-cover opacity-40 absolute inset-0" />
        )}
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
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl border-4 border-white overflow-hidden bg-white shadow-md flex-shrink-0 flex items-center justify-center">
              {gymLogo ? (
                <img src={gymLogo} alt={gymName} className="w-full h-full object-contain bg-gray-50" />
              ) : (
                <Dumbbell className="w-10 h-10 text-red-500" />
              )}
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
                <span className="flex items-center gap-1 flex-wrap">
                  <MapPin className="w-4 h-4 text-red-500" />
                  {gymAddress}
                  {gym?.location?.google_maps_url && (
                    <a
                      href={gym.location.google_maps_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-red-500 hover:text-red-600 hover:bg-red-100 transition-colors ml-2 font-bold text-xs border border-red-200 bg-red-50 px-2.5 py-0.5 rounded-full shadow-sm"
                    >
                      <Navigation className="w-3 h-3 text-red-500 rotate-[45deg]" />
                      Directions
                    </a>
                  )}
                </span>
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
              {/* Social Icons Row */}
              {gymSocials.length > 0 && (
                <div className="flex items-center gap-3 mt-1">
                  {gymSocials.map((s: any, i: number) => (
                    <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" title={s.platform} className="p-1.5 bg-gray-50 hover:bg-gray-100 rounded-full border border-gray-200 transition-all">
                      {renderSocialIcon(s.platform)}
                    </a>
                  ))}
                </div>
              )}
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
                  <div key={a.id} className="flex items-center justify-center bg-white border border-gray-100 shadow-sm rounded-xl p-3.5 text-sm text-gray-700 hover:border-gray-200 hover:shadow-md transition-all duration-200 text-center">
                    {/* <Check className="w-4 h-4 text-green-500 flex-shrink-0" /> */}
                    <span className="font-medium">{a.name}</span>
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
                  <div
                    key={p.id}
                    onClick={() => setSelectedImage(getImageUrl(p.image))}
                    className="rounded-lg overflow-hidden h-32 md:h-40 cursor-pointer border hover:border-red-200 transition-all shadow-sm"
                  >
                    <img src={getImageUrl(p.image)} alt={p.caption} className="w-full h-full object-cover bg-gray-50 hover:scale-105 transition-transform duration-300" />
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
                  <div key={slot.id} className={`border rounded-lg p-4 flex justify-between items-center ${slot.is_active ? 'border-green-200 bg-green-50/30' : 'border-gray-200 opacity-50'
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

          {/* Coaches / Trainers Section */}
          {trainersToRender.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-bold text-black mb-6">Coaches & Trainers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {trainersToRender.map((trainer: any) => (
                  <div
                    key={trainer.id}
                    onClick={() => setSelectedTrainer(trainer)}
                    className="border border-gray-200 rounded-xl p-5 hover:border-red-200 hover:shadow-md transition-all duration-300 cursor-pointer flex gap-4 items-start bg-white"
                  >
                    <img
                      src={trainer.profile_image ? getImageUrl(trainer.profile_image) : "/default_avatar.svg"}
                      alt={trainer.full_name}
                      className="w-16 h-16 rounded-full object-cover bg-gray-50 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-gray-900 truncate">{trainer.full_name}</h4>
                        <div className="flex items-center gap-0.5 text-yellow-400">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span className="text-xs font-semibold text-gray-700">{trainer.average_rating}</span>
                        </div>
                      </div>
                      <p className="text-xs font-medium text-red-500 mb-2">{trainer.user_type}</p>

                      {/* Specializations tags */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {trainer.specializations?.slice(0, 3).map((spec: string, sIdx: number) => (
                          <span key={sIdx} className="text-[10px] bg-gray-50 text-gray-600 px-2 py-0.5 rounded-full border border-gray-100">
                            {spec}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-gray-500 font-medium">
                        <span>Clients: {trainer.clients_count}</span>
                        <span>Verified: {trainer.verified_workouts_count}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Member Reviews Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
            <h2 className="text-xl font-bold text-black mb-6">Member Reviews</h2>

            {/* Rating Overview */}
            <div className="flex flex-col md:flex-row gap-6 items-center border-b border-gray-100 pb-6 mb-6">
              <div className="text-center md:border-r border-gray-100 md:pr-8 flex-shrink-0">
                <div className="text-5xl font-black text-gray-900 mb-1">{gymRating > 0 ? gymRating.toFixed(1) : "0.0"}</div>
                <div className="flex items-center gap-1 justify-center mb-1">
                  <Star className={`w-5 h-5 ${Math.round(gymRating) >= 1 ? "fill-current text-yellow-400" : "text-gray-300"}`} />
                  <Star className={`w-5 h-5 ${Math.round(gymRating) >= 2 ? "fill-current text-yellow-400" : "text-gray-300"}`} />
                  <Star className={`w-5 h-5 ${Math.round(gymRating) >= 3 ? "fill-current text-yellow-400" : "text-gray-300"}`} />
                  <Star className={`w-5 h-5 ${Math.round(gymRating) >= 4 ? "fill-current text-yellow-400" : "text-gray-300"}`} />
                  <Star className={`w-5 h-5 ${Math.round(gymRating) >= 5 ? "fill-current text-yellow-400" : "text-gray-300"}`} />
                </div>
                <div className="text-xs text-gray-500 font-medium">Based on {gymReviews > 0 ? gymReviews : 0} ratings</div>
              </div>

              {/* Rating Bars */}
              <div className="flex-1 w-full space-y-2 max-w-sm">
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <span className="w-3 font-semibold">5</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${getRatingPercent(5)}%` }}></div>
                  </div>
                  <span className="w-8 text-right font-medium">{getRatingPercent(5)}%</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <span className="w-3 font-semibold">4</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full transition-all duration-500" style={{ width: `${getRatingPercent(4)}%` }}></div>
                  </div>
                  <span className="w-8 text-right font-medium">{getRatingPercent(4)}%</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <span className="w-3 font-semibold">3</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-400 rounded-full transition-all duration-500" style={{ width: `${getRatingPercent(3)}%` }}></div>
                  </div>
                  <span className="w-8 text-right font-medium">{getRatingPercent(3)}%</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <span className="w-3 font-semibold">2</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-400 rounded-full transition-all duration-500" style={{ width: `${getRatingPercent(2)}%` }}></div>
                  </div>
                  <span className="w-8 text-right font-medium">{getRatingPercent(2)}%</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <span className="w-3 font-semibold">1</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-red-400 rounded-full transition-all duration-500" style={{ width: `${getRatingPercent(1)}%` }}></div>
                  </div>
                  <span className="w-8 text-right font-medium">{getRatingPercent(1)}%</span>
                </div>
              </div>
            </div>

            {/* Member Reviews List */}
            <div className="space-y-6">
              {reviewsToRender.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-6">No reviews yet.</p>
              ) : (
                reviewsToRender.map((rev) => (
                  <div key={rev.id} className="flex gap-4 border-b border-gray-50 pb-6 last:border-b-0 last:pb-0">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      className="w-10 h-10 rounded-full object-cover bg-gray-50 flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-bold text-gray-900">{rev.name}</h4>
                        <span className="text-[10px] text-gray-400 font-medium">{rev.date}</span>
                      </div>
                      <div className="flex items-center gap-0.5 text-yellow-400 mb-2">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">{rev.comment}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column — Plans */}
        <div>
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
            <h2 className="text-xl font-bold text-black mb-6">Membership Plans</h2>

            {gymPlans.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">No plans available yet.</p>
            ) : (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {gymPlans.filter((p: any) => p.is_active).map((plan: any, idx: number) => (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`border rounded-lg p-5 cursor-pointer transition-all ${selectedPlan === plan.id
                      ? 'border-red-500 ring-1 ring-red-500 bg-red-50/30'
                      : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900">{plan.name}</h3>
                      <div className="text-right">
                        <span className="text-xl font-bold text-black">₹{Number(plan.actual_price).toLocaleString()}</span>
                        <p className="text-xs text-gray-400">{formatDuration(plan.duration_days)}</p>
                      </div>
                    </div>
                    {plan.description && (
                      <p className="text-xs text-gray-500 mb-3">{plan.description}</p>
                    )}
                    {/* <button
                      onClick={(e) => { e.stopPropagation(); handleRequestMembership(plan.name); }}
                      className="w-full bg-red-500 text-white py-2.5 rounded-full text-sm font-semibold hover:bg-red-600 transition-colors mb-2"
                    >
                      Request Membership
                    </button> */}
                    {gymPhone && (
                      <a
                        href={`https://wa.me/${gymPhone.replace(/[^\d]/g, '')}?text=${encodeURIComponent(`Hi, I'm interested in the "${plan.name}" package at ${gymName}.\n\nEnquiry through Discipl.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-full border border-green-500 text-green-600 bg-white hover:bg-green-50 py-2.5 rounded-full text-sm font-semibold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <span className="text-green-500 text-base font-bold">💬</span>
                        Enquire on WhatsApp
                      </a>
                    )}
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

      {/* Trainer Profile Modal */}
      {selectedTrainer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative animate-scaleUp">

            {/* Close Button */}
            <button
              onClick={() => setSelectedTrainer(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Banner/Header Block */}
            <div className="h-32 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-t-2xl relative">
              <div className="absolute -bottom-12 left-6 border-4 border-white rounded-full overflow-hidden w-24 h-24 shadow-lg bg-white">
                <img
                  src={selectedTrainer.profile_image ? getImageUrl(selectedTrainer.profile_image) : "/default_avatar.svg"}
                  alt={selectedTrainer.full_name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 pt-16">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 border-b pb-5 mb-5">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedTrainer.full_name}</h3>
                  <p className="text-sm font-semibold text-red-500 capitalize">{selectedTrainer.user_type}</p>
                  <div className="flex items-center gap-1.5 text-yellow-400 mt-1.5">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-bold text-gray-800">{selectedTrainer.average_rating}</span>
                    <span className="text-xs text-gray-400">({selectedTrainer.review_count} reviews)</span>
                    <span className="text-xs text-gray-300">|</span>
                    <span className="text-xs text-gray-500 font-semibold">{selectedTrainer.experience_years} Years Experience</span>
                  </div>
                </div>

                {/* Contact info in modal */}
                <div className="flex flex-col gap-1.5 text-xs text-gray-500 font-medium">
                  {selectedTrainer.email && <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-red-500" /> {selectedTrainer.email}</span>}
                  {selectedTrainer.mobile && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-red-500" /> {selectedTrainer.mobile}</span>}
                </div>
              </div>

              {/* Bio & Details Grid */}
              <div className="space-y-6">

                {/* Bio */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-2 text-sm">About / Bio</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{selectedTrainer.bio}</p>
                </div>

                {/* Specializations */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-2 text-sm">Specialities</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTrainer.specializations?.map((spec: string, idx: number) => (
                      <span key={idx} className="text-xs bg-red-50 text-red-600 px-3 py-1 rounded-full font-medium border border-red-100">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                {selectedTrainer.certifications?.length > 0 && (
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2.5 text-sm">Certifications & Credentials</h4>
                    <div className="space-y-2">
                      {selectedTrainer.certifications.map((cert: any, idx: number) => (
                        <div key={idx} className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                          <Award className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <h5 className="text-xs font-bold text-gray-900">{cert.name}</h5>
                            <p className="text-[11px] text-gray-500">{cert.issued_by} {cert.issued_date && `• Issued ${cert.issued_date}`}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Transformations (Before/After Slider/Grid) */}
                {selectedTrainer.transformations?.length > 0 && (
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 text-sm">Client Transformations</h4>
                    {selectedTrainer.transformations.map((trans: any, idx: number) => (
                      <div key={idx} className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <p className="text-xs text-gray-700 italic mb-3">"{trans.description}"</p>
                        <div className="grid grid-cols-2 gap-4">
                          {/* Before Image */}
                          <div className="relative rounded-lg overflow-hidden h-48 border bg-white">
                            <img
                              src={getImageUrl(trans.before_image)}
                              alt="Before"
                              className="w-full h-full object-contain bg-gray-100"
                            />
                            <div className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                              Before
                            </div>
                          </div>

                          {/* After Image */}
                          <div className="relative rounded-lg overflow-hidden h-48 border bg-white">
                            <img
                              src={getImageUrl(trans.after_image)}
                              alt="After"
                              className="w-full h-full object-contain bg-gray-100"
                            />
                            <div className="absolute bottom-2 left-2 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                              After
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 cursor-zoom-out animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-[110] p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-4xl max-h-[85vh] relative animate-scaleUp" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Gym details" className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl bg-black" />
          </div>
        </div>
      )}
    </div>
  );
};

export default GymDetails;
