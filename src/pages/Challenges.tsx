import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { Trophy, Users, Calendar, Gift, ChevronRight, Activity, Filter } from 'lucide-react';

interface Challenge {
  id: string;
  name: string;
  gyms: string;
  category: string;
  type: string;
  reward_type: string;
  status: string;
  start_date: string;
  end_date: string;
  total_participants: number;
}

export default function Challenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'All' | 'Active' | 'Upcoming' | 'Completed'>('All');

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const challengesRef = collection(db, 'challenges');
        // If start_date isn't present, orderBy might fail without an index. Try to fetch all first.
        const snap = await getDocs(challengesRef);
        const fetched: Challenge[] = [];
        
        snap.forEach((doc) => {
          fetched.push({ id: doc.id, ...doc.data() } as Challenge);
        });
        
        // Sort by start date (if exists) or just leave it
        fetched.sort((a, b) => new Date(b.start_date || 0).getTime() - new Date(a.start_date || 0).getTime());
        setChallenges(fetched);
      } catch (error) {
        console.error('Error fetching challenges:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  const filteredChallenges = challenges.filter(c => {
    if (filter === 'All') return true;
    return c.status?.toLowerCase() === filter.toLowerCase();
  });

  const getStatusColor = (status: string) => {
    const s = status?.toLowerCase() || '';
    if (s.includes('active')) return 'bg-green-100 text-green-700 border-green-200';
    if (s.includes('upcoming')) return 'bg-blue-100 text-blue-700 border-blue-200';
    if (s.includes('completed')) return 'bg-gray-100 text-gray-600 border-gray-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-red-100 rounded-xl">
              <Trophy className="w-6 h-6 text-[#DC2626]" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Challenges</h1>
          </div>
          <p className="text-gray-500 max-w-2xl text-sm">
            Push your limits, join community challenges, and win exclusive rewards. 
            Consistency is the only way to the top of the leaderboard.
          </p>
        </div>

        {/* Filters */}
        <div className="flex bg-gray-100 p-1 rounded-xl w-full md:w-auto shadow-inner">
          {['All', 'Active', 'Upcoming', 'Completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                filter === f 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <Activity className="w-10 h-10 animate-pulse mb-4" />
          <p className="font-medium text-sm">Loading challenges...</p>
        </div>
      ) : filteredChallenges.length === 0 ? (
        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center flex flex-col items-center justify-center">
          <Trophy className="w-16 h-16 text-gray-300 mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">No {filter !== 'All' ? filter : ''} Challenges Found</h3>
          <p className="text-gray-500 max-w-sm mx-auto text-sm">
            There are currently no challenges in this category. Check back later for new events!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredChallenges.map((challenge) => (
            <div 
              key={challenge.id} 
              className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer"
            >
              {/* Card Header Pattern/Gradient */}
              <div className="h-24 bg-gradient-to-br from-gray-900 to-gray-800 relative">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`text-[10px] uppercase tracking-wider font-extrabold px-3 py-1.5 rounded-full border ${getStatusColor(challenge.status)}`}>
                    {challenge.status || 'Unknown'}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col relative">
                {/* Floating Icon */}
                <div className="absolute -top-10 left-6 w-16 h-16 bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center p-3">
                  <div className="w-full h-full bg-red-50 rounded-xl flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-[#DC2626]" />
                  </div>
                </div>

                <div className="mt-8 mb-4">
                  <h3 className="text-xl font-extrabold text-gray-900 leading-tight mb-2 group-hover:text-[#DC2626] transition-colors">
                    {challenge.name || 'Unnamed Challenge'}
                  </h3>
                  
                  {challenge.gyms && (
                    <p className="text-sm font-semibold text-gray-500">
                      📍 {challenge.gyms}
                    </p>
                  )}
                </div>

                <div className="space-y-3 mb-6 flex-1">
                  {/* Info Row 1 */}
                  <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-xl">
                    <Calendar className="w-4 h-4 mr-3 text-gray-400" />
                    <span className="font-medium">
                      {challenge.start_date || '?'} — {challenge.end_date || '?'}
                    </span>
                  </div>

                  {/* Info Row 2 */}
                  <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-xl">
                    <Gift className="w-4 h-4 mr-3 text-gray-400" />
                    <span className="font-medium">Reward: </span>
                    <span className="ml-1 font-bold text-gray-900">{challenge.reward_type || 'None'}</span>
                  </div>

                  {/* Info Row 3 */}
                  <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-xl">
                    <Users className="w-4 h-4 mr-3 text-gray-400" />
                    <span className="font-medium">
                      <strong className="text-gray-900">{challenge.total_participants || 0}</strong> participants joined
                    </span>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                    {challenge.category || 'Workout'} • {challenge.type || 'Standard'}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#DC2626] group-hover:text-white transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
