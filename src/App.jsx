import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -50',
        end: 99999,
        toggleClass: {
          className: 'bg-background/80 backdrop-blur-xl border border-primary/10 shadow-lg text-primary',
          targets: navRef.current
        },
        onEnter: () => gsap.to(navRef.current, { color: '#2E4036', duration: 0.3 }),
        onLeaveBack: () => gsap.to(navRef.current, { color: '#F2F0E9', backgroundColor: 'transparent', duration: 0.3, border: 'none', boxShadow: 'none' })
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  return (
    <nav ref={navRef} className="fixed top-6 left-1/2 -translate-x-1/2 z-50 rounded-[3rem] px-8 py-3 transition-all duration-300 text-background flex items-center justify-between gap-12 w-[90%] max-w-5xl group border border-transparent">
      <div className="font-heading font-bold text-xl tracking-tight">Okavango Exploration Safaris</div>
      <div className="hidden md:flex gap-8 font-body text-sm font-medium">
        <a href="#features" className="hover:-translate-y-[1px] transition-transform">Expeditions</a>
        <a href="#philosophy" className="hover:-translate-y-[1px] transition-transform">Philosophy</a>
        <a href="#protocol" className="hover:-translate-y-[1px] transition-transform">Protocol</a>
      </div>
      <button className="bg-accent text-background px-6 py-2 rounded-full font-body text-sm font-medium hover:scale-105 transition-transform overflow-hidden relative group/btn">
        <span className="relative z-10 flex items-center gap-2">Start Journey <ArrowRight size={16} /></span>
        <div className="absolute inset-0 bg-primary translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
      </button>
    </nav>
  );
};

const Hero = () => {
  const container = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.hero-text', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, delay: 0.2 });
      tl.fromTo('.hero-btn', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.8");
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="relative h-[100dvh] w-full flex items-end pb-24 px-8 md:px-24">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2000&auto=format&fit=crop" alt="Safari" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent"></div>
      </div>
      <div className="relative z-10 w-full max-w-4xl text-background">
        <h1 className="hero-text text-5xl md:text-7xl font-heading font-bold leading-tight mb-2">Wilderness is the</h1>
        <h2 className="hero-text text-6xl md:text-9xl font-drama italic text-accent leading-none mb-8">Experience.</h2>
        <p className="hero-text text-lg md:text-xl font-body max-w-xl opacity-80 mb-10">
          Bespoke Wilderness Adventures tailored for the modern explorer.
          Step into deeply authentic, high-fidelity biological exploration.
        </p>
        <a href="https://wa.me/26771518275?text=Hi,%20I'd%20like%20to%20plan%20a%20safari%20trip%20to%20the%20Okavango%20Delta." target="_blank" rel="noreferrer" className="hero-btn bg-accent text-background px-8 py-4 rounded-[2rem] font-body text-lg hover:scale-105 transition-transform flex items-center gap-3 w-fit">
          <MessageCircle size={20} /> Chat on WhatsApp
        </a>
      </div>
    </section>
  );
};

