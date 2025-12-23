
import React from 'react';
import { View } from '../types';

interface NavbarProps {
  currentView: View;
  setView: (view: View) => void;
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, cartCount }) => {
  const navItems: { id: View; icon: string; label: string }[] = [
    { id: 'home', icon: 'fa-house', label: 'Home' },
    { id: 'shop', icon: 'fa-bag-shopping', label: 'Shop' },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center justify-between px-8 py-5 glass-effect sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setView('home')}>
          <div className="w-12 h-12 accent-gradient rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
            <i className="fa-solid fa-fish-fins"></i>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none">Moksha</span>
            <span className="text-xs font-black text-blue-600 tracking-[0.4em] uppercase leading-none mt-1">Aquatic</span>
          </div>
        </div>
        
        <div className="flex gap-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex items-center gap-2 px-8 py-2.5 rounded-2xl transition-all duration-300 font-bold ${
                currentView === item.id 
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30 scale-105' 
                  : 'text-slate-500 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <i className={`fa-solid ${item.icon}`}></i>
              <span className="uppercase text-xs tracking-widest">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="relative cursor-pointer group" onClick={() => setView('shop')}>
          <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
            <i className="fa-solid fa-cart-shopping text-xl text-slate-600 group-hover:text-white"></i>
          </div>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[20px] text-center border-2 border-white animate-bounce">
              {cartCount}
            </span>
          )}
        </div>
      </nav>

      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-5 py-4 bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
        <div className="flex items-center gap-2" onClick={() => setView('home')}>
          <div className="w-10 h-10 accent-gradient rounded-xl flex items-center justify-center text-white shadow-md">
            <i className="fa-solid fa-fish-fins"></i>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black text-slate-900 tracking-tighter uppercase leading-none">Moksha</span>
            <span className="text-[8px] font-black text-blue-600 tracking-[0.3em] uppercase leading-none mt-0.5">Aquatic</span>
          </div>
        </div>
        <div className="relative" onClick={() => setView('shop')}>
          <i className="fa-solid fa-cart-shopping text-2xl text-slate-800"></i>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center border-2 border-white">
              {cartCount}
            </span>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-100 z-50 flex justify-around items-center h-16 pb-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`flex flex-col items-center gap-1 transition-all ${
              currentView === item.id ? 'text-blue-600 scale-110' : 'text-slate-400'
            }`}
          >
            <i className={`fa-solid ${item.icon} text-lg`}></i>
            <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
};

export default Navbar;
