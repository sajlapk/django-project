import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { User, Ticket, Award, X, Calendar, MapPin } from 'lucide-react';

// Define the shape of our data
interface IEventStub {
    _id: string;
    name: string;
    date: string;
    location: string;
    image_url?: string;
}

interface IBooking {
    _id: string;
    eventId: IEventStub;
    createdAt: string;
}

interface ITicketBooking extends IBooking {
    no_of_tickets: number;
    amount: number;
}

interface IParticipantRegistration extends IBooking {
    name: string;
}

const Profile: React.FC = () => {
    const { user, logout } = useAuth();
    const [bookings, setBookings] = useState<{ tickets: ITicketBooking[], registrations: IParticipantRegistration[] }>({ tickets: [], registrations: [] });
    const [loading, setLoading] = useState(true);

    const fetchProfileData = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const response = await axios.get(`https://discipl-server.onrender.com/api/users/profile/${user.id}`); // This is used when running from github repo  
            // const response = await axios.get(`http://localhost:8172/api/users/profile/${user.id}`); // This is used when running on localhost
            // console.log("Profile Data: ", response.data) // DEBUG
            setBookings(response.data);
        } catch (error) {
            console.error("Failed to fetch profile data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, [user]);

    const handleCancelTicket = async (ticketId: string) => {
        if (!window.confirm("Are you sure you want to cancel this ticket? This action cannot be undone.")) return;
        if (!window.confirm("NOTE: YOU WILL NOT BE REFUNDED.")) return;
        await axios.delete(`https://discipl-server.onrender.com/api/tickets/${ticketId}`); // This is used when running from github repo  
        // await axios.delete(`http://localhost:8172/api/tickets/${ticketId}`); // This is used when running on localhost
        await fetchProfileData(); // Refetch data after cancellation
    };

    const handleCancelRegistration = async (registrationId: string) => {
        if (!window.confirm("Are you sure you want to cancel your registration? This action cannot be undone.")) return;
        if (!window.confirm("NOTE: YOU WILL NOT BE REFUNDED.")) return;
        await axios.delete(`https://discipl-server.onrender.com/api/participants/${registrationId}`); // This is used when running from github repo  
        // await axios.delete(`http://localhost:8172/api/participants/${registrationId}`); // This is used when running on localhost
        await fetchProfileData(); // Refetch data after cancellation
    };

    const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString("en-IN", {
        year: "numeric", month: "long", day: "numeric",
    });

    if (loading) {
        return <div className="text-center p-10">Loading profile...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* User Profile Card */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">{user?.name}</h1>
                        <p className="text-gray-500">{user?.email}</p>
                    </div>
                    <button onClick={logout} className="px-4 py-2 rounded-lg font-semibold text-red-600 bg-red-100 hover:bg-red-200 transition-colors">
                        Logout
                    </button>
                </div>

                {/* My Event Tickets Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center"><Ticket className="mr-3 text-red-500"/>My Event Tickets</h2>
                    {bookings.tickets.length > 0 ? (
                        <div className="space-y-4">
                            {bookings.tickets.map(ticket => (
                                <div key={ticket._id} className="bg-white rounded-lg shadow p-4 flex items-start justify-between gap-4">
                                    <img src={ticket.eventId.image_url || "https://placehold.co/150x100"} alt={ticket.eventId.name} className="w-32 h-20 object-cover rounded-md"/>
                                    <div className="flex-grow">
                                        <h3 className="font-bold text-lg text-gray-900">{ticket.eventId.name}</h3>
                                        <p className="text-sm text-gray-500 flex items-center mt-1"><Calendar className="w-4 h-4 mr-2"/>{formatDate(ticket.eventId.date)}</p>
                                        <p className="text-sm text-gray-500 flex items-center"><MapPin className="w-4 h-4 mr-2"/>{ticket.eventId.location}</p>
                                        <p className="text-sm text-gray-700 mt-2">Booked on: {formatDate(ticket.createdAt)} | Quantity: {ticket.no_of_tickets}</p>
                                    </div>
                                    <button onClick={() => handleCancelTicket(ticket._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded-full transition-colors">
                                        <X className="w-5 h-5"/>
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 bg-white p-4 rounded-lg shadow">You have not booked any tickets.</p>
                    )}
                </div>

                {/* My Event Registrations Section */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center"><Award className="mr-3 text-red-500"/>My Event Registrations</h2>
                    {bookings.registrations.length > 0 ? (
                        <div className="space-y-4">
                            {bookings.registrations.map(reg => (
                                <div key={reg._id} className="bg-white rounded-lg shadow p-4 flex items-start justify-between gap-4">
                                    <img src={reg.eventId.image_url || "https://placehold.co/150x100"} alt={reg.eventId.name} className="w-32 h-20 object-cover rounded-md"/>
                                    <div className="flex-grow">
                                        <h3 className="font-bold text-lg text-gray-900">{reg.eventId.name}</h3>
                                        <p className="text-sm text-gray-500 flex items-center mt-1"><Calendar className="w-4 h-4 mr-2"/>{formatDate(reg.eventId.date)}</p>
                                        <p className="text-sm text-gray-500 flex items-center"><MapPin className="w-4 h-4 mr-2"/>{reg.eventId.location}</p>
                                        <p className="text-sm text-gray-700 mt-2">Registered on: {formatDate(reg.createdAt)}</p>
                                    </div>
                                    <button onClick={() => handleCancelRegistration(reg._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded-full transition-colors">
                                        <X className="w-5 h-5"/>
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 bg-white p-4 rounded-lg shadow">You have not registered for any events.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;