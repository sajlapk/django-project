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
  image: File | null;
  category: string;
  status: 'ONGOING' | 'PASSED';
  max_participants: number;
  judging_criteria: string[];
  prize_sponsorship: string;
  org_phone_no: string;
  org_email: string;
  social_media: SocialMediaLink[];
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
  image_url?: string;
  prize_sponsorship: string;
  issued_tickets_count: number;
}

const AdminPanel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Popup that is used to add event
  const [isUploading, setIsUploading] = useState(false);
  const [successModal, setSuccessModal] = useState(false); // Popup that triggers on adding event
  const [successMessage, setSuccessMessage] = useState('') // This will contain the message that wil show up in the success modal
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false); // Popup that is used to edit status of event
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);

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
      // const response = await axios.get('https://discipl-server.onrender.com/api/events'); // This is used when running from github repo
      const response = await axios.get('http://localhost:8172/api/events'); // This is used when running on localhost
      console.log("Events Fetched: ", response.data); // DEBUG

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
    _id: '', name: '', date: '', time: '', location: '', description: '', registration_fee: 0, ticket_fee: 0, total_tickets: 0, image: null,
    category: '', status: 'ONGOING', max_participants: 0, judging_criteria: [''], prize_sponsorship: '',
    org_phone_no: '', org_email: '', social_media: [{ platform: 'Instagram', handle: '' }],
  });

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setEventDetails(prev => ({ ...prev, [name]: type === "number" ? Number(value) : value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setEventDetails(prev => ({ ...prev, image: e.target.files[0] }));
    }
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
      let imageUrl = '';
      if (eventDetails.image) {
        const formData = new FormData();
        formData.append('file', eventDetails.image);
        formData.append('upload_preset', uploadPreset);
        const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
        imageUrl = cloudinaryResponse.data.secure_url;
      }

      const finalCriteria = eventDetails.judging_criteria.filter(c => c.trim() !== '');
      const finalSocials = eventDetails.social_media.filter(s => s.handle.trim() !== '');

      const { image, ...dataWithoutImage } = eventDetails;

      const eventData = { ...dataWithoutImage, image_url: imageUrl, judging_criteria: finalCriteria, social_media: finalSocials };
      // console.log("Posting event data:", eventData); // DEBUG

      // const response = await axios.post('https://discipl-server.onrender.com/api/events', eventData); // This is used when running from github repo
      const response = await axios.post('http://localhost:8172/api/events', eventData); // This is used when running on localhost
      // console.log(response.data); // DEBUG
      // alert("Event created successfully!"); // DEBUG

      determineSuccessModal(response);

      setIsModalOpen(false);
      setEventDetails({
        _id: '', name: '', date: '', time: '', location: '', description: '', registration_fee: 0, ticket_fee: 0, total_tickets: 0,image: null,
        category: 'General', status: 'ONGOING', max_participants: 50, judging_criteria: [''], prize_sponsorship: '',
        org_phone_no: '', org_email: '', social_media: [{ platform: 'Instagram', handle: '' }],
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

  // Helper function to check if all important fields in event form are filled
  const formIncompleteCheck = (eventDetails: any) => {
    if(
      eventDetails.name === '' || 
      eventDetails.date  === '' || 
      eventDetails.time === '' || 
      eventDetails.location === '' ||
      eventDetails.registration_fee  === 0 ||
      eventDetails.category === '' ||
      eventDetails.max_participants === 0 ||
      eventDetails.ticket_fee === 0 ||
      eventDetails.total_tickets === 0 ||
      eventDetails.description === '' ||
      eventDetails.judging_criteria.length === 0 ||
      eventDetails.prize_sponsorship === '' ||
      eventDetails.org_phone_no === '' || 
      eventDetails.org_email === '' 
    )
      return true
    else 
      return false
  };

  // Function to set the status of the event in AdminPanel
  const setStatus = async (status: String) => {
    try{
      if(status == "PASSED"){
        // const response = await axios.patch(`https://discipl-server.onrender.com/api/events/${selectedEvent?._id}`); // This is used when running from github repo    
        const response = await axios.patch(`http://localhost:8172/api/events/${selectedEvent?._id}`, { status: "ONGOING" });
        console.log("Changed status to passed: ", response);
      }else if(status == "ONGOING"){
        // const response = await axios.patch(`https://discipl-server.onrender.com/api/events/${selectedEvent?._id}`); // This is used when running from github repo    
        const response = await axios.patch(`http://localhost:8172/api/events/${selectedEvent?._id}`, { status: "PASSED" });
        console.log("Changed status to ongoing: ", response);
      }else{
        console.log("Some error occurred while changing status.");
      }

      // Refetch the events so the issued_tickets_count and registered_participants_count can refresh 
      // const post_payment_response = await axios.get('https://discipl-server.onrender.com/api/events'); // This is used when running from github repo      
      const post_payment_response = await axios.get('http://localhost:8172/api/events'); // This is used when running on localhost
      console.log("Fetched events after payment", post_payment_response) // DEBUG

      setEvents(post_payment_response.data);
      setIsStatusModalOpen(false);
    }catch(error){
      console.log("Some error occurred while changing status."); // DEBUG
    }
  }

  // Function to delete an event
  const deleteEvent = async (event: IEvent | null) => {
    try{
      if (!window.confirm("Are you sure you want to delete this event? This action cannot be undone.")) return;
      if (!window.confirm("NOTE: YOU ARE ABOUT TO DELETE AN EVENT.")) return;
      if (!window.confirm("NOTE: THIS WILL CANCEL ALL ASSOCIATED TICKETS AND REGISTERED PARTICIPANTS(NO REFUND WILL BE DONE).")) return;
      // const response = await axios.delete(`https://discipl-server.onrender.com/api/events/${selectedEvent?._id}`); // This is used when running from github repo
      const response = await axios.delete(`http://localhost:8172/api/events/${event?._id}`); // This is used when running on localhost
      console.log("Deleted event: ", response); // DEBUG

      // Refetch the events so the issued_tickets_count and registered_participants_count can refresh 
      // const post_payment_response = await axios.get('https://discipl-server.onrender.com/api/events'); // This is used when running from github repo      
      const post_payment_response = await axios.get('http://localhost:8172/api/events'); // This is used when running on localhost
      console.log("Fetched events after payment", post_payment_response) // DEBUG

      setSelectedEvent(null);
      setEvents(post_payment_response.data);
      setIsStatusModalOpen(false);
    }catch(error){
      console.log("Some error occurred while deleting event."); // DEBUG
    }
  }

  // Function to export participant list
  const exportParticipantList = async (eventId: string | undefined) => {
    if (!eventId) {
      alert("Cannot export: Event ID is missing.");
      return;
    }

    try {
      const exportUrl = `http://localhost:8172/api/participants/export/${eventId}`;

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
                              src={event.image_url}
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
                            src={event.image_url}
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

      {/* Popup model that pops up when creating an event */}
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
                <div className="relative"><label htmlFor="date">Date of Event</label><input type="date" name="date" required onChange={handleInputChange} value={eventDetails.date} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" /><Calendar className="absolute left-4 top-12 -translate-y-1/2 h-5 w-5 text-gray-400" /></div>
                <div className="relative"><label htmlFor="time">Time of Event</label><input type="time" name="time" required onChange={handleInputChange} value={eventDetails.time} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" /><Clock className="absolute left-4 top-12 -translate-y-1/2 h-5 w-5 text-gray-400" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative"><input type="text" name="location" placeholder="Location or Venue" required onChange={handleInputChange} value={eventDetails.location} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" /><MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /></div>
                <div className="relative"><input type="number" name="registration_fee" placeholder="Registration Fee" required onChange={handleInputChange} value={eventDetails.registration_fee === 0 ? '' : eventDetails.registration_fee} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" /><IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative"><input type="text" name="category" placeholder="Category" required onChange={handleInputChange} value={eventDetails.category} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" /><FileText className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /></div>
                <div className="relative"><input type="number" name="max_participants" placeholder="Max Participants" required onChange={handleInputChange} value={eventDetails.max_participants === 0 ?  '' : eventDetails.max_participants} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" /><Users className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative"><input type="number" name="ticket_fee" placeholder="Ticket Fee" required onChange={handleInputChange} value={eventDetails.ticket_fee === 0 ? '' : eventDetails.ticket_fee} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" /><IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /></div>
                <div className="relative"><input type="number" name="total_tickets" placeholder="Total Tickets" required onChange={handleInputChange} value={eventDetails.total_tickets === 0 ? '' : eventDetails.total_tickets} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" /><TicketCheck className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /></div>
              </div>
              <div className="relative"><textarea name="description" placeholder="Event Description" required rows={4} onChange={handleInputChange} value={eventDetails.description} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors resize-none" /><FileText className="absolute left-4 top-4 h-5 w-5 text-gray-400" /></div>
              
              {/* Judging Criteria */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Judging Criteria</label>
                {eventDetails.judging_criteria.map((criterion, index) => (<div key={index} className="flex items-center gap-2 mb-2"><input type="text" placeholder={`Criterion #${index + 1}`} value={criterion} onChange={(e) => handleCriteriaChange(index, e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" />{eventDetails.judging_criteria.length > 1 && (<button type="button" onClick={() => removeCriteriaField(index)} className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"><Trash2 className="w-5 h-5" /></button>)}</div>))}
                <button type="button" onClick={addCriteriaField} className="mt-2 flex items-center text-sm font-medium text-red-600 hover:text-red-800"><Plus className="w-4 h-4 mr-1" />Add Criterion</button>
              </div>

              {/* Prize & Sponsorship */}
              <div className="relative"><textarea name="prize_sponsorship" placeholder="Prize & Sponsorship Details" required rows={3} onChange={handleInputChange} value={eventDetails.prize_sponsorship} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors resize-none" /><Award className="absolute left-4 top-4 h-5 w-5 text-gray-400" /></div>

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
              
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Banner</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"><div className="space-y-1 text-center"><ImageIcon className="mx-auto h-12 w-12 text-gray-400" /><div className="flex text-sm text-gray-600"><label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500"><span>Upload a file</span><input id="file-upload" name="image" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" /></label><p className="pl-1">or drag and drop</p></div><p className="text-xs text-gray-500">PNG, JPG up to 10MB (768px x 512px)</p>{eventDetails.image && <p className="text-sm text-green-600 mt-2">Selected: {eventDetails.image.name}</p>}</div></div>
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
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Set Status</h2>
              <button onClick={() => setIsStatusModalOpen(false)} className="p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4 sm:p-8 overflow-y-auto space-y-6">
              <img
                src={
                  selectedEvent.image_url ||
                  "https://placehold.co/600x400/f87171/white?text=Event"
                }
                alt={selectedEvent.name}
                className="w-full h-56 object-cover rounded-lg"
              />
              
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
                <div className="flex items-center text-gray-700">
                  <p className="text-medium"><span className="text-black">Participation Fee:</span> {selectedEvent.registration_fee}</p>
                </div>
                <div className="flex items-center text-gray-700">
                  <p className="text-medium"><span className="text-black">Ticket Fee:</span> {selectedEvent.ticket_fee}</p>
                </div>
                <div className="flex items-center text-gray-700">
                  <p className="text-medium"><span className="text-black">Participants:</span> {selectedEvent.registered_participants_count}/{selectedEvent.max_participants}</p>
                </div>
                <div className="flex items-center text-gray-700">
                  <p className="text-medium"><span className="text-black">Total Tickets Available:</span>{selectedEvent.total_tickets}</p>
                </div>
                <div className="flex items-center text-gray-700 pb-5">
                  <p className="text-medium"><span className="text-black">Prize:</span> {selectedEvent.prize_sponsorship}</p>
                </div>

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

              {selectedEvent.judging_criteria &&
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
              <button
                onClick={() => {exportParticipantList(selectedEvent._id)}}
                className="px-6 py-3 rounded-full font-semibold text-white bg-blue-500 hover:bg-white hover:text-blue-500 transition-colors"
                >
                Export Participant List
              </button>
              
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
