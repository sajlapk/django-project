import React, { useState, useEffect  } from 'react';
import { Plus, X, Calendar, Clock, MapPin, IndianRupee, FileText, Image as ImageIcon, Trash2, Users, Phone, AtSign, Award, TicketCheck } from 'lucide-react';
import axios from 'axios';

// Define the structure for social media links
interface SocialMediaLink {
  platform: 'Instagram' | 'YouTube' | 'Facebook';
  handle: string;
}

// Define the main structure for an event
interface EventDetails {
  _id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  registration_fee: number;
  ticket_fee: number;
  total_tickets: number,
  banner_image: File | null;
  category: string;
  status: 'ONGOING' | 'PASSED';
  max_participants: number;
  judging_criteria: string[];
  prize_sponsorship: string;
  org_phone_no: string;
  org_email: string;
  social_media: SocialMediaLink[];
  is_audience_only: boolean
}

interface IEvent {
  _id: string;
  name: string;
  description: string;
  judging_criteria: string[];
  org_email: string;
  org_phone_no: string;
  social_media: { platform: string; handle: string }[];
  date: string;
  time: string;
  location: string;
  category: string;
  status: 'ONGOING' | 'PASSED';
  registration_fee: number;
  ticket_fee: number;
  total_tickets: number;
  registered_participants_count: number;
  max_participants: number;
  banner_image_url?: string;
  prize_sponsorship: string;
  issued_tickets_count: number;
  is_audience_only: boolean;
}

