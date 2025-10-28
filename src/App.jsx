import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginScreen from './components/LoginScreen';
import BottomTabBar from './components/BottomTabBar';
import PrimaryButton from './components/PrimaryButton';
import SkeletonCard from './components/SkeletonCard';

// Mock Data
const EVENTS = [
  {
    id: 'ev1',
    title: 'Hack the Future 2025',
    date: 'Dec 12, 2025',
    location: 'Online',
    description: '48-hour hackathon focused on AI + Sustainability.',
  },
  {
    id: 'ev2',
    title: 'Campus DevFest',
    date: 'Nov 20, 2025',
    location: 'Austin, TX',
    description: 'Talks, workshops, and networking for student devs.',
  },
  {
    id: 'ev3',
    title: 'Open Source Sprint',
    date: 'Jan 10, 2026',
    location: 'Seattle, WA',
    description: 'Contribute to OSS with mentors guiding every step.',
  },
  {
    id: 'ev4',
    title: 'Cloud Builders Day',
    date: 'Dec 3, 2025',
    location: 'Online',
    description: 'Learn serverless, containers, and DevOps best practices.',
  },
];

const NEWS = [
  { id: 'n1', headline: 'TechCrunch: Uni startup raises $10M for AI note-taker', source: 'TechCrunch', time: '2h ago' },
  { id: 'n2', headline: 'The Verge: New VR headset hits campus labs', source: 'The Verge', time: '4h ago' },
  { id: 'n3', headline: 'Hacker News: Student project tops the charts', source: 'Hacker News', time: '6h ago' },
  { id: 'n4', headline: 'Ars Technica: Rust adoption soars in systems courses', source: 'Ars Technica', time: '1d ago' },
];

const VOLUNTEER = [
  { id: 'v1', event: 'Hack the Future 2025', role: 'Mentor', date: 'Dec 12, 2025' },
  { id: 'v2', event: 'Campus DevFest', role: 'Logistics Support', date: 'Nov 20, 2025' },
  { id: 'v3', event: 'Open Source Sprint', role: 'Workshop TA', date: 'Jan 10, 2026' },
];

// Reusable Card
const Card = ({ children }) => (
  <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-2xl p-4">{children}</div>
);

// SearchBar
const SearchBar = ({ value, onChange }) => (
  <div className="flex items-center gap-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-3">
    <span className="text-[#A0A0A0]">🔎</span>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search events..."
      className="flex-1 bg-transparent text-[#F5F5F5] placeholder-[#6B6B6B] focus:outline-none"
    />
  </div>
);

// Screen Wrapper with fade-in
const Screen = ({ children, activeKey }) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={activeKey}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-4"
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

