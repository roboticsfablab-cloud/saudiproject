import { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Trophy, Lightbulb } from 'lucide-react';
import { quizQuestions } from '@/data/natureData';

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = quizQuestions[current];
  const isLast = current === quizQuestions.length - 1;

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    if (index === question.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (isLast) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const isPerfect = score === quizQuestions.length;
    return (
      <section id="quiz" className="py-24 bg-gradient-to-b from-sand-50 to-white">
        <div className="section-container">
          <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-2xl border border-mountain-100 p-8 sm:p-10 text-center">
            <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-6 ${isPerfect ? 'bg-gradient-to-br from-saudi-400 to-saudi-600' : 'bg-gradient-to-br from-sand-300 to-sand-500'}`}>
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h3 className="font-display text-2xl font-extrabold text-mountain-800 mb-2">
              {isPerfect ? 'نتيجة ممتازة!' : 'أحسنت!'}
            </h3>
            <p className="text-mountain-500 mb-6">
              أجبت بشكل صحيح على {score} من أصل {quizQuestions.length} أسئلة
            </p>

            <div className="flex justify-center gap-2 mb-8">
              {quizQuestions.map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${i < score ? 'bg-saudi-500' : 'bg-mountain-200'}`}
                />
              ))}
            </div>

            <button onClick={handleRestart} className="btn-primary">
              <RotateCcw className="w-5 h-5" />
              إعادة الاختبار
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quiz" className="py-24 bg-gradient-to-b from-sand-50 to-white">
      <div className="section-container">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-sand-100 text-sand-700 text-sm font-bold mb-4">
            اختبار سريع
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-mountain-800 mb-4">
            كم تعرف عن طبيعة السعودية؟
          </h2>
          <p className="text-lg text-mountain-500 max-w-2xl mx-auto">
            ثلاثة أسئلة سريعة تختبر معلوماتك عن البيئات الطبيعية في المملكة
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl border border-mountain-100 overflow-hidden">
          {/* Progress bar */}
          <div className="h-2 bg-mountain-100">
            <div
              className="h-full bg-gradient-to-l from-saudi-400 to-sea-400 transition-all duration-500"
              style={{ width: `${((current + (answered ? 1 : 0)) / quizQuestions.length) * 100}%` }}
            />
          </div>

          <div className="p-6 sm:p-8">
            {/* Question number */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-bold text-mountain-400">
                السؤال {current + 1} من {quizQuestions.length}
              </span>
              <span className="text-sm font-bold text-saudi-600">
                النقاط: {score}
              </span>
            </div>

            {/* Question */}
            <h3 className="font-display text-xl sm:text-2xl font-bold text-mountain-800 mb-6 leading-relaxed">
              {question.question}
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option, index) => {
                const isCorrect = index === question.correctIndex;
                const isSelected = index === selected;
                let stateClass = 'border-mountain-200 bg-white hover:border-saudi-300 hover:bg-saudi-50';
                if (answered) {
                  if (isCorrect) {
                    stateClass = 'border-saudi-400 bg-saudi-50';
                  } else if (isSelected) {
                    stateClass = 'border-red-300 bg-red-50';
                  } else {
                    stateClass = 'border-mountain-100 bg-mountain-50 opacity-60';
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleSelect(index)}
                    disabled={answered}
                    className={`w-full flex items-center justify-between gap-3 p-4 rounded-2xl border-2 text-right transition-all duration-200 ${stateClass} ${!answered ? 'cursor-pointer' : 'cursor-default'}`}
                  >
                    <span className="font-semibold text-mountain-700">{option}</span>
                    {answered && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-saudi-500 flex-shrink-0" />
                    )}
                    {answered && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation + Next */}
            {answered && (
              <div className="mt-6 animate-fade-in-up">
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-sea-50 border border-sea-100 mb-5">
                  <Lightbulb className="w-5 h-5 text-sea-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sea-800 text-sm leading-relaxed">{question.explanation}</p>
                </div>
                <button onClick={handleNext} className="btn-primary w-full">
                  {isLast ? 'عرض النتيجة' : 'السؤال التالي'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
