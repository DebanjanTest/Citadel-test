
import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Legend', href: '#about' },
    { name: 'Vyuhas', href: '#community' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Ratnas', href: '#prizes' },
    { name: 'Allies', href: '#sponsors' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-[60] px-8 md:px-16 py-8 flex justify-between items-center bg-black/40 backdrop-blur-lg transition-all border-b border-white/5">
      <div className="text-3xl md:text-5xl font-samarkan font-bold text-amber-500 gold-glow tracking-normal cursor-pointer relative z-50">
        CITADEL 1.0
      </div>

      <nav className="hidden lg:flex items-center space-x-12">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="text-amber-100/50 hover:text-amber-400 transition-all font-pyriform text-xl uppercase tracking-widest border-b border-transparent hover:border-amber-400 pb-1"
          >
            {item.name}
          </a>
        ))}
      </nav>

      <div className="flex items-center space-x-6">
        <button className="hidden md:block px-10 py-3 border-2 border-amber-600/50 text-amber-500 font-bold font-pyriform text-lg tracking-widest hover:bg-amber-600 hover:text-black transition-all">
          ASCEND
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden relative z-50 w-12 h-12 flex flex-col justify-center items-center space-y-2 focus:outline-none"
        >
          <span className={`block w-8 h-0.5 bg-amber-500 transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
          <span className={`block w-8 h-0.5 bg-amber-500 transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-8 h-0.5 bg-amber-500 transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#050505] z-40 transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col items-center justify-center space-y-10 lg:hidden`}>
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            onClick={() => setIsOpen(false)}
            className="text-amber-200 text-4xl font-samarkan hover:text-amber-500 tracking-widest"
          >
            {item.name}
          </a>
        ))}
        <button className="mt-6 px-12 py-5 border-2 border-amber-600 text-amber-500 font-bold font-pyriform text-xl tracking-widest hover:bg-amber-600 hover:text-black transition-all active:scale-95 touch-manipulation">
          ASCEND
        </button>
      </div>
    </header>
  );
};

export default Header;
