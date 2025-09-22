import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, MapPin, Users, Clock, IndianRupee, FileText, User, Cake } from "lucide-react";

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
  registration_fee: number;
  ticket_fee: number;
  participants: number;
  max_participants: number;
  image_url?: string;
  prize_sponsorship: string;
}

const Events: React.FC = () => {
  const [noOfTickets, setNoOfTickets] = useState(1)

  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isParticipantModalOpen, setIsParticipantModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);

  const openModal = (event: IEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://discipl-server.onrender.com/api/events'); // This is used when running from github repo
        // const response = await axios.get('http://localhost:8172/api/events'); // This is used when running on localhost
        // console.log(response.data); // DEBUG

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

    fetchEvents();
  }, []);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Challenge': 'bg-red-100 text-red-800', 'Workshop': 'bg-blue-100 text-blue-800',
      'Competition': 'bg-purple-100 text-purple-800', 'Seminar': 'bg-green-100 text-green-800',
      'Training': 'bg-orange-100 text-orange-800', 'Dance': 'bg-pink-100 text-pink-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading events...</p>;
  }

  // To calculate total price of tickets
  const calculateTotal = (ticket_fee: number, no_of_tickets: number) => {
    return ticket_fee * no_of_tickets;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">
        Upcoming Events
      </h1>
      {events.length === 0 ? (
        <p className="text-center text-gray-600">No events available</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event._id}
              onClick={() => openModal(event)}
              className="cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden flex flex-col"
            >
              <img
                src={
                  event.image_url ||
                  "https://placehold.co/600x400/f87171/white?text=Event"
                }
                alt={event.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex-1 flex flex-col">
                <h2 className="text-2xl font-bold mb-2 text-gray-900">
                  {event.name}
                </h2>

                {/* Judging Criteria on card
                {event.judgingCriteria && event.judgingCriteria.length > 0 && (
                  // </div>
                  <div className="mb-4">
                    <div className="flex items-center text-sm font-bold text-gray-800 mb-2">
                        <Award className="w-4 h-4 mr-2 text-red-500" />
                        <span>Judging Criteria</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {event.judgingCriteria.map((criterion, index) => (
                        <span key={index} className="bg-red-100 text-red-800 text-xs font-medium px-3 py-1 rounded-full">
                          {criterion}
                        </span>
                      ))}
                    </div>
                  </div>
                )} */}

                <span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(event.category)}`}>
                    {event.category}
                  </span>
                </span>

                <div className="mt-4 space-y-1 text-gray-500 text-sm">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-red-500" />{formatDate(event.date)}
                  </span>
                  
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-red-500" />{event.time}
                  </span>
                  
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-red-500" />{event.location}
                  </span>
                  
                  <div className="mt-5 space-y-2 pb-4 pt-5">
                    <div className="flex items-center text-gray-700">
                      <Users className="w-4 h-4 mr-2 text-red-500" />
                      <span className="text-sm">{event.participants}/{event.max_participants} participants</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-4">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{ width: `${(event.participants / event.max_participants) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="mt-6 w-full bg-red-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-red-600 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Popup for view event details */}
      {isModalOpen && selectedEvent && (
        <div className="rounded-3xl fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="rounded-t-3xl bg-red-500 flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                {selectedEvent.name}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 rounded-full text-white hover:bg-gray-100 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-8 overflow-y-auto space-y-6">
              <img
                src={
                  selectedEvent.image_url ||
                  "https://placehold.co/600x400/f87171/white?text=Event"
                }
                alt={selectedEvent.name}
                className="w-full h-56 object-cover rounded-lg"
              />

              <div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedEvent.category)}`}>
                  {selectedEvent.category}
                </span>
              </div>
              
              <div className="space-y-1">
                <p className="text-medium text-black mb-0">Description:</p>
                <div className="border p-4 pt-1 pl-3 rounded-lg bg-gray-50">
                  <p className="text-gray-700">{selectedEvent.description}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-700">
                  <p className="text-medium"><span className="text-black">Date:</span> {formatDate(selectedEvent.date)}</p>
                </div>
                <div className="flex items-center text-gray-700">
                  <p className="text-medium"><span className="text-black">Time:</span> {selectedEvent.time }</p>
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
                  <p className="text-medium"><span className="text-black">Participants:</span> {selectedEvent.participants}/{selectedEvent.max_participants}</p>
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

            <div className="rounded-b-3xl bg-black flex justify-end items-center p-4 border-t border-gray-200 space-x-4 flex-shrink-0">
              {/* <button
                onClick={closeModal}
                className="px-6 py-3 rounded-full font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Close
              </button> */}
              <button 
                onClick={()=>{setIsTicketModalOpen(true); setIsModalOpen(false);}}
                className=" px-6 py-3 rounded-full font-semibold text-black bg-white border-2 border-black hover:bg-black hover:text-white transition-colors">
                Buy Ticket
              </button>
              <button
                onClick={()=>{setIsParticipantModalOpen(true); setIsModalOpen(false);}}
                className="px-6 py-3 rounded-full font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors">
                Register for Event
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup for Ticket Payment */}
      {isTicketModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="bg-red-500 rounded-t-3xl flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Purchase Ticket for {selectedEvent.name}?
              </h2>
            </div>

            {/* Content */}
            <div className="space-y-2 p-8 overflow-y-auto flex-1">
              <div className="flex flex-row items-center text-gray-700 justify-evenly gap-2">
                <p className="text-small text-black">How many tickets?</p>
                <div className="w-1/4">
                  <input className="border-2 border-black rounded-xl w-full pl-3" type="number"  min={1} max={selectedEvent.max_participants} value={noOfTickets} onChange={(event)=>setNoOfTickets(Number(event.target.value))}/>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="p-4 sm:p-8 border border-gray-200 flex-shrink-0">
              <p className="text-gray-500">₹{selectedEvent.ticket_fee} x {noOfTickets} {noOfTickets>1 ? "Tickets" : "Ticket"} = ₹{calculateTotal(selectedEvent.ticket_fee, noOfTickets)}</p>
            </div>

            <div className="bg-white rounded-b-3xl flex justify-end items-center p-4 border-t border-gray-200 space-x-4 flex-shrink-0">
              <button
                onClick={()=>{setIsTicketModalOpen(false); setIsModalOpen(true);}}
                className="px-6 py-3 rounded-full font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
              <button 
                // onClick={{/*Logic for payment gateway */}}
                className="px-6 py-3 rounded-full font-semibold text-white border-2 border-green-500 bg-green-500 hover:bg-white hover:text-green-500 hover:border-2 border-green-500 transition-colors">
                Proceed to pay ₹{calculateTotal(selectedEvent.ticket_fee, noOfTickets)}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup for Participant Payment */}
      {isParticipantModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="bg-red-500 rounded-t-3xl flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Register for {selectedEvent.name}?
              </h2>
            </div>

            {/* Participant Details */}
            <div className="space-y-2 p-8 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative"><input type="text" placeholder="Name" name="name" required className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" /><User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /></div>
                <div className="relative"><input type="number" min={0} placeholder="Age" name="age" required className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" /><Cake className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative"><input type="number" min={0} placeholder="Height(cm)" name="height" required className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" /><MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /></div>
                <div className="relative"><input type="number" min={0} placeholder="Weight(kg)" name="weight" required className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" /><IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /></div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="p-4 sm:p-8 border border-gray-200 flex-shrink-0">
              <p className="text-gray-500">₹{selectedEvent.registration_fee} x {noOfTickets} {noOfTickets>1 ? "Tickets" : "Ticket"} = ₹{calculateTotal(selectedEvent.registration_fee, noOfTickets)}</p>
            </div>

            <div className="bg-white rounded-b-3xl flex justify-end items-center p-4 border-t border-gray-200 space-x-4 flex-shrink-0">
              <button
                onClick={()=>{setIsParticipantModalOpen(false); setIsModalOpen(true);}}
                className="px-6 py-3 rounded-full font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
              <button 
                // onClick={{/*Logic for payment gateway */}}
                className="px-6 py-3 rounded-full font-semibold text-white border-2 border-green-500 bg-green-500 hover:bg-white hover:text-green-500 hover:border-2 border-green-500 transition-colors">
                Proceed to pay ₹{calculateTotal(selectedEvent.registration_fee, noOfTickets)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
