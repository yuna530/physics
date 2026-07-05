import { CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { ActiveTheme } from '../types';

interface ExampleCalculationsProps {
  theme: ActiveTheme;
}

export default function ExampleCalculations({ theme }: ExampleCalculationsProps) {
  const [ansTime, setAnsTime] = useState('');
  const [ansHeight, setAnsHeight] = useState('');
  const [ansVel, setAnsVel] = useState('');

  const [feedbackTime, setFeedbackTime] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [feedbackHeight, setFeedbackHeight] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [feedbackVel, setFeedbackVel] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const checkAnswers = () => {
    // Check Peak Time: 2s
    const tVal = parseFloat(ansTime);
    if (isNaN(tVal)) {
      setFeedbackTime({ isCorrect: false, text: '숫자를 입력해 주세요.' });
    } else if (tVal === 2) {
      setFeedbackTime({ isCorrect: true, text: '정답! (t = v₀/g = 20/10 = 2초)' });
    } else {
      setFeedbackTime({ isCorrect: false, text: '다시 계산해 보세요. (힌트: 최고점에서는 v=0)' });
    }

    // Check Max Height: 40m
    const hVal = parseFloat(ansHeight);
    if (isNaN(hVal)) {
      setFeedbackHeight({ isCorrect: false, text: '숫자를 입력해 주세요.' });
    } else if (hVal === 40) {
      setFeedbackHeight({ isCorrect: true, text: '정답! (H = 건물 높이 20m + 상승 높이 20m = 40m)' });
    } else {
      setFeedbackHeight({ isCorrect: false, text: '다시 계산해 보세요. (상승한 높이에 건물 높이를 더해야 합니다)' });
    }

    // Check Ground speed: sqrt(800) ≈ 28.28
    const vVal = parseFloat(ansVel);
    if (isNaN(vVal)) {
      setFeedbackVel({ isCorrect: false, text: '숫자를 입력해 주세요.' });
    } else if (Math.abs(vVal - 28.28) <= 0.1 || Math.abs(vVal - 28.3) <= 0.1) {
      setFeedbackVel({ isCorrect: true, text: '정답! (v = √2gH = √800 ≈ 28.28 m/s)' });
    } else {
      setFeedbackVel({ isCorrect: false, text: '다시 계산해 보세요. (힌트: √2gH)' });
    }
  };

  const isDark = theme === 'electromagnetism';

  // Hotlink URL for Diagram 1 from the prompt
  const diagramUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuBSgOP0Bq5yMpfuY1LNXc4QUBeLxhtYlfCj3V_EHbiWo67LD3CfOLKldndd7Ui-EuwFk8-JtQmRGYblEtAnpig7LmATQRhFZMj0WmhSnxNB8Pnf6ZxP4XUBuh5eY7qV25nf9ieYYLfgRSzhPIddfBCiVkTstjTiU2nzgTAouDytXiQPMWBQBWKuOrPTSeooSezhRm8ZpA0J6k1ImpXRZB1pVPHZlSwwQRpsQqqTCAuCWwA4OkOua-rG";

  return (
    <div className={`rounded-3xl p-5 transition-all duration-300 flex flex-col h-full ${
      isDark 
        ? 'bg-[#18181b] border border-cyan-500/10 shadow-[0_0_30px_rgba(6,182,212,0.05)]' 
        : 'bg-white border border-gray-100 shadow-sm'
    }`}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <h4 className={`font-bold text-sm ${isDark ? 'text-zinc-200' : 'text-gray-900'}`}>
          연직 투상 계산
        </h4>
      </div>

      {/* Physics Diagram */}
      <div className={`h-36 rounded-2xl overflow-hidden relative border ${
        isDark ? 'bg-zinc-950/60 border-zinc-800' : 'bg-gray-50 border-gray-100'
      }`}>
        <img 
          alt="Vertical projectile motion diagram" 
          className="w-full h-full object-contain p-2" 
          src={diagramUrl}
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Input Parameters List */}
      <div className="mt-4 space-y-1.5 text-xs">
        <div className="flex justify-between items-center py-1 border-b dark:border-zinc-800 border-gray-100">
          <span className={isDark ? 'text-zinc-400' : 'text-gray-600'}>• 초기 속도 (v₀):</span>
          <span className={`font-mono font-bold ${isDark ? 'text-cyan-400' : 'text-[#4f378a]'}`}>20 m/s</span>
        </div>
        <div className="flex justify-between items-center py-1 border-b dark:border-zinc-800 border-gray-100">
          <span className={isDark ? 'text-zinc-400' : 'text-gray-600'}>• 건물 높이 (h):</span>
          <span className={`font-mono font-bold ${isDark ? 'text-cyan-400' : 'text-[#4f378a]'}`}>20 m</span>
        </div>
        <div className="flex justify-between items-center py-1 border-b dark:border-zinc-800 border-gray-100">
          <span className={isDark ? 'text-zinc-400' : 'text-gray-600'}>• 중력 가속도 (g):</span>
          <span className={`font-mono font-bold ${isDark ? 'text-cyan-400' : 'text-[#4f378a]'}`}>10 m/s²</span>
        </div>
      </div>

      {/* Input Questions Form */}
      <div className="mt-4 space-y-3 flex-1">
        {/* Q1. Peak Time */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className={`text-xs ${isDark ? 'text-zinc-300' : 'text-gray-700'}`}>
              최고점 도달 시간:
            </label>
            <div className="flex items-center gap-1.5">
              <input 
                type="number"
                value={ansTime}
                onChange={(e) => setAnsTime(e.target.value)}
                placeholder="0"
                className={`w-16 text-right font-mono font-bold text-xs p-1 rounded-md border focus:ring-1 focus:outline-none ${
                  isDark 
                    ? 'bg-zinc-900 border-zinc-700 text-cyan-400 focus:ring-cyan-500' 
                    : 'bg-gray-50 border-gray-200 text-[#4f378a] focus:ring-[#4f378a]'
                }`}
              />
              <span className={`text-xs font-bold ${isDark ? 'text-zinc-400' : 'text-gray-600'}`}>s</span>
            </div>
          </div>
          {feedbackTime && (
            <p className={`text-[10px] text-right font-medium flex items-center justify-end gap-1 ${
              feedbackTime.isCorrect ? 'text-green-500 dark:text-cyan-400' : 'text-red-500'
            }`}>
              {feedbackTime.isCorrect ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
              {feedbackTime.text}
            </p>
          )}
        </div>

        {/* Q2. Peak Height */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className={`text-xs ${isDark ? 'text-zinc-300' : 'text-gray-700'}`}>
              최고점 높이 (지면):
            </label>
            <div className="flex items-center gap-1.5">
              <input 
                type="number"
                value={ansHeight}
                onChange={(e) => setAnsHeight(e.target.value)}
                placeholder="0"
                className={`w-16 text-right font-mono font-bold text-xs p-1 rounded-md border focus:ring-1 focus:outline-none ${
                  isDark 
                    ? 'bg-zinc-900 border-zinc-700 text-cyan-400 focus:ring-cyan-500' 
                    : 'bg-gray-50 border-gray-200 text-[#4f378a] focus:ring-[#4f378a]'
                }`}
              />
              <span className={`text-xs font-bold ${isDark ? 'text-zinc-400' : 'text-gray-600'}`}>m</span>
            </div>
          </div>
          {feedbackHeight && (
            <p className={`text-[10px] text-right font-medium flex items-center justify-end gap-1 ${
              feedbackHeight.isCorrect ? 'text-green-500 dark:text-cyan-400' : 'text-red-500'
            }`}>
              {feedbackHeight.isCorrect ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
              {feedbackHeight.text}
            </p>
          )}
        </div>

        {/* Q3. Ground Velocity */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className={`text-xs ${isDark ? 'text-zinc-300' : 'text-gray-700'}`}>
              지면 도달 시 속력:
            </label>
            <div className="flex items-center gap-1.5">
              <input 
                type="text"
                value={ansVel}
                onChange={(e) => setAnsVel(e.target.value)}
                placeholder="0.00"
                className={`w-16 text-right font-mono font-bold text-xs p-1 rounded-md border focus:ring-1 focus:outline-none ${
                  isDark 
                    ? 'bg-zinc-900 border-zinc-700 text-cyan-400 focus:ring-cyan-500' 
                    : 'bg-gray-50 border-gray-200 text-[#4f378a] focus:ring-[#4f378a]'
                }`}
              />
              <span className={`text-xs font-bold ${isDark ? 'text-zinc-400' : 'text-gray-600'}`}>m/s</span>
            </div>
          </div>
          {feedbackVel && (
            <p className={`text-[10px] text-right font-medium flex items-center justify-end gap-1 ${
              feedbackVel.isCorrect ? 'text-green-500 dark:text-cyan-400' : 'text-red-500'
            }`}>
              {feedbackVel.isCorrect ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
              {feedbackVel.text}
            </p>
          )}
        </div>
      </div>

      {/* Confirm Button */}
      <button 
        onClick={checkAnswers}
        className={`mt-4 w-full py-2.5 font-bold text-xs rounded-xl transition-all ${
          isDark 
            ? 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_15px_rgba(6,182,212,0.3)]' 
            : 'bg-[#4f378a] hover:bg-[#4f378a]/90 text-white shadow-sm'
        }`}
      >
        정답 확인
      </button>
    </div>
  );
}