// Pressable wrapper for subtle scale
const Pressable = ({ children, className = '', onClick }) => (
  <motion.div whileTap={{ scale: 0.98 }} className={className} onClick={onClick}>
    {children}
  </motion.div>
);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [active, setActive] = useState('Home');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [applied, setApplied] = useState([]); // array of volunteer ids
  const user = { name: 'Student Name', email: 'student@university.edu' };

  // Simulate data loading with skeletons
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, [active]);

  const filteredEvents = useMemo(() => {
    if (!search.trim()) return EVENTS;
    return EVENTS.filter((e) => e.title.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  // Screens
  const EventsScreen = () => (
    <Screen activeKey="Home">
      <h1 className="text-[30px] font-bold text-[#F5F5F5]">Upcoming Events</h1>
      <SearchBar value={search} onChange={setSearch} />

      <div className="space-y-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : filteredEvents.map((ev) => (
              <Pressable key={ev.id}>
                <Card>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-[18px] font-semibold text-[#F5F5F5]">{ev.title}</h2>
                      <div className="text-xs text-[#A0A0A0] mt-1">{ev.date} • {ev.location}</div>
                    </div>
                    <span className="text-[#A0A0A0] text-sm">⏱️</span>
                  </div>
                  <p className="text-sm text-[#D0D0D0] mt-3">{ev.description}</p>
                  <div className="mt-4">
                    <PrimaryButton title="Details" onPress={() => {}} className="w-auto px-5" />
                  </div>
                </Card>
              </Pressable>
            ))}
      </div>
    </Screen>
  );

  const NewsScreen = () => (
    <Screen activeKey="News">
      <h1 className="text-[30px] font-bold text-[#F5F5F5]">Latest Tech News</h1>
      <div className="space-y-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : NEWS.map((n) => (
              <Pressable key={n.id}>
                <Card>
                  <h2 className="text-[18px] font-semibold text-[#F5F5F5]">{n.headline}</h2>
                  <div className="text-xs text-[#A0A0A0] mt-2">{n.source} • {n.time}</div>
                </Card>
              </Pressable>
            ))}
      </div>
    </Screen>
  );

  const VolunteerScreen = () => (
    <Screen activeKey="Volunteer">
      <h1 className="text-[30px] font-bold text-[#F5F5F5]">Volunteer Opportunities</h1>
      <div className="space-y-4">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          : VOLUNTEER.map((v) => {
              const isApplied = applied.includes(v.id);
              return (
                <Card key={v.id}>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h2 className="text-[18px] font-semibold text-[#F5F5F5]">{v.event}</h2>
                      <div className="text-xs text-[#A0A0A0] mt-1">{v.role} • {v.date}</div>
                    </div>
                    <div className="w-32">
                      <PrimaryButton
                        title={isApplied ? 'Applied!' : 'Apply to Volunteer'}
                        disabled={isApplied}
                        onPress={() => setApplied((prev) => [...prev, v.id])}
                      />
                    </div>
                  </div>
                </Card>
              );
            })}
      </div>
    </Screen>
  );

  const ProfileScreen = () => (
    <Screen activeKey="Profile">
      <h1 className="text-[30px] font-bold text-[#F5F5F5]">My Profile</h1>
      <Card>
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-[#2A2A2A] flex items-center justify-center text-[#A0A0A0]">🙂</div>
          <div>
            <div className="text-[#F5F5F5] font-semibold">{user.name}</div>
            <div className="text-[#A0A0A0] text-sm">{user.email}</div>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        <h2 className="text-[18px] font-semibold text-[#F5F5F5]">My Volunteer Applications</h2>
        {applied.length === 0 ? (
          <div className="text-sm text-[#A0A0A0]">No applications yet.</div>
        ) : (
          applied.map((id) => {
            const v = VOLUNTEER.find((x) => x.id === id);
            if (!v) return null;
            return (
              <Card key={id}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[#F5F5F5] font-medium">{v.event}</div>
                    <div className="text-[#A0A0A0] text-xs">{v.role} • {v.date}</div>
                  </div>
                  <span className="text-[#3A86FF] text-sm">Applied</span>
                </div>
              </Card>
            );
          })
        )}
      </div>

      <div className="pt-2">
        <button
          onClick={() => {
            setIsLoggedIn(false);
            setActive('Home');
            setApplied([]);
          }}
          className="w-full rounded-xl py-3 px-4 text-sm font-semibold transition-colors border border-[#2A2A2A] text-[#F5F5F5] hover:bg-[#1E1E1E]"
        >
          Logout
        </button>
      </div>
    </Screen>
  );

  if (!isLoggedIn) return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;

  return (
    <div className="min-h-screen bg-[#121212] text-[#F5F5F5]">
      <div className="max-w-md mx-auto px-4 pb-24 pt-6">
        {active === 'Home' && <EventsScreen />}
        {active === 'News' && <NewsScreen />}
        {active === 'Volunteer' && <VolunteerScreen />}
        {active === 'Profile' && <ProfileScreen />}
      </div>

      <BottomTabBar active={active} onChange={(k) => setActive(k)} />
    </div>
  );
}

export default App;
