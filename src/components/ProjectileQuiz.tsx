import { CheckCircle2, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { ActiveTheme } from '../types';

interface ProjectileQuizProps {
  theme: ActiveTheme;
}

export default function ProjectileQuiz({ theme }: ProjectileQuizProps) {
  const [ans1, setAns1] = useState('');
  const [ans2, setAns2] = useState('');
  const [ans3, setAns3] = useState('');

  const [feedback1, setFeedback1] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [feedback2, setFeedback2] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [feedback3, setFeedback3] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const checkPart1 = () => {
    const val = parseFloat(ans1);
    if (isNaN(val)) {
      setFeedback1({ isCorrect: false, text: '값을 입력해 주세요.' });
    } else if (val === 6) {
      setFeedback1({ isCorrect: true, text: '정답입니다! (ΔU = mgh = 0.2 × 10 × 3 = 6J)' });
    } else {
      setFeedback1({ isCorrect: false, text: '오답입니다. (힌트: mgh)' });
    }
  };

  const checkPart2 = () => {
    if (!ans2) {
      setFeedback2({ isCorrect: false, text: '선택해 주세요.' });
    } else if (ans2 === 'no') {
      setFeedback2({ isCorrect: true, text: '정답입니다! (공기 저항이 없으므로 역학적 에너지는 보존됩니다)' });
    } else {
      setFeedback2({ isCorrect: false, text: '오답입니다. (공기 저항을 무시하는 조건입니다)' });
    }
  };

  const checkPart3 = () => {
    const val = parseFloat(ans3);
    if (isNaN(val)) {
      setFeedback3({ isCorrect: false, text: '값을 입력해 주세요.' });
    } else if (val === 4) {
      setFeedback3({ isCorrect: true, text: '정답입니다! (총 에너지 10J - 위치 에너지 6J = 4J)' });
    } else {
      setFeedback3({ isCorrect: false, text: '오답입니다. (최고점에서 역학적 에너지 보존을 적용해 보세요)' });
    }
  };

  const isDark = theme === 'electromagnetism';

  // Hotlink URL for Diagram 2 from the prompt
  const diagramUrl = "https://lh3.googleusercontent.com/aida/AP1WRLvOJEeUOJtUz6SxMAJ8D0LRWuHi96M5LCXQVwI2gKuRyrhQC3WW6GBI4RKVd4VuLaz-35_sAcHwE_IePUrMIAX3IVMdopc9XblYfadmcOUfR3dBI5ZcAxLMkzZJo-waEhWl___xd7goxJ-fB34r3B9zCYq4sqHRgnLSaZIp_vo77acdQ22KHco0iX6YgCAV0FroIdpb7PkgFPcDG5QmCBxVPHR7ltzEa00suJ-ldhCIF5rqlXZzf6JxpXw";

  return (
    <div className={`rounded-3xl p-5 transition-all duration-300 flex flex-col h-full ${
      isDark 
        ? 'bg-[#18181b] border border-cyan-500/10 shadow-[0_0_30px_rgba(6,182,212,0.05)]' 
        : 'bg-white border border-gray-100 shadow-sm'
    }`}>
      {/* Title */}
      <h4 className={`font-bold text-sm mb-3 ${isDark ? 'text-zinc-200' : 'text-gray-900'}`}>
        개념 확인 문제: 포물선 운동
      </h4>

      {/* Physics Diagram */}
      <div className={`h-36 rounded-2xl overflow-hidden relative border mb-3 flex items-center justify-center ${
        isDark ? 'bg-zinc-950/60 border-zinc-800/80' : 'bg-gray-50 border-gray-100'
      }`}>
        <svg viewBox="0 0 320 140" className="w-full h-full font-sans select-none max-w-[280px]">
          {/* Ground Line */}
          <line 
            x1="20" y1="110" x2="300" y2="110" 
            className={`${isDark ? 'stroke-zinc-700' : 'stroke-gray-300'} stroke-2`} 
          />
          {/* Tick marks on ground for P, Q-proj, and R */}
          <line x1="40" y1="110" x2="40" y2="114" className={isDark ? 'stroke-zinc-600' : 'stroke-gray-400'} />
          <line x1="280" y1="110" x2="280" y2="114" className={isDark ? 'stroke-zinc-600' : 'stroke-gray-400'} />
          <line x1="160" y1="110" x2="160" y2="114" className={isDark ? 'stroke-zinc-600' : 'stroke-gray-400'} />

          {/* Height Dashed Line */}
          <line 
            x1="160" y1="45" x2="160" y2="110" 
            className={`${isDark ? 'stroke-cyan-500/40' : 'stroke-[#4f378a]/40'} stroke-1`}
            strokeDasharray="4 3"
          />
          {/* Height text */}
          <text 
            x="166" y="82" 
            className={`text-[10px] font-bold ${isDark ? 'fill-cyan-400' : 'fill-[#4f378a]'}`}
          >
            3 m
          </text>

          {/* Parabolic Path */}
          <path 
            d="M 40,110 Q 160,-20 280,110" 
            fill="none" 
            className={`${isDark ? 'stroke-cyan-400' : 'stroke-[#4f378a]'} stroke-2`}
            strokeDasharray="1"
          />

          {/* Launch Velocity Vector at P */}
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" className={isDark ? 'fill-cyan-400' : 'fill-[#4f378a]'} />
            </marker>
            <marker id="arrow-gray" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" className={isDark ? 'fill-zinc-500' : 'fill-gray-400'} />
            </marker>
          </defs>
          
          <line 
            x1="40" y1="110" x2="68" y2="82" 
            className={`${isDark ? 'stroke-cyan-400' : 'stroke-[#4f378a]'} stroke-2`}
            markerEnd="url(#arrow)"
          />
          <text 
            x="72" y="78" 
            className={`text-[9px] font-bold ${isDark ? 'fill-cyan-400' : 'fill-[#4f378a]'}`}
          >
            v₀ = 10 m/s
          </text>

          {/* Projectile at point Q (apex) */}
          <circle 
            cx="160" cy="45" r="5.5" 
            className={`${isDark ? 'fill-cyan-400 stroke-zinc-950' : 'fill-[#4f378a] stroke-white'} stroke-2`}
          />
          <text 
            x="170" y="42" 
            className={`text-[9px] font-bold ${isDark ? 'fill-zinc-400' : 'fill-gray-600'}`}
          >
            m = 0.2 kg
          </text>

          {/* Point Labels (P, Q, R) */}
          <text 
            x="38" y="125" 
            className={`text-[11px] font-black ${isDark ? 'fill-zinc-300' : 'fill-gray-800'}`}
          >
            P
          </text>
          <text 
            x="156" y="28" 
            className={`text-[11px] font-black ${isDark ? 'fill-zinc-300' : 'fill-gray-800'}`}
          >
            Q
          </text>
          <text 
            x="276" y="125" 
            className={`text-[11px] font-black ${isDark ? 'fill-zinc-300' : 'fill-gray-800'}`}
          >
            R
          </text>

          {/* Gravity Indicator */}
          <g transform="translate(265, 20)">
            <line x1="0" y1="0" x2="0" y2="15" className={`${isDark ? 'stroke-zinc-500' : 'stroke-gray-400'} stroke-1.5`} markerEnd="url(#arrow-gray)" />
            <text x="5" y="11" className={`text-[8.5px] font-bold ${isDark ? 'fill-zinc-500' : 'fill-gray-400'}`}>g = 10 m/s²</text>
          </g>
        </svg>
      </div>

      {/* Problem Description */}
      <p className={`text-xs leading-relaxed mb-4 ${
        isDark ? 'text-zinc-400' : 'text-gray-600'
      }`}>
        그림은 지면의 P점에서 10 m/s의 속력으로 비스듬히 위로 던진 질량이 0.2 kg인 물체가 최고 높이 3 m인 Q점까지 올라갔다 R점에 떨어지는 것을 나타낸 것이다. (단, g=10 m/s², 공기 저항 무시)
      </p>

      {/* Quizzes Form */}
      <div className="space-y-4 flex-1">
        {/* Part A */}
        <div className="space-y-1.5 p-3 rounded-2xl bg-zinc-500/5 border border-zinc-700/5 dark:border-zinc-800/60">
          <p className={`text-xs font-semibold ${isDark ? 'text-zinc-300' : 'text-gray-800'}`}>
            ㄱ. P→Q 중력 퍼텐셜 에너지 증가량은?
          </p>
          <div className="flex items-center gap-2">
            <input 
              type="number"
              value={ans1}
              onChange={(e) => setAns1(e.target.value)}
              placeholder="0"
              className={`w-16 text-right font-mono font-bold text-xs p-1 rounded-md border focus:ring-1 focus:outline-none ${
                isDark 
                  ? 'bg-zinc-900 border-zinc-700 text-cyan-400 focus:ring-cyan-500' 
                  : 'bg-white border-gray-200 text-[#4f378a] focus:ring-[#4f378a]'
              }`}
            />
            <span className={`text-xs font-bold ${isDark ? 'text-zinc-400' : 'text-gray-600'}`}>J</span>
            <button 
              onClick={checkPart1}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                isDark 
                  ? 'bg-cyan-500/15 text-cyan-400 hover:bg-cyan-500/25 border border-cyan-500/20' 
                  : 'bg-[#4f378a]/10 hover:bg-[#4f378a]/20 text-[#4f378a]'
              }`}
            >
              확인
            </button>
          </div>
          {feedback1 && (
            <p className={`text-[10px] font-medium flex items-center gap-1 mt-1 ${
              feedback1.isCorrect ? 'text-green-500 dark:text-cyan-400' : 'text-red-500'
            }`}>
              {feedback1.isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
              <span>{feedback1.text}</span>
            </p>
          )}
        </div>

        {/* Part B */}
        <div className="space-y-1.5 p-3 rounded-2xl bg-zinc-500/5 border border-zinc-700/5 dark:border-zinc-800/60">
          <p className={`text-xs font-semibold ${isDark ? 'text-zinc-300' : 'text-gray-800'}`}>
            ㄴ. Q→R 이동 중 역학적 에너지가 감소하는가?
          </p>
          <div className="flex items-center gap-2">
            <select
              value={ans2}
              onChange={(e) => setAns2(e.target.value)}
              className={`text-xs p-1 rounded-md border focus:ring-1 focus:outline-none font-bold ${
                isDark 
                  ? 'bg-zinc-900 border-zinc-700 text-cyan-400 focus:ring-cyan-500' 
                  : 'bg-white border-gray-200 text-gray-800 focus:ring-[#4f378a]'
              }`}
            >
              <option value="">선택</option>
              <option value="yes">예</option>
              <option value="no">아니오</option>
            </select>
            <button 
              onClick={checkPart2}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                isDark 
                  ? 'bg-cyan-500/15 text-cyan-400 hover:bg-cyan-500/25 border border-cyan-500/20' 
                  : 'bg-[#4f378a]/10 hover:bg-[#4f378a]/20 text-[#4f378a]'
              }`}
            >
              확인
            </button>
          </div>
          {feedback2 && (
            <p className={`text-[10px] font-medium flex items-center gap-1 mt-1 ${
              feedback2.isCorrect ? 'text-green-500 dark:text-cyan-400' : 'text-red-500'
            }`}>
              {feedback2.isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
              <span>{feedback2.text}</span>
            </p>
          )}
        </div>

        {/* Part C */}
        <div className="space-y-1.5 p-3 rounded-2xl bg-zinc-500/5 border border-zinc-700/5 dark:border-zinc-800/60">
          <p className={`text-xs font-semibold ${isDark ? 'text-zinc-300' : 'text-gray-800'}`}>
            ㄷ. Q점에서 운동 에너지는?
          </p>
          <div className="flex items-center gap-2">
            <input 
              type="number"
              value={ans3}
              onChange={(e) => setAns3(e.target.value)}
              placeholder="0"
              className={`w-16 text-right font-mono font-bold text-xs p-1 rounded-md border focus:ring-1 focus:outline-none ${
                isDark 
                  ? 'bg-zinc-900 border-zinc-700 text-cyan-400 focus:ring-cyan-500' 
                  : 'bg-white border-gray-200 text-[#4f378a] focus:ring-[#4f378a]'
              }`}
            />
            <span className={`text-xs font-bold ${isDark ? 'text-zinc-400' : 'text-gray-600'}`}>J</span>
            <button 
              onClick={checkPart3}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                isDark 
                  ? 'bg-cyan-500/15 text-cyan-400 hover:bg-cyan-500/25 border border-cyan-500/20' 
                  : 'bg-[#4f378a]/10 hover:bg-[#4f378a]/20 text-[#4f378a]'
              }`}
            >
              확인
            </button>
          </div>
          {feedback3 && (
            <p className={`text-[10px] font-medium flex items-center gap-1 mt-1 ${
              feedback3.isCorrect ? 'text-green-500 dark:text-cyan-400' : 'text-red-500'
            }`}>
              {feedback3.isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
              <span>{feedback3.text}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
