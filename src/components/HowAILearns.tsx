import { FolderOpen, Brain, ClipboardCheck, Rocket } from 'lucide-react';

const phases = [
  {
    icon: FolderOpen,
    title: 'جمعنا الصور',
    description: 'جمعنا مجموعة من صور البيئات الطبيعية السعودية: النخيل والصحراء والجبال والبحر',
    color: 'from-sand-400 to-sand-600',
  },
  {
    icon: Brain,
    title: 'درّبنا النموذج',
    description: 'استخدمنا منصة Teachable Machine لتدريب نموذج تعلّم آلي على تمييز البيئات الأربع',
    color: 'from-saudi-400 to-saudi-600',
  },
  {
    icon: ClipboardCheck,
    title: 'اختبرنا النموذج',
    description: 'اختبرنا النموذج بصور جديدة للتأكد من دقته في التعرف على البيئات الصحيحة',
    color: 'from-sea-400 to-sea-600',
  },
  {
    icon: Rocket,
    title: 'استخدمناه داخل الموقع',
    description: 'أضفنا النموذج إلى الموقع ليتمكن الزوار من تجربة التعرف على البيئات السعودية',
    color: 'from-mountain-400 to-mountain-600',
  },
];

export default function HowAILearns() {
  return (
    <section id="learn" className="py-24 bg-gradient-to-b from-mountain-50 to-white relative overflow-hidden">
      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-palm-100 text-palm-700 text-sm font-bold mb-4">
            كيف تعلّمنا الذكاء الاصطناعي؟
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-mountain-800 mb-4">
            من جمع الصور إلى تشغيل النموذج
          </h2>
          <p className="text-lg text-mountain-500 max-w-2xl mx-auto">
            رحلة تعليم الآلة كيف تتعرف على البيئات الطبيعية في المملكة العربية السعودية
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 inset-x-0 h-1 bg-gradient-to-l from-sand-300 via-saudi-400 to-mountain-400 rounded-full -translate-y-1/2 opacity-30" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              return (
                <div key={index} className="relative">
                  <div className="bg-white rounded-3xl p-7 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-mountain-100 text-center">
                    <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${phase.color} flex items-center justify-center mb-5 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-sm font-bold text-mountain-300 mb-2">
                      المرحلة {index + 1}
                    </div>
                    <h3 className="font-display text-lg font-bold text-mountain-800 mb-3">
                      {phase.title}
                    </h3>
                    <p className="text-mountain-500 text-sm leading-relaxed">
                      {phase.description}
                    </p>
                  </div>

                  {/* Arrow between cards on desktop */}
                  {index < phases.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-4 items-center justify-center z-10">
                      <div className="w-3 h-3 rounded-full bg-white border-2 border-saudi-400 shadow" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Note */}
        <div className="mt-12 max-w-3xl mx-auto p-6 rounded-2xl bg-palm-50 border border-palm-100 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-palm-100 flex items-center justify-center flex-shrink-0">
            <Brain className="w-5 h-5 text-palm-600" />
          </div>
          <p className="text-palm-800 leading-relaxed">
            تم تدريب النموذج باستخدام أمثلة حقيقية للبيئات الطبيعية في المملكة العربية
            السعودية، ليكون قادرًا على التعرف على تنوعها الجغرافي بدقة.
          </p>
        </div>
      </div>
    </section>
  );
}
