import { useState, useMemo } from 'react';
import { ActiveTheme, SimulationParams } from './types';
import Sidebar from './components/Sidebar';
import ConceptCard from './components/ConceptCard';
import ExampleCalculations from './components/ExampleCalculations';
import ProjectileQuiz from './components/ProjectileQuiz';
import RelativityQuiz from './components/RelativityQuiz';
import SimulationPanel from './components/SimulationPanel';
import DataPanel from './components/DataPanel';
import { Atom, LogIn, Lock, Sun, Zap } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState<ActiveTheme>('mechanics');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [studentName, setStudentName] = useState('방문자');
  const [inputName, setInputName] = useState('');

  // Simulation state
  const [params, setParams] = useState<SimulationParams>({
    velocity: 20,
    angle: 45,
    height: 10,
    mass: 0.2,
    gravity: 10,
  });

  const handleLogout = () => {
    setIsLoggedIn(false);
    setInputName('');
    setParams({
      velocity: 20,
      angle: 45,
      height: 10,
      mass: 0.2,
      gravity: 10,
    });
  };

  // Calculate real-time physics parameters
  const computedData = useMemo(() => {
    const angleRad = (params.angle * Math.PI) / 180;
    const v0x = params.velocity * Math.cos(angleRad);
    const v0y = params.velocity * Math.sin(angleRad);
    const g = params.gravity;

    const timeToPeak = v0y <= 0 ? 0 : v0y / g;
    const maxHeight = params.height + (v0y * v0y) / (2 * g);

    // Quadratic formula for flight time: 0.5 * g * t^2 - v0y * t - h0 = 0
    // t = (v0y + sqrt(v0y^2 + 2 * g * h0)) / g
    const discriminant = v0y * v0y + 2 * g * params.height;
    const totalTime = discriminant < 0 ? 0 : (v0y + Math.sqrt(discriminant)) / g;
    const range = v0x * totalTime;

    return {
      range,
      maxHeight,
      timeToPeak,
      totalTime,
    };
  }, [params]);

  const isDark = theme === 'electromagnetism';

  if (!isLoggedIn) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-300 font-sans ${
        isDark ? 'bg-[#09090b] text-zinc-100' : 'bg-[#faf8fc] text-gray-800'
      }`}>
        {/* Top-right theme switch */}
        <div className="absolute top-6 right-6">
          <button
            onClick={() => setTheme(isDark ? 'mechanics' : 'electromagnetism')}
            className={`p-2.5 rounded-xl border transition-all flex items-center gap-2 text-xs font-bold ${
              isDark 
                ? 'bg-zinc-900 border-zinc-800 text-cyan-400 hover:bg-zinc-850' 
                : 'bg-white border-gray-200 text-[#4f378a] hover:bg-gray-50 shadow-sm'
            }`}
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4 text-yellow-400" />
                <span>라이트 모드</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 text-[#4f378a]" />
                <span>다크 모드</span>
              </>
            )}
          </button>
        </div>

        {/* Login Card Container */}
        <div className={`w-full max-w-md p-8 rounded-3xl border transition-all duration-300 ${
          isDark 
            ? 'bg-zinc-950/40 border-zinc-800/80 shadow-[0_0_50px_rgba(6,182,212,0.03)]' 
            : 'bg-white border-gray-100 shadow-[0_10px_30px_rgba(79,55,138,0.04)]'
        }`}>
          <div className="flex flex-col items-center text-center space-y-6">
            <div className={`p-4 rounded-2xl ${
              isDark 
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/25 animate-pulse' 
                : 'bg-[#4f378a]/10 text-[#4f378a] border border-[#4f378a]/20'
            }`}>
              <Atom className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className={`text-xl md:text-2xl font-black tracking-tight ${
                isDark 
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400' 
                  : 'text-[#4f378a]'
              }`}>
                Mechanics Lab Portal
              </h2>
              <p className={`text-xs font-medium max-w-xs ${isDark ? 'text-zinc-400' : 'text-gray-500'}`}>
                실시간 포물선 운동 시뮬레이션 및 다차원 물리학 탐구 모듈 세션 활성화
              </p>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (inputName.trim()) {
                  setStudentName(inputName.trim());
                  setIsLoggedIn(true);
                } else {
                  setStudentName('방문 학생');
                  setIsLoggedIn(true);
                }
              }}
              className="w-full space-y-4"
            >
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block pl-1">
                  학생 이름 또는 닉네임
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    placeholder="이름을 입력하세요 (예: 홍길동)..."
                    maxLength={15}
                    className={`w-full text-xs py-3.5 px-4 rounded-xl border focus:ring-1 focus:outline-none font-medium transition-all ${
                      isDark 
                        ? 'bg-zinc-900 border-zinc-800 text-zinc-100 placeholder-zinc-650 focus:ring-cyan-500' 
                        : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400 focus:ring-[#4f378a]'
                    }`}
                  />
                </div>
              </div>

              <button
                type="submit"
                className={`w-full py-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                  isDark 
                    ? 'bg-cyan-500 text-black hover:bg-cyan-400 font-extrabold shadow-[0_0_20px_rgba(6,182,212,0.15)]' 
                    : 'bg-[#4f378a] hover:bg-[#4f378a]/90 text-white font-extrabold shadow-[0_4px_12px_rgba(79,55,138,0.15)]'
                }`}
              >
                <LogIn className="w-4 h-4" />
                가상 실험실 입장하기
              </button>
            </form>

            <div className={`pt-4 border-t w-full flex items-center justify-center gap-2 text-[10px] font-medium ${
              isDark ? 'border-zinc-900 text-zinc-500' : 'border-gray-100 text-gray-400'
            }`}>
              <Lock className="w-3.5 h-3.5" />
              보안 학생 세션으로 세션 상태 보존됨
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col md:flex-row overflow-x-hidden font-sans transition-colors duration-300 ${
      isDark ? 'bg-[#09090b] text-zinc-100' : 'bg-[#faf8fc] text-gray-800'
    }`}>
      {/* Sidebar Navigation */}
      <Sidebar 
        theme={theme} 
        setTheme={setTheme} 
        onLogout={handleLogout}
      />

      {/* Main Container */}
      <main className="flex-1 md:ml-64 p-6 flex flex-col gap-8 max-w-[1500px] mx-auto w-full pb-20 md:pb-8">
        
        {/* Header Block */}
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-5 dark:border-zinc-800 border-gray-200">
          <div>
            <h2 className={`text-2xl md:text-3xl font-black tracking-tight ${
              isDark 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400' 
                : 'text-[#4f378a]'
            }`}>
              Mechanics Learning Dashboard
            </h2>
            <p className={`text-xs md:text-sm font-medium mt-1.5 ${isDark ? 'text-zinc-400' : 'text-gray-500'}`}>
              실시간 포물선 운동 시뮬레이션 및 다차원 물리학 탐구 모듈
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className={`px-4 py-1.5 rounded-full text-xs font-bold border flex items-center gap-1.5 ${
              isDark 
                ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]' 
                : 'bg-[#4f378a]/10 text-[#4f378a] border-[#4f378a]/20'
            }`}>
              <Atom className={`w-3.5 h-3.5 ${isDark ? 'animate-pulse' : ''}`} />
              {studentName} 님 세션 활성화
            </span>
          </div>
        </header>

        <div className="space-y-8 animate-fade-in">
          {/* Top Section: Concepts & Practice Problems Row */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Concept Learning Panel */}
            <div className="lg:col-span-4 h-full">
              <ConceptCard theme={theme} />
            </div>

            {/* Three Interactive Practice Cards */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <ExampleCalculations theme={theme} />
              <ProjectileQuiz theme={theme} />
              <RelativityQuiz theme={theme} />
            </div>

          </section>

          {/* Bottom Section: Real-time Trajectory Simulator & Numeric Multimeter Displays */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left simulation view */}
            <div className="lg:col-span-8">
              <SimulationPanel 
                theme={theme} 
                params={params} 
                setParams={setParams} 
                computedData={computedData} 
              />
            </div>

            {/* Right readout panel */}
            <div className="lg:col-span-4">
              <DataPanel 
                theme={theme} 
                computedData={computedData} 
              />
            </div>

          </section>
        </div>
      </main>
    </div>
  );
}
