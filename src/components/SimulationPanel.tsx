import { Play, Pause, RotateCcw, Sliders, Sparkles, HelpCircle } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { ActiveTheme, SimulationParams, SimulationData } from '../types';

interface SimulationPanelProps {
  theme: ActiveTheme;
  params: SimulationParams;
  setParams: (params: SimulationParams) => void;
  computedData: SimulationData;
}

export default function SimulationPanel({ theme, params, setParams, computedData }: SimulationPanelProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const isDark = theme === 'electromagnetism';

  // Quick preset loader
  const applyPreset = (presetName: string) => {
    setIsPlaying(false);
    setCurrentTime(0);
    switch (presetName) {
      case 'default':
        setParams({ velocity: 20, angle: 45, height: 0, mass: 0.2, gravity: 10 });
        break;
      case 'cliff':
        setParams({ velocity: 15, angle: 30, height: 25, mass: 0.5, gravity: 10 });
        break;
      case 'vertical':
        setParams({ velocity: 25, angle: 90, height: 0, mass: 0.2, gravity: 10 });
        break;
      case 'horizontal':
        setParams({ velocity: 20, angle: 0, height: 30, mass: 1.0, gravity: 10 });
        break;
    }
  };

  // Trajectory equation helpers
  const getCoordinatesAtTime = (t: number) => {
    const angleRad = (params.angle * Math.PI) / 180;
    const x = params.velocity * Math.cos(angleRad) * t;
    const y = params.height + (params.velocity * Math.sin(angleRad) * t) - (0.5 * params.gravity * t * t);
    return { x, y: Math.max(0, y) };
  };

  // Playback animation controller
  useEffect(() => {
    if (isPlaying) {
      lastTimeRef.current = performance.now();
      const tick = (now: number) => {
        const delta = (now - lastTimeRef.current) / 1000; // convert to seconds
        lastTimeRef.current = now;

        setCurrentTime((prev) => {
          const next = prev + delta;
          if (next >= computedData.totalTime) {
            setIsPlaying(false);
            return computedData.totalTime;
          }
          return next;
        });
        animationRef.current = requestAnimationFrame(tick);
      };
      animationRef.current = requestAnimationFrame(tick);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, computedData.totalTime]);

  const handlePlayPause = () => {
    if (currentTime >= computedData.totalTime) {
      setCurrentTime(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  // Generate coordinate array for SVG trajectory drawing
  const samplePointsCount = 100;
  const pathPoints: { x: number; y: number }[] = [];
  for (let i = 0; i <= samplePointsCount; i++) {
    const t = (i / samplePointsCount) * computedData.totalTime;
    pathPoints.push(getCoordinatesAtTime(t));
  }

  // Trajectory trail up to current time
  const trailPoints: { x: number; y: number }[] = [];
  const currentTrailSteps = 80;
  for (let i = 0; i <= currentTrailSteps; i++) {
    const t = (i / currentTrailSteps) * currentTime;
    trailPoints.push(getCoordinatesAtTime(t));
  }

  // Map physics units to SVG coordinates with maintained aspect ratio
  // Width: 800px, Height: 350px. Margins: Left=60, Right=60, Bottom=60, Top=40
  const svgW = 800;
  const svgH = 350;
  const marginL = 60;
  const marginR = 60;
  const marginB = 60;
  const marginT = 40;

  const drawableW = svgW - marginL - marginR;
  const drawableH = svgH - marginB - marginT;

  // Find max boundaries to scale properly
  const maxXBound = Math.max(computedData.range, 10);
  const maxYBound = Math.max(computedData.maxHeight, 10);

  const scaleX = drawableW / maxXBound;
  const scaleY = drawableH / maxYBound;
  const scale = Math.min(scaleX, scaleY); // uniform scale for true aspect ratio

  const mapX = (physX: number) => marginL + physX * scale;
  const mapY = (physY: number) => svgH - marginB - physY * scale;

  // Build SVG path strings
  const buildSvgPath = (points: { x: number; y: number }[]) => {
    if (points.length === 0) return '';
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${mapX(p.x)} ${mapY(p.y)}`).join(' ');
  };

  const fullTrajectoryPath = buildSvgPath(pathPoints);
  const activeTrailPath = buildSvgPath(trailPoints);

  // Current animated tracker coordinates
  const currentPos = getCoordinatesAtTime(currentTime);

  return (
    <div className={`rounded-3xl p-6 transition-all duration-300 flex flex-col gap-6 ${
      isDark 
        ? 'bg-[#18181b] border border-cyan-500/10 shadow-[0_0_30px_rgba(6,182,212,0.05)]' 
        : 'bg-white border border-gray-100 shadow-sm'
    }`}>
      {/* Title with Preset Selectors */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 dark:border-zinc-800 border-gray-100">
        <div className="flex items-center gap-2">
          <Sparkles className={`w-5 h-5 ${isDark ? 'text-cyan-400 animate-pulse' : 'text-[#4f378a]'}`} />
          <h4 className={`font-bold text-sm ${isDark ? 'text-zinc-200' : 'text-gray-900'}`}>
            실시간 포물선 운동 시뮬레이션
          </h4>
        </div>

        {/* Preset list */}
        <div className="flex flex-wrap gap-1.5">
          <button 
            onClick={() => applyPreset('default')}
            className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-colors border ${
              isDark 
                ? 'border-zinc-800 hover:border-cyan-500/30 hover:bg-zinc-900 text-zinc-400' 
                : 'border-gray-200 hover:border-[#4f378a]/30 hover:bg-gray-50 text-gray-600'
            }`}
          >
            기본 투사
          </button>
          <button 
            onClick={() => applyPreset('cliff')}
            className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-colors border ${
              isDark 
                ? 'border-zinc-800 hover:border-cyan-500/30 hover:bg-zinc-900 text-zinc-400' 
                : 'border-gray-200 hover:border-[#4f378a]/30 hover:bg-gray-50 text-gray-600'
            }`}
          >
            절벽 던지기
          </button>
          <button 
            onClick={() => applyPreset('vertical')}
            className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-colors border ${
              isDark 
                ? 'border-zinc-800 hover:border-cyan-500/30 hover:bg-zinc-900 text-zinc-400' 
                : 'border-gray-200 hover:border-[#4f378a]/30 hover:bg-gray-50 text-gray-600'
            }`}
          >
            수직 발사
          </button>
          <button 
            onClick={() => applyPreset('horizontal')}
            className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-colors border ${
              isDark 
                ? 'border-zinc-800 hover:border-cyan-500/30 hover:bg-zinc-900 text-zinc-400' 
                : 'border-gray-200 hover:border-[#4f378a]/30 hover:bg-gray-50 text-gray-600'
            }`}
          >
            수평 낙하
          </button>
        </div>
      </div>

      {/* Trajectory Viewport SVG Container */}
      <div className={`relative rounded-2xl overflow-hidden border ${
        isDark 
          ? 'bg-[#0d0d0d] border-zinc-800' 
          : 'bg-[#fafafa] border-gray-100 shadow-[inset_0_2px_8px_rgba(0,0,0,0.02)]'
      }`}>
        <svg 
          viewBox={`0 0 ${svgW} ${svgH}`} 
          className="w-full h-auto overflow-visible"
        >
          {/* Grid lines */}
          <g className="opacity-15 dark:opacity-5" stroke={isDark ? '#06b6d4' : '#4f378a'} strokeWidth="0.5" strokeDasharray="3 3">
            {Array.from({ length: 15 }).map((_, i) => {
              const xCoord = marginL + (drawableW / 14) * i;
              return <line key={`gx-${i}`} x1={xCoord} y1={marginT} x2={xCoord} y2={svgH - marginB} />;
            })}
            {Array.from({ length: 8 }).map((_, i) => {
              const yCoord = marginT + (drawableH / 7) * i;
              return <line key={`gy-${i}`} x1={marginL} y1={yCoord} x2={svgW - marginR} y2={yCoord} />;
            })}
          </g>

          {/* Axes */}
          <g stroke={isDark ? '#333' : '#e2e8f0'} strokeWidth="1.5">
            {/* Ground / X-axis */}
            <line x1={marginL - 10} y1={svgH - marginB} x2={svgW - marginR + 20} y2={svgH - marginB} />
            {/* Vertical Y-axis */}
            <line x1={marginL} y1={marginT - 10} x2={marginL} y2={svgH - marginB + 10} />
          </g>

          {/* Axis Labels */}
          <text x={svgW - marginR + 30} y={svgH - marginB + 4} textAnchor="start" className="text-[10px] font-bold fill-zinc-500">X (m)</text>
          <text x={marginL} y={marginT - 16} textAnchor="middle" className="text-[10px] font-bold fill-zinc-500">Y (m)</text>

          {/* Theoretical Trajectory Path (Dotted) */}
          <path 
            d={fullTrajectoryPath} 
            fill="none" 
            stroke={isDark ? 'rgba(6, 182, 212, 0.15)' : 'rgba(79, 55, 138, 0.15)'} 
            strokeWidth="2.5" 
            strokeDasharray="4 4" 
          />

          {/* Real-time active trail path */}
          {activeTrailPath && (
            <path 
              d={activeTrailPath} 
              fill="none" 
              stroke={isDark ? '#00f2fe' : '#4f378a'} 
              strokeWidth="3.5" 
              strokeLinecap="round"
              className={isDark ? 'drop-shadow-[0_0_8px_rgba(0,242,254,0.6)]' : ''}
            />
          )}

          {/* Launcher Base Indicator */}
          <circle 
            cx={mapX(0)} 
            cy={mapY(params.height)} 
            r="5" 
            fill={isDark ? '#facc15' : '#6750a4'} 
            stroke={isDark ? '#00f2fe' : '#ffffff'} 
            strokeWidth="1.5"
          />

          {/* Moving Animated Bullet Particle */}
          <g transform={`translate(${mapX(currentPos.x)}, ${mapY(currentPos.y)})`}>
            {/* Ambient glow in dark theme */}
            {isDark && (
              <circle r="12" fill="rgba(0, 242, 254, 0.25)" className="animate-ping" />
            )}
            <circle 
              r="6.5" 
              fill={isDark ? '#00f2fe' : '#4f378a'} 
              stroke="#ffffff" 
              strokeWidth="2"
              className="drop-shadow-md"
            />
          </g>

          {/* Ground Mark Flag */}
          {currentTime >= computedData.totalTime && (
            <g transform={`translate(${mapX(computedData.range)}, ${mapY(0)})`}>
              <line x1="0" y1="0" x2="0" y2="-15" stroke={isDark ? '#00f2fe' : '#4f378a'} strokeWidth="1.5" />
              <polygon points="0,-15 12,-11 0,-7" fill={isDark ? '#00f2fe' : '#4f378a'} />
              <text x="4" y="-20" textAnchor="middle" className="text-[9px] font-mono font-bold fill-zinc-400">
                {computedData.range.toFixed(1)}m
              </text>
            </g>
          )}
        </svg>

        {/* Floating Animation Speed / Time readout overlay */}
        <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full font-mono text-[10px] font-bold border flex items-center gap-2 ${
          isDark 
            ? 'bg-zinc-950/80 border-cyan-500/20 text-cyan-400' 
            : 'bg-white/80 border-gray-200 text-[#4f378a] shadow-sm'
        }`}>
          <span>Time: <span className="text-zinc-400 dark:text-zinc-200">{currentTime.toFixed(2)}s</span> / {computedData.totalTime.toFixed(2)}s</span>
        </div>
      </div>

      {/* Simulation Controls: Play, Pause, Slider Panel */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Playback Button Group */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handlePlayPause}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
              isDark 
                ? 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_15px_rgba(6,182,212,0.3)]' 
                : 'bg-[#4f378a] hover:bg-[#4f378a]/90 text-white shadow-md'
            }`}
          >
            {isPlaying ? <Pause className="w-5.5 h-5.5 fill-current" /> : <Play className="w-5.5 h-5.5 fill-current ml-0.5" />}
          </button>
          <button
            onClick={handleReset}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all ${
              isDark 
                ? 'border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-300' 
                : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-700 shadow-sm'
            }`}
            title="Reset Simulation"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {/* Dual Column Sliders Controls Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          
          {/* Velocity Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className={`font-semibold ${isDark ? 'text-zinc-300' : 'text-gray-700'}`}>초기 속도 (v₀)</span>
              <span className={`font-mono font-bold ${isDark ? 'text-cyan-400' : 'text-[#4f378a]'}`}>{params.velocity} m/s</span>
            </div>
            <input 
              type="range"
              min="0"
              max="40"
              step="1"
              value={params.velocity}
              onChange={(e) => {
                setParams({ ...params, velocity: parseInt(e.target.value) });
                setCurrentTime(0);
              }}
              className="w-full accent-cyan-500 dark:accent-cyan-400 h-1.5 bg-zinc-700/10 dark:bg-zinc-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Launch Angle Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className={`font-semibold ${isDark ? 'text-zinc-300' : 'text-gray-700'}`}>발사 각도 (θ)</span>
              <span className={`font-mono font-bold ${isDark ? 'text-cyan-400' : 'text-[#4f378a]'}`}>{params.angle}°</span>
            </div>
            <input 
              type="range"
              min="0"
              max="90"
              step="1"
              value={params.angle}
              onChange={(e) => {
                setParams({ ...params, angle: parseInt(e.target.value) });
                setCurrentTime(0);
              }}
              className="w-full accent-cyan-500 dark:accent-cyan-400 h-1.5 bg-zinc-700/10 dark:bg-zinc-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Initial Height Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className={`font-semibold ${isDark ? 'text-zinc-300' : 'text-gray-700'}`}>초기 높이 (h₀)</span>
              <span className={`font-mono font-bold ${isDark ? 'text-cyan-400' : 'text-[#4f378a]'}`}>{params.height} m</span>
            </div>
            <input 
              type="range"
              min="0"
              max="50"
              step="1"
              value={params.height}
              onChange={(e) => {
                setParams({ ...params, height: parseInt(e.target.value) });
                setCurrentTime(0);
              }}
              className="w-full accent-cyan-500 dark:accent-cyan-400 h-1.5 bg-zinc-700/10 dark:bg-zinc-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Mass Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className={`font-semibold ${isDark ? 'text-zinc-300' : 'text-gray-700'}`}>물체 질량 (m)</span>
              <span className={`font-mono font-bold ${isDark ? 'text-cyan-400' : 'text-[#4f378a]'}`}>{params.mass.toFixed(1)} kg</span>
            </div>
            <input 
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={params.mass}
              onChange={(e) => {
                setParams({ ...params, mass: parseFloat(e.target.value) });
              }}
              className="w-full accent-cyan-500 dark:accent-cyan-400 h-1.5 bg-zinc-700/10 dark:bg-zinc-800 rounded-lg cursor-pointer"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
