import { 
  Atom, 
  LayoutDashboard, 
  HelpCircle, 
  LogOut, 
  Sun, 
  Zap,
  Menu,
  X
} from 'lucide-react';
import { ActiveTheme } from '../types';
import { useState } from 'react';

interface SidebarProps {
  theme: ActiveTheme;
  setTheme: (theme: ActiveTheme) => void;
  onLogout: () => void;
}

export default function Sidebar({ theme, setTheme, onLogout }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const isDark = theme === 'electromagnetism';

  return (
    <>
      {/* Mobile Header */}
      <header className={`md:hidden flex justify-between items-center w-full px-6 h-16 sticky top-0 z-50 transition-colors duration-300 ${
        isDark 
          ? 'bg-[#121212]/90 border-b border-[#333] text-white backdrop-blur-md' 
          : 'bg-white border-b border-gray-200 text-gray-900 shadow-sm'
      }`}>
        <div className="flex items-center gap-2">
          <Atom className={`w-6 h-6 ${isDark ? 'text-cyan-400 animate-pulse' : 'text-[#4f378a]'}`} />
          <span className="font-semibold tracking-tight text-lg">Physics Lab</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(isDark ? 'mechanics' : 'electromagnetism')}
            className={`p-2 rounded-full transition-all ${
              isDark 
                ? 'bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/20' 
                : 'bg-[#4f378a]/10 text-[#4f378a]/20 hover:bg-[#4f378a]/20'
            }`}
            title={isDark ? "Switch to Mechanics Mode" : "Switch to Electromagnetism Mode"}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
          </button>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`p-1.5 rounded-lg border ${
              isDark ? 'border-zinc-700 text-zinc-300 hover:bg-zinc-800' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`fixed top-0 bottom-0 left-0 z-40 flex flex-col w-64 border-r transition-all duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      } ${
        isDark 
          ? 'bg-[#121212]/95 border-[#2a2a2a] text-zinc-100 shadow-[0_0_20px_rgba(0,0,0,0.8)] backdrop-blur-md' 
          : 'bg-[#f2ecf4] border-gray-200 text-gray-800 shadow-sm'
      } py-6 px-4 gap-6`}>
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 px-2 mb-4">
          <div className={`p-2 rounded-xl transition-colors ${
            isDark ? 'bg-cyan-950 text-cyan-400 border border-cyan-800/30' : 'bg-[#4f378a]/10 text-[#4f378a]'
          }`}>
            <Atom className={`w-7 h-7 ${isDark ? 'animate-spin-[spin_10s_linear_infinite]' : ''}`} />
          </div>
          <div>
            <h1 className={`font-semibold tracking-tight text-lg ${
              isDark ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400' : 'text-[#4f378a]'
            }`}>
              Physics Lab
            </h1>
            <p className="text-xs text-zinc-500 font-medium">Mechanics Module</p>
          </div>
        </div>

        {/* Navigation - Dashboard Only */}
        <nav className="flex-1 space-y-1.5">
          <div
            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm border-l-4 ${
              isDark
                ? 'bg-cyan-500/10 text-cyan-400 border-cyan-400 shadow-[inset_0_0_10px_rgba(34,211,238,0.05)]'
                : 'bg-[#4f378a] text-white shadow-md border-[#4f378a]'
            }`}
          >
            <LayoutDashboard className="w-5 h-5 text-current" />
            <span>Dashboard</span>
          </div>
        </nav>

        {/* Action Toggle Inside Sidebar (Desktop) */}
        <div className="hidden md:block px-2 pt-2 border-t border-zinc-700/20">
          <div className={`p-3 rounded-2xl flex flex-col gap-2.5 ${
            isDark ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-[#e1d4fd]/50 border border-[#e1d4fd]'
          }`}>
            <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-500">Theme Mode</span>
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-zinc-950/20 dark:bg-zinc-950/40 rounded-xl border border-zinc-700/10">
              <button
                onClick={() => setTheme('mechanics')}
                className={`flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  !isDark 
                    ? 'bg-white text-[#4f378a] shadow-sm' 
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Light</span>
              </button>
              <button
                onClick={() => setTheme('electromagnetism')}
                className={`flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isDark 
                    ? 'bg-zinc-800 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.15)] border border-cyan-500/20' 
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Dark</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Area */}
        <div className="space-y-1.5 pt-4 border-t border-zinc-700/20">
          <button className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors ${
            isDark ? 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100' : 'text-gray-600 hover:bg-gray-100'
          }`}>
            <HelpCircle className="w-4 h-4 opacity-70" />
            <span>Help</span>
          </button>
          <button 
            onClick={onLogout}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors ${
              isDark ? 'text-zinc-400 hover:bg-zinc-900/50 hover:text-red-400' : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
            }`}
          >
            <LogOut className="w-4 h-4 opacity-70" />
            <span>Logout</span>
          </button>
        </div>

      </aside>
    </>
  );
}