const AdminPanel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Popup that is used to add event
  const [audienceOnly, setAudienceOnly] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [successModal, setSuccessModal] = useState(false); // Popup that triggers on adding event
  const [successMessage, setSuccessMessage] = useState('') // This will contain the message that wil show up in the success modal
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false); // Popup that is used to edit status of event
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const [extraImages, setExtraImages] = useState<(File | null)[]>([null]);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();

    // Check if the modal is currently showing
    if (successModal) {
      // If it is, set a timer to hide it after 3 seconds
      const timer = setTimeout(() => {
        setSuccessModal(false);
      }, 3000); // 3000 milliseconds = 3 seconds

      // This is a cleanup function.
      // It runs if the component unmounts or if successModal changes again before the timer finishes.
      return () => clearTimeout(timer);
    }
  }, [successModal]); // The dependency array ensures this effect runs only when `successModal` changes.

  // Fetch events stored in backend
  const fetchEvents = async () => {
    try {
      const response = await axios.get('https://discipl-web-frontend-1.onrender.com/api/events'); // This is used when running from github repo
      // const response = await axios.get('http://localhost:8172/api/events'); // This is used when running on localhost
      // console.log("Events Fetched: ", response.data); // DEBUG

      if (Array.isArray(response.data)) {
        setEvents(response.data);
      } else if (Array.isArray(response.data.events)) {
        setEvents(response.data.events);
      } else {
        setEvents([]);
      }
    } catch (err) {
      console.error("Error fetching events:", err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  // Initialize state with all the new fields
  const [eventDetails, setEventDetails] = useState<EventDetails>({
    _id: '', name: '', date: '', time: '', location: '', description: '', registration_fee: 0, ticket_fee: 0, total_tickets: 0, banner_image: null,
    category: '', status: 'ONGOING', max_participants: 0, judging_criteria: [''], prize_sponsorship: '',
    org_phone_no: '', org_email: '', social_media: [{ platform: 'Instagram', handle: ''}], is_audience_only: false
  });

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setEventDetails(prev => ({ ...prev, [name]: type === "number" ? Number(value) : value }));
  };

  // --- Handler for Banner Image ---
  const handleBannerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setEventDetails(prev => ({ ...prev, banner_image: e.target.files[0] }));
    }
  };

  // --- Handlers for Optional Images ---
  const handleExtraImagesChange = (index: number, file: File | null) => {
    setExtraImages(prev => {
      const updated = [...prev];
      updated[index] = file;
      return updated;
    });
  };

  const addExtraImageField = () => {
    setExtraImages(prev => [...prev, null]);
  };

  const removeExtraImageField = (index: number) => {
    setExtraImages(prev => prev.filter((_, i) => i !== index));
  };

  // --- Handlers for Judging Criteria ---
  const handleCriteriaChange = (index: number, value: string) => {
    const newCriteria = [...eventDetails.judging_criteria];
    newCriteria[index] = value;
    setEventDetails(prev => ({ ...prev, judging_criteria: newCriteria }));
  };
  const addCriteriaField = () => {
    setEventDetails(prev => ({ ...prev, judging_criteria: [...prev.judging_criteria, ''] }));
  };
  const removeCriteriaField = (index: number) => {
    const newCriteria = eventDetails.judging_criteria.filter((_, i) => i !== index);
    setEventDetails(prev => ({ ...prev, judging_criteria: newCriteria }));
  };

  // --- Handlers for Social Media ---
  const handleSocialMediaChange = (index: number, field: 'platform' | 'handle', value: string) => {
    const newSocials = [...eventDetails.social_media];
    newSocials[index][field] = value as any; // Type assertion for platform
    setEventDetails(prev => ({ ...prev, social_media: newSocials }));
  };
  const addSocialMediaField = () => {
    setEventDetails(prev => ({ ...prev, social_media: [...prev.social_media, { platform: 'Instagram', handle: '' }] }));
  };
  const removeSocialMediaField = (index: number) => {
    const newSocials = eventDetails.social_media.filter((_, i) => i !== index);
    setEventDetails(prev => ({ ...prev, social_media: newSocials }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let bannerUrl = '';
      let galleryUrls: string[] = [];

      // Upload banner image
      if (eventDetails.banner_image) {
        const formData = new FormData();
        formData.append('file', eventDetails.banner_image);
        formData.append('upload_preset', uploadPreset);
        const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
        bannerUrl = cloudinaryResponse.data.secure_url;
      }

      // Upload additional images
      if (extraImages.length > 0) {
        for (const img of extraImages) {
          if (img) {
            const formData = new FormData();
            formData.append("file", img);
            formData.append("upload_preset", uploadPreset);
            const res = await axios.post(
              `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
              formData
            );
            galleryUrls.push(res.data.secure_url);
          }
        }
      }


      const finalCriteria = eventDetails.judging_criteria.filter(c => c.trim() !== '');
      const finalSocials = eventDetails.social_media.filter(s => s.handle.trim() !== '');

      const { banner_image, ...dataWithoutImage } = eventDetails;

      const eventData = {
        ...dataWithoutImage,
        registration_fee: Number(eventDetails.registration_fee) || 0,
        ticket_fee: Number(eventDetails.ticket_fee) || 0,
        total_tickets: Number(eventDetails.total_tickets) || 0,
        max_participants: Number(eventDetails.max_participants) || 0,
        banner_image_url: bannerUrl,
        additional_images: galleryUrls,
        judging_criteria: finalCriteria,
        social_media: finalSocials,
        is_audience_only: audienceOnly
      };
      // console.log("Posting event data:", eventData); // DEBUG

      const response = await axios.post('https://discipl-web-frontend-1.onrender.com/api/events', eventData); // This is used when running from github repo
      // const response = await axios.post('http://localhost:8172/api/events', eventData); // This is used when running on localhost
      // console.log(response.data); // DEBUG
      // alert("Event created successfully!"); // DEBUG

      determineSuccessModal(response);

      setIsModalOpen(false);
      setExtraImages([]);
      setEventDetails({
        _id: '', name: '', date: '', time: '', location: '', description: '', registration_fee: 0, ticket_fee: 0, total_tickets: 0, banner_image: null,
        category: 'None', status: 'ONGOING', max_participants: 50, judging_criteria: [''], prize_sponsorship: '',
        org_phone_no: '', org_email: '', social_media: [{ platform: 'Instagram', handle: '' }], is_audience_only: false
      });
    } catch (error) {
      // console.error("Failed to create event:", error); //  DEBUG
      // alert("Failed to create event. See console for details."); // DEBUG
    } finally {
      setIsUploading(false);
    }
  };

  // helper function to determine if the success modal should show "successfully added" or "error occurred."
  const determineSuccessModal = (response: any) => {
    // Setting the message
    if(response.status === 201){
      setSuccessMessage("Successfully created Event.")
    }else if(response.status === 500){
      setSuccessMessage("Server error while creating event.")
    }else{  
      setSuccessMessage("Some error occurred.")
    }

    setSuccessModal(true); // Showing the modal
  };

  // Helper function to format date to a string format
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });


  // helper function to format time to 12 hour
  const formatTime = (timeStr: string): string => {
    // 1. Basic validation to prevent errors
    if (!timeStr || typeof timeStr !== 'string' || !timeStr.match(/^\d{2}:\d{2}$/)) {
      return ''; // Return an empty string for invalid input
    }

    // 2. Create a dummy date object, specifying the time is in UTC.
    const date = new Date(`1970-01-01T${timeStr}:00Z`);
    
    // 3. Check if the created date is valid, in case of input like "99:99"
    if (isNaN(date.getTime())) {
      return '';
    }

    // 4. Create a formatter that formats time specifically in the UTC timezone.
    const formatter = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit', // Use '2-digit' to ensure minutes are like '05'
      hour12: true,
      timeZone: 'UTC' // THIS IS THE CRUCIAL FIX
    });

    return formatter.format(date);
  };

  // Helper function to check if all important fields in event form are filled. Configured to not check for anything.
  const formIncompleteCheck = (eventDetails: any) => {
    if(
      eventDetails.name === '' || 
      eventDetails.date  === '' || 
      eventDetails.time === '' || 
      eventDetails.location === '' ||
      eventDetails.category === '' ||
      eventDetails.ticket_fee === 0 ||
      eventDetails.total_tickets === 0 ||
      eventDetails.description === '' ||
      eventDetails.org_phone_no === '' || 
      eventDetails.org_email === '' 
    )
      return false // Change this to true to make it check for fields
    else 
      return false
  };

  // Function to set the status of the event in AdminPanel
  const setStatus = async (status: String) => {
    try{
      if(status == "PASSED"){
        await axios.patch(`https://discipl-web-frontend-1.onrender.com/api/events/${selectedEvent?._id}`, { status: "ONGOING" }); // This is used when running from github repo    
        // const response = await axios.patch(`http://localhost:8172/api/events/${selectedEvent?._id}`, { status: "ONGOING" }); // This is used when running on localhost
        // console.log("Changed status to passed: ", response); // DEBUG
      }else if(status == "ONGOING"){
        await axios.patch(`https://discipl-web-frontend-1.onrender.com/api/events/${selectedEvent?._id}`, { status: "PASSED" }); // This is used when running from github repo    
        // const response = await axios.patch(`http://localhost:8172/api/events/${selectedEvent?._id}`, { status: "PASSED" }); // This is used when running on localhost
        // console.log("Changed status to ongoing: ", response); // DEBUG
      }else{
        // console.log("Some error occurred while changing status."); // DEBUG
      }

      // Refetch the events so the issued_tickets_count and registered_participants_count can refresh 
      const post_payment_response = await axios.get('https://discipl-web-frontend-1.onrender.com/api/events'); // This is used when running from github repo      
      // const post_payment_response = await axios.get('http://localhost:8172/api/events'); // This is used when running on localhost
      // console.log("Fetched events after payment", post_payment_response) // DEBUG

      setEvents(post_payment_response.data);
      setIsStatusModalOpen(false);
    }catch(error){
      // console.log("Some error occurred while changing status."); // DEBUG
    }
  }

  // Function to delete an event
  const deleteEvent = async (event: IEvent | null) => {
    try{
      if (!window.confirm("Are you sure you want to delete this event? This action cannot be undone.")) return;
      if (!window.confirm("NOTE: YOU ARE ABOUT TO DELETE AN EVENT.")) return;
      if (!window.confirm("NOTE: THIS WILL CANCEL ALL ASSOCIATED TICKETS AND REGISTERED PARTICIPANTS(NO REFUND WILL BE DONE).")) return;
      await axios.delete(`https://discipl-web-frontend-1.onrender.com/api/events/${event?._id}`); // This is used when running from github repo
      // const response = await axios.delete(`http://localhost:8172/api/events/${event?._id}`); // This is used when running on localhost
      // console.log("Deleted event: ", response); // DEBUG

      // Refetch the events so the issued_tickets_count and registered_participants_count can refresh 
      const post_payment_response = await axios.get('https://discipl-web-frontend-1.onrender.com/api/events'); // This is used when running from github repo      
      // const post_payment_response = await axios.get('http://localhost:8172/api/events'); // This is used when running on localhost
      // console.log("Fetched events after payment", post_payment_response) // DEBUG

      setSelectedEvent(null);
      setEvents(post_payment_response.data);
      setIsStatusModalOpen(false);
    }catch(error){
      // console.log("Some error occurred while deleting event."); // DEBUG
    }
  }

  // Function to export participant list
  const exportParticipantList = async (eventId: string | undefined) => {
    if (!eventId) {
      alert("Cannot export: Event ID is missing."); 
      return;
    }

    try {
      const exportUrl = `https://discipl-web-frontend-1.onrender.com/api/participants/export/${eventId}`; // This is used when running from github repo
      // const exportUrl = `http://localhost:8172/api/participants/export/${eventId}`; // This is used when running on localhost

      // 1. Make the request with axios, expecting a 'blob' (file data) in response
      const response = await axios.get(exportUrl, {
        responseType: 'blob',
      });

      // 2. Create a Blob from the response data
      const blob = new Blob([response.data], { type: 'text/csv' });

      // 3. Create a temporary URL for the Blob
      const url = window.URL.createObjectURL(blob);

      // 4. Create a temporary link element to trigger the download
      const link = document.createElement('a');
      link.href = url;

      // Set the download filename (you can set a default or try to get it from headers)
      const date = new Date().toISOString().slice(0, 10);
      link.setAttribute('download', `participants-export-${date}.csv`);

      // 5. Trigger the download and clean up
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      // 6. Handle errors gracefully with alerts
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        // This is the specific "Not Found" error from your backend
        alert("No participants found for this event.");
      } else {
        // For any other error (e.g., server down)
        alert("An error occurred while exporting the list. Please try again.");
        console.error("Error exporting participant list:", error);
      }
    }
  };

  return (
    <>
      {/* Modal that pops up on adding an event */}
      {successModal == true && (
        (successMessage === "Successfully created Event." ?
        <div className="fixed z-50 to-4, bg-white shadow-lg inset-x-4 border border-green-300 rounded-full h-20 flex items-center justify-center text-2xl">
          <p className= "text-green-300">{successMessage}</p>
        </div>
        :
        <div className="fixed z-50 to-4, bg-white shadow-lg inset-x-4 border border-red-500 rounded-full h-20 flex items-center justify-center text-2xl">
          <p className= "text-red-500">{successMessage}</p>
        </div>
        )
      )}
      <div className="min-h-screen bg-gray-50 pb-12">
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
            <div className="px-4 py-6 sm:px-0 flex flex-col justify-evenly">
              {/* For ongoing events */}
              <h1 className="text-4xl mb-5"><b>Ongoing Events</b></h1>
              <div className="border-4 border-dashed border-gray-200 rounded-lg min-h-96 flex items-center justify-center text-center p-4">
                {events.length === 0 || events.filter(event => event.status === "ONGOING").length === 0 ? 
                  <div>
                    <p>No ongoing events.</p>
                  </div>
                :
                  <div className="grid w-full gap-8 md:grid-cols-1 lg:grid-cols-1">
                    {events.filter(event => event.status === "ONGOING").map((event)=>
                        <div
                        key={event._id}
                        className="w-full cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden flex flex-row"
                        >
                          <div 
                          className="flex flex-row w-full"
                          onClick={() => {setSelectedEvent(event); setIsStatusModalOpen(true);}}
                        >
                            <div>
                              <img 
                              src={event.banner_image_url}
                              className="p-1 w-48 h-48 object-cover border border-black border-2 rounded-l-2xl"  
                              />
                            </div>
                            <div className="p-4 w-full border-t-2 border-red-500 border-b-2 border-red-500 flex-1 flex-col justify-start">
                              <div className="flex flex-row"> 
                                <h1 className="text-2xl"><b>{event.name}</b></h1>
                              </div>
                              <div className="flex flex-row items-center">
                                <Clock className="fixed w-4 h-4 text-gray-500"/><p className="text-gray-500 ml-6">{formatDate(event.date)}</p>
                              </div>
                              <div className="flex flex-row items-center">
                                <Calendar className="fixed w-4 h-4 text-gray-500"/><p className="text-gray-500 ml-6">{formatTime(event.time)}</p>
                              </div>
                              <div className="flex flex-row items-center">
                                <MapPin className="fixed w-4 h-4 text-gray-500"/><p className="text-gray-500 ml-6">{event.location}</p>
                              </div>
                              {event.is_audience_only ?
                              (
                                <span className="flex items-center text-gray-700 mt-2 bg-black w-28 p-1 rounded-full justify-center">
                                  <p className="text-xs font-bold"><span className="text-white">AUDIENCE </span><span className="text-red-500">ONLY</span></p>
                                </span>
                              )
                              :
                              (
                                <div className="flex items-center text-gray-700">
                                </div>
                              )
                              }
                            </div> 
                          </div>
                          <div> 
                            <button 
                            className="p-2 bg-red-500 border-t-2 border-b-2 border-r-2 border-red-500 rounded-r-2xl pl-8 pr-8 text-gray-400 hover:bg-red-600 hover:border-red-600 transition-colors h-full"
                            onClick={(e) => { e.stopPropagation(); deleteEvent(event);}}
                            >
                              <Trash2 className="w-6 h-6 text-white"/>
                            </button> 
                          </div>         
                        </div>
                    )}
                  </div>
                }
              </div>

              {/* For past events */}
              <h1 className="text-4xl mb-5"><b>Past Events</b></h1>
              <div className="border-4 border-dashed border-gray-200 rounded-lg min-h-96 flex items-center justify-center text-center p-4">
                {events.length === 0 || events.filter(event => event.status === "PASSED").length === 0 ? 
                  <div>
                    <p>No past events to display.</p>
                  </div>
                :
                  <div className="grid w-full gap-8 md:grid-cols-1 lg:grid-cols-1">
                    {events.filter(event => event.status === "PASSED").map((event)=>
                      <div 
                      key={event._id}
                      className="w-full cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden flex flex-row"
                      >
                        <div
                          onClick={() => {setSelectedEvent(event); setIsStatusModalOpen(true);}}
                          className="flex flex-row w-full">
                          <div>
                            <img 
                            src={event.banner_image_url}
                            className="p-1 w-48 h-48 object-cover border border-black border-2 rounded-l-2xl"  
                            />
                          </div>
                          <div className="p-4 w-full border-t-2 border-red-500 border-b-2 border-red-500 flex-1 flex-col justify-start">
                            <div className="flex flex-row"> 
                              <h1 className="text-2xl"><b>{event.name}</b></h1>
                            </div>
                            <div className="flex flex-row items-center">
                              <Clock className="fixed w-4 h-4 text-gray-500"/><p className="text-gray-500 ml-6">{formatDate(event.date)}</p>
                            </div>
                            <div className="flex flex-row items-center">
                              <Calendar className="fixed w-4 h-4 text-gray-500"/><p className="text-gray-500 ml-6">{formatTime(event.time)}</p>
                            </div>
                            <div className="flex flex-row items-center">
                              <MapPin className="fixed w-4 h-4 text-gray-500"/><p className="text-gray-500 ml-6">{event.location}</p>
                            </div>
                            {event.is_audience_only ?
                            (
                              <span className="flex items-center text-gray-700 mt-2 bg-black w-28 p-1 rounded-full justify-center">
                                <p className="text-xs font-bold"><span className="text-white">AUDIENCE </span><span className="text-red-500">ONLY</span></p>
                              </span>
                            )
                            :
                            (
                              <div className="flex items-center text-gray-700">
                              </div>
                            )
                            }
                          </div>
                        </div>
                        <div> 
                          <button 
                          className="p-2 bg-red-500 border-t-2 border-b-2 border-r-2 border-red-500 rounded-r-2xl pl-8 pr-8 text-gray-400 hover:bg-red-600 hover:border-red-600 transition-colors h-full"
                          onClick={(e) => { e.stopPropagation; deleteEvent(event)}}
                          >
                            <Trash2 className="w-6 h-6 text-white"
                            />
                          </button> 
                        </div>     
                      </div>
                    )}
                  </div>
                }
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Popup model that pops up when creating an event for normal events*/}
      {isModalOpen && !audienceOnly && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Create New Event</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-4 sm:p-8 space-y-6 overflow-y-auto">
              {/* Check for audience only event */}
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input type="checkbox" name="toggle" id="toggle" onChange={() => setAudienceOnly(!audienceOnly)} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
                <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
              </div>
              <label htmlFor="toggle" className="text-xs lg:text-sm text-gray-700">Is this an Audience Only Event? (No Registrations)</label>

              {/* Event Name, Date, Time, Location, Fee, Category, Max Participants... */}
              <div className="relative">
                <input type="text" name="name" placeholder="Event Name" onChange={handleInputChange} value={eventDetails.name} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" />
                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative"><label htmlFor="date">Date of Event</label><input type="date" name="date" onChange={handleInputChange} value={eventDetails.date} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" /><Calendar className="absolute left-4 top-12 -translate-y-1/2 h-5 w-5 text-gray-400" /></div>
                <div className="relative"><label htmlFor="time">Time of Event</label><input type="time" name="time" onChange={handleInputChange} value={eventDetails.time} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" /><Clock className="absolute left-4 top-12 -translate-y-1/2 h-5 w-5 text-gray-400" /></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative"><input type="text" name="location" placeholder="Location or Venue" onChange={handleInputChange} value={eventDetails.location} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" /><MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /></div>
                <div className="relative"><input type="number" name="registration_fee" placeholder="Registration Fee" onChange={handleInputChange} value={eventDetails.registration_fee === 0 ? '' : eventDetails.registration_fee} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" /><IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* <div className="relative"><input type="text" name="category" placeholder="Category" required onChange={handleInputChange} value={eventDetails.category} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" /><FileText className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /></div> */}
                <div className="relative">
                  <select name="category" value={eventDetails.category} onChange={(e) => setEventDetails(prev => ({ ...prev, category: e.target.value }))} className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors">
                    <option value="None">None</option>
                    <option value="General">General</option>
                    <option value="Power Lifting">Power Lifting</option>
                    <option value="Wrestling">Wrestling</option>
                    <option value="Cardio">Cardio</option>
                    <option value="Calisthenics">Calisthenics</option>
                    <option value="Training">Training</option>
                    <option value="Physique">Physique</option>
                    <option value="Seminar">Seminar</option>
                  </select>
                  <FileText className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                <div className="relative"><input type="number" name="max_participants" placeholder="Max Participants" onChange={handleInputChange} value={eventDetails.max_participants === 0 ?  '' : eventDetails.max_participants} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" /><Users className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative"><input type="number" name="ticket_fee" placeholder="Ticket Fee" onChange={handleInputChange} value={eventDetails.ticket_fee === 0 ? '' : eventDetails.ticket_fee} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" /><IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /></div>
                <div className="relative"><input type="number" name="total_tickets" placeholder="Total Tickets" onChange={handleInputChange} value={eventDetails.total_tickets === 0 ? '' : eventDetails.total_tickets} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" /><TicketCheck className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /></div>
              </div>
              <div className="relative"><textarea name="description" placeholder="Event Description" rows={4} onChange={handleInputChange} value={eventDetails.description} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors resize-none" /><FileText className="absolute left-4 top-4 h-5 w-5 text-gray-400" /></div>
              
              {/* Judging Criteria */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Judging Criteria</label>
                {eventDetails.judging_criteria.map((criterion, index) => (<div key={index} className="flex items-center gap-2 mb-2"><input type="text" placeholder={`Criterion #${index + 1}`} value={criterion} onChange={(e) => handleCriteriaChange(index, e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" />{eventDetails.judging_criteria.length > 1 && (<button type="button" onClick={() => removeCriteriaField(index)} className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"><Trash2 className="w-5 h-5" /></button>)}</div>))}
                <button type="button" onClick={addCriteriaField} className="mt-2 flex items-center text-sm font-medium text-red-600 hover:text-red-800"><Plus className="w-4 h-4 mr-1" />Add Criterion</button>
              </div>

              {/* Prize & Sponsorship */}
              <div className="relative"><textarea name="prize_sponsorship" placeholder="Prize & Sponsorship Details" rows={3} onChange={handleInputChange} value={eventDetails.prize_sponsorship} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors resize-none" /><Award className="absolute left-4 top-4 h-5 w-5 text-gray-400" /></div>

              {/* Organizer Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Organizer Details</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div className="relative"><input type="tel" name="org_phone_no" placeholder="Organizer Phone" pattern="[0-9]{10}" onChange={handleInputChange} value={eventDetails.org_phone_no} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" /><Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /></div><div className="relative"><input type="email" name="org_email" placeholder="Organizer Email" onChange={handleInputChange} value={eventDetails.org_email} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" /><AtSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /></div></div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Social Media Handles</label>
                {eventDetails.social_media.map((social, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <select value={social.platform} onChange={(e) => handleSocialMediaChange(index, 'platform', e.target.value)} className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors bg-white">
                      <option>Instagram</option>
                      <option>YouTube</option>
                      <option>Facebook</option>
                    </select>
                    <input type="text" placeholder="Handle (e.g., @username)" value={social.handle} onChange={(e) => handleSocialMediaChange(index, 'handle', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" />
                    {eventDetails.social_media.length > 1 && (<button type="button" onClick={() => removeSocialMediaField(index)} className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"><Trash2 className="w-5 h-5" /></button>)}
                  </div>
                ))}
                <button type="button" onClick={addSocialMediaField} className="mt-2 flex items-center text-sm font-medium text-red-600 hover:text-red-800"><Plus className="w-4 h-4 mr-1" />Add Social Media</button>
              </div>
              
              {/* Banner Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Banner</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"><div className="space-y-1 text-center"><ImageIcon className="mx-auto h-12 w-12 text-gray-400" /><div className="flex text-sm text-gray-600"><label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500"><span>Upload a file</span><input id="file-upload" name="image" type="file" className="sr-only" onChange={handleBannerImageChange} accept="image/*" /></label><p className="pl-1">or drag and drop</p></div><p className="text-xs text-gray-500">PNG, JPG up to 10MB (768px x 512px)</p>{eventDetails.banner_image && <p className="text-sm text-green-600 mt-2">Selected: {eventDetails.banner_image.name}</p>}</div></div>
              </div>

              {/* Optional Extra Images Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Optional Extra Images
                </label>

                {extraImages.map((img, index) => (
                  <div key={index} className="flex items-center gap-3 mb-3 border border-gray-300 p-3 rounded-lg">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleExtraImagesChange(index, e.target.files?.[0] || null)
                      }
                      className="block w-full text-sm text-gray-600"
                    />
                    {img && (
                      <p className="text-green-600 text-sm">
                        Selected: {img.name}
                      </p>
                    )}
                    {extraImages.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeExtraImageField(index)}
                        className="p-2 text-gray-500 hover:text-red-600"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addExtraImageField}
                  className="mt-2 flex items-center text-sm font-medium text-red-600 hover:text-red-800"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Image
                </button>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end items-center pt-6 border-t border-gray-200 space-x-4 flex-shrink-0">
                <button type="button" onClick={() => setIsModalOpen(false)} disabled={isUploading} className="px-6 py-3 rounded-full font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50">Cancel</button>
                {(formIncompleteCheck(eventDetails) ?
                  <button type="submit" disabled className="px-6 py-3 rounded-full font-semibold text-gray-500 bg-gray-200 transition-colors flex items-center border border-gray-500">Please fill all fields</button>
                :
                  <button type="submit" disabled={isUploading} className="px-6 py-3 rounded-full font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors flex items-center disabled:bg-red-400">{isUploading && <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>}{isUploading ? 'Creating...' : 'Create Event'}</button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Popup model that pops up when creating an event for audience only events*/}
      {audienceOnly && isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Create New Event</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-4 sm:p-8 space-y-6 overflow-y-auto">
              {/* Check for audience only event */}
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input type="checkbox" name="toggle" id="toggle" onChange={() => {setAudienceOnly(!audienceOnly)}} checked={true} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
                <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
              </div>
              <label htmlFor="toggle" className="text-xs lg:text-sm text-gray-700">Is this an Audience Only Event? (No Registrations)</label>

              {/* Event Name, Date, Time, Location, Fee, Category, Max Participants... */}
              <div className="relative">
                <input type="text" name="name" placeholder="Event Name" required onChange={handleInputChange} value={eventDetails.name} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" />
                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative"><label htmlFor="date">Date of Event</label><input type="date" name="date" required onChange={handleInputChange} value={eventDetails.date} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" /><Calendar className="absolute left-4 top-12 -translate-y-1/2 h-5 w-5 text-gray-400" /></div>
                <div className="relative"><label htmlFor="time">Time of Event</label><input type="time" name="time" required onChange={handleInputChange} value={eventDetails.time} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" /><Clock className="absolute left-4 top-12 -translate-y-1/2 h-5 w-5 text-gray-400" /></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative"><input type="text" name="location" placeholder="Location or Venue" required onChange={handleInputChange} value={eventDetails.location} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" /><MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /></div>
                {/* <div className="relative"><input type="text" name="category" placeholder="Category" required onChange={handleInputChange} value={eventDetails.category} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" /><FileText className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /></div> */}
                <div className="relative">
                  <select name="category" required value={eventDetails.category} onChange={(e) => setEventDetails(prev => ({ ...prev, category: e.target.value }))} className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors">
                    <option value="General">General</option>
                    <option value="Power Lifting">Power Lifting</option>
                    <option value="Wrestling">Wrestling</option>
                    <option value="Cardio">Cardio</option>
                    <option value="Calisthenics">Calisthenics</option>
                    <option value="Training">Training</option>
                    <option value="Physique">Physique</option>
                    <option value="Seminar">Seminar</option>
                  </select>
                  <FileText className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative"><input type="number" name="ticket_fee" placeholder="Ticket Fee" required onChange={handleInputChange} value={eventDetails.ticket_fee === 0 ? '' : eventDetails.ticket_fee} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" /><IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /></div>
                <div className="relative"><input type="number" name="total_tickets" placeholder="Total Tickets" required onChange={handleInputChange} value={eventDetails.total_tickets === 0 ? '' : eventDetails.total_tickets} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" /><TicketCheck className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /></div>
              </div>
              <div className="relative"><textarea name="description" placeholder="Event Description" required rows={4} onChange={handleInputChange} value={eventDetails.description} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors resize-none" /><FileText className="absolute left-4 top-4 h-5 w-5 text-gray-400" /></div>

              {/* Organizer Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Organizer Details</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div className="relative"><input type="tel" name="org_phone_no" placeholder="Organizer Phone" required pattern="[0-9]{10}" onChange={handleInputChange} value={eventDetails.org_phone_no} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" /><Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /></div><div className="relative"><input type="email" name="org_email" placeholder="Organizer Email" required onChange={handleInputChange} value={eventDetails.org_email} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" /><AtSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /></div></div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Social Media Handles</label>
                {eventDetails.social_media.map((social, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <select value={social.platform} onChange={(e) => handleSocialMediaChange(index, 'platform', e.target.value)} className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors bg-white">
                      <option>Instagram</option>
                      <option>YouTube</option>
                      <option>Facebook</option>
                    </select>
                    <input type="text" placeholder="Handle (e.g., @username)" value={social.handle} onChange={(e) => handleSocialMediaChange(index, 'handle', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" />
                    {eventDetails.social_media.length > 1 && (<button type="button" onClick={() => removeSocialMediaField(index)} className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"><Trash2 className="w-5 h-5" /></button>)}
                  </div>
                ))}
                <button type="button" onClick={addSocialMediaField} className="mt-2 flex items-center text-sm font-medium text-red-600 hover:text-red-800"><Plus className="w-4 h-4 mr-1" />Add Social Media</button>
              </div>
              
              {/* Banner Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Banner</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"><div className="space-y-1 text-center"><ImageIcon className="mx-auto h-12 w-12 text-gray-400" /><div className="flex text-sm text-gray-600"><label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500"><span>Upload a file</span><input id="file-upload" name="image" type="file" className="sr-only" onChange={handleBannerImageChange} accept="image/*" /></label><p className="pl-1">or drag and drop</p></div><p className="text-xs text-gray-500">PNG, JPG up to 10MB (768px x 512px)</p>{eventDetails.banner_image && <p className="text-sm text-green-600 mt-2">Selected: {eventDetails.banner_image.name}</p>}</div></div>
              </div>

              {/* Optional Extra Images Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Optional Extra Images
                </label>

                {extraImages.map((img, index) => (
                  <div key={index} className="flex items-center gap-3 mb-3 border border-gray-300 p-3 rounded-lg">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleExtraImagesChange(index, e.target.files?.[0] || null)
                      }
                      className="block w-full text-sm text-gray-600"
                    />
                    {img && (
                      <p className="text-green-600 text-sm">
                        Selected: {img.name}
                      </p>
                    )}
                    {extraImages.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeExtraImageField(index)}
                        className="p-2 text-gray-500 hover:text-red-600"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addExtraImageField}
                  className="mt-2 flex items-center text-sm font-medium text-red-600 hover:text-red-800"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Image
                </button>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end items-center pt-6 border-t border-gray-200 space-x-4 flex-shrink-0">
                <button type="button" onClick={() => setIsModalOpen(false)} disabled={isUploading} className="px-6 py-3 rounded-full font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50">Cancel</button>
                {(formIncompleteCheck(eventDetails) ?
                  <button type="submit" disabled className="px-6 py-3 rounded-full font-semibold text-gray-500 bg-gray-200 transition-colors flex items-center border border-gray-500">Please fill all fields</button>
                :
                  <button type="submit" disabled={isUploading} className="px-6 py-3 rounded-full font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors flex items-center disabled:bg-red-400">{isUploading && <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>}{isUploading ? 'Creating...' : 'Create Event'}</button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Popup Modal to set status of events */}
      {isStatusModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center bg-red-500 p-4 sm:p-6 border-b border-gray-200 flex-shrink-0 rounded-t-2xl">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Set Status</h2>
              <button onClick={() => setIsStatusModalOpen(false)} className="p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4 sm:p-8 overflow-y-auto space-y-6">
              <img
                src={
                  selectedEvent.banner_image_url ||
                  "https://placehold.co/600x400/f87171/white?text=Event"
                }
                alt={selectedEvent.name}
                className="w-full h-56 object-cover rounded-lg"
              />
              
              {/* Event Gallery */}
              {selectedEvent.additional_images && selectedEvent.additional_images.length > 0 && (
                <div className="mt-6 relative w-full">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Gallery</h3>

                  <div className="relative overflow-hidden rounded-xl">
                    <div
                      className="flex overflow-x-auto space-x-3 scrollbar-hide snap-x snap-mandatory scroll-smooth"
                      ref={(el) => {
                        if (!el) return;
                        const scrollContainer = el;
                        let index = 0;
                        let autoScroll: NodeJS.Timeout;

                        const dots = document.querySelectorAll<HTMLButtonElement>(".gallery-dot");

                        const updateDots = (idx: number) => {
                          dots.forEach((dot, i) => {
                            dot.classList.toggle("bg-gray-800", i === idx);
                            dot.classList.toggle("bg-gray-400", i !== idx);
                          });
                        };

                        const startAutoScroll = () => {
                          clearInterval(autoScroll);
                          autoScroll = setInterval(() => {
                            if (!scrollContainer) return;
                            index = (index + 1) % selectedEvent.additional_images.length;
                            scrollContainer.scrollTo({
                              left: index * scrollContainer.clientWidth,
                              behavior: "smooth",
                            });
                            updateDots(index);
                          }, 5000);
                        };

                        // Detect current index on manual scroll
                        const handleScroll = () => {
                          const newIndex = Math.round(
                            scrollContainer.scrollLeft / scrollContainer.clientWidth
                          );
                          index = newIndex;
                          updateDots(index);
                        };

                        scrollContainer.addEventListener("scroll", handleScroll);
                        scrollContainer.addEventListener("mousedown", () => clearInterval(autoScroll));
                        scrollContainer.addEventListener("touchstart", () => clearInterval(autoScroll));
                        scrollContainer.addEventListener("mouseup", startAutoScroll);
                        scrollContainer.addEventListener("touchend", startAutoScroll);

                        updateDots(index);
                        startAutoScroll();

                        return () => {
                          clearInterval(autoScroll);
                          scrollContainer.removeEventListener("scroll", handleScroll);
                        };
                      }}
                    >
                      {selectedEvent.additional_images.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt={`Event image ${i + 1}`}
                          className="w-full h-64 object-cover rounded-lg snap-center flex-shrink-0"
                        />
                      ))}
                    </div>

                    {/* Left arrow */}
                    <button
                      onClick={() => {
                        const container = document.querySelector<HTMLDivElement>(".scrollbar-hide");
                        if (container)
                          container.scrollBy({ left: -container.clientWidth, behavior: "smooth" });
                      }}
                      className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                    >
                      ‹
                    </button>

                    {/* Right arrow */}
                    <button
                      onClick={() => {
                        const container = document.querySelector<HTMLDivElement>(".scrollbar-hide");
                        if (container)
                          container.scrollBy({ left: container.clientWidth, behavior: "smooth" });
                      }}
                      className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                    >
                      ›
                    </button>
                  </div>

                  {/* Pagination dots below the image */}
                  <div className="flex justify-center space-x-2 mt-4">
                    {selectedEvent.additional_images.map((_, i) => (
                      <button
                        key={i}
                        className={`gallery-dot w-3 h-3 rounded-full ${i === 0 ? 'bg-gray-800' : 'bg-gray-400'}`}
                        onClick={() => {
                          const container = document.querySelector<HTMLDivElement>(".scrollbar-hide");
                          if (container)
                            container.scrollTo({ left: i * container.clientWidth, behavior: "smooth" });
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {selectedEvent.is_audience_only && (
                <span className="flex items-center text-gray-700 mt-2 bg-black w-28 p-1 rounded-full justify-center">
                  <p className="text-xs font-bold"><span className="text-white">AUDIENCE </span><span className="text-red-500">ONLY</span></p>
                </span>
              )}

              <div className="space-y-1">
                <p className="text-medium text-black mb-0">Description:</p>
                <div className="border p-4 pt-1 pl-3 rounded-lg bg-gray-50">
                  <p className="text-gray-700">{selectedEvent.description}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-700">
                  <p className="text-medium"><span className="text-black">Category:</span> {selectedEvent.category}</p>
                </div>
                <div className="flex items-center text-gray-700">
                  <p className="text-medium"><span className="text-black">Date:</span> {formatDate(selectedEvent.date)}</p>
                </div>
                <div className="flex items-center text-gray-700">
                  <p className="text-medium"><span className="text-black">Time:</span> {formatTime(selectedEvent.time)}</p>
                </div>
                <div className="flex items-center text-gray-700">
                  <p className="text-medium"><span className="text-black">Location:</span> {selectedEvent.location}</p>
                </div>
                {!selectedEvent.is_audience_only && (
                  <div className="flex items-center text-gray-700">
                    <p className="text-medium"><span className="text-black">Participation Fee:</span> {selectedEvent.registration_fee}</p>
                  </div>
                )}
                <div className="flex items-center text-gray-700">
                  <p className="text-medium"><span className="text-black">Ticket Fee:</span> {selectedEvent.ticket_fee}</p>
                </div>
                {!selectedEvent.is_audience_only && (
                  <div className="flex items-center text-gray-700">
                    <p className="text-medium"><span className="text-black">Participants:</span> {selectedEvent.registered_participants_count}/{selectedEvent.max_participants}</p>
                  </div>
                )}
                <div className="flex items-center text-gray-700">
                  <p className="text-medium"><span className="text-black">Total Tickets Available:</span> {selectedEvent.total_tickets}</p>
                </div>
                {!selectedEvent.is_audience_only && (
                  <div className="flex items-center text-gray-700 pb-5">
                    <p className="text-medium"><span className="text-black">Prize:</span> {selectedEvent.prize_sponsorship}</p>
                  </div>
                )}

                {/*Organizer Details*/}
                <div className="border rounded-lg bg-gray-50">
                  <h3 className="font-semibold text-gray-900 mb-2 p-4 pt-1 pl-3 pb-0">Organizer Details</h3>

                  <div className="flex flex-row text-gray-700 gap-6 p-5 pt-1 pb-3">
                    <div className="flex flex-col gap-2 mb-2 pt-2">
                      <p className="text-black text-lg">Email:</p> 
                      <p className="text-black text-lg">Phone Number:</p>    
                    </div>
                    <div className="flex flex-col gap-2 mb-2">
                      <div className="bg-white border rounded-lg border-black p-4 pl-2 pt-1 pb-1">{selectedEvent.org_phone_no}</div>
                      <div className="bg-white border rounded-lg border-black p-4 pl-2 pt-1 pb-1">{selectedEvent.org_email}</div>
                    </div>
                  </div>

                  <div className="text-medium">
                    {selectedEvent.social_media && selectedEvent.social_media.length > 0 && (
                      <div className="flex flex-row gap-4 mb-2 p-4 pt-1 pl-3 pb-0 justify-space-between">
                        {selectedEvent.social_media.map((link, index) => (
                          <div className="flex flex-row gap-1" key={index}>
                            <h4>{link.platform}: </h4>
                            <p>{link.handle}</p>
                          </div>
                        ))}
                      </div>
                    )}                  
                  </div>
                </div>
              </div>

              {selectedEvent.judging_criteria && !selectedEvent.is_audience_only &&
                selectedEvent.judging_criteria.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center">Judging Criteria</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {selectedEvent.judging_criteria.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}              
            </div>

            <div className="rounded-b-2xl bg-black flex justify-end items-center p-4 border-t border-gray-200 space-x-4 flex-shrink-0">
              {!selectedEvent.is_audience_only && (
                <button
                  onClick={() => {exportParticipantList(selectedEvent._id)}}
                  className="px-6 py-3 rounded-full font-semibold text-white bg-blue-500 hover:bg-white hover:text-blue-500 transition-colors"
                  >
                  Export Participant List
                </button>
              )}
              
              {( selectedEvent.status === "PASSED" ?
              <button
                onClick={() => {setStatus(selectedEvent.status)}}
                className="px-6 py-3 rounded-full font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors"
                >
                Mark as ONGOING
              </button>
              :
              <button
                onClick={() => {setStatus(selectedEvent.status)}}
                className="px-6 py-3 rounded-full font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors"
                >
                Mark as PASSED
              </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPanel;
