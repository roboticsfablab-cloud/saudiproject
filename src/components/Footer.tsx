import { Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-mountain-900 text-white pt-16 pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-saudi-900/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sea-900/30 rounded-full blur-3xl" />

      <div className="section-container relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2.5 mb-5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-saudi-500 to-sea-500 flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <h3 className="font-display text-xl font-extrabold text-white">Saudi Nature AI</h3>
              <p className="text-sm text-sand-200">طبيعة السعودية بالذكاء الاصطناعي</p>
            </div>
          </div>

          <p className="text-white/60 max-w-md mx-auto mb-2">
            مشروع تعليمي في الذكاء الاصطناعي والروبوتات
          </p>
          <p className="text-sand-200/70 text-sm flex items-center justify-center gap-1.5">
            <Heart className="w-3.5 h-3.5 fill-saudi-400 text-saudi-400" />
            صنع للتعلم والابتكار بمناسبة اليوم الوطني السعودي
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-l from-transparent via-white/10 to-transparent mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <p>© 2026 Saudi Nature AI — مشروع تعليمي</p>
          <p className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-saudi-400" />
            مبني باستخدام React و TensorFlow.js
          </p>
        </div>
      </div>
    </footer>
  );
}
