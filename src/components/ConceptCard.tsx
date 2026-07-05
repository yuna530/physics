import { BookOpen, HelpCircle, GraduationCap, X, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { ActiveTheme } from '../types';

interface ConceptCardProps {
  theme: ActiveTheme;
}

interface TopicDetails {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  formulas: string[];
  explanations: string[];
}

export default function ConceptCard({ theme }: ConceptCardProps) {
  const [selectedTopic, setSelectedTopic] = useState<TopicDetails | null>(null);

  const topics: TopicDetails[] = [
    {
      id: 1,
      title: '1. 등가속도 운동 & 중력',
      subtitle: '연직 위로 던진 물체의 운동 방정식과 시간-속도 그래프 분석',
      description: '지면에서 수직(연직) 위로 던져진 물체는 오직 아래 방향으로 중력 가속도(g)만을 받으며 운동합니다.',
      formulas: [
        'v = v₀ - gt',
        'y = v₀t - ½gt²',
        'v² - v₀² = -2gy'
      ],
      explanations: [
        '최고점 도달 시 속도(v)는 0이 됩니다. 따라서 도달 시간 t = v₀/g 입니다.',
        '최고점의 높이 H = v₀² / (2g) 이며, 올라갈 때와 내려갈 때의 시간은 같습니다.',
        '공기 저항을 무시할 때 역학적 에너지는 운동 전 과정에서 보존됩니다.'
      ]
    },
    {
      id: 2,
      title: '2. 포물선 운동 & 에너지 보존',
      subtitle: 'x축 등속도, y축 등가속도 운동의 결합 및 역학적 에너지 보존 법칙',
      description: '비스듬히 던져진 물체는 수평(x) 방향으로 힘을 받지 않아 등속 직선 운동을 하고, 수직(y) 방향으로는 중력을 받아 등가속도 운동을 합니다.',
      formulas: [
        'x(t) = (v₀ cosθ) · t',
        'y(t) = (v₀ sinθ) · t - ½gt²',
        'E = ½mv² + mgy = 일정'
      ],
      explanations: [
        '수평 방향 속도는 항상 v_x = v₀ cosθ 로 변하지 않습니다.',
        '수직 방향 속도는 v_y = v₀ sinθ - gt 이며 최고점에서 v_y = 0 입니다.',
        '어느 지점에서나 역학적 에너지(운동 에너지 + 위치 에너지)는 일정합니다.'
      ]
    },
    {
      id: 3,
      title: '3. 일반 상대성 이론 (기초)',
      subtitle: '등가 원리: 중력 질량과 관성 질량의 동등성 및 시공간의 곡률',
      description: '아인슈타인의 등가 원리에 따르면, 일정한 가속도를 가진 우주선 내부와 중력장 속에 정지해 있는 관찰자는 어떤 물리 실험으로도 구별할 수 없습니다.',
      formulas: [
        'm_inertial = m_gravitational',
        'G_μν = (8πG/c⁴) T_μν'
      ],
      explanations: [
        '등가 원리: 관성력과 중력은 본질적으로 같은 물리 현상입니다.',
        '시공간의 만곡: 질량을 가진 물체는 주변 시공간을 휘게 만들며, 빛 또한 휘어진 시공간의 측지선을 따라 나아갑니다.',
        '중력 시간 지연: 강한 중력장 속에서는 시간이 더 느리게 흘러갑니다.'
      ]
    }
  ];

  const isDark = theme === 'electromagnetism';

  return (
    <div className={`rounded-3xl p-6 transition-all duration-300 flex flex-col h-full ${
      isDark 
        ? 'bg-[#18181b] border border-cyan-500/10 shadow-[0_0_30px_rgba(6,182,212,0.05)]' 
        : 'bg-white border border-gray-100 shadow-sm'
    }`}>
      {/* Title */}
      <div className="flex items-center gap-3 border-b pb-4 mb-4 dark:border-zinc-800 border-gray-100">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
          isDark ? 'bg-cyan-950 text-cyan-400' : 'bg-[#4f378a]/10 text-[#4f378a]'
        }`}>
          <BookOpen className="w-5 h-5" />
        </div>
        <h3 className={`font-semibold text-lg tracking-tight ${isDark ? 'text-zinc-100' : 'text-gray-900'}`}>
          개념학습
        </h3>
      </div>

      {/* List */}
      <div className="flex-1 flex flex-col gap-3">
        {topics.map((topic) => (
          <div
            key={topic.id}
            onClick={() => setSelectedTopic(topic)}
            className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 group border ${
              isDark 
                ? 'bg-zinc-900/40 border-zinc-800 hover:border-cyan-500/30 hover:bg-zinc-900/80' 
                : 'bg-[#faf8fd] border-[#f3eefd] hover:border-[#4f378a]/30 hover:bg-[#faf8fd]/80'
            }`}
          >
            <div className="flex justify-between items-start gap-2">
              <h4 className={`font-semibold text-sm transition-colors ${
                isDark 
                  ? 'text-zinc-100 group-hover:text-cyan-400' 
                  : 'text-[#4f378a] group-hover:text-[#4f378a]/80'
              }`}>
                {topic.title}
              </h4>
              <ChevronRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-all ${
                isDark ? 'text-cyan-400' : 'text-[#4f378a]'
              }`} />
            </div>
            <p className={`text-xs mt-1.5 leading-relaxed line-clamp-2 ${
              isDark ? 'text-zinc-400' : 'text-gray-600'
            }`}>
              {topic.subtitle}
            </p>
          </div>
        ))}
      </div>

      {/* View All Concepts Trigger */}
      <button 
        onClick={() => setSelectedTopic(topics[0])}
        className={`mt-4 w-full font-semibold text-xs py-3 rounded-xl transition-all duration-200 ${
          isDark 
            ? 'bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20' 
            : 'bg-[#4f378a] hover:bg-[#4f378a]/90 text-white shadow-sm shadow-[#4f378a]/20'
        }`}
      >
        전체 개념 보기
      </button>

      {/* Expandable Topic Drawer / Modal Overlay */}
      {selectedTopic && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className={`w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 transform scale-100 border ${
            isDark 
              ? 'bg-[#18181b] border-cyan-500/30 text-zinc-100' 
              : 'bg-white border-gray-200 text-gray-800'
          }`}>
            {/* Modal Header */}
            <div className={`p-5 flex justify-between items-start border-b ${
              isDark ? 'border-zinc-800 bg-zinc-900/50' : 'border-gray-100 bg-gray-50'
            }`}>
              <div className="flex items-center gap-2.5">
                <GraduationCap className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-[#4f378a]'}`} />
                <div>
                  <span className="text-[10px] tracking-wider uppercase font-extrabold text-zinc-400 block">Concept Details</span>
                  <h3 className={`font-bold text-sm ${isDark ? 'text-zinc-100' : 'text-gray-900'}`}>
                    {selectedTopic.title.split('. ')[1]}
                  </h3>
                </div>
              </div>
              <button 
                onClick={() => setSelectedTopic(null)}
                className={`p-1.5 rounded-lg border transition-colors ${
                  isDark ? 'border-zinc-800 hover:bg-zinc-800 text-zinc-400' : 'border-gray-200 hover:bg-gray-100 text-gray-500'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              <div>
                <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 block mb-1">개요</span>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-300' : 'text-gray-600'}`}>
                  {selectedTopic.description}
                </p>
              </div>

              {/* Formulas Display */}
              <div>
                <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 block mb-2">주요 공식</span>
                <div className="grid gap-2">
                  {selectedTopic.formulas.map((formula, idx) => (
                    <div 
                      key={idx} 
                      className={`p-3 rounded-xl font-mono text-xs font-bold flex items-center justify-between border ${
                        isDark 
                          ? 'bg-zinc-950/60 border-cyan-500/20 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.02)]' 
                          : 'bg-[#faf8fd] border-[#f0eafd] text-[#4f378a]'
                      }`}
                    >
                      <span>{formula}</span>
                      <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded-full bg-current/10 opacity-70">
                        Formula {idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-step breakdown */}
              <div>
                <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 block mb-2">핵심 분석</span>
                <ul className="space-y-2.5">
                  {selectedTopic.explanations.map((exp, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start">
                      <div className={`w-5 h-5 rounded-full text-[10px] font-extrabold flex items-center justify-center shrink-0 mt-0.5 ${
                        isDark ? 'bg-cyan-500/15 text-cyan-400' : 'bg-[#4f378a]/10 text-[#4f378a]'
                      }`}>
                        {idx + 1}
                      </div>
                      <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-gray-600'}`}>
                        {exp}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className={`p-4 flex justify-end border-t ${
              isDark ? 'border-zinc-800 bg-zinc-900/20' : 'border-gray-100 bg-gray-50'
            }`}>
              <button
                onClick={() => setSelectedTopic(null)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isDark 
                    ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-100' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