const ShufflerCard = () => {
  const cardRef = useRef(null);
  const [cards, setCards] = useState([
    { id: 1, text: "Lodge Integration", active: true },
    { id: 2, text: "Mokoro Excursions", active: false },
    { id: 3, text: "Private Tracking", active: false }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const newArr = [...prev];
        const last = newArr.pop();
        newArr.unshift(last);
        return newArr.map((c, i) => ({ ...c, active: i === 0 }));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-background rounded-[2rem] p-8 border border-primary/10 shadow-lg relative overflow-hidden flex flex-col justify-between h-80 hover:-translate-y-2 transition-transform duration-500">
      <div>
        <h4 className="font-heading font-bold text-xl mb-2">Fully Serviced Safaris</h4>
        <p className="font-body text-sm opacity-70">Luxury wilderness immersion handled end-to-end.</p>
      </div>
      <div className="relative h-32 w-full mt-8" ref={cardRef}>
        {cards.map((c, i) => (
          <div
            key={c.id}
            className="absolute left-0 right-0 bg-white rounded-xl p-4 shadow-sm border border-primary/5 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{
              top: `${i * 12}px`,
              scale: 1 - (i * 0.05),
              opacity: 1 - (i * 0.3),
              zIndex: 10 - i,
              filter: `blur(${i}px)`
            }}
          >
            <span className="font-data text-xs flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${c.active ? 'bg-accent' : 'bg-primary/20'}`}></div>
              {c.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const TypewriterCard = () => {
  const [text, setText] = useState('');
  const fullText = "> Analyzing migration patterns...\n> Locating leopard sightings...\n> Drafting itinerary draft 01...\n> Awaiting confirmation.";

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, current));
      current++;
      if (current > fullText.length) {
        current = 0; // restart
        setTimeout(() => { }, 2000);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-background rounded-[2rem] p-8 border border-primary/10 shadow-lg relative overflow-hidden flex flex-col h-80 hover:-translate-y-2 transition-transform duration-500">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h4 className="font-heading font-bold text-xl mb-2">AI Ranger Planning</h4>
          <p className="font-body text-sm opacity-70">Instant itinerary drafting & sighting maps.</p>
        </div>
        <div className="flex items-center gap-2 bg-primary/5 px-3 py-1 rounded-full">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
          <span className="font-data text-xs">Live Feed</span>
        </div>
      </div>
      <div className="bg-dark text-background rounded-xl p-4 flex-1 font-data text-xs mt-auto whitespace-pre-wrap flex flex-col justify-end">
        <p>{text}<span className="inline-block w-2 bg-accent h-3 ml-1 animate-pulse"></span></p>
      </div>
    </div>
  );
};

const SchedulerCard = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      // Cursor moves from out of bounds
      tl.set('.cursor', { x: -20, y: 150, opacity: 0 })
        .to('.cursor', { opacity: 1, duration: 0.2 })
        .to('.cursor', { x: 120, y: 40, duration: 1, ease: 'power2.inOut' }) // Move to Thursday
        .to('.cursor', { scale: 0.8, duration: 0.1 }) // Press
        .to('.day-T', { backgroundColor: '#CC5833', color: '#F2F0E9', duration: 0.1 }, "<") // Highlight Day
        .to('.cursor', { scale: 1, duration: 0.1 }) // Release
        .to('.cursor', { x: 220, y: 120, duration: 0.8, ease: 'power2.inOut' }, "+=0.2") // Move to Save
        .to('.cursor', { scale: 0.8, duration: 0.1 }) // Press Save
        .to('.btn-save', { scale: 0.95, duration: 0.1 }, "<")
        .to('.cursor', { scale: 1, duration: 0.1 })
        .to('.btn-save', { scale: 1, duration: 0.1 }, "<")
        .to('.cursor', { opacity: 0, duration: 0.3 }, "+=0.3")
        .to('.day-T', { backgroundColor: 'transparent', color: '#2E4036', duration: 0.3 }, "<"); // Reset
    }, svgRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-background rounded-[2rem] p-8 border border-primary/10 shadow-lg relative overflow-hidden flex flex-col justify-between h-80 hover:-translate-y-2 transition-transform duration-500">
      <div>
        <h4 className="font-heading font-bold text-xl mb-2">Mobile Expeditions</h4>
        <p className="font-body text-sm opacity-70">Multi-day scheduled journeys across untouched regions.</p>
      </div>
      <div className="relative h-40 w-full mt-4 bg-white rounded-xl border border-primary/5 p-4" ref={svgRef}>
        <div className="grid grid-cols-7 gap-1 font-data text-xs text-center mb-6">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <div key={i} className={`py-1 rounded-sm ${i === 4 ? 'day-T' : ''} text-primary`}>{d}</div>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <div className="btn-save bg-primary text-background font-body text-xs px-4 py-2 rounded-full inline-block">Confirm</div>
        </div>
        {/* Animated Cursor */}
        <svg className="cursor absolute top-0 left-0 w-6 h-6 z-20 drop-shadow-md text-dark pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 2v20l5.5-5.5H20z" />
        </svg>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-24 px-8 md:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-4xl font-heading font-bold mb-16 text-center">Interactive Functional Artifacts</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <ShufflerCard />
          <TypewriterCard />
          <SchedulerCard />
        </div>
      </div>
    </section>
  );
};

