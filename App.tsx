
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { View, Product, CartItem } from './types';
import { MOCK_PRODUCTS } from './constants';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';

const HERO_IMAGES = [
  'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSz8k7SgWicsizioafEG3MnCj8d0jun0MkNxqTjMiBqqDmuOGETxSgFAMH2cH0jAPzsR3Y6C0AFu-zDyo9Bam58UqErA5DB_FC4qhYm90hqvtKIGvKyVnrFfU7XlA9UcvTpAznU=w800',
  'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxeQCVCLMEVoRjgV7Xkw1SVf6LGZAlmzBluGh73rMeNyUOBjNTC0iOGZ_o5n3NbxW67xIG0Xe_jBnKdpnDbb6SNZUwb6gQSvSq-WWFhoE1-92jbiedz10rLOCfBOw7RWhMSHTFYqQ=w800',
  'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSw-piVYU9Hj9A-7GIYLxcP_N9FiXwI-aHjtgiSNWnLS6xkh_HxiULZJcgeC_jXjQTcdn2w0mFkUfLuVowJ8NSJ9h1n6gz27BOdhKxy0ycMaZ3npBA4IkLs1NzKKLD01I7Z4hVB1=w800',
  'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxDZmCuPx2ShydMKwegd_XS71jfzpgj_7AEld3NGPk2FRiD1JJ__v7rhLo8VfYA-uw_ea3tj7sP7U-ukJsu3J5mWODgADOBvbCSMkeaHYqIiJnNqRYVSvf5hhoA9bg_xQDTU58=w800',
  'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSzrlSQ9tn3x4WUA52o4jxAg76UZ_dTF7sQ-kigdL1ghh3UXs63WV-VWVACGO5BjoCVBes5wvD3rsqAtlgDU_VHS_-Veu9Oo9piom6DeqC8b8GeuhkN1v1mfUAAcJER5hxpEkeiG=w800'
];

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isScrolling, setIsScrolling] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const scrollTimeout = useRef<number | null>(null);

  // Auto-play for Hero Swiper
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Delay for the Limited Stock Alert
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Scroll detection logic for WhatsApp button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (!isScrolling) setIsScrolling(true);
      
      if (scrollTimeout.current) {
        window.clearTimeout(scrollTimeout.current);
      }
      
      scrollTimeout.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, 1000); 
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      if (scrollTimeout.current) window.clearTimeout(scrollTimeout.current);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolling]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const phoneNumber = "919902902883";
    const cartItemsText = cart.map((item, index) => 
      `${index + 1}. *${item.name.toUpperCase()}*\n   Quantity: ${item.quantity}\n   Price: ₹${(item.price * item.quantity).toLocaleString('en-IN')}`
    ).join('\n\n');

    const totalText = `₹${cartTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    
    const message = `🌊 *NEW ORDER - MOKSHA AQUATIC* 🌊\n` +
      `───────────────────────\n\n` +
      `*ORDER SUMMARY:*\n${cartItemsText}\n\n` +
      `───────────────────────\n` +
      `*TOTAL ORDER VALUE: ${totalText}*\n` +
      `───────────────────────\n\n` +
      `Hello! I would like to place an order for the items listed above. Please confirm availability and share shipping details. Thanks!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return MOCK_PRODUCTS;
    return MOCK_PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const cartTotal = useMemo(() => 
    cart.reduce((sum, item) => sum + (item.price * item.quantity), 0), 
  [cart]);

  const renderContent = () => {
    switch (view) {
      case 'home':
        return (
          <div className="space-y-16 animate-fade-in pb-24">
            {/* Hero Swiper - Correct Placement & Production Grade UI */}
            <section className="px-5">
              <div className="relative w-full aspect-[16/10] md:aspect-[21/9] rounded-[40px] overflow-hidden shadow-2xl group border border-slate-100 bg-slate-100">
                {HERO_IMAGES.map((img, idx) => (
                  <div 
                    key={img}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
                      idx === heroIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt="Hero Aquatic" 
                      className="w-full h-full object-cover"
                    />
                    {/* Dark gradient overlay for UI readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
                  </div>
                ))}

                {/* Top Overlay: Badge */}
                <div className="absolute top-6 left-6 z-20">
                  <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] bg-blue-600/90 backdrop-blur-md text-white shadow-lg border border-white/10 block">
                    Featured Collection
                  </span>
                </div>

                {/* Bottom Overlays: Controls & Indicators */}
                <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-between">
                  {/* Compact Swiper Buttons - Bottom Left */}
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setHeroIndex((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length)}
                      className="w-10 h-10 rounded-xl bg-black/30 backdrop-blur-xl border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all shadow-xl active:scale-90"
                    >
                      <i className="fa-solid fa-chevron-left text-xs"></i>
                    </button>
                    <button 
                      onClick={() => setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length)}
                      className="w-10 h-10 rounded-xl bg-black/30 backdrop-blur-xl border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all shadow-xl active:scale-90"
                    >
                      <i className="fa-solid fa-chevron-right text-xs"></i>
                    </button>
                  </div>

                  {/* Swiper Indicators - Bottom Right */}
                  <div className="flex gap-1.5 px-3 py-2 bg-black/20 backdrop-blur-lg rounded-full border border-white/5">
                    {HERO_IMAGES.map((_, idx) => (
                      <div 
                        key={idx}
                        className={`h-1 rounded-full transition-all duration-500 ${
                          idx === heroIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/40'
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="px-5 space-y-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-center md:text-left">
                <div>
                  <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase leading-none">
                    Hot <span className="text-blue-600">Releases</span>
                  </h2>
                  <p className="text-slate-500 font-bold tracking-wide uppercase text-[10px] mt-2">Limited batch arrivals</p>
                </div>
                <button 
                  onClick={() => setView('shop')} 
                  className="bg-slate-900 text-white px-10 py-4 rounded-[20px] font-black uppercase text-sm tracking-widest hover:bg-blue-600 transition-all duration-500 shadow-2xl shadow-slate-200 active:scale-95 mx-auto md:mx-0"
                >
                  Enter Store
                </button>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10">
                {MOCK_PRODUCTS.slice(0, 4).map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                ))}
              </div>
            </section>

            <section className="px-5 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-blue-600 rounded-[50px] p-12 text-white relative overflow-hidden group shadow-2xl shadow-blue-500/20">
                <div className="relative z-10 space-y-5">
                  <h3 className="text-4xl font-black leading-tight uppercase tracking-tighter">Live<br/>Arrival<br/>Guarantee</h3>
                  <p className="text-blue-100 font-medium text-lg leading-relaxed">Precision logistics for delicate lifeforms. We ship in climate-controlled environments.</p>
                  <button onClick={() => setView('shop')} className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl active:scale-95 transition-all">Details</button>
                </div>
                <i className="fa-solid fa-truck-fast absolute -right-8 -bottom-8 text-[12rem] opacity-5 group-hover:scale-110 transition-transform duration-1000 rotate-12"></i>
              </div>
              <div className="bg-slate-900 rounded-[50px] p-12 text-white relative overflow-hidden group shadow-2xl">
                <div className="relative z-10 space-y-5">
                  <h3 className="text-4xl font-black leading-tight uppercase tracking-tighter">Bespoke<br/>Aquarium<br/>Design</h3>
                  <p className="text-slate-400 font-medium text-lg leading-relaxed">Artistic scaping and infrastructure planning for high-end residential spaces.</p>
                  <button className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl active:scale-95 transition-all">Consult</button>
                </div>
                <i className="fa-solid fa-gem absolute -right-8 -bottom-8 text-[12rem] opacity-5 group-hover:scale-110 transition-transform duration-1000 -rotate-12"></i>
              </div>
            </section>
          </div>
        );
      case 'shop':
        return (
          <div className="animate-fade-in pb-24 lg:flex gap-12 px-5">
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">Catalog</h2>
                <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                  {['all', 'fish', 'plants', 'tanks', 'equipment'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-8 py-3.5 rounded-2xl text-sm font-black transition-all uppercase tracking-widest shadow-sm border ${
                        activeCategory === cat 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-blue-500/30 shadow-xl' 
                        : 'bg-white text-slate-500 border-slate-100 hover:border-blue-400'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                ))}
              </div>
            </div>

            <div className="hidden lg:block w-[400px] sticky top-28 self-start">
              <div className="bg-white rounded-[40px] p-10 shadow-2xl border border-slate-50 flex flex-col max-h-[calc(100vh-160px)]">
                <h3 className="text-3xl font-black text-slate-900 mb-10 flex items-center justify-between uppercase tracking-tighter">
                  Checkout
                  <span className="text-sm font-black bg-blue-50 text-blue-600 px-5 py-2 rounded-full">{cart.length}</span>
                </h3>
                
                <div className="flex-1 overflow-y-auto space-y-5 pr-2 custom-scrollbar">
                  {cart.length === 0 ? (
                    <div className="text-center py-24">
                      <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
                        <i className="fa-solid fa-box-open text-4xl text-slate-200"></i>
                      </div>
                      <p className="font-black text-slate-300 uppercase tracking-widest text-xs">Empty Order</p>
                    </div>
                  ) : (
                    cart.map(item => (
                      <div key={item.id} className="flex gap-5 items-center bg-slate-50 p-4 rounded-3xl group border border-transparent hover:border-blue-100 transition-all duration-300">
                        <img src={item.image} alt={item.name} className="w-20 h-20 rounded-2xl object-cover shadow-md" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-black text-sm text-slate-800 truncate uppercase">{item.name}</h4>
                          <p className="text-xs font-black text-blue-600 mt-1.5 tracking-wider">₹{item.price.toLocaleString('en-IN')} × {item.quantity}</p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="w-10 h-10 rounded-2xl flex items-center justify-center text-slate-300 hover:bg-red-50 hover:text-red-500 transition-all"
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="pt-10 mt-10 border-t border-slate-100 space-y-8">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">Total Order</span>
                      <span className="text-3xl font-black text-slate-900 tracking-tighter">₹{cartTotal.toLocaleString('en-IN')}</span>
                    </div>
                    <button 
                      onClick={handleCheckout}
                      className="w-full py-6 bg-slate-900 text-white font-black rounded-3xl shadow-2xl hover:bg-blue-600 active:scale-95 transition-all duration-500 uppercase tracking-widest text-sm"
                    >
                      Confirm Order via WhatsApp
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbfc]">
      {/* Dynamic Alert Banner - Updated with Blue Fish Icon */}
      {showAlert && (
        <div className="fixed top-20 md:top-24 left-0 right-0 z-[60] px-4 pointer-events-none animate-alert-slide">
          <div className="max-w-md mx-auto pointer-events-auto bg-[#0b141d]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl flex items-center gap-4 relative">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center relative">
              <div className="absolute inset-0 bg-blue-500/20 rounded-xl animate-ping"></div>
              <i className="fa-solid fa-fish-fins text-blue-500 text-xl"></i>
            </div>
            <div className="flex-1">
              <h4 className="text-white font-black text-xs uppercase tracking-widest leading-none mb-1">Stock Alert</h4>
              <p className="text-slate-400 text-[10px] font-bold">Limited batch arrivals selling fast. Order now on WhatsApp!</p>
            </div>
            <button 
              onClick={() => setShowAlert(false)}
              className="w-8 h-8 rounded-full bg-white/5 text-slate-400 flex items-center justify-center hover:bg-white/10 active:scale-90 transition-all"
            >
              <i className="fa-solid fa-xmark text-xs"></i>
            </button>
          </div>
        </div>
      )}

      <Navbar currentView={view} setView={setView} cartCount={cart.length} />
      
      <main className="max-w-[1400px] mx-auto py-8">
        {renderContent()}
      </main>

      <footer className="mt-24 pt-24 pb-12 bg-slate-900 text-white px-5 rounded-t-[80px] md:rounded-t-[120px]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 text-center md:text-left">
          <div className="md:col-span-2 space-y-8">
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="w-14 h-14 accent-gradient rounded-[20px] flex items-center justify-center text-white text-3xl shadow-2xl shadow-blue-500/20">
                <i className="fa-solid fa-fish-fins"></i>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-black tracking-tighter uppercase leading-none">Moksha</span>
                <span className="text-sm font-black text-blue-400 tracking-[0.5em] uppercase leading-none mt-2">Aquatic</span>
              </div>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed mx-auto md:mx-0 font-medium text-lg">
              Curating the world's most breathtaking aquatic life and infrastructure. Quality redefined for the modern hobbyist.
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="font-black uppercase tracking-[0.2em] text-[10px] text-blue-500">Resource</h4>
            <ul className="space-y-4 text-slate-300 font-bold uppercase text-xs tracking-widest">
              <li className="hover:text-white cursor-pointer transition-colors">Our Farms</li>
              <li className="hover:text-white cursor-pointer transition-colors">Care Guides</li>
              <li className="hover:text-white cursor-pointer transition-colors">Bulk Supply</li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="font-black uppercase tracking-[0.2em] text-[10px] text-blue-500">Social</h4>
            <div className="flex justify-center md:justify-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-800/50 backdrop-blur-md flex items-center justify-center hover:bg-pink-600 transition-all cursor-pointer shadow-xl border border-white/5">
                <i className="fa-brands fa-instagram text-xl"></i>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-slate-800/50 backdrop-blur-md flex items-center justify-center hover:bg-blue-600 transition-all cursor-pointer shadow-xl border border-white/5">
                <i className="fa-brands fa-facebook-f text-xl"></i>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-slate-800/50 backdrop-blur-md flex items-center justify-center hover:bg-red-600 transition-all cursor-pointer shadow-xl border border-white/5">
                <i className="fa-brands fa-youtube text-xl"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto border-t border-slate-800 mt-24 pt-12 text-center">
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em] mb-4">© 2025 Moksha aquatic. All rights reserved.</p>
          <p className="text-slate-700 text-[12px] font-black uppercase tracking-[0.5em] opacity-30">RESERVED</p>
        </div>
      </footer>

      {/* Floating WhatsApp Button - Sticky Bottom for Support */}
      {!(view === 'shop' && cart.length > 0) && (
        <a 
          href="https://wa.me/919902902883" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`fixed bottom-32 md:bottom-8 right-6 z-50 group flex flex-col items-center gap-2 transition-all duration-700 transform ${
            isScrolling ? 'opacity-0 scale-50 translate-y-20 pointer-events-none' : 'opacity-100 scale-100 translate-y-0'
          }`}
          aria-label="Contact us on WhatsApp"
        >
          <span className="bg-slate-900 text-white text-[10px] font-black px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 shadow-lg uppercase tracking-widest">Chat with us</span>
          <div className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white text-3xl shadow-[0_10px_30px_rgba(37,211,102,0.4)] animate-whatsapp-pulse active:scale-90 transition-all">
            <i className="fa-brands fa-whatsapp"></i>
          </div>
        </a>
      )}

      {/* Mobile Checkout Bar - Precise Match to Screenshot Requirements */}
      {view === 'shop' && cart.length > 0 && (
        <div className={`md:hidden fixed bottom-24 left-4 right-4 z-40 transition-all duration-500 transform ${
          isScrolling ? 'opacity-0 translate-y-20' : 'opacity-100 translate-y-0'
        }`}>
          <div className="relative">
            <div className="bg-[#0b141d] text-white rounded-[24px] p-5 flex items-center justify-between shadow-2xl border border-white/5 h-[90px]">
              <div className="flex items-center gap-4">
                {/* Quantity Box */}
                <div className="w-12 h-12 bg-[#2563eb] rounded-xl flex items-center justify-center font-black text-xl shadow-lg">
                  {cart.length}
                </div>
                {/* Price Info */}
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Total Value</span>
                  <span className="font-black text-2xl tracking-tight leading-none">
                    ₹{cartTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* White Checkout Button */}
              <div className="relative">
                <button 
                  onClick={handleCheckout}
                  className="bg-white text-slate-900 px-6 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest active:scale-95 transition-all shadow-xl leading-none flex items-center justify-center text-center"
                >
                  Pay via<br/>WhatsApp
                </button>
                {/* Overlapping WhatsApp Icon */}
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-[#25D366] rounded-full border-[3px] border-[#0b141d] flex items-center justify-center text-white text-xl shadow-lg">
                  <i className="fa-brands fa-whatsapp"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes alertSlide {
          from { opacity: 0; transform: translateY(-20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes whatsappPulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); }
          70% { transform: scale(1.05); box-shadow: 0 0 0 20px rgba(37, 211, 102, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
        .animate-fade-in {
          animation: fadeIn 1s cubic-bezier(0.19, 1, 0.22, 1) forwards;
        }
        .animate-alert-slide {
          animation: alertSlide 0.6s cubic-bezier(0.19, 1, 0.22, 1) forwards;
        }
        .animate-whatsapp-pulse {
          animation: whatsappPulse 2s infinite cubic-bezier(0.455, 0.03, 0.515, 0.955);
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
};

export default App;
