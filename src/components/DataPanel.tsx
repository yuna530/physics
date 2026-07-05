import { BarChart3, MoveRight, MoveUp, Timer, Hourglass } from 'lucide-react';
import { ActiveTheme, SimulationData } from '../types';

interface DataPanelProps {
  theme: ActiveTheme;
  computedData: SimulationData;
}

export default function DataPanel({ theme, computedData }: DataPanelProps) {
  const isDark = theme === 'electromagnetism';

  const metrics = [
    {
      id: 'range',
      title: '수평 도달 거리 (R)',
      value: computedData.range.toFixed(1),
      unit: 'm',
      icon: MoveRight,
      colorClass: isDark ? 'border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.15)] bg-cyan-950/20' : 'border-l-4 border-l-[#4f378a] bg-[#faf8fd]',
      textValueClass: isDark ? 'text-cyan-400' : 'text-[#4f378a]',
    },
    {
      id: 'maxHeight',
      title: '최고 높이 (H)',
      value: computedData.maxHeight.toFixed(1),
      unit: 'm',
      icon: MoveUp,
      colorClass: isDark ? 'border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.15)] bg-cyan-950/20' : 'border-l-4 border-l-[#6750a4] bg-[#faf8fd]',
      textValueClass: isDark ? 'text-cyan-400' : 'text-[#6750a4]',
    },
    {
      id: 'timeToPeak',
      title: '최고점 도달 시간',
      value: computedData.timeToPeak.toFixed(2),
      unit: 's',
      icon: Timer,
      colorClass: isDark ? 'border-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.15)] bg-yellow-950/10' : 'border-l-4 border-l-[#63597c] bg-[#f8f2fa]',
      textValueClass: isDark ? 'text-yellow-400' : 'text-[#63597c]',
    },
    {
      id: 'totalTime',
      title: '지면 도달 시간',
      value: computedData.totalTime.toFixed(2),
      unit: 's',
      icon: Hourglass,
      colorClass: isDark ? 'border-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.15)] bg-yellow-950/10' : 'border-l-4 border-l-[#e1d4fd] bg-[#f2ecf4]',
      textValueClass: isDark ? 'text-yellow-400' : 'text-[#845ef7]',
    },
  ];

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Title */}
      <div className="flex items-center gap-2 mb-1 shrink-0">
        <BarChart3 className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-[#4f378a]'}`} />
        <h3 className={`font-bold text-sm ${isDark ? 'text-zinc-200' : 'text-gray-900'}`}>
          실시간 데이터
        </h3>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-1 gap-3.5 flex-1">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.id}
              className={`rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 border ${
                isDark 
                  ? `${metric.colorClass} border-zinc-800` 
                  : 'bg-white border-gray-100 shadow-sm'
              } ${!isDark ? metric.colorClass : ''}`}
            >
              {/* Card Label */}
              <span className={`text-[11px] font-bold tracking-tight ${
                isDark ? 'text-zinc-400' : 'text-gray-500'
              }`}>
                {metric.title}
              </span>

              {/* Card Value & Icon Row */}
              <div className="flex items-end justify-between mt-2">
                <span className={`font-mono text-2xl font-black ${metric.textValueClass}`}>
                  {metric.value}
                  <span className={`text-xs font-normal ml-1 font-sans ${
                    isDark ? 'text-zinc-400' : 'text-zinc-500'
                  }`}>
                    {metric.unit}
                  </span>
                </span>
                
                <div className={`p-1.5 rounded-lg ${
                  isDark ? 'bg-zinc-900/80 text-zinc-400' : 'bg-gray-50 text-gray-400'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