const Philosophy = () => {
  const container = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.parallax-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: container.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top 60%',
        }
      });

      tl.fromTo('.phil-text-1', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
        .fromTo('.phil-text-2', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 }, "-=0.5");
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} id="philosophy" className="relative py-40 overflow-hidden bg-dark text-background px-8 md:px-24 flex items-center justify-center min-h-[80vh]">
      <div className="absolute inset-0 z-0">
        <img className="parallax-bg w-full h-[130%] object-cover opacity-20 -top-[15%]" src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2000&auto=format&fit=crop" alt="Abstract nature" />
      </div>
      <div className="relative z-10 max-w-5xl text-center">
        <p className="phil-text-1 text-xl md:text-2xl font-body opacity-70 mb-6">
          Most safaris focus on: generic routes and standard accommodations.
        </p>
        <p className="phil-text-2 text-5xl md:text-7xl font-drama italic leading-tight">
          We focus on: <span className="text-accent underline decoration-1 underline-offset-8">Untouched</span> biological frontiers.
        </p>
      </div>
    </section>
  );
};

const ProtocolCard = ({ step, title, desc, animType }) => {
  return (
    <div className="w-full h-[80vh] flex items-center justify-center relative protocol-card shrink-0 px-4">
      <div className="card-inner w-full max-w-5xl bg-background rounded-[3rem] p-12 md:p-20 shadow-2xl border border-primary/10 flex flex-col md:flex-row gap-12 items-center h-full max-h-[600px] overflow-hidden">

        {/* Generative Visuals */}
        <div className="flex-1 w-full h-full min-h-[250px] relative bg-white rounded-3xl border border-primary/5 flex items-center justify-center overflow-hidden">
          {animType === 'geometric' && (
            <svg className="w-48 h-48 text-primary opacity-20 spin-slow" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="10 5" />
              <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="1" fill="none" />
              <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="20 20" className="spin-slow-reverse" />
            </svg>
          )}
          {animType === 'scanner' && (
            <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 gap-1 p-4 opacity-10">
              {Array.from({ length: 100 }).map((_, i) => <div key={i} className="bg-primary rounded-full w-2 h-2 mx-auto"></div>)}
              <div className="absolute top-0 left-0 w-full h-2 bg-accent shadow-[0_0_15px_rgba(204,88,51,0.8)] scanner-line"></div>
            </div>
          )}
          {animType === 'pulse' && (
            <svg className="w-full h-32 px-12 stroke-accent stroke-2 fill-none overflow-visible" viewBox="0 0 500 100">
              <path className="pulse-path" d="M0,50 L150,50 L170,20 L190,80 L210,30 L230,70 L250,50 L500,50" />
            </svg>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-6">
          <span className="font-data text-accent text-lg">[{step}]</span>
          <h3 className="font-heading font-bold text-4xl">{title}</h3>
          <p className="font-body text-lg opacity-80">{desc}</p>
        </div>
      </div>
    </div>
  );
};

const Protocol = () => {
  const container = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');

      cards.forEach((card, i) => {
        if (i === cards.length - 1) return; // Last card doesn't stack others under it
        const inner = card.querySelector('.card-inner');

        ScrollTrigger.create({
          trigger: card,
          start: "top 10%",
          endTrigger: cards[i + 1],
          end: "top 20%",
          scrub: true,
          pin: true,
          pinSpacing: false,
          animation: gsap.to(inner, {
            scale: 0.9,
            opacity: 0.5,
            filter: "blur(5px)",
            transformOrigin: "top center"
          })
        });
      });

      // Animations inside
      gsap.to('.spin-slow', { rotation: 360, duration: 20, repeat: -1, ease: 'none' });
      gsap.to('.spin-slow-reverse', { rotation: -360, duration: 15, repeat: -1, ease: 'none', transformOrigin: "50% 50%" });
      gsap.to('.scanner-line', { y: 200, duration: 2, repeat: -1, yoyo: true, ease: 'power1.inOut' });
      gsap.to('.pulse-path', { strokeDashoffset: -1000, strokeDasharray: 50, duration: 3, repeat: -1, ease: 'linear' });

    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section id="protocol" ref={container} className="bg-white py-24 relative z-20">
      <div className="max-w-7xl mx-auto px-8 mb-24">
        <h2 className="text-5xl font-heading font-bold mb-4">The Methodology</h2>
        <p className="font-body text-xl opacity-70">A systematic approach to traversing native environments.</p>
      </div>
      <div className="relative">
        <ProtocolCard
          step="01"
          title="Telemetry Context"
          desc="We map your physical and experiential requirements to native terrain topography. Precision alignment."
          animType="geometric"
        />
        <ProtocolCard
          step="02"
          title="Digital Pre-boarding"
          desc="AI Ranger synchronizes with your device, feeding real-time atmospheric and migrational updates before touchdown."
          animType="scanner"
        />
        <ProtocolCard
          step="03"
          title="Immersion Execute"
          desc="A seamless transfer from airport terminus to deep delta. Full operational takeover by our elite guiding unit."
          animType="pulse"
        />
      </div>
    </section>
  );
};

const GetStarted = () => {
  return (
    <section className="py-40 px-8 text-center bg-background">
      <h2 className="text-5xl md:text-7xl font-heading font-bold mb-8 text-dark">Ready to <span className="font-drama italic font-normal">Initiate?</span></h2>
      <p className="font-body text-xl opacity-80 max-w-2xl mx-auto mb-12">The Okavango operates on its own cadence. Connect with our dispatch team to coordinate your entry vector.</p>
      <a href="https://wa.me/26771518275?text=Hi,%20I'd%20like%20to%20plan%20a%20safari%20trip%20to%20the%20Okavango%20Delta." target="_blank" rel="noreferrer" className="bg-primary text-background px-12 py-6 rounded-full font-heading font-bold text-xl hover:scale-105 hover:bg-accent transition-all duration-300 shadow-xl inline-flex items-center gap-4">
        Launch Comm-Link <ArrowRight size={24} />
      </a>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-dark text-background rounded-t-[4rem] px-8 py-16 md:py-24 mt-[-4rem] relative z-30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <div className="font-heading font-bold text-3xl">Okavango Exploration Safaris</div>
          <p className="font-body opacity-60 max-w-sm">Precision ecosystem exploration. Driven by data, executed in the wilderness.</p>
          <div className="flex items-center gap-3 mt-8">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            <span className="font-data text-xs uppercase tracking-widest opacity-80">System Operational</span>
          </div>
        </div>
        <div className="space-y-4 font-body">
          <h5 className="font-bold mb-6 font-heading tracking-widest text-sm opacity-50 uppercase">Nav</h5>
          <a href="#" className="block opacity-80 hover:opacity-100 hover:text-accent transition-colors">Manifesto</a>
          <a href="#" className="block opacity-80 hover:opacity-100 hover:text-accent transition-colors">Expeditions</a>
          <a href="#" className="block opacity-80 hover:opacity-100 hover:text-accent transition-colors">Journal</a>
        </div>
        <div className="space-y-4 font-body">
          <h5 className="font-bold mb-6 font-heading tracking-widest text-sm opacity-50 uppercase">Legal</h5>
          <a href="#" className="block opacity-80 hover:opacity-100 transition-colors">Terms of Service</a>
          <a href="#" className="block opacity-80 hover:opacity-100 transition-colors">Privacy Data</a>
          <a href="#" className="block opacity-80 hover:opacity-100 transition-colors">Risk Waiver</a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/10 text-center font-data text-xs opacity-40">
        &copy; {new Date().getFullYear()} Okavango Exploration Safaris Ltd. Sector 4, Maun, BWA.
      </div>
    </footer>
  );
};

function App() {
  return (
    <>
      <div className="noise-overlay"></div>
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <Protocol />
      <GetStarted />
      <Footer />
    </>
  )
}

export default App;
