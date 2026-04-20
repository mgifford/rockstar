/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Shield, 
  Flame, 
  Leaf, 
  Star, 
  Search, 
  ArrowRight, 
  X,
  Volume2,
  Ticket,
  ChevronRight,
  Info
} from 'lucide-react';

interface Character {
  id: string;
  name: string;
  title: string;
  description: string;
  powerMove: string;
  color: string;
  accent: string;
  icon: any;
  quote: string;
  tags: string[];
}

const CHARACTERS: Character[] = [
  {
    id: 'emmet',
    name: 'Emmet Brickowski',
    title: 'The Master Builder',
    description: 'The every-builder hero who proved imagination can turn ordinary into extraordinary. A testament to how teamwork and creativity win the day.',
    powerMove: 'Master Builder Momentum',
    color: 'bg-orange-500',
    accent: 'text-orange-950',
    icon: Zap,
    quote: "Everything is awesome when you're part of a team!",
    tags: ['Hero', 'Team Player', 'Imaginative']
  },
  {
    id: 'wyldstyle',
    name: 'Wyldstyle (Lucy)',
    title: 'The Strategist',
    description: 'Fearless, fast, and fiercely creative. She balances meticulous strategy with rebellious style to overcome any obstacle.',
    powerMove: 'Neon Parkour Precision',
    color: 'bg-pink-600',
    accent: 'text-pink-950',
    icon: Shield,
    quote: "I'm the one who does the work.",
    tags: ['Leader', 'Fearless', 'Creative']
  },
  {
    id: 'batman',
    name: 'LEGO Batman',
    title: 'The Dark Knight',
    description: 'Dramatic entrances, one-liners, and gadgets for days. The dark knight of plastic bricks who definitely works alone (sometimes).',
    powerMove: 'Bat-Solo Spotlight',
    color: 'bg-zinc-900',
    accent: 'text-yellow-400',
    icon: Volume2,
    quote: "I'm Batman.",
    tags: ['Legend', 'Dark', 'Gadgets']
  },
  {
    id: 'kai',
    name: 'Kai',
    title: 'The Fire Elemental',
    description: 'The fiery ninja who leads with heart, bold decisions, and blazing confidence. Never retreats, always charges forward.',
    powerMove: 'Elemental Flame Spin',
    color: 'bg-red-600',
    accent: 'text-red-950',
    icon: Flame,
    quote: "Fire is internal!",
    tags: ['Ninja', 'Brave', 'Confident']
  },
  {
    id: 'lloyd',
    name: 'Lloyd Garmadon',
    title: 'The Green Ninja',
    description: 'Calm under pressure, powerful in battle, and always ready to rally the team. The ultimate balance of power and restraint.',
    powerMove: 'Green Energy Surge',
    color: 'bg-green-500',
    accent: 'text-green-950',
    icon: Leaf,
    quote: "Together we can do anything.",
    tags: ['Ninja', 'Powerful', 'Balanced']
  },
  {
    id: 'unikitty',
    name: 'Princess Unikitty',
    title: 'The Sparkle Master',
    description: 'A burst of color and unstoppable optimism, with a surprising edge when the stakes rise. Happiness is her greatest weapon.',
    powerMove: 'Glitter Rage Mode',
    color: 'bg-sky-400',
    accent: 'text-sky-950',
    icon: Star,
    quote: "Stay positive!",
    tags: ['Optimistic', 'Vibrant', 'Surprising']
  }
];

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [showA11yInfo, setShowA11yInfo] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  const filteredCharacters = useMemo(() => {
    return CHARACTERS.filter(c => 
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search]);

  const activeCharacter = useMemo(() => 
    CHARACTERS.find(c => c.id === selectedId),
  [selectedId]);

  // Handle ESC to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedId(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="min-h-screen bg-editorial-bg font-sans text-editorial-ink selection:bg-editorial-accent selection:text-white">
      {/* Skip Link for A11y */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-editorial-accent focus:text-white focus:font-bold focus:underline"
      >
        Skip to content
      </a>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Poster Sidebar */}
        <aside className="hidden lg:flex w-20 border-r border-editorial-ink flex-col items-center py-12 bg-black text-white shrink-0">
          <div className="vertical-text font-black text-3xl tracking-tighter uppercase italic">
            Brickstar Legends
          </div>
          <div className="mt-auto mb-8 vertical-text font-mono text-[10px] tracking-widest opacity-60 uppercase font-bold">
            PRO TOUR • 2026
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="sticky top-0 z-40 bg-editorial-bg/80 backdrop-blur-md border-b border-editorial-ink px-10 py-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-editorial-accent flex items-center justify-center">
                  <Ticket className="text-white w-7 h-7" />
                </div>
                <h1 className="font-serif text-6xl font-black italic uppercase leading-none">
                  The Lineup
                </h1>
              </div>

              <div className="flex flex-col md:items-end gap-4">
                <div className="text-right hidden md:block">
                  <p className="font-mono text-xs uppercase font-bold opacity-50 mb-1 tracking-widest">Global Headquarters</p>
                  <p className="text-xl font-bold italic font-serif">Billund, Denmark</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-editorial-ink/40 group-focus-within:text-editorial-accent transition-colors" />
                    <input 
                      type="text" 
                      placeholder="Search Legends..."
                      className="pl-10 pr-4 py-2 bg-transparent border-b border-editorial-ink/20 focus:border-editorial-accent rounded-none w-full md:w-48 outline-none transition-all font-mono text-xs uppercase font-bold"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      aria-label="Search legends"
                    />
                  </div>
                  <button 
                    onClick={() => setShowA11yInfo(!showA11yInfo)}
                    className="p-2 hover:bg-black/5 transition-colors"
                    aria-label="Accessibility Info"
                  >
                    <Info className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </header>

          <main id="main-content" ref={mainRef} className="px-10 py-16 focus:outline-none flex-1">
            
            {/* A11y Callout */}
            <AnimatePresence>
              {showA11yInfo && (
                <motion.section 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mb-16 overflow-hidden bg-white border border-editorial-ink p-8"
                  aria-label="Accessibility information"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="font-serif text-2xl font-bold italic mb-4 uppercase">Accessibility Standards</h2>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 font-mono text-[10px] uppercase font-bold tracking-wider">
                        <li className="flex items-center gap-2 underline decoration-editorial-accent">Skip Navigation</li>
                        <li className="flex items-center gap-2 underline decoration-editorial-accent">Focus Trapping</li>
                        <li className="flex items-center gap-2 underline decoration-editorial-accent">ARIA Landmarks</li>
                        <li className="flex items-center gap-2 underline decoration-editorial-accent">Keyboard Shortcuts</li>
                        <li className="flex items-center gap-2 underline decoration-editorial-accent">Contrast Checks</li>
                        <li className="flex items-center gap-2 underline decoration-editorial-accent">Motion Control</li>
                      </ul>
                    </div>
                    <button onClick={() => setShowA11yInfo(false)} aria-label="Dismiss">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>

            {/* Hero Section */}
            <section className="mb-24">
              <div className="max-w-4xl">
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.5 }}
                  className="font-mono text-xs uppercase font-bold tracking-[0.3em] mb-8"
                >
                  Main Stage / 2026 World Tour
                </motion.p>
                <div className="mb-8 overflow-hidden">
                  <motion.h2 
                    initial={{ y: 100 }}
                    whileInView={{ y: 0 }}
                    transition={{ type: "spring", damping: 20 }}
                    className="headliner-text"
                  >
                    Famous <br /> Legends
                  </motion.h2>
                  <motion.h2 
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 0.2 }}
                    transition={{ type: "spring", damping: 20, delay: 0.1 }}
                    className="headliner-text italic -mt-4"
                  >
                    Brickstar
                  </motion.h2>
                </div>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl font-bold italic font-serif leading-relaxed text-black/70 border-l-2 border-editorial-accent pl-8"
                >
                  Explore the icons of the brick universe. Their signature styles, legendary power moves, and why each one commands the spotlight.
                </motion.p>
              </div>
            </section>

            {/* Grid Section */}
            <section aria-labelledby="lineup-title">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                {filteredCharacters.map((char) => (
                  <motion.article 
                    key={char.name}
                    layoutId={`card-${char.id}`}
                    onClick={() => setSelectedId(char.id)}
                    className="band-row pt-8 group cursor-pointer"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setSelectedId(char.id)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <p className="font-mono text-[10px] uppercase font-bold opacity-40 tracking-wider group-hover:text-editorial-accent group-hover:opacity-100 transition-all">
                        {char.tags[0]} / ID-{char.id.toUpperCase()}
                      </p>
                      <char.icon size={16} className="opacity-20 group-hover:opacity-100 transition-opacity" />
                    </div>
                    
                    <div className="flex justify-between items-end">
                      <div>
                        <h3 className="font-serif text-5xl font-black italic uppercase leading-none group-hover:translate-x-2 transition-transform duration-500">
                          {char.name}
                        </h3>
                        <p className="font-mono text-xs uppercase font-bold mt-2 opacity-60">
                          {char.title}
                        </p>
                      </div>
                      <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                    </div>
                  </motion.article>
                ))}
              </div>

              {filteredCharacters.length === 0 && (
                <div className="py-24 text-center border-y border-editorial-ink/10">
                  <p className="font-serif text-3xl font-bold italic opacity-30 italic">No legends found matching "{search}"</p>
                </div>
              )}
            </section>
          </main>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedId && activeCharacter && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
            />

            <motion.div 
              layoutId={`card-${selectedId}`}
              className={`relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-none bg-editorial-bg border-4 border-editorial-ink shadow-[12px_12px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row`}
              role="document"
            >
              {/* Character Visual Side */}
              <div className={`md:w-2/5 p-10 flex flex-col justify-between relative border-b md:border-b-0 md:border-r border-editorial-ink`}>
                <button 
                  onClick={() => setSelectedId(null)}
                  className={`absolute top-6 left-6 p-2 hover:bg-black/5 transition-all focus:outline-none`}
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6 text-editorial-ink" />
                </button>

                <div className="mt-16">
                  <div className={`inline-block mb-6`}>
                    <activeCharacter.icon className={`w-20 h-20 text-editorial-accent`} />
                  </div>
                  <h2 id="modal-title" className={`text-6xl font-black italic uppercase leading-[0.8] mb-4 font-serif text-editorial-ink`}>
                    {activeCharacter.name}
                  </h2>
                  <p className={`text-sm font-mono font-black uppercase tracking-[0.2em] opacity-50`}>
                    {activeCharacter.title}
                  </p>
                </div>

                <div className="mt-12">
                  <div className={`p-6 border border-editorial-ink/20`}>
                    <p className={`font-mono text-[10px] font-black uppercase mb-3 opacity-40`}>The Statement</p>
                    <p className={`text-2xl font-serif italic text-editorial-ink leading-tight`}>"{activeCharacter.quote}"</p>
                  </div>
                </div>
              </div>

              {/* Info Side */}
              <div className="md:w-3/5 p-10 md:p-14 overflow-y-auto">
                <div className="mb-12">
                  <h3 className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-editorial-ink/40 mb-6 font-mono">Dossier / {activeCharacter.name}</h3>
                  <p className="text-2xl leading-relaxed text-editorial-ink font-serif font-bold italic">
                    {activeCharacter.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-12">
                  <div className="band-row pt-4">
                    <h3 className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-editorial-ink/40 mb-3 font-mono">Core Speciality</h3>
                    <div className="flex flex-wrap gap-2">
                      {activeCharacter.tags.map(tag => (
                        <span key={tag} className="text-sm font-bold italic font-serif">
                          — {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="band-row pt-4">
                    <h3 className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-editorial-ink/40 mb-3 font-mono">Registry ID</h3>
                    <div className="font-mono text-xs font-bold">
                      BRICK-REG-{activeCharacter.id.toUpperCase()}-2026
                    </div>
                  </div>
                </div>

                <div className="p-10 border-2 border-editorial-ink bg-white relative overflow-hidden group">
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4 text-editorial-accent">
                      <Zap className="w-4 h-4 fill-current" />
                      <h3 className="font-mono text-[10px] font-black uppercase tracking-[0.2em]">Primary Momentum</h3>
                    </div>
                    <p className="text-4xl font-serif font-black italic tracking-tighter uppercase mb-8">{activeCharacter.powerMove}</p>
                    <button 
                      className="w-full py-5 bg-editorial-accent text-white font-serif font-black italic uppercase text-2xl hover:bg-editorial-ink transition-colors flex items-center justify-center gap-4"
                      onClick={() => alert(`${activeCharacter.powerMove} ACTIVATED!`)}
                    >
                      Deploy Sequence <ArrowRight className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Hidden content for screen readers */}
                <div className="sr-only" aria-live="polite">
                  {selectedId ? `${activeCharacter.name} profile is now active.` : 'Profile closed.'}
                </div>
              </div>
            </motion.div>

          </div>
        )}
      </AnimatePresence>

          {/* Footer */}
          <footer className="p-10 border-t border-editorial-ink bg-white flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex space-x-12 font-mono text-[10px] font-black uppercase tracking-widest">
              <span className="underline decoration-editorial-accent decoration-2 underline-offset-4">Tour Dates</span>
              <span className="opacity-30">Merchandise</span>
              <span className="opacity-30">Backstage</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 rounded-full bg-editorial-accent animate-pulse"></div>
              <span className="font-mono text-[10px] font-black tracking-widest uppercase">Live Updates Enabled</span>
            </div>
          </footer>
        </div>

        {/* Info Sidebar */}
        <aside className="hidden xl:flex w-80 border-l border-editorial-ink bg-editorial-muted p-10 flex-col space-y-12">
          <div>
            <h4 className="font-mono text-[10px] font-black border-b border-editorial-ink pb-3 mb-6 uppercase tracking-widest">Now Headlining</h4>
            <div className="bg-editorial-accent text-white p-8">
              <p className="font-mono text-[10px] mb-4 uppercase font-bold opacity-80 tracking-widest">Main Stage</p>
              <p className="font-serif text-4xl font-black italic leading-tight uppercase">Emmet Brickowski</p>
              <div className="mt-8 h-[2px] bg-white/20 w-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '66%' }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  className="h-full bg-white" 
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-[10px] font-black border-b border-editorial-ink pb-3 mb-6 uppercase tracking-widest">Stage Schedule</h4>
            <ul className="space-y-6">
              {CHARACTERS.slice(1, 4).map((c, i) => (
                <li key={c.id} className="flex justify-between items-start group">
                  <div className="text-sm shrink-0">
                    <strong className="font-serif text-lg font-bold uppercase italic group-hover:text-editorial-accent transition-colors block">{c.name}</strong>
                    <p className="font-mono text-[10px] opacity-40 uppercase font-bold tracking-wider">{c.title}</p>
                  </div>
                  <span className="font-mono text-[10px] bg-editorial-ink text-white px-2 py-1 font-bold whitespace-nowrap">19:{30 + (i * 15)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto pt-10">
            <button className="w-full border-2 border-editorial-ink py-5 font-serif font-black text-2xl italic hover:bg-editorial-ink hover:text-white transition-all uppercase tracking-tighter">
              Book Tickets
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
