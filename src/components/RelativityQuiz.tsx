import { HelpCircle, CheckCircle2, AlertCircle, RotateCcw, Award } from 'lucide-react';
import { useState } from 'react';
import { ActiveTheme } from '../types';

interface RelativityQuizProps {
  theme: ActiveTheme;
}

export default function RelativityQuiz({ theme }: RelativityQuizProps) {
  const [essayInput, setEssayInput] = useState('');
  const [q1Feedback, setQ1Feedback] = useState<{
    status: 'correct' | 'partial' | 'incorrect' | null;
    score: number;
    text: string;
    missingKeywords: string[];
  } | null>(null);

  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | null>(null);

  const checkQ1Essay = () => {
    const text = essayInput.trim();
    if (!text) {
      setQ1Feedback({
        status: 'incorrect',
        score: 0,
        text: '답변을 작성한 후 정답 확인을 눌러주세요!',
        missingKeywords: []
      });
      return;
    }

    // Keyword detection rules (case-insensitive & spacing-tolerant)
    const hasSpacetime = /시공간|시간.*공간|우주/.test(text);
    const hasCurvature = /휘|굽|곡률|곡면|변형/.test(text);
    const hasMass = /질량|물질|에너지|무거운/.test(text);

    let score = 0;
    const missing: string[] = [];

    if (hasSpacetime) score += 35;
    else missing.push('시공간 (시간과 공간)');

    if (hasCurvature) score += 35;
    else missing.push('휘어짐 (곡률/변형)');

    if (hasMass) score += 30;
    else missing.push('질량 (물질/에너지)');

    let feedbackText = '';
    let status: 'correct' | 'partial' | 'incorrect' = 'incorrect';

    if (score === 100) {
      status = 'correct';
      feedbackText = '훌륭합니다! 일반 상대성 이론의 정수인 "질량에 따른 시공간의 휘어짐"을 완벽하게 서술하셨습니다.';
    } else if (score >= 35) {
      status = 'partial';
      feedbackText = `좋은 답변입니다! 핵심 개념에 접근하고 있습니다. 문장을 완성하기 위해 몇 가지 중요한 물리 개념을 추가해 보세요.`;
    } else {
      status = 'incorrect';
      feedbackText = '중력이 발생하는 아인슈타인식 기하학적 메커니즘을 생각하며 다시 서술해 보세요.';
    }

    setQ1Feedback({
      status,
      score,
      text: feedbackText,
      missingKeywords: missing
    });
  };

  const handleResetQ1 = () => {
    setEssayInput('');
    setQ1Feedback(null);
  };

  const handleSelectOption = (opt: 'A' | 'B') => {
    setSelectedOption(opt);
  };

  const isDark = theme === 'electromagnetism';

  return (
    <div className={`rounded-3xl p-5 transition-all duration-300 flex flex-col h-full ${
      isDark 
        ? 'bg-[#18181b] border border-cyan-500/10 shadow-[0_0_30px_rgba(6,182,212,0.05)]' 
        : 'bg-white border border-gray-100 shadow-sm'
    }`}>
      {/* Header */}
      <div className="flex items-center gap-2 border-b pb-3 mb-4 dark:border-zinc-800 border-gray-100">
        <HelpCircle className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-[#4f378a]'}`} />
        <h4 className={`font-bold text-sm ${isDark ? 'text-zinc-200' : 'text-gray-900'}`}>
          일반 상대성 이론 퀴즈
        </h4>
      </div>

      <div className="space-y-4 flex-1">
        {/* Q1. Interactive Essay Form */}
        <div className={`p-4 rounded-2xl border ${
          isDark ? 'bg-zinc-950/60 border-zinc-800' : 'bg-gray-50 border-gray-100'
        }`}>
          <div className="flex justify-between items-center mb-2">
            <p className="text-[11px] uppercase tracking-wider font-extrabold text-zinc-500 dark:text-zinc-400">
              Q1. 서술형 개념 확인
            </p>
            {essayInput && (
              <button 
                onClick={handleResetQ1}
                className={`text-[10px] font-bold flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity ${
                  isDark ? 'text-cyan-400' : 'text-[#4f378a]'
                }`}
              >
                <RotateCcw className="w-3 h-3" />
                지우기
              </button>
            )}
          </div>

          <p className={`text-xs leading-relaxed mb-3 ${isDark ? 'text-zinc-300' : 'text-gray-700'}`}>
            질문: <strong className={isDark ? 'text-cyan-400' : 'text-[#4f378a]'}>일반 상대성 이론에 따르면, 중력은 어떤 메커니즘을 통해 발생하는지 서술해 보세요.</strong>
          </p>

          <div className="relative mb-3">
            <textarea
              value={essayInput}
              onChange={(e) => {
                setEssayInput(e.target.value);
                if (q1Feedback) setQ1Feedback(null); // Clear feedback on change
              }}
              rows={3}
              placeholder="일반 상대성 이론에서 설명하는 중력의 원리를 자유롭게 서술해 주세요..."
              className={`w-full text-xs p-3 rounded-xl border focus:ring-1 focus:outline-none font-medium transition-all resize-none leading-relaxed ${
                isDark 
                  ? 'bg-zinc-900 border-zinc-700 text-zinc-100 placeholder-zinc-600 focus:ring-cyan-500' 
                  : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400 focus:ring-[#4f378a] shadow-inner'
              }`}
            />
            <span className="absolute bottom-2.5 right-3 text-[9px] font-mono font-semibold text-zinc-500">
              {essayInput.length}자
            </span>
          </div>

          <button 
            onClick={checkQ1Essay}
            className={`w-full py-2.5 text-xs font-bold rounded-xl transition-colors mb-2.5 ${
              isDark 
                ? 'bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/20' 
                : 'bg-[#4f378a]/10 hover:bg-[#4f378a]/20 text-[#4f378a]'
            }`}
          >
            답안 제출 & 분석
          </button>

          {q1Feedback && (
            <div className={`p-3 rounded-xl space-y-2 border ${
              q1Feedback.status === 'correct'
                ? 'bg-green-500/5 border-green-500/20 text-green-600 dark:bg-cyan-400/5 dark:border-cyan-400/20 dark:text-cyan-400' 
                : q1Feedback.status === 'partial'
                  ? 'bg-yellow-500/5 border-yellow-500/20 text-yellow-600 dark:bg-yellow-400/5 dark:border-yellow-400/20 dark:text-yellow-400'
                  : 'bg-red-500/5 border-red-500/20 text-red-500'
            }`}>
              {/* Score indicator */}
              <div className="flex items-center justify-between border-b border-current/10 pb-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wide flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  AI 분석 결과
                </span>
                <span className="text-[10px] font-mono font-bold">
                  개념 일치도: {q1Feedback.score}%
                </span>
              </div>

              {/* Feedback description text */}
              <p className="text-[10.5px] leading-relaxed font-semibold">
                {q1Feedback.text}
              </p>

              {/* Missing suggestions */}
              {q1Feedback.missingKeywords.length > 0 && (
                <div className="pt-1 border-t border-current/5">
                  <span className="text-[9px] font-bold block opacity-80 mb-1">💡 보완하면 좋은 개념:</span>
                  <div className="flex flex-wrap gap-1">
                    {q1Feedback.missingKeywords.map((kw, i) => (
                      <span 
                        key={i} 
                        className="text-[9px] px-1.5 py-0.5 rounded-md font-bold bg-current/10"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Q2. Multiple choice */}
        <div className={`p-4 rounded-2xl border ${
          isDark ? 'bg-zinc-950/60 border-zinc-800' : 'bg-gray-50 border-gray-100'
        }`}>
          <p className="text-[11px] uppercase tracking-wider font-extrabold text-zinc-500 dark:text-zinc-400 mb-2">
            Q2. 객관식
          </p>
          <p className={`text-xs leading-normal mb-3 ${isDark ? 'text-zinc-300' : 'text-gray-700'}`}>
            가속하는 우주선 안의 관찰자와 중력장 내의 관찰자는 자신의 상태를 구분할 수 없다는 원리는 무엇일까요?
          </p>

          <div className="grid grid-cols-1 gap-2">
            {/* Option A (Correct) */}
            <button 
              onClick={() => handleSelectOption('A')}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border text-left transition-all ${
                selectedOption === 'A'
                  ? 'bg-green-500/10 border-green-500 dark:bg-cyan-500/10 dark:border-cyan-400 text-green-700 dark:text-cyan-400 shadow-sm'
                  : isDark 
                    ? 'border-zinc-800 hover:bg-zinc-900/60 text-zinc-300' 
                    : 'border-gray-200 hover:bg-gray-100 text-gray-700'
              }`}
            >
              <span className={`w-5.5 h-5.5 rounded-full border flex items-center justify-center text-xs font-bold transition-colors ${
                selectedOption === 'A'
                  ? 'bg-green-500 dark:bg-cyan-400 text-white dark:text-black border-transparent'
                  : isDark 
                    ? 'border-zinc-700 text-zinc-400' 
                    : 'border-gray-300 text-gray-500'
              }`}>
                A
              </span>
              <span className="font-semibold text-xs">등가 원리</span>
            </button>

            {/* Option B (Incorrect) */}
            <button 
              onClick={() => handleSelectOption('B')}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border text-left transition-all ${
                selectedOption === 'B'
                  ? 'bg-red-500/10 border-red-400 text-red-500'
                  : isDark 
                    ? 'border-zinc-800 hover:bg-zinc-900/60 text-zinc-300' 
                    : 'border-gray-200 hover:bg-gray-100 text-gray-700'
              }`}
            >
              <span className={`w-5.5 h-5.5 rounded-full border flex items-center justify-center text-xs font-bold transition-colors ${
                selectedOption === 'B'
                  ? 'bg-red-500 text-white border-transparent'
                  : isDark 
                    ? 'border-zinc-700 text-zinc-400' 
                    : 'border-gray-300 text-gray-500'
              }`}>
                B
              </span>
              <span className="font-semibold text-xs">관성 원리</span>
            </button>
          </div>

          {selectedOption && (
            <p className={`text-[10px] leading-normal font-medium flex items-start gap-1 p-2 rounded-xl mt-3 ${
              selectedOption === 'A' 
                ? 'bg-green-500/10 text-green-600 dark:bg-cyan-400/5 dark:text-cyan-400' 
                : 'bg-red-500/10 text-red-500'
            }`}>
              {selectedOption === 'A' ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>맞습니다! 아인슈타인은 "생애 가장 행복한 생각"이라고 불렀던 이 등가 원리를 통해 일반 상대성 이론을 정립했습니다.</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>오답입니다. (관성 원리는 뉴턴의 제1 법칙으로 힘이 작용하지 않는 물체의 기본 운동 경향을 나타냅니다. 힌트: 가속 좌표계의 관성력과 중력은 동등하다)</span>
                </>
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

